import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { body, postId } = await req.json();
  try {
    const newPost = await prisma.comment.create({
      data: {
        body,
        userId: session.user?.id || null,
        postId: postId,
      },
    });
    revalidatePath("/detail/[id]")
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ message: "Could not create post." });
  }
}


