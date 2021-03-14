import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import AddTask from "./AddTask";
export default function List({ list, tasks, index }) {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div
          className="w-72 mx-4 mt-4 flex flex-col"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h1 className="text-lg font-bold mb-4" {...provided.dragHandleProps}>
            {list.title}
          </h1>

          <Droppable droppableId={list.id}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-full flex-grow bg-gray-100 p-4 rounded-lg"
              >
                {tasks.map((task, index) => (
                  <Task task={task} key={task.id} index={index} />
                ))}
                {provided.placeholder}
                <AddTask listId={list.id} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

List.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  tasks: PropTypes.array,
  index: PropTypes.number,
};
