import express from "express";
import cors from "cors";
import envConfig from "./config/envConfig.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import mongoSanatize from "express-mongo-sanitize";
import helmet from "helmet";
import connectDb from "../backend/config/connectDb.js";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import limiter from "./middleware/rateLimit.js";
// import swagger
import swaggerDoc from "swagger-ui-express";
import swaggerdcomentation from "./helper/swaggerDocumentaion.js";

// import routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// add limiter
app.use(limiter);

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allows requests from any domain
    credentials: true, // Allows sending cookies/auth headers
  })
);

app.use(cookieParser());
app.use(mongoSanatize());
app.use(helmet());

connectDb();

// configure swagger
app.use("/docs", swaggerDoc.serve);
app.use("/docs", swaggerDoc.setup(swaggerdcomentation));

// Set up EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Serve static files
app.use(express.static(path.join(__dirname, "./public")));

// Routes
app.get("/", (req, res) => {
  // You can pass data to your EJS template here
  const pageData = {
    title: "LMS - Learning Management System",
    description:
      "Empower your learning journey with our comprehensive Learning Management System",
    features: [
      {
        icon: "fa-laptop-code",
        title: "Interactive Learning",
        description:
          "Engage with interactive content and real-time assessments to enhance your learning experience",
      },
      {
        icon: "fa-chart-line",
        title: "Progress Tracking",
        description:
          "Monitor your learning progress with detailed analytics and performance insights",
      },
      {
        icon: "fa-users",
        title: "Expert Support",
        description:
          "Get personalized help from experienced instructors and mentors whenever you need",
      },
    ],
  };

  res.render("index", pageData);
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

const port = envConfig.port || 3000;

app.use(globalErrorHandler);
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}/`);
});
