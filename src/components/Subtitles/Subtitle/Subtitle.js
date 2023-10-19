import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import Avatar from '../../Avatar';
import classes from './Subtitle.module.css';

let allLabel = '';

const translate = (intl) => {
  allLabel = intl.formatMessage({
    id: 'subtitle.all',
    defaultMessage: 'Todos',
  });

  defineMessages({
    allLabel: { id: 'subtitle.all', defaultMessage: 'Todos' },
  });
};

const Subtitle = (props) => {
  const { intl } = props;
  translate(intl);
  const values = props.values || [];
  const limit = props.limit || values.length;
  const otherValuesCount = values.length - limit;
  let visibleOptions;

  if (values.length === 0) {
    visibleOptions = allLabel;
  } else if (values.length === props.total) {
    visibleOptions = allLabel;
  } else {
    visibleOptions = values.slice(0, limit).join('; ');
  }

  return (
    <div className={classes.Subtitle}>
      <label>
        {props.label}
        :
      </label>
      <span>{visibleOptions}</span>
      {otherValuesCount > 0 && values.length !== props.total ? (
        <div className={classes.Avatar}>
          <Avatar width={20} height={20}>
            <p>{`+${otherValuesCount}`}</p>
          </Avatar>
        </div>
      ) : null}
    </div>
  );
};

Subtitle.propTypes = {
  label: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired,
  limit: PropTypes.number,
  total: PropTypes.number,
};

export default injectIntl(Subtitle);
