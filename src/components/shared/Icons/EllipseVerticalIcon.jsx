import React from 'react';
import { text } from '../../../styles/palette';

export const EllipseVerticalIcon = ({ color = text.primary, size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M12 7a2 2 0 10-2-2 2 2 0 002 2zm0 10a2 2 0 102 2 2 2 0 00-2-2zm0-7a2 2 0 102 2 2 2 0 00-2-2z" />

  </svg>
);
