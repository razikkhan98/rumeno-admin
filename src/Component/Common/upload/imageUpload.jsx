// import { faImage, faRemove, faUpload } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useState } from 'react';

// const ImageUpload = () => {
//   const [UploadImg, setUploadImg] = useState([]);

//   const uploadImages = async () => {
//     const uploadedUrls = [];
//     const apiKey = "273ab24b40be59dc593d96c50976ae42";

//     for (let i = 0; i < selectedFile?.length; i++) {
//       const formData = new FormData();
//       formData.append("image", selectedFile[i]);

//       try {
//         const uploadImgResponse = await axios.post(
//           `https://api.imgbb.com/1/upload?key=${apiKey}`,
//           formData
//         );

//         if (uploadImgResponse.data.status === 200) {
//           const imageUrl = uploadImgResponse.data.data.url;
//           uploadedUrls.push(imageUrl);
//         } else {
//           console.log(`Image ${i + 1} failed to upload: ${uploadImgResponse.data.error.message}`);
//           break;
//         }
//       } catch (error) {
//         console.log(`Error uploading image ${i + 1}: `, error);
//         break;
//       }
//     }

//     console.log('uploadedUrls: ', uploadedUrls);
//     localStorage.setItem('storeUrl', JSON.stringify(uploadedUrls));
//     return uploadedUrls;
//   };


//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => URL.createObjectURL(file));
//     setUploadImg((prevImages) => prevImages.concat(newImages));
//     console.log('Images ',newImages,UploadImg);
//   };

//   const handleImageRemove = (index) => {
//     setUploadImg(UploadImg.filter((_, i) => i !== index));
//   };

//   const handleImageReplace = (e, index) => {
//     const file = e.target.files[0];
//     if (file) {
//       const newImage = URL.createObjectURL(file);
//       setUploadImg((prevImages) =>
//         prevImages.map((img, i) => (i === index ? newImage : img))
//       );
//       console.log('images: ', UploadImg);
//     }
//   };

//   return (
//     <div>
//       <h2>Upload</h2>
//       <label htmlFor="file-input-main" className="file-upload-label d-flex align-items-center mx-2 ">
//                 <FontAwesomeIcon className="border p-4 h3" icon={faImage} />
//               </label>
//       <input className='check d-none' id='file-input-main' type="file" multiple onChange={handleImageChange} />
//       <div className='d-flex mt-3'>
//         {UploadImg.map((image, index) => (
//           <div key={index} className='m-2'>
//             <img
//               src={image}
//               alt={`uploaded-${index}`}
//               className=''
//               width={100}
//               height={100}
//             />
//             <div className="d-flex justify-content-end align-items-center">
//               <FontAwesomeIcon onClick={() => handleImageRemove(index)} className="mx-2 border p-1" icon={faRemove} />
//               <label htmlFor={`file-input-${index}`} className="file-upload-label d-flex align-items-center mx-2 ">
//                 <FontAwesomeIcon className="border p-1" icon={faUpload} />
//               </label>
//               <input
//               className='d-none'
//                 type="file"
//                 id={`file-input-${index}`}
//                 onChange={(e) => handleImageReplace(e, index)}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
import { faImage, faRemove, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
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
    const files = Array.from(e.target.files);
    const newUploadedUrls = await uploadImagesToApi(files);

    setUploadedUrls((prevUrls) => prevUrls.concat(newUploadedUrls));
    localStorage.setItem('storeUrl', JSON.stringify(newUploadedUrls));
  };

  const handleImgRemove = (index) => {
    const newUploadedUrls = uploadedUrls.filter((_, i) => i !== index);
    setUploadedUrls(newUploadedUrls);
    localStorage.setItem('storeUrl', JSON.stringify(newUploadedUrls));
  };

  const handleImgUpdate = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newUploadedUrls = await uploadImagesToApi([file]);

      if (newUploadedUrls.length > 0) {
        const updatedUrls = uploadedUrls.map((img, i) =>
          i === index ? newUploadedUrls[0] : img
        );
        setUploadedUrls(updatedUrls);
        localStorage.setItem('storeUrl', JSON.stringify(updatedUrls));
      }
    }
  };

  return (
    <div>
      <h2>Upload</h2>
      <label htmlFor="file-input-main" className="file-upload-label d-flex align-items-center mx-2 ">
        <FontAwesomeIcon className="border p-4 h3" icon={faImage} />
      </label>
      <input className='check d-none' id='file-input-main' type="file" multiple onChange={handleImgUpload} />
      
      <div className='d-flex mt-3'>
        {uploadedUrls.map((image, index) => (
          <div key={index} className='m-2'>
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
  );
};

export default ImageUpload;
