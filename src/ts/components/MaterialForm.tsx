import React, { useRef, useState } from "react";
import { TextField, FormControl, Button, FormLabel } from "@mui/material";
import "../../style/form-style.scss";
import PictureUploadContainer from "./PictureUploadContainer";
import { useDispatch } from "react-redux";
import { CircleData, addData } from "src/redux/dataSlice";

type Props = {
  onCloseModal: () => void;
  circleID: string;
};

const MaterialForm = (props: Props) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const dispatch = useDispatch();

  const submitData = () => {
    const data: CircleData = {
      id: props.circleID,
      title: titleRef.current.value,
      description: titleRef.current.value,
      file: imageSrc,
    };
    dispatch(addData(data));
    props.onCloseModal();
    titleRef.current.value = "";
    descriptionRef.current.value = "";
  };

  const uploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      const fileSrc = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setImageSrc(fileSrc);
      console.log(fileSrc);
    }
  };

  return (
    <form className='form' onSubmit={submitData}>
      {file && <PictureUploadContainer selectedFile={file} />}
      <FormControl sx={{ width: "100%" }}>
        <FormLabel htmlFor='outlined-basic'>Title</FormLabel>
        <TextField id='title' variant='outlined' inputRef={titleRef} />
      </FormControl>
      <input
        type='file'
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <FormControl sx={{ width: "100%" }}>
        <FormLabel htmlFor='description'>Description</FormLabel>
        <TextField
          id='description'
          variant='outlined'
          inputRef={descriptionRef}
        />
      </FormControl>
      <div className='button-container'>
        <Button variant='outlined' onClick={submitData}>
          Submit
        </Button>
        <Button variant='outlined' onClick={uploadFile}>
          Add image
        </Button>
      </div>
    </form>
  );
};

export default MaterialForm;
