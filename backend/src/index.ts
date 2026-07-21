import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

const pool = new Pool({ connectionString: process.env["DATABASE_URL"] });
const adapter = new PrismaPg(pool);
export const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecretcareertrackkey123";

// ==========================================
// AUTH MIDDLEWARE (To Protect Routes)
// ==========================================
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Authentication required. No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
    return;
  }
};

// ==========================================
// AUTH ENDPOINTS
// ==========================================

// 1. POST /api/auth/register (Create Account)
app.post(
  "/api/auth/register",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({
          message: "All fields (name, email, password) are required.",
        });
        return;
      }
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: "Email is already registered." });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
        },
      });

      res.status(201).json({
        message: "User registered successfully!",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
    } catch (error) {
      console.error("Register Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// 2. POST /api/auth/login (Log In)
app.post(
  "/api/auth/login",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required." });
        return;
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(400).json({ message: "Invalid email or password." });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid email or password." });
        return;
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({
        message: "Login successful!",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("Login Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// 3. GET /api/auth/me (Current User Profile - Protected)
app.get(
  "/api/auth/me",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, createdAt: true },
      });

      if (!user) {
        res.status(404).json({ message: "User not found." });
        return;
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Auth Me Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// ==========================================
// JOB APPLICATION CRUD ENDPOINTS (Protected)
// ==========================================

// 1. POST /api/applications (Create Application)
app.post(
  "/api/applications",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const {
        companyName,
        jobTitle,
        jobUrl,
        source,
        status,
        applicationDate,
        notes,
      } = req.body;

      if (!companyName || !jobTitle || !source || !status || !applicationDate) {
        res.status(400).json({ message: "Required fields are missing." });
        return;
      }

      const newApplication = await prisma.jobApplication.create({
        data: {
          userId: userId!,
          companyName,
          jobTitle,
          jobUrl,
          source,
          status,
          applicationDate: new Date(applicationDate),
          notes,
        },
      });

      res.status(201).json({
        message: "Application tracked successfully!",
        application: newApplication,
      });
    } catch (error) {
      console.error("Create Application Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// 2. GET /api/applications (List own applications with Search, Filter & Sort)
app.get(
  "/api/applications",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const { search, status, source, sort } = req.query;

      const whereClause: any = { userId };

      if (search) {
        whereClause.OR = [
          { companyName: { contains: search as string, mode: "insensitive" } },
          { jobTitle: { contains: search as string, mode: "insensitive" } },
        ];
      }

      if (status && status !== "all") {
        whereClause.status = status as string;
      }
      if (source && source !== "all") {
        whereClause.source = source as string;
      }

      let orderByClause: any = { createdAt: "desc" };

      if (sort === "oldest") {
        orderByClause = { createdAt: "asc" };
      } else if (sort === "newest") {
        orderByClause = { createdAt: "desc" };
      }

      const applications = await prisma.jobApplication.findMany({
        where: whereClause,
        orderBy: orderByClause,
      });

      res.status(200).json(applications);
    } catch (error) {
      console.error("Get Applications Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// 3. GET /api/applications/:id (View One Application)
app.get(
  "/api/applications/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const id = req.params.id as string;

      const application = await prisma.jobApplication.findUnique({
        where: { id: id },
      });

      if (!application || application.userId !== userId) {
        res
          .status(404)
          .json({ message: "Application not found or unauthorized." });
        return;
      }

      res.status(200).json(application);
    } catch (error) {
      console.error("Get Single Application Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// 4. PATCH /api/applications/:id (Update Application)
app.patch(
  "/api/applications/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const id = req.params.id as string;
      const dataToUpdate = req.body;

      const application = await prisma.jobApplication.findUnique({
        where: { id: id },
      });

      if (!application || application.userId !== userId) {
        res
          .status(404)
          .json({ message: "Application not found or unauthorized." });
        return;
      }

      if (dataToUpdate.applicationDate) {
        dataToUpdate.applicationDate = new Date(dataToUpdate.applicationDate);
      }

      const updatedApplication = await prisma.jobApplication.update({
        where: { id: id },
        data: dataToUpdate,
      });

      res.status(200).json({
        message: "Application updated successfully!",
        application: updatedApplication,
      });
    } catch (error) {
      console.error("Update Application Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// 5. DELETE /api/applications/:id (Delete Application)
app.delete(
  "/api/applications/:id",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      const id = req.params.id as string;

      const application = await prisma.jobApplication.findUnique({
        where: { id: id },
      });

      if (!application || application.userId !== userId) {
        res
          .status(404)
          .json({ message: "Application not found or unauthorized." });
        return;
      }

      await prisma.jobApplication.delete({ where: { id: id } });

      res.status(200).json({ message: "Application deleted successfully!" });
    } catch (error) {
      console.error("Delete Application Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// ==========================================
// DASHBOARD STATISTICS ENDPOINT (Protected)
// ==========================================

// GET /api/dashboard/stats
app.get(
  "/api/dashboard/stats",
  authMiddleware,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;

      const counts = await prisma.jobApplication.groupBy({
        by: ["status"],
        where: { userId },
        _count: { id: true },
      });

      const stats: Record<string, number> = {
        total: 0,
        saved: 0,
        applied: 0,
        assessment: 0,
        interview: 0,
        rejected: 0,
        offer: 0,
      };

      counts.forEach((item) => {
        const statusKey = item.status.toLowerCase();
        if (statusKey in stats) {
          stats[statusKey] = item._count.id;
        }
      });

      const totalCount = await prisma.jobApplication.count({
        where: { userId },
      });
      stats.total = totalCount;

      const recentlyAdded = await prisma.jobApplication.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      res.status(200).json({ stats, recentlyAdded });
    } catch (error) {
      console.error("Dashboard Stats Error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
);

// API Health Check
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running perfectly with Prisma v7!",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
