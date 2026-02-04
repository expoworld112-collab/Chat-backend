// import jwt from "jsonwebtoken" 

// export const generateToken = (userId , res) => {
//     const {JWT_SECRET} = process.env;
//     if(!JWT_SECRET){
//     throw new Error("JWT_SECRET is not configured");}
//     const token = jwt.sign( {userId} , JWT_SECRET,{
//          expiresIn: "7d" ,
//     });

//      res.cookie("jwt" , token , {
//         maxAge: 7*24*60*60*1000 , //mili sec
//         httpOnly: true ,    // cross type scripting
//         sameSite: "lax" ,
//         secure : process.env.NODE_ENV === "development" ? false:true ,
//      }) ;
//      return token ;
//     };





import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const { JWT_SECRET, NODE_ENV } = process.env;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = NODE_ENV === "production";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, 
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax", 
    secure: isProduction, 
  });

  return token;
};

