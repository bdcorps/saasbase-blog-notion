import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePlausible } from "next-plausible";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";
import { useScrollPosition } from "../../hooks/useScrollPosition";

const navLinks = [
  // { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Books", link: "/books" },
  { name: "Framer Animations", link: "/micro-interactions" },
];

const AnnouncementBar: FunctionComponent = () => {
  const plausible = usePlausible();
  return (
    <Stack
      direction={["column", "row"]}
      justify="center"
      w="full"
      backgroundColor="brand.500"
      color="white"
      align="center"
      p={1}
      spacing={[0, 1]}
    >
      <Text fontSize="sm">
        Grow your SaaS organically with Programmatic SEO.
      </Text>
      <Link
        fontSize="sm"
        href="https://launchman.com?utm_source=saasbase"
        onClick={() => {
          plausible("announcement-bar-launchman-cta");
        }}
        isExternal
        _hover={{ textDecoration: "none", fontWeight: 600 }}
      >
        Try for free →
      </Link>
    </Stack>
  );
};

const DesktopSidebarContents = ({ name }: any) => {
  const router = useRouter();
  const scrollPosition = useScrollPosition();

  const { data: session } = useSession();

  return (
    <Box
      w="full"
      position="fixed"
      top={0}
      background={`${scrollPosition > 0 ? "whiteAlpha.800" : "transparent"}`}
      zIndex={1}
      boxShadow={`${scrollPosition > 0 ? "xs" : "none"}`}
      transition="all 0.3s ease-in-out"
      backdropFilter="blur(4px)"
    >
      {/* <Box display={["none", "block"]}>
        <AnnouncementBar />
      </Box> */}
      <Container maxW={["full", "container.xl"]} p={0}>
        <Stack
          // justify="space-between"
          p={[0, 4]}
          w="full"
          direction={["column", "row"]}
          align="center"
          position="relative"
        >
          <Box display={{ base: "none", md: "flex" }} w="full">
            <Link fontSize="md" fontWeight={500} href="/">
              {name}
            </Link>
          </Box>
          {/* <Spacer /> */}
          <Stack
            pt={[20, 0]}
            spacing={[4, 10]}
            direction={["column", "row"]}
            w="full"
            justify="flex-end"
            align={["flex-start", "center"]}
          >
            {navLinks.map((navLink: any, i: number) => {
              return (
                <Link
                  href={navLink.link}
                  key={`navlink_${i}`}
                  fontWeight={500}
                  variant="ghost"
                  fontSize={["lg", "md"]}
                >
                  {navLink.name}
                </Link>
              );
            })}

            <HStack spacing={1}>
              {session?.user ? (
                <>
                  {/* need to upload the image to cdn */}
                  {/* {session?.user.image && (
                    <Circle size="36px" backgroundColor="brand.100">
                      <Image
                        src={session?.user.image}
                        alt="Profile Picture"
                        rounded="full"
                      ></Image>
                    </Circle>
                  )} */}

                  <Menu>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<ChevronDownIcon />}
                      variant="unstyled"
                      size="sm"
                    />
                    <Portal>
                      <MenuList>
                        <MenuItem
                          onClick={() => {
                            signOut({ callbackUrl: "/" });
                          }}
                        >
                          Log out
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </>
              ) : (
                <Button
                  size="sm"
                  colorScheme="brand"
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("google", {
                      callbackUrl: `/`,
                    });
                  }}
                >
                  Sign in with Google
                </Button>
              )}
            </HStack>
          </Stack>
          {/* <Button
          colorScheme="brand"
          onClick={() => {
            router.push("https://app.launchman.com");
          }}
        >
          Dashboard
        </Button>  */}
          {/* <Spacer /> */}
          {/* <Text>{JSON.stringify(session)}</Text> */}

          {/* {isSignedIn && (
            <Button onClick={() => signOut()} variant="ghost">
              Logout
            </Button>
          ) } */}
        </Stack>
      </Container>
    </Box>
  );
};
const MobileSidebar = ({ name }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex w="full" align="center">
      <Heading fontSize="xl">{name}</Heading>
      <Spacer />
      <IconButton
        aria-label="Open Nav menu"
        size="md"
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top={3.5} color="black" />
          <DrawerHeader color="black" fontSize={["xl", "md"]}>
            {name}
          </DrawerHeader>

          <DrawerBody>
            <DesktopSidebarContents />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

interface SidebarProps {
  name: string;
}

const Sidebar = ({ name }: SidebarProps) => {
  return (
    <chakra.nav id="header">
      <Box display={["block", "none"]}>
        <AnnouncementBar />
      </Box>
      <Box display={{ base: "flex", md: "none" }} p={4}>
        <MobileSidebar name={name} />
      </Box>

      <Box display={{ base: "none", md: "flex" }}>
        <DesktopSidebarContents name={name} />
      </Box>
    </chakra.nav>
  );
};

interface DrawerHomeProps {
  name: string;
}

export const LandingHeader = ({ name }: DrawerHomeProps) => {
  return (
    <Box w="full">
      <Sidebar name={name} />
    </Box>
  );
};
