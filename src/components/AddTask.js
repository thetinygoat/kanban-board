import React, { useState } from "react";
import PropTypes from "prop-types";
import { useData } from "../hooks/zustand";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./Button";
import { HiPlusCircle, HiXCircle } from "react-icons/hi";
import ButtonGroup from "./ButtonGroup";
import Input from "./Input";
import TextArea from "./TextArea";

export default function AddTask({ listId }) {
  const { data, updateData } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTaskAdd = () => {
    // check if title is empty to avoid adding empty task
    let cleanedTitle = title.trim();
    if (cleanedTitle === "") return;
    // create a new task
    const newTask = {
      id: uuidv4(),
      title: cleanedTitle,
      description,
    };
    // get the old list.
    // create a new list by adding the new task's id
    const list = data.lists[listId];
    const newList = {
      ...list,
      tasks: [...list.tasks, newTask.id],
    };
    // create a new state object and update the state
    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [newTask.id]: newTask,
      },
      lists: {
        ...data.lists,
        [newList.id]: newList,
      },
    };
    updateData(newState);
    // clear out title and description on addition
    setTitle("");
    setDescription("");
  };
  return (
    <div>
      {!isAdding && (
        <Button
          type="primary"
          onClick={() => setIsAdding(true)}
          label="Add task"
          full
          icon={<HiPlusCircle className="mr-2" size={18} />}
        />
      )}
      {isAdding && (
        <div>
          <Input
            type="text"
            name="task_title"
            placeholder="Task title"
            value={title}
            full
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="Task description"
            value={description}
            full
            onChange={(e) => setDescription(e.target.value)}
          />
          <ButtonGroup>
            <Button
              type="success"
              onClick={handleTaskAdd}
              label="Add"
              icon={<HiPlusCircle className="mr-2" size={18} />}
            />
            <Button
              type="danger"
              onClick={() => {
                setIsAdding(false);
                setDescription("");
                setTitle("");
              }}
              label="Cancel"
              icon={<HiXCircle className="mr-2" size={18} />}
            />
          </ButtonGroup>
        </div>
      )}
    </div>
  );
}

AddTask.propTypes = {
  listId: PropTypes.string,
};
