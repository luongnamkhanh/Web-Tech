import styled from '@emotion/styled';
import {
  Button
} from '@mui/material';

export const StyledButton = styled(Button)`
  background-color: var(--button-gray);
  &:hover:{
    background-color: var(--button-hover-gray);
  }
  width: 450px;
  height: 70px;
  color: white;
  border-radius: 5px;
  margin: 10px
`;
