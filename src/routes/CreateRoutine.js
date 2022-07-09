import { React, useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalFooter,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CreateRoutine({ token, routines, setRoutines }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [routineMessage, setRoutineMessage] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  let navigate = useNavigate();

  const routinesGrab = async (token, name, goal, isPublic) => {
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/routines`,
        {
          method: "POST",
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

  const onCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = await routinesGrab(token, name, goal, isPublic);
    if (data.error) {
      setRoutineMessage(data);
      onOpen();
    }
    setRoutines([data, ...routines]);
    setName("");
    setGoal("");
    setIsPublic(true);
    setRoutineMessage(routineMessage.name === "Routine Created Successfully");
    onOpen();
    navigate("./routines", { replace: true });
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
            Create Routine
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
              onClick={(e) => onCreate(e, name, goal, isPublic)}
            >
              Create Routine
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
}
export default CreateRoutine;
