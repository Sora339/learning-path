import { format } from "date-fns";
import { Timer } from "lucide-react";
import Image from "next/image";

import { GalleryArticle } from "@/types/gallery-articles";

export default function Article({ article }: { article: GalleryArticle }) {
  function truncateTitle(title: string, length: number) {
    return title.length > length ? `${title.slice(0, length)}...` : title;
  }

  const truncatedTitle = truncateTitle(article.title, 20);

  return (
    <article className="relative rounded-xl bg-white px-4 py-3 shadow-sm">
      {/*タグ*/}
      <div className="absolute left-0 top-0 bg-yellow-400 px-3 py-1 text-[13px]">{article.category.name}</div>

      <Image
        className="my-[30px] h-[180px] w-full object-contain sm:mb-[10px] sm:mt-0"
        src={article.nodes[0]?.ogp?.["og:image"] || "/path/to/default-image.jpg"}
        width={153}
        height={78}
        alt={article.nodes[0]?.ogp?.["og:title"] || "Default Title"}
      />

      {/* 記事タイトル */}
      <h2 className="mb-[5px] text-lg font-bold">{truncatedTitle}</h2>

      {/*投稿日時*/}
      <div className="flex items-center justify-end gap-2">
        <Timer size={13} />
        <time className="text-[10px]">{format(article.createdAt, "yyyy/MM/dd")}</time>
      </div>
    </article>
  );
}
