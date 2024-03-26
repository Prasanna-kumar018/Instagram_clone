import React from "react";
import { auth, database } from "../firebase/firebaseconfig";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { popups } from "../slice/popup_Slice";
import { getDocs, query, where } from "firebase/firestore";
import { setuser } from "../slice/authuser";
import { collection } from "firebase/firestore";
const useSignIn = () => {
  let dispatch = useDispatch();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  let collectionRef = collection(database, "users");
  let isdispatch = React.useRef(true);
  if (loading)
  {
    isdispatch.current = true;
  }
  if (!loading && error && isdispatch.current) {
    dispatch(
      popups.actions.add({
        content: error.message.split(":")[1],
      })
    );
    isdispatch.current = false;
  }
  async function handlelogin(inputs) {
    try {
      let userdata = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );

      if (userdata)
      {
        let uid = userdata.user.uid;
        let q = query(collectionRef, where("uid", "==", uid));
        let snap = await getDocs(q);
        let res;
        snap.forEach((item) => {
          res = item.data();
        });
        if (res)
        {
          localStorage.setItem("user-info", JSON.stringify(res));
          dispatch(setuser({
            data:res
          }));
          dispatch(
            popups.actions.add({
              content: "You have Signed In Successfully",
            })
          );
        }
      }
    }
    catch (error)
    {
      console.log(error.message);
    }
  }
  return { handlelogin, loading, user };
};

export default useSignIn;
