import React from "react";

type Props = {
  width:number,
  height:number
}

const KnockoutIcon: React.FC<Props> = ({width,height},props) => (
  <svg width={width} height={height} viewBox="0 0 115 115" fill="none" {...props}>
  <circle cx={57.28} cy={57.28} r={57.28} fill="#EBEAF9" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.2185 7.17863L102.578 16.8999L90.1152 105.333L20.7561 95.6121L33.2185 7.17863Z"
      fill="url(#paint0_linear)"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5312 17.7065H67.7815L86.6816 36.6022V103.125H20.5312V17.7065Z"
      fill="white"
    />
    <circle cx={56} cy={65} r={13} fill="#45D0A1" />
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x={49}
      y={61}
      width={14}
      height={10}
    >
      <path
        d="M62.1993 61.5285C62.024 61.3503 61.7853 61.25 61.5363 61.25C61.2873 61.25 61.0486 61.3503 60.8732 61.5285L53.9156 68.5531L50.9925 65.5964C50.7472 65.3575 50.3943 65.2687 50.0665 65.3635C49.7387 65.4582 49.4859 65.722 49.4034 66.0556C49.3209 66.3891 49.4211 66.7417 49.6663 66.9806L53.2525 70.5965C53.4279 70.7747 53.6666 70.875 53.9156 70.875C54.1646 70.875 54.4033 70.7747 54.5787 70.5965L62.1993 62.9127C62.391 62.7345 62.5 62.4835 62.5 62.2206C62.5 61.9577 62.391 61.7068 62.1993 61.5285Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)">
      <rect x={45} y={56} width={21} height={21} fill="white" />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear"
        x1={32.2746}
        y1={113.46}
        x2={104.693}
        y2={123.637}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FF9A6B" />
        <stop offset={1} stopColor="#FF7E80" />
      </linearGradient>
    </defs>
  </svg>
);
export default KnockoutIcon;
