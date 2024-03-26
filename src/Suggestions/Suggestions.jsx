import { Flex, Text, Button, VStack,HStack,Skeleton,SkeletonCircle } from "@chakra-ui/react";
import React from "react";
import SuggestionsHeader from "../ProfileHeader/SuggestionsHeader.jsx";
import SuggestionComponent from "../components/SuggestionComponent.jsx";
import useGetSuggest from "../hooks/useGetSuggest.js";
const Suggestions = ({loading}) => {
  let [seeall, setseeall] = React.useState(false);
  let { result, suggestloading } = useGetSuggest();

  if (loading || suggestloading)
  {
    return (
      <Flex direction={"column"} h={"100%"}>
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
        <Flex
          direction={"row"}
          alignItems={"top"}
          height={"fit-content"}
          gap={5}
          ps={2}
          pe={2}
          justifyContent={"space-between"}
        >
          <Skeleton
            h={"15px"}
            pl={2}
            
            w={"200px"}
          >
          </Skeleton>
          <Skeleton
            h={"15px"}
            pl={2}
            
            w={"200px"}
          >
          </Skeleton>

        
        </Flex>
        <VStack overflowY={!seeall ? "hidden" : "scroll"} flex={"1"}>
          {!suggestloading &&
            result.length !== 0 &&
            result.map((item) => {
              return (
                <HStack p={2} pb={0} w={"full"} gap={"3"}>
                  <SkeletonCircle
                    size="20"
                    aspectRatio={1 / 1}
                    rounded={"full"}
                  />
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
            })}
        </VStack>
      </Flex>
    );  
  }
  return (
    <Flex direction={"column"} h={"100%"}>
      <SuggestionsHeader />
      <Flex
        direction={"row"}
        alignItems={"top"}
        height={"fit-content"}
        justifyContent={"space-between"}
      >
        <Text
          _hover={{
            color: "Black.600",
            cursor: "pointer",
          }}
          pl={2}
          className="text-muted"
          fontWeight={"500"}
        >
          Suggested for you
        </Text>

        <Button
          bg={"transparent"}
          _hover={{ color: "blue" }}
          p={1}
          boxSize={"fit-content"}
          m={0}
          onClick={() => {
            setseeall((b) => {
              return !b;
            });
          }}
        >
          {seeall ? "Show less" : "Show All"}
        </Button>
      </Flex>
      <VStack overflowY={!seeall ? "hidden" : "scroll"} flex={"1"}>
        {!suggestloading && result.length!==0 &&  
          result.map((item) =>
          {
            return <SuggestionComponent username={item.username} uid={item.uid} profilePicURL={item.profilePicURL} followers={item.followers} following={item.following} />;
        })}
      </VStack>
    </Flex>
  );
};

export default Suggestions;
