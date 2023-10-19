import styled from 'styled-components';

export const ListContainer = styled.div`
  flex: 1;
  max-width: 400px;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 5px solid ${props => props.color};
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(37, 38, 94, 0.1);
    border-radius: 0 0 4.5px 4.5px;
    min-width: 224px;
    margin: 0 8px 16px;

    h2 {
      font-weight: bold;
      font-size: 16px;
      padding: 16px 10px;
    }
  }
  ul {
    margin-top: 30px;
  }
`;

export const TaskItem = styled.div`
  border-radius: 5px;
  background-color: ${props => (props.isDraggingOver ? '#EFEFEF' : '#FAFAFA')};
`;

export const List = styled.div`
  max-height: 90vh;
  display: flex;
  overflow: auto;
  padding: 0px 8px;

  & > :first-child {
    min-height: 128px;
    width: 100%;
  }
`;
