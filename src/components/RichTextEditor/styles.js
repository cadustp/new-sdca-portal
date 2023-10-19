import styled from 'styled-components';

import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Editor } from 'react-draft-wysiwyg';

export const EditorContainer = styled.div`
  padding: 16px 14px;
  border: 1px solid ${({ theme }) => theme.light.gray.border};
  border-radius: 5px;
  margin-bottom: 16px;

  .rdw-option-wrapper {
    &:hover {
      box-shadow: none;
    
    }

    &:first-child {
      margin-left: 0px;
    }
  }
  
  .rdw-option-active {
    border-color:${({ theme }) => theme.light.primaryDark};
  }
`;

export const StyledEditor = styled(Editor).attrs({
  wrapperStyle: {
    width: '100%',
  },
  toolbarStyle: {
    border: 'none',
    padding: 0,
  },
  editorStyle: {
    fontSize: 14,
  },
})``;
