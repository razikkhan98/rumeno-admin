import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Mean from "../Mean";
import Navbar from "../Navbar";
import axios from 'axios';
import dummy from '../../assets/img/products/istockphoto-1409329028-612x612.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const AdminCartUpload = () => {
  const [blogs, setBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, setValue, control,formState: { errors } } = useForm();
  const apiUrl = `${process.env.REACT_APP_API}`;

  const openBlogModal = () => {
    reset();
    setOpenModal(true);
    setSelectedItem(null);
    setValue("content", "");
    setValue("keywords", "");
    setValue("heading", "");
    setValue("description", "");
    setValue("metadescription", "");
    setValue("script", "");
    setImageUrl(null);
    setSelectedFile(null);
    localStorage.removeItem('storeBlogUrl');
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedItem(null);
    setImageUrl(null);
    setSelectedFile(null);
    localStorage.removeItem('storeBlogUrl');
  };

  useEffect(() => {
    console.log('blogs: ', blogs);
    fetchItems();
  }, []);

  // const handleFileChange = (e) => {
  //   try {
  //     const files = Array.from(e.target.files);
  //     setSelectedFile(files[0]);

  //     const reader = new FileReader();
  //     reader.readAsDataURL(files[0]);
  //     reader.onload = () => {
  //       setImageUrl(reader.result);
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  const handleFileChange = (e) => {
    try {
      const file = e.target.files[0];
      
      // Check if the file is an image
      if (!isImage(file)) {
        alert('This is not a valid image. Please upload a JPG, PNG..');
        throw new Error('Invalid file type');
      }
  
      // Validate file size
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size exceeds 5MB limit.');
        throw new Error('File too large');
      }
  
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageUrl(reader.result);
      };
    } catch (error) {
      console.log(error);
      // Handle error (e.g., show error message to user)
    }
  };
  
  // Helper function to check if the file is an image
  function isImage(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return validTypes.includes(file.type);
  }
  

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get_all_blog`);
      setBlogs(response.data.blog);
      console.log('response.data.blog: ', response.data.blog);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const uploadImage = async () => {
    const apiKey = "273ab24b40be59dc593d96c50976ae42"
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const uploadImgResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${apiKey}`,
          formData
        );
        return uploadImgResponse.data.data.url;
      } catch (error) {
        console.log(`Error uploading image`, error);
        setLoading(false);
        return null;
      }
    }
    return null;
  };

  const onSubmit = async (data) => {
    setLoading(true);

    let imageUrl = await uploadImage();
    if (!imageUrl) {
      imageUrl = localStorage.getItem('storeBlogUrl');
    } else {
      localStorage.setItem('storeBlogUrl', imageUrl);
    }

    const payload = {
      content: data.content,
      heading: data.heading,
      description: data.description,
      metadescription: data.metadescription,
      script: data.script,
      keywords: data.keywords,
      image: imageUrl,
    };

    if (selectedItem !== null) {
      // Update existing blog
      try {
        const response = await axios.put(`${apiUrl}/update_blog/${blogs[selectedItem]._id}`, payload);
        console.log('response: ', response.data);
        fetchItems();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      // Add new blog
      try {
        const response = await axios.post(`${apiUrl}/create_blog`, payload);
        console.log('response: ', response.data);
        fetchItems();
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }

    closeModal();
    setLoading(false);
  };

  const handleEdit = (index) => {
    setOpenModal(true);
    setValue("content", blogs[index].content);
    setValue("keywords", blogs[index].keywords);
    setValue("heading", blogs[index].heading);
    setValue("description", blogs[index].description);
    setValue("metadescription",blogs[index].metadescription);
    setValue("script",blogs[index].script);
    setImageUrl(blogs[index].image);
    setSelectedFile(null); // Clear the selected file when editing
    setSelectedItem(index);
    localStorage.setItem('storeBlogUrl', blogs[index].image); // Set the image URL in localStorage
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`${apiUrl}/delete_blog/${blogs[index]._id}`);
      setBlogs(blogs.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
  };


  return (
    <section className="bg-menu-theme">
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Mean />
          <div className="layout-page">
            <Navbar />
            <div className="container-lg mt-4 px-0">
              <button onClick={openBlogModal} className="btn btn-primary">Add Blog</button>
              <div className="row mt-4 justify-content-center w-100">
                {blogs.map((blog, index) => (
                  <div key={index} className="col-lg-3 mx-4 card blog-card mb-3 px-0">
                    {(!blog?.image?.length) ? <img src={dummy} className="img-fluid" alt="loading" /> : <img src={blog?.image} className="img-fluid object-fit-cover" alt="loading" />}
                    <div className='py-3 px-2'>
                      <h4 className='text-trun-blog' > {blog.heading}</h4>
                      <p className='text-trun-blog-desc' > {blog.description}</p>
                      {/* <div className='text-trun-blog' dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
                      <hr className='my-2 text-secondary' />
                      <div className='d-flex mt-3 justify-content-around'>
                        <button onClick={() => handleEdit(index)} className="btn btn-warning mx-1">Edit</button>
                        <button onClick={() => handleDelete(index)} className="btn btn-danger mx-1">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Modal
                show={openModal}
                onHide={closeModal}
                size="xl"
              >
                <Modal.Header className='p-2' closeButton>
                  <h2 className='m-0'>Blog</h2>
                </Modal.Header>
                <Modal.Body className='p-2'>
                  <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                      name="content"
                      control={control}
                      render={({ field }) => (
                        <ReactQuill
                          {...field}
                          modules={modules}
                          className='w-auto'
                        />
                      )}
                    />
                    <div className='row mt-4 justify-content-around'>
                      <div className="col-lg-5 my-2">
                        <label className="form-label" htmlFor="heading">
                          Main Heading
                        </label>
                        <textarea rows={3}
                          name="heading"
                          placeholder="Main Heading"
                          type="text"
                          id="heading"
                          className="form-control"
                          {...register("heading",{ required: "heading required" })}
                        />
                        {errors.heading && (
                          <p className="text-danger">
                            {errors.heading.message}
                          </p>
                        )}
                      </div>
                      <div className="col-lg-5 my-2">
                        <label className="form-label" htmlFor="description">
                          Description
                        </label>
                        <textarea rows={3}
                          name="description"
                          placeholder="Description"
                          type="text"
                          id="description"
                          className="form-control"
                          {...register("description",{ required: "description required" })}
                          />
                          {errors.description && (
                            <p className="text-danger">
                              {errors.description.message}
                            </p>
                          )}
                      </div>
                      <div className="col-lg-5 my-2">
                        <label className="form-label" htmlFor="metadescription">
                         Meta Description
                        </label>
                        <textarea rows={3}
                          name="metadescription"
                          placeholder="Meta Description"
                          type="text"
                          id="metadescription"
                          className="form-control"
                          {...register("metadescription",{ required: "meta description required" })}
                          />
                          {errors.metadescription && (
                            <p className="text-danger">
                              {errors.metadescription.message}
                            </p>
                          )}
                      </div>
                      <div className="col-lg-5 my-2">
                        <label className="form-label" htmlFor="script">
                         Script
                        </label>
                        <textarea rows={3}
                          name="script"
                          placeholder="script"
                          type="text"
                          id="script"
                          className="form-control"
                          {...register("script",{ required: "script required" })}
                          />
                          {errors.script && (
                            <p className="text-danger">
                              {errors.script.message}
                            </p>
                          )}
                      </div>

                      <div className="col-lg-5 my-2">
                        <label className="form-label fw-bold" htmlFor="keywords">
                          Keywords
                        </label>
                        <textarea rows={3}
                          name="keywords"
                          placeholder="Ex: keywords, keywords, keywords..."
                          type="text"
                          id="keywords"
                          className="form-control"
                          {...register("keywords",{ required: "keywords required" })}
                          />
                          {errors.keywords && (
                            <p className="text-danger">
                              {errors.keywords.message}
                            </p>
                          )}
                      </div>
                      <div className="file-upload-container col-lg-5">
                      <p className="text-start form-label">upload product images</p>
                        <label htmlFor="file-input" className="file-upload-label  border">
                          <div className="file-upload-box mx-3 text-center">
                            {imageUrl?.length ? (
                              <img src={imageUrl} className="file-icon modal-main-img shadow" />
                            ) : (
                              <div className="file-icon px-4 py-3"><FontAwesomeIcon className="h1" icon={faImage} />
                                <p  className="m-0">uplaod image</p>
                                </div>
                            )}
                            {selectedFile?.length > 0 ? (
                              <div className="file-name">{selectedFile.map(file => file.name).join(', ')}</div>
                            ) : (
                              <div className="file-placeholder"></div>
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
                    <div className='d-flex'>
                      <button
                        type="submit"
                        className="btn btn-primary w-auto m-2"
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
                      <button onClick={closeModal} type='button' className="btn btn-secondary w-auto m-2">Cancel</button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminCartUpload;
