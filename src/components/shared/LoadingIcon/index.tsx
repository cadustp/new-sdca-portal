import React from 'react';
import { CircularProgress } from '@mui/material';
import { light } from '../../../styles/palette';

type Props = {
  size?: number;
  theme?: 'dark' | 'light';
};

function LoadingIcon({ size, theme = 'dark' }: Props): JSX.Element {
  return (
    <CircularProgress
      size={size}
      style={{
        top: '50%',
        left: '50%',
        position: 'absolute',
        marginTop: -12,
        marginLeft: -12,
        color: theme === 'light' ? light.primaryLight : light.primary,
      }}
    />
  );
}

LoadingIcon.defaultProps = {
  size: 16,
  theme: 'dark',
} as Partial<Props>;

export default React.memo(LoadingIcon);
