import { Typography, Button } from "@mui/material";
import React from "react";
import "../../style/form-style.scss";

type Props = {
  id: string;
  title: string;
  description: string;
  image: string;
};

// implement edit and delete component
const DisplayData = (props: Props) => {
  return (
    <div className='form'>
      <Typography>Title: {props.title}</Typography>
      <Typography>Description: {props.description}</Typography>
      <Typography>Circle ID: {props.id} </Typography>
      <img src={props.image} width='300' height='300' />
      <div className='button-container'>
        <Button variant='outlined'>Edit the circle</Button>
        <Button variant='outlined'>Delete the circle</Button>
      </div>
    </div>
  );
};

export default DisplayData;
