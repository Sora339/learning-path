import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma/client";
import { Node } from "@/types/gallery-articles";

export const POST = async (req: NextRequest) => {
  const { title, categoryId, nodes } = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) throw Error("認証してくださいね!");

  const { id: authorId } = session.user;

  const article = await prisma.article.create({
    data: {
      title,
      authorId,
      categoryId: categoryId,
      nodes: {
        create: nodes.map((node: Node) => ({
          comment: node.comment,
          nodeTitle: node.nodeTitle,
          nodeUrl: node.nodeUrl,
          order: 1,
        })),
      },
    },
  });

  return NextResponse.json({ article }, { status: 201 });
};
