import './App.css';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import About from "./pages/About"
import Home from "./pages/Home"
import Nav from "./Nav"
import AddPet from "./pages/AddPet"

function App() {
  const [pets, setPets] = useState([
    // {
    //     id: 1,
    //     name: 'Ali',
    //     age: 2,
    //     img: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
    //     isFavorite: true,
    // },
    // {
    //     id: 2,
    //     name: 'Kippo',
    //     age: 3,
    //     img: 'https://images.unsplash.com/photo-1553736026-ff14d158d222?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    //     isFavorite: true,
    // },
    // {
    //     id: 3,
    //     name: 'Pinam',
    //     age: 2,
    //     img: 'https://images.unsplash.com/photo-1612258644055-d0ed1fa446f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    //     isFavorite: false,
    // }
]) 

const removePet = async (id) =>{
  // console.log("remove pet", id);
  // setPets(pets.filter((pet) => pet.id !== id));
  const res = await fetch(
    `https://607e7aad02a23c0017e8b5aa.mockapi.io/pet/${id}`,
    {
      method: "DELETE",
    }
  );

  res.status === 200
  ? setPets(pets.filter((pet)=> pet.id !== id))
  : alert("Delete Failed");
}

const fetchPet = async (id) =>{
  const res =  await fetch(
    `https://607e7aad02a23c0017e8b5aa.mockapi.io/pet/${id}`
  )
  const data = await res.json();
  return data;
}

const isFavorite = async (id) =>{
  // console.log("Favorite pet", id);
  // setPets(pets.map((pet) => pet.id === id ? {...pet, isFavorite: !pet.isFavorite} : pet))
  const putToFavorite =  await fetchPet(id);
  const updateFavorite = {
    ...isFavorite,
    isFavorite: !putToFavorite.isFavorite,
  };

  const res = await fetch(
    `https://607e7aad02a23c0017e8b5aa.mockapi.io/pet/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateFavorite),
    }
  );

  const data = await res.json();

  setPets(
    pets.map((pet)=>
      pet.id === id ? { ...pet, isFavorite: data.isFavorite } : pet
    )
  );
   
}

const addPet = async (pet) =>{
  console.log(pet);
  // const id = pets.length + 1;
  // const newPet = { id, ...pet};
  // setPets([ ...pets, newPet]);

  const res = await fetch(
    'https://607e7aad02a23c0017e8b5aa.mockapi.io/pet',
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pet),
    }
  );

  const data = await res.json();
  setPets([...pets, data])



}

useEffect(()=>{
  const getPets = async () =>{
    const pets = await fetchPets();
    setPets(pets);
  }
  getPets();
}, []);

const fetchPets = async () =>{
  const res = await fetch('https://607e7aad02a23c0017e8b5aa.mockapi.io/pet');
  const data = await res.json();
  return data;
}



  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          <Route exact
           path="/" 
           component={ ()=>[ <AddPet onAdd={addPet} />,
            <Home pets={pets} onRemove={removePet} onFavorite={isFavorite} /> ]} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
