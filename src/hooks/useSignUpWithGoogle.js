import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { popups } from "../slice/popup_Slice";
import { auth, database } from "../firebase/firebaseconfig";
import { query, getDocs, where, collection,addDoc } from "firebase/firestore";
import { setuser } from "../slice/authuser";
import { setProfile } from "../slice/userProfile";
const useSignUpWithGoogle = () => {
  const [SignInWithGoogle, loading] = useSignInWithGoogle(auth);
  let dispatch = useDispatch();
  let collectionRef = collection(database, "users");

  async function handleSigningoogle() {
    try {
      let userdata = await SignInWithGoogle();
      if (userdata)
      {
        let uid = userdata.user.uid;
        let q = query(collectionRef, where("uid", "==", uid));
        let snap = await getDocs(q);
        let res;
        snap.forEach((item) =>
        {
          res = item.data();
        });
        console.warn(userdata.user);
        if (res)
        {
          localStorage.setItem("user-info", JSON.stringify(res));
          dispatch(setuser({
            data: res
          }));
          dispatch(setProfile({
            data:res
          }))
          dispatch(
            popups.actions.add({
              content: "You have Signed In Successfully",
            })
          );
        }
        else {
          let userdoc = {
            uid: userdata.user.uid,
            email: userdata.user.email,
            password: userdata.user.email.split("@")[0],
            username: userdata.user.displayName,
            bio: "",
            profilePicURL: userdata.user.photoURL,
            followers: [],
            following: [],
            posts: [],
            createdAt: Date.now(),
          };
          await addDoc(collectionRef, userdoc);  
          localStorage.setItem("user-info", JSON.stringify(userdoc));
          dispatch(setuser({
            data:userdoc
          }));
          dispatch(
            setProfile({
              data: res,
            })
          );
          dispatch(
            popups.actions.add({
              content: "You are signed Up successfully",
            })
          );
        }
      }
    } catch (err) {
      dispatch(
        popups.actions.add({
          content: err.message,
        })
      );
    }
  }
  return { handleSigningoogle, loading };
};

export default useSignUpWithGoogle;
