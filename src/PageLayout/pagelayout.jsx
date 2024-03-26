import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseconfig";
export function PageLayout() {
  let location = useLocation();
 const [user,loading] = useAuthState(auth);
  let check = location.pathname !== "/auth" && user;
  console.log("authuser ", user);
  return (
    <>
      <div className="d-flex flex-row">
        <Box w={{ base: "70px", md: "220px" }}>
          { check && <Navbar />}
        </Box>
        <Box w={{ base: "calc( 100% - 70px)", md: "calc( 100% - 220px)" }}>
          <Outlet />
        </Box>
      </div>
    </>
  );
}
