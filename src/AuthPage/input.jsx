import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import useSignUpWithGoogle from "../hooks/useSignUpWithGoogle.js";
import "../input.css";
import { useSignup } from "./signup.js";
import { useDispatch } from "react-redux";
import { popups } from "../slice/popup_Slice.js";
import { Button, Spinner } from "@chakra-ui/react";
import useSignIn from "../hooks/useSignIn.js";
function Input() {
  let [login, Setlogin] = React.useState(true);
  let [loginInputs, setloginInputs] = React.useState({
    email: "",
    password: "",
  });
  let [signupInputs, setsignupInputs] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  let { loading, abc } = useSignup();
  let dispatch = useDispatch();
  let { handlelogin, loading: isloading } = useSignIn();
  let { handleSigningoogle, loading: googleloading } = useSignUpWithGoogle();
  return (
    <>
      <div className="h-100 d-flex flex-column gap-2 align-items-center   px-3  ">
        <div className="border flex-0_8 ">
          <div className={`d-flex flex-column ${login ? "gap-3" : "gap-2"}`}>
            <img
              src="logo.png"
              draggable={false}
              className="img flex-0_3 "
              alt=""
            />
            <input
              type="text"
              className="form-control flex-0_1 mx-3 w-auto"
              name="email"
              required={true}
              onChange={(e) => {
                login
                  ? setloginInputs(() => {
                      return {
                        ...loginInputs,
                        [e.target.name]: e.target.value,
                      };
                    })
                  : setsignupInputs(() => {
                      return {
                        ...signupInputs,
                        [e.target.name]: e.target.value,
                      };
                    });
              }}
              value={login ? loginInputs.email : signupInputs.email}
              placeholder="Email"
              id="email"
            />
            {!login && (
              <input
                required={true}
                type="text"
                placeholder="Username"
                className="form-control flex-0_1 mx-3 w-auto"
                name="username"
                value={signupInputs.username}
                onChange={(e) => {
                  setsignupInputs(() => {
                    return {
                      ...signupInputs,
                      [e.target.name]: e.target.value,
                    };
                  });
                }}
                id="username"
              />
            )}
            <input
              type="password"
              required={true}
              placeholder="Password"
              className="form-control flex-0_1 mx-3 w-auto"
              name="password"
              onChange={(e) => {
                login
                  ? setloginInputs(() => {
                      return {
                        ...loginInputs,
                        [e.target.name]: e.target.value,
                      };
                    })
                  : setsignupInputs(() => {
                      return {
                        ...signupInputs,
                        [e.target.name]: e.target.value,
                      };
                    });
              }}
              value={login ? loginInputs.password : signupInputs.password}
              id="password"
            />

            {!login && (
              <input
                type="password"
                required={true}
                placeholder="Confirm Password"
                className="form-control flex-0_1 mx-3 w-auto"
                name="confirmPassword"
                onChange={(e) => {
                  setsignupInputs(() => {
                    return {
                      ...signupInputs,
                      [e.target.name]: e.target.value,
                    };
                  });
                }}
                value={signupInputs.confirmPassword}
                id="confirmPassword"
              />
            )}
            {login && (
              <Button
                mx={3}
                w={"auto"}
                variant={"primary"}
                className="btn   btn-primary"
                rounded={5}
                isLoading={isloading}
                onClick={async (e) => {
                  e.preventDefault();
                  if (!loginInputs.email || !loginInputs.password) {
                    dispatch(
                      popups.actions.add({
                        content: "Enter the Email and Password",
                      })
                    );
                    return;
                  }
                  await handlelogin(loginInputs);
                }}
              >
                Log in
              </Button>
            )}
            {!login && (
              <Button
                mt={2}
                mb={2}
                w={"auto"}
                mx={4}
                variant={"primary"}
                isLoading={loading}
                className="btn btn-primary  rounded-3"
                onClick={(e) => {
                  e.preventDefault();
                  abc(signupInputs);
                }}
              >
                Sign Up
              </Button>
            )}
            {login && (
              <>
                <div className="container-fluid d-flex flex-row gap-2">
                  <div className="flex-0_4_5 ">
                    <hr />
                  </div>
                  <span className="flex-0_1  align-self-center">OR</span>
                  <div className="flex-0_4_5  ">
                    <hr />
                  </div>
                </div>
                <div className="text-group  mx-3 w-auto flex-0_1 mb-1 ">
                  <div
                    className="d-flex flex-row gap-0  justify-content-center"
                    onClick={async (e) => {
                      e.preventDefault();
                      await handleSigningoogle();
                    }}
                  >
                    <img src="google.png" className="google" alt="" />
                    <div className="text-center py-2  cursor-pointer ">
                      Log in with Google
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* {googleloading && (
              <Spinner
                pos={"absolute"}
                top={"50%"}
                left={"50%"}
                translateX={"-50%"}
                translateY={"-50%"}
                background={"red"}
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xxl"
              />
            )} */}
            {!login && (
              <>
                <div className="container-fluid d-flex flex-row gap-2">
                  <div className="flex-0_4_5 ">
                    <hr />
                  </div>
                  <span className="flex-0_1  align-self-center">OR</span>
                  <div className="flex-0_4_5  ">
                    <hr />
                  </div>
                </div>
                <div className="text-group  mx-3 w-auto flex-0_1 mb-1 ">
                  <div
                    className="d-flex flex-row gap-0  justify-content-center"
                    onClick={async (e) => {
                      e.preventDefault();
                      await handleSigningoogle();
                    }}
                  >
                    <img src="google.png" className="google" alt="" />
                    <div className="text-center py-2  cursor-pointer ">
                      Sign in with Google
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className=" border  flex-0_1 w-100 text-center lh-100">
          <div className="d-flex gap-2 flex-row btn-group-vertical h-100 ">
            {login && (
              <i className="h-100 btn-group-vertical  text-right">
                Don't have an account?
              </i>
            )}
            {!login && (
              <i className="h-100 btn-group-vertical  text-right">
                Already have an account?
              </i>
            )}
            {login && (
              <i
                className="text-primary  h-100 btn-group-vertical  pe-auto cursor-pointer"
                onClick={() => {
                  Setlogin((b) => !b);
                }}
              >
                Sign Up
              </i>
            )}
            {!login && (
              <i
                className="text-primary h-100 btn-group-vertical  pe-auto cursor-pointer"
                onClick={() => {
                  Setlogin((b) => !b);
                }}
              >
                Log in
              </i>
            )}
          </div>
        </div>
        <div className=" border flex-0_1 ">
          <div className="d-flex flex-column gap-1">
            <div className="text-center ">Get the app</div>
            <div className="row ps-2">
              <div
                className="img2  col-6 cursor-pointer
              btn-group-vertical "
              >
                <img src="playstore.png" alt="" />
              </div>
              <div
                className="img2  col-6 cursor-pointer
              btn-group-vertical"
              >
                <img src="microsoft.png" className=" size-fix" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export { Input };
