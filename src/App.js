import React, { useEffect } from "react";
import List from "./components/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useData } from "./hooks/zustand";
import AddList from "./components/AddList";
import { LOCAL_STORAGE_KEY } from "./constants";

function App() {
  const { data, updateData } = useData();

  useEffect(() => {
    // check if data is present in the local storage
    let storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    // if no saved data found, initialize empty data structure and store it in the local storage
    if (!storedData) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
    // read and parse the stored data
    storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    updateData(storedData);
  }, []);

  const handleOnDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (destination === null) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "column") {
      const newListOrder = Array.from(data.listOrder);
      newListOrder.splice(source.index, 1);
      newListOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        listOrder: newListOrder,
      };
      updateData(newState);
      return;
    }
    const start = data.lists[source.droppableId];
    const finish = data.lists[destination.droppableId];

    if (start === finish) {
      const newTasks = Array.from(start.tasks);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggableId);
      const newList = {
        ...start,
        tasks: newTasks,
      };
      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [newList.id]: newList,
        },
      };

      updateData(newState);
      return;
    }

    const newStartTasks = Array.from(start.tasks);
    const newFinishTasks = Array.from(finish.tasks);

    newStartTasks.splice(source.index, 1);
    newFinishTasks.splice(destination.index, 0, draggableId);

    const newStartList = {
      ...start,
      tasks: newStartTasks,
    };

    const newFinishList = {
      ...finish,
      tasks: newFinishTasks,
    };

    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [newStartList.id]: newStartList,
        [newFinishList.id]: newFinishList,
      },
    };

    updateData(newState);
  };

  return (
    <div className="flex">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          direction="horizontal"
          type="column"
          droppableId="columnDroppable"
        >
          {(provided) => (
            <div
              className="flex items-start"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.listOrder.map((listId, index) => {
                const list = data.lists[listId];
                const tasks = list.tasks.map((taskId) => data.tasks[taskId]);
                return (
                  <List key={list.id} list={list} tasks={tasks} index={index} />
                );
              })}
              {provided.placeholder}
              <AddList />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
