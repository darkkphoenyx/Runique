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
  getProductDetails = async (type: string) => {
    try {
      if (type === "All") {
        return await this.database.listDocuments(
          config.appwriteDatabaseId,
          config.appwriteCollectionId1
        );
      }
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId1,
        [Query.equal("gender", type)]
      );
    } catch (error) {
      throw new Error(
        `Appwrite Error :: getProjectDetails() failed :: ${error}`
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
