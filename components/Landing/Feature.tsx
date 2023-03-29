import { Box, Center, Container, Stack, Text, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
  video: string;
  reverse?: boolean;
  i: number;
}

export const Feature: FunctionComponent<FeatureProps> = ({
  title,
  description,
  image,
  video,
  reverse,
  i,
}: FeatureProps) => {
  const rowDirection = reverse ? "row-reverse" : "row";
  return (
    <Box w="full">
      <Container maxW="container.xl">
        <Center w="full">
          <Container maxW="container.xl" rounded="lg">
            <Stack
              spacing={[4, 16]}
              alignItems="center"
              direction={["column", null, rowDirection]}
              w="full"
              h="full"
            >
              <Box rounded="lg" flex={2}>
                <video
                  playsInline
                  loop
                  muted
                  poster={image}
                  autoPlay
                  style={{ borderRadius: "6px" }}
                >
                  <source src={video} type="video/webm" />
                </video>
              </Box>

              <VStack
                maxW={500}
                spacing={4}
                align={["center", "flex-start"]}
                flex={1}
              >
                <Box textAlign={["center", "left"]}>
                  <Text
                    fontSize="xs"
                    fontWeight={500}
                    textTransform="uppercase"
                    color="brand.200"
                  >
                    {`${i + 1}/3`}
                  </Text>
                  <Text
                    fontSize="3xl"
                    fontWeight={600}
                    align={["center", "left"]}
                    color="whiteAlpha.900"
                  >
                    {title}
                  </Text>
                </Box>
                <Text
                  fontSize="md"
                  color="whiteAlpha.700"
                  textAlign={["center", "left"]}
                >
                  {description}
                </Text>
                {/* <Button
              colorScheme="brand"
              variant="link"
              textAlign={["center", "left"]}
            >
              Learn more →
            </Button> */}
              </VStack>
            </Stack>
          </Container>
        </Center>
      </Container>
    </Box>
  );
};
