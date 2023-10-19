import React from 'react';
import PropTypes from 'prop-types';

import {
  OuterContainer,
  ContentContainer,
  MainText,
  DescriptionText,
} from './styles';

const EmptyState = ({ mainText, descriptionText, icon }) => (
  <OuterContainer>
    <ContentContainer>
      <div>{icon}</div>
      <MainText>{mainText}</MainText>
      <DescriptionText>{descriptionText}</DescriptionText>
    </ContentContainer>
  </OuterContainer>
);

EmptyState.propTypes = {
  mainText: PropTypes.string.isRequired,
  descriptionText: PropTypes.string.isRequired,
};

export default EmptyState;
