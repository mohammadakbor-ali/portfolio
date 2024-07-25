const conf = {
    
    appwriteUrl: String(import.meta.env.VITE-APPWRITE-URL)
    appwriteProjectId: String(import.meta.env.VITE-APPWRITE-PROJECT-ID)
    appwriteDatabaseId: String(import.meta.env.VITE-APPWRITE-DATABASE-ID)
    appwriteCollectionId: String(import.meta.env.VITE-APPWRITE-COLLECTION-ID)
    appwriteBucketId: String(import.meta.env.VITE-APPWRITE-BUCKET-ID)
}

export default conf 