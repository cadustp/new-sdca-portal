import React from 'react';
import { EditorState } from 'draft-js';

import { EditorContainer, StyledEditor } from './styles';

type Props = {
  placeholder?: string;
  editorState: ReturnType<typeof EditorState.createEmpty>;
  setEditorState: (
    editorState: ReturnType<typeof EditorState.createEmpty>,
  ) => void;
  onBlur: () => void;
};

function RichTextEditor({
  editorState,
  setEditorState,
  placeholder,
  onBlur,
}: Props): JSX.Element {
  return (
    <EditorContainer onBlur={() => onBlur()}>
      <StyledEditor
        editorState={editorState}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        onEditorStateChange={setEditorState}
        placeholder={placeholder}
        toolbar={{
          options: ['inline', 'emoji', 'list'],
          inline: {
            options: ['bold', 'underline', 'italic'],
            bold: { className: undefined },
          },
          list: {
            options: ['ordered', 'unordered'],
          },
        }}
      />
    </EditorContainer>
  );
}

RichTextEditor.defaultProps = {
  editorState: EditorState.createEmpty(),
  placeholder: '',
} as Props;

export default RichTextEditor;
