import { useState, React } from "react";
import { Link, Routes, Route } from "react-router-dom";
import {
  Home,
  Register,
  Login,
  Profile,
  Routines,
  Activities,
  MyRoutines,
  CreateActivity,
  CreateRoutine,
  UpdateRoutine,
} from "./imports";
import {
  Flex,
  Button,
  HStack,
  Box,
  Stack,
  Image,
  Container,
  ButtonGroup,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { images } from "../src/components";

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  const logout = (setToken) => {
    window.localStorage.clear();
    setToken("");
  };

  return (
    <div className="App">
      <Box justifyContent={"center"}>
        <Flex
          bg={"#393239"}
          h={"8vh"}
          justifyContent={"space-around"}
          flexGrow={1}
        >
          <HStack background-color="#393239">
            <Link
              to="/home"
              style={{
                h: "55px",
                w: "55px",
              }}
            >
              <Image src={images.Logo} h="55px" w="55px"></Image>
            </Link>
            {/* <Image
                src={images.Logo}
                display="inline"
                alt="Logo"
                position="absolute"
                top="8px"
                left="16px"
                h="55px"
                w="55px"
                padding="5px"
                mr="5px"
                _hover={{ cursor: "pointer" }}
                onClick={() => navigate("./home", { replace: true })}
              /> */}
            <Link
              to="/home"
              style={{
                color: "#AAA492",
                padding: "15px",
                justifyContent: "center",
              }}
            >
              Home
            </Link>

            {!token ? (
              <Link to="/login" style={{ color: "#AAA492", padding: "15px" }}>
                Login
              </Link>
            ) : null}

            {!token ? (
              <Link
                to="/register"
                style={{ color: "#AAA492", padding: "15px" }}
              >
                Register
              </Link>
            ) : null}

            {token ? (
              <Link
                to="/routines"
                style={{ color: "#AAA492", padding: "15px" }}
              >
                Routines
              </Link>
            ) : null}
            {token ? (
              <Link
                to="/activities"
                style={{ color: "#AAA492", padding: "15px" }}
              >
                Activities
              </Link>
            ) : null}
            {token ? (
              <Link
                to="/my-routines"
                style={{
                  color: "#AAA492",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                My Routines
              </Link>
            ) : null}
            {token ? (
              <Link to="/profile" style={{ color: "#AAA492", padding: "15px" }}>
                Profile
              </Link>
            ) : null}
            {token ? (
              <Button
                onClick={() => logout(setToken)}
                colorScheme={"blue"}
                variant={"solid"}
                ml={"1rem"}
                mb={"1rem"}
                mt={".75rem"}
                height={"30px"}
              >
                Logout
              </Button>
            ) : null}
          </HStack>
        </Flex>
      </Box>
      <Routes>
        <Route path="*" element={<Home  token={token} />} />
        <Route path="profile" element={<Profile token={token} />} />
        <Route path="login" element={<Login setToken={setToken} />} />
        <Route path="register" element={<Register setToken={setToken} />} />
        <Route path="routines" element={<Routines />} />
        <Route path="my-routines" element={<MyRoutines token={token} />} />
        <Route
          path="update-routine/:routineId"
          element={<UpdateRoutine token={token} />}
        />
        <Route path="activities" element={<Activities token={token} />} />
        <Route
          path="create-activity"
          element={<CreateActivity token={token} />}
        />
        <Route
          path="create-routine"
          element={<CreateRoutine token={token} />}
        />
      </Routes>
      <Box bg="#393239">
        <Container role="contentinfo" py={{ base: "12", md: "16" }}>
          <Stack spacing={{ base: "4", md: "5" }}>
            <Text fontSize="sm" color="#AAA492" alignSelf="center">
              Thank you for visiting Our Site!
            </Text>
            <Stack justify="space-between" direction="row" alignSelf="center">
              <ButtonGroup variant="ghost">
                <IconButton
                  as="a"
                  href="https://github.com/RyanPeters94"
                  aria-label="GitHub"
                  icon={<FaGithub fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="https://www.linkedin.com/in/ryan-ben-peters"
                  aria-label="LinkedIn"
                  icon={<FaLinkedin fontSize="1.25rem" />}
                />
              </ButtonGroup>
            </Stack>
            <Text fontSize="sm" color="#AAA492" alignSelf="center">
              &copy; {new Date().getFullYear()} FitnessTrackr, Inc. All rights
              reserved.
            </Text>
          </Stack>
        </Container>
      </Box>
    </div>
  );
}

export default App;
