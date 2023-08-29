import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbared from './components/Navbar';
import "../src/style/Style.css"


function App() {
  const [item, setItem] = useState({});
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [colour, setColour] = useState("");

  const fetchData = async () => {
    const response = await fetch("https://crudcrud.com/api/637e8ddebb7d4f53ae81a2d967290865/unicorns");
    const jsonData = await response.json();
    setData(jsonData);
  };

  const handleAdd = async () => {
    if (name === "" || age === "" || colour === "") {
      alert("Please fill all the fields");
      return;
    }

    const response = await fetch("https://crudcrud.com/api/637e8ddebb7d4f53ae81a2d967290865/unicorns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: age,
        colour: colour,
      }),
    });

    if (response.status === 201) {
      setName("");
      setAge("");
      setColour("");
      await fetchData();
    }
  };

  const handleEdit = async () => {
    if (!item._id) {
      return; // Cannot edit without a valid _id
    }

    const response = await fetch(`https://crudcrud.com/api/637e8ddebb7d4f53ae81a2d967290865/unicorns/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: age,
        colour: colour,
      }),
    });

    if (response.status === 200) {
      setName("");
      setAge("");
      setColour("");
      setItem({});
      await fetchData();
    }
  };

  const handleDelete = async (item) => {
    await fetch(`https://crudcrud.com/api/637e8ddebb7d4f53ae81a2d967290865/unicorns/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetchData();
  };

  return (
    <div className="App">
      <Navbared />
      <div className='design'>
      <button className='button1' onClick={fetchData}>View Data</button>
      </div>
      <div>
        <form>
          <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} value={name} /><br />
          <input type="text" placeholder="age" onChange={(e) => setAge(e.target.value)} value={age} /><br />
          <input type="text" placeholder="colour" onChange={(e) => setColour(e.target.value)} value={colour} /><br />
          {item._id ? <button className='button2' onClick={handleEdit}>Edit</button> : <button className='button3' onClick={handleAdd}>Submit</button>}
        </form>
       
      </div>
      {data.map((item) => (
        <div key={item._id}>
          <h1>{item.name}</h1>
          <p>
            Age: {item.age} <br />
            Colour: {item.colour}<br />
            <button className='button5'onClick={() => {
              setName(item.name);
              setAge(item.age);
              setColour(item.colour);
              setItem(item);
            }}>
              Edit
            </button>
            <button className='button4' onClick={() => handleDelete(item)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
