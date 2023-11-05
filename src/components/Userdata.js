import React, { useState, useReducer } from 'react';
import "../style/user.css"

const initialdata = [
  { id: 1, Name: "Raj", Age: 12, BloodGroup: "B+ve", Email: "raj123@jamil.com", Phone: 9836372212 },
  { id: 2, Name: "Naren", Age: 24, BloodGroup: "O+ve", Email: "Naren98@jamil.com", Phone: 9836456244 },
  { id: 3, Name: "Pranav", Age: 33, BloodGroup: "A+ve", Email: "Pranav2314@jamil.com", Phone: 8837362999 },
  { id: 4, Name: "Balu", Age: 15, BloodGroup: "B-ve", Email: "Baliwest213@jamil.com", Phone: 7812993330 },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      if (state.length === 0)
        return [{ id: 1, Name: action.Name, Age: action.Age, BloodGroup: action.BloodGroup, Email: action.Email, Phone: action.Phone }];
      else
        return [...state, { id: state[state.length - 1].id + 1, Name: action.Name, Age: action.Age, BloodGroup: action.BloodGroup, Email: action.Email, Phone: action.Phone }];
    case "DELETE_DATA":
      return state.filter((item) => item.id !== action.id);
    case "UPDATE_DATA":
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            Name: action.Name || item.Name,
            Age: action.Age || item.Age,
            BloodGroup: action.BloodGroup || item.BloodGroup,
            Email: action.Email || item.Email,
            Phone: action.Phone || item.Phone
          };
        }
        return item;
      });
    default:
      return state;
  }
}

function Userdata() {
  const [studentdata, dispatch] = useReducer(reducer, initialdata);
  const [stdname, setName] = useState("");
  const [stdage, setAge] = useState("");
  const [blood, setBlood] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const handleAddClick = () => {
    if (updateId !== null) {
      dispatch({ type: "UPDATE_DATA", id: updateId, Name: stdname, Age: stdage, BloodGroup: blood, Email: email, Phone: phone });
      setUpdateId(null);
    } else {
      dispatch({ type: "ADD_DATA", Name: stdname, Age: stdage, BloodGroup: blood, Email: email, Phone: phone });
    }

    setName("");
    setAge("");
    setBlood("");
    setEmail("");
    setPhone("");
  }

  const handleUpdateClick = (id) => {
    const itemToUpdate = studentdata.find((item) => item.id === id);
    if (itemToUpdate) {
      setName(itemToUpdate.Name);
      setAge(itemToUpdate.Age);
      setBlood(itemToUpdate.BloodGroup);
      setEmail(itemToUpdate.Email);
      setPhone(itemToUpdate.Phone);
      setUpdateId(id);
    }
  }

  return (
    <div className='user-data'>
      <h1>User Data</h1>
      <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} value={stdname} />
      <input type='text' placeholder='Enter Age' onChange={(e) => setAge(e.target.value)} value={stdage} />
      <input type='text' placeholder='Enter BloodGroup' onChange={(e) => setBlood(e.target.value)} value={blood} />
      <input type='text' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <input type='text' placeholder='Enter Phone' onChange={(e) => setPhone(e.target.value)} value={phone} />
      <button onClick={handleAddClick}>Add/Update</button>

      <table className="user-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Blood Group</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentdata.map((item) => (
            <tr key={item.id} className='"user-row"'>
              <td>{item.id}</td>
              <td>{item.Name}</td>
              <td>{item.Age}</td>
              <td>{item.BloodGroup}</td>
              <td>{item.Email}</td>
              <td>{item.Phone}</td>
              <td>
                <button className="Delete-Button" onClick={() => dispatch({ type: "DELETE_DATA", id: item.id })}>Delete</button>
                <button onClick={() => handleUpdateClick(item.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Userdata;
