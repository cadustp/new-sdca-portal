import React from 'react';
import { injectIntl } from 'react-intl';

import {
  ContentContainer, MainText, DescriptionText, Link,
} from './styles';

import { FailureIcon } from '../../components/shared/Icons';

const FailureState = ({ intl }) => (
  <ContentContainer>
    <FailureIcon />
    <MainText>{intl.formatMessage({ id: 'errorState.title' })}</MainText>
    <DescriptionText>
      {intl.formatMessage({ id: 'errorState.description' })}
      {' '}
      <Link href="mailto:dayway@falconi.com">dayway@falconi.com</Link>
    </DescriptionText>
  </ContentContainer>
);

export default injectIntl(FailureState);
