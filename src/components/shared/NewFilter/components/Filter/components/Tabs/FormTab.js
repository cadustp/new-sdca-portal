import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import SelectAll, { actions } from '../SelectAll/SelectAll';
import { Container, HeaderWrapper } from './styles';
import { captureEvent } from '../../../../../../../analytics';

const MinLength = 2;

const mapStateToProps = state => {
  const { includeTraining } = state.formReducer;
  return {
    formsIds: includeTraining
      ? state.formReducer.ids
      : state.formReducer.notTraining.ids,
    formsLabels: includeTraining
      ? state.formReducer.labels
      : state.formReducer.notTraining.labels,
    forms: state.formReducer.forms,
  };
};

class FormTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selected_forms: {},
      formsBeingDisplayed: [...props.forms],
      eventSent: false,
    };
  }

  componentDidUpdate(prevProvs) {
    if(prevProvs.forms != this.props.forms && this.props.forms?.length) {
      this.setState({
        formsBeingDisplayed: this.props.forms,
      });
    }
  }

  buildOneItem = form => {
    const { intl, selectedForms } = this.props;
    const label = `${form.name} - ${intl.messages['reports.version']}: ${form.version}`;
    const isChecked = selectedForms && !!selectedForms[form.id];
    return (
      <ListItem key={form.id} style={{ wordWrap: 'break-word' }}>
        <Checkbox
          color="primary"
          checked={isChecked}
          onChange={this.selectCheckItem}
          value={form.id}
        />
        <ListItemText primary={label} />
      </ListItem>
    );
  };

  selectCheckItem = event => {
    const { selectedForms } = this.props;
    const { updateParentState } = this.props;
    const { value } = event.target;
    const updatedSelectedForms = {
      ...selectedForms,
      [value]: !selectedForms[value],
    };
    updateParentState(updatedSelectedForms);
    captureEvent('selectForm', { selected: event.target.checked });
  };

  renderFormList = () => {
    const { formsBeingDisplayed } = this.state;
    return formsBeingDisplayed.map(form => this.buildOneItem(form));
  };

  filterFormsByName = searchText => {
    const { forms } = this.props;
    const isFilterDisabled = !searchText || searchText.trim().length <= MinLength;
    if (isFilterDisabled) return forms;

    const searchTextRegexp = new RegExp(searchText.trim(), 'i');
    return forms.filter(form => searchTextRegexp.test(form.name));
  };

  onSelectAllClick = action => {
    const { searchText } = this.state;
    const { updateParentState } = this.props;
    const isOnFilterMode = searchText && searchText.trim().length > MinLength;
    const newSelectionMap = isOnFilterMode
      ? this.handleFilteredSelectAll(action)
      : this.handleUnfilteredSelectAll(action);

    this.setState({
      selected_forms: newSelectionMap,
    });
    updateParentState(newSelectionMap);
    captureEvent('selectAllForms', { select: action, amount: newSelectionMap ? Object.keys(newSelectionMap).length : 0 });
  };

  handleUnfilteredSelectAll = action => {
    const { formsIds } = this.props;

    const willChangeToSelected = action === actions.SELECT_ALL;
    return formsIds.reduce(
      (currentMap, key) => ({ ...currentMap, [key]: willChangeToSelected }),
      {}
    );
  };

  handleFilteredSelectAll = action => {
    const { selected_forms: oldSelectionMap } = this.state;
    const { formsBeingDisplayed } = this.state;
    const idsFormsBeingDisplayed = formsBeingDisplayed.map(form => form.id);
    const noneSelected = idsFormsBeingDisplayed.every(
      key => !oldSelectionMap[key]
    );
    const willChangeToSelected = action === actions.SELECT_ALL || noneSelected;
    const newSelectionMap = idsFormsBeingDisplayed.reduce(
      (currentMap, key) => ({ ...currentMap, [key]: willChangeToSelected }),
      oldSelectionMap
    );
    return newSelectionMap;
  };

  updateSearchText = searchText => {
    const { eventSent } = this.state;
    this.setState({
      searchText,
      formsBeingDisplayed: this.filterFormsByName(searchText),
    });

    if (!eventSent) {
      setTimeout(() => {
        captureEvent('searchFormDash');
      }, 3000);
      this.setState({ eventSent: true });
    }
    if (!searchText.length) {
      this.setState({ eventSent: false });
    }
  };

  render = () => {
    const { searchText } = this.state;
    const { intl, forms, selectedForms } = this.props;
    const totalForms = forms.length;
    return (
      <Container name="tab-content">
        <HeaderWrapper>
          <TextField
            value={searchText}
            placeholder={intl.messages['form_selection.search_placeholder']}
            onChange={e => this.updateSearchText(e.currentTarget.value)}
            style={{ width: 350 }}
          />
          <IconButton
            size="small"
            onClick={() => {
              this.setState({ searchText: '' }, () => this.updateSearchText(''));
              captureEvent('clearSearchField');
            }}
          >
            <CloseIcon size="small" />
          </IconButton>
        </HeaderWrapper>
        <SelectAll
          selected_items={selectedForms}
          onCheckboxClick={this.onSelectAllClick}
          total={totalForms}
        />
        {this.renderFormList()}
      </Container>
    );
  };
}

FormTab.propTypes = {
  updateParentState: PropTypes.func.isRequired,
  formsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  forms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
};

export default injectIntl(connect(mapStateToProps)(FormTab));
