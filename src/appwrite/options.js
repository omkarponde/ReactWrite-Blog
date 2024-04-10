import config from "../config/config";
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service{
  client = new Client();
  databases;
  bucket;

  constructor(){
    this.client
			.setEndpoint(config.appwriteUrl)
			.setProject(config.appwriteProjectID);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({title, slug, content, featuredImage, status, userId}){
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          userId,
          status
        }
      )
    } catch (error) {
      console.log("Appwrite Service :: createPost :: error : ",error);
    }
  }

  async updatePost(slug,{title,  content, featuredImage, status}){
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
    } catch (error) {
      console.log("Appwrite Service :: updatePost :: error : ",error);
    }
  }

  async deletePost(slug){
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      )
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: error : ",error);
      return false;
    }

    return true;
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug
      )
    } catch (error) {
      console.log("Appwrite Service :: getPost :: error : ",error);
    }

    return null;
  }

  // async listPosts(){
  //   try {
  //     return await this.databases.listDocumnets(
  //       config.appwriteDatabaseID,
  //       config.appwriteCollectionID,
  //       slug
  //     )
  //   } catch (error) {
  //     console.log("Appwrite Service :: listPosts :: error : ",error);
  //   }

  //   return null;
  // }

  async listPosts(queries = [ Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocumnets(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        queries
      )
    } catch (error) {
      console.log("Appwrite Service :: listPosts :: error : ",error);
    }

    return null;
  }

  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        config.appwriteBucketID,
        ID.unique(),
        file
      )
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error : ",error);
    }

    return null;
  }

  async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        config.appwriteBucketID,
        fileId
      )
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error : ",error);
      return false;
    }

    return true;
  }

  async getFilePreview(fileId){
    return this.bucket.getFilePreview(
        config.appwriteBucketID,
        fileId
      )
  }
}

const service = new Service();
export default service;
