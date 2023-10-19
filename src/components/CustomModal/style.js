import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/Icon';
import styled from 'styled-components';

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0 transparent solid;
  margin-right: -5px;
  z-index: 888;
`;

export const StyledContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 40%;
  max-width: 40%;
  width: max-content;
  background-color: #ffffff;
  padding: 24px 24px 16px 24px;
  outline: none;
  border-radius: 5px;
  max-height: calc(100vh - 120px);
  overflow-y: ${props => (props.overflowVisible ? 'visible' : 'auto')};

  @media screen and (max-width: 1400px) {
    max-width: 70%;
  }

  @media screen and (max-width: 1961px) {
    min-width: 70%;
  }
`;

export const StyledTitleDiv = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const StyledTitle = styled.h3`
  color: ${({ theme }) => theme.text.dark};
  font-weight: 700;
  ${({ centerTitle }) => centerTitle && 'margin: 0 auto;'}
`;

export const StyledIconButton = styled(IconButton)`
  font-size: 16px;
  position: absolute;
  right: 0;

  &:hover {
    cursor: pointer;
  }
`;

export const StyledChildrenDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
