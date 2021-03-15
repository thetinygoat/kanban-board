import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../hooks/zustand";
import { HiPlusCircle, HiXCircle } from "react-icons/hi";
import { Button } from "./Button";
import ButtonGroup from "./ButtonGroup";
import Input from "./Input";

export default function AddList() {
  const { data, updateData } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState("");
  const handleAddList = () => {
    // check if list title is empty to avoid lists with empty title
    let title = listName.trim();
    if (title === "") return;
    // create a new list and update the state
    const newList = {
      id: uuidv4(),
      title,
      tasks: [],
    };
    const newListOrder = [...data.listOrder, newList.id];
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [newList.id]: newList,
      },
      listOrder: newListOrder,
    };
    console.log(newState);
    // reset UI state
    updateData(newState);
    setIsAdding(false);
    setListName("");
  };
  return (
    <div className="w-72 bg-gray-100 mt-4 p-2 rounded-lg mr-2">
      {!isAdding && (
        <Button
          onClick={() => setIsAdding(true)}
          label="Add list"
          full
          icon={<HiPlusCircle className="mr-2" size={18} />}
        />
      )}
      {isAdding && (
        <div>
          <Input
            type="text"
            name="list_name"
            placeholder="New list name"
            full
            value={listName}
            autoFocus
            onChange={(e) => setListName(e.target.value)}
          />
          <ButtonGroup>
            <Button
              type="success"
              onClick={handleAddList}
              label="Add"
              icon={<HiPlusCircle className="mr-2" size={18} />}
            />
            <Button
              type="danger"
              onClick={() => {
                setIsAdding(false);
                setListName("");
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
