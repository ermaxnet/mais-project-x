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
import { Provider } from "react-redux";
import store from "./redux/store";
import moment from "moment";
import "./polyfills";

// App settings
moment.locale("ru");

ReactDOM.render(
    <Router>
        <div className="wrapper">
            <Switch>
                <Route exact path="/" component={WelcomePage} />
                <Route exact path="/cabinet" render={props => {
                    return (
                        <Provider store={store}>
                            <CabinetPage {...props} />
                        </Provider>
                    );
                }} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("root")
);

registerServiceWorker();