import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./Button.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
  purple?: boolean
};

export const Button: React.FC<ButtonPropsType> = (
  {
    red, className,
    name, purple,
    ...restProps
  }
) => {
  const finalClassName = `${s.default} ${red ? s.red : ""}  ${purple ? s.purple : ""}${className ? className : ""}`;

  return (
    <button
      className={finalClassName}
      {...restProps}
    />
  );
};
