import axios from 'axios';
import { useState, useEffect } from 'react';
import SelectCategories from "./SelectCategories";

import './styles.css';

export default function Lobby(props) {

  const [cats, setCats] = useState(null)
  useEffect(() => {
      axios.get("/api/categories")
    .then(res => {
      setCats(res.data.categories)
    })
    .catch(err => {
      console.log(err.message)
    })
  }, []);
  
  //first request is always null, fix .get() above? 
  console.log("~~~~~~ in Lobby get", cats)

  return (
    <div className="lobby-main">
      {cats && <SelectCategories categories={cats}/>}
      
    </div>
  );
};