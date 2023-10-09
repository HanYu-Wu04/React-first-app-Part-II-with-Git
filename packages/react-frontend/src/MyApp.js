// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

function removeOneCharacter (id){
  console.log('Deleting User with Id: ' + id);
  fetch(`http://localhost:8000/users/${id}`, {
    method: 'DELETE',
  })
  .then((response) => {
    if (response.status === 204){
      setCharacters((prevCharacterss) =>
        prevCharacterss.filter((characters) => characters.id !== id)
      );
    } else if (response.status === 404){
      console.error('User not found.');
    } else {
      console.error('Delete operation failed with status code ' + response.status);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

  /*function updateList(person){
    setCharacters([...characters, person]);
  }*/

  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201){
          response.json().then((newUser) => {
            setCharacters([...characters, newUser]);
          });
        } else {
          console.error('User creation failed with status code ' + response.status);
        }
      })
      .catch((error) => {
        console.log(error);
      })
}

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  return (
    <div className="container">
      <Table characterData={characters} 
              removeOneCharacter={removeOneCharacter}/>
              <Form handleSubmit={updateList}/>
    </div>
  );
}

export default MyApp;