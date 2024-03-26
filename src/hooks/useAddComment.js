import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { popups } from "../slice/popup_Slice";
import { collection, query, updateDoc, where,getDocs,doc } from "firebase/firestore";
import { database } from "../firebase/firebaseconfig";
import { setuser } from "../slice/authuser";
const useAddComment = () => {
  let [isloading, setisloading] = React.useState(false);
  let { data: authuser } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  async function abc(result, comment, objuid,createdBy) {
    setisloading(true);
    try {
      let requiredpost = result.posts.filter((item) =>
      {
        if (item.objuid === objuid)
          return item;
      })
      let otherposts = result.posts.filter((item) => {
        if (item.objuid !== objuid)
          return item;
      });

      const q = query(collection(database, "users"), where('uid', '==', authuser.uid));
      let snap = await getDocs(q)
      let tes;
      snap.forEach((e) =>
      {
        tes = e.data();
      })
      let obj = {
        createdAt: Date.now(),
        createdBy: authuser.uid,
        comment: comment,
        username: tes.username,
        followers: tes.followers,
        profilePicURL:tes.profilePicURL
      };
      requiredpost[0].comments.push(obj);
      let posts = [...otherposts, ...requiredpost];
      console.warn(posts);
       const q1 = query(
         collection(database, "users"),
         where("uid", "==", createdBy)
       );
       let snap2 = await getDocs(q1);
      let id;
      let data;
       snap2.forEach((e) => {
         id = e.id;
         data = e.data();
       });

      await updateDoc(doc(database, "users", id), {
        ...data,
        posts:posts
      });
     
      dispatch(
        popups.actions.add({
          content: "Comment Added Succesfully...",
        })
      );
      dispatch(setuser({
         data:tes
       }));
    } catch (err) {
      dispatch(
        popups.actions.add({
          content: err.message,
        })
      );
    } finally {
      setisloading(false);
    }
  }
    
  return { isloading, abc };
};

export default useAddComment;
