import { Client, Databases, ID, Query, Storage } from "appwrite";
import config from "../config/config";
// import type { ContactForm } from "../pages/sections/ContactForm";

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

  // Services
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
