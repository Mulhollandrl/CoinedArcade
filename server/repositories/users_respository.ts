import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateUserPayload = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

export type UpdateUserPayload = {
  userId: number,
  firstName: string,
  lastName: string
}

export type UpdateProfilePayload = {
  profileId: number,
  age: number,
  profileImageURL: string,
  description: string
}

export class UsersRepository {
  private db: PrismaClient
  private static instance: UsersRepository
  constructor(db: PrismaClient) {
    this.db = db;
  }

  static getInstance(db?: PrismaClient): UsersRepository {
    if (!this.instance) {
      this.instance = new UsersRepository(db!!);
    }
    return this.instance;
  }


  async createUser({email, password, firstName, lastName}: CreateUserPayload) {
    return this.db.user.create({
      data: {
        email: email,
        passwordHash: bcrypt.hashSync(password),
        firstName: firstName,
        lastName: lastName,
        profile: {
          create: {}
        }
      }
    });
  }


  async getUserById(id: number) {
    return this.db.user.findUnique({
      where: {
        id: id
      },
    });
  }

  async updateUser({userId, firstName, lastName}: UpdateUserPayload) {
    return this.db.user.update({
      where: {
        id: userId
      },
      data: {
        firstName: firstName,
        lastName: lastName
      }
    })
  }

  async getUserProfile(userId: number) {
    return this.db.profile.findFirst({
      where : {
        user: {
          id: userId
        }
      }
    })
  }

  async updateUserProfile({profileId, age, profileImageURL, description}: UpdateProfilePayload) {
    return this.db.profile.update({
      where: {
        id: profileId
      },
      data: {
        age: age,
        profileImageURL: profileImageURL,
        description: description
      }
    })
  }
}