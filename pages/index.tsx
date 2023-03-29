import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { posts } from "../lib/notion";

export async function getServerSideProps() {
  // Get the posts
  let { results } = await posts();
  // Return the result
  return {
    props: {
      posts: results,
    },
  };
}

interface Props {
  posts: [any];
}

const Home: NextPage<Props> = (props) => {
  return (
    <div>
      <Head>
        <title>Latest posts</title>
      </Head>

      <main>
        {props.posts.map((result, index) => {
          return (
            <div key={`key_${index}`}>
              <Link href={`/posts/${result.id}`}>s</Link>
            </div>
          );
        })}
      </main>

      <footer>
        <p>Blog application</p>
      </footer>
    </div>
  );
};

export default Home;
