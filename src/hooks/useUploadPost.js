import React from "react";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { popups } from "../slice/popup_Slice";
import { database } from "../firebase/firebaseconfig";
import { setuser } from "../slice/authuser";
import { setProfile } from "../slice/userProfile";

const useUploadPost = () => {
  let { data: authuser } = useSelector((state) => state.user);
  let [uploading, setuploading] = React.useState(false);
  let dispatch = useDispatch();
  async function addpost(caption, image, uid) {
    if (uploading) return;
    setuploading(true);
    try {
      let newobj = {
        caption: caption,
        likes: [],
        comments: [],
        createdAt: Date.now(),
        createdBy: authuser.uid,
        postImage: image,
        objuid: uid,
      };
      const q = query(
        collection(database, "users"),
        where("uid", "==", authuser.uid)
      );
      let doci = await getDocs(q);
      let ref;
      let res;

      doci.forEach((item) => {
        res = item.data();
        ref = item.id;
      });
      let obj = {
        ...res,

        posts: [...res.posts, newobj],
      };
      await updateDoc(doc(database, "users", ref), obj);
      dispatch(
        setuser({
          data: obj,
        })
      );
      dispatch(
        setProfile({
          data: obj,
        })
      );
      dispatch(
        popups.actions.add({
          content: "Post added Successfully",
        })
      );
    } catch (err) {
      console.warn(err);
      dispatch(
        popups.actions.add({
          content: err.message,
        })
      );
    } finally {
      setuploading(false);
    }
  }
  return { addpost, uploading };
};

export default useUploadPost;
