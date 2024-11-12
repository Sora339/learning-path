import { format } from "date-fns";
import { Timer, TimerReset } from "lucide-react";
import { notFound } from "next/navigation";

import Card from "@/app/components/layout/article/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GalleryArticle } from "@/types/gallery-articles";

export default async function Page({ params }: { params: { articleId: string } }) {
  const { articleId } = params;

  const res = await fetch(`${process.env.BASE_URL}/api/article/${articleId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const article: GalleryArticle = await res.json();

  const formattedCreatedAt = format(article.createdAt, "yyyy/MM/dd");
  const formattedUpdatedAt = format(article.updatedAt, "yyyy/MM/dd");

  return (
    <div className="bg-yellow-200">
      <div className="flex justify-center px-[10px] py-[100px]">
        <div className="relative w-full rounded-md bg-white p-8 md:w-[85%] xl:w-3/4 xl:p-[70px]">
          <p className="absolute left-0 top-0 bg-yellow-300 px-3 py-1">{article.category.name}</p>
          <h1 className="mb-3 text-3xl font-bold">{article.title}</h1>
          <div className="mb-[15px] flex justify-between">
            <div className="flex gap-3">
              <time className="flex items-center gap-2 text-gray-600">
                <Timer size={18} />
                {formattedCreatedAt}
              </time>
              {formattedCreatedAt != formattedUpdatedAt && (
                <time className="flex items-center gap-2 text-gray-600">
                  <TimerReset size={18} />
                  {formattedUpdatedAt}
                </time>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="mx-auto size-9 border">
                <AvatarImage src={article.author.image ?? undefined} className="size-9" />
                <AvatarFallback>{article.author.name}</AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{article.author.name}</h2>
            </div>
          </div>
          <div>
            {/* Vertical line connecting the cards */}
            {/* <div className="absolute left-1/2 z-0 h-full w-1 -translate-x-1/2 bg-gray-500"></div> */}
            <div className="space-y-8">
              {/*後で型作ります*/}
              {article.nodes.map((node, index) => (
                <Card key={node.id} node={node} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
