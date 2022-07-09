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
} from "@chakra-ui/react";
import { deleteRoutine } from "./UpdateRoutine";
import { createRoutine } from "./CreateRoutine";
import { CheckIcon } from "@chakra-ui/icons";

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
        : null}
    </Box>
  );
};
export default MyRoutines;
