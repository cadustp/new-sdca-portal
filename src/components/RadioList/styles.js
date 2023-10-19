import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioIcon from '@mui/icons-material/RadioButtonChecked';
import UncheckedRadioIcon from '@mui/icons-material/RadioButtonUnchecked';
import Radio from '@mui/material/Radio';

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

export const StyledRadio = styled(({ ...otherProps }) => (
  <Radio
    color="primary"
    {...otherProps}
    style={{ color: 'var(--primary-color)' }}
    icon={<UncheckedRadioIcon classes={{ root: 'uncheckedRadio' }} />}
    checkedIcon={<RadioIcon classes={{ root: 'checkedRadio' }} />}
  />
))`
  padding: 8px;
  .uncheckedRadio {
    font-size: 17px;
    fill: var(--grey-color);
  }
  .checkedRadio {
    font-size: 17px;
    fill: var(--primary-color);
  }
`;
