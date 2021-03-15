import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="border p-2 mb-4 rounded-lg bg-white shadow-sm"
        >
          <h3 className="font-bold text-sm">{task.title}</h3>
          <p className="text-gray-500 text-sm">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
