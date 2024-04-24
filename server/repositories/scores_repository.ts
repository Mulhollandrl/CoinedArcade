import { PrismaClient, Game } from "@prisma/client";

export type CreateScorePayload = {
    userId: number,
    score: number,
    game: Game,
}

export type UpdateScorePayload = {
    id: number,
    userId: number,
    score: number,
    game: Game
}

export class ScoresRepository {
    private db: PrismaClient
    private static instance: ScoresRepository
    constructor(db: PrismaClient) {
      this.db = db;
    }
  
    static getInstance(db?: PrismaClient): ScoresRepository {
      if (!this.instance) {
        this.instance = new ScoresRepository(db!!);
      }
      return this.instance;
    }

    async createScore({ userId, score, game }: CreateScorePayload) {
        return this.db.score.create({
            data: {
                userId: userId,
                score: score,
                game: game
            }
        })
    }

    async updateScore({ id, userId, score, game }: UpdateScorePayload) {
        return this.db.score.update({
            where: {
                id: id
            },
            data: {
                userId: userId,
                score: score,
                game: game
            }
        })
    }

    async getScoreById(id: number) {
        return this.db.score.findUnique({
            where: {
                id: id
            }
        })
    }

    async getScoreByUserId(userId: number) {
        return this.db.score.findMany({
            where: {
                userId: userId
            }
        })
    }
}