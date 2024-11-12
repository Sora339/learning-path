import "github-markdown-css/github-markdown.css";
import "katex/dist/katex.min.css";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import gfm from "remark-gfm";
import remarkMath from "remark-math";

import { Node } from "@/types/gallery-articles";

import CodeBlock from "../../article/code-block";

export default function Card({ index, node }: { index: number; node: Node }) {
  return (
    <div className="mx-auto rounded-lg border bg-[#fffefc] p-6 hover:shadow-sm">
      <Link href={node.nodeUrl} target="_blank">
        <h3 className="mb-4 text-[23px] font-semibold">
          {index + 1}.{node.nodeTitle}
        </h3>
        <div className="flex flex-col gap-5 md:flex-row md:items-center">
          <Image
            src={node.ogp?.["og:image"] || "/path/to/default-image.jpg"}
            alt={node.ogp?.["og:title"] || "Default Title"}
            width={300}
            height={200}
            className="mb-[10px] mr-4 w-full md:mb-0 md:w-2/5"
          />
          <p className="w-full text-xl md:w-[65%]">{node.ogp?.["og:title"] || "No Title Available"}</p>
        </div>
        <ReactMarkdown
          className="mt-4 rounded-md border bg-white p-4"
          children={node.comment}
          components={{
            code: CodeBlock,
          }}
          remarkPlugins={[gfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </Link>
    </div>
  );
}
