import styled from "styled-components";

const RemoveBtn = styled.div`
  cursor: pointer;
`

const ConditionalCardHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const InputContainer = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`

const BottonButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const AddContainer = styled.div`
  display: flex;
  height: 55px;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const TitleText = styled.p`
  font-weight: 600;
  margin-bottom: 10px;
`

const ConditionalCard = styled.div`
  flex-grow: 1
  border-color: lightgray;
  border-style: solid;
  border-radius: 9px;
  margin-top: 20px;
  border-width: 1px;
  padding: 10px;
`

const AddBtn = styled.div`
  cursor: pointer;
`

const ConditionContainer = styled.div`
  margin-bottom: 20px;
`

export {
    InputContainer,
    ConditionalCardHeaderContainer,
    RemoveBtn,
    AddContainer,
    TitleText,
    ConditionalCard,
    AddBtn,
    BottonButtonsContainer,
    ConditionContainer
}