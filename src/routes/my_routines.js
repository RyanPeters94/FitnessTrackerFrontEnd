import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  VStack,
  Button,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  chakra,
  SimpleGrid,
  Image,
  Flex
} from "@chakra-ui/react";
import { deleteRoutine } from "./UpdateRoutine";
import { images } from "../components";
import { CheckIcon } from "@chakra-ui/icons";


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

const MyRoutines = ({ token, routines }) => {
  const [myRoutines, setMyRoutines] = useState([]);
  // console.log([myRoutines]);

  let navigate = useNavigate();

  const username = window.localStorage.getItem("username");

  useEffect(() => {
    const routinesGrab = async () => {
      try {
        const response = await fetch(
          `https://fitnesstrac-kr.herokuapp.com/api/users/${username}/routines`
        );

        const data = await response.json();
        setMyRoutines(data);
      } catch (error) {
        console.error("error", error);
      }
    };
    routinesGrab();
  }, []);

  const onDelete = async (token, routineId) => {
    const data = await deleteRoutine(token, routineId);
  };
  console.log(myRoutines);
  return (
    <Box bg={"#C7BEA2"}>
      {myRoutines.length
        ? myRoutines.map((myRoutine) => (
            <Center py={6}>
              <Box
                maxW={"330px"}
                w={"full"}
                bg={"#393239"}
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
                key={myRoutine.id}
              >
                <VStack
                  textAlign={"center"}
                  p={6}
                  color={"#AAA492"}
                  align={"center"}
                >
                  <Stack
                    direction={"column"}
                    align={"center"}
                    justify={"center"}
                  >
                    <Text fontSize={"6xl"} fontWeight={600} color={"#AAA492"}>
                      {myRoutine.name}
                    </Text>
                    <List>
                      <ListItem>Goal: {myRoutine.goal}</ListItem>
                      <ListItem>Created By: {myRoutine.creatorName}</ListItem>
                    </List>
                  </Stack>
                  <Button
                    colorScheme={"blue"}
                    variant={"solid"}
                    onClick={() =>
                      navigate(`../update-routine/${myRoutine.id}`, {
                        replace: true,
                      })
                    }
                  >
                    Update Routine
                  </Button>
                  <Button
                    colorScheme={"blue"}
                    variant={"solid"}
                    onClick={(e) => onDelete(e, token, myRoutine.id)}
                  >
                    Delete Routine
                  </Button>
                </VStack>
                {myRoutine.activities &&
                  myRoutine.activities.map((myRoutineActivity) => (
                    <Box
                      bg={"#393239"}
                      px={6}
                      py={10}
                      key={myRoutineActivity.id}
                    >
                      <List spacing={3} color={"#AAA492"}>
                        <ListItem>
                          <ListIcon as={CheckIcon} color="blue.400" />
                          Activity: {myRoutineActivity.name}
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CheckIcon} color="blue.400" />
                          Description: {myRoutineActivity.description}
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CheckIcon} color="blue.400" />
                          Duration: {myRoutineActivity.duration}
                        </ListItem>
                        <ListItem>
                          <ListIcon as={CheckIcon} color="blue.400" />
                          Repetitions: {myRoutineActivity.count}
                        </ListItem>
                      </List>
                    </Box>
                  ))}
              </Box>
            </Center>
          ))
        : <Box
        bg={"#C7BEA2"}
        >
        <VStack
          textAlign={"center"}
          p={6}
          color={"black"}
          align={"center"}
        >
        <Heading> 
          You have No Routines yet, Please visit our Routines page to Create a Routine!
        </Heading>
        <Box
        maxW="7xl"
        mx={"auto"}
        pt={5}
        px={{ base: 2, sm: 12, md: 17 }}
        bg={"#C7BEA2"}
        justifyItems={"center"}
      >
        <chakra.h1>
          Thank you for Using Fitness Tracker by Ryan Peters
        </chakra.h1>
        <Flex justifyContent={"center"} padding={"10px"} >
          <Image
              opacity={0.2}
              src={images.Logo}
              h={"150px"}
              w={"150px"}

            >

          </Image>
        </Flex>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Click below to be redirected to: 
        </chakra.h1>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, lg: 8 }}
          justifyContent={"center"}
        >
          <StatsCard
            title={"Click here for "}
            stat={"Routines"}
            route={"../routines"}
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
        </VStack>
        </Box>
        }
    </Box>
  );
};
export default MyRoutines;
