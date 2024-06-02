// https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
// Generate unique id
const getId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

export default getId;
