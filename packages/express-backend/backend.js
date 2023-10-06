import express from "express";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.use(express.json());


const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const index = users.users_list.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.users_list.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("User not found.");
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let filteredUsers = users.users_list;
  console.log("name and job:", name, job);

  if (name !== undefined && job !== undefined) {
    filteredUsers = filteredUsers.filter(
      (user) => user.name === name && user.job === job
    );
  } else if (name !== undefined) {
    filteredUsers = filteredUsers.filter((user) => user.name === name);
  } else if (job !== undefined) {
    filteredUsers = filteredUsers.filter((user) => user.job === job);
  }

  res.send({ users_list: filteredUsers });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
