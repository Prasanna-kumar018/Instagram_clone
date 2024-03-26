
import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../firebase/firebaseconfig";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../slice/userProfile";
import { popups } from "../slice/popup_Slice";
let lodash = require("lodash");
const useGetProfilebyUsername = (username) =>
{
  
  let [loading, setloading] =React.useState(true);
  let dispatch = useDispatch();
  let userprofiledata = useSelector((state) => state.userprofiledata);
  let collectionRef = collection(database, "users");
  let { data } = useSelector((state) => state.user);
  let q = query(collectionRef, where("username", "==", username));
  React.useEffect(() => {
    const handleuserProfiledata = async () => {
      try {
        let userdata = await getDocs(q);
        if (userdata.empty)
        {
          return null;
        }
        let res;
        userdata.forEach((item) =>
        {
          res = item.data();
        });
        console.warn("running ", res);
        if (res)
        {
        
          if (!lodash.isEqual(res,userprofiledata.data))
          {
           dispatch(
               setProfile({
                data: res,
              })
            );
          }
        }
      }
      catch (err) {
        dispatch(
          popups.actions.add({
            content: err.message,
          })
        );
      }
      finally {
        setloading(false);
      }
    };

    handleuserProfiledata();
  }, [username,userprofiledata.data,data]);
  // while updated this useEffect is not called but
  // the userprofiledata would  be changed and it is returned
  return { loading, userprofiledata };
};

export default useGetProfilebyUsername;
