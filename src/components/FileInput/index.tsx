import React, { useRef } from 'react';
import { AttachFile } from '@mui/icons-material/';
import { Chip, Box, Button } from '@mui/material/';
import { light } from '../../styles/palette';
import { TAttachment } from '../../redux/forms/types';
import { SFileInput } from './styles';

type Props = {
  setAttachments: Function;
  deleteAttachment: Function;
  attachments: Array<TAttachment>;
  limit: number;
  text: string;
};

const FileInput: React.FC<Props> = ({
  setAttachments,
  deleteAttachment,
  attachments,
  limit,
  text,
}) => {
  const fileInput = useRef<HTMLInputElement>();

  const handleInput = (e: any) => {
    const url = (file: File) => URL.createObjectURL(file);

    const paths = Array.from(e.target.files).map((file: any) => ({ file, url: url(file) }));
    if (paths.length > 0) {
      setAttachments(paths);
    }
  };

  const goToFile = url => window.open(url, '_blank');

  const onInputClick = () => {
    if (fileInput.current) fileInput.current.click();
  };

  return (
    <Box style={{ display: 'flex' }}>
      {attachments.length < limit && (
        <Button
          onClick={() => onInputClick()}
          aria-label='Attach'
          style={{ marginBottom: '10px' }}
        >
          <AttachFile width={10} height={10} />
          {text}
        </Button>
      )}
      <Box>
        {attachments.map(attachment => (
          <Chip
            style={{
              marginInline: '10px',
              marginTop: attachments.length <= 1 ? '0' : '10px',
              backgroundColor: light.primaryTranslucent,
              color: light.primary,
            }}
            key={attachment.url}
            label={attachment.file.name.substring(0, 15)}
            onClick={() => goToFile(attachment.url)}
            onDelete={() => deleteAttachment([attachment.url])}
          />
        ))}
      </Box>
      <SFileInput
        type='file'
        accept='application/pdf, .pdf'
        onChange={handleInput}
        ref={fileInput}
      />
    </Box>
  );
};

export default FileInput;
