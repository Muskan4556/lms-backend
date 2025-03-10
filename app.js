import express from "express";
import cors from "cors";
import envConfig from "./config/envConfig.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import morgan from "morgan";
import connectDb from "./config/connectDb.js";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import app from "./src/app.js";

// ES module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect to database
connectDb();

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Configure logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

// Custom token for response time in a different color
morgan.token("response-time", function (req, res) {
  const time = this["response-time"](req, res);
  return `${time} ms`;
});

// Custom format string with colors and additional information
const logFormat =
  ":method :url :status :response-time - :date[web] - :remote-addr";

// Use both console and file logging in development
if (envConfig.node_env === "development") {
  // Console logging with colors
  app.use(
    morgan(logFormat, {
      skip: function (req, res) {
        return res.statusCode >= 400;
      },
    })
  );

  // File logging without colors
  app.use(
    morgan(logFormat, {
      stream: accessLogStream,
      skip: function (req, res) {
        return res.statusCode >= 400;
      },
    })
  );

  // Error logging with different format
  app.use(
    morgan("combined", {
      skip: function (req, res) {
        return res.statusCode < 400;
      },
      stream: fs.createWriteStream(path.join(__dirname, "logs", "error.log"), {
        flags: "a",
      }),
    })
  );
} else {
  // In production, only log errors and access to files
  app.use(morgan("combined", { stream: accessLogStream }));
}

// middleware
app.use(express.json());
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());

// Set up EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// Serve static files
app.use(express.static(path.join(__dirname, "./public")));

// Routes
app.get("/", (req, res) => {
  // Log custom message for homepage access
  console.log(`Homepage accessed at ${new Date().toISOString()}`);

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

const port = envConfig.port || 3000;

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}/`);
  console.log(`🔥 Environment: ${envConfig.node_env || "development"}`);
  console.log(`📝 Logs are being written to: ${path.join(__dirname, "logs")}`);
});
