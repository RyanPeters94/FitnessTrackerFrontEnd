import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Flex,
  Button,
  Text,
  HStack,
  Box,
  StackDivider,
  FeatureProps,
  Container,
  SimpleGrid,
  Heading,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { images } from "../components";

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

function Home(token) {
  let navigate = useNavigate();
  return (
    <div style={{ backgroundColor: "#C7BEA2" }}>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"} bg={"#C7BEA2"}>
          <Stack spacing={6} w={"full"} maxW={"lg"}>
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: useBreakpointValue({ base: "20%", md: "30%" }),
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "blue.400",
                  zIndex: -1,
                }}
              >
                Fitness Tracker
              </Text>
              <br />{" "}
              <Text color={"blue.400"} alignItems={"center"} as={"span"}>
                Find Exercises. Make Routines. Get Swole.
              </Text>
            </Heading>
            <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
              Register or Sign in to Create a Routine or Activity and begin your
              fitness Journey.
            </Text>
            {!token ? ( <Stack direction={{ base: "column", md: "row" }} spacing={4}>
              <Button
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => navigate("./register", { replace: true })}
              >
                Register
              </Button>
              <Button
                rounded={"full"}
                onClick={() => navigate("./login", { replace: true })}
              >
                Login
              </Button> 
            </Stack> ) : null }
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={"Home Page Image #1"}
            objectFit={"cover"}
            rounded={"lg"}
            src={
              "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            }
          />
        </Flex>
      </Stack>

      <Container maxW={"7x1"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Flex>
            <Image
              objectFit={"cover"}
              rounded={"lg"}
              alt={"Home Page Image #2"}
              src={
                "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              }
            />
          </Flex>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={"#C7BEA2"}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Achieve your goals
            </Text>
            <Heading>Find the Activities to suit those goals!</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              With Fitness Tracker you can find or create the perfect activities
              for:
            </Text>
            <Stack
              spacing={4}
              divider={<StackDivider borderColor={"#C7BEA2"} />}
            >
              <Feature
                icon={<Image src={images.scale}></Image>}
                iconBg={"#C7BEA2"}
                text={"Weight Loss"}
              />
              <Feature
                icon={<Image src={images.muscles}></Image>}
                iconBg={"#C7BEA2"}
                text={"Muscle Gain"}
              />
              <Feature
                icon={<Image src={images.abs}></Image>}
                iconBg={"#C7BEA2"}
                text={"Body Recomposition"}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Container maxW={"7x1"} py={12}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={"#C7BEA2"}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Begin Your Journey
            </Text>
            <Heading>Build the routines that fit you Personally!</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              With Fitness Tracker you can find or build the perfect routine
              for:
            </Text>
            <Stack
              spacing={4}
              divider={<StackDivider borderColor={"#C7BEA2"} />}
            >
              <Feature
                icon={<Image src={images.flex}></Image>}
                iconBg={"#C7BEA2"}
                text={"Strength"}
              />
              <Feature
                icon={<Image src={images.runner}></Image>}
                iconBg={"#C7BEA2"}
                text={"Endurance"}
              />
              <Feature
                icon={<Image src={images.stretch}></Image>}
                iconBg={"#C7BEA2"}
                text={"Flexibility"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              objectFit={"cover"}
              rounded={"lg"}
              alt={"Home Page Image #3"}
              src={
                "https://images.unsplash.com/photo-1558017487-06bf9f82613a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=770&q=80"
              }
            />
          </Flex>
        </SimpleGrid>
      </Container>

      <Box justifyContent={"space-between"}>
        <Flex justifyContent={"center"} padding={"10px"}>
          <HStack padding={"10px"}>
            <Image
              opacity={0.2}
              src={images.Logo}
              h={"60px"}
              w={"60px"}
            ></Image>
            <Image
              opacity={0.2}
              src={images.runner}
              h={"60px"}
              w={"60px"}
            ></Image>
            <Image
              opacity={0.2}
              src={images.biking}
              h={"60px"}
              w={"60px"}
            ></Image>
            <Image
              opacity={0.2}
              src={images.swimming}
              h={"60px"}
              w={"60px"}
            ></Image>
            <Image
              opacity={0.2}
              src={images.yoga}
              h={"60px"}
              w={"60px"}
            ></Image>
            <Image
              opacity={0.2}
              src={images.elliptical}
              h={"60px"}
              w={"60px"}
            ></Image>
            <Image
              opacity={0.2}
              src={images.Logo}
              h={"60px"}
              w={"60px"}
            ></Image>
          </HStack>
        </Flex>
      </Box>
    </div>
  );
}
export default Home;
