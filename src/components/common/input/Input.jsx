import React from 'react';

export const Input = ({ 
  type = 'text', 
  name, 
  value, 
  id, 
  disabled,
  placeholder, 
  className, 
  maxLength, 
  max, 
  min, 
  step, 
  checked, 
  pattern, 
  onChange,
  onBlur,
  onMouseUp
}) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      id={id}
      disabled={disabled}
      placeholder={placeholder}
      className={className}
      maxLength={maxLength}
      max={max}
      min={min}
      step={step}
      pattern={pattern}
      checked={checked}
      onChange={onChange}
      onBlur={onBlur}
      onMouseUp={onMouseUp}
    />
  );
};