import {
  Box,
  Container,
  Divider,
  HStack,
  LinkBox,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

interface FooterProps {
  name: string;
}

const Footer: FunctionComponent<FooterProps> = ({ name }: FooterProps) => {
  return (
    <Box id="footer" w="full">
      <Divider borderColor="whiteAlpha.400" />
      <Container maxW="container.xl" p={4}>
        <HStack py={2} spacing={6} align="center">
          <HStack spacing={2} w="full" justify="space-between" align="end">
            <Text fontWeight={500} fontSize="md">
              © 2023 {name}
            </Text>
          </HStack>
          <LinkBox></LinkBox>
        </HStack>
      </Container>
    </Box>
  );
};

export default Footer;
