
import envConfig from '../config/envConfig.js'
import userDocsRoutes from '../routes/user.doc.js';
const swaggerdcomentation = {
  openapi:'3.0.0',
  info:{
    title:'lms backend Api Documentation',
    descripiton :"complete api documentation fo the Authenticaton System ",
    versipon:"1.0.0",
    contact:{
      name:"Apo Support",
      email:"coderashukr321@gmail.com"
    }
  },

  servers:[
    {
      url:"http://localhost:8080/api/v1",
      description:"Local Development Server"
    },
    {
      url:`${envConfig.production_url}/api/v1`,
      description:"Production Server"
    }
  ],

  tags:[
    {
      name:"User",
      description:"User related Endpoints"
    }
  ],
  path:{
    ...userDocsRoutes,
  }
}

export default swaggerdcomentation;