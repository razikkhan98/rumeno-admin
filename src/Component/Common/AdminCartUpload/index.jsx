

import React, { useContext, useEffect, useState } from "react";
import Mean from "../Mean";
import Navbar from "../Navbar";
import "./loader.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import { Modal } from "react-bootstrap";
import dummy from '../../assets/img/products/istockphoto-1409329028-612x612.jpg'
import { faImage, faRemove, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageUpload from "../upload/imageUpload";

const AdminCartUpload = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
  const [ProductData, setProductData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const apiUrl = `${process.env.REACT_APP_API}`;
  const [loading, setLoading] = useState(false);
  const [UploadLoading, setUploadLoading] = useState(false);
  const [fileList, setFileList] = useState([]);



  useEffect(() => {
    fetchItems();
    // console.log("cekc",UploadImg)
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_all_product`);
      setProductData(response?.data?.products);
      console.log('response?.data?.products: ', response?.data?.products);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };



  const handleOpenDialog = () => {
    reset();
    setOpenModal(true);
    setSelectedItem(null);
    localStorage.removeItem('localSelectItem');
    localStorage.removeItem('storeUrl');
    setValue("name", "");
    setValue("price", "");
    setValue("img", "");
    setValue("metaDesc", "");
    setValue("veg", "");
    setValue("offer", "");
    setValue("delivery", "");
    setValue("refundable", "");
    setValue("weight", "");
    setValue("shortdescription", "");
    setValue("description", "");
    setValue("instruction", "");
    setValue("category", "");
    setValue("type", "");
    setValue("imgtext", "");
    setValue("script", "");
    setValue("video", "");
    setValue("stock", "");
    setImageUrl(null);
    setSelectedFile(null);
    setUploadedUrls([])
    setFileList(null)
  };

  const handleCloseDialog = () => {
    localStorage.removeItem('localSelectItem');
    localStorage.removeItem('storeUrl');
    setOpenModal(false);
    setValue("name", "");
    setValue("price", "");
    setValue("img", "");
    setValue("metaDesc", "");
    setValue("veg", "");
    setValue("offer", "");
    setValue("delivery", "");
    setValue("refundable", "");
    setValue("weight", "");
    setValue("shortdescription", "");
    setValue("description", "");
    setValue("instruction", "");
    setValue("category", "");
    setValue("type", "");
    setValue("imgtext", "");
    setValue("script", "");
    setValue("video", "");
    setValue("stock", "");

    setImageUrl(null);
    setSelectedFile(null);
    setSelectedItem(null);
    setUploadedUrls([])
    setFileList(null)
  };
  // ------------------------
  const [uploadedUrls, setUploadedUrls] = useState([]); // Store the actual URLs from the API
  const apiKey = "273ab24b40be59dc593d96c50976ae42"; // Replace with your actual API key

  const uploadImagesToApi = async (files) => {
    const uploadedUrls = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("image", files[i]);

      try {
        const uploadImgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );

        if (uploadImgResponse.data.status === 200) {
          const imageUrl = uploadImgResponse.data.data.url;
          uploadedUrls.push(imageUrl);
        } else {
          console.log(`Image ${i + 1} failed to upload: ${uploadImgResponse.data.error.message}`);
        }
      } catch (error) {
        console.log(`Error uploading image ${i + 1}: `, error);
      }
    }

    return uploadedUrls;
  };

  const handleImgUpload = async (e) => {
    setUploadLoading(true);
    const files = Array.from(e.target.files);
    const validImages = [];

    // Validate file type and size
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check if file is an image (you can check for other image types as well)
      const validImageTypes = ['image/jpeg', 'image/png'];
      if (!validImageTypes.includes(file.type)) {
        alert(`File ${file.name} is not a valid image. Please upload a JPG, PNG.`);
        console.error(`File ${file.name} is not a valid image. Please upload a JPG, PNG.`);
        continue; // Skip this file
      }

      // Check if the file size is less than 5MB (or any other limit)
      const maxSizeInMB = 5; // Maximum file size in MB
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert(`File ${file.name} exceeds the size limit of ${maxSizeInMB}MB.`);
        console.error(`File ${file.name} exceeds the size limit of ${maxSizeInMB}MB.`);
        continue; // Skip this file
      }

      validImages.push(file);
    }

    if (validImages.length === 0) {
      console.error('No valid images to upload.');
      setUploadLoading(false);
      return; // Exit if no valid images
    }

    try {
      const newUploadedUrls = await uploadImagesToApi(validImages);
      if (newUploadedUrls) {
        setUploadLoading(false);
      }

      // Get previously uploaded URLs or initialize an empty array if none exist
      let getPrevUrl = JSON.parse(localStorage.getItem('storeUrl')) || [];

      // Merge the old and new URLs
      let merge = [...getPrevUrl, ...newUploadedUrls];
      setUploadedUrls((prevUrls) => prevUrls.concat(newUploadedUrls));

      // Store the updated URLs in localStorage
      localStorage.setItem('storeUrl', JSON.stringify(merge));
    } catch (error) {
      alert("Error uploading images:", error);
      console.error("Error uploading images:", error);
      setUploadLoading(false);
    }
  };


  const handleImgRemove = (index) => {
    const newUploadedUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUploadedUrls);
    localStorage.setItem('storeUrl', JSON.stringify(newUploadedUrls));
  };


  const handleImgUpdate = async (e, index) => {
    const file = e.target.files[0];

    if (file) {
      // Validate if the file is an image
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!validImageTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, PNG, or GIF).');
        return;
      }

      // Validate file size (2 MB limit)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
      if (file.size > maxSizeInBytes) {
        alert('Please upload an image smaller than 2 MB.');
        return;
      }

      setUploadLoading(true);

      const newUploadedUrls = await uploadImagesToApi([file]);

      if (newUploadedUrls.length > 0) {
        setUploadLoading(false);

        const updatedUrls = uploadedUrls?.map((img, i) =>
          i === index ? newUploadedUrls[0] : img
        );
        setUploadedUrls(updatedUrls);
        console.log('updatedUrls: ', updatedUrls);
        localStorage.setItem('storeUrl', JSON.stringify(updatedUrls));
      }
    }
  };

  // ---------------



  const onsubmit = async (data) => {
    console.log('data: ', data);
    setLoading(true);
    let uploadedUrls = [];

    // if (selectedFile) {
    //   uploadedUrls = await uploadImages();
    // } else if (!selectedItem) {
    uploadedUrls = JSON.parse(localStorage.getItem('storeUrl'));
    // }

    const payload = {
      name: data.name,
      priceText: data.price,
      img: uploadedUrls,
      metaDesc: data.metaDesc,
      Veg: data.veg,
      Offer: data.offer,
      Delivery: data.delivery,
      Refundable: data.refundable,
      Weight: data.weight,
      Shortdescription: data.shortdescription,
      description: data.description,
      Instruction: data.instruction,
      Category: data.category,
      Type: data.type,
      imgText: data.imgtext,
      script: data.script,
      video: data.video,
      stock: data.stock,
    };

    try {
      if (selectedItem !== null) {
        const response = await axios.put(`${apiUrl}/update_product/${ProductData[selectedItem]._id}`, payload);
        const updatedProductData = [...ProductData];
        updatedProductData[selectedItem] = response.data;
        setProductData(updatedProductData);
        fetchItems();
      } else {
        const response = await axios.post(`${apiUrl}/create_product`, payload);
        console.log('response: ', response);
        fetchItems();
      }
    } catch (error) {
      console.error('Error saving item:', error);
    }

    setLoading(false);
    handleCloseDialog();
  };

  const handleEdit = (index) => {
    setSelectedItem(index);
    const product = ProductData[index];

    localStorage.setItem('localSelectItem', index);
    localStorage.setItem('storeUrl', JSON.stringify(product.img));

    setValue("name", product?.name);
    setValue("price", product?.priceText);
    setValue("metaDesc", product?.metaDesc);
    setValue("veg", product?.Veg);
    setValue("offer", product?.Offer);
    setValue("delivery", product?.Delivery);
    setValue("refundable", product?.Refundable);
    setValue("weight", product?.Weight);
    setValue("shortdescription", product?.Shortdescription);
    setValue("description", product?.description);
    setValue("instruction", product?.Instruction);
    setValue("category", product?.Category);
    setValue("type", product?.Type);
    setValue("imgtext", product?.imgText);
    setValue("script", product?.script);
    setValue("video", product?.video);
    setValue("stock", product?.stock);
    setImageUrl(product?.img?.length > 0 ? product?.img[0] : null);
    setFileList(product?.img?.length > 0 ? product?.img : null)
    setUploadedUrls(product?.img?.length > 0 ? product?.img : [])
    setOpenModal(true);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${apiUrl}/delete_product/${ProductData[index]._id}`);
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
                          {(!product?.img?.length) ? <img src={dummy} className="img-fluid" alt="loading" /> : <img src={product?.img[0]} className="prd-img" alt="loading" />}
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <h5 className="card-title">{product.priceText}</h5>
                            <h5 className="card-title">{product.Weight}</h5>
                            <p className="card-text text-truncate">
                              {` ${product.Category}`}
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
                            {...register("name", { required: "Product Name is required" })}
                          />
                          {errors.name && (
                            <p className=" text-danger">{errors.name.message}</p>
                          )}
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
                            {...register("price", { required: "price is required" })}
                          />
                          {errors?.price && (
                            <p className="text-danger">{errors.price.message}</p>
                          )}
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
                            {...register("weight", { required: "weight is required" })}
                          />
                          {errors?.weight && (
                            <p className="text-danger">{errors.weight.message}</p>
                          )}
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
                            {...register("description", { required: "description is required" })}
                          />
                          {errors?.description && (
                            <p className="text-danger">{errors.description.message}</p>
                          )}
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
                            {...register("shortdescription", { required: "shortdescription is required" })}
                          />
                          {errors?.shortdescription && (
                            <p className="text-danger">{errors.shortdescription.message}</p>
                          )}
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
                            {...register("instruction", { required: "instruction is required" })}
                          />
                          {errors.instruction && (
                            <p className="text-danger">{errors.instruction.message}</p>
                          )}
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
                            {...register("type", { required: "type is required" })}
                          />
                          {errors.type && (
                            <p className="text-danger">{errors.type.message}</p>
                          )}
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
                                value="cat"
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
                                value="dog"
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
                                value="goat"
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
                                value="sheep"
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
                                value="fish"
                                id="flexCheckDefault5"
                                {...register("category")}
                              />
                              <label class="form-check-label" for="flexCheckDefault5">
                                fish
                              </label>
                            </div>
                            <div class="form-check">

                              <input
                                class="form-check-input"
                                type="checkbox"
                                value="baffalo"
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
                                value="horse"
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
                                value="pig"
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
                                value="birds"
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
                                value="poultry"
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
                                value="cattle"
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
                            Image Alt Text
                          </label>
                          <textarea
                            name="imgtext"
                            placeholder="img alt text"
                            type="text"
                            id="imgtext"
                            className="form-control"
                            rows={3}
                            value={ProductData.imgtext}
                            {...register("imgtext", { required: "imgtext is required" })}
                          />
                          {errors.imgtext && (
                            <p className="text-danger">{errors.imgtext.message}</p>
                          )}
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
                            {...register("refundable", { required: "refundable is required" })}
                          />
                          {errors.refundable && (
                            <p className="text-danger">{errors.refundable.message}</p>
                          )}
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="script">
                            Script
                          </label>
                          <textarea rows={3}
                            name="script"
                            placeholder="script"
                            type="text"
                            id="script"
                            className="form-control"
                            value={ProductData.script}
                            {...register("script", { required: "script is required" })}
                          />
                          {errors.script && (
                            <p className="text-danger">{errors.script.message}</p>
                          )}
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
                            {...register("delivery", { required: "delivery is required" })}
                          />
                          {errors.delivery && (
                            <p className="text-danger">{errors.delivery.message}</p>
                          )}
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="offer">
                            Offer
                          </label>
                          <textarea rows={3}
                            name="offer"
                            placeholder="offer"
                            type="text"
                            id="offer"
                            className="form-control"
                            value={ProductData.offer}
                            {...register("offer", { required: "offer is required" })}
                          />
                          {errors.offer && (
                            <p className="text-danger">{errors.offer.message}</p>
                          )}
                        </div>
                        <div className="col-lg-4 my-2">
                          <label className="form-label" for="video">
                            Videos Link
                          </label>
                          <textarea rows={3}
                            name="video"
                            placeholder="upload youtube iframe video url"
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
                            {...register("metaDesc", { required: "metaDesc is required" })}
                          />
                          {errors.metaDesc && (
                            <p className="text-danger">{errors.metaDesc.message}</p>
                          )}
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
                            {...register("veg", { required: "veg is required" })}
                          />
                          {errors.veg && (
                            <p className="text-danger">{errors.veg.message}</p>
                          )}
                        </div>
                        <div className="col-lg-3 my-2">
                          <label className="form-label" for="stock">
                            Stock
                          </label>
                          <input
                            name="stock"
                            placeholder="Stock Quantity"
                            type="number"
                            id="stock"
                            className="form-control"
                            value={ProductData.stock}
                            {...register("stock", { required: "stock quantity is required" })}
                          />
                          {errors?.stock && (
                            <p className="text-danger">{errors.stock.message}</p>
                          )}
                        </div>




                        <div className="col-lg-12 my-2">
                          <label className="form-label">
                            Upload Image
                          <p className="text-danger m-0">Image Size 500 x 500</p>
                          </label>

                          <label htmlFor="file-input-main" className="file-upload-label d-flex align-items-center mx-2 ">
                            <FontAwesomeIcon className="border p-4 my-0 h3" icon={faImage} />
                            {UploadLoading ? (
                              <>
                                <span className="d-flex align-items-center">
                                  <span className="spinner-border mx-3 spinner-border-sm" role="status" aria-hidden="true"></span>
                                </span>
                              </>
                            ) : (
                              <></>
                            )}
                          </label>
                          <input className='check d-none' id='file-input-main' type="file" multiple onChange={handleImgUpload} />

                          <div className='row mt-3'>
                            {uploadedUrls.map((image, index) => (
                              <div key={index} className='m-2 w-auto'>
                                <img
                                  src={image}
                                  alt={`uploaded-${index}`}
                                  className=''
                                  width={100}
                                  height={100}
                                />
                                <div className="d-flex justify-content-end align-items-center">
                                  <FontAwesomeIcon onClick={() => handleImgRemove(index)} className="mx-2 border p-1" icon={faRemove} />
                                  <label htmlFor={`file-input-${index}`} className="file-upload-label d-flex align-items-center mx-2 ">
                                    <FontAwesomeIcon className="border p-1" icon={faUpload} />
                                  </label>
                                  <input
                                    className='d-none'
                                    type="file"
                                    id={`file-input-${index}`}
                                    onChange={(e) => handleImgUpdate(e, index)}
                                  />
                                </div>
                              </div>
                            ))}

                          </div>
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

