import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { popups } from "../slice/popup_Slice";
import { setuser } from "../slice/authuser";
import {
  arrayRemove,
  arrayUnion,
  collection,
  getDocs,
  query,
    updateDoc,
  doc,
  where,
  getDoc,
} from "firebase/firestore";
import { database } from "../firebase/firebaseconfig";
import { setProfile } from "../slice/userProfile";
const useFollow = () => {
  let { data:authuser } = useSelector(state => state.user);
  let [loading, setLoading] = React.useState(false);
  let dispatch = useDispatch();
 
  async function abc(profileuid)
  {
      if (loading)
      return;
    setLoading(true);
    try {
       let arr = authuser?.following;
       let isfollowing = arr.includes(profileuid);
      const quser1 = query(
        collection(database, "users"),
        where("uid", "==", authuser.uid)
      );
      const quser2 = query(
        collection(database, "users"),
        where("uid", "==", profileuid)
      );
      const userarr = await getDocs(quser1);
      const profilearr = await getDocs(quser2);
      let userdocid;
      let userdata;
      let profiledata;
      let profiledocid;
      userarr.forEach((item) => {
        userdata = item.data();
        userdocid = item.id;
      });
      profilearr.forEach((item) => {
        profiledocid = item.id;
        profiledata = item.data();
      });

      await updateDoc(doc(database, "users", userdocid), {
        ...userdata,
        following: isfollowing
          ? arrayRemove(profileuid)
          : arrayUnion(profileuid),
          
        
      });

      await updateDoc(doc(database, "users", profiledocid), {
        ...profiledata,
        followers: isfollowing
          ? arrayRemove(authuser.uid)
          : arrayUnion(authuser.uid),
      });
        
        let result = await getDoc(doc(database, "users", userdocid));
        console.warn(result.data());
        dispatch(
          setuser({
            data: result.data()
          })
      );
       let result2 = await getDoc(doc(database, "users", profiledocid));
       dispatch(
         setProfile({
           data: result2.data(),
         })
       );
       localStorage.setItem("user-info", JSON.stringify(result.data()));
    } catch (err) {
      dispatch(
        popups.actions.add({
          content: err.message,
        })
      );
    } finally {
      setLoading(false);
    }
  }
  return { loading, abc };
};

export default useFollow;
