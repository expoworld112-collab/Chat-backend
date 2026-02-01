import moongoose from 'mongoose' ;
import {ENV} from "./env.js" ;
export const connectDB = async () => {
    try {
        await moongoose.connect(ENV.MONGO_URI );
        console.log ('MongoDb connected successfully');

 } catch (error)
{
    console.log('MongoDb connection failed :' , error ) ;
    process.exit(1) ;
}        }