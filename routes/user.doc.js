//  register user
const registerUser = {
  tags: ["User"],
  description: "Create a new user account with email and password",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["userName", "email", "password"],
          properties: {
            userName: {
              type: "string",
              description: "User's full name",
              example: "John Doe",
              minLength: 2
            },
            email: {
              type: "string",
              description: "User's email address",
              example: "john@gmail.com",
              format: "email"
            },
            password: {
              type: "string",
              description: "User's password (min 8 characters, must contain numbers and letters)",
              example: "Ashu@321",
              minLength: 8
            },
            role: {
              type: "string",
              description: "User's role (default: user)",
              example: "admin",
              enum: ["user", "admin"]
            }
          }
        }
      }
    }
  },
  responses: {
    "201": {
      description: "User created successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: true
              },
              message: {
                type: "string",
                example: "User created successfully"
              },
              token: {
                type: "string",
                description: "JWT token for authentication",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              }
            }
          }
        }
      }
    },
    "400": {
      description: "Bad Request - Invalid input data",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false
              },
              message: {
                type: "string",
                example: "Invalid email format"
              }
            }
          }
        }
      }
    },
    "409": {
      description: "Conflict - Email already exists",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: {
                type: "boolean",
                example: false
              },
              message: {
                type: "string",
                example: "Email already registered"
              }
            }
          }
        }
      }
    }
  }
};


const userDocsRoutes = {
  '/user/register': {
    post: registerUser
  },
};

export default userDocsRoutes;