import {v4 as uuid4 } from "uuid"
import React from "react";
import { Box, Flex, Tooltip,Image, Input, ModalFooter,CloseButton, Button, Textarea, ModalBody, ModalCloseButton, ModalContent,AlertTitle,AlertDescription, ModalOverlay, useDisclosure, Modal, ModalHeader, Link, Alert } from "@chakra-ui/react";
import { CreatePostLogo } from "../assets/assets";
import usePreviewPost from "../hooks/usePreviewPost"
import { popups } from "../slice/popup_Slice";
import { BsFillImageFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import useUploadPost from "../hooks/useUploadPost";
const CreatePost = () => {
    let { isOpen,onOpen,onClose} = useDisclosure();

	return (
    <Tooltip
      hasArrow
      _hover={ 
      {
        label :"Create"
      }}
      openDelay={500}
      placement="right"
      bg={"black"}
      fontSize={"1.2em"}
      padding-left={"3vmin"}
      padding-right={"3vmin"}
      padding-top={"1.5vmin"}
      padding-bootm={"1.5vmin"}
      className="shadow"
      ml={"2vmin"}
    >
      <Link
        className="hover_link"
        onClick={() => {
            onOpen();
        }}
      >
        <Flex
          padding={{ base: "0", md: "1.1vmin" }}
          justifyContent={{ base: "center ", md: "stretch" }}
        >
          <Box
            width={{ base: "fit-content", md: "max-content" }}
            ml={{ base: "0", md: "2vmin" }}
            className="jump "
            padding={{ md: "0", base: "3vmin" }}
            borderRadius={{ md: 0, base: "10px" }}
            justifyItems={{ base: "start", md: "stretch" }}
          >
            <CreatePostLogo />
          </Box>
          <Box pl={"2.5vmin"} display={{ base: "none", md: "block" }}>
            {"Create"}
          </Box>
          <ModalSetUp isOpen={isOpen} onClose={onClose} />
        </Flex>
      </Link>
    </Tooltip>
  );
};

export default CreatePost;
function ModalSetUp({isOpen,onClose})
{

  let { data: authuser } = useSelector(state => state.user);
  let { isUpdating, result , getPreview } = usePreviewPost();
  let { addpost, uploading } = useUploadPost();
  let imagefileref = React.useRef(null);
  let dispatch = useDispatch();
  let [caption, setcaption] = React.useState("");
  let [Result, setResult] = React.useState(result);
  let uid = uuid4();
  let [openis, setOpenis] = React.useState(true);
  React.useEffect(() =>
  {
    setResult(result);
  },[result])
  function handleAlertClick()
  {
    setOpenis((b) =>
    {
      return !b;
    })
  }
  function handleClick()
  {
    setResult(null);
  }
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />

        <ModalContent bg={"black"} border={"1px solid gray"} color={"white"}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {openis && (
              <Alert color={"Red"} mb={2} w={"full"}>
                <Box w={"full"}>
                  <AlertTitle>Disclaimer!</AlertTitle>
                  <AlertDescription>
                    Upload the Image as small size as possible...
                  </AlertDescription>
                </Box>
                <CloseButton
                  alignSelf="flex-start"
                  position="relative"
                  right={-1}
                  top={-1}
                  onClick={handleAlertClick}
                />
              </Alert>
            )}
            <Textarea placeholder="Post caption..." value={caption} onChange={(e) =>
            {
              setcaption(e.target.value);
            }} />
            <Input
              type="file"
              accept="image/*"  
              onChange={(e) => {
                getPreview(e.target.files[0],uid);
                setOpenis(true);
              }}
              hidden
              ref={imagefileref}
            />

            <BsFillImageFill
              style={{
                marginTop: "15px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                imagefileref.current.click();
              }}
              size={16}
            />
          </ModalBody>
          {Result && (
            <CloseButton
              size={"md"}
              color={"white"}
              ml={"auto"}
              pr={8}
              onClick={() => {
                handleClick();
              }}
            />
          )}
          <ModalFooter>
            <Flex direction={"column"} gap={2}>
              {Result && (
                <Image src={Result} width={"100%"} aspectRatio={1 / 1} />
              )}
              <Button isLoading={isUpdating || uploading }  mr={3} onClick={() =>
              {
                if (!Result)
                {
                  dispatch(popups.actions.add({
                    content: "Please Select an Image to Post"
                  }))
                }
                else
                {
                  addpost(caption, Result, uid);
                  onClose();
                }
              }}>
                Post
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}

