import { NavLink, Routes, Route } from 'react-router-dom';
import DashboardPage from './DashboardPage/DashboardPage';
import SendDatas from './DatasPage/SendDatas';
import LoginPage from './LoginPage/LoginPage';
import SettingsPage from './SettingsPage/SettingsPage'; 
import Contactus from './ContactusPage/Contactus';

function Main() {
    return (
        <Routes>
            <Route path='/' element={<LoginPage/>}></Route>
            <Route path='/dashboard' element={<DashboardPage/>}></Route>
            <Route path='/homepage' element={<LoginPage/>}></Route>
            <Route path='/settings' element={<SettingsPage/>}></Route>
            <Route path='/datas' element={<SendDatas/>}></Route>
            <Route path='/contactus' element={<Contactus/>}></Route>
        </Routes>
    )
}

export default Main