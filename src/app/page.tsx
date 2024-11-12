import { GalleryArticle } from "@/types/gallery-articles";

import ArticleSection from "./components/shared/article-section";
import CategorySection from "./components/shared/category-section";
import MoreBtn from "./components/top/more-btn";
import RecommendLogin from "./components/top/recommend-login";

export default async function Home() {
  //並列に処理
  const res = await fetch(`${process.env.BASE_URL}/api/articles?page=1`, {
    cache: "no-store",
  });

  const articlesBytotalArticles: { articles: GalleryArticle[]; totalArticles: number } = await res.json();
  const { articles } = articlesBytotalArticles;

  return (
    <>
      <ArticleSection title="新着Path一覧" articles={articles}>
        <MoreBtn />
      </ArticleSection>
      <CategorySection />
      <RecommendLogin />
    </>
  );
}
