// Select Component Wrapper
import React from 'react';
import { Select as AntSelect } from 'antd';

const Select = ({ 
  children,
  options = [],
  value,
  defaultValue,
  onChange,
  onSelect,
  onDeselect,
  onClear,
  placeholder = 'Please select',
  disabled = false,
  loading = false,
  allowClear = false,
  showSearch = false,
  filterOption = true,
  mode = undefined,
  size = 'middle',
  className = '',
  style = {},
  dropdownStyle = {},
  ...props 
}) => {
  return (
    <AntSelect
      options={options}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onSelect={onSelect}
      onDeselect={onDeselect}
      onClear={onClear}
      placeholder={placeholder}
      disabled={disabled}
      loading={loading}
      allowClear={allowClear}
      showSearch={showSearch}
      filterOption={filterOption}
      mode={mode}
      size={size}
      className={`krishi-select ${className}`}
      style={style}
      dropdownStyle={dropdownStyle}
      {...props}
    >
      {children}
    </AntSelect>
  );
};

// Select.Option wrapper
Select.Option = AntSelect.Option;

// Select.OptGroup wrapper
Select.OptGroup = AntSelect.OptGroup;

export default Select;
