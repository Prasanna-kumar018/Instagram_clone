import React from "react";
import Toast from "react-bootstrap/Toast";
import { popups } from "../slice/popup_Slice";
import { useDispatch } from "react-redux";
function ToastCus(props) {
  let [show, setShow] = React.useState(true);
  let dispatch = useDispatch();
  return (
     
      <Toast
        className="custom_slider_inner"
        onClose={(el) => {
          setShow((b) => {
            return !b;
          });
          console.log(el);
          dispatch(popups.actions.remove(props.id))
        }}
        show={show}
        delay={3000}
        key={props.id}
        id={props.id}
    >
        <Toast.Header>
          <img
            src="favicon.ico"
            className="rounded me-2 insta-avatar"
            alt="Instagram"
          />
          <h4 className="me-auto align-self-end">Instagram</h4>
          <small className="text-muted">just now</small>
        </Toast.Header>

        <Toast.Body style={{ color: "black", fontSize: "1.2em" }}>
          {props.message}
        </Toast.Body>
      </Toast>
    
  );
}
export { ToastCus };
