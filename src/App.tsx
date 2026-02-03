import Dashboard from "./pages/Dashboard"
import { DashboardContextProvider } from "./context/DashboardContext"
import Transactions from "./pages/Transactions"

function App() {
  return (
    <div className='flex flex-col bg-body'>
      {/* <DashboardContextProvider>
        <Dashboard></Dashboard>
      </DashboardContextProvider> */}
      <Transactions></Transactions>
    </div>
  )
}

export default App
