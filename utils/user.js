const users = [];

const addUser = ({ id, name, room }) => {
  console.log(id, name, room);

  if (!name && !room) {
    return { error: "User Name And Room are Required" };
  }
  let existingUser = users.find(
    (user) => user.name === name && user.room === room
  );
  if (existingUser) {
    return { error: "User Name Has Already Taken" };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUserInRoom };
