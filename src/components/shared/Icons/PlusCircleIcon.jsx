import React from 'react';
import { text } from '../../../styles/palette';

export const PlusCircleIcon = ({ color = text.primary, size = 18 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm4-9h-3V8a1 1 0 00-2 0v3H8a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2z" />
  </svg>
);
