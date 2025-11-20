import {Outlet} from "react-router-dom";
import Header from '../components/Header.tsx'


function MainLayout() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default MainLayout