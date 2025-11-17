import { Client, Databases, Functions, ID, Query, Storage } from "appwrite";
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

  functions = new Functions(this.client);
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

  // get product by id
  getProductById = async (id: string) => {
    try {
      const res = await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId1,
        id
      );
      return res;
    } catch (error) {
      throw new Error(`Error getting product by ID: ${error}`);
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

      const duplicateOrder = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId4,
        [
          Query.equal("users", userId),
          Query.equal("products", productId),
          Query.equal("size", size),
        ]
      );

      // checking if duplicate data exists

      //here we are checking the productId, userID and the size-> cause each size should count as a different order even tho the user and products are exactly the same
      if (duplicateOrder.total > 0) {
        const res = await this.database.updateDocument(
          config.appwriteDatabaseId,
          config.appwriteCollectionId4,
          duplicateOrder.documents[0].$id,
          {
            price: price * Math.abs(quantity), //forcing positive quantity
            users: userId,
            products: productId,
            quantity: duplicateOrder.documents[0].quantity + quantity,
            size: size,
            isFavourite: false,
          }
        );

        return res;
      } else {
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
            isFavourite: false,
          }
        );
        return res;
      }
    } catch (error: any) {
      console.error("Order placing failed:", error);
      throw new Error(error.message);
    }
  };

  // Function to increase the quantity
  increaseQuantity = async (
    userId: string,
    productId: string,
    size: number,
    price: number
  ) => {
    try {
      return await this.orderItems(userId, productId, 1, size, price);
    } catch (error: any) {
      console.error("Failed to increase quantity:", error);
      throw new Error(error.message);
    }
  };

  // Function to decrease the quantity
  decreaseQuantity = async (
    userId: string,
    productId: string,
    size: number,
    price: number
  ) => {
    try {
      return await this.orderItems(userId, productId, -1, size, price);
    } catch (error: any) {
      console.error("Failed to decrease quantity:", error);
      throw new Error(error.message);
    }
  };

  //delete order item
  deleteOrderItems = async (id: string) => {
    try {
      this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId4,
        id
      );
    } catch (error: any) {
      console.error("Failed to delete items", error);
      throw new Error(error.message);
    }
  };

  // fetch bag item
  fetchBag = async (userId: string) => {
    try {
      const res = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId4,
        [Query.equal("users", userId)]
      );
      return res.documents;
    } catch (error: any) {
      console.error("Order placing failed:", error);
      throw new Error(error.message);
    }
  };

  //add to favourite
  addToFavourite = async (
    userId: string,
    productId: string
  ): Promise<number> => {
    try {
      const existingFavourites = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId5,
        [Query.equal("userId", userId), Query.equal("productId", productId)]
      );

      if (existingFavourites.total > 0) {
        console.warn(
          `Favourite already exists for user: ${userId}, product: ${productId}`
        );
        return 409;
      }

      const product = await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId1,
        productId
      );

      if (!product) {
        console.warn(`Product not found: ${productId}`);
        return 404;
      }

      const favouritePayload = {
        userId,
        productId,
        productName: product.title ?? "Unknown Product",
        productImage: Array.isArray(product.imgUrl) ? product.imgUrl[0] : null,
        type: product.header ?? "Unknown Type",
        colors: Array.isArray(product.colorAvailable)
          ? product.colorAvailable.length
          : 0,
        price: product.price ?? 0,
        slug: product.slug ?? "",
      };

      await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId5,
        ID.unique(),
        favouritePayload
      );

      return 201;
    } catch (error: any) {
      console.error("Failed to add favourite:", error.message || error);
      throw new Error(
        `Failed to add favourite: ${error.message || "Unknown error"}`
      );
    }
  };

  //delete from favourite
  deleteFavourite = async (userId: string, productId: string) => {
    try {
      //fetch the id using the userid and productid
      const deleteId = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId5,
        [
          Query.equal("userId", userId),
          Query.equal("productId", productId),
          Query.select(["$id"]),
        ]
      );

      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId5,
        deleteId.documents[0].$id
      );
    } catch (error: any) {
      console.error("Failed to delete: ", error);
      throw new Error(error.message);
    }
  };

  //get favourites
  getFavourites = async (userId: string) => {
    try {
      const res = await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId5,
        [Query.equal("userId", userId)]
      );
      return res;
    } catch (error: any) {
      console.error("Failed to get Favourties", error);
      throw new Error(error.message);
    }
  };

  // toggle favourite
  toggleFavourite = async (id: string, isFavourite: boolean) => {
    try {
      const res = await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId4,
        id,
        {
          isFavourite: !isFavourite,
        }
      );
      return res;
    } catch (error: any) {
      console.error("Toggle Favourite failed: ", error);
      throw new Error(error.message);
    }
  };

  //upload photo
  uploadPhoto = async (file: File) => {
    try {
      const res = await this.storage.createFile(
        config.appwriteStorageId,
        ID.unique(),
        file
      );

      //retrieve the URL
      const urlRes = await this.storage.getFileView(
        config.appwriteStorageId,
        res.$id
      );

      const returnData = {
        link: urlRes,
        id: res.$id,
      };

      return returnData;
    } catch (error: any) {
      console.error("Image upload failed: ", error);
      throw new Error(error.message);
    }
  };

  //delete photo
  deletePhoto = async (id: string) => {
    try {
      await this.storage.deleteFile(config.appwriteStorageId, id);
    } catch (error: any) {
      console.error("Error deleting photo", error.message);
      throw new Error(error.message);
    }
  };

  //add product
  addProduct = async (data: any) => {
    try {
      const res = await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId1,
        ID.unique(),
        data
      );
      console.log(res);
    } catch (error: any) {
      console.error("Error adding product", error.message);
      throw new Error(error.message);
    }
  };

  //update product
  updateProduct = async (data: any, id: any) => {
    try {
      await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId1,
        id,
        data
      );
    } catch (error: any) {
      console.error("Error updating product", error.message);
      throw new Error(error.message);
    }
  };

  //delete product
  deleteProduct = async (id: string) => {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId1,
        id
      );
    } catch (error: any) {
      console.error("Error deleting product", error.message);
      throw new Error(error.message);
    }
  };

  //recommendation login starts here
  //log user events
  logUserEvent = async (
    userId: string | undefined,
    productId: string,
    eventType: string,
    source?: string
  ) => {
    await this.database.createDocument(
      config.appwriteDatabaseId,
      config.appwriteCollectionId6,
      ID.unique(),
      {
        userId,
        productId,
        eventType,
        source,
      }
    );
  };

  //update user weights table
  computeUserWeights = async (userId: string) => {
    // Fetch all user events
    const events = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId6, // user_events
      [Query.equal("userId", userId)]
    );

    // Aggregate event counts
    let impressions = 0,
      clicks = 0,
      favourites = 0,
      unfavourites = 0,
      carts = 0,
      removes = 0;

    for (const e of events.documents) {
      switch (e.eventType) {
        case "impression":
          impressions++;
          break;
        case "click":
          clicks++;
          break;
        case "favourite_add":
        case "favourite":
          favourites++;
          break;
        case "favourite_remove":
          unfavourites++;
          break;
        case "add_to_cart":
          carts++;
          break;
        case "remove_from_cart":
          removes++;
          break;
      }
    }

    // Bayesian-style smoothed weights
    const alpha = 1; // smoothing factor

    // popularity weight reflects click/cart engagement (minus removals)
    const popularityWeight =
      (clicks + carts + alpha) / (impressions + removes + 2 * alpha);

    // favourite weight reflects positive vs negative favourite interactions
    const favWeight =
      (favourites - unfavourites + alpha) / (impressions + 2 * alpha);

    // clamp favWeight between 0 and 1
    const normalizedFav = Math.max(0, Math.min(1, favWeight));

    // Upsert into user_weights collection
    const existing = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId7,
      [Query.equal("userId", userId)]
    );

    if (existing.total > 0) {
      await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId7,
        existing.documents[0].$id,
        {
          popularity: popularityWeight,
          fav: normalizedFav,
        }
      );
    } else {
      await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId7,
        ID.unique(),
        {
          userId,
          popularity: popularityWeight,
          fav: normalizedFav,
        }
      );
    }

    return { popularity: popularityWeight, fav: normalizedFav };
  };

  getRecommendations = async (userId?: string) => {
    const products = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId1
    );

    const allEvents = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId6
    );

    const productPopularity: Record<string, number> = {};
    for (const e of allEvents.documents) {
      if (["click", "add_to_cart"].includes(e.eventType)) {
        productPopularity[e.productId] =
          (productPopularity[e.productId] || 0) + 1;
      }
    }

    const maxPopularity = Math.max(...Object.values(productPopularity), 1);

    if (!userId) {
      console.log("Showing global trending products...");
      const scored = products.documents.map((p) => ({
        ...p,
        score: (productPopularity[p.$id] || 0) / maxPopularity,
      }));
      return scored.sort((a, b) => b.score - a.score).slice(0, 6);
    }

    // Filter user favourites
    const userFavourites = allEvents.documents
      .filter((e) => e.userId === userId && e.eventType === "favourite_add")
      .map((e) => e.productId);

    // Fetch or recompute user weights
    let userWeights: any;
    const cached = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId7,
      [Query.equal("userId", userId)]
    );

    const now = Date.now();
    const lastUpdated = cached.total
      ? new Date(cached.documents[0].updated_at).getTime()
      : 0;

    const oneHour = 60 * 60 * 1000;
    if (cached.total > 0 && now - lastUpdated < oneHour) {
      userWeights = {
        popularity: cached.documents[0].popularity,
        fav: cached.documents[0].fav,
      };
    } else {
      userWeights = await this.computeUserWeights(userId);
    }

    // Compute personalized scores
    const scored = products.documents.map((p) => {
      const popularityScore = (productPopularity[p.$id] || 0) / maxPopularity;
      const favouriteScore = userFavourites.includes(p.$id) ? 1 : 0;
      const categoryScore = 1;

      return {
        ...p,
        score:
          popularityScore * userWeights.popularity +
          favouriteScore * userWeights.fav +
          categoryScore * 0.2,
      };
    });

    return scored.sort((a, b) => b.score - a.score).slice(0, 6);
  };

  //get trending products
  getTrendingProductsGraph = async () => {
    const products = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId1
    );

    const allEvents = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId6
    );

    const popularity: Record<string, number> = {};
    for (const e of allEvents.documents) {
      if (["click", "add_to_cart"].includes(e.eventType)) {
        popularity[e.productId] = (popularity[e.productId] || 0) + 1;
      }
    }

    // Map into chart-friendly format
    const chartData = products.documents.map((p) => {
      const productName = p.title ?? (p as any).fields?.title ?? p.$id;
      return {
        name: productName,
        value: popularity[p.$id] || 0,
      };
    });
    return chartData;
  };

  //get frequently purchased
  getBestSellers = async () => {
    const events = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId6,
      [Query.equal("eventType", "add_to_cart")]
    );

    const counts: Record<string, number> = {};
    for (const e of events.documents) {
      counts[e.productId] = (counts[e.productId] || 0) + 1;
    }

    const max = Math.max(...Object.values(counts), 1);
    const products = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId1
    );

    const scored = products.documents.map((p) => ({
      ...p,
      score: (counts[p.$id] || 0) / max,
    }));

    return scored.sort((a, b) => b.score - a.score).slice(0, 6);
  };

  //get most favourite product
  getMostFavourited = async () => {
    const events = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId6,
      [Query.equal("eventType", "favourite_add")]
    );

    const counts: Record<string, number> = {};
    for (const e of events.documents) {
      counts[e.productId] = (counts[e.productId] || 0) + 1;
    }

    const max = Math.max(...Object.values(counts), 1);
    const products = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteCollectionId1
    );

    const scored = products.documents.map((p) => ({
      ...p,
      score: (counts[p.$id] || 0) / max,
    }));

    return scored.sort((a, b) => b.score - a.score).slice(0, 6);
  };

  // khalti payment integration

  khaltiPayment = async () => {
    const payload = {
      return_url: "https://example.com/payment/",
      website_url: "https://example.com/",
      amount: 1300,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: "Khalti Bahadur",
        email: "example@gmail.com",
        phone: "9800000123",
      },
      amount_breakdown: [
        { label: "Mark Price", amount: 1000 },
        { label: "VAT", amount: 300 },
      ],
      product_details: [
        {
          identity: "1234567890",
          name: "Khalti logo",
          total_price: 1300,
          quantity: 1,
          unit_price: 1300,
        },
      ],
      merchant_username: "merchant_name",
      merchant_extra: "merchant_extra",
    };

    const response = await this.functions.createExecution(
      "[FUNCTION_ID]",
      JSON.stringify(payload)
    );

    console.log(response);
  };
}

const products = new Products();
export default products;
