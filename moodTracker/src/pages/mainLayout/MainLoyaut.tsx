import {Outlet} from "react-router-dom";
import {Header} from "../../components/header/Header.tsx";
import style from './mainLayout.module.css'


function MainLayout() {
    return (
        <div className={style.container}>
            <Header/>
            <Outlet/>
        </div>
    )
}

export default MainLayout