import React from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';

import {
  IconContainer,
  InfoContainer,
  StatusBadge,
  StatusBadgeText,
  TableHeaderTitle,
} from './styles';

import TableGenericRow from '../../../components/TableGenericRow';

const TableHeader = ({ width, intl, isAppUserReminderScreen, isAppUser }) => (
  <TableGenericRow header width={width}>
    <IconContainer width={8}>
      {isAppUserReminderScreen ? (
        <TableHeaderTitle></TableHeaderTitle>
      ) : (
        <StatusBadge>
          <StatusBadgeText>
            {(intl.messages['reports.is_active_label'] || '').toUpperCase()}
          </StatusBadgeText>
        </StatusBadge>
      )}
    </IconContainer>
    <InfoContainer width={22}>
      <TableHeaderTitle>
        {(intl.messages['reports.name_label'] || '').toUpperCase()}
      </TableHeaderTitle>
    </InfoContainer>
    <InfoContainer width={21}>
      <TableHeaderTitle>
        {(intl.messages['reports.form_label'] || '').toUpperCase()}
      </TableHeaderTitle>
    </InfoContainer>

    {!isAppUser ? (
      <InfoContainer width={19}>
        <TableHeaderTitle>
          {(intl.messages['reports.evaluators_label'] || '').toUpperCase()}
        </TableHeaderTitle>
      </InfoContainer>
    ):(<InfoContainer width={19} >
        <TableHeaderTitle>
          {(intl.messages['reports.result'] || '').toUpperCase()}
        </TableHeaderTitle>
      </InfoContainer>)}

    <InfoContainer width={19}>
      <TableHeaderTitle>
        {(intl.messages['reports.evaluated_label'] || '').toUpperCase()}
      </TableHeaderTitle>
    </InfoContainer>
    <InfoContainer width={11}>
      <TableHeaderTitle>
        {(intl.messages['reports.period_label'] || '').toUpperCase()}
      </TableHeaderTitle>
    </InfoContainer>
  </TableGenericRow>
);

TableHeader.propTypes = {
  width: PropTypes.number.isRequired,

  intl: PropTypes.shape({
    messages: PropTypes.shape(),
  }).isRequired,
  isAppUserReminderScreen: PropTypes.bool,
  isAppUser: PropTypes.bool,
};

export default injectIntl(TableHeader);
