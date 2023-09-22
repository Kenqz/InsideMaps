import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, TextField } from "@mui/material";
import "../../style/picture-container-style.scss";

type Props = {
  selectedFile?: File | null;
};

const PictureUploadContainer = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(true);

  const removePictureData = () => {
    setVisible(false);
    console.log(props.selectedFile);
  };

  return (
    <>
      {visible && (
        <div className='picture-container'>
          <DeleteIcon />
          <TextField value={props.selectedFile.name}></TextField>
          <Button variant='contained' onClick={removePictureData} color='error'>
            Cancel
          </Button>
        </div>
      )}
    </>
  );
};

export default PictureUploadContainer;
