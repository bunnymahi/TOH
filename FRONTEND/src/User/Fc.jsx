import React, { useState } from 'react';
import axios from 'axios';

const Fc = () => {
  const [result, setResult] = useState(null);
  const percentage =(crackedTires,normalTires)=>{
    return (crackedTires / (crackedTires+normalTires))*100;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/fortnightCheck");
      setResult(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Fortnight Check</h1>

      <button onClick={fetchData}>Click Here</button>

      {result && result.crackedTires && (
        <div>
          <h2>Result:</h2>
          <p>Cracked Tires: {result.crackedTires}</p>
          <p>Normal Tires:{result.normalTires}</p>
          <p>percentage : {percentage(result.crackedTires,result.normalTires)}</p>
          {/* Add other properties as needed */}
        </div>
      )}
    </div>
  );
};

export default Fc;
