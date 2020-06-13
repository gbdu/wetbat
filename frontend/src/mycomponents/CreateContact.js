import React, { useContext, useEffect } from "react";
import axios from "axios";

import { flashErrorMessage } from "mycomponents/FlashMessage";
import { ContactContext } from "context/ContactContext";

import { useForm } from "react-hook-form";
import Divider from "@material-ui/core/Divider";

export default function CreateContact() {
  const [state, dispatch] = useContext(ContactContext);
  const { register, handleSubmit, watch, errors } = useForm();

  // Post the quote to the API
  const postContact = async (data) => {
    try {
      const response = await axios.post("http://localhost:3030/contacts", data);
      dispatch({
        type: "CREATE_CONTACT",
        payload: response.data,
      });
      // setRedirect(true);
    } catch (error) {
      flashErrorMessage(dispatch, error);
    }
  };

  const onSubmit = (data) => {
    // TODO: More validation here
    postContact(data);
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div style={{ justifyContent: "center" }}>
      <Divider />
      <br />
      <form id="createcontact" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        First name:{" "}
        <input name="firstName" ref={register({ required: true })} />
        {errors.firstName && <span>This field is required</span>}
        <br /> <br />
        Last name: <input name="lastName" ref={register({ required: true })} />
        {errors.lastName && <span>This field is required</span>}
        <br /> <br />
        <Divider />
        <br /> <br />
        Email:{" "}
        <input name="email" type="email" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
        <br /> <br />
        Phone: <input name="phone" ref={register({ required: true })} />
        {errors.phone && <span>This field is required</span>}
        <br /> <br />
        <input type="submit" />
      </form>
    </div>
  );
}
