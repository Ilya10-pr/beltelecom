import './App.css';
import LayoutTop from './components/LayoutTop/LayoutTop';
import PackagesContainer from './components/Packages/PackagesContainer';
import SectionLinks from './components/SectionLinks/SectionLinks';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import Operation from './components/ServiceInform/Operation/Operation';
import Record from './components/ServiceInform/InfoUser/InfoUser';
import { services } from './helpers/itemLink';
import Timetable from './components/ServiceInform/Timetable/Timetable';
import Ticket from "./components/ServiceInform/Ticket/Ticket"
import NavStepper from './components/ServiceInform/NavStepper';

const App = () => {
  const url = useLocation()
  const path = url.pathname.split("/")[2]
  console.log(path)
  return (
        <div className="App">
              <LayoutTop />
              {url.pathname.includes("service")? <NavStepper /> : <SectionLinks />}
          <Routes>
              <Route path={"/home/" + path} element={<PackagesContainer service={services[path]} />  } />
              <Route path="/service/operation" element={<Operation /> } />
              <Route path="/service/date" element={<Timetable /> } />
              <Route path="/service/info" element={<Record /> } />
              <Route path="/service/ticket" element={<Ticket /> } />
          </Routes>
        </div>
    
  );
}

export default App;
