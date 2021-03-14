import React from "react";
import PropTypes from "prop-types";
export default function ButtonGroup({ children }) {
  return <div className="flex py-2 justify-between">{children}</div>;
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
};
