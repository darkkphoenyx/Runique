import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";
import bcrypt from "bcryptjs";

export class Products {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Services logic

  //login
  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      let id = "";
      const res = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId3,
        [Query.equal("email", email), Query.select(["$id", "password", "role"])]
      );

      // If no user is found, throw an explicit error
      if (res.documents.length === 0) {
        console.log("No user found");
        throw new Error("No user found with this email.");
      } else if (res.total > 0) {
        id = res.documents[0].$id;
      }

      const storedPassword = res.documents[0].password; //this is hash password

      const isMatch = await bcrypt.compare(password, storedPassword);

      if (!isMatch) {
        throw new Error("Invalid password.");
      }

      //local storage session handling
      localStorage.setItem("isLogin", "true");

      //checking admin
      if (res.documents[0].role === "Admin")
        localStorage.setItem("isAdmin", "true");
      else localStorage.removeItem("isAdmin");

      //fetch user details
      try {
        const res = await this.database.getDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId3,
          id,
          [Query.select(["$id", "name", "email", "role"])]
        );
        return res;
      } catch (error) {
        throw new Error(`User data not fetched: ${error}`);
      }
    } catch (error: any) {
      if (error.code === 401) {
        throw new Error("Unauthorized: Invalid email or password.");
      }

      throw new Error(`${error.message}`);
    }
  };

  //signup
  signup = async ({
    name,
    email,
    password,
    confirmPassword,
  }: {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      const existing = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId3,
        [Query.equal("email", email)]
      );

      if (existing.documents.length > 0) {
        throw new Error("A user with this email already exists.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const res = await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId3,
        ID.unique(),
        {
          name: name || "",
          email,
          password: hashedPassword,
        }
      );

      return res;
    } catch (error: any) {
      console.error("Signup error:", error.message || error);
      throw new Error(error.message || "Signup failed.");
    }
  };

  //get prodcts details and filter also
  getProductDetails = async (filters: Record<string, string[]>) => {
    try {
      const allResults: any[] = [];

      const hasPriceFilter = filters.price && filters.price.length > 0;
      const otherFilters = { ...filters };
      delete otherFilters.price;

      // Generate queries for non-price filters
      const baseFilterQueries: string[] = [];
      for (const [key, values] of Object.entries(otherFilters)) {
        if (values.length > 0) {
          baseFilterQueries.push(Query.equal(key, values));
        }
      }

      // If no price filter, just do a normal fetch
      if (!hasPriceFilter) {
        const res = await this.database.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId1,
          baseFilterQueries
        );
        return res;
      }

      // Handle each price range as a separate query and merge the results
      for (const label of filters.price) {
        const priceQueries = [...baseFilterQueries];

        switch (label) {
          case "Under Rs. 4999":
            priceQueries.push(Query.lessThan("price", 4999));
            break;
          case "Rs. 5000 - Rs. 14999":
            priceQueries.push(Query.between("price", 5000, 14999));
            break;
          case "Above Rs.15000":
            priceQueries.push(Query.greaterThan("price", 15000));
            break;
        }

        const res = await this.database.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId1,
          priceQueries
        );

        allResults.push(...(res?.documents || []));
      }

      // Remove duplicates (based on document ID)
      const uniqueResultsMap: Record<string, any> = {};
      for (const doc of allResults) {
        uniqueResultsMap[doc.$id] = doc;
      }

      const uniqueResults = Object.values(uniqueResultsMap);
      return { documents: uniqueResults };
    } catch (error) {
      throw new Error(
        `Appwrite Error :: getProductDetails() failed :: ${error}`
      );
    }
  };

  //search by title
  getProductByTitle = async (slug: string) => {
    try {
      const res = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId1,
        [Query.equal("slug", slug)]
      );

      if (res.documents.length > 0) {
        return res.documents[0];
      } else {
        return null;
      }
    } catch (error) {
      throw new Error(`Error getting product by title: ${error}`);
    }
  };

  //get featured section
  getProductsByCategoryName = async (name: string) => {
    const categoryRes = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId2, // categories collection
      [Query.equal("name", name)]
    );

    const categoryId = categoryRes.documents[0]?.$id;

    if (!categoryId) {
      console.warn(`Category "${name}" not found.`);
      return [];
    }

    const productRes = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId1,
      [Query.equal("categories", categoryId)]
    );

    return productRes.documents;
  };

  //get related product
  getRelatedProductsPerCategory = async (category: string) => {
    const res = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId1,
      [Query.equal("categories", category)]
    );

    return res.documents;
  };

  //update order status
  orderItems = async (
    userId: string,
    productId: string,
    quantity: number,
    size: number,
    price: number
  ) => {
    try {
      if (!size) throw new Error("Select size");
      const res = await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId4,
        ID.unique(),
        {
          price: price * quantity,
          users: userId,
          products: productId,
          quantity: quantity,
          size: size,
        }
      );

      return res;
    } catch (error: any) {
      console.error("Order placing failed:", error);
      throw new Error(error.message);
    }
  };
}

const products = new Products();
export default products;
