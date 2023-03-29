import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  const theme = extendTheme({
    components: {
      Button: {
        defaultProps: {
          size: "sm",
          variant: "solid",
        },
      },
      Input: {
        defaultProps: {
          size: "sm",
        },
      },
    },
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

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
