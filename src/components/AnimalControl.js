import React, { useEffect, useState } from "react";

function AnimalControl() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animalsList, setAnimalsList] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8492/api/animals/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        setAnimalsList(jsonifiedResponse);
        console.log(jsonifiedResponse)
        setIsLoaded(true);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoaded(true);
      });
  }, [])

  const sortedAnimals = animalsList.sort((a, b) => a.Name - b.Name);


  if (error) {
    return <h1>Error: {error}</h1>
  } else if (!isLoaded) {
    return <h1>...Loading...</h1>
  } else {
    return (
      <React.Fragment>
        <h1>Animals in the Shelter</h1>
        <ul>
          {animalsList.map((animal) =>
          <li key={animal.AnimalId}>
            <h3>Oi! {animal.Name}</h3> 
            <p>Species: {animal.Species}</p>
            <p>Age: {animal.Age}</p>
          </li>
          )}
        </ul>
      </React.Fragment>
    );
  }
}

export default AnimalControl;