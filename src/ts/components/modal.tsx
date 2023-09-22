import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MaterialForm from "./MaterialForm";
import { Button } from "@mui/material";
import DisplayData from "./DisplayData";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "src/redux/store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

interface Props {
  onOpen?: () => void;
  onClose?: () => void;
  open?: boolean;
  circleID: string;
}

export default function BasicModal(props: Props) {
  const title = useSelector((state: RootState) => state.data.title);
  const description = useSelector((state: RootState) => state.data.description);
  const file = useSelector((state: RootState) => state.data.file);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ marginBottom: "5px" }}
          >
            Edit sphere asset ({props.circleID})
          </Typography>
          {title ? (
            <DisplayData
              title={title}
              description={description}
              image={file}
              id={props.circleID}
            />
          ) : (
            <MaterialForm
              onCloseModal={props.onClose}
              circleID={props.circleID}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
