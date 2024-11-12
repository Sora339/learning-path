import { NextRequest, NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";
import { Node } from "@/types/gallery-articles";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";

  const pageNumber = parseInt(page, 10);
  const limit = 9;

  const totalArticles = await prisma.article.count();

  const articles = await prisma.article.findMany({
    include: {
      author: true,
      category: true,
      nodes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (pageNumber - 1) * limit,
    take: limit,
  });

  const updatedArticles = await Promise.all(
    articles.map(async (article) => {
      const updatedNodes = await Promise.all(
        article.nodes.map(async (node: Node) => {
          const ogp = await getOgpInfo(node.nodeUrl);
          return {
            ...node,
            ogp,
          };
        }),
      );

      return {
        ...article,
        nodes: updatedNodes,
      };
    }),
  );

  return NextResponse.json({ articles: updatedArticles, totalArticles });
};
