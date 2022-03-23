let users = require("../mocks/user");

module.exports = {
  findAll(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === "desc") {
        return a.id < b.id ? 1 : -1;
      }

      return a.id > b.id ? 1 : -1;
    });

    response.send(200, sortedUsers);
  },
  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === Number(id));

    if (!user) {
      response.send(400, { error: "User not Found" });
    } else {
      response.send(200, user);
    }
  },
  createUser(request, response) {
    const { body } = request;
    const lastUserId = users[users.length - 1].id;
    const newUser = {
      id: lastUserId + 1,
      name: body.name,
    };

    users.push(newUser);

    response.send(200, newUser);
  },
  deleteUser(request, response) {
    let { id } = request.params;
    id = Number(id);
    users = users.filter((user) => user.id !== id);

    response.send(200, { deleted: true });
  },
  updateUser(request, response) {
    let { id } = request.params;
    const { name } = request.body;

    id = Number(id);

    let userExists = users.find((user) => user.id === id);

    if (!userExists) {
      return response.send(400, { error: "User not Found" });
    }

    users = users.map((user) => {
      if (user.id === id) {
        userExists = {
          ...user,
          name,
        };
        return userExists;
      }
      return user;
    });

    response.send(200, userExists);
  },
};
