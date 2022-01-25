import React from "react";

import AdminView from "./views/AdminView";
import VisitorView from "./views/VisitorView";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from "./views/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={""} element={<Home/>}/>
                <Route path="/admin" element={<AdminView/>}/>
                <Route path="/visitors" element={<VisitorView/>}/>
            </Routes>
        </BrowserRouter>
    );
}


export default App;
