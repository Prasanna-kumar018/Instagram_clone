import React from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { database } from "../firebase/firebaseconfig";
import { useDispatch, useSelector } from "react-redux";
import { popups } from "../slice/popup_Slice";
const useGetPost = () => {
  let { data: authuser } = useSelector((state) => state.user);
  let [postloading, setLoading] = React.useState(false);
  let [result, setResult] = React.useState([]);
  let dispatch = useDispatch();
  React.useEffect(() => {
    if (!authuser || authuser.following.length === 0) return;
    setLoading(true);

    async function abc()
    {
      let data = [];
      const q = query(
        collection(database, "users"),
        where("uid", "in", authuser.following)
      );
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((item) =>
        {
          async function abc2()
          {
            try {
              let qu = query(
                collection(database, "users"),
                where("uid", "==", item.data().uid)
              );
              let snap = await getDocs(qu);
              snap.forEach((item) =>
              {
                data.push(...item.data().posts);
              })
               setLoading(false);
            }
            catch (err) {
              dispatch(
                popups.actions.add({
                  content: err.message,
                })
              );
            }
          }
          abc2();
        });
        
      });
      console.warn(data);
      setResult(data);
    }
    abc();
  }, [authuser?.following, authuser]);

  return { result, postloading };
};

export default useGetPost;
