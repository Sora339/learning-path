import { NextRequest, NextResponse } from "next/server";

import { getOgpInfo } from "@/lib/get-ogp-info";
import prisma from "@/lib/prisma/client";
import { Node } from "@/types/gallery-articles";

export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;

  // pagenation
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || "1";
  const pageNumber = parseInt(page, 10);
  const limit = 9;

  // 指定されたカテゴリを取得
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) return NextResponse.json({}, { status: 404 });

  // そのカテゴリに属する記事一覧を取得
  const articles = await prisma.article.findMany({
    include: {
      author: true,
      category: true,
      nodes: true,
    },
    orderBy: {
      createdAt: "desc",
    },

    // pagenation
    skip: (pageNumber - 1) * limit,
    take: limit,
    where: { categoryId: id },
  });

  // 各記事のノードのOGP情報を取得し、データ構造を整える
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

      const authorInfo = {
        authorImage: article.author?.image || "",
        authorName: article.author?.name || "",
      };

      return {
        ...article,
        nodes: updatedNodes,
        ...authorInfo,
      };
    }),
  );

  return NextResponse.json({ articles: updatedArticles, totalArticles: articles.length });
};
