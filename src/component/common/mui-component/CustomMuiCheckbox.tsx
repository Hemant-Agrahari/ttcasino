import React from 'react';
import { Checkbox, CheckboxProps } from '@mui/material';

/**
 * This CustomMuiCheckbox is a  component around the Material-UI Checkbox component.
 * It allows for easy customization and usage of the Checkbox with any props that the
 * Checkbox component accepts.
 */

const CustomMuiCheckbox: React.FC<CheckboxProps> = (props) => {
  return <Checkbox {...props} />;
};

export default CustomMuiCheckbox;
