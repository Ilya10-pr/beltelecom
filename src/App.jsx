import './App.css';
import LayoutTop from './components/LayoutTop/LayoutTop';
import PackagesContainer from './components/Packages/PackagesContainer';
import { Routes, Route, useLocation } from 'react-router-dom';
import Operation from './components/ServiceInform/Operation/Operation';
import Record from './components/ServiceInform/InfoUser/InfoUser';
import Timetable from './components/ServiceInform/Timetable/Timetable';
import Ticket from "./components/ServiceInform/Ticket/Ticket"
import LogIn from './components/AdminUI/LogIn/LogIn';
import CustomSectionLinks from './components/CustomComponents/CustomSectionLinks';
import { adminLinks, homeLinks, serviceLinks, services, servicesBtn } from './helpers/itemLink';
import AddService from './components/AdminUI/AddService/AddService';
import DeleteService from './components/AdminUI/DeleteService/DeleteService';
import SearchClient from './components/AdminUI/SearchClient/SearchClient';
import OperationsClient from './components/AdminUI/SearchClient/OperationsClient/OperationsClient';
import { useQuery } from '@tanstack/react-query';
import { getAuthMe, getServices } from './api/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logInAdmin } from './store/user/slice';
// TODO:  // edit font-size and edit width input in navbar

const App = () => {
  const isAdmin = false;
  const url = useLocation()
  const path = url.pathname.split("/")[2]
  return (
        <div className="App">
              <LayoutTop />
              {url.pathname.includes("service") 
                              ? <CustomSectionLinks prefix={"/service/"} links={serviceLinks}/> 
                              : url.pathname.includes("admin") ? <CustomSectionLinks prefix={"/admin/"} links={adminLinks}/>
                              : <CustomSectionLinks prefix={"/home/"} links={homeLinks}/>}
              
          <Routes>
              <Route path={"/home/" + path} element={<PackagesContainer service={services[path]} />  } />
              <Route path="/service/operation" element={<Operation /> } />
              <Route path="/service/date" element={<Timetable /> } />
              <Route path="/service/info" element={<Record /> } />
              <Route path="/service/ticket" element={<Ticket /> } />
              <Route path="/login" element={<LogIn /> } />
              
              <Route path="/admin/add" element={<AddService services={servicesBtn}/> } />
              <Route path="/admin/delete" element={<DeleteService services={servicesBtn}/> } />
              <Route path="/admin/search" element={<SearchClient /> } />
              <Route path="/admin/options" element={<OperationsClient /> } />
          </Routes>
        </div>
    
  );
}

export default App;
