
export interface IFrontMatter {
  publishedAt: string;
  title: string;
  summary: string;
  tags: string[];
}

export interface IPosts {
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
  image: string;
}
