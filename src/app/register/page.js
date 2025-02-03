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
import dotenv from "dotenv";
import { useInterval } from "primereact/hooks";
import { FileUpload } from "primereact/fileupload";
import { InputOtp } from "primereact/inputotp";
import { Dialog } from "primereact/dialog";
import { useRouter } from "next/navigation";

dotenv.config();

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fileData, setFileData] = useState("");
  const [visible, setVisible] = useState(false);
  const [token, setTokens] = useState();
  const [expiryTime, setExpiryTime] = useState(10);
  const [otpexpired, setOtpexpired] = useState(false);
  const dispatch = useDispatch();
  const toast = useRef(null);
  const accept = () => {
    <InputOtp value={token} onChange={(e) => setTokens(e.value)} integerOnly />;
  };
  useEffect(() => {
    if (expiryTime === 0) {
      setOtpexpired(!otpexpired);
    }
  }, [expiryTime, otpexpired]);
  useInterval(
    () => {
      setExpiryTime((prevSecond) => (prevSecond === 0 ? 10 : prevSecond - 1)); //fn
    },
    6000, //delay (ms)
    otpexpired //condition (when)
  );

  const handleSubmit = async (username, email, password, fileData) => {
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
      formdata.append("avatar", fileData[0]);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success === true) {
            setVisible(true);
            setOtpexpired(true);
            setExpiryTime(10);
          }
          toast.current.show({
            severity: "success",
            summary: "Successfully Registered",
            detail: result?.message,
          });
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error :: handleRegister", error);
    }
  };

  const handleVerifyOtp = async (email, token) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        email: email,
        otp: token,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/verifyOtp`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.success === true) {
            toast.current.show({
              severity: "success",
              summary: "Successfully Verified",
              detail:
                result?.message ||
                "Registration and Verification has been successfully done",
            });
            router.push("/dashboard");
          } else {
            toast.current.show({
              severity: "info",
              detail:
                result?.message || "Please Generate the otp in order to verify",
            });
          }
          router.push("/dashboard");
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error :: VerifyOtp", error);
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
            onClick={() => handleSubmit(username, email, password, fileData)}
          />
        </div>
        <Dialog
          header="Otp"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div className="card flex justify-content-center">
            <InputOtp
              value={token}
              onChange={(e) => setTokens(e.value)}
              integerOnly
              length={6}
            />
          </div>
          &nbsp;
          <div className="card flex justify-content-center">
            <Button
              label="Verify Otp"
              onClick={() => handleVerifyOtp(email, token)}
              rounded
            />
          </div>
          <div className="card flex justify-content-center">
            Otp will expire in {expiryTime}
          </div>
        </Dialog>
        <Toast ref={toast}></Toast>
        {/* <Message severity={error?.error} text={error?.text} /> */}
      </div>
    </>
  );
};

export default LoginPage;
