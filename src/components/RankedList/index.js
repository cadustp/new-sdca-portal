import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import { defineMessages, injectIntl } from 'react-intl';
import './styles.css';

let avaliationsLabel = '';

function translate(intl) {
  avaliationsLabel = intl.formatMessage({
    id: 'group_list.avaliations',
    defaultMessage: 'avaliações',
  });

  defineMessages({
    avaliationsLabel: {
      id: 'group_list.avaliations',
      defaultMessage: 'avaliações',
    },
  });
}

function trimString(currentString, maxLength) {
  return currentString.length > maxLength
    ? `${currentString.substring(0, maxLength)}...`
    : currentString;
}

function RankedList({ intl, groups = [] }) {
  translate(intl);
  return (
    <List component="nav">
      {groups.map((item, index) => (
        <ListItem key={item.group.id}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={1}>
              <div className="rank-count">{index + 1}</div>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Tooltip title={item.group.name} placement="top-start">
                <div className="rank-group">
                  {trimString(item.group.name, 20)}
                </div>
              </Tooltip>
              <div className="avaliations">
                {`${item.group.avaliations} ${avaliationsLabel}`}
              </div>
            </Grid>
            <Grid item xs={12} sm={1}>
              <div className="score">
                {`${Number(item.group.score).toFixed(
                  0,
                )}%`}
              </div>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}

RankedList.propTypes = {
  intl: PropTypes.instanceOf(Object).isRequired,
  groups: PropTypes.instanceOf(Array).isRequired,
};

export default injectIntl(RankedList);
