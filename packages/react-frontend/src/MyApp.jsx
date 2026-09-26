// src/MyApp.jsx

import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

const characters = [
  {
    name: "Charlie",
    job: "Janitor",
  },
  {
    name: "Mac",
    job: "Bouncer",
  },
  {
    name: "Dee",
    job: "Aspring actress",
  },
  {
    name: "Dennis",
    job: "Bartender",
  },
];

function MyApp() {
  const [characters, setCharacters] = useState([]);


  function removeOneCharacter(id) {
    delUser(id)
      .then((response) => {
        if (response.status === 204){
          const updated = characters.filter((character) => character._id !== id);
          setCharacters(updated);
        }
        else {
          console.log("couldn't dellete")
        }
      })
      .catch((error) => console.log(error));

  }


  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  // help
  function delUser(id) {
    const promise = fetch("http://localhost:8000/users/" + id, {
      method: "DELETE",
    });
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json().then((newUser) => {
            setCharacters([...characters, newUser]);
          });
        } else{
            console.log("could not insert")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((text) => {
        console.log("RAW RESPONSE:", text);
        const json = JSON.parse(text);
        setCharacters(json["users_list"]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
  );

}

export default MyApp;