import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import UncheckedBoxIcon from '@material-ui/icons/CheckBoxOutlineBlank';

export const StyledContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  outline: none;
`;

export const StyledTitle = styled.div`
  letter-spacing: 0.18px;
  color: var(--dark-grey-color);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const StyledChildrenDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledFormControlLabel = styled(({ ...otherProps }) => (
  <FormControlLabel {...otherProps} classes={{ label: 'label' }} />
))`
  margin: 0 16px 0 0;
  position: relative;
  left: -8px;
  .label {
    font-size: 12px;
    color: var(--dark-grey-color);
  }
`;

export const StyledCheckBox = styled(({ ...otherProps }) => (
  <Checkbox
    {...otherProps}
    icon={<UncheckedBoxIcon classes={{ root: 'uncheckedBox' }} />}
    checkedIcon={<CheckBoxIcon classes={{ root: 'checkedBox' }} />}
  />
))`
  padding: 8px;
  .uncheckedBox {
    font-size: 17px;
    fill: var(--grey-color);
  }
  .checkedBox {
    font-size: 17px;
    fill: var(--primary-color);
  }
`;
