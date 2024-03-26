import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import usePreviewImage from "../hooks/usePreviewImage";
import useHandleSubmit from "../hooks/useHandleSubmit";
const EditProfile = ({ isOpen, onClose }) => {
  let closebtnref = React.useRef(null);
  let inputref = React.useRef(null);
  let { data: authuser } = useSelector((state) => state.user);
  const [show, setShow] = React.useState(false);
  let { isUpdating, result, getPreview } = usePreviewImage();
  let { isSubmitloading, handleSubmit } = useHandleSubmit();
  let [data, setData] = React.useState({
    password: authuser.password,
    username: authuser.username,
    Bio: authuser.bio,
    profile: authuser.profilePicURL,
  });
  function handleClick() {
    setShow((p) => {
      return !p;
    });
  }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"black"}
          boxShadow={"xl"}
          border={"1px solid gray"}
          mx={3}
        >
          <ModalHeader />
          <ModalCloseButton color={"white"} ref={closebtnref} />
          <ModalBody>
            <Flex bg={"black"}>
              <Stack
                color={"white"}
                spacing={4}
                w={"full"}
                maxW={"md"}
                bg={"black"}
                p={6}
                my={0}
              >
                <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
                  Edit Profile
                </Heading>
                <FormControl>
                  <Stack direction={["column", "row"]} spacing={6}>
                    <Center>
                      <Avatar
                        size="xl"
                        src={result || authuser.profilePicURL}
                        border={"2px solid white "}
                      />
                    </Center>
                    <Center w="full">
                      <Button
                        w="full"
                        isLoading={isUpdating}
                        onClick={() => {
                          inputref.current.click();
                        }}
                      >
                        Edit Profile Picture
                      </Button>
                    </Center>
                  </Stack>
                </FormControl>
                <Input
                  type="file"
                  ref={inputref}
                  onChange={(e) => {
                    getPreview(e.target.files[0]);
                  }}
                  hidden
                  accept="image/*"
                ></Input>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      placeholder={"Password"}
                      value={data.password}
                      onChange={(e) => {
                        setData({ ...data, password: e.target.value });
                      }}
                      size={"sm"}
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4rem" h="100%">
                      <Button
                        h="100%"
                        bg={"transparent"}
                        color={"white"}
                        _hover={{ color: "aqua" }}
                        onClick={handleClick}
                        m={0}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Username</FormLabel>
                  <Input
                    placeholder={"Username"}
                    value={data.username}
                    onChange={(e) => {
                      setData({ ...data, username: e.target.value });
                    }}
                    size={"sm"}
                    type={"text"}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={"sm"}>Bio</FormLabel>
                  <Input
                    placeholder={"Bio"}
                    value={data.Bio}
                    size={"sm"}
                    onChange={(e) => {
                      setData({ ...data, Bio: e.target.value });
                    }}
                    type={"text"}
                  />
                </FormControl>
                <Stack spacing={6} direction={["column", "row"]}>
                  <Button
                    bg={"red.400"}
                    color={"white"}
                    w="full"
                    size="sm"
                    _hover={{ bg: "red.500" }}
                    onClick={() => {
                      closebtnref.current.click();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    size="sm"
                    w="full"
                    _hover={{ bg: "blue.500" }}
                    isLoading={isSubmitloading || isUpdating}
                    onClick={() => {
                      handleSubmit(data, result);
                      onClose();
                    }}
                  >
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
