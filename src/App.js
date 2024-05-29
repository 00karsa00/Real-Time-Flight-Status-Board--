import './App.css';
import { Route, Routes } from 'react-router-dom';
import FlightList from './pages/FlightList';
import FlightDetails from './pages/FlightDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<FlightList />} />
        <Route path='/flight/:id' element={<FlightDetails />} />
      </Routes>
    </>
  );
}

export default App;
