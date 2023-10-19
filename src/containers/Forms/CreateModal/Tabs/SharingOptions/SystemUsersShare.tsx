import React from 'react';
import { injectIntl } from 'react-intl';
import { components } from 'react-select';
import { IconButton, Avatar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import '../styles.css';
import SelectInput from '../../../../../components/v2/SelectInput';
import { obtainNameInitialLetters } from '../../../../../helpers/utils';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  form: any,
  availableUsers: Array<any>,
};

type DispatchProps = {
  setFormSettings: Function,
};

const SystemUsersShare: React.FC<Props & DispatchProps & StateProps> = ({
  intl,
  form,
  setFormSettings,
  availableUsers,
}) => {
  const handleUserChanges = users => {
    setFormSettings({ ...form, sharedUsers: mapUsersToSave(users) });
  };

  const handleRemove = selectedUser => {
    setFormSettings({ ...form, sharedUsers: form.sharedUsers.filter(user => user.id !== selectedUser.id) });
  };

  const mapUsersToDisplay = items => items.map(item => ({
    name: item.name,
    value: item.id,
    email: item.email,
  }));

  const mapUsersToSave = items => items.map(item => ({
    id: item.value,
    name: item.name,
    email: item.email,
  }));

  const UserItem = props => {
    const { user, showCloseButton, customKey } = props;

    return (
      <div key={customKey} className="cf-user-list-item-container">
        <div className="cf-user-list-item-info">
          <Avatar>{obtainNameInitialLetters(user.name)}</Avatar>
          <div className="cf-user-list-item-label">
            <strong className="cf-user-list-item-title">{user.name}</strong>
            <span className="cf-user-list-item-subtitle">{user.email}</span>
          </div>
        </div>
        {showCloseButton
        && (
        <div style={{ alignSelf: 'center' }}>
          <IconButton
            onClick={() => handleRemove(user)}
          >
            <Close fontSize="small" />
          </IconButton>
        </div>
        )}
      </div>
    );
  };

  type OptionValue = {
    data: {
      name: string;
      value: number;
      email: string;
    };
  };

  const CustomOption = (props: React.ComponentProps<typeof components.Option> & OptionValue) => (
    <components.Option {...props}>
      <UserItem user={props.data} customKey={`${props.data.id}-option`} />
    </components.Option>
  );

  const customFilter = (option, searchText) => option.data.name.toLowerCase().includes(searchText.toLowerCase())
    || option.data.email.toLowerCase().includes(searchText.toLowerCase());

  return (
    <>
      <div className="cf-field-input">
        <SelectInput
          placeholder={intl.messages['forms.edit.sharing.select_placeholder']}
          selectedItems={mapUsersToDisplay(form.sharedUsers)}
          items={mapUsersToDisplay(availableUsers)}
          setSelectedItems={handleUserChanges}
          controlShouldRenderValue={false}
          isMulti
          lineHeight={65}
          autoCompleteCustomComponents={{ Option: CustomOption }}
          customFilterFunction={customFilter}
        />
      </div>
      <div className="user-list">
        {form.sharedUsers.map(user => (
          <UserItem user={user} customKey={`${user.value}-selected`} showCloseButton />
        ))}
      </div>
    </>
  );
};

export default injectIntl(SystemUsersShare);
