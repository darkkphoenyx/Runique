import { Account, Client, Databases, ID, Query, Storage } from "appwrite";
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

  account = new Account(this.client);

  // Services
  login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId3,
        [Query.equal("email", email), Query.select(["password", "role"])]
      );

      // If no user is found, throw an explicit error
      if (res.documents.length === 0) {
        console.log("No user found");
        throw new Error("No user found with this email.");
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

      return { success: true };
    } catch (error: any) {
      if (error.code === 401) {
        throw new Error("Unauthorized: Invalid email or password.");
      }

      throw new Error(`${error.message}`);
    }
  };

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
      throw new Error("Error getting product by title");
    }
  };

  //get feature1 section
  getProductsByCategoryName = async (name: string) => {
    const categoryRes = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId2, // categories collection
      [Query.equal("name", name)]
    );

    const categoryId = categoryRes.documents[0]?.$id;

    console.log(categoryId);

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

  getRelatedProductsPerCategory = async (category: string) => {
    const res = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId1,
      [Query.equal("categories", category)]
    );

    return res.documents;
  };
  //to get the pdf download link
  getFileDownload = async () => {
    try {
      return this.storage.getFileDownload(
        config.appwriteBucketId,
        "689794480032fa61a2ea"
      );
    } catch (error) {
      throw new Error("Error getting PDF download.");
    }
  };

  // to upload comments
  writeComments = async ({
    name,
    message,
    phone,
    email,
  }: {
    name: string;
    message: string;
    phone: string;
    email: string;
  }) => {
    try {
      return this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId3,
        ID.unique(),
        { name, message, phone, email }
      );
    } catch (error) {
      throw new Error(`Error commenting:: ${error}`);
    }
  };
}

const products = new Products();
export default products;
