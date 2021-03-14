import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

export default function Input(props) {
  const inputClass = classNames(
    {
      "w-full": props.full,
    },
    "text-sm",
    "p-2",
    "rounded-lg",
    "my-1"
  );
  return <input className={inputClass} {...props} />;
}

Input.propTypes = {
  full: PropTypes.bool,
};
