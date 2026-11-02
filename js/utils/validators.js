export function isArrayOfTasks(data) {
  if (!Array.isArray(data)) return false;
  return data.every(task => 
    task && 
    typeof task.id === 'number' || task.id === undefined && 
    typeof task.text === 'string' && 
    typeof task.completed === 'boolean'
  );
}
