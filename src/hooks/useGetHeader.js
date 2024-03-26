import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { popups } from "../slice/popup_Slice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase/firebaseconfig";

const useGetHeader = (createdBy) => {
  let [loading, setLoading] = React.useState(false);
  let [result, setResult] = React.useState(null);
  let dispatch = useDispatch();
  let { data: authuser } = useSelector((state) => state.user);

  React.useEffect(() => {
    async function abc() {
      try {
        setLoading(true);
        let q = query(
          collection(database, "users"),
          where("uid", "==", createdBy)
        );
        let snap = await getDocs(q);
        let res;
        snap.forEach((item) => {
          res = item.data();
        });
          console.warn("inside ", res);
        setResult(res);
      }
      catch (err)
      {
        dispatch(
          popups.actions.add({
            content: err.message,
          })
        );
      }
      finally
      {
        setLoading(false);
      }
    }
    abc();
  }, [createdBy, authuser]);

  return { loading, result };
};

export default useGetHeader;
