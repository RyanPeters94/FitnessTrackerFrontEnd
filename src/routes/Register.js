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
} from "@chakra-ui/react";

import { useState } from "react";

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const registerUser = async (username, password) => {
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error", error);
    }
  };

  const onRegister = async (e) => {
    e.preventDefault();
    const result = await registerUser(username, password);
    if (result.error) {
      setRegisterMessage(result);
      onOpen();
    }
    window.localStorage.setItem("token", result.token);
    window.localStorage.setItem("username", username);
    const myToken = result.token;
    setToken(myToken);
    setRegisterMessage(result);
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
            Register
          </Heading>
          <FormControl id="email">
            <FormLabel>Username</FormLabel>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              colorScheme={"blue"}
              variant={"solid"}
              onClick={(e) => onRegister(e, setToken, username, password)}
            >
              Sign Up
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Register Image"}
          objectFit={"fill"}
          src={
            "https://images.unsplash.com/photo-1582727807014-5b320f436d33?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          }
        />
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
          <ModalHeader textAlign={"center"}>{registerMessage.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} fontWeight={400}>
            <Text fontWeight={400}>{registerMessage.message}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
export default Register;
