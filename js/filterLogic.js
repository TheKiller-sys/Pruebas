export function filterTasks(tasks, filter) {
  if (!tasks || tasks.length === 0) return [];
  
  switch (filter) {
    case 'active':
    case 'pending':
      return tasks.filter(task => !task.completed);
    case 'completed':
      return tasks.filter(task => task.completed);
    case 'all':
    default:
      return [...tasks];
  }
}
