import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { tokenGenerator } from '../tokenGenerator';
import dotenv from 'dotenv';

dotenv.config();

interface CurrentUserDataWithoutPassword {
    id: number;
    name: string;
    email: string;
    balance: number;
}

const prisma = new PrismaClient();

interface JwtPayload {
    id: number;
}

type UserData = User | null;

export const getCurrentUser = async (token: string | undefined): Promise<UserData> => {
    if (!token) {
        throw new Error("No token provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const userId = decoded.id;

        const currentUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                balance: true,
                password:false 
            },
        });

        if (!currentUser) {
            throw new Error("User not found");
        }

        return currentUser 
    } catch (error) {
        console.error("Error identifying user:", error);
        throw new Error("Authentication failed");
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany();
        if (!users) {
            throw new Error("No users found");
        }
        return users;
    } catch (error) {
        throw new Error("Fetching users failed");
    }
};

export const paymentService = async (
    senderId: number,
    receiverId: number,
    amount: string
): Promise<{ updatedSender: User; updatedReceiver: User }> => {
    try {
        const parsedAmount = parseInt(amount, 10);

        if (!senderId || !receiverId || isNaN(parsedAmount) || parsedAmount <= 0) {
            throw new Error("SenderId, ReceiverId must be valid and Amount must be a positive integer.");
        }

        const transaction = await prisma.$transaction(async (prisma) => {
            const sender = await prisma.user.findUnique({
                where: { id: senderId },
            });

            const receiver = await prisma.user.findUnique({
                where: { id: receiverId },
            });

            if (!sender || !receiver) {
                throw new Error("SenderId or ReceiverId not found.");
            }

            if (sender.balance < parsedAmount) {
                throw new Error("Insufficient balance.");
            }

            const updatedSender = await prisma.user.update({
                where: { id: senderId },
                data: { balance: sender.balance - parsedAmount },
            });

            const updatedReceiver = await prisma.user.update({
                where: { id: receiverId },
                data: { balance: receiver.balance + parsedAmount },
            });

            return { updatedSender, updatedReceiver };
        });

        return transaction;
    } catch (error: any) {
        console.error("Payment processing error:", error.message);
        throw new Error("Payment could not be processed: " + error.message);
    }
};

interface LoginInput {
    email: string;
    password: string;
}

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export const loginService = async ({ email, password }: LoginInput): Promise<string> => {
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) {
        console.log
        throw new Error('User not found');
    }

    const token = tokenGenerator(user.id);

    return token;
};

export const registerService = async ({ name, email, password }: RegisterInput): Promise<User> => {
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                balance: 25000,
            },
        });
        return user;
    } catch (err) {
        console.log(err)
        throw new Error("Could not process registration");
        console.log(err)
    }
};
