import React from "react";
import {
  Flex,
  Avatar,
  Text,
  Button,
  HStack,
  SkeletonCircle,
  VStack,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import useGetTime from "../utils/useGetTime";
import { Link as RouterLink } from "react-router-dom";
import useGetHeader from "../hooks/useGetHeader";
import useFollow from "../hooks/useFollow";
const PostHeader = ({ createdBy, createdAt }) => {
  let { loading, result } = useGetHeader(createdBy);
  let { loading: followloading, abc } = useFollow();
  let value = useGetTime(createdAt);
  
  console.warn("resutl:", result);
  if (loading) {
    return (
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
    );
  }
  if (!loading && result) {
    return (
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        w={"full"}
        p={2}
      >
        <Flex direction={"row"} gap={2}>
          <Link as={RouterLink} to={"/"+result.username}>
            <Avatar name={result.username} src={result.profilePicURL}></Avatar>
          </Link>
          <Text
            display={"inline-block"}
            my="auto"
            fontFamily={"cursive"}
            fontWeight={500}
          >
            {result.username} • {value}
          </Text>
        </Flex>
        <Button
          className="btn btn-primary"
          isLoading={followloading}
          variant={"blue"}
          mr={2}
          onClick={() => {
            abc(result.uid);
          }}
        >
          {" "}
          Unfollow{" "}
        </Button>
      </Flex>
    );
  }
};

export default PostHeader;
