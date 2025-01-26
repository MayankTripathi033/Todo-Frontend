// src/app/login/page.tsx
"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="card flex justify-content-center">
        <label htmlFor="username">Username</label>
        <InputText
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
        <Button label="Submit" rounded />
      </div>
    </>
  );
};

export default LoginPage;
