import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export function Button(props) {
  let btnClass = classNames(
    {
      "w-5/12": !props.full,
      "w-full": props.full,
      "bg-green-300 text-green-900": props.type === "success",
      "bg-red-400 text-red-900": props.type === "danger",
      "bg-blue-100 text-blue-800": props.type === "primary",
    },
    "rounded-lg",
    "py-2",
    "text-sm",
    "font-bold",
    "flex",
    "justify-center",
    "items-center"
  );
  return (
    <button className={btnClass} {...props}>
      {props.icon && props.icon}
      <span>{props.label}</span>
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.node,
  full: PropTypes.bool,
};
