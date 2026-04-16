export const generatePlan = (assignment) => {
  const today = new Date();
  const deadline = new Date(assignment.deadline);

  const days =
    Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)) || 1;

  const tasks = [];

  // 🧠 AI LOGIC SPLIT
  if (days >= 10) {
    tasks.push("Research");
    tasks.push("Outline");
    tasks.push("Writing Draft");
    tasks.push("Editing");
    tasks.push("Final Review");
    tasks.push("Submit");
  } else if (days >= 5) {
    tasks.push("Quick Research");
    tasks.push("Write Draft");
    tasks.push("Edit");
    tasks.push("Submit");
  } else {
    tasks.push("Fast Write");
    tasks.push("Quick Edit");
    tasks.push("Submit");
  }

  // 📅 DISTRIBUTE TASKS ACROSS DAYS
  return tasks.map((task, index) => {
    const taskDate = new Date();
    taskDate.setDate(today.getDate() + index);

    return {
      title: task,
      date: taskDate,
    };
  });
};