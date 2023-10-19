import React, { useRef } from 'react';

import {
  Photo,
  Visibility,
  Delete,
} from '@material-ui/icons';

import {
  Button,
  IconButton,
} from '@material-ui/core/';

import { SFileInput, InputBox } from './styles';
import { captureEvent } from '../../analytics';

type Props = {
  setLogo: Function;
  deleteLogo: Function;
  openLogoModal: Function;
  logo: {
    url: string,
    file: any
  };
  text: string;
};

const FileInput: React.FC<Props> = ({
  setLogo,
  deleteLogo,
  openLogoModal,
  logo,
  text,
}) => {
  const fileInput = useRef<HTMLInputElement>();

  const handleInput = (e: any) => {
    const url = (file: File) => URL.createObjectURL(file);

    const paths = Array.from(e.target.files).map((file: any) => ({ file, url: url(file) }));
    if (paths.length > 0) {
      captureEvent('setCompanyLogo');
      setLogo(paths[0]);
    }
  };

  const onInputClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  return (
    <InputBox>
      <Button
        onClick={() => onInputClick()}
        aria-label="Attach"
        style={{ margin: '2px', color: 'grey' }}
      >
        <Photo width={10} height={10} />
        { logo?.file?.name.substring(0, 15) ?? text }
      </Button>
      {logo?.url && (
      <div>
        <IconButton
          size="small"
          onClick={() => {
            openLogoModal();
            captureEvent('openLogoPreview');
          }}
        >
          <Visibility />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            deleteLogo();
            captureEvent('deleteLogoFile');
          }}
        >
          <Delete />
        </IconButton>
      </div>
)}
      <SFileInput
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleInput}
        ref={fileInput}
      />
    </InputBox>
  );
};

export default FileInput;
