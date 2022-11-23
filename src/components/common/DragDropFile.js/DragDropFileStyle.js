import styled from "styled-components";

export const FormContainer = styled.form`
  max-width: 100%;
  text-align: center;
  background-color: ${(props) => props.theme.background.dark4};
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
  border-color: ${(props) => props.theme.background.contrastText};
`;

export const CloudIconContainer = styled.div`
  position: relative;
  width: max-content;
  margin: 0 auto;
`;
