import jwt_decode from "jwt-decode";


export const GetUserInfoByToken =(token)=> {
   if(token) {
      return jwt_decode(token)
   }
}