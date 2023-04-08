import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import ReactMarkdown from "react-markdown";
import BlogLayout from "../../components/BlogLayout";
import MDXComponents from "../../components/MDXComponents";
import { blocks, post, posts } from "../../lib/notion";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { slug } = ctx.params as IParams;
  // Get the dynamic id
  let page = await post(slug);

  // Fetch the post
  let results = await blocks(page!.id);
  // Get the children
  return {
    props: {
      slug,
      post: page,
      blocks: results,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  let results = await posts();
  // Get all posts
  return {
    paths: results.map((post: any) => {
      // Go through every post
      return {
        params: {
          // set a params object with an id in it
          slug: post.properties.slug || "",
          id: post.id,
        },
      };
    }),
    fallback: false,
  };
};

interface Props {
  id: string;
  slug: string;
  post: any;
  blocks: [any];
}

const Post: NextPage<Props> = ({ id, slug, post, blocks }: any) => {
  return (
    <BlogLayout
      frontMatter={{
        title: post.properties.title,
        publishedAt: "",
        summary: post.properties.summmary,
        tags: [],
      }}
    >
      <>
        {blocks.map((block: any, index: any) => {
          return (
            <ReactMarkdown key={index} components={MDXComponents}>
              {block.parent}
            </ReactMarkdown>
          );
        })}
      </>
    </BlogLayout>
  );
};

export default Post;
