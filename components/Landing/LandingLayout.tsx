import "@fontsource/inter";

import {
  Box,
  ChakraProvider,
  Container,
  extendTheme,
  Image,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { FunctionComponent } from "react";
import Footer from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f0e4ff",
      100: "#cbb2ff",
      200: "#a480ff",
      300: "#7a4dff",
      400: "#641bfe",
      500: "#5a01e5",
      600: "#5200b3",
      700: "#430081",
      800: "#2d004f",
      900: "#14001f",
    },
  },
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
});

interface LayoutProps {
  backgroundColor?: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: FunctionComponent<LayoutProps> = ({
  title,
  description,
  children,
  backgroundColor = "white",
}: LayoutProps) => {
  const pageTitle = title || "Learn to build SaaS products | SaaSBase";
  const pageDescription =
    description ||
    "Build your saas product faster with our in-depth technical guides on building common features like authentication, subscription payments, and more.";
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title={pageTitle}
        description={pageDescription}
        openGraph={{
          url: "https://saasbase.dev",
          title: "Learn to build SaaS products | SaaSBase",
          description: pageDescription,
          images: [
            {
              url: "/meta.png",
              width: 1200,
              height: 630,
              alt: "name",
              type: "image/jpeg",
            },
          ],
        }}
        additionalLinkTags={[
          {
            rel: "shortcut icon",
            type: "image/png",
            href: "/logo.png",
          },
        ]}
      ></NextSeo>

      <Box position="relative" background="#f6f4fc">
        <Box
          position="absolute"
          top={60}
          left="20%"
          filter={"blur(64px) opacity(3%) saturate(3)"}
        >
          <Image src="/ellipse.svg" w={400} />
        </Box>

        <Box
          zIndex={-1}
          position="absolute"
          top={0}
          right={100}
          filter={"blur(64px) opacity(4%) saturate(1)"}
        >
          <Image src="/ellipse.svg" w={400} />
        </Box>

        <Box zIndex={4}>
          <LandingHeader name="SaaSBase" />
          <Container maxW="container.xl" mt={[6, 32]}>
            {children}
            <Box mt={6}>
              <Footer name="SaaSBase" />
            </Box>
          </Container>
        </Box>
        {/* <Box backgroundColor={backgroundColor} w="full">
        <Box w="full" textAlign="center">
          <LandingHeader name="SaaSBase" />
          {children}
          <Footer name="SaaSBase" />
        </Box>
      </Box> */}
      </Box>
    </ChakraProvider>
  );
};

export default Layout;
