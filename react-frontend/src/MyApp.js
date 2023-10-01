// src/MyApp.js
import React, { useState } from "react";
import Table from "./Table";

function MyApp() {
  const [characters, setCharacters] = useState([
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
  ])

  function removeOneCharacter (index){
    const updated = characters.filter((charater, i) => {
      return i !== index
    });
    setCharacters(updated);
    }

  return (
    <div className="container">
      <Table characterData={characters} 
              removeOneCharacter={removeOneCharacter}/>
    </div>
  );
}

export default MyApp;