import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";

const PaginationTable = () => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    setNodes();
  }, []);

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  return (
    <>
      <div className="card">
        <TreeTable
          value={nodes}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          paginatorLeft={paginatorLeft}
          paginatorRight={paginatorRight}
          tableStyle={{ minWidth: "50rem" }}
          sortMode="multiple"
        >
          <Column field="Todo" header="Todo" expander sortable></Column>
          <Column field="Description" header="Description" sortable></Column>
          <Column field="type" header="Type" sortable></Column>
        </TreeTable>
      </div>
    </>
  );
};

export default PaginationTable;
