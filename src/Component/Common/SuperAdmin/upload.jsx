import React, { useState, useRef, useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faImage } from "@fortawesome/free-solid-svg-icons";
import './test.css'
// import { UserContext } from "../usecontext";

const TransImgUpload = ({UploadedImage}) => {

  // const { uploadimg,setuploadimg } = useContext(UserContext);
//   const [isDropZoneOver, setIsDropZoneOver] = useState(false);
  const [loadingTextVisible, setLoadingTextVisible] = useState(false);
  const [previewImageVisible, setPreviewImageVisible] = useState(false);
  const [uploadAreaOpen, setUploadAreaOpen] = useState(false);
  const [fileDetailsOpen, setFileDetailsOpen] = useState(false);
  const [uploadedFileOpen, setUploadedFileOpen] = useState(false);
  const [uploadedFileInfoActive, setUploadedFileInfoActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFileType, setUploadedFileType] = useState("");
  const [uploadedFileCounter, setUploadedFileCounter] = useState(0);
  

  const dropZoneRef = useRef(null);
  const fileInputRef = useRef(null);
  const previewImageRef = useRef(null);

  const imagesTypes = ["jpeg", "png", "svg", "gif"];

  const handleDragOver = (event) => {
    event.preventDefault();
    // setIsDropZoneOver(true);
  };

  const handleDragLeave = () => {
    // setIsDropZoneOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    // setIsDropZoneOver(false);

    const file = event.dataTransfer.files[0];
    uploadFile(file);
    console.log(uploadFile)
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
    const fileType = file.type;
    const fileSize = file.size;

    if (fileValidate(fileType, fileSize)) {
      dropZoneRef.current.classList.add("drop-zoon--Uploaded");
      setLoadingTextVisible(true);
      setPreviewImageVisible(false);
      setUploadedFileOpen(false);
      setUploadedFileInfoActive(false);

      const fileReader = new FileReader();

      fileReader.onloadend = function () {
        setTimeout(() => {
          setUploadAreaOpen(true);
          setLoadingTextVisible(false);
          setPreviewImageVisible(true);
          setFileDetailsOpen(true);
          setUploadedFileOpen(true);
          setUploadedFileInfoActive(true);
        }, 500);
        console.log("Uploaded Image:", fileReader.result);

        const UploadedImage = fileReader.result
        // setuploadimg(UploadedImage)

        console.log(UploadedImage)
        // console.log(uploadimg)
        // console.log(setuploadimg)

        previewImageRef.current.setAttribute("src", fileReader.result);
        setUploadedFileName(file.name);

        const fileTypeForState = imagesTypes.includes(fileType)
          ? fileType
          : "image";
        setUploadedFileType(fileTypeForState);
        progressMove();
      };

      fileReader.readAsDataURL(file);
    }
  };

  const progressMove = () => {
    let counter = 0;

    setTimeout(() => {
      const counterIncrease = setInterval(() => {
        if (counter === 100) {
          clearInterval(counterIncrease);
        } else {
          counter += 10;
          setUploadedFileCounter(counter);
        }
      }, 100);
    }, 600);
  };

  const fileValidate = (fileType, fileSize) => {
    const isImage = imagesTypes.filter(
      (type) => fileType.indexOf(`image/${type}`) !== -1
    );

    if (isImage.length !== 0) {
      if (fileSize <= 2000000) {
        return true;
      } else {
        alert("Please Your File Should be 2 Megabytes or Less");
        return false;
      }
    } else {
      alert("Please make sure to upload An Image File Type");
      return false;
    }
  };

  return (
    <>
    <div
      id="uploadArea"
      className={`upload-area ${uploadAreaOpen ? "upload-area--open d-flex" : ""}`}
    >
      <div
        className="upload-area__drop-zoon drop-zoon w-50"
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <span className="drop-zoon__icon">
          {/* <FontAwesomeIcon icon={faImage} /> */}
        </span>
        <p className="drop-zoon__paragraph">
          Drop Here
        </p>
        <span
          id="loadingText"
          className="drop-zoon__loading-text"
          style={{ display: loadingTextVisible ? "block" : "none" }}
        >
          Please Wait
        </span>
        <img
          src=""
          alt="loading"
          id="previewImage"
          className="drop-zoon__preview-image"
          ref={previewImageRef}
          style={{ display: previewImageVisible ? "block" : "none" }}
          draggable="false"
        />
        <input
          type="file"
          id="fileInput"
          className="drop-zoon__file-input"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>

      <div
        id="fileDetails"
        className={`upload-area__file-details file-details ${
          fileDetailsOpen ? "file-details--open w-50" : ""
        }`}
      >
        <h5 className="mx-3">Uploaded File</h5>

        <div
          id="uploadedFile"
          className={`uploaded-file ${
            uploadedFileOpen ? "uploaded-file--open" : ""
          }`}
        >
          <div className="uploaded-file__icon-container">
            <i className="bx bxs-file-blank uploaded-file__icon"></i>
            <span className="uploaded-file__icon-text">{uploadedFileType}</span>
          </div>

          <div
            id="uploadedFileInfo"
            className={`uploaded-file__info ${
              uploadedFileInfoActive ? "uploaded-file__info--active" : ""
            }`}
          >
            <span className="uploaded-file__name">{uploadedFileName}</span>
            <span className="uploaded-file__counter">{`${uploadedFileCounter}%`}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TransImgUpload;
