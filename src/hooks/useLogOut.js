import { useSignOut } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/firebaseconfig';
import { popups } from '../slice/popup_Slice';
import { setlogout } from '../slice/authuser';
import {setlogoutprofile} from "../slice/userProfile"
const useLogOut = () => {
   const [signOut, loading, error] = useSignOut(auth);
    const dispatch = useDispatch();
    const abc = async () =>
    {
        try
        {
            const success = await signOut();
            if (success)
            {     
              localStorage.removeItem("user-info");
              dispatch(setlogout());
              dispatch(setlogoutprofile());
                dispatch(
                  popups.actions.add({
                    content: "You have SignedOut Successfully",
                  })
                );
            }
        }
        catch (err)
        {
            dispatch(popups.actions.add({
                content:err.message
            }));
        }

    }
    return { loading, error, abc };
}

export default useLogOut