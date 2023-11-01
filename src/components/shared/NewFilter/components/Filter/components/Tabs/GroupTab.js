import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actions } from '../SelectAll/SelectAll';
import GroupSelectionView from '../GroupSelection/GroupSelectionView';

const mapStateToProps = state => ({
  groups: state.groupReducer.data.userGroups,
});

class GroupTab extends React.Component {
  static propTypes = {
    groups: PropTypes.shape({
      ids: PropTypes.arrayOf(PropTypes.number),
    }).isRequired,
    selectedGroups: PropTypes.shape().isRequired,
    updateParentState: PropTypes.func.isRequired,
  };

  updateSelectedGroups = selectedGroupsIndexes => {
    const {
      groups: { ids: groupsIds },
      updateParentState,
    } = this.props;
    const selectedGroupsSet = new Set(selectedGroupsIndexes.map(id => +id));

    const newSelectedGroups = groupsIds.reduce(
      (currentSelected, key) => ({
        ...currentSelected,
        [key]: selectedGroupsSet.has(key),
      }),
      {},
    );

    updateParentState(newSelectedGroups);
  };

  onSelectAllClick = action => {
    const {
      groups: { ids: groupsIds },
      updateParentState,
    } = this.props;

    const willChangeToSelected = action === actions.SELECT_ALL;
    const selectionMap = groupsIds.reduce(
      (currentMap, key) => ({ ...currentMap, [key]: willChangeToSelected }),
      {},
    );
    updateParentState(selectionMap);
  };

  render = () => {
    const { groups, selectedGroups, updateParentState } = this.props;
    return (
      <div
        name="tab-content"
        style={{ display: 'flex', flex: 1, flexDirection: 'column' }}
      >
        <GroupSelectionView
          updateParentState={updateParentState}
          groups={groups}
          selectedGroups={selectedGroups}
          checkCallBack={this.updateSelectedGroups}
        />
      </div>
    );
  };
}

export default connect(mapStateToProps)(GroupTab);
