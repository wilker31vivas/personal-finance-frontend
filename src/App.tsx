import Dashboard from "./pages/Dashboard"
import { DashboardContextProvider } from "./context/DashboardContext"

function App() {
  return (
    <div className='flex flex-col bg-body p-6 gap-4'>
      <DashboardContextProvider>
        <Dashboard></Dashboard>
      </DashboardContextProvider>
    </div>
  )
}

export default App
