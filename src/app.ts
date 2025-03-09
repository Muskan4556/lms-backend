import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// route
app.get("/health", (req: Request, res: Response) => {
    res.json({
      Health: "OK",
    });
});

app.listen(3000, () => {
  console.log(`Server is running at PORT_NO: 3000: http://localhost:3000/`);
});