import React, { Fragment } from "react";

import AdminView from "./views/AdminView";
import VisitorView from "./views/VisitorView";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<AdminView/>}/>
                    <Route path="/visitors" element={<VisitorView/>}/>
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
}


export default App;
