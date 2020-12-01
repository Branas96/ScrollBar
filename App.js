import React, { useEffect, useState} from 'react'


import './App.css';
 

function GetRequest() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("https://api.hatchways.io/assessment/students").then(res => res.json()).then(setData).catch(console.error);
  },[]);
  return data;
}


function SearchBar(){
    const people = GetRequest();
    console.log(people);
    const list = List();
    const [searchTerm, setSearchTerm] = useState("");
    const handleChange = event => {
      setSearchTerm(event.target.value);
    };
    const results= !searchTerm
    ? people
    : people.filter(person =>
        person.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );
   
    return(
      <div>
        <input class="bar"type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange} 
         />
        <div>
        {results.map(item => (
          <p>{item}</p>
        ))}
          {list}
        </div>
      </div>
    );
}
function List(){
  const data = GetRequest();
  console.log(data);
  if(GetRequest()){
    const list = data.students.map(item => {
    const avg = item.grades.reduce((sum, curr) => sum + Number(curr), 0) /
    item.grades.length;
      return(
      <div class="box">
        <div class="imgBx">
          <img  src={item.pic} alt="Avatar" style={{height: "120px"}}></img>
        </div>
          <div class="content">
            <h1>{item.firstName} {item.lastName}</h1>
            <p>
            Email: {item.email}<br />
            Company: {item.company}<br />
            Skill: {item.skill}<br />
            Average: {avg}
            </p>
          </div>  
      </div>
    )})
    return(
        <div class="body">
          {list}
          </div>
      );
    }
  return null;
}

export default List;
