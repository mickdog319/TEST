import React, {useState} from 'react';
import './App.css';

function App() {
  
  const MyComponent = (props) => (<h3><button onClick={props.click}>Click for Your Weather Based Stock Prediction!</button></h3>)
  
  const apiKey = '4f25502ce67ce21c020ffe855e56ed5b'
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  
  const [stock, setStock] = useState("");  
  const [openstock, setOpenstock] = useState("")

  function fetchStock(){
    const API_KEY = 'T9YF0ECIYKXDFK4V';
    const StockSymbol = stock;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    fetch(API_Call)
    .then(
        function(response) {
            return response.json();
        }
            )
  .then(
        function(data) {
            
            for (var key in data['Time Series (Daily)']) {
               setOpenstock( data['Time Series (Daily)'][key]['1. open']);
             // break;
            }
        }
    )
}

  return (
    <div className="container">
        <div>      
       <input 
       className="input" 
       placeholder="Enter City Here..."
       onChange={e => setCity(e.target.value)}
       value={city}
       ></input>
       
       <input 
       className="inputStock" 
       placeholder="Enter Stock Here..."
       onChange={f => setStock(f.target.value)}
       value={stock}
       ></input>
        </div>

       <MyComponent click={() => 
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
        .then(response => response.json()) 
        .then(data => {
          setWeatherData(data)
        setCity("")
       }).then(fetchStock())
      
      } />
       
     {typeof weatherData.main === 'undefined' ? (
      <div>
        <p> Welcome To Weather Stock Picker!</p>
        <p> Remember, Check Your Spelling ! </p>
         </div>

):(
    <>
    <p className='weather-data'>

      <p className='city'>{weatherData.name}</p>
      <p className='temp'>{Math.round(weatherData.main.temp)}°F </p>
      <p className='weather'>{weatherData.weather[0].main}</p>
    
    </p>
    <p className='stock-data'> 
     <p className='stock'>{stock}</p>
     <p className='openstock'>${openstock}</p>

     <p className='prediction'>{weatherData.main.temp >= 85 ? "Your stock prediction: Stocks are HOT! Buy!" : "Your stock prediction: Stocks are freezing, HOLD!"}</p> 

</p></>
  )}
 

     
</div>
  )}
export default App


