import React from 'react';
import CheckCircleIcon from './CheckCircleIcon';
import {IconInfoWarning} from './ObservationIcon';

type Props = {
  width: number;
  height: number;
  color: string;
  iconCheck?: boolean;
  iconWarning?: boolean;
};

const ActionPlanIcon: React.FC<Props> = (
  { width, height, color, iconCheck, iconWarning },
  props,
) => (
  <div  style={{position:'relative'}}>
    <span style={{ marginRight: '4px', marginTop: '4px' }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 22 22"
        fill="none"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM11 16C8.23858 16 6 13.7614 6 11C6 8.23858 8.23858 6 11 6C13.7614 6 16 8.23858 16 11C16 13.7614 13.7614 16 11 16ZM11 8C9.34315 8 8 9.34315 8 11C8 12.6569 9.34315 14 11 14C12.6569 14 14 12.6569 14 11C14 9.34315 12.6569 8 11 8ZM11 12C10.4477 12 10 11.5523 10 11C10 10.4477 10.4477 10 11 10C11.5523 10 12 10.4477 12 11C12 11.5523 11.5523 12 11 12ZM11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22C17.0751 22 22 17.0751 22 11C22 8.08262 20.8411 5.28473 18.7782 3.22183C16.7153 1.15893 13.9174 0 11 0ZM11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20Z"
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

export default ActionPlanIcon;
