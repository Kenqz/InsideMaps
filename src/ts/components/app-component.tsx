import React, { ReactElement, useState } from "react";

import PreviewComponent from "./preview-component";
import Circle from "../controller/circle-controller";

import "src/style/app-style.scss";
import BasicModal from "./modal";
import DropDown from "./DropDown";

const AppComponent = (): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCircleId, setSelectedCircleId] = useState<string | null>(null);
  const [circleData, setCircleData] = useState<Circle[]>([]);

  const openModalHandler = () => {
    setOpen(true);
  };

  const closeModalHandler = () => {
    setOpen(false);
  };

  const handleCircleClick = (circleId: string) => {
    setSelectedCircleId(circleId);
    openModalHandler();
  };
  const handleCircleData = (circles: Circle[]) => {
    setCircleData(circles);
  };

  return (
    <>
      <DropDown circles={circleData} />
      <PreviewComponent
        onOpen={openModalHandler}
        onCircleClick={handleCircleClick}
        onCircleData={handleCircleData}
      />
      <BasicModal
        onOpen={openModalHandler}
        onClose={closeModalHandler}
        open={open}
        circleID={selectedCircleId}
      />
    </>
  );
};

export default AppComponent;
