import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/libs/AuthOptions";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const { name, email,selectedFile } = await req.json();
  const id = params.id;

  try {
    const post = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        image:selectedFile,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error editing post" });
  }
}
