import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Circle from "../controller/circle-controller";

type Props = {
  circles: Circle[];
};

// fix the empty array bug

const DropDown = (props: Props) => {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Circles</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={""}
          label='Age'
          onChange={() => {}}
        >
          {props.circles.map((data) => {
            <MenuItem value={data.id}>{data.id}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropDown;
