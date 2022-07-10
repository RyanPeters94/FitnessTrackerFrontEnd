import {
  Box,
  Text,
  Stack,
  Button,
  Heading,
  Grid,
  Center,
  ListItem,
  List,
} from "@chakra-ui/react";
import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  let navigate = useNavigate();

  const getActivities = async () => {
    try {
      const response = await fetch(
        `https://fitnesstrac-kr.herokuapp.com/api/activities`,
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
    const fetchActivities = async () => {
      const data = await getActivities();
      setActivities(data);
    };
    fetchActivities();
  }, [setActivities]);
  return (
    <Box bg={"#C7BEA2"}>
    <Box textAlign="center" py={10} px={6}>
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Create an Activity
        </Heading>
        <Text color={"gray.500"}>
          If you would like to take your fitness journey to the next step Click
          below to create a new Activity!
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
          onClick={() => navigate("../create-activity", { replace: true })}
        >
          Click Here to Create a new Activity
        </Button>
      </Box>
      <Grid templateColumns={"repeat(3, 1fr)"} gap={4}>
        {activities.map((activity) => (
          <Center py={6}>
            <Box
              maxW={"330px"}
              w={"full"}
              bg={"#393239"}
              boxShadow={"2xl"}
              rounded={"lg"}
              overflow={"hidden"}
              key={activity.id}
            >
              <Stack
                textAlign={"center"}
                p={6}
                color={"#AAA492"}
                align={"center"}
              >
                <Stack direction={"row"} align={"center"} justify={"center"}>
                  <Text fontSize={"6xl"} fontWeight={600} color={"#AAA492"}>
                    {activity.name}
                  </Text>
                </Stack>
              </Stack>

              <Box bg={"#393239"} px={6} py={10}>
                <List spacing={3} color={"#AAA492"}>
                  <ListItem textAlign={"center"}>
                    <Text alignItems={"center"}>{activity.description}</Text>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Center>
        ))}
      </Grid>
    </Box>
  );
};
export default Activities;
