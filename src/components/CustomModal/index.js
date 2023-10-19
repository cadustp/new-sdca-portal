import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../shared/Icons/CloseIcon';
import {
  StyledContentDiv,
  StyledTitleDiv,
  StyledTitle,
  StyledIconButton,
  StyledModal,
  StyledChildrenDiv,
} from './style';

import WithLoading from '../../hocs/withLoading';

const StyledChildrenDivWithLoading = WithLoading(StyledChildrenDiv);

const CustomModal = ({
  open,
  title,
  children,
  onClose,
  loading,
  disableBackdropClick,
  centerTitle,
  overflowVisible,
}) => (
  <StyledModal
    onBackdropClick={disableBackdropClick ? () => {} : onClose}
    onClose={onClose}
    open={open}
    disableRestoreFocus
    disableBackdropClick={disableBackdropClick}
  >
    <StyledContentDiv overflowVisible={overflowVisible}>
      <StyledTitleDiv>
        <StyledTitle centerTitle={centerTitle}>{title}</StyledTitle>
        <StyledIconButton onClick={onClose}>
          <CloseIcon />
        </StyledIconButton>
      </StyledTitleDiv>
      <StyledChildrenDivWithLoading isLoading={loading}>
        {children}
      </StyledChildrenDivWithLoading>
    </StyledContentDiv>
  </StyledModal>
);

CustomModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  centerTitle: PropTypes.bool,
  overflowVisible: PropTypes.bool,
};

CustomModal.defaultProps = {
  children: null,
  loading: false,
  disableBackdropClick: false,
  centerTitle: false,
  overflowVisible: false,
};

export default CustomModal;
