// src/app/login/page.tsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useSelector, useDispatch } from "react-redux";
import { Message } from "primereact/message";
import { increment } from "components/components/counter/counterSlice";
import errorHandler from "components/components/errorhandling";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState("");
  const [error, setError] = useState({});
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const handleSubmit = async (username, email, password) => {
    try {
      if (!email && !password) {
        toast.current.show({
          severity: "error",
          summary: "Validation Error",
          detail: "Email and Password is Required",
        });
      }
      const formdata = new FormData();
      formdata.append("username", username);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("avatar", fileData);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      // await fetch("http://localhost:3001/api/register", requestOptions)
      //   .then((response) => response.json())
      //   .then((result) => {
      //     // errorHandler("success", result?.message);
      //     toast.current.show({
      //       severity: "success",
      //       summary: "File Selected",
      //       detail: result?.message,
      //     });
      //     console.log("resulttt", result);
      //   })
      //   .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error :: handleRegister", error);
    }
  };

  const handleFileSelect = (e) => {
    // Capture the selected file(s) and store them in the state
    setFileData(e.files); // e.files contains the array of selected files
    console.log("e.filess", e.files);

    toast.current.show({
      severity: "info",
      summary: "File Selected",
      detail: "File has been selected successfully.",
    });
  };

  return (
    <>
      <div className="card justify-content-center align-items-center">
        <div className="flex flex-wrap align-items-center mb-3 gap-2 justify-content-center">
          <InputText
            id="username"
            placeholder="Username"
            className="p-invalid mr-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <Message severity="error" text="Username is required" /> */}
        </div>
        <div className="flex flex-wrap align-items-center mb-3 gap-2 justify-content-center">
          <InputText
            id="email"
            placeholder="Email"
            className="p-invalid mr-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <Message severity="error" /> */}
        </div>
        <div className="flex flex-wrap align-items-center mb-2 gap-2 justify-content-center">
          <InputText
            id="password"
            placeholder="Password"
            className="p-invalid mr-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap align-items-center mb-2 gap-2 justify-content-center">
          <Toast ref={toast}></Toast>
          <FileUpload mode="basic" name="demo[]" onSelect={handleFileSelect} />
        </div>
        <div className="card flex justify-content-center align-items-center">
          <Button
            label="Submit"
            rounded
            onClick={() => handleSubmit(username, email, password)}
          />
        </div>
        <Toast ref={toast}></Toast>
        {/* <Message severity={error?.error} text={error?.text} /> */}
      </div>
    </>
  );
};

export default LoginPage;
