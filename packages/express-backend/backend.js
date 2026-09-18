// backend.js
import express from "express";
import cors from "cors";

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

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

// fix this part
const generateRandId = () => {
  return Math.round(Math.random() * 10000000).toString();
};


app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// task 7 - p2
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job

  let result = users["users_list"]
  if (name != undefined) {
    result = result.filter((user) => user["name"] === name);
  } 
  if (job != undefined){
    result = result.filter((user) => user["job"] === job);
  }


  res.send({users_list: result});

});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd.id = generateRandId();
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

// task 7 - p1
app.delete("/users/:id", (req, res) => {
    const id = req.params.id; //or req.params.id
    let user = findUserById(id);

    if (user === undefined) {
        res.status(404).send("Resource not found.");
    } else {
        users["users_list"] = users["users_list"].filter((user) => user.id !== id);
        res.status(204).send();
        // just delete ,,,,
    }

});



