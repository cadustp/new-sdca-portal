import styled from "styled-components"
import {Paper, Container} from "@mui/material";

const PaperContainer = styled(Paper)`
  flex-shrink: 0;
  min-width: 550px;
  width: 40%;
`
const StyledContainer = styled(Container)`
  display: flex;
  flexDirection: column;
`

const HeaderContainer = styled.div`
  height: 30px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const CloseBarContainer = styled.div`
  width: 100%;
`

const CloseBarItem = styled.div`
  float: right;
  cursor: pointer;
`

export {
  PaperContainer,
  StyledContainer,
  HeaderContainer,
  CloseBarContainer,
  CloseBarItem
}