import {Route, Routes} from 'react-router-dom'
import Tracker from './pages/Tracker.tsx'

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Tracker/>}/>
            </Routes>
        </>
    )
}

export default App