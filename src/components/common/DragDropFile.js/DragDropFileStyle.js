import styled from "styled-components";
import theme from "../../../theme";

export const FormContainer = styled.form`
    max-width: 100%;
    text-align: center;
    background-color:white ;
    margin-top:20px ;
`

export const FileInput = styled.input`
    display:none ;
`

export const DragDopLabel = styled.label`
    padding:20px 10px 10px 10px;
    width:100% ;
    border-width: 3px;
    border-style: dashed;
    border-color: ${theme.colors.secondary.mediumGrey};
`