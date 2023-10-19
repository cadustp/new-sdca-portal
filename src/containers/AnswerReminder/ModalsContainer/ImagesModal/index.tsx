import React from 'react';
import { Box } from "@mui/material";
import CustomModal from '../../../../components/CustomModal';
import { Button } from './styles'
import InputImage from '../../../../components/InputImage/index'
import { TQuestion, TImage } from '../../../../types/reminder';

type Props = {
    visible: boolean;
    setVisible: Function | any;
    title: string;
    exitLabel: string;
    images: Array<TImage>;
    handleUpdateReminderAnswers: Function;
    answerQuestion: TQuestion;
    reminderIsAccomplished: boolean;
};

const ImagesModal: React.FC<Props> = ({
    visible,
    setVisible,
    title,
    exitLabel,
    images,
    handleUpdateReminderAnswers,
    answerQuestion,
    reminderIsAccomplished,
}) => {
    const addImage = (image: TImage) => {
        images.unshift(image);
        handleUpdateReminderAnswers({ answerQuestion, images: images.flat(), answerType: 'image' })
    };
    
    const removeImage = (imageUrl: Array<string>) => {
      images = images.filter((image) => !imageUrl.includes(image.url));
      handleUpdateReminderAnswers({ answerQuestion, images: images, answerType: 'image' })
    };
    return(
        <CustomModal
            open={visible}
            title={title}
            onClose={setVisible}
            loading={false}
        >
            <Box width="100%" pl={5} pr={5}>
                <InputImage reminderIsAccomplished={reminderIsAccomplished} images={images} isMultiple={true} deleteImage={removeImage} setImage={addImage} />
                <Button onClick={setVisible} isSave={false}>
                    {exitLabel}
                </Button>
            </Box>
        </CustomModal>
    );
}

export default ImagesModal;