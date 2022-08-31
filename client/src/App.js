import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar';
import PokeCards from './pages/PokeCards';
import EditPokeCards from './pages/EditPokeCards';
import PokeBuy from './pages/PokeBuy';
//import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/pokecards' element={<PokeCards />} />
        <Route path='/pokebuy' element={<PokeBuy />} />
        

        {/* <Route 											
          path='/pokecards'
          element={
            <ProtectedRoute redirectTo='/login'>
              <PokeCards />
            </ProtectedRoute>
          }
        /> */}


        {/* <Route path='/pokecards' element={<PokeCards/>}/> */}

        <Route path='/pokecards/edit/:id' element={<EditPokeCards />} /> 

      </Routes>
    </div>
  );
}

export default App;