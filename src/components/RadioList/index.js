import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyledContentDiv,
  StyledTitle,
  StyledChildrenDiv,
  StyledFormControlLabel,
  StyledRadio,
} from './styles';
import { areEqual } from '../../helpers/objects_comparisson_helper';

export default class RadioList extends Component {
  getItemByValue(itemValue) {
    const { items } = this.props;
    return items.find(item => item.value.toString() === itemValue.toString());
  }

  isSelected = (item) => {
    const { selectedItem } = this.props;
    if (selectedItem) {
      return areEqual(item, selectedItem);
    }
    return false;
  };

  handleChange = (itemValue) => {
    const { onChange } = this.props;
    let newSelectedItem = this.getItemByValue(itemValue);

    if (this.isSelected(newSelectedItem)) {
      newSelectedItem = null;
    }

    onChange(newSelectedItem);
  };

  render() {
    const { title, items } = this.props;
    const titleComponent = title ? <StyledTitle>{title}</StyledTitle> : null;

    return (
      <StyledContentDiv>
        {titleComponent}
        <StyledChildrenDiv>
          {items.map(item => (
            <StyledFormControlLabel
              control={(
                <StyledRadio
                  checked={this.isSelected(item)}
                  onClick={event => this.handleChange(event.target.value)}
                  value={item.value}
                />
              )}
              label={item.label}
            />
          ))}
        </StyledChildrenDiv>
      </StyledContentDiv>
    );
  }
}

const shape = PropTypes.shape({
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
});

RadioList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(shape).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedItem: shape.isRequired,
};

RadioList.defaultProps = {
  title: null,
};
