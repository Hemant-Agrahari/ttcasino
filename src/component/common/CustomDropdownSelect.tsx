import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface CustomDropdownSelectProps {
  options: { name: string; value: string }[];
  subType: string | 'All';
  handleChange: (event: SelectChangeEvent) => void;
  dropdownFieldName: string;
  dropdownLabelName: string;
}

const CustomDropdownSelect: React.FC<CustomDropdownSelectProps> = ({
  options,
  subType,
  handleChange,
  dropdownFieldName,
  dropdownLabelName,
}) => {
  return (
    <>
      <label htmlFor="floatingSelect" className="label-dropdown">
        {dropdownLabelName}
      </label>
      <Select
        id="floatingSelect"
        renderValue={(selected) => {
          if (selected === '') {
            return <em>{'All'}</em>;
          }
          return selected;
        }}
        name={dropdownFieldName}
        value={subType || 'All'}
        title={subType}
        onChange={handleChange}
        className="text-capitalize text-white mui-custom-select"
        fullWidth
        MenuProps={{
          MenuListProps: {
            className: 'custom-mui-dropdown-select',
            sx: {
              '& .MuiMenuItem-root': {
                paddingTop: '4px',
                paddingBottom: '4px',
                minHeight: '32px',
                lineHeight: 1.2,
              },
            },
          },
          PaperProps: {
            sx: {
              maxHeight: {
                xs: 200,
                sm: 300,
                md: 400,
              },
              maxWidth: 100,
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#abb2b9',
              },
            },
          },
        }}
      >
        <MenuItem value="">{'All'}</MenuItem>
        {options &&
          options.length > 0 &&
          options.map((item, index: number) =>
            item.name ? (
              <MenuItem
                key={index}
                value={item.value}
                title={item.value}
                className="text-capitalize custom-dropdown-menu-items"
              >
                {item.name}
              </MenuItem>
            ) : null,
          )}
      </Select>
    </>
  );
};

export default CustomDropdownSelect;
