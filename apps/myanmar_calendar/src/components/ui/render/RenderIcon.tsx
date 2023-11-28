import React, {
  DetailedReactHTMLElement,
  PropsWithChildren,
  cloneElement,
} from "react";
import { IconBaseProps } from "react-icons";

interface RenderIconProps {
  children: DetailedReactHTMLElement<any, HTMLElement> | JSX.Element;
}

function RenderIcon(props: IconBaseProps & RenderIconProps) {
  const { children, className } = props;

  const injectProps = (
    icon: DetailedReactHTMLElement<any, HTMLElement> | JSX.Element,
  ) => {
    return cloneElement(icon, {
      ...props,
      className: icon.props.className + `icon ${className}`,
    });
  };
  return <>{injectProps(children)}</>;
}

export default RenderIcon;
