import React from "react";

function IconButton(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="">
      IconButton
    </button>
  );
}

export default IconButton;
