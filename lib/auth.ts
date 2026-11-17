import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { admin } from "better-auth/plugins"
const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloop")

export const auth = betterAuth({

  emailAndPassword: {
    enabled: true,
  },
      user: {
       additionalFields: {
          role: {
              type: ["seeker","recruiter","admin"],
              input: true,
              defaultValue:"seeker"
            } 
        }
    },
  socialProviders: {
    google: {
      
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string, // [!code highlight]
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string, // [!code highlight]
    },
    github: { 
            clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET as string, 
        }, 
  },
      plugins: [
        admin() 
    ],
  database: mongodbAdapter(db, {
    client,
  }),
  
})
