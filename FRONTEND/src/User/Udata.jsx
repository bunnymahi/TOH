// import {
//     createColumnHelper,
//     flexRender,
//     getCoreRowModel,
//     getFilteredRowModel,
//     getPaginationRowModel,
//     getSortedRowModel,
//     useReactTable,
//   } from "@tanstack/react-table";
//   import axios from "axios";
//   import React, { useState, useMemo, useEffect } from "react";

//   const Udata = () => {
//     const [tireReport, setTireReport] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [reports,setReports] = useState([])
//     const [rno,setRno] = useState(0)
//     const [pno,setPno] = useState("")
//   const [selectedImage, setSelectedImage] = useState(null);

//     const registrationNumber = 'TS05FD2007'
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get(`http://localhost:8000/Dtable?registrationNumber=${registrationNumber}`);
//             console.log(response.data);

//             const firstTireReport = response.data.data[0];
//             if (firstTireReport) {
//               setTireReport([firstTireReport]);
//               setReports(firstTireReport.reports);
//               setRno(firstTireReport.regisNo);
//               setPno(firstTireReport.phoneNo);
//             }
//           } catch (error) {
//             console.error(error);
//           } finally {
//             setLoading(false);
//           }
//         };

//         fetchData();
//       }, []);
//       const showImage = (imageName) => {
//         setSelectedImage(`http://localhost:8000/getimage/${imageName}`);
//       };
//     const data = useMemo(() => reports, [reports]);
//     /** @type import('@tanstack/react-table').ColumnDef<any> */
//     const columns = [

//       {
//         Header: "Label",
//         accessorKey: "label",
//       },
//       {
//         Header: "Tire Damage",
//         accessorKey: "damage",
//       },
//       {
//         Header: "Toll Location",
//         accessorKey: "tollPlaza",
//       },
//       {
//         Header: "Date",
//         accessorKey: "createdAt",
//       },
//       {
//         Header: "Image",
//         accessorKey: "imageName",
//       },
//       {
//         Header: "Image",
//         accessorKey: "imageName",
//         Cell:
//           <button onClick={() => alert(`You clicked on row`)}>
//             Click Me
//           </button>

//       },
//     ];
//     const [sorting, setSorting] = useState([]);
//     const [filtering, setFiltering] = useState("");
//     const table = useReactTable({
//       data : data,
//       columns : columns,
//       getCoreRowModel: getCoreRowModel(),
//       getPaginationRowModel: getPaginationRowModel(),
//       getSortedRowModel: getSortedRowModel(),
//       getFilteredRowModel: getFilteredRowModel(),
//       state: {
//         sorting: sorting,
//         globalFilter: filtering,
//       },
//       onSortingChange: setSorting,
//       onGlobalFilterChange: setFiltering,
//     });
//     return (
//         <>
//           <div className="container" id="dealer">
//             <h1>Tire Reports</h1>
//             <br />
//             <br />
//             <br />
//             <br />
//             <h6>{rno}</h6>
//             <h6>{pno}</h6>
//             <input
//               type="text"
//               value={filtering}
//               onChange={(e) => setFiltering(e.target.value)}
//               placeholder="search"
//             />
//             <table
//               id="usertable"
//               className="table table-striped table-hover table-bordered"
//             >
//               <thead>
//                 <tr>
//                   <th scope="col">Registration Number</th>
//                   <th scope="col">{rno}</th>
//                   <th scope="col">Phone Number</th>
//                   <th scope="col">{pno}</th>
//                 </tr>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => (
//                       <th
//                         id="userth"
//                         key={header.id}
//                         onClick={header.column.getToggleSortingHandler()}
//                       >
//                         {header.isPlaceholder ? null : (
//                           <div>
//                             {flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                             {
//                               { asc: "🔼", desc: "🔽" }[
//                                 header.column.getIsSorted() ?? null
//                               ]
//                             }
//                           </div>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>

//               <tbody>
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id}>
//                     {row.getVisibleCells().map((cell) => (

//                       <td key={cell.id}>
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>

//                 ))}
//               </tbody>

//             </table>
//             <div className="buttons">
//               <button
//                 id="prevpage"
//                 disabled={!table.getCanPreviousPage()}
//                 onClick={() => table.previousPage()}
//               >
//                 Previous page
//               </button>
//               <button
//                 id="nextpage"
//                 disabled={!table.getCanNextPage()}
//                 onClick={() => table.nextPage()}
//               >
//                 Next page
//               </button>
//             </div>
//           </div>
//           {selectedImage && (
//             <div>
//               <h2>Selected Image</h2>
//               <img src={selectedImage} alt="Tire Image" />
//             </div>
//           )}
//         </>
//       );
//     }

//   export default Udata;

//////////////////////////////////////////////
// import "./CSS/Udata.css";
// import React from "react";
// import axios from "axios";
// import { useState, useMemo, useEffect } from "react";
// import {
//   useTable,
//   usePagination,
//   useSortBy,
//   useGlobalFilter,
// } from "react-table";

// const Udata = () => {
//   const [tireReport, setTireReport] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [reports, setReports] = useState([]);
//   const [rno, setRno] = useState();
//   const [pno, setPno] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [registrationNumber, setRegistrationNumber] = useState("");

//   const [showModal, setShowModal] = useState(false);
//   const [selectedImageModal, setSelectedImageModal] = useState(null);
//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedImageModal(null);
//   };
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/Dtable?registrationNumber=${registrationNumber}`
//       );
//       console.log(response.data);

//       const firstTireReport = response.data.data[0];
//       if (firstTireReport) {
//         setTireReport([firstTireReport]);
//         setReports(firstTireReport.reports);
//         setRno(firstTireReport.regisNo);
//         setPno(firstTireReport.phoneNo);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     // Check if registrationNumber is not empty before fetching data
//     if (registrationNumber.trim() !== "") {
//       fetchData();
//     }
//   }, [registrationNumber]);
//   const showImage = (imageName) => {
//     setSelectedImage(`http://localhost:8000/getimage/${imageName}`);
//   };

//   const handleViewClick = (row) => {
//     const imageName = row.original.imageName;
//     console.log("View button clicked for image:", imageName);
//     showImage(imageName);
//     setSelectedImageModal(`http://localhost:8000/getimage/${imageName}`);
//     setShowModal(true);
//   };

//   const data = useMemo(() => reports, [reports]);

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "Label",
//         accessor: "label",
//       },
//       {
//         Header: "Tire Damage",
//         accessor: "damage",
//       },
//       {
//         Header: "Toll Location",
//         accessor: "tollPlaza",
//       },
//       {
//         Header: "Date",
//         accessor: "createdAt",
//       },
//       //   {
//       //     Header: "Image",
//       //     accessor: "imageName",
//       //   },
//       {
//         Header: "Image",
//         accessor: "actions",
//         Cell: ({ row }) => (
//           <div style={{ textAlign: "center" }}>
//             <button
//               type="button"
//               onClick={() => handleViewClick(row)}
//               class="btn btn-outline-secondary"
//               data-bs-toggle="modal"
//               data-bs-target="#exampleModal"
//             >
//               View Image
//             </button>
//           </div>
//         ),
//       },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     state,
//     setGlobalFilter,
//     prepareRow,
//   } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

//   const { globalFilter, pageIndex } = state;

//   return (
//     <>
//       <div
//         style={{
//           backgroundColor: "#f8f9fa",
//           minHeight: "100vh",
//           padding: "20px",
//         }}
//         className="mt-5"
//       >
//         <h1 className="text-center mb-4 secondary">
//           Welcome to your TiresOnHighways report center!
//         </h1>
//         <h3 className="text-center mb-4 secondary">
//           Here, you can view records of all your tire assessments from toll
//           plaza scans.
//         </h3>
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <label className="form-label">
//               <b>Registration Number:</b>
//             </label>
//             <div className="input-group">
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter here!!"
//                 value={registrationNumber}
//                 onChange={(e) => setRegistrationNumber(e.target.value)}
//               />
//               <button className="btn btn-primary" onClick={fetchData}>
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//         <br />
//         <table {...getTableProps()} className="table">
//           <thead>
//             <tr>
//               <th className="back">Registration Number:</th>
//               <th>{registrationNumber}</th>
//               <th className="back">Phone Number:</th>
//               <th>{pno}</th>
            //   <th>
            //     <input
            //       value={globalFilter || ""}
            //       onChange={(e) => setGlobalFilter(e.target.value)}
            //       placeholder="Search..."
            //     />
            //   </th>
