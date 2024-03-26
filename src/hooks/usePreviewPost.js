import React from "react";
import { useDispatch } from "react-redux";
import { popups } from "../slice/popup_Slice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
const usePreviewPost = () => {
  let [isUpdating, setIsUpdating] = React.useState(false);
  let [result, setResult] = React.useState(null);
  let size = 2 * 1024 * 1024; // 2MB
  let storage = getStorage();
  let dispatch = useDispatch();
  const getPreview = async (file,uid) => {
    if (isUpdating && !result) return;
    console.warn(file);
    setIsUpdating(true);
    if (file.size > size) {
      dispatch(
        popups.actions.add({
          content: "The file size is too large",
        })
      );
      setIsUpdating(false);
      return;
    }
    try {
      const storageRef = ref(storage, "posts/" + uid);
      let snapshot = await uploadBytesResumable(storageRef, file);
      console.warn(snapshot.ref);

      let url = await getDownloadURL(snapshot.ref);
      if (url) {
        setResult(url);
        console.log(url);
      }
    } catch (err) {
      dispatch(
        popups.actions.add({
          content: err.message,
        })
      );
    } finally {
      setIsUpdating(false);
    }
  };
  return { isUpdating, result, getPreview };
};

export default usePreviewPost;
