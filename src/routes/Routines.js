import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const Routines = () => {
  const [routines, setRoutines] = useState([]);
  let navigate = useNavigate();

  const getRoutines = async () => {
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/routines`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    const fetchRoutines = async () => {
      const data = await getRoutines();
      setRoutines(data);
    };
    fetchRoutines();
  }, [setRoutines]);

  return (
    <Box bg={"#C7BEA2"}>
    <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Create a Routine
        </Heading>
        <Text color={"gray.500"}>
          If you would like to take your fitness journey to the next step Click
          below to create your own Routine!
        </Text>
        <Button
          mt={10}
          w={"full"}
          bg={"blue.400"}
          color={"white"}
          rounded={"xl"}
          boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "green.500",
          }}
          onClick={() => navigate("../create-routine", { replace: true })}
        >
          Click Here to Create a Routine
        </Button>
      </Box>
      {routines.map((routine) => (
        <Center py={6}>
          <Box
            maxW={"330px"}
            w={"full"}
            bg={"#393239"}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
            key={routine.id}
          >
            <VStack
              textAlign={"center"}
              p={6}
              color={"#AAA492"}
              align={"center"}
            >
              <Stack direction={"column"} align={"center"} justify={"center"}>
                <Text fontSize={"6xl"} fontWeight={600} color={"#AAA492"}>
                  {routine.name}
                </Text>
                <List>
                  <ListItem>Goal: {routine.goal}</ListItem>
                  <ListItem>Created By: {routine.creatorName}</ListItem>
                </List>
              </Stack>
            </VStack>
            {routine.activities &&
              routine.activities.map((routineActivity) => (
                <Box bg={"#393239"} px={6} py={10} key={routineActivity.id}>
                  <List spacing={3} color={"#AAA492"}>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="blue.400" />
                      Activity: {routineActivity.name}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="blue.400" />
                      Description: {routineActivity.description}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="blue.400" />
                      Duration: {routineActivity.duration}
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckIcon} color="blue.400" />
                      Repetitions: {routineActivity.count}
                    </ListItem>
                  </List>
                </Box>
              ))}
          </Box>
        </Center>
      ))}
    </Box>
  );
};
export default Routines;
