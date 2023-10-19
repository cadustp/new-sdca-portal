import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { captureEvent } from '../../../../../../../../analytics';
import './CheckBoxTreeView.css';
import MinusBox from './icons/minus-box';
import PlusBox from './icons/plus-box';

class CheckBoxTreeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      checked: [],
      expanded: [],
      data: [],
    };
  }

  componentDidMount() {
    this.formatEntities();
  }

  componentDidUpdate(props) {
    if (this.props !== props) {
      this.formatEntities();
    }
    const buttons = document.querySelectorAll('[title="Toggle"]');
    buttons.forEach(el => {
      el.title = '';
    });
  }

  getEntityChildren(entity) {
    const { entities } = this.state;
    const children = entities
      .filter(e => e.parent_value === entity.value)
      .map(this.formatEntityWithChildren);
    return children;
  }

  handleOnExpand = expanded => {
    captureEvent('handleTree');
    this.setState({ expanded });
  };

  handleCheck = checked => {
    captureEvent('selectGroup', { selected: checked.length });
    const { checkCallBack } = this.props;
    checkCallBack(checked);
    this.setState({ checked });
  };

  formatEntityWithChildren = entity => {
    const children = this.getEntityChildren(entity);
    return {
      value: entity.value,
      label: entity.label,
      parent_value: entity.parent_value,
      children: children.length > 0 ? children : null,
    };
  };

  mountData() {
    const { entities } = this.state;
    const data = entities
      .filter(entity => entity.parent_value == null)
      .map(entity => ({
        value: entity.value,
        label: entity.label,
        parent_value: entity.parent_value,
        children: this.getEntityChildren(entity),
      }));

    this.setState({
      data,
    });
  }

  formatEntities() {
    const {
      values,
      labels,
      parent_values: parentValues,
      checked: checkedValues,
    } = this.props;
    if (!values) return;

    const entities = values.map((value, index) => ({
      value,
      label: labels[index],
      parent_value: parentValues[index],
    }));

    const checked = Object.values(entities)
      .filter(entity => checkedValues.includes(entity.value.toString()))
      .map(entity => entity.value);

    this.setState({ entities, checked }, () => this.mountData());
  }

  render() {
    const { data, expanded, checked } = this.state;
    const iconStyle = {
      height: '40px',
      padding: '8px',
      position: 'relative',
      right: '12px',
    };
    return (
      <div className="container">
        <div className="checkbox">
          <CheckboxTree
            nodes={data}
            expanded={expanded}
            checked={checked}
            onCheck={this.handleCheck}
            onExpand={this.handleOnExpand}
            noCascade
            showNodeIcon={false}
            icons={{
              check: <Checkbox color="primary" style={iconStyle} checked />,
              uncheck: (
                <Checkbox color="primary" style={iconStyle} checked={false} />
              ),
              expandClose: <PlusBox />,
              expandOpen: <MinusBox />,
            }}
          />
        </div>
      </div>
    );
  }
}

CheckBoxTreeView.propTypes = {
  checkCallBack: PropTypes.func.isRequired,
  values: PropTypes.arrayOf(PropTypes.any).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  parent_values: PropTypes.arrayOf(PropTypes.number).isRequired,
  checked: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CheckBoxTreeView;
