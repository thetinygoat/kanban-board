import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function TextArea(props) {
  const textAreaClass = classNames(
    {
      "w-full": props.full,
    },
    "text-sm",
    "p-2",
    "rounded-lg",
    "my-1"
  );
  return <textarea className={textAreaClass} {...props} />;
}

TextArea.propTypes = {
  full: PropTypes.bool,
};
