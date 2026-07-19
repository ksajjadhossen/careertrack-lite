import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const app = express();

const pool = new Pool({ connectionString: process.env["DATABASE_URL"] });

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// API Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running perfectly with Prisma v7!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
