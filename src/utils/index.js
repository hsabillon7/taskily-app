export function getProjectTotalPercent(tasks) {
  let doneTasks = 0;

  if (tasks.length) {
    tasks.forEach((task) => {
      if (task.done) doneTasks += 1;
    });

    return ((doneTasks / tasks.length) * 100).toFixed(0);
  }

  return 0;
}
