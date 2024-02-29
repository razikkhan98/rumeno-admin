import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import Mean from "../Mean";
import Navbar from "../Navbar";
import  "./loader.css"

const AdminCartUpload = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProducts, setEditedProducts] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });
  const [formChanges, setFormChanges] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [sendimg, setsendimg] = useState();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulating an API call or data loading

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);
  // console.log(sendimg,122222333) 
  // console.log(imageUrl,232333)

  // useEffect(() => {
  //   // console.log(imageUrl);
  //   console.log(selectedFile);
  // }, [imageUrl, selectedFile]);

  const handleEditClick = (product) => {

console.log(product,1222222)
console.log(product.image,1222222)
    setSelectedProduct(product);
    setFormValues({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setImageUrl(product.image); // Set image URL for the current product being edited
    // setsendimg(product.image)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.id]: e.target.value,
    }));
    setFormChanges(true);
  };

  const handleFileChange = (e) => {
    setFormChanges(true);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImageUrl(reader.result);
    };
    const file = e.target.files;
    setSelectedFile(file);
    setsendimg(e.target.files[0]);

  };

  const handleSaveChanges = async () => {
    let updatedProduct;
    const existingProductIndex = editedProducts.findIndex(
      (p) => p.id === selectedProduct?.id
    );

    if (existingProductIndex !== -1) {
      updatedProduct = {
        ...editedProducts[existingProductIndex],
        name: formValues.name,
        price: formValues.price,
        description: formValues.description,
        image: imageUrl, // Use the current imageUrl state for the product being edited
      };
    } else {
      // If selectedProduct is null, it means a new card is being added
      updatedProduct = {
        id: editedProducts.length + 1, // You may need to handle ID generation better
        name: formValues.name,
        price: formValues.price,
        description: formValues.description,
        image: imageUrl, // Use the current imageUrl state for the new card
      };
    }
    const trimmedBase64 = imageUrl.trim();
    console.log('trimmedBase64: ', trimmedBase64,updatedProduct);
// const decodedString = atob(trimmedBase64);
    

    setEditedProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      if (existingProductIndex !== -1) {
        newProducts[existingProductIndex] = updatedProduct;
      } else {
        newProducts.push(updatedProduct);
      }
      return newProducts;
    });

    setShowModal(false);
    setFormChanges(false);

    // const formData = new FormData();
    // formData.append("image", sendimg);
    // console.log(sendimg, 3464848);

    // console.log(updatedProduct);

    // const datasendtoapi = {
    //   id: updatedProduct.id,
    //   name: updatedProduct.name,
    //   price: updatedProduct.price,
    //   description: updatedProduct.description,
    //   // image: sendimg,
    // };

    const sendimgtoapi = {
      image : updatedProduct.image
    }
    // console.log(sendimgtoapi)
    // console.log(datasendtoapi);

    // try {
    //   const response = await axios.post(
    //     "https://example.com/api/endpoint",
    //     updatedProduct
    //   );
    //   console.log("Server Response:", response.data);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  const handleAddCard = () => {
    // Clear the form and open the modal for adding a new card
    setFormValues({
      name: "",
      price: "",
      description: "",
      image: "",
    });
    setSelectedProduct(null);
    setImageUrl(null);
    setsendimg(null)
    setSelectedFile(null);
    setShowModal(true);
  };

  return (
    <section className="bg-menu-theme">
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Mean/>
        <div className="layout-page">
            {/* <!-- Navbar --> */}
            <Navbar />

            {/* {loading ?( */}
<>
{/* <div className="scene">
    <div className="objects">
        <div className="square"></div>
        <div className="circle"></div>
        <div className="triangle"></div>
    </div>
    <div className="wizard">
        <div className="body"></div>
        <div className="right-arm">
            <div className="right-hand"></div>
        </div>
        <div className="left-arm">
            <div className="left-hand"></div>
        </div>
        <div className="head">
            <div className="beard"></div>
            <div className="face">
                <div className="adds"></div>
            </div>
            <div className="hat">
                <div className="hat-of-the-hat"></div>
                <div className="four-point-star --first"></div>
                <div className="four-point-star --second"></div>
                <div className="four-point-star --third"></div>
            </div>
        </div>
    </div>
</div>
<div className="progress"></div>
<div className="noise"></div> */}
</>
            {/* ):( */}
              <>
    <div className="container-lg">
      <div className="row gap-5 g-4 my-4 text-center justify-content-center">
        {editedProducts.map((product) => (
          <div className="card col-lg-3 bg-white" key={product.id}>
            <div className="row g-0 py-3">
              <div className="col-md-4 d-flex">
                <img src={product.image} className="img-fluid" alt="loading" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <h5 className="card-title">{product.price}</h5>
                  <p className="card-text text-truncate">
                    {product.description}
                  </p>
                  <div className="text-center">
                    <Button
                      variant="contained"
                      size="medium"
                      className="px-4"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="contained" className="my-5" onClick={handleAddCard}>
        Add Card
      </Button>

      <Modal
        className="modal-dialog modal-xl overflow-scroll"
        open={showModal}
        onClose={handleCloseModal}
      >
        <div className="modal-content">
          {/* Add your modal content here */}
          <div className="modal-header">
            <h5 className="modal-title">Product Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            {/* Add your edit form or content here */}
            <form action="" className="w-100 row">
              <div className="col-lg-12 d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="m-0">Upload Product Image</h3>
                </div>
                <div>
                  <div className="file-upload-container">
                    <label htmlFor="file-input" className="file-upload-label">
                      <div className="file-upload-box">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Uploaded"
                            className="file-icon w-25"
                          />
                        ) : (
                          <div className="file-icon">&#128190;</div>
                        )}
                        {selectedFile ? (
                          <div className="file-name">{selectedFile.name}</div>
                        ) : (
                          <div className="file-placeholder">Choose a file</div>
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="file-input"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-12  d-flex align-items-center justify-content-between my-3">
                <div>
                  <h3 className="m-0">Name</h3>
                </div>
                <div>
                  <TextField
                    id="name"
                    label="Name"
                    variant="filled"
                    onChange={handleInputChange}
                    value={formValues.name}
                  />
                </div>
              </div>
              <div className="col-lg-12 d-flex align-items-center justify-content-between my-3">
                <div>
                  <h3 className="m-0">Price</h3>
                </div>
                <div>
                  <TextField
                    id="price"
                    label="Price"
                    variant="filled"
                    onChange={handleInputChange}
                    value={formValues.price}
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="my-3">
                  <h3 className="m-0">Description</h3>
                </div>
                <div>
                  <TextField
                    id="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    variant="filled"
                    onChange={handleInputChange}
                    value={formValues.description}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <Button variant="contained" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              className="mx-2"
              variant="contained"
              onClick={handleSaveChanges}
              disabled={!formChanges}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
              </>
            {/* )} */}
            </div>
        </div>
        </div>
    </section>
  );
};

export default AdminCartUpload;

