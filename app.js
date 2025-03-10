import express from "express";
import cors from "cors";
import envConfig from "./config/envConfig.js";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
<<<<<<< HEAD


import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";
=======
import process from "process";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoutes.js";
import connectDb from "./config/connectDb.js";
>>>>>>> 15f358098d5db4a5a2f7f34674b1b55731894cba

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Set up EJS as view engine
app.set("view engine", "ejs");
<<<<<<< HEAD
app.set("views", path.join(__dirname, "../views"));
=======
app.set("views", path.join(__dirname, "./views/"));
>>>>>>> 15f358098d5db4a5a2f7f34674b1b55731894cba

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

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

<<<<<<< HEAD

=======
connectDb();

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
  });
});
>>>>>>> 15f358098d5db4a5a2f7f34674b1b55731894cba

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

const port = envConfig.port || 3000;

app.listen(port, () => {
<<<<<<< HEAD
    console.log(`🚀 Server is running at http://localhost:${port}/`);
});
=======
  console.log(`🚀 Server is running at http://localhost:${port}/`);
  console.log(`🔥 Environment: ${process.env.NODE_ENV || "development"}`);
});
>>>>>>> 15f358098d5db4a5a2f7f34674b1b55731894cba
