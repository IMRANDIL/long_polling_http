import React, { useState, useEffect } from 'react';

const LongPolling = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/data');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        fetchData(); // Trigger the next request immediately after receiving a response
      }
    };

    fetchData(); // Start the long polling process
  }, []);

  return (
    <div>
      <h1>Long Polling Example</h1>
      {!data ? 'Loading...' : (<p>Data from the server: {data}</p>)}
    </div>
  );
};

export default LongPolling;
