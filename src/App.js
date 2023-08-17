import React, {useState} from 'react';
import './App.css';

function App() {
  
  const apiKey = '4f25502ce67ce21c020ffe855e56ed5b'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState("")

  const getWeather = (event) => {
    if (event.key == "Enter")
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
      .then(response => response.json()) 
      .then(data => {setWeatherData(data)})
  }

  return (
    <div className="container">
       <input 
       className="input" 
       placeholder="Enter City..."
       onChange={e => setCity(e.target.value)}
       value={city}
       onKeypress={getWeather}
       />

     
    </div>
  );
}

export default App;
