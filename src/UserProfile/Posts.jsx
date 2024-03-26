import { Grid, Flex, Text, Skeleton } from "@chakra-ui/react";
import { BsGrid3X3, BsBookmark, BsSuitHeart } from "react-icons/bs";
import React from "react";

import GridCustom from "./GridCustom.jsx";
const Posts = ({ loading, data }) => {
  if (loading) {
    return (
      <Grid
        mt={10}
        templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
        gap={1}
        columnGap={1}
      >
        <Skeleton aspectRatio={1 / 1} />
        <Skeleton aspectRatio={1 / 1} />
        <Skeleton aspectRatio={1 / 1} />
        <Skeleton aspectRatio={1 / 1} />
        <Skeleton aspectRatio={1 / 1} />
      </Grid>
    );
  }

  if (!loading && data) {
    return (
      <Flex direction={"column"} gap={1}>
        <Flex fontWeight={"700"} w={"full"} justifyContent={"center"}>
          <Flex
            p={3}
            borderBottom={"2px solid black"}
            gap={2}
            alignItems={"Center"}
          >
            <BsGrid3X3 size={"30"} />
            <Text m={0} fontSize={"20px"}>
              POSTS
            </Text>
          </Flex>
          <Flex p={3} gap={2} alignItems={"Center"}>
            <BsBookmark size={"30"} />
            <Text m={0} fontSize={"20px"}>
              SAVED
            </Text>
          </Flex>
          <Flex p={3} gap={2} alignItems={"Center"}>
            <BsSuitHeart size={"30"} />
            <Text m={0} fontSize={"20px"}>
              LIKES
            </Text>
          </Flex>
        </Flex>
        <Grid
          templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
          gap={1}
          columnGap={1}
        >
          { data.posts.length!==0  && 
            data.posts.map((item) =>   (
              <GridCustom
                caption={item.caption}
                comments={item.comments}
                createdAt={item.createdAt}
                likes={item.likes}
                objuid={item.objuid}
                postImage={item.postImage}
                createdBy={item.createdBy}
              />
            )
          )}
        </Grid>
      </Flex>
    );
  }
};

export default Posts;
