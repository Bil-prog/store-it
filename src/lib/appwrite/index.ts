'use server';

import { Account, Avatars, Client, Databases, Storage } from "appwrite"
import { appwriteConfig } from "./config"
import { cookies } from "next/headers";

export const createSessionClient = async () => {
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId);

    const session = (await cookies()).get('appwrite-session');
    console.log("Session cookie:", session);
    
    if(!session || !session.value) throw new Error('No session')

    // if (!session || !session.value) {
    //     console.warn("No session found. Redirecting to login...");
    //     return null;
    // }

    client.setSession(session.value);
    
    return{
        get account(){
            return new Account(client);
        },
        get databases(){
            return new Databases(client);
        }
    }
}

export const createAdminClient = async () => {
    const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    //.setKey(appwriteConfig.secretKey);

    client.headers["X-Appwrite-Key"] = appwriteConfig.secretKey;
    
    return{
        get account(){
            return new Account(client);
        },
        get databases(){
            return new Databases(client);
        },
        get storage(){
            return new Storage(client);
        },
        get avatars(){
            return new Avatars(client);
        }
    }
}