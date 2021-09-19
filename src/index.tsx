import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/client";
import client from "./libs/apollo";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Stargazers from "./pages/stargazers";

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/stargazers/:login/:name">
          <Stargazers />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
reportWebVitals();