//             </tr>

//             {/* <br /> */}
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     {...column.getHeaderProps(column.getSortByToggleProps())}
//                   >
//                     {column.render("Header")}
//                     <span>
//                       {column.isSorted
//                         ? column.isSortedDesc
//                           ? " 🔽"
//                           : " 🔼"
//                         : ""}
//                     </span>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map((cell) => (
//                     <td
//                       {...cell.getCellProps()}
//                       style={{
//                         borderBottom: "1px solid #ddd",
//                         padding: "8px",
//                         textAlign: "left",
//                       }}
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <div>
//           <span>
//             Page{" "}
//             <strong>
//               {pageIndex + 1} of {pageOptions.length}
//             </strong>{" "}
//           </span>
//           <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//             Previous
//           </button>
//           <button onClick={() => nextPage()} disabled={!canNextPage}>
//             Next
//           </button>
//         </div>
//       </div>
//       {/* <!-- Modal --> */}
//       <div
//         class="modal fade"
//         id="exampleModal"
//         tabindex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h1 class="modal-title fs-5" id="exampleModalLabel">
//                 Image
//               </h1>
//               <button
//                 type="button"
//                 class="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div class="modal-body">
//               <img
//                 src={selectedImageModal}
//                 alt="Tire Image"
//                 style={{ maxWidth: "100%", height: "auto" }}
//               />
//             </div>
//             <div class="modal-footer">
//               <button
//                 type="button"
//                 class="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Udata;

//////////////////////////////////////////////////////////
import "./CSS/Udata.css";
import React from "react";
import axios from "axios";
import { useState, useMemo, useEffect } from "react";
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
        `http://localhost:8000/Dtable?registrationNumber=${registrationNumber}`
      );

      const firstTireReport = response.data.data[0];
      if (firstTireReport) {
        setTireReport([firstTireReport]);
        setReports(firstTireReport.reports);
        setRno(firstTireReport.regisNo);
        setPno(firstTireReport.phoneNo);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if registrationNumber is not empty before fetching data
    if (registrationNumber.trim() !== "") {
      fetchData();
    }
  }, [registrationNumber]);

  const showImage = (imageName) => {
    setSelectedImage(`http://localhost:8000/getimage/${imageName}`);
  };

  const handleViewClick = (row) => {
    const imageName = row.original.imageName;
    showImage(imageName);
    setSelectedImageModal(`http://localhost:8000/getimage/${imageName}`);
    setShowModal(true);
  };

  const data = useMemo(() => reports, [reports]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Label",
        accessor: "label",
      },
      {
        Header: "Confidence",
        accessor: "damage",
      },
      {
        Header: "Toll Location",
        accessor: "tollPlaza",
      },
      {
        Header: "Date",
        accessor: "createdAt",
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
    <div style={{
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      padding: "20px",
    }} >

      <div className="container mt-5 p-5" style={{
        backgroundColor:"#f8f9fa",
        // marginTop:"20px"
      }}>
        <h1 className="text-center mb-4 secondary">
          Welcome to your TiresOnHighways report center!
        </h1>
        <h3 className="text-center mb-4 secondary">
          Here, you can view records of all your tire assessments from toll
          plaza scans.
        </h3>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <label className="form-label">
              <b>Registration Number:</b>
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter here!!"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
              />
              <button className="btn btn-secondary" onClick={fetchData}>
                Search
              </button>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-12">
            <div>
              {/* <input
                value={globalFilter || ""}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search..."
                className="form mb-3"
              /> */}
            </div>
            <div className="table-responsive">
              <table {...getTableProps()} className="table table-striped" style={{ backgroundColor: "#f0f0f0" }}>
                <thead>
                  <tr>
                    <th className="back">Registration Number:</th>
                    <th>{registrationNumber}</th>
                    <th className="back">Phone Number:</th>
                    <th>{pno}</th>
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