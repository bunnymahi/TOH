// import React, { useState } from "react";
// import axios from "axios";
// import "./Tg.css";

// const Tg = () => {
//   const [Pn, setPn] = useState("");
//   const [Rn, setRn] = useState("");
//   const [image, setImage] = useState(null);

//   const submitForm = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("Pn", Pn);
//     formData.append("Rn", Rn);
//     console.log(formData);
//     console.log("Phone Number:", Pn);
//     console.log("Registration Number:", Rn);
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/uploads",
//         formData,
//         {
//           headers: {
//             "content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Response from server:", response.data.message);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };  
//   const PnumUpdate = (e) => {
//     console.log(e.target.value);
//     setPn(e.target.value);
//   };

//   const RnumUpdate = (e) => {
//     console.log(e.target.value);
//     setRn(e.target.value);
//   };
//   const [imageSelected, setImageSelected] = useState(false);
//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//     if (e.target.files.length > 0) {
//       console.log(e.target.files[0]);
//       setImageSelected(true);
//     }
//   };
//   return (
//     <div className="hero">
//       <h1 className="text-center mb-4">Hello, TSTP Guardian!</h1>

//       <div className="card1">

//         <form onSubmit={submitForm}>
//           {/* phone-number */}
//           <input
//             type="text"
//             placeholder="Enter reg number"
//             id="ph-no"
//             className="form-control"
//             onChange={RnumUpdate}
//           />
//           <label htmlFor="ph-no">{/* <p>registration-number </p> */}</label>
//           {/* reg-no */}
//           <input
//             type="text"
//             placeholder="Enter phone number"
//             id="reg-no"
//             className="form-control"
//             onChange={PnumUpdate}
//           />
//           <label htmlFor="reg-no">{/* <p>phone-number </p> */}</label>

//           {/* image */}
//           {/* <input type="file" accept='image/*' onChange={uploadImage}/>
//             <button>submit</button> */}
//           <div>
//             <div className="upload">
//               <label htmlFor="input-file" className="upload-label">
//                 Upload Image
//               </label>
//               <input
//                 type="file"
//                 id="input-file"
//                 onChange={handleImageChange}
//                 style={{ display: "none" }}
//                 accept="image/*"
//               />
//             </div>
//             {imageSelected && (
//               <button type="submit" id="btn">
//                 Submit
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default Tg;
import React, { useState } from "react";
import axios from "axios";
import "./Tg.css";

const Tg = () => {
  const [Pn, setPn] = useState("");
  const [Rn, setRn] = useState("");
  const [image, setImage] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("Pn", Pn);
    formData.append("Rn", Rn.toUpperCase());
    console.log(formData);
    console.log("Phone Number:", Pn);
    console.log("Registration Number:", Rn);
    try {
      const response = await axios.post(
        "http://localhost:8000/label",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response from server:", response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const PnumUpdate = (e) => {
    console.log(e.target.value);
    setPn(e.target.value);
  };

  const RnumUpdate = (e) => {
    console.log(e.target.value.toUpperCase());
    setRn(e.target.value.toUpperCase());
  };

  const [imageSelected, setImageSelected] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    if (e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setImageSelected(true);
    }
  };

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
    <div className="row justify-content-center align-items-center" style={{ height: "100%" }}>
      <div className="col-md-6">
        <div className="card mt-5" style={{ backgroundColor: "#ffff", borderRadius: "15px", textAlign: "center", color: "#333" }}>
          <div className="card-body">
            <h1 className="text-center mb-4 secondary">
              Hello, TSTP Guardian!
            </h1>
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label htmlFor="reg-no" className="form-label">
                  Registration Number:
                </label>
                <input
                  type="text"
                  placeholder="Enter registration number"
                  id="reg-no"
                  className="form-control"
                  onChange={RnumUpdate}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ph-no" className="form-label">
                  Phone Number:
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  id="ph-no"
                  className="form-control"
                  onChange={PnumUpdate}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="input-file" className="btn btn-danger">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="input-file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
              </div>
              {imageSelected && (
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#e3362c", borderColor: "#e3362c" }}>
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  

  );
};

export default Tg;
