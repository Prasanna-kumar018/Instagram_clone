import React from "react";
import { database, auth } from "../firebase/firebaseconfig";
import { useDispatch } from "react-redux";
import { popups } from "../slice/popup_Slice";
import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { setuser } from "../slice/authuser";
import { setProfile } from "../slice/userProfile";
const useHandleSubmit = () => {
  let [isSubmitloading, setSubmit] = React.useState(false);
  let dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const q = query(collection(database, "users"), where("uid", "==", user.uid));
  const handleSubmit = async (data, result) => {
    if (isSubmitloading) return;
    console.warn("uid", user);
    setSubmit(true);
    try {
      let snapshot = await getDocs(q);
      let id;
      let users;
      snapshot.forEach((item) => {
        users = item.data();
        id = item.id;
      });
      if (id && users) {
        let newdata = {
          ...users,
          bio: data.Bio,
          password: data.password,
          username: data.username,
          profilePicURL: result || users.profilePicURL,
        };
        console.error(newdata);
        let reference = doc(database, "users", id);
        await updateDoc(reference, newdata);
        localStorage.setItem("user-info", JSON.stringify(newdata));
         dispatch(setuser({
          data: newdata,
        }));
        dispatch(setProfile({
          data: newdata,
        }));
        console.warn("passed");
      }
    } catch (err) {
      dispatch(
        popups.actions.add({
          content: err.message,
        })
      );
    } finally {
      setSubmit(false);
    }
  };

  return { isSubmitloading, handleSubmit };
};

export default useHandleSubmit;
