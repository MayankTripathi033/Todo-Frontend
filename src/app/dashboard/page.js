"use client";
import Navbar from "components/components/navbar";
import DashboardContent from "components/components/dashboardcontent";
import React, { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <>
      <div className="grid gap-1 w-full">
        <div className="col-12">
          <Navbar />
        </div>
        <div className="col">
          <DashboardContent />
        </div>
      </div>
    </>
  );
};

export default page;
