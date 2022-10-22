const taskFactory = (title, description, date, isPriority) => {
  let DOMlink;
  return { title, description, date, priorityStatus: isPriority, DOMlink };
};
export default taskFactory;
