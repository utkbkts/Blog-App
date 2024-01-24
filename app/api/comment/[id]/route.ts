import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    const session = await getServerSession(authOptions);
  
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
  
    const id = params.id;
    try {
      const post = await prisma.comment.delete({ where: { id } });
      return NextResponse.json(post);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error deleting the post" });
    }
  }

  export async function GET(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const id = params.id;
      const post = await prisma.comment.findMany({
        where: { postId:id },
        include: { user: { select: { name: true } } },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json(post);
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Could not fetch post" });
    }
  }