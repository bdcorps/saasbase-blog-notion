import {
  Badge,
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React from "react";
import { IFrontMatter } from "../types";
import { encodeSlug, getMetaImage, prettifyTag } from "../utils";
import LandingFooter from "./Landing/LandingFooter";
import { LandingHeader } from "./Landing/LandingHeader";

export default function BlogLayout({
  children,
  frontMatter,
}: {
  children: React.ReactNode;
  frontMatter: IFrontMatter;
}) {
  const { colorMode } = useColorMode();
  const textColor = {
    light: "gray.700",
    dark: "gray.400",
  };
  const router = useRouter();
  const slug = router.asPath.replace("/blog", "");
  return (
    <Box>
      <LandingHeader name="SaaSBase" />
      <Container maxW="container.xl" mt={20}>
        <NextSeo
          title={`${frontMatter.title} | SaaSBase`}
          description={frontMatter.summary}
          additionalLinkTags={[
            {
              rel: "shortcut icon",
              type: "image/png",
              href: "/logo.png",
            },
          ]}
        ></NextSeo>
        <VStack spacing={10} w="full" align="center">
          <HStack w="full" align="flex-start">
            <Container textAlign="left" maxW="container.lg" flex={3}>
              <VStack align="flex-start" spacing={2} w="full">
                {/* <Text color="gray.500" fontSize="sm" w="full">
              Published on
            </Text> */}

                <Center>
                  <HStack>
                    {frontMatter.tags &&
                      frontMatter.tags.map((tag: string, i: number) => {
                        return (
                          <Badge rounded="full" key={`tag_${i}`} px={2}>
                            <Link href={`/tag/${encodeSlug(tag)}`}>
                              {prettifyTag(tag)}
                            </Link>
                          </Badge>
                        );
                      })}
                  </HStack>
                </Center>

                <Heading w="full" fontWeight={600} as="h1" fontSize="4xl">
                  {frontMatter.title}
                </Heading>
                <Text fontSize="lg" w="full" color="gray.500">
                  {frontMatter.summary}
                </Text>

                <Image
                  rounded="md"
                  py={4}
                  src={getMetaImage(frontMatter.title)}
                  alt="Featured Image"
                ></Image>
                <Box w="full">{children}</Box>
              </VStack>
            </Container>

            <VStack
              display={["none", "inline"]}
              w="full"
              h="full"
              spacing={2}
              flex={1}
              p={4}
              rounded="md"
              color="black"
              align="flex-start"
              position="sticky"
              top={20}
              backgroundColor="gray.50"
            >
              <Text fontWeight={500}>Struggling to grow your SaaS?</Text>
              <Text fontSize="sm">
                Launchman helps you convert more users from Google search by
                publishing marketing pages at scale.
              </Text>
              <Box>
                <Link
                  href="https://launchman.com?via=saasbase"
                  isExternal
                  fontSize="sm"
                  color="brand.500"
                >
                  Try for free →
                </Link>
              </Box>
            </VStack>
          </HStack>

          <LandingFooter name="SaaSBase" />
        </VStack>
      </Container>
    </Box>
  );
}
