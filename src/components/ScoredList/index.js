import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import './styles.css';

const trimString = (currentString, maxLength) => (currentString.length > maxLength
  ? `${currentString.substring(0, maxLength)}...`
  : currentString);

function ScoredList({ data, selectedItem, callBack }) {
  return (
    <List component="nav">
      {(data || []).map(item => (
        <ListItem
          onClick={() => callBack(item)}
          selected={selectedItem.id === item.id}
        >
          <Grid container spacing={24}>
            <Grid item xs={12} sm={9}>
              <Tooltip title={item.name} placement="top">
                <div className="list-group">{trimString(item.name, 100)}</div>
              </Tooltip>
            </Grid>
            <Grid item xs={12} sm={1}>
              <div className="score">{`${Number(item.score).toFixed(0)}%`}</div>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
}

ScoredList.propTypes = {
  data: PropTypes.instanceOf(Array).isRequired,
  selectedItem: PropTypes.instanceOf(Object).isRequired,
  callBack: PropTypes.func.isRequired,
};

export default ScoredList;
