import { useState } from 'react';
import './App.css';
import Home from './Component/Home';
import Login from './Component/Login';
import USerUI from './Component/UserUI';

const API_URL = 'http://localhost:3001/'

function App() {
  //get time for every day info
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth()+1
  const date = time.getDate()
  const miliSec = Date.now()

  const [account, setAccount] = useState('')
  const [login, setLogin] = useState('home')
  const [data, setData] = useState([])
  const [timeData, setTimeData] = useState({
    time: time, year: year, month: month, date: date,miliSec:miliSec
  })


  const isLogin = (page)=>{
    setLogin(page)
  }

  const IsAccountRegistered = (accountUserName, dataForUser) => {
    setAccount(accountUserName)
    setData(accountUserName)
    const data = {
      water:'2 cup',
      step:'3000'
    }
    setData(data)
  }



  return (
    <div className="App">
      {login === 'home' ? <Home isLogin={isLogin}/> : <Login IsAccountRegistered={IsAccountRegistered} API_URL={API_URL}/>}
      {account ? <USerUI data={data}/> : <></>}
      {/* <USerUI data={data} timeData={timeData}/> */}
    </div>
  );
}

export default App;
