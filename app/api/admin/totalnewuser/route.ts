import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const currentDate = new Date();
        const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); 

        const newUsers = await prisma.user.findMany({
            where: {
                createdAt: {
                    gte: oneWeekAgo 
                }
            },
            include: {
                sessions: {
                    select: {
                        expires: true,
                    },
                },
            },
        });

        return NextResponse.json(newUsers);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Could not fetch new users" });
    }
}
