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

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loginUser = async (username, password) => {
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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

  const onLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(username, password);
    if (result.error) {
      setLoginMessage(result);
      onOpen();
    }
    window.localStorage.setItem("token", result.token);
    setIsLoggedIn(true);
    window.localStorage.setItem("username", username);
    const myToken = result.token;
    setToken(myToken);
    setLoginMessage(result);
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
            Log In
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
              onClick={(e) => onLogin(e, setToken, username, password)}
            >
              Sign In
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"fill"}
          src={
            "https://images.unsplash.com/photo-1552508744-1696d4464960?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
          <ModalHeader textAlign={"center"}>{loginMessage.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"center"} fontWeight={400}>
            <Text fontWeight={400}>{loginMessage.message}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
export default Login;
