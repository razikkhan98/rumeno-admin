

import React, { useContext, useEffect, useState } from "react";
import Mean from "../Mean";
import Navbar from "../Navbar";
import "./loader.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "react-bootstrap";
import dummy from '../../assets/img/products/istockphoto-1409329028-612x612.jpg'

const AdminCartUpload = () => {

  const { register, handleSubmit, setValue } = useForm();
  const [ProductData, setProductData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const apiUrl = `${process.env.REACT_APP_API}`;



  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile(files);

    const fileUrls = files.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
      });
    });

    Promise.all(fileUrls).then(urls => {
      setImageUrl(urls);
    });
  };




  const handleOpenDialog = () => {
    localStorage.removeItem('localSelectItem')
    localStorage.removeItem('storeUrl')
    setOpenModal(true);
    setValue("name","")
      setValue("price","")
      setValue("img","")
      setValue("metaDesc","")
      setValue("veg","")
      setValue("offer","")
      setValue("delivery","")
      setValue("refundable","")
      setValue("weight","")
      setValue("shortdescription","")
      setValue("description","")
      setValue("instruction","")
      setValue("category","")
      setValue("type","")
      setValue("imgtext","")
      setValue("script","")
      setValue("video","")
      setImageUrl(null)
    setSelectedItem(null);
  };


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_all_product`
        // ,
        // {
        //   headers: {
        //     // 'Authorization': `${getMidCookies.token}`
        //   }
        // }
      );
      setProductData(response?.data?.products)
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // ------------
  const [loading, setLoading] = useState(false);
  // -------------



  const onsubmit = async (data) => {
    setLoading(true)

    const apiKey = "273ab24b40be59dc593d96c50976ae42";
    const uploadedUrls = [];
    for (let i = 0; i < selectedFile?.length; i++) {
      const formData = new FormData();
      formData.append("image", selectedFile[i]);

      console.log(`Uploading image ${i + 1} of ${selectedFile?.length}`);

      try {
        const uploadImgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );

        console.log('response: ', uploadImgResponse?.data?.status);
        if (uploadImgResponse?.data?.status === 200) {
          console.log(`Image ${i + 1} uploaded successfully`, uploadImgResponse?.data?.data?.url);
          const imageUrl = uploadImgResponse?.data?.data?.url;
        uploadedUrls.push(imageUrl); // Store URL in the array
        } else {
          console.log(`Image ${i + 1} failed to upload: ${uploadImgResponse?.data?.error?.message}`);
          break;  // Optionally, break the loop if any upload fails
        }
      } catch (error) {
        console.log(`Error uploading image ${i + 1}: `, error);
        break;  // Optionally, break the loop if any upload fails
      }
      localStorage.setItem('storeUrl', uploadedUrls);
    }
    const payload = {
      name: data?.name,
      priceText: data?.price,
      img: localStorage.getItem('storeUrl'),
      metaDesc: data?.metaDesc,
      Veg: data?.veg,
      Offer: data?.offer,
      Delivery: data?.delivery,
      Refundable: data?.refundable,
      Weight: data?.weight,
      Shortdescription: data?.shortdescription,
      description: data?.description,
      Instruction: data?.instruction,
      Category: data?.category,
      Type: data?.type,
      imgText: data?.imgtext,
      script: data?.script,
      video: data?.video,
    }
    // Uncomment and update the below code for editing or adding items if necessary
    if (localStorage.getItem('localSelectItem')) {
      try {
        const response = await axios.put(`${apiUrl}/update_product/${ProductData[localStorage.getItem('localSelectItem')]._id}`, payload
          //   ,
          //    {
          //   headers: {
          //     'Authorization': `${getMidCookies.token}`
          //   }
          // }
        );
        const updatedAdminProduct = [...ProductData];
        updatedAdminProduct[selectedItem] = response.data;
        fetchItems();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      try {
        const response = await axios.post(`${apiUrl}/create_product`, payload
          //   , {
          //   headers: {
          //     'Authorization': `${getMidCookies.token}`
          //   }
          // }
        );
        fetchItems();
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
    setLoading(false)
    handleCloseDialog();
  };

  const handleEdit = (index) => {
    setSelectedItem(index);
    localStorage.setItem('localSelectItem', index)
    setValue("name", ProductData[index].name);
    setValue("price", ProductData[index].priceText);
    setValue("img", setImageUrl(ProductData[index].img));
    setValue("metaDesc", ProductData[index].metaDesc);
    setValue("veg", ProductData[index].Veg);
    setValue("offer", ProductData[index].Offer);
    setValue("delivery", ProductData[index].Delivery);
    setValue("refundable", ProductData[index].Refundable);
    setValue("weight", ProductData[index].Weight);
    setValue("shortdescription", ProductData[index].Shortdescription);
    setValue("description", ProductData[index].description);
    setValue("instruction", ProductData[index].Instruction);
    setValue("category", ProductData[index].Category);
    setValue("type", ProductData[index].Type);
    setValue("imgtext", ProductData[index].imgText);
    setValue("script", ProductData[index].script);
    setValue("video", ProductData[index].video);
    
    setOpenModal(true);
  };


  const handleCloseDialog = () => {
    localStorage.removeItem('localSelectItem')
    localStorage.removeItem('storeUrl')
    setOpenModal(false);
    setValue("name","")
      setValue("price","")
      setValue("img","")
      setValue("metaDesc","")
      setValue("veg","")
      setValue("offer","")
      setValue("delivery","")
      setValue("refundable","")
      setValue("weight","")
      setValue("shortdescription","")
      setValue("description","")
      setValue("instruction","")
      setValue("category","")
      setValue("type","")
      setValue("imgtext","")
      setValue("script","")
      setValue("video","")
      setImageUrl(null)
    setSelectedItem(null);
  };


  const handleDelete = async (index) => {

    try {
      const response = await axios.delete(`${apiUrl}/delete_product/${ProductData[index]._id}`
      // ,
      //   {
      //     headers: {
      //       'Authorization': `${getMidCookies.token}`
      //     }
      //   }
      );
      setProductData(ProductData.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };



  return (
    <section className="bg-menu-theme">
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Mean />
          <div className="layout-page">
            <Navbar />

            <div className="container-lg mt-4">
              <div>
                <button
                  className="m-3 btn btn-primary w-auto"
                  onClick={() => handleOpenDialog()}
                >
                  Add Product
                </button>
                <div className="row">
                  {ProductData.map((product, index) => (
                    <div className="card prd-card col-lg-5 m-2 bg-white" key={product.index}>
                      <div className="row g-0 py-3">
                        <div className="col-md-4 d-flex">
                          {(!product?.img?.length) ? <img src={dummy} className="img-fluid" alt="loading" /> : <img src={product.img[0]} className="img-fluid" alt="loading" />}
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <h5 className="card-title">{product.priceText}</h5>
                            <h5 className="card-title">{product.Weight}</h5>
                            {/* <p className="card-text text-truncate">
                              {product.description}
                            </p>
                            <p className="card-text text-truncate">
                              {product.Shortdescription}
                            </p> */}
                            {/* <p className="card-text text-truncate">
                              {product.Instruction}
                            </p>
                            <p className="card-text text-truncate">
                              {product.imgText}
                            </p>
                            <p className="card-text text-truncate">
                              {product.Type}
                            </p> */}
                            <p className="card-text text-truncate">
                              {product.Category}
                            </p>
                            <span className="text-center mx-2">
                              <button className="btn btn-warning w-auto mx-2" onClick={() => handleEdit(index)}>
                                Edit
                              </button>
                              <button className="btn btn-danger w-auto mx-2" onClick={() => handleDelete(index)}>
                                Delete
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>



                <Modal show={openModal} onHide={handleCloseDialog} dialogClassName="modal-size">

                  <Modal.Header closeButton>
                    {selectedItem !== null ? "Edit Item" : "Add New Item"}
                  </Modal.Header>
                  <Modal.Body>
                    <form className="w-100" onSubmit={handleSubmit(onsubmit)}>
                      <div className="row justify-content-around">
                        {/* <h2 className="text-center">KID DATA</h2> */}

                        <div className="col-lg-6 my-2">
                          <label className="form-label" for="name">
                            Product Name
                          </label>
                          <input
                            name="name"
                            placeholder="Product Name"
                            type="text"
                            id="name"
                            className="form-control"
                            value={ProductData.name}
                            {...register("name")}
                          />
                        </div>

                        <div className="col-lg-3 my-2">
                          <label className="form-label" for="price">
                            Price
                          </label>
                          <input
                            name="price"
                            placeholder="Price"
                            type="number"
                            id="price"
                            className="form-control"
                            value={ProductData.price}
                            {...register("price")}
                          />
                        </div>
                        <div className="col-lg-3 my-2">
                          <label className="form-label" for="weight">
                            Weight
                          </label>
                          <input
                            name="weight"
                            placeholder="Weight"
                            type="text"
                            id="weight"
                            className="form-control"
                            value={ProductData.weight}
                            {...register("weight")}
                          />
                        </div>
                        <div className="col-lg-6 my-2">
                          <label className="form-label" for="description">
                            Description
                          </label>
                          <textarea rows={3}
                            name="description"
                            placeholder="Description"
                            type="text"
                            id="description"
                            className="form-control"
                            value={ProductData.description}
                            {...register("description")}
                          />
                        </div>
                        <div className="col-lg-6 my-2">
                          <label className="form-label" for="shortdescription">
                            Short Description
                          </label>
                          <textarea rows={3}
                            name="shortdescription"
                            placeholder="Short shortdescription"
                            type="text"
                            id="shortdescription"
                            className="form-control"
                            value={ProductData.shortdescription}
                            {...register("shortdescription")}
                          />
                        </div>
                        <div className="col-lg-6 my-2">
                          <label className="form-label" for="instruction">
                            Instruction
                          </label>
                          <textarea rows={3}
                            name="instruction"
                            placeholder="Instruction"
                            type="text"
                            id="instruction"
                            className="form-control"
                            value={ProductData.instruction}
                            {...register("instruction")}
                          />
                        </div>
                        <div className="col-lg-6 my-2">
                          <label className="form-label" for="type">
                            Type
                          </label>
                          <textarea rows={3}
                            name="type"
                            placeholder="Tool/Medicine..."
                            type="text"
                            id="type"
                            className="form-control"
                            value={ProductData.type}
                            {...register("type")}
                          />
                        </div>
                        <div className="col-lg-12 my-2">
                          <label
                            className="form-label d-block"
                            htmlFor="category"
                          >
                            Category
                          </label>
                          <hr />
                          <div className="d-flex justify-content-around">
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="cat "
                                id="flexCheckDefault1"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault1">
                                cat
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="dog "
                                id="flexCheckDefault2"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault2">
                                dog
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="goat "
                                id="flexCheckDefault3"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault3">
                                goat
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="sheep "
                                id="flexCheckDefault4"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault4">
                                sheep
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="cow "
                                id="flexCheckDefault5"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault5">
                                cow
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="baffalo "
                                id="flexCheckDefault6"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault6">
                                baffalo
                              </label>
                            </div>

                          </div>
                          <hr />
                          <div className="d-flex justify-content-around">
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="horse "
                                id="flexCheckDefault7"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault7">
                                horse
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="pig "
                                id="flexCheckDefault8"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault8">
                                pig
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="birds "
                                id="flexCheckDefault9"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault9">
                                birds
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="poultry "
                                id="flexCheckDefault10"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault10">
                                poultry
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="cattle "
                                id="flexCheckDefault11"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault11">
                                cattle
                              </label>
                            </div>

                          </div>
                          <hr />
                        </div>

                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="imgtext">
                            Image Text
                          </label>
                          <textarea
                            name="imgtext"
                            placeholder="img text"
                            type="text"
                            id="imgtext"
                            className="form-control"
                            rows={3}
                            value={ProductData.imgtext}
                            {...register("imgtext")}
                          />
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="refundable">
                            Refund Policy
                          </label>
                          <textarea rows={3}
                            name="refundable"
                            placeholder="Refund Policy"
                            type="text"
                            id="refundable"
                            className="form-control"
                            value={ProductData.refundable}
                            {...register("refundable")}
                          />
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="script">
                            Script
                          </label>
                          <textarea rows={3}
                            name="script"
                            placeholder="img text"
                            type="text"
                            id="script"
                            className="form-control"
                            value={ProductData.script}
                            {...register("script")}
                          />
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="delivery">
                            Delivery Details
                          </label>
                          <textarea rows={3}
                            name="delivery"
                            placeholder="delivery"
                            type="text"
                            id="delivery"
                            className="form-control"
                            value={ProductData.delivery}
                            {...register("delivery")}
                          />
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="offer">
                            Offer
                          </label>
                          <textarea rows={3}
                            name="offer"
                            placeholder="img text"
                            type="text"
                            id="offer"
                            className="form-control"
                            value={ProductData.offer}
                            {...register("offer")}
                          />
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="video">
                            Videos
                          </label>
                          <textarea rows={3}
                            name="video"
                            placeholder="upload video"
                            type="text"
                            id="video"
                            className="form-control"
                            value={ProductData.video}
                            {...register("video")}
                          />
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="metaDesc">
                            Meta Description
                          </label>
                          <textarea rows={3}
                            name="metaDesc"
                            placeholder="meta Description"
                            type="text"
                            id="metaDesc"
                            className="form-control"
                            value={ProductData.metaDesc}
                            {...register("metaDesc")}
                          />
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="veg">
                            Veg or Non veg
                          </label>
                          <textarea rows={3}
                            name="veg"
                            placeholder="Food Type"
                            type="text"
                            id="veg"
                            className="form-control"
                            value={ProductData.veg}
                            {...register("veg")}
                          />
                        </div>

                        {/* <div className="file-upload-container col-lg-6">
                          <label htmlFor="file-input" className="file-upload-label">
                            <div className="file-upload-box">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt="Uploaded"
                                  className="file-icon w-100 h-100"
                                />
                              ) : (
                                <div className="file-icon">&#128190;</div>
                              )}
                              {selectedFile ? (
                                <div className="file-name">{selectedFile.name}</div>
                              ) : (
                                <div className="file-placeholder">Upload Product Image</div>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            id="file-input"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </div> */}
                        <div className="file-upload-container col-lg-4">
                          <label htmlFor="file-input" className="file-upload-label">
                            <div className="file-upload-box">
                              {imageUrl?.length ? (
                                  <img src={imageUrl[0]} className="file-icon w-100 h-100" />
                              ) : (
                                <div className="file-icon">&#128190;</div>
                              )}
                              {selectedFile?.length > 0 ? (
                                <div className="file-name">{selectedFile.map(file => file.name).join(', ')}</div>
                              ) : (
                                <div className="file-placeholder">Upload Product Images</div>
                              )}
                            </div>
                          </label>
                          <input
                            type="file"
                            id="file-input"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary w-25 mt-3"
                          >
                            Submit{" "}
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                              </>
                            ) : (
                              <></>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminCartUpload;