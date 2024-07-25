import conf from '../conf.js';
import { Client, Account,ID,Databases,Storage,Query } from 'appwrite';



export class Service{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client)
            this.bucket = new Storage(this.client)        
    }
    async creactePost({titel, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.creacteDocument(
                conf.appwriteDatabasesId,
                conf.appwriteCollectionId,
                slug,
                {
                    titel,
                    content,
                    featuredImage,
                    status,userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error",error);
        }
    }
    async updatePost(slug,{titel, content, featuredImage, status, userId}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabasesId,
                conf.appwriteCollectionId,
                slug,
                {
                    titel,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("appwrite service :: updatePost :: error",error);
        }
    }
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabasesId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("appwrite service :: deletPost ::error",error);
            return false
        }

    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabasesId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("appwrite service :: getPost :: error",error);
        }
    }
    async getPosts(querise =[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabasesId,
                conf.appwriteCollectionId,
                querise,
            )
        } catch (error) {
            console.log("appwrite service :: getPosts :: error",error);
            return false
        }
    }
   // faile upload
   async uploadFile(file){
    try {
        return await this.bucket.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file,
        )
    } catch (error) {
        console.log("appwrite service :: uploadFile ::error",error);
        return false
    }
   }
   async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("appwrite service :: deleteFile :: error",error);
            return false
        }
   }
   getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId,
    )
   }
}

const service = new Service()
export default service