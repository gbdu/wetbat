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
