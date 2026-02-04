import Dashboard from "./pages/Dashboard"
import { DashboardContextProvider } from "./context/DashboardContext"
import { TransactionsContextProvider } from "./context/TransactionsContext"
import Transactions from "./pages/Transactions"

function App() {
  return (
    <div className='flex flex-col bg-body'>
      {/* <DashboardContextProvider>
        <Dashboard></Dashboard>
      </DashboardContextProvider> */}
      <TransactionsContextProvider>
        <Transactions></Transactions>
      </TransactionsContextProvider>
    </div>
  )
}

export default App
