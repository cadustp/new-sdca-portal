import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  keyBy, chain, flow, flatMap,
} from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxTreeView from './CheckBoxTreeView/CheckBoxTreeView';
import FlattenedTreeView from './FlattenedTree/FlattenedTreeView';
import SelectAll, { actions } from '../SelectAll/SelectAll';
import { captureEvent } from '../../../../../../../analytics';

const MinLength = 2;
let textFieldPlaceholderLabel = '';
class GroupSelectionView extends Component {
  static propTypes = {
    groups: PropTypes.shape({
      ids: PropTypes.arrayOf(PropTypes.number),
      parent_ids: PropTypes.arrayOf(PropTypes.number),
      names: PropTypes.arrayOf(PropTypes.string),
      groups: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
    checkCallBack: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    selectedGroups: PropTypes.object.isRequired,
    updateParentState: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    intl: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      isOnFlatView: false,
      flattenedTree: [],
      eventSent: false,
    };

    const {
      groups: { groups },
    } = props;

    this.itemsMap = keyBy(groups, 'id');

    this.generateFilteredTree = flow(
      this.getItemsGroupedByParent,
      this.flattenTree,
      this.filterFlatTree
    );

    this.state.flattenedTree = this.generateFilteredTree(groups);
  }

  // eslint-disable-next-line react/destructuring-assignment
  updateFlattenedTree = (groups = this.props.groups.groups) => {
    const flattenedTree = this.generateFilteredTree(groups);
    this.setState({ flattenedTree });
  };

  getItemsGroupedByParent = groups => chain(groups)
    .groupBy('parent_id')
    .value();

  flattenTree = itemsGroupedByParent => Object.values(itemsGroupedByParent).map(this.formatSiblingsListing);

  formatSiblingsListing = children => {
    const childId = children[0].id;
    const predecessors = this.getAllPredecessors({
      item: this.itemsMap[childId],
      selectProperty: item => item.name,
    });
    return {
      siblings: children,
      predecessors,
    };
  };

  getAllPredecessors = ({
    item,
    predecessors = [],
    selectProperty = g => g.parent_id,
  }) => {
    if (item.parent_id == null) {
      return predecessors;
    }
    const parent = this.itemsMap[item.parent_id];
    return this.getAllPredecessors({
      item: parent,
      predecessors: [selectProperty(parent), ...predecessors],
      selectProperty,
    });
  };

  updateSearchText = ({ target: { value: searchText } }) => {
    const { eventSent } = this.state;
    if (searchText.trim().length >= MinLength) {
      this.setState(
        { searchText, isOnFlatView: true },
        this.updateFlattenedTree
      );
      if (!eventSent) {
        setTimeout(() => {
          captureEvent('searchGroup');
        }, 3000);
        this.setState({ eventSent: true });
      }
    } else {
      this.setState({ searchText, isOnFlatView: false, eventSent: false });
    }
  };

  filterFlatTree = flatTreeItems => {
    const { searchText } = this.state;
    const trimmedText = searchText.trim();
    // Dá match em strings que comecem com o texto ou
    // que contenham palavras que comecem com o texto
    const regex = new RegExp(`(^|\\s)${trimmedText}`, 'i');
    const filteredTree = flatTreeItems
      .filter(itemHasDesiredText(regex))
      .map(item => {
        if (item.predecessors.some(predecessorHasDesiredText(regex))) {
          return item;
        }
        return {
          ...item,
          siblings: item.siblings.filter(siblingHasDesiredText(regex)),
        };
      });
    return filteredTree;
  };

  onSelectAllClick = action => {
    const { updateParentState } = this.props;
    const { isOnFlatView } = this.state;
    const selectionMap = isOnFlatView
      ? this.handleFlatTreeSelectAll(action)
      : this.handleTreeSelectAll(action);

    updateParentState(selectionMap);
    captureEvent('selectAllGroups', { select: action, amount: selectionMap ? Object.keys(selectionMap).length : 0 });
  };

  handleTreeSelectAll = action => {
    const {
      groups: { ids: groupsIds },
    } = this.props;

    const willChangeToSelected = action === actions.SELECT_ALL;
    return groupsIds.reduce(
      (currentMap, key) => ({ ...currentMap, [key]: willChangeToSelected }),
      {}
    );
  };

  handleFlatTreeSelectAll = action => {
    const { flattenedTree } = this.state;
    const { selectedGroups } = this.props;

    const itemsBeingDisplayed = flatMap(flattenedTree, item => item.siblings.map(sibling => sibling.id));

    const noneSelected = itemsBeingDisplayed.every(key => !selectedGroups[key]);

    const willChangeToSelected = action === actions.SELECT_ALL || noneSelected;
    const selectionMap = itemsBeingDisplayed.reduce(
      (currentMap, key) => ({ ...currentMap, [key]: willChangeToSelected }),
      selectedGroups
    );
    return selectionMap;
  };

  getSelectAllLabelId = () => {
    const { isOnFlatView } = this.state;

    return isOnFlatView
      ? 'select_all.select_items'
      : 'select_all.select_every_item';
  };

  render() {
    const {
      groups, selectedGroups, checkCallBack, intl,
    } = this.props;
    const {
      searchText, flattenedTree, isOnFlatView, eventSent,
    } = this.state;
    translate(intl);
    return (
      <>
        <div
          style={{
            marginTop: 16,
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            value={searchText}
            placeholder={textFieldPlaceholderLabel}
            onChange={this.updateSearchText}
            style={{ width: 350 }}
          />
          <IconButton
            size="small"
            onClick={() => {
              this.setState({ searchText: '', isOnFlatView: false, eventSent: false });
              captureEvent('clearSearchFieldAdherence');
            }}
          >
            <CloseIcon size="small" />
          </IconButton>
        </div>
        <SelectAll
          total={groups.ids.length}
          selected_items={selectedGroups}
          onCheckboxClick={this.onSelectAllClick}
          showDivider={false}
          labelId={this.getSelectAllLabelId()}
        />
        {isOnFlatView ? (
          <FlattenedTreeView
            groups={flattenedTree}
            selectionMap={selectedGroups}
            onChange={checkCallBack}
          />
        ) : (
          <CheckBoxTreeView
            values={groups.ids}
            labels={groups.names}
            checked={Object.keys(selectedGroups).filter(
              key => selectedGroups[key]
            )}
            parent_values={groups.parent_ids}
            checkCallBack={checkCallBack}
          />
        )}
      </>
    );
  }
}

export default injectIntl(GroupSelectionView);

function translate(intl) {
  textFieldPlaceholderLabel = intl.formatMessage({
    id: 'group_selection.search_placeholder',
    defaultMessage: 'Pesquisar por grupo...',
  });

  defineMessages({
    textFieldPlaceholderLabel: {
      id: 'group_selection.search_placeholder',
      defaultMessage: 'Pesquisar por grupo...',
    },
  });
}

function itemHasDesiredText(regex) {
  return ({ predecessors, siblings }) => predecessors.some(predecessorHasDesiredText(regex))
    || siblings.some(siblingHasDesiredText(regex));
}

function predecessorHasDesiredText(regex) {
  return groupParent => regex.test(groupParent);
}

function siblingHasDesiredText(regex) {
  return sibling => regex.test(sibling.name);
}
