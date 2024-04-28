import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { ScoresRepository } from "../repositories/scores_repository";

export const buildScoreController = (scoresRepository: ScoresRepository) => {
    const router = Router();

    router.post("/", async (req, res) => {
        const score = await scoresRepository.createScore(req.body)

        res.json({ score })
    })

    router.post("/score/:id", async (req, res) => {
        const score = await scoresRepository.updateScore(req.body)

        res.json({ score })
    })

    router.get("/score/:id", async (req, res) => {
        const score = await scoresRepository.getScoreById(parseInt(req.params.id))

        res.json({ score })
    })

    router.get("/user/:id", async (req, res) => {
        console.log("getting scores for user")
        console.log(req.params.id)
        const scoreList = await scoresRepository.getScoreByUserId(parseInt(req.params.id))

        res.json({ scoreList })
    })

    return router;
}