import type { Task, TaskBoard, TaskGroup } from "../service";

export const formatTasks = (board: TaskBoard, tasks: Task[]) => {
  let ptasks: { [_: string]: Task[] } = {};

  (board.groups || []).forEach((group: TaskGroup) => {
    ptasks[group.slug] = tasks.filter((v) => v.group === group.slug);
  });

  const uncat = [];

  tasks.forEach((v) => {
    if (ptasks[v.group]) {
      return;
    }
    uncat.push(v);
  });

  ptasks["Uncatorized"] = uncat;
  return ptasks;
};
