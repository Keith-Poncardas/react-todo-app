import './App.css'
import reactTodoLogo from './assets/logo.png'
import Navbar from './components/Navbar'
import RootController from './core/RootController'

function App() {

  return (
    <>
      <Navbar logoUrl={reactTodoLogo} />
      <RootController />
    </>
  )
}

export default App
