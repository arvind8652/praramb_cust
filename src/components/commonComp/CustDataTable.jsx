import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "./custDataTable.css";

const CustDataTable = (props) => {
  const { columns = () => {}, data = () => {} } = props;

  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    sizePerPage: 10,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };

  return (
    <BootstrapTable
      bootstrap4
      keyField="id"
      data={data() || []}
      columns={columns() || []}
      pagination={paginationFactory(options)}
      //   pagination={paginationFactory()}
      wrapperClasses="custom-table"
      classes="table table-hover"
    />
  );
};

export default CustDataTable;
