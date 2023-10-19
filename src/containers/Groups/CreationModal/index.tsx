import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Input } from '@mui/material';
import SelectInput from '../../../components/SelectInput';
import CustomModal from '../../../components/CustomModal';
import Button from '../../../components/Button';
import { formatDataSet } from '../../../helpers/utils';
import { Groups } from '../../../redux/groups/types';
import { RESPONSE_STATUS } from '../../../helpers/consts';

import '../styles.css';
import { captureEvent } from '../../../analytics';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  open: boolean,
  groups: {
    data: Array<Groups>,
  }
  group: {
    id: number,
    name: string,
    parent: number,
    level: number,
    children: [],
  },
  saveStatus: string,
};

type DispatchProps = {
  onClose: () => void;
  saveGroupRequest: Function,
  updateRequest: Function,
  listAllGroupsRequest: Function,
};

const CreationModal: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  open,
  onClose,
  groups,
  group,
  saveGroupRequest,
  saveStatus,
  updateRequest,
  listAllGroupsRequest,
}) => {
  const [groupName, setGroupName] = useState('');
  const [parentGroup, setParentGroup] = useState({
    key: null,
    label: '',
    value: null,
  });
  const [parentList, setParentList] = useState<any>([]);

  useEffect(() => {
    if (open) {
      listAllGroupsRequest();
    }
  }, [open]);

  const handleParentList = list => {
    if (group.id) {
      setParentList(formatDataSet(list)
        .filter(el => !group.children
          .some(c => c === el.value)));
    } else {
      setParentList(formatDataSet(groups));
    }
  };

  useEffect(() => {
    if (groups) {
      handleParentList(groups);
    }
  }, [groups]);

  useEffect(() => {
    if (group.id) {
      setGroupName(group.name);
    }
  }, [group]);

  useEffect(() => {
    if (parentList && group.id) {
      setParentGroup(
        parentList.find(parent => parent.value === group.parent),
      );
    }
  }, [parentList]);

  const handleClose = () => {
    onClose();
    setGroupName('');
    setParentGroup({
      key: null,
      label: '',
      value: null,
    });
  };

  useEffect(() => {
    if (saveStatus === RESPONSE_STATUS.SUCCESS) {
      updateRequest();
      handleClose();
    }
  }, [saveStatus]);

  const onSave = () => {
    const newGroup = {
      id: group.id ?? null,
      name: groupName.length ? groupName.trim() : group.name,
      parent_id: parentGroup ? parentGroup.value : null,
    };
    saveGroupRequest(newGroup);
  };

  const handleModalTitle = () => (group.id
    ? intl.messages['groups.create.title.edit']
    : intl.messages['groups.create.title.new']);

  const hasEmptyGroupName = () => {
    const name = groupName.trim();
    return !name.length;
  };

  return (
    <CustomModal
      title={handleModalTitle()}
      open={open}
      onClose={() => {
        handleClose();
        captureEvent(group.id ? 'closeEdit' : 'closeCreate');
      }}
    >
      <>
        <div className="creation-body">
          <div className="creation-container-fields">
            <div className="creation-field">
              <p className="creation-field-title">{intl.messages['groups.create.name']}</p>
              <div className="creation-input">
                <Input
                  className="group-input"
                  autoFocus
                  onChange={event => setGroupName(event.target.value)}
                  value={groupName}
                  disableUnderline
                  placeholder={`${intl.messages['groups.create.name.placeholder']}`}
                />
              </div>
            </div>
            <div className="creation-field">
              <p className="creation-field-title">{intl.messages['groups.create.parent']}</p>
              <div className="creation-input">
                <SelectInput
                  placeholder={intl.messages['report_side_filter.group_placeholder']}
                  onChange={selectedItem => setParentGroup(selectedItem)}
                  items={parentList}
                  selectedItems={[parentGroup]}
                  isMulti={false}
                  isAutoComplete
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
              captureEvent(group.id ? 'cancelEditGroups' : 'cancelCreateGroups');
            }}
          >
            {intl.messages['groups.create.cancel']}
          </Button>
          <Button
            variant="contained"
            onClick={onSave}
            disabled={hasEmptyGroupName()}
          >
            {intl.messages['groups.create.save']}
          </Button>
        </div>
      </>
    </CustomModal>
  );
};

export default injectIntl(CreationModal);
