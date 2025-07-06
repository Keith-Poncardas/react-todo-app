import './App.css'
import reactTodoLogo from './assets/logo.png'
import Alert from './components/Alert'
import Container from './components/Container'
import Navbar from './components/Navbar'
import RootController from './core/RootController'

function App() {

  return (
    <>

      <Alert
        className="m-0 rounded-0 shadow-none p-3"
        emphasizeMsg="New Update!"
        message="Smooth framer motion added"
        Icon={() => (<i className="fas fa-check-circle me-3 mt-1 fs-5"></i>)}
      />

      <Navbar logoUrl={reactTodoLogo} />
      <RootController />
    </>
  )
}

export default App
