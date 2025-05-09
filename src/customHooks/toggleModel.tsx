import React, { useState } from 'react';

const useToggleModel = (initialValues: boolean) => {
  const [open, setOpen] = useState<boolean>(initialValues);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggle = () => {
    setOpen(!open);
  };

  return { open, handleOpen, handleClose, toggle };
};

export default useToggleModel;
