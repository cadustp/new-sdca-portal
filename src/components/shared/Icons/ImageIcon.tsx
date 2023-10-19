import { Box } from '@mui/material';
import React from 'react';
import CheckCircleIcon from './CheckCircleIcon';
import { IconInfoWarning } from './ObservationIcon';

type Props = {
  width: number;
  height: number;
  color: string;
  iconCheck?: boolean;
  iconWarning?: boolean;
};
const ImageIcon: React.FC<Props> = (
  { width, height, color, iconCheck, iconWarning },
  props,
) => (
  <div  style={{position:'relative'}}>
    <span style={{ marginRight: '4px', marginTop: '4px' }}>
      {' '}
      <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 0H3C1.34315 0 0 1.34315 0 3V17C0 18.6569 1.34315 20 3 20H17C17.1645 19.9977 17.3284 19.981 17.49 19.95L17.79 19.88H17.86H17.91L18.28 19.74L18.41 19.67C18.51 19.61 18.62 19.56 18.72 19.49C18.8535 19.3918 18.9805 19.2849 19.1 19.17L19.17 19.08C19.2682 18.9805 19.3585 18.8735 19.44 18.76L19.53 18.63C19.5998 18.5187 19.6601 18.4016 19.71 18.28C19.7374 18.232 19.7609 18.1818 19.78 18.13C19.83 18.01 19.86 17.88 19.9 17.75V17.6C19.9567 17.4046 19.9903 17.2032 20 17V3C20 1.34315 18.6569 0 17 0ZM3 18C2.44772 18 2 17.5523 2 17V12.69L5.29 9.39C5.47777 9.20069 5.73336 9.0942 6 9.0942C6.26664 9.0942 6.52223 9.20069 6.71 9.39L15.31 18H3ZM18 17C17.9991 17.1233 17.9753 17.2453 17.93 17.36C17.9071 17.4087 17.8804 17.4556 17.85 17.5C17.8232 17.5423 17.7931 17.5825 17.76 17.62L12.41 12.27L13.29 11.39C13.4778 11.2007 13.7334 11.0942 14 11.0942C14.2666 11.0942 14.5222 11.2007 14.71 11.39L18 14.69V17ZM18 11.86L16.12 10C14.9316 8.87237 13.0684 8.87237 11.88 10L11 10.88L8.12 8C6.93159 6.87237 5.06841 6.87237 3.88 8L2 9.86V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V11.86Z"
          fill={color}
        />
      </svg>
    </span>
    <span style={{ marginTop: '-15px', position: 'absolute' }}>
      {iconCheck && <CheckCircleIcon width={10} height={10} color="green" />}
      {iconWarning && <IconInfoWarning />}
    </span>
  </div>
);

export default ImageIcon;
