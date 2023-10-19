import React, { useRef, useState } from 'react';

import {
  Box,
  GridList,
  GridListTile,
  GridListTileBar,
} from '@material-ui/core/';

import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import { TImage } from '../../types/reminder';
import CameraIcon from '../shared/Icons/CameraIcon';
import { SInputImages, useStyles } from './styles';
import { captureEvent } from '../../analytics';

type Props = {
  isMultiple?: boolean;
  setImage: Function;
  deleteImage: Function;
  images: Array<TImage>;
  reminderIsAccomplished: boolean;
};

const InputImage: React.FC<Props> = ({
  isMultiple,
  setImage,
  deleteImage,
  images,
  reminderIsAccomplished,
}) => {
  const [imageSelected, setImageSelected] = useState<string>();
  const inputImage = useRef<HTMLInputElement>();
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = url => {
    setImageSelected(url);
    setOpen(true);
    captureEvent('openImagePreview');
  };

  const handleImage = (e: any) => {
    const url = (file: File) => URL.createObjectURL(file);

    const paths = Array.from(e.target.files).map((imageFile: any) => ({ file: imageFile, name: 'original', url: url(imageFile) }));
    if (paths.length > 0) {
      captureEvent('addNewImage');
      setImage(paths);
    }
  };

  return (
    <>
      <>
        <Box
          mt={4}
          mb={2}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          overflow="hidden"
          width="100%"
        >
          <GridList className={classes.gridList} cols={2.5}>
            {(!reminderIsAccomplished && (isMultiple || (!isMultiple && images.length === 0))) && (
            <Box
              className={classes.containerUploadImage}
              onClick={() => { if (inputImage.current) inputImage.current.click(); }}
            >
              <Box className={classes.uploadImage}>
                <CameraIcon width={37.5} height={37.5} />
              </Box>
            </Box>
            )}

            {images.map(image => (
              <GridListTile key={image.url}>
                <img src={image.url} alt={image.name} />
                <GridListTileBar
                  title=""
                  actionIcon={(
                    <>
                      <IconButton
                        style={{ color: 'white' }}
                        aria-label="view"
                        onClick={() => handleOpen(image.url)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      {!reminderIsAccomplished && (
                      <IconButton
                        style={{ color: 'white' }}
                        aria-label="delete"
                        onClick={() => {
                          deleteImage([image.url]);
                          captureEvent('deleteImage');
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      )}
                    </>
                    )}
                />
              </GridListTile>
            ))}
          </GridList>
        </Box>
      </>

      {isMultiple ? (
        <SInputImages
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImage}
          ref={inputImage}
          multiple
        />
      ) : (
        <SInputImages
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImage}
          ref={inputImage}
        />
      )}

      <Modal
        open={open}
        onClose={() => { setOpen(false); }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
      >
        <div className={classes.paper}>
          <img
            src={imageSelected}
            style={{
              width: '100%',
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default InputImage;
