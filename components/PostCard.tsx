import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FunctionComponent } from "react";

interface PostCardProps {
  post: any;
  isAd?: boolean;
}

const PostCard: FunctionComponent<PostCardProps> = ({
  post,
  isAd = false,
}: PostCardProps) => {
  return (
    <Box
      h={200}
      as={motion.div}
      whileHover={{ scale: 0.97 }}
      // @ts-ignore
      transition={{ ease: "easeOut", duration: 0.2 }}
    >
      <LinkBox
        p={5}
        borderColor="gray.200"
        borderWidth="1px"
        backgroundColor={isAd ? "white" : "gray.50"}
        rounded="md"
        alignItems="flex-start"
        h="full"
      >
        {/* <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
13 days ago
</Box> */}

        <VStack textAlign="left" w="full" align="flex-start">
          <Wrap spacing={[2, 4]} w="full">
            {post.properties.tags.slice(0, 2).map((tag: string, i: number) => {
              return (
                <WrapItem key={`tag_${i}`}>
                  <Text fontSize="sm" colorScheme="brand">
                    {tag}
                  </Text>
                </WrapItem>
              );
            })}{" "}
          </Wrap>
          <Heading size="md" my={2} fontWeight={500} noOfLines={2}>
            <LinkOverlay
              href={"/blog/" + post.properties.slug}
              color="gray.800"
            >
              {post.properties.title}
            </LinkOverlay>
          </Heading>
          <Text
            color="gray.500"
            noOfLines={3}
            textAlign="left"
            w="full"
            fontSize="md"
          >
            {post.properties.summary}
          </Text>
        </VStack>
      </LinkBox>
    </Box>
  );
};

export default PostCard;
