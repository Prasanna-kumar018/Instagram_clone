import React from "react";
import "./success.css";
import * as ToastCustom from "./toast";
import { useSelector } from "react-redux";
import ToastContainer from "react-bootstrap/ToastContainer";
function Success()
{
  let { data } = useSelector(state => state.popups);
  return (
    <>
      <ToastContainer className="custom_slider">
        {data.map((item,index) =>
        {
          return (
              <ToastCustom.ToastCus message={item.content}  key={ item.id} id={item.id} />
          )
        })}
      </ToastContainer>
    </>
  );
}
export { Success };
