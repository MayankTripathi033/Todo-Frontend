import React, { useState } from "react";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import PaginationTable from "./paginationtable";
import { Tooltip } from "primereact/tooltip";

const DashboardContent = () => {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="grid">
        <div className="grid col font-bold border-round m-2 gap-3">
          <div className="grid col-6 border-round-sm">
            {/**Add Task  */}
            <div className="col-10">
              <FloatLabel>
                <InputText
                  id="username"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full"
                />
                <label htmlFor="Task">Task</label>
              </FloatLabel>
            </div>
            <div className="col-2">
              <Button icon="pi pi-check" tooltip="Submit" />
            </div>
            <div className="col-12">
              <FloatLabel>
                <InputTextarea
                  id="username"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  rows={16}
                  cols={30}
                  className="w-full h-full"
                />
                <label htmlFor="Description">Description</label>
              </FloatLabel>
            </div>
          </div>

          <div className="grid col border-round-sm w-1/2">
            {/**Today Task */}
            <div className="col-12 text-center bg-blue-300 border-round-lg p-3 mr-1">
              Today's Task
            </div>
            <div className="col-12 h-6rem">
              <h3 className="h-6rem">Task Title</h3>
            </div>
            <div className="col-12 grid">
              <div className="h-16rem col-12">
                <FloatLabel>
                  <InputTextarea
                    id="username"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={11}
                    cols={30}
                    className="w-full h-full p-3"
                  />
                  <label htmlFor="Description">Description</label>
                </FloatLabel>
              </div>
            </div>
          </div>
          <div className="col col-12  border-round-sm"></div>
        </div>
        <div className="col w-6 h-30rem font-bold border-round m-2">
          <PaginationTable />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
