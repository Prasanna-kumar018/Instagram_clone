import React from "react";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import {
  Box,
  Image,
  Skeleton,
  SkeletonCircle,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseconfig";
const FollowingPosts = ({ loading, result }) =>
{
  let [user] = useAuthState(auth);
  if (loading)
  {
    return (
      <Box mb={10} className="suggest-shadow">
        <HStack p={2} w={"full"} gap={"3"}>
          <SkeletonCircle size="20" aspectRatio={1 / 1} rounded={"full"} />
          <VStack gap={3} w="full">
            <Skeleton height={"20px"} w="full">
              <div>1234567890-</div>
            </Skeleton>
            <Skeleton height={"20px"} w="full">
              <div>1234567890</div>
            </Skeleton>
          </VStack>
        </HStack>
        <Box>
          <Skeleton height={"400px"} w="full">
            <div>1234567890-</div>
          </Skeleton>
        </Box>
        <VStack align={"start"} pb={3} mt={2} pl={5}>
          <Skeleton h="16px">
            <div>contents wrapped</div>
          </Skeleton>
          <Skeleton h="16px" w={"400px"}>
            <div>contents wrapped</div>
          </Skeleton>
          <Skeleton h="16px" w={"200px"}>
            <div>contents wrapped</div>
          </Skeleton>
        </VStack>
      </Box>
    );
  }
  let arr = result.map((item,indx) =>
  {
    return (
      <Box mb={10} className="suggest-shadow" key={indx}>
        <Flex justifyContent={"start"} direction={"column"}>
     {!loading && result && (
            <PostHeader createdBy={item.createdBy} createdAt={item.createdAt} />
          )}
          <Box aspectRatio={1 / 1}>
            <Image src={item.postImage} w={"100%"} h={"100%"}></Image>
          </Box>
   {!loading && result && user &&  (
          <PostFooter likes={item.likes} createdBy={item.createdBy}  comments={item.comments}
              caption={item.caption} objuid={item.objuid} />
          )}
        </Flex>
      </Box>
    );
  })
  return (
    <>
      {arr}
    </>
  )
};

export { FollowingPosts };
