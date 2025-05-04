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
import { adminLinks, homeLinks, serviceLinks, servicesBtn } from './helpers/itemLink';
import AddService from './components/AdminUI/AddService/AddService';
import DeleteService from './components/AdminUI/DeleteService/DeleteService';
import SearchClient from './components/AdminUI/SearchClient/SearchClient';
import OperationsClient from './components/AdminUI/SearchClient/OperationsClient/OperationsClient';
import { useEffect } from 'react';
import TicketContainer from './components/ServiceInform/Ticket/TicketContainer';
import Booked from './components/AdminUI/Booked/Booked';
import { Toaster } from "react-hot-toast";
import EditTime from './components/AdminUI/EditTime/EditTime';


// TODO: change selecting services for package, connection package - bandle, booked, send to telegramm message 

const App = () => {
  const isAdmin = false;
  const url = useLocation()
  const path = url.pathname.split("/")[2]

  return (
        <div className="App">
              <LayoutTop />
              <Toaster />
              {url.pathname.includes("service") 
                              ? <CustomSectionLinks prefix={"/service/"} links={serviceLinks}/> 
                              : url.pathname.includes("admin") ? <CustomSectionLinks prefix={"/admin/"} links={adminLinks}/>
                              : <CustomSectionLinks prefix={"/home/"} links={homeLinks}/>}
              
          <Routes>
              <Route path={"/home/" + path} element={<PackagesContainer />  } />
              <Route path="/service/operation" element={<Operation /> } />
              <Route path="/service/date" element={<Timetable /> } />
              <Route path="/service/info" element={<Record /> } />
              <Route path="/service/ticket/:id" element={<TicketContainer /> } />
              <Route path="/login" element={<LogIn /> } />
              
              <Route path="/admin/add" element={<AddService services={servicesBtn}/> } />
              <Route path="/admin/delete" element={<DeleteService services={servicesBtn}/> } />
              <Route path="/admin/search" element={<SearchClient /> } />
              <Route path="/admin/options" element={<OperationsClient /> } />
              <Route path="/admin/booked" element={<Booked /> } />
              <Route path="/admin/edit" element={<EditTime /> } />
          </Routes>
        </div>
    
  );
}

export default App;
