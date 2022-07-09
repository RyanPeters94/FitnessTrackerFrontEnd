import { React, useState } from "react";
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
} from "@chakra-ui/react";

export const updateActivity = async (token, name, description, activityId) => {
  try {
    const response = await fetch(
      `$https://fitnesstrac-kr.herokuapp.com/api/activities/${activityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    const data = response.json();
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

const UpdateActivity = ({ activityId, activities, setActivities }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activityMessage, setActivityMessage] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onUpdate = async (e, activityId) => {
    e.preventDefault();
    const data = await updateActivity(name, description, activityId);
    if (data.error) {
      setActivityMessage(data);
      onOpen();
    }
    if (data && data.name) {
      const newActivities = [
        data,
        ...activities.filter((activity) => {
          return activity.id !== activityId;
        }),
      ];

      setActivities(newActivities);
      setName("");
      setDescription("");
      setActivityMessage(newActivities);
      onOpen();
    }
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
            Update Activity
          </Heading>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Input
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={(e) => onUpdate(e, name, description)}
            >
              Update Activity
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
          <ModalHeader textAlign={"center"}>{activityMessage.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} fontWeight={400}>
            <Text fontWeight={400}>{activityMessage.message}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
export default UpdateActivity;
