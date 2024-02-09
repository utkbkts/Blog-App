import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server";
export async function GET(){
    try {
      const post = await prisma.comment.findMany();
      return NextResponse.json(post);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Could not fetch post" });
    }
  }