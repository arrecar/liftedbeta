import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ variant = "info", children}) => {

  return (
      <Alert Alert key = {variant} variant = {variant} style = {{fontsize: 20}}><strong>{children}</strong></Alert>
  );
};

export default ErrorMessage;
