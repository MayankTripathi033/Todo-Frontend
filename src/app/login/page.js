// src/app/login/page.tsx
"use client";
import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useRef(null);
  const router = useRouter();
  const handleLogin = async (email, password) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: email,
        password: password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success === true) {
            sessionStorage.setItem("token", result.payload.token);
            sessionStorage.setItem("email", result.payload.email);
            router.push({
              pathname: "/dashboard",
              query: {
                toast: JSON.stringify({
                  severity: "success",
                  summary: "Logged In Successfully",
                  detail:
                    result?.message ||
                    "Registration and Verification has been successfully done",
                }),
              },
            });
          }
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.error("Error :: Login", login);
    }
  };
  return (
    <>
      <div className="card flex justify-content-center">
        <label htmlFor="email">Email</label>
        <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="card flex justify-content-center">
        <label htmlFor="password">Password</label>
        <InputText
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="card flex justify-content-center">
        <Button
          label="Submit"
          rounded
          onClick={() => handleLogin(email, password)}
        />
      </div>
      <Toast ref={toast}></Toast>
    </>
  );
};

export default LoginPage;
