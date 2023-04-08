import { Container, SimpleGrid } from "@chakra-ui/react";
import PostCard from "components/PostCard";
import type { NextPage } from "next";
import { posts } from "../lib/notion";

export async function getServerSideProps() {
  // Get the posts
  let results = await posts();
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
    <Container maxW="container.xl">
      <SimpleGrid columns={[1, null, 3]} spacing={6} w="full">
        {props.posts.map((post: any, i: number) => {
          return <PostCard post={post} key={`post_${i}`} />;
        })}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
