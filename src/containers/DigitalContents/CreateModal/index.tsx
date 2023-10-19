import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Input } from '@mui/material';
import SelectInput from '../../../components/SelectInput';
import CustomModal from '../../../components/CustomModal';
import ContentInput from '../../../components/ContentInput';
import Button from '../../../components/Button';
import { formatDataSet } from '../../../helpers/utils';
import { User } from '../../../redux/users/types';
import { RESPONSE_STATUS } from '../../../helpers/consts';
import CustomSnackbar from '../../../components/shared/CustomSnackbar/CustomSnackbar';

import '../styles.css';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  open: boolean,
  content: {
    id: number,
    name: string,
    description: string,
    file: {
      url: string,
      file: {}
    },
    users: [],
  },
  saveStatus: string,
  saveError: string,
  usersList: Array<User>,
};

type DispatchProps = {
  onClose: () => void;
  saveContentRequest: Function,
  clearCreateStatus: Function,
  reloadContents: Function,
};

const CreateModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  open,
  onClose,
  content,
  saveContentRequest,
  saveStatus,
  saveError,
  usersList,
  clearCreateStatus,
  reloadContents,
}) => {
  const [editContent, setEditContent] = useState({
    id: 0,
    name: '',
    description: '',
    users: [],
    file: {
      url: '',
      file: null,
    },
  });

  useEffect(() => {
    setEditContent({
      ...editContent,
      id: content.id,
      name: content.name,
      description: content.description,
      users: formatDataSet(content.users, ['name']),
    });
  }, [content]);

  const handleClose = () => {
    onClose();
    setEditContent({
      id: 0,
      name: '',
      description: '',
      users: [],
      file: {
        url: '',
        file: null,
      },
    });
  };

  useEffect(() => {
    if (saveStatus === RESPONSE_STATUS.SUCCESS) {
      reloadContents();
      handleClose();
    }
  }, [saveStatus]);

  const deleteFile = () => {
    setEditContent({
      ...editContent,
      file: {
        url: '',
        file: null,
      },
    });
  };

  const handleModalTitle = () => (content.id
    ? intl.messages['contents.create.title.edit']
    : intl.messages['contents.create.title.new']);

  const hasMissingFields = () => {
    const isFilled = editContent.name?.trim().length > 0
                      && editContent.description?.trim().length > 0
                      && editContent.users?.length > 0
                      && (editContent.id || editContent.file?.file);
    return (!isFilled);
  };

  return (
    <>
      <CustomModal
        title={handleModalTitle()}
        open={open}
        onClose={() => {
          handleClose();
          captureEvent(content?.id ? 'closeEdit' : 'closeCreate');
        }}
      >
        <>
          <div className="content-creation">
            <div className="content-creation-fields">
              <div className="content-creation-field">
                <p className="content-field-title">{intl.messages['contents.name']}</p>
                <div className="content-creation-input">
                  <Input
                    className="content-input"
                    onChange={event => setEditContent({ ...editContent, name: event.target.value })}
                    value={editContent.name}
                    disableUnderline
                    placeholder={`${intl.messages['contents.name.placeholder']}`}
                  />
                </div>
              </div>
              <div className="content-creation-field">
                <p className="content-field-title">{intl.messages['contents.users']}</p>
                <div className="content-creation-input">
                  <SelectInput
                    placeholder={intl.messages['contents.users.placeholder']}
                    onChange={users => setEditContent({ ...editContent, users })}
                    items={formatDataSet(usersList, ['name'])}
                    selectedItems={editContent.users}
                    isAutoComplete
                    isMulti
                  />
                </div>
              </div>
            </div>
            <div className="content-creation-fields">
              <div className="content-creation-field">
                <p className="content-field-title">{intl.messages['contents.description']}</p>
                <div className="content-creation-input">
                  <Input
                    className="group-input"
                    onChange={event => setEditContent({ ...editContent, description: event.target.value })}
                    value={editContent.description}
                    disableUnderline
                    placeholder={`${intl.messages['contents.description.placeholder']}`}
                    multiline
                    rows={4}
                  />
                </div>
              </div>
              <div className="content-creation-field">
                <p className="content-field-title">{intl.messages['contents.file']}</p>
                <div className="content-creation-input">
                  <ContentInput
                    text={intl.messages[`contents.file.${editContent.id ? 'placeholderedit' : 'placeholder'}`]}
                    content={editContent.file}
                    setContent={file => setEditContent({ ...editContent, file })}
                    deleteContent={() => deleteFile()}
                    isEdit={!!editContent.id}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="creation-footer">
            <Button
              variant="outlined"
              onClick={() => {
                handleClose();
                captureEvent(content?.id ? 'cancelEditContents' : 'cancelCreateContents');
              }}
            >
              {intl.messages['utils.cancel']}
            </Button>
            <Button
              variant="contained"
              onClick={() => saveContentRequest(editContent)}
              disabled={hasMissingFields()}
            >
              {intl.messages['utils.save']}
            </Button>
          </div>
        </>
      </CustomModal>
      {
        !!saveStatus?.length
        && (
          <CustomSnackbar
            data={{
              message: saveStatus === RESPONSE_STATUS.SUCCESS ? intl.messages['utils.success'] : saveError,
              type: saveStatus === RESPONSE_STATUS.SUCCESS ? 'success' : 'error',
              open: !!saveStatus?.length,
            }}
            handleClose={clearCreateStatus}
          />
        )
      }
    </>
  );
};

export default injectIntl(CreateModal);
