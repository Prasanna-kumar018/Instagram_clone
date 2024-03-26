import { auth } from "../firebase/firebaseconfig";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { popups } from "../slice/popup_Slice";
import { database } from "../firebase/firebaseconfig";
import { collection, getDocs,addDoc, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import  {setuser,setlogout} from "../slice/authuser"
export function useSignup() {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  let collectionRef = collection(database, "users");
  let dispatch = useDispatch();
  async function abc(signupInputs) {
    if (!signupInputs.email) {
      dispatch(
        popups.actions.add({
          content: "Fill the  Email_id",
        })
      );
      return;
    }
    if (!signupInputs.password) {
      dispatch(
        popups.actions.add({
          content: "Fill the Password",
        })
      );
      return;
    }
    if (!signupInputs.confirmPassword) {
      dispatch(
        popups.actions.add({
          content: "Fill the confirm Password",
        })
      );
      return;
    }
    if (!signupInputs.username) {
      dispatch(
        popups.actions.add({
          content: "Fill the Username",
        })
      );
      return;
    }
    if (signupInputs.password !== signupInputs.confirmPassword) {
      dispatch(
        popups.actions.add({
          content: "Your confirm Password does n't match your password",
        })
      );
      return;
    }
    if (signupInputs.password.length <= 6) {
      dispatch(
        popups.actions.add({
          content: "Password must have atleast 7 characters",
        })
      );
      return;
    }
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      signupInputs.email
    );
    if (!isValid) {
      dispatch(
        popups.actions.add({
          content: "Email is Not Valid",
        })
      );
      return;
    }
    const q = query(collectionRef, where("username", '==', signupInputs.username));
    const querySnapshot = await getDocs(q);
    let result = null;
    querySnapshot.forEach((doc) => {
      result = doc.data();
    });
    
    if (result)
    {
      dispatch(
        popups.actions.add({
          content: "This Username is Already taken...",
        })
      );
      return;
    }
    console.log(signupInputs.email, signupInputs.password);
    try {
      const newuser = await createUserWithEmailAndPassword(
        signupInputs.email,
        signupInputs.password
      );
      if (!newuser || error) {
        dispatch(
          popups.actions.add({
            content: "This account Already exist",
          })
        );
        return;
      }
      if (newuser)
      {
        let userdoc =
        {
          uid: newuser.user.uid,
          email: signupInputs.email,
          password: signupInputs.password,
          username: signupInputs.username,
          bio: "",
          profilePicURL: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };
        await addDoc(collectionRef, userdoc);
        localStorage.setItem("user-info", JSON.stringify(userdoc))
        dispatch(setuser({
          data:userdoc
        }));
        dispatch(
           popups.actions.add({
             content: "You are signed Up successfully",
           })
         );
      }
    }
    catch (err) {
      console.log("error message ", err);
      return;
    }
  }
  return { error, loading, abc, user };
}
