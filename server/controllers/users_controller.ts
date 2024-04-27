import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { authMiddleware } from "../middleware/authentication";
import { UsersRepository } from "../repositories/users_respository";

// /users/...
export const buildUsersController = (usersRepository: UsersRepository) => {
  const router = Router();

  router.post("/", async (req, res) => {
    const user = await usersRepository.createUser(req.body);

    const token = jwt.sign({
      userId: user.id,
    }, process.env.ENCRYPTION_KEY as string);

    res.json({ user, token });
  });

  router.get("/me", authMiddleware, (req, res) => {
    res.json({ user: req.user });
  });

  router.get("/me/profile", authMiddleware, async (req, res) => {
    if (req.user != undefined) {
      const profile = await usersRepository.getUserProfile(req.user.id)
      console.log(profile)
      res.json({ user: req.user, profile });
    } else {
      res.json({user: "Unauthorized!", profile: "Unauthorized!"})
    }
  });

  router.post("/me", (req, res) => {
    const user = usersRepository.updateUser(req.body.user)
    const profile = usersRepository.updateUserProfile(req.body.profile)

    res.json({ user, profile })
  });

  return router;
}

