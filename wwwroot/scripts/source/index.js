import React from "react";
import ReactDOM from "react-dom";
import { 
    BrowserRouter as Router,
    Route,
    Switch 
} from "react-router-dom";
import WelcomePage from "./pages/welcome";
import CabinetPage from "./pages/cabinet";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
    <Router>
        <div className="wrapper">
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route exact path="/cabinet" component={CabinetPage} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("root")
);

registerServiceWorker();