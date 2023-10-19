import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyledContentDiv,
  StyledTitle,
  StyledChildrenDiv,
  StyledFormControlLabel,
  StyledCheckBox,
} from './style';
import { areEqual } from '../../helpers/objects_comparisson_helper';

export default class CheckList extends Component {
  getItemByValue(itemValue) {
    const { items } = this.props;
    return items.find(item => item.value.toString() === itemValue.toString());
  }

  isSelected = (item) => {
    const { selectedItems } = this.props;
    if (selectedItems) {
      return selectedItems.some(selectedItem => areEqual(item, selectedItem));
    }
    return false;
  };

  handleChange = (itemValue) => {
    const { selectedItems, onChange } = this.props;
    const selectedItem = this.getItemByValue(itemValue);
    let newSelectedItems = selectedItems;

    if (selectedItems && selectedItems.length > 0) {
      if (this.isSelected(selectedItem)) {
        newSelectedItems = newSelectedItems.filter(
          element => !areEqual(element, selectedItem),
        );
      } else {
        newSelectedItems.push(selectedItem);
      }
    } else {
      newSelectedItems = [selectedItem];
    }

    onChange(newSelectedItems);
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
                <StyledCheckBox
                  color="primary"
                  checked={this.isSelected(item)}
                  onChange={event => this.handleChange(event.target.value)}
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

CheckList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(shape).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(shape).isRequired,
};

CheckList.defaultProps = {
  title: null,
};
