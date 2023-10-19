import React from 'react';
import { connect } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { defineMessages, injectIntl } from 'react-intl';
import { actions } from '../SelectAll/SelectAll';
import { captureEvent } from '../../../../../../../analytics';

let accumulatedLabel = '';

const mapStateToProps = state => ({
  forms: state.formReducer.notTraining,
  selectedForms: state.filters.data.forms,
});

const radioButtonStyle = { paddingLeft: 25 };

class FormTab extends React.Component {
  translate(intl) {
    accumulatedLabel = intl.formatMessage({
      id: 'form_tab_radio_button.accumulated',
      defaultMessage: 'Acumulado',
    });

    defineMessages({
      accumulatedLabel: {
        id: 'form_tab_radio_button.accumulated',
        defaultMessage: 'Acumulado',
      },
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      selected_forms: {},
    };
  }

  buildSelectedFormobject = () => {
    const selected_forms = this.props.forms;
    const selectedForms = { x: true };
    selected_forms.ids.forEach(form_id => {
      selectedForms[form_id] = true;
    });
    return selectedForms;
  };

  selectCheckItem = event => {
    const { selectedForms, updateParentState } = this.props;
    const { value } = event.target;
    const updatedSelectedForms = {
      ...selectedForms,
      [value]: !selectedForms[value],
    };
    updateParentState(updatedSelectedForms);
  };

  onSelectAllClick = action => {
    const selecteds = this.state.selected_forms;
    const my_selected_forms = this.buildSelectedLists(action, selecteds);
    this.setState({
      ...this.state,
      selected_forms: my_selected_forms,
    });
  };

  buildSelectedLists = (action, selecteds) => {
    if (action === actions.SELECT_ALL) {
      for (const keyone in selecteds) {
        selecteds[keyone] = true;
      }
    } else if (action === actions.UNSELECT_ALL) {
      for (const keytwo in selecteds) {
        selecteds[keytwo] = false;
      }
    }
    return selecteds;
  };

  getSelected = () => {
    const { selectedForms } = this.props;
    let selected;
    for (const key in selectedForms) {
      if (selectedForms[key]) selected = key;
    }
    if (selected === 'x') return selected;
    return parseInt(selected);
  };

  handleRadioButtonChange = event => {
    const { selectedForms, updateParentState, forms } = this.props;
    const { value } = event.target;
    let selectedFormsCopy = { ...selectedForms };
    if (value === 'x') {
      selectedFormsCopy = forms.ids.reduce((objectForms, form) => {
        const objectFormsCopy = { ...objectForms };
        objectFormsCopy[form] = true;
        return objectFormsCopy;
      }, {});
    } else {
      selectedFormsCopy = forms.ids.reduce((objectForms, form) => {
        const objectFormsCopy = { ...objectForms };
        objectFormsCopy[form] = false;
        return objectFormsCopy;
      }, {});

      selectedFormsCopy[value] = true;
    }
    updateParentState(selectedFormsCopy);
    this.setState({ selected_forms: selectedFormsCopy });

    captureEvent('selectRankingForm', {
      selection: Object.values(selectedFormsCopy).reduce((a, item) => a + item, 0) === 1
        ? 'single' : 'cumulate',
    });
  };

  renderContent = () => {
    const { selectedForms, forms } = this.props;
    const isAllSelected = Object.values(selectedForms).filter(id => id).length
      >= forms.forms.length;

    return (
      <FormControl>
        <RadioGroup
          value={this.getSelected()}
          onChange={this.handleRadioButtonChange}
        >
          <FormControlLabel
            value="x"
            label={accumulatedLabel}
            control={(
              <Radio
                checked={isAllSelected}
                color="primary"
                style={radioButtonStyle}
              />
            )}
          />
          {this.renderRadioButtonList(isAllSelected)}
        </RadioGroup>
      </FormControl>
    );
  };

  renderRadioButtonList = isAllSelected => {
    const { intl, selectedForms } = this.props;
    const { labels } = this.props.forms;
    const { ids } = this.props.forms;
    const allForms = this.props.forms.forms;
    const formList = [];

    for (let i = 0; i < ids.length; i++) {
      formList.push(
        this.renderRadioButton(
          ids[i],
          `${labels[i]} - ${intl.messages['reports.version']}: ${allForms[i].version}`,
          isAllSelected,
          selectedForms[ids[i]]
        )
      );
    }
    return formList;
  };

  renderRadioButton = (id, label, isAllSelected, isRadioSelected) => (
    <FormControlLabel
      value={id}
      label={label}
      control={(
        <Radio
          checked={isAllSelected ? false : isRadioSelected}
          color="primary"
          style={radioButtonStyle}
        />
      )}
    />
  );

  render = () => {
    const { intl } = this.props;
    this.translate(intl);

    return <div name="tab-content">{this.renderContent()}</div>;
  };
}

export default injectIntl(connect(mapStateToProps)(FormTab));
