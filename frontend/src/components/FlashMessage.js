import React from "react";
import Alert from "@material-ui/lab/Alert";
import Popup from "reactjs-popup";

export default function FlashMessage({ message }) {
  return (
    <div>
      <Alert severity={message.type}>
        {message.type}: {message.content}!
      </Alert>
    </div>
  );
  //  return <Snackbar place="tc" color="info" message={message.content} close />;
}

export function flashErrorMessage(dispatch, error) {
  const err = error.response ? error.response.data : error; // check if server or network error
  // FlashMessage(err);

  dispatch({
    type: "FLASH_MESSAGE",
    payload: {
      type: "error",
      title: err.name,
      content: err.message,
    },
  });
}
