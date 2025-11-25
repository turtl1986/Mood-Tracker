import {Route, Routes} from 'react-router-dom'
import Tracker from './pages/tracker/Tracker.tsx'
import MainLayout from "./pages/mainLayout/MainLoyaut.tsx";
import Calendar from "./pages/calendar/Calendar.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route element={<MainLayout />} >
                <Route path="/" element={<Tracker/>}/>
                    <Route path="/calendar" element={<Calendar/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App