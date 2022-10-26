import styled from "styled-components";



export const FormContainer = styled.form`
  max-width: 100%;
  text-align: center;
  background-color: ${(props) => props.theme.colors.primary.contrastText};
  margin-top: 20px;
`;

export const FileInput = styled.input`
  display: none;
`;

export const DragDopLabel = styled.label`
  padding: 20px 10px 10px 10px;
  width: 100%;
  border-width: 3px;
  border-style: dashed;
`;
