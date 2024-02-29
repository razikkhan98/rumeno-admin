// import React, { useEffect, useState } from "react";
// import { Button, Modal, TextField } from "@mui/material";
// import prd1 from "../../assets/img/products/Rumenovita.jpg";
// import prd2 from "../../assets/img/products/microfloratane.jpg";
// import prd3 from "../../assets/img/products/minromix.jpg";
// import axios from "axios";
// import Mean from "../Mean";
// import Navbar from "../Navbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faImage } from "@fortawesome/free-solid-svg-icons";
// import './loader.css'

// const products = [
//   {
//     id: 1,
//     name: "Rumeno Vita",
//     price: "245 INR",
//     description:
//       "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
//     image: prd1,
//   },
//   {
//     id: 2,
//     name: "Microfloratane",
//     price: "245 INR",
//     description: "Another product description goes here.",
//     image: prd2,
//   },
//   {
//     id: 3,
//     name: "Minromix",
//     price: "245 INR",
//     description: "Yet another product description goes here.",
//     image: prd3,
//   },
// ];

// const AdminCartUpload = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [editedProducts, setEditedProducts] = useState([...products]);
//   const [formValues, setFormValues] = useState({
//     name: "",
//     price: "",
//     description: "",
//     image: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [formChanges, setFormChanges] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [Image, setImage] = useState(null);
//   const [addimg, setaddimg] = useState(null);



//     const fetchdata = async(data)=>{
//       try {
//         const response = await axios.post('https://example.com/api/endpoint',data);
//         console.log('Server Response:', response.data);
//         // await new Promise(resolve => setTimeout(resolve, 7000));
//         if(response.message == "Network Error"){
//           setLoading(false)
//         }

//       } catch (error) {
//         console.error('Error:', error);
//         if(error.message == "Network Error"){
//           setLoading(false)
//         }
//       } 
//     }
//     // fetchdata()



//   useEffect(() => {
//     console.log(Image);
//     console.log(selectedFile);
//     fetchdata()
//   }, [Image, selectedFile]);

