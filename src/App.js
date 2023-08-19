import React, {useState} from 'react';
//import Stock from './Stock';
import './App.css';

function App() {

  const MyComponent = (props) => (<p onClick={props.click}>Click Me</p>)
  
  const apiKey = '4f25502ce67ce21c020ffe855e56ed5b'
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  
  const [stock, setStock] = useState("");  
  const [price, setPrice] = useState("")
  
  let openstock; 




  function fetchStock(){
    const pointerToThis = this;
    console.log(pointerToThis);
    const API_KEY = 'T9YF0ECIYKXDFK4V';
    const StockSymbol = stock;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    //let stockChartXValuesFunction = [];
    //let stockChartYValuesFunction = [];
    fetch(API_Call)
    .then(
        function(response) {
            return response.json();
        }
            //.then(data => {

              //  was set to stock, setStock
             // price(data)
           // setPrice("")
            //}
            )
          
          
    

    .then(
        function(data) {
            
            
           // var keys = data['Time Series (Daily)'];

           
            
            for (var key in data['Time Series (Daily)']) {
              openstock = data['Time Series (Daily)'][key]['1. open'];
              break;
            }
            alert(openstock);
            setStock("");
              
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

       <input 
       className="openstock" 
       placeholder=""
       onChange={g => openstock(g.target.value)}
       value={openstock}
       ></input>


        </div>



       <MyComponent click={() => 
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`)
        .then(response => response.json()) 
        .then(data => {
          setWeatherData(data)
        setCity("")
       }).then(fetchStock)} />


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
            <p className='price'>{openstock}</p>

      </div>
    

</div>


  )}
    

  

export default App
