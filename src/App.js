
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Pages/Login';
import Dash from './Pages/Dash';
import ProjectView from './Pages/ProjectView';
import ViewDetauils from './Pages/ViewDetauils';

function App() {
  return (
    <div className="App">
      
  <Routes>
      
   <Route path='/' element={<Home></Home>}></Route>
   <Route path='/login' element={<Login  ></Login>}></Route>
  <Route path='/register' element={<Login register ></Login>}></Route>
  <Route path='/dash' element={<Dash></Dash>} ></Route>
  <Route path='/singleview' element={<ProjectView></ProjectView>} ></Route>  
  <Route path='/viewDeatils' element={<ViewDetauils></ViewDetauils>} ></Route>  
  </Routes>
          <Footer></Footer>
    </div>
  );
}

export default App;
