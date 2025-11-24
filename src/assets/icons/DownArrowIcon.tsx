import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const DownArrow: React.FC<IconProps> = (props) => (
  <svg
    width="14"
    height="7"
    viewBox="0 0 14 7"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M1 1L7 6L13 1" />
  </svg>
);

export default DownArrow;
