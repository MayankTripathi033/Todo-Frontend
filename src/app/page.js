"use client";
import { redirect } from "next/navigation";
import dotenv from "dotenv";
import { Toast } from "primereact/toast";
import { useRef } from "react";
dotenv.config();

export default function Home() {
  const toast = useRef(null);
  redirect("/dashboard");
  return (
    <>
      <Toast ref={toast}></Toast>
    </>
  ); // This will never render as redirect takes control
}
