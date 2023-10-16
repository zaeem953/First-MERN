import Footer from './components/Footer'
import Nav from './components/Nav'
import { BrowserRouter, Route,  Routes } from 'react-router-dom'
import SignUp from './components/SignUp'
import "../src/App.css"


function App() {

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Nav/>
          <Routes>
            <Route path="/" element={<h1>From Products components</h1>}/>
            <Route path="/add" element={<h1>From Add Products components</h1>}/>
            <Route path="/update" element={<h1>From Update Products components</h1>}/>
            <Route path="/logout" element={<h1>From Logout components</h1>}/>
            <Route path="/profile" element={<h1>From Profile components</h1>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
