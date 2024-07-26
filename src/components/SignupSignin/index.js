import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function signupWithEmail() {
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);
    //Authenticate the user or create a new account using email and password
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("User>>>", user);
          toast.success("User Created!");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // ..
        });
    } else {
      toast.error("All fields are mandatory ");
    }
  }

  return (
    <div className="signup-wrapper">
      <h2 className="title">
        Sign Up on <span style={{ color: "var(--theme)" }}>FinTrack.</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        />
        <Input
          type="email"
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"JohnDoe@gmail.com"}
        />
        <Input
          type="password"
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        <Input
          type="password"
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
        />
        <Button
          text={"SignUp using Email and Password"}
          onClick={signupWithEmail}
        />
        <p style={{ textAlign: "center", margin: 0 }}>OR</p>
        <Button text={"SignUp using Google"} blue={true} />
      </form>
    </div>
    //abc
  );
}

export default SignupSigninComponent;
