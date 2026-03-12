import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authJWT } from "./middlewares/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;
const jwtSecret = process.env.JWT_SECRET_KEY || "your_secret_key";

app.use(express.json());

const users = [
  {
    id: 1,
    email: "user1@gmail.com",
    password: await bcrypt.hash("password111", 10),
  },
  {
    id: 2,
    email: "user2@gmail.com",
    password: await bcrypt.hash("password111", 10),
  },
  {
    id: 3,
    email: "user3@gmail.com",
    password: await bcrypt.hash("password111", 10),
  },
];

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json("Auth failed. Email or password are incorrect");
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: "1h",
      },
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello it works");
});

app.get("/profile", authJWT, (req, res) => {
  res.json({
    status: "success",
    data: req.user,
  });
});

app.put("/update-profile", authJWT, (req, res) => {
  const { email } = req.body;
  const user = users.find((u = u.id === req.user.userId));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
