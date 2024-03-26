import React from "react";
import { Input } from "./input";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../Auth.css";
function Auth() {
  return (
    <>
      <div className="d-flex justify-content-center flex-row align-items-center minh">
        <div className="container d-flex flex-row height">
          <div className="left flex-0_5">
            <img
              src="auth.png"
              className="shadow-img"
              style={{ color: "white" }} 
            />
          </div>
          <div className="right flex-0_5 ">
            <Input />
          </div>
        </div>
      </div>
    </>
  );
}
export { Auth };
