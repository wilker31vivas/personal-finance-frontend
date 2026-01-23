import { useState, useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL;
import BalanceCard from './components/BalanceCard';
import Header from './components/Header'
import ChartsCards from './components/ChartsCards'



function App() {
  // const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   fetch(`${API_URL}/transactions`)
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }, []);


  return (
    <div className='flex flex-col bg-body p-6 gap-4'>
      <Header></Header>
      <BalanceCard></BalanceCard>
      {/*<Transactions></Transactions> */}
      <ChartsCards></ChartsCards>
    </div>
  )
}

export default App
