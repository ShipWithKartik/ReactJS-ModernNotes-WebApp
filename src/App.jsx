import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'; 
import Home from './Components/Home';
import Paste from './Components/Paste'; 
import ViewPaste from './Components/ViewPaste'; 

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home/>} />
                    <Route path='/pastes' element={<Paste />} />
                    <Route path='/pastes/:id' element={<ViewPaste />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;