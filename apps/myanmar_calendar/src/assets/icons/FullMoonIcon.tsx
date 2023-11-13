import React, { SVGProps } from "react";

interface FullMoonIconProps extends SVGProps<SVGSVGElement> {}

const FullMoonIcon = ({ ...props }: FullMoonIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      {...props}
    >
      <circle cx="24" cy="24" r="20" fill="#f5bc00"></circle>
      <path
        fill="#eb7900"
        d="M35.984,8.016C38.495,11.358,40,15.498,40,20c0,11.046-8.954,20-20,20	c-4.502,0-8.642-1.505-11.984-4.016C11.664,40.843,17.456,44,24,44c11.046,0,20-8.954,20-20C44,17.456,40.843,11.664,35.984,8.016z"
      ></path>
      <circle cx="9.5" cy="19.5" r="1.5" fill="#eb7900"></circle>
      <circle cx="19.5" cy="12.5" r="3.5" fill="#eb7900"></circle>
      <circle cx="16.5" cy="29.5" r="2.5" fill="#eb7900"></circle>
      <circle cx="34" cy="24" r="2" fill="#eb7900"></circle>
    </svg>
  );
};

export default FullMoonIcon;
