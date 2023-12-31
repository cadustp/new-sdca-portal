import React from 'react';
import { light } from '../../../styles/palette';

export const OrderIcon = ({ size = 18, color = light.gray.dark }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
  >
    <g fill={color} fillRule="nonzero" stroke="none" strokeWidth="1">
      <path d="M11.273 9.665L6.675 5.252a.925.925 0 00-.304-.186.955.955 0 00-.699 0 .925.925 0 00-.303.186L.77 9.665a.862.862 0 00-.239.856.906.906 0 00.653.626.95.95 0 00.892-.23l3.026-2.912v6.7c0 .487.412.882.92.882.507 0 .92-.395.92-.883V8.005l3.025 2.913a.94.94 0 00.653.26.94.94 0 00.653-.26.865.865 0 00.272-.627.865.865 0 00-.272-.626zM23.228 14.078a.94.94 0 00-.653-.262.94.94 0 00-.653.262l-3.026 2.912v-6.699c0-.487-.411-.882-.92-.882-.507 0-.919.395-.919.882v6.7l-3.025-2.913a.951.951 0 00-1.306 0 .861.861 0 000 1.253l4.598 4.413c.087.08.19.143.303.185a.898.898 0 00.7 0 .925.925 0 00.303-.185l4.598-4.413a.865.865 0 00.272-.627.865.865 0 00-.272-.626z" />
    </g>
  </svg>
);
