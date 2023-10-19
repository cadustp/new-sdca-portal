import React from 'react';
import { light } from '../../../styles/palette';
import { PlusCircleIcon } from '../Icons/index';
import { StyledAddButton } from './styles';

type Props = {
  isDisabled?: boolean;
  onClick: () => void;
  text: string;
};

function AddButton({ isDisabled = false, onClick, text }: Props) {
  return (
    <StyledAddButton
      disabled={isDisabled}
      variant="text"
      disableTouchRipple
      disableRipple
      onClick={onClick}
    >
      <PlusCircleIcon
        size={24}
        color={isDisabled ? light.disabled : light.primary}
      />{' '}
      <span>{text}</span>
    </StyledAddButton>
  );
}

export default React.memo(AddButton);
