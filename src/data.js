export default {
  tasks: {
    task1: { id: "task1", title: "Task 1", description: "Task 1 description" },
    task2: { id: "task2", title: "Task 2", description: "Task 2 description" },
    task3: { id: "task3", title: "Task 3", description: "Task 3 description" },
    task4: { id: "task4", title: "Task 4", description: "Task 4 description" },
    task5: { id: "task5", title: "Task 5", description: "Task 5 description" },
    task6: { id: "task6", title: "Task 6", description: "Task 6 description" },
  },
  lists: {
    list1: {
      id: "list1",
      title: "Todo",
      tasks: ["task1", "task2", "task3", "task4", "task5", "task6"],
    },
    list2: {
      id: "list2",
      title: "In Progress",
      tasks: [],
    },
    list3: {
      id: "list3",
      title: "Done",
      tasks: [],
    },
  },

  listOrder: ["list1", "list2", "list3"],
};
