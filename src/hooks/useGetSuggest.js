import React from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { database } from '../firebase/firebaseconfig'
import { useSelector } from 'react-redux'
const useGetSuggest = () =>
{



    let { data: authuser } = useSelector(state => state.user);
    
        let [suggestloading, setLoading] = React.useState(false);
        let [result,setResult] = React.useState([]);
        

       
    
    React.useEffect(() =>
    {
        if (!authuser)
            return;
        setLoading(true);
    const q = query(
        collection(database, "users"),
        where("uid", "not-in", [...authuser.following, authuser.uid])
    );
onSnapshot(q, (snapshot) => {
  let data = [];
  snapshot.forEach((item) => {
    data.push(item.data());
  });
  console.warn(data);
  setResult(data);
  setLoading(false);
});
    },[authuser?.following ,authuser?.uid])
    
     
    return { result,suggestloading};
}

export default useGetSuggest