import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Image,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function StatsCard(props: StatsCardProps) {
  const navigate = useNavigate();
  const { title, stat, route } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      rounded={"lg"}
      padding={"15px"}
      mb={"7vh"}
      textAlign={"center"}
      _hover={{ cursor: "pointer" }}
      onClick={() => navigate(`${route}`, { replace: true })}
    >
      <StatLabel fontWeight={"medium"} route={route}>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

function Profile() {
  return (
    <Box bg={"#C7BEA2"}>
      <Container maxW={"3xl"} bg={"#C7BEA2"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome to <br />
            <Text as={"span"} color={"blue.400"}>
              your personal Profile
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Access your routines and Saved Activities here. Thank you for using
            our services and we wish you the best of luck on your fitness
            journey!
          </Text>
          <HStack>
            <Image
              alt={"Home Page Image #1"}
              objectFit={"cover"}
              rounded={"lg"}
              src={
                "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
              }
            />
          </HStack>
        </Stack>
      </Container>

      <Box
        maxW="7xl"
        mx={"auto"}
        pt={5}
        px={{ base: 2, sm: 12, md: 17 }}
        bg={"#C7BEA2"}
        justifyItems={"center"}
      >
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Access all of your Information
        </chakra.h1>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, lg: 8 }}
          justifyContent={"center"}
        >
          <StatsCard
            title={"Click here for "}
            stat={"Your Routines"}
            route={"../my-routines"}
          />
          <StatsCard
            title={"Click here for "}
            stat={"All Activities"}
            route={"../activities"}
          />
          <StatsCard
            title={"Click here for "}
            stat={"Home Page"}
            route={"../home"}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
}
export default Profile;
