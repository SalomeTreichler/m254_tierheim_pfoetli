import React from "react";

import AdminView from "./views/AdminView";
import VisitorView from "./views/VisitorView";
import {Link, Route, Router, Switch} from "react-router-dom";

function App() {
  return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/admin">Ich bin ein Admin</Link>
              </li>
              <li>
                <Link to="/visitor">Ich bin ein Besucher</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/admin">
              <AdminView />
            </Route>
            <Route path="/visitor">
              <VisitorView />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}


export default App;
