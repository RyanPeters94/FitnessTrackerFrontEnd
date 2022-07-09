import { React, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Select,
} from "@chakra-ui/react";

export const deleteRoutine = async (token, routineId) => {
  try {
    const response = await fetch(
      `https://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

const onDelete = async (token, routineId) => {
  const data = await deleteRoutine(token, routineId);
};

export const updateRoutine = async (token, name, goal, isPublic, routineId) => {
  try {
    const response = await fetch(
      `https://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic,
        }),
      }
    );

    const data = response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

const UpdateRoutine = ({ routines, setRoutines }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [routine, setRoutine] = useState([]);
  const [routineMessage, setRoutineMessage] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { routineId } = useParams();

  const onUpdate = async (e, routineId) => {
    e.preventDefault();
    const data = await updateRoutine(name, goal, isPublic, routineId);
    if (data.error) {
      setRoutineMessage(data);
      onOpen();
    }
    setName("");
    setGoal("");
    setIsPublic(true);
    setRoutine(data);
    setRoutineMessage(data);
    onOpen();
  };

  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      bg={"#C7BEA2"}
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading align={"center"} fontSize={"2xl"}>
            Update Routine
          </Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="goal">
            <FormLabel>Goal</FormLabel>
            <Input
              type="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </FormControl>
          <Select placeholder="Select Publicity Option">
            <option
              type="boolean"
              value={true}
              onSubmit={(e) => setIsPublic(e.target.value)}
            >
              True
            </option>
            <option
              type="boolean"
              value={false}
              onSubmit={(e) => setIsPublic(e.target.value)}
            >
              False
            </option>
          </Select>
          <Stack spacing={6}>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={(e) => onUpdate(e, name, goal, isPublic)}
            >
              Update Routine
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader textAlign={"center"}>{routineMessage.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} fontWeight={400}>
            <Text fontWeight={400}>{routineMessage.message}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
export default UpdateRoutine;
