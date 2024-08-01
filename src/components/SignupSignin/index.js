import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, doc, setDoc } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm,setLoginForm]=useState(false)
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  function signupWithEmail() {
    setLoading(true);
    console.log("Name", name);
    console.log("email", email);
    console.log("password", password);
    console.log("confirmPassword", confirmPassword);
    //Authenticate the user or create a new account using email and password
    if (name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
      if (password==confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("User>>>", user);
          toast.success("User Created!");
          setLoading(false);
          setName("");
          setPassword("");
          setEmail("");
          setConfirmPassword("");
          // Create A doc with User id as the following id
          createDocs(user);
          navigate('/dashboard');
        })
        .catch((error) => {
          // const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        });
      }else{
        toast.error("Password and Confirm Password don't match");
        setLoading(false);
      }
      
    } else {
      toast.error("All fields are mandatory ");
      setLoading(false);
    }
  }
  function loginUsingEmail(){
    if (email !== "" && password !== "") {
    console.log("Email",email);
    console.log("password",password);
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    toast.success("User Logged In!");
    console.log("User Logged In",user);
    navigate('/dashboard');
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
  });
}else{
  toast.error("All fields are Mandatory!")
}


  }
  async function createDocs(user) {
    // Make sure that the doc with the uid doesn't exist
    // Create a doc
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef); // Use getDoc for a single document
  
    if (!userData.exists()) {
      try {
        await setDoc(userRef, { // Use setDoc for a single document
          name: user.displayName ? user.displayName : "Unknown", // Use a fallback value for name
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "", // Corrected to photoURL
          createdAt: new Date(),
        });
        toast.success("Doc created!");
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("Doc already exists");
    }
  }
  
  return (
    <>
    {loginForm? ( <div className="signup-wrapper">
      <h2 className="title">
       Login on <span style={{ color: "var(--theme)" }}>FinTrack.</span>
      </h2>
      <form>
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
        <Button
          disabled={loading}
          text={loading?"Loading...":"Login using Email and Password"}
          onClick={loginUsingEmail}
        />
        <p className="p-login">OR</p>
        <Button text={loading?"Loading...":"Login using Google"} blue={true} />
        <p className="p-login" onClick={()=>setLoginForm(!loginForm)}>Or Don't have an Account? Click Here</p>
      </form>
    </div>) :(
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
          disabled={loading}
          text={loading?"Loading...":"SignUp using Email and Password"}
          onClick={signupWithEmail}
        />
        <p className="p-login">OR</p>
        <Button text={loading?"Loading...":"SignUp using Google"} blue={true} />
        <p className="p-login" onClick={()=>setLoginForm(!loginForm)}>Or Have an Account Already? Click Here</p>
      </form>
    </div>
    )}
    </>
  );
}

export default SignupSigninComponent;
