import { useState, useEffect } from 'react'
import './App.css'
const API_URL = import.meta.env.VITE_API_URL;
import BalanceCard from './components/BalanceCard';
import Header from './components/Header'
import PieChart from './components/charts/PieChart'
import Bar from './components/charts/Bar'
import Line from './components/charts/Line'

function App() {
  // const [transactions, setTransactions] = useState([]);

  // useEffect(() => {
  //   fetch(`${API_URL}/transactions`)
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }, []);


  return (
    <div className='bg-gradient-to-br from-slate-50 to-slate-100 p-6'>
      <Header></Header>
      <BalanceCard></BalanceCard>
      {/*<Transactions></Transactions> */}
      <PieChart data={[
        { value: 12500, name: 'Electrónica' },
        { value: 8300, name: 'Ropa' },
        { value: 6200, name: 'Alimentos' },
        { value: 4800, name: 'Hogar' },
        { value: 3200, name: 'Deportes' }
      ]}></PieChart>
      <Bar></Bar>
      <Line></Line>
    </div>
  )
}

export default App
