import React, {useState} from 'react';
import './App.css';

function App() {

  const MyComponent = (props) => (<p onClick={props.click}>Click Me</p>)
  
  const apiKey = '4f25502ce67ce21c020ffe855e56ed5b'
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("Dallas");
  
  const [stock, setStock] = useState("IBM");  
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
            
            
           // var keys = data['Time Series (Daily)'];

           
            
            for (var key in data['Time Series (Daily)']) {
              //alert(data['Time Series (Daily)'][key]['1. open']);
              setOpenstock( data['Time Series (Daily)'][key]['1. open']);
              //alert(openstock);
              break;
            }
           // alert(openstock);
            //console.log('price', openstock);
           // setStock("");
            //setWeatherData("");
            //setCity("");
              
        }
    )

    
}





  
  return (
    <div className="container">
        <div>      
       <input 
       className="input" 
       placeholder="Enter City, Click the 'Click Me'..."
       onChange={e => setCity(e.target.value)}
       value={city}
       ></input>

       
       <input 
       className="inputStock" 
       placeholder="Enter Stock, Click the 'Click Me'..."
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
       //.then(ret => setOpenstock(ret))
       //.then (alert(openstock))
       
       } />


     {typeof weatherData.main === 'undefined' ? (
      <div>
        <p> Welcome To Weather Stock Picker!</p>
        <p> Check Spelling ! </p>
        
        
         </div>
  ):(
    <div className='weather-data'>
      <p className='city'>{weatherData.name}</p>
      <p className='temp'>{Math.round(weatherData.main.temp)}°F</p>
      <p className='weather'>{weatherData.weather[0].main}</p>
    
      
      
    </div>
    
  )}
    
      <div className='stock-data'> 
            <p className='stock'>{stock}</p>
            <p className='openstock'>{openstock}</p>

      </div>
    

</div>


  )}
    

  

export default App
