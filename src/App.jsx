import './App.css';
import LayoutTop from './components/LayoutTop/LayoutTop';
import PackagesContainer from './components/Packages/PackagesContainer';
import SectionLinks from './components/SectionLinks/SectionLinks';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import Operation from './components/ServiceInform/Operation/Operation';
import Record from './components/ServiceInform/Record/Record';
import { itemLink } from './helpers/itemLink';
import ServiceInform from './components/ServiceInform/ServiceInform';

const App = () => {
  const url = useLocation()

  return (
        <div className="App">
              <LayoutTop />
              <SectionLinks value={itemLink} /> 
          <Routes>
              <Route path="/package" element={<PackagesContainer />  } />
              <Route path="/operation" element={<Operation /> } />   
              <Route path="/record" element={<Record /> } />
          </Routes>
        </div>
    
  );
}

export default App;
