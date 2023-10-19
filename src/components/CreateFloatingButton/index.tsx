import React from 'react';
import { FloatingContainer } from './styles';
import { ReactComponent as PlusSVG } from '../../assets/icons/plus.svg';
import { light } from '../../styles/palette';

type Props = {
  onClick: () => void;
};

function FloatingButton({ onClick }: Props) {
  return (
    <FloatingContainer onClick={onClick}>
      <PlusSVG fill={light.contrast} />
    </FloatingContainer>
  );
}

export default React.memo(FloatingButton);
