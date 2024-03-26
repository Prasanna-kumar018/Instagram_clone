import React from "react";
import { Flex, Container, Box, Skeleton } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { FollowingPosts } from "../FollowingPosts/FollowingPosts";
import Suggestions from "../Suggestions/Suggestions";
import useGetPost from "../hooks/useGetPost";
import { useSelector } from "react-redux";
function Home()
{
  let { data: authuser } = useSelector(state => state.user);
  let { result, postloading } = useGetPost();  
  let bool = !postloading && authuser ;
  return (
    <Container maxW={"container.lg"} pl={10} pr={50} pt={10}>
      <Flex direction={"row"} gap={20}>
        <Box flex={1} minW={"50vmin"}>
          {postloading &&  (
            <FollowingPosts loading={postloading} />
          )}
          {!postloading && result.length !== 0 && (
            <FollowingPosts loading={postloading} result={result} />
          )}
          {bool && !postloading &&  result.length === 0 && <Custom />}
        </Box>

        <Box
          h={"55vmin"}
          p={1}
          className="suggest-shadow"
          display={{ md: "none", lg: "block", base: "none" }}
          minW={"300px"}
          w={"350px"}
        >
          <Suggestions loading={postloading} />
          {postloading && (
            <Skeleton height={"20px"} w="full" mt={5}>
              <div>1234567890</div>
            </Skeleton>
          )}
          {!postloading && (
            <Text mt={3}>
              © 2023 Built By a <span className="fw-bold">JOKER</span>{" "}
            </Text>
          )}
        </Box>
      </Flex>
    </Container>
  );
    
  
}
export { Home };

function Custom()
{
  return (
    <Flex justifyContent={"center"} alignItems={"center"}
    fontFamily={"var(--f2)"} fontSize={"2.1rem"}>
      <Text color={"red"} >
        Oh Shit! You have n't followed anyone Stop coding and FOLLOW 
        your friends
      </Text>
    </Flex>
  );
}