//   const handleEditClick = (product) => {
//     setSelectedProduct(product);
//     setFormValues({
//       name: product.name,
//       price: product.price,
//       description: product.description,
//       image: selectedFile,
//     });
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleInputChange = (e) => {
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [e.target.id]: e.target.value,
//     }));
//     setFormChanges(true);
//   };

//   const handleFileChange = (e) => {
//     setFormChanges(true);
//     var reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload = () => {
//       console.log(reader.result);
//       setImage(reader.result);
//     };
//     const file = e.target.files;
//     setSelectedFile(file);
//     setaddimg(e.target.files[0])
//   };

//   const handleSaveChanges = async() => {
//     // setLoading(true)
//     const formData = new FormData();
//     formData.append('image', addimg);
//     console.log(addimg,3464848)
//     console.log(formData,3464848)

//     const index = editedProducts.findIndex((p) => p.id === selectedProduct?.id);

//     if (index !== -1) {
//       const updatedProduct = {
//         ...editedProducts[index],
//         name: formValues.name,
//         price: formValues.price,
//         description: formValues.description,
//         // image: Image,
//       };

//       setEditedProducts((prevProducts) => {
//         const newProducts = [...prevProducts];
//         newProducts[index] = updatedProduct;
//         return newProducts;
//       });
//     } else {
//       // If selectedProduct is null, it means a new card is being added
//       const newProduct = {
//         id: editedProducts.length + 1, // You may need to handle ID generation better
//         name: formValues.name,
//         price: formValues.price,
//         description: formValues.description,
//         // image: Image,
//       };
//       console.log(newProduct);
//       setEditedProducts((prevProducts) => [...prevProducts, newProduct]);
//     }

//     const datasend = {
//       id:formValues.id,
//         name: index,
//         price: formValues.price,
//         description: formValues.description,
//         image: addimg,
//     }
//     console.log(datasend)

//     setShowModal(false);
//     setFormChanges(false);


//     try {
//       const response = await axios.post('https://89a8-2401-4900-1c08-7658-ec3a-e43b-4210-c5fa.ngrok-free.app/',formValues);
//       console.log('Server Response:', response.data);
//       if(response.data.msg === "success"){
//         // setLoading(false)
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       console.log(error.message)
//       if(error.message === "Network Error"){
//         // fetchdata()
//       }
//     }
//   };
//   console.log(formValues);
//   console.log(editedProducts);

  

//   const handleAddCard = () => {
//     // Clear the form and open the modal for adding a new card
//     setFormValues({
//       id:editedProducts.length + 1,
//       name: "",
//       price: "",
//       description: "",
//       image: addimg,
//     });
//     setSelectedProduct(null);
//     setShowModal(true);
//     console.log(formValues)
//   };

//   return (
//     <section className="bg-menu-theme">
//       <div className="layout-wrapper layout-content-navbar">
//         <div className="layout-container">
//           <Mean/>
//         <div className="layout-page">
//             {/* <!-- Navbar --> */}
//             <Navbar />
//     <div className="container-lg">
//       {loading ? (
//         <div className="scene">
//         <div className="objects">
//           <div className="square"></div>
//           <div className="circle"></div>
//           <div className="triangle"></div>
//         </div>
  
//         <div className="wizard">
//           <div className="body"></div>
//           <div className="right-arm">
//             <div className="right-hand"></div>
//           </div>
//           <div className="left-arm">
//             <div className="left-hand"></div>
//           </div>
//           <div className="head">
//             <div className="beard"></div>
//             <div className="face">
//               <div className="adds">
//                 {/* Nose and Ear */}
//               </div>
//             </div>
//             <div className="hat">
//               <div className="hat-of-the-hat"></div>
//               <div className="four-point-star --first"></div>
//               <div className="four-point-star --second"></div>
//               <div className="four-point-star --third"></div>
//             </div>
//           </div>
//         </div>
  
//         <div className="progress"></div>
//         <div className="noise"></div>
//       </div>
  
//       ):(<>
//       <div className="row gap-5 g-4 my-4 text-center justify-content-center">
//         {editedProducts.map((product) => (
//           <div class="card col-lg-3 bg-white" key={product.id}>
//             <div class="row g-0 py-3">
//               <div class="col-md-4 d-flex">
//                 <img src={product.image} class="img-fluid" alt="loading" />
//               </div>
//               <div class="col-md-8">
//                 <div class="card-body">
//                   <h5 class="card-title">{product.name}</h5>
//                   <h5 class="card-title">{product.price}</h5>
//                   <p class="card-text text-truncate">
//                     This is a wider card with supporting text below as a natural
//                     lead-in to additional content. This content is a little bit
//                     longer.
//                   </p>
//                   <div className="text-center">
//                     <Button
//                       variant="contained"
//                       size="medium"
//                       className="px-4"
//                       onClick={() => handleEditClick(product)}
//                     >
//                       Edit
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Button variant="contained" className="my-5" onClick={handleAddCard}>
//         Add Card
//       </Button>

//       <Modal
//         className="modal-dialog modal-xl overflow-scroll"
//         open={showModal}
//         onClose={handleCloseModal}
//       >
//         <div className="modal-content">
//           {/* Add your modal content here */}
//           <div className="modal-header">
//             <h5 className="modal-title">Product Details</h5>
//             <button
//               type="button"
//               className="btn-close"
//               onClick={handleCloseModal}
//             ></button>
//           </div>
//           <div className="modal-body">
//             {/* Add your edit form or content here */}
//             <form action="" className="w-100 row">
//               <div className="col-lg-12 d-flex align-items-center justify-content-between">
//                 <div>
//                   <h3 className="m-0">Upload Product Image</h3>
//                 </div>
//                 <div>
//                   <div className="file-upload-container">
//                     <label htmlFor="file-input" className="file-upload-label">
//                       <div className="file-upload-box">
//                         {Image ? (
//                           <img
//                             src={Image}
//                             alt="Uploaded"
//                             className="file-icon"
//                           />
//                         ) : (
//                           <FontAwesomeIcon icon={faImage} />
//                         )}
//                         {selectedFile ? (
//                           <div className="file-name">{selectedFile.name}</div>
//                         ) : (
//                           <div className="file-placeholder">Choose a file</div>
//                         )}
//                       </div>
//                     </label>
//                     <input
//                       type="file"
//                       id="file-input"
//                       onChange={handleFileChange}
//                       style={{ display: "none" }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-12  d-flex align-items-center justify-content-between my-3">
//                 <div>
//                   <h3 className="m-0">Name</h3>
//                 </div>
//                 <div>
//                   <TextField
//                     id="name"
//                     label="Name"
//                     variant="filled"
//                     onChange={handleInputChange}
//                     value={formValues.name}
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-12 d-flex align-items-center justify-content-between my-3">
//                 <div>
//                   <h3 className="m-0">Price</h3>
//                 </div>
//                 <div>
//                   <TextField
//                     id="price"
//                     label="Price"
//                     variant="filled"
//                     onChange={handleInputChange}
//                     value={formValues.price}
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-12">
//                 <div className="my-3">
//                   <h3 className="m-0">Description</h3>
//                 </div>
//                 <div>
//                   <TextField
//                     id="description"
//                     label="Description"
//                     fullWidth
//                     multiline
//                     rows={4}
//                     variant="filled"
//                     onChange={handleInputChange}
//                     value={formValues.description}
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="modal-footer">
//             <Button variant="contained" onClick={handleCloseModal}>
//               Close
//             </Button>
//             <Button
//               className="mx-2"
//               variant="contained"
//               onClick={handleSaveChanges}
//               disabled={!formChanges}
//             >
//               Save
//             </Button>
//           </div>
//         </div>
//       </Modal>
//       </>
//       )}
//     </div>
//             </div>
//         </div>
//         </div>
//     </section>
//   );
// };

// export default AdminCartUpload;
// ----------------

// Install axios using npm install axios
// Import necessary modules and components
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// // Card component to display the data
// const Card = ({ data, onEdit }) => {
//   return (
//     <div>
//       {/* <p>Image: {data.image}</p> */}
//       <p>Name: {data.name}</p>
//       <p>Price: {data.price}</p>
//       <p>Description: {data.description}</p>
//       <button onClick={() => onEdit(data)}>Edit</button>
//     </div>
//   );
// };

// // Modal component for adding and editing data
// const Modal = ({ isOpen, onClose, onSave, data }) => {
//   const [image, setImage] = useState('');
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     if (data) {
//       // If data is provided, set the initial values for editing
//       // setImage(data.image);
//       setName(data.name);
//       setPrice(data.price);
//       setDescription(data.description);
//     }
//   }, [data]);
//   console.log(data)
//   console.log(image)

//   const handleSave = () => {
//     const newData = { image, name, price, description };
//     onSave(newData);
//     // Reset the input fields after saving
//     setImage('');  
//     setName('');
//     setPrice('');
//     setDescription('');
//     console.log(newData)
//   };

//   return (
//     <div style={{ display: isOpen ? 'block' : 'none' }}>
//       <div>
//         <label>Image:</label>
//         <input type="file"  onChange={(e) => setImage(e.target.files[0])} />
//       </div>
//       <div>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//       </div>
//       <div>
//         <label>Price:</label>
//         <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
//       </div>
//       <div>
//         <label>Description:</label>
//         <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
//       </div>
//       <button onClick={handleSave}>Save</button>
//       <button onClick={onClose}>Close</button>
//     </div>
//   );
// };

// // Main App component
// const Demo = () => {
//   const [cards, setCards] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);

//   const openModal = () => setIsModalOpen(true);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedCard(null);
//   };

//   const addCard = (data) => {
//     setCards([...cards, data]);
//     closeModal();
//     console.log(data,cards)
//   };

//   const editCard = (data) => {
//     // Find the index of the card to be edited
//     const index = cards.findIndex((card) => card === selectedCard);
//     // Create a copy of the cards array and replace the edited card
//     const updatedCards = [...cards];
//     updatedCards[index] = data;
//     setCards(updatedCards);
//     closeModal();
//   };

//   const handleEdit = (card) => {
//     setSelectedCard(card);
//     openModal();
//   };

//   const saveToApi = async (data) => {
//     try {
//       // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//       await axios.post('YOUR_API_ENDPOINT', data);
//       console.log('Data successfully saved to the API');
//     } catch (error) {
//       console.error('Error saving data to the API', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={openModal}>Add Card</button>
//       {cards.map((card, index) => (
//         <Card key={index} data={card} onEdit={handleEdit} />
//       ))}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSave={selectedCard ? editCard : addCard}
//         data={selectedCard}
//       />
//     </div>
//   );
// };

// export default Demo;
// App.js
// import React, { useState } from 'react';
// import axios from 'axios';

// const Demo = () => {
//   const [cards, setCards] = useState([]);
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({ id: null, name: '', price: '', description: '', image: '' });

//   const handleAddCard = () => {
//     setModalData({ id: null, name: '', price: '', description: '', image: '' });
//     setModalOpen(true);
//   };

//   const handleEditCard = (id) => {
//     const cardToEdit = cards.find((card) => card.id === id);
//     setModalData(cardToEdit);
//     setModalOpen(true);
//   };

//   const handleSaveCard = () => {
//     if (!modalData.name || !modalData.price || !modalData.description || !modalData.image) {
//       alert('Please fill all fields');
//       return;
//     }

//     if (modalData.id === null) {
//       // Creating a new card
//       setCards([...cards, { ...modalData, id: Date.now() }]);
//     } else {
//       // Editing an existing card
//       const updatedCards = cards.map((card) => (card.id === modalData.id ? modalData : card));
//       setCards(updatedCards);
//       console.log(updatedCards)
//     }
//     setModalOpen(false);
//   };
  
//   console.log(cards)
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setModalData({ ...modalData, image: reader.result });
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setModalData({ ...modalData, [name]: value });
//   };

//   const handleDeleteCard = (id) => {
//     const updatedCards = cards.filter((card) => card.id !== id);
//     setCards(updatedCards);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   const handleApiPost = async () => {
//     try {
//       // Assuming your API endpoint is at '/api/cards'
//       await axios.post('/api/cards', cards);
//       console.log('Data sent to API successfully!');
//     } catch (error) {
//       console.error('Error sending data to API:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleAddCard}>Add Card</button>
//       <button onClick={handleApiPost}>Send to API</button>

//       {cards.map((card) => (
//         <div key={card.id}>
//           <img src={card.image} alt={card.name} />
//           <p>Name: {card.name}</p>
//           <p>Price: {card.price}</p>
//           <p>Description: {card.description}</p>
//           <button onClick={() => handleEditCard(card.id)}>Edit</button>
//           <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
//         </div>
//       ))}

//       {isModalOpen && (
//         <div>
//           <div>
//             <label htmlFor="image">Upload Image</label>
//             <input type="file" id="image" name="image" onChange={handleFileChange} />
//           </div>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input type="text" id="name" name="name" value={modalData.name} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label htmlFor="price">Price:</label>
//             <input type="text" id="price" name="price" value={modalData.price} onChange={handleInputChange} />
//           </div>
//           <div>
//             <label htmlFor="description">Description:</label>
//             <input
//               type="text"
//               id="description"
//               name="description"
//               value={modalData.description}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button onClick={handleSaveCard}>Save</button>
//           <button onClick={handleModalClose}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Demo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const Demo = () => {
  const [cards, setCards] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState(0);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const response = await axios.get('http://localhost:5000/cards');
    setCards(response.data);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);

    // if (selectedCard === null) {
    //   await axios.post('http://localhost:5000/cards', formData);
    // } else {
    //   await axios.put(`http://localhost:5000/cards/${selectedCard.id}`, formData);
    // }
    console.log(formData)

    fetchCards();
    setModalIsOpen(false);
  };

  const handleEdit = (card) => {
    setSelectedCard(card);
    setName(card.name);
    setPrice(card.price);
    setDescription(card.description);
    setModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/cards/${id}`);
    fetchCards();
  };

  return (
    <div className="App">
      <button onClick={() => setModalIsOpen(true)}>Add Card</button>
      <div className="card-container">
        {cards.map((card) => (
          <div key={card.id} className="card">
            <img src={card.imageUrl} alt={card.name} />
            <h2>{card.name}</h2>
            <p>${card.price}</p>
            <p>{card.description}</p>
            <button onClick={() => handleEdit(card)}>Edit</button>
            <button onClick={() => handleDelete(card.id)}>Delete</button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Modal"
      >
        <h2>{selectedCard === null ? 'Add Card' : 'Edit Card'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          {image && <img src={URL.createObjectURL(image)} width={50} alt="Preview" />} {/* Display image preview */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

export default Demo;