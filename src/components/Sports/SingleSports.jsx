import React, { useEffect, useState } from "react";
import SportsListItem from "./SportsListItem";
import axios from "axios";


function SingleSports() {
    const [singleSports, setSingleSports] = useState([]);
  
    useEffect(() => {
        axios.get('/api/sports/singlesports')
        .then(response => {
            setSingleSports(response.data);
        })
        .catch(error => {
            console.error('Error fetching single sports: ', error);
        })
    }, []);
  
    return (
      <div>
        <h2>Solo Sports</h2>
        <ul>
        {singleSports.map(sport => (
          <SportsListItem key={sport.id} sport={sport} />
        ))}
        </ul>
      </div>
    );
  }
  
  export default SingleSports;