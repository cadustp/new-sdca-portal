import React, { useRef } from 'react';

import {
  PictureAsPdf,
  Delete,
} from '@material-ui/icons';

import {
  Button,
  IconButton,
} from '@material-ui/core/';

import { SFileInput, InputBox } from './styles';
import { captureEvent } from '../../analytics';

type Props = {
  setContent: Function;
  deleteContent: Function;
  content: {
    url: string,
    file: any
  };
  text: string;
  isEdit: boolean;
};

const ContentInput: React.FC<Props> = ({
  setContent,
  deleteContent,
  content,
  text,
  isEdit,
}) => {
  const fileInput = useRef<HTMLInputElement>();

  const handleInput = (e: any) => {
    const url = (file: File) => URL.createObjectURL(file);

    const path = Array.from(e.target.files).map((file: any) => ({ file, url: url(file) }))?.[0];
    if (path) {
      setContent(path);
      captureEvent('setContentFile');
    }
  };

  const onInputClick = () => {
    if (isEdit) return;
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const fileNameWithLimit = () => {
    const stringLimit = 15;
    return content?.file?.name.substring(0, stringLimit) ?? text;
  };

  const handleDeleteContent = () => {
    if (fileInput.current) {
      fileInput.current.value = '';
    }
    deleteContent();
    captureEvent('deleteContentFile');
  };

  return (
    <InputBox>
      <Button
        onClick={() => onInputClick()}
        aria-label="Attach"
        style={{ margin: '2px', color: 'grey' }}
      >
        <PictureAsPdf width={10} height={10} style={{ marginRight: '2px' }} />
        { fileNameWithLimit() }
      </Button>
      {content?.url && (
      <div>
        <IconButton
          size="small"
          onClick={handleDeleteContent}
        >
          <Delete />
        </IconButton>
      </div>
)}
      <SFileInput
        type="file"
        accept="application/pdf"
        onChange={handleInput}
        ref={fileInput}
      />
    </InputBox>
  );
};

export default ContentInput;
