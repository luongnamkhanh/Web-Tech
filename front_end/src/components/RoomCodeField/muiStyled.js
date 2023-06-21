import styled from '@emotion/styled';
import {
  Button, TextField
} from '@mui/material';

export const StyledButton = styled(Button)`
  background-color: var(--main-dark-green);
  &:hover:{
    background-color: var(--button-hover-gray);
  }
  width: 450px;
  height: 50px;
  color: white;
  border-radius: 5px;
  margin: 10px
`;

export const StyledTextField = styled(TextField)`
  background-color: var(--input-field);
  .MuiInputBase-input {
    color: white;
  }
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: green;
  }
  .MuiFormLabel-root {
    color: green;
  }
  width: 450px;
`