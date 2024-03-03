import React, { useState, useEffect } from "react";
import { useMemo } from "react";
import axios from "axios";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from "react-table";

const Udata = () => {
  const [tireReport, setTireReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [rno, setRno] = useState();
  const [pno, setPno] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageModal(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://toh-hmcg.onrender.com/searchuploads"
      );
      console.log(response.data)

      // const firstTireReport = response.data.data[0];
      setReports(response.data);

      // if (firstTireReport) {
      //   // setTireReport([firstTireReport]);
      //   setReports(response.data);
      //   console.log(reports)
      //   // setRno(firstTireReport.regisNo);
      //   // setPno(firstTireReport.phoneNo);
      // }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const showImage = (imageName) => {
    setSelectedImage(`https://toh-hmcg.onrender.com/getimage/${imageName}`);
  };

  const handleViewClick = (row) => {
    const imageName = row.original.imageName;
    showImage(imageName);
    setSelectedImageModal(`https://toh-hmcg.onrender.com/getimage/${imageName}`);
    setShowModal(true);
  };

  const data = useMemo(() => reports, [reports]);

  const columns = React.useMemo(
    () => [
      {
        Header: "reg.no",
        accessor: "registrationNo",
      },
      {
        Header: "phone.no",
        accessor: "phoneNumber",
      },
      {
        Header: "Toll Location",
        accessor: "checkpoint",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Image",
        accessor: "actions",
        Cell: ({ row }) => (
          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              onClick={() => handleViewClick(row)}
              className="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              View Image
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex } = state;

  return (
    <>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div className="container mt-5 p-5" style={{ backgroundColor: "#f8f9fa" }}>
          <br />
          <div className="row">
            <div className="col-md-12">
              <div>
              </div>
              <div className="table-responsive">
                <table {...getTableProps()} className="table table-striped" style={{ backgroundColor: "#f0f0f0" }}>
                  <thead>
                    <tr>
                      <th className="back">Company:</th>
                      <th>MRF</th>
                      <th className="back">Agent Name: </th>
                      <th>Arjun</th>
                      <th>
                        <input
                          value={globalFilter || ""}
                          onChange={(e) => setGlobalFilter(e.target.value)}
                          placeholder="Search..."
                        />
                      </th>
                    </tr>
                    {headerGroups.map((headerGroup) => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                          <th
                            {...column.getHeaderProps(column.getSortByToggleProps())}
                          >
                            {column.render("Header")}
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td
                              {...cell.getCellProps()}
                              style={{
                                borderBottom: "1px solid #ddd",
                                padding: "8px",
                                textAlign: "left",
                              }}
                            >
                              {cell.render("Cell")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <span>
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
                <div>
                  <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="btn btn-secondary me-2"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="btn btn-secondary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Image</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <img src={selectedImageModal} alt="Tire Image" className="img-fluid" />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Udata;
