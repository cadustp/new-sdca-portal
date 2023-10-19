import React, { useState, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import {
  Box,
  Input,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import SelectInput from '../SelectInput';
import StepperCard from '../StepperCard';
import { formatDataSet, translateLabels } from '../../helpers/utils';
import useCurrentUser from '../../hooks/useCurrentUser';
import { TYPES_OF_USER, LANGUAGE_OPTIONS } from '../../helpers/consts';
import './styles.css';

type Props = {
  intl: {
    messages: Array<any>;
  };
  userData: {
    name: string,
    email: string,
    userType: [],
    password: string,
    passwordConfirmation: string,
    group: string,
    identifier: string,
    language: [],
    responsible: [],
    othersResponsibles: [],
    enableSendEmail: boolean,
    hasTemporaryAccess: boolean
  },
  setUserData: Function,
};

type StateProps = {
  formFormat: string,
  groupsList: [],
  adminsList: [],
  user: {
    id: number,
    name: string,
    email: string,
    register: string,
    group: number,
    responsible: number,
    language: number,
    types: Array<any>,
    othersResponsibles: Array<any>,
    enableSendEmail: boolean,
    hasTemporaryAccess: boolean
  },
};

type DispatchProps = {

};

const Field = ({
  title,
  value,
  placeholder,
  tooltip = '',
  fieldType = 'input',
  type = 'text',
  onChange,
  autoComplete = '',
  items = [],
  isMulti = false,
  isDisabled = false,
  readOnly = false,
}) => (
  <div className="user-field-container">
    <p style={{ display: 'flex', alignItems: 'center' }}>
      {title}
      {tooltip.length
        ? (
          <Tooltip
            title={tooltip}
          >
            <InfoOutlined
              style={{ marginLeft: '5px' }}
              fontSize="small"
            />

          </Tooltip>
        )
        : null }
    </p>
    <div className="user-field-input">
      {fieldType === 'select'
        ? (
          <SelectInput
            placeholder={placeholder}
            onChange={onChange}
            items={items}
            selectedItems={value}
            isMulti={isMulti}
            isDisabled={isDisabled}
            isAutoComplete
          />
        )
        : (
          <Input
            autoComplete={autoComplete}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            type={type}
            readOnly={readOnly}
            fullWidth
            disableUnderline
          />
        )}
    </div>
  </div>
);

const UserCreateStep: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  setUserData,
  userData,
  formFormat,
  groupsList,
  adminsList,
  user,
}) => {
  const [othersResponsbileList, setOthersResponsbileList] = useState(adminsList);
  const [userTypeList, setUserTypeList] = useState(TYPES_OF_USER.TYPES);
  const [showEmailSwitch, setShowEmailSwitch] = useState(false);
  const [enableOthersResponsibles, setEnableOthersResponsibles] = useState(false);
  const [_, { isSubAdmin }] = useCurrentUser();

  useEffect(() => {
    if (user.id) {
      setUserData({
        ...userData,
        id: user.id,
        name: user.name,
        email: user.email,
        identifier: user.register,
        group: groupsList ? formatDataSet(groupsList).filter(group => group.value === user.group)?.[0] : [],
        responsible: user.responsible && adminsList ? formatDataSet(adminsList, ['email']).filter(responsible => responsible.value === user.responsible)?.[0] : [],
        language: translateLabels(intl, LANGUAGE_OPTIONS.LANGUAGES).filter(language => language.value === user.language)?.[0],
        userType: user.types ? translateLabels(intl, TYPES_OF_USER.TYPES).filter(userType => user.types.some(t => t.id === userType.value && t.active)) : [],
        othersResponsibles: user.responsible && adminsList ? formatDataSet(adminsList, ['email']).filter(responsible => user.othersResponsibles.some(r => r.id === responsible.value)) : [],
        enableSendEmail: user.enableSendEmail ?? true,
        hasTemporaryAccess: user.hasTemporaryAccess,
      });
    }
  }, [user, groupsList, adminsList]);

  useEffect(() => {
    const content = formatDataSet(userData.userType);

    if (userData.responsible && formFormat === 'user') {
      setOthersResponsbileList(
        formatDataSet(adminsList, ['email'])
          .filter(el => el.value !== Object.values(userData.responsible)[0]),
      );
    };
    if (userData.userType) {
      setShowEmailSwitch(content.some(t => t.value === 4));
      setUserTypeList((content.some(e => e.value === 3 || e.value === 2)) ? TYPES_OF_USER.TYPES.filter(el => el.id === 4) : TYPES_OF_USER.TYPES);
    }
    setEnableOthersResponsibles((userData.responsible === null || userData.responsible?.length === 0) ? false : content?.some(t => t.value === 4));
  }, [userData]);

  return (
    <>
      <Box className="user-step-container">
        <StepperCard
          title={intl.messages['users.edit.step.one']}
        >
          {formFormat === 'user'
            ? (
              <>
                <Field
                  onChange={event => setUserData({ ...userData, name: event.target.value })}
                  title={intl.messages['users.edit.field.name']}
                  value={userData.name}
                  placeholder={intl.messages['users.edit.field.name.placeholder']}
                />
                <div className="row-fields">
                  <Field
                    onChange={event => setUserData({ ...userData, email: event.target.value })}
                    title={intl.messages['users.edit.field.email']}
                    value={userData.email}
                    type="email"
                    placeholder={intl.messages['users.edit.field.email.placeholder']}
                  />
                  <Field
                    onChange={selectedItem => setUserData({ ...userData, userType: selectedItem })}
                    fieldType="select"
                    isMulti
                    items={translateLabels(intl, userTypeList)}
                    title={intl.messages['users.edit.field.type']}
                    value={userData.userType}
                    placeholder={intl.messages['users.edit.field.type.placeholder']}
                  />
                </div>
                <div className="row-fields">
                  <Field
                    onChange={event => setUserData({ ...userData, password: event.target.value })}
                    title={intl.messages['users.edit.field.password']}
                    tooltip={intl.messages['users.edit.field.password.tooltip']}
                    value={userData.password}
                    type="password"
                    autoComplete="new-password"
                    placeholder={intl.messages['users.edit.field.password.placeholder']}
                  />
                  <Field
                    onChange={event => setUserData({ ...userData, passwordConfirmation: event.target.value })}
                    title={intl.messages['users.edit.field.password.confirm']}
                    value={userData.passwordConfirmation}
                    type="password"
                    autoComplete="new-password"
                    placeholder={intl.messages['users.edit.field.password.confirm.placeholder']}
                  />
                </div>
                <FormControlLabel
                  control={(
                    <Switch
                      checked={userData.hasTemporaryAccess}
                      value={userData.hasTemporaryAccess}
                      onChange={e => setUserData({ ...userData, hasTemporaryAccess: e.target.checked })}
                      color="primary"
                    />
                    )}
                  label={intl.messages['users.edit.field.has_temporary_access']}
                />
              </>
            )
            : (
              <>
                <div className="row-fields">
                  <Field
                    onChange={event => setUserData({ ...userData, name: event.target.value })}
                    title={intl.messages['users.edit.field.name']}
                    value={userData.name}
                    placeholder={intl.messages['users.edit.field.name.placeholder']}
                  />
                  <Field
                    onChange={event => setUserData({ ...userData, email: event.target.value })}
                    title={intl.messages['users.edit.field.email']}
                    value={userData.email}
                    type="email"
                    placeholder={intl.messages['users.edit.field.email.placeholder']}
                  />
                </div>
              </>
            )}
        </StepperCard>
        <StepperCard
          title={intl.messages['users.edit.step.two']}
        >
          { formFormat === 'user'
              && (
              <div className="row-fields">
                <Field
                  onChange={selectedItem => setUserData({ ...userData, responsible: selectedItem })}
                  fieldType="select"
                  title={intl.messages['users.edit.field.responsible']}
                  items={formatDataSet(adminsList, ['email']).filter(responsible => responsible.value !== user.id)}
                  tooltip={intl.messages['users.edit.field.responsible.tooltip']}
                  value={userData.responsible}
                  isDisabled={isSubAdmin}
                  placeholder={intl.messages['users.edit.field.responsible.placeholder']}
                />
                <Field
                  onChange={selectedItem => setUserData({ ...userData, othersResponsibles: selectedItem })}
                  fieldType="select"
                  isMulti
                  isDisabled={isSubAdmin || !enableOthersResponsibles}
                  title={intl.messages['users.edit.field.othersresponsible']}
                  items={formatDataSet(othersResponsbileList).filter(admin => admin.value !== user.id)}
                  tooltip={intl.messages['users.edit.field.othersresponsible.tooltip']}
                  value={enableOthersResponsibles ? userData.othersResponsibles : null}
                  placeholder={intl.messages['users.edit.field.othersresponsible.placeholder']}
                />
              </div>
              )}
          <div className="row-fields">
            <Field
              onChange={selectedItem => setUserData({ ...userData, group: selectedItem })}
              fieldType="select"
              title={intl.messages['users.edit.field.group']}
              items={formatDataSet(groupsList)}
              value={userData.group}
              placeholder={intl.messages['users.edit.field.group.placeholder']}
            />
            <Field
              onChange={selectedItem => setUserData({ ...userData, language: selectedItem })}
              fieldType="select"
              title={intl.messages['users.edit.field.language']}
              items={translateLabels(intl, LANGUAGE_OPTIONS.LANGUAGES)}
              value={userData.language}
              placeholder={intl.messages['users.edit.field.language.placeholder']}
            />
          </div>
          <div className="row-fields">
            <Field
              onChange={event => setUserData({ ...userData, identifier: event.target.value })}
              title={intl.messages['users.edit.field.identifier']}
              value={userData.identifier}
              placeholder={intl.messages['users.edit.field.identifier.placeholder']}
            />
            { (formFormat !== 'user' || showEmailSwitch)
              && (
                <FormControlLabel
                  control={(
                    <Switch
                      checked={userData.enableSendEmail}
                      value={userData.enableSendEmail}
                      onChange={e => setUserData({ ...userData, enableSendEmail: e.target.checked })}
                      color="primary"
                    />
                    )}
                  label={intl.messages['users.edit.field.send.email']}
                />
              )}
          </div>
        </StepperCard>
      </Box>
    </>
  );
};

export default injectIntl(UserCreateStep);
