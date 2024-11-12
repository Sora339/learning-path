import Image from "next/image";

import { GalleryArticle } from "@/types/gallery-articles";

export default function ArticleThumbnail({ article }: { article: GalleryArticle }) {
  return (
    <div className="relative">
      <div className="relative space-y-8">
        <div key={article.nodes[0].id} className="relative">
          <div className="rounded border bg-[#fffefc] p-2">
            <Image
              className="h-[180px] w-full object-cover"
              src={article.nodes[0]?.ogp?.["og:image"] || "/path/to/default-image.jpg"}
              width={153}
              height={78}
              alt={article.nodes[0]?.ogp?.["og:title"] || "Default Title"}
            />
          </div>
          <div className="absolute left-1/2 top-full h-8 w-1.5 -translate-x-1/2 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
