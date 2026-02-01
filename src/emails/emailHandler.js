import {resendClient , sender } from "../lib/resend.js" ;
import { createWelcomeEmailTemplate } from "../emails/emailTemplate.js";


export const sendWelcomeEmail = async (email , Name , clientUrl ) => {
    const {data , error} = await resendClient.emails.send ({
        from: `${sender.Name} <${sender.email}>` ,
        to: email ,
        subject : "Welcome to chat " ,
         html : createWelcomeEmailTemplate(Name , clientUrl) ,
           
    }) ;
    if (error) {
   console.error("error in sending welcome email:" , error) ;
   throw new Error ("Failed to dend welcome email") ;

    }
    console.log("welcome email sent successfully" , data) ;
};