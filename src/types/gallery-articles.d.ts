export type GalleryArticle = {
  id: number;
  title: string;
  author: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null; // Date型に修正
    image: string | null;
  };
  authorId: string;
  category: {
    id: string; // string型に修正
    name: string;
  };
  createdAt: Date; // Date型に修正
  nodes: Node[];
  updatedAt: Date; // Date型に修正
};

export type Node = {
  id: number;
  articleId: number;
  comment: string | null;
  createdAt: Date; // Date型に変更
  nodeTitle: string;
  nodeUrl: string;
  ogp?: {
    // ogpをオプショナルにする
    "og:image": string;
    "og:site_name": string;
    "og:title": string;
    "og:type": string;
    "og:url": string;
  };
  order: number;
  updatedAt: Date; // Date型に変更
};
