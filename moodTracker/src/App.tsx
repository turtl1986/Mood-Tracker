import {Route, Routes} from 'react-router-dom'
import Tracker from './pages/Tracker.tsx'
import MainLayout from "./pages/MainLoyaut.tsx";
import Calendar from "./pages/Calendar.tsx";

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