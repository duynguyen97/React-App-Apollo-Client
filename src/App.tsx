import "./App.css";
import LoginByGithub from "./components/LoginByGithub";
import { FunctionComponent } from "react";

const Login: FunctionComponent = () => {
  const REDIRECT_URI = "http://localhost:3000";
  return (
    <div className="App">
      <div className="login-form">
        <LoginByGithub
          client_id={process.env.REACT_APP_CLIENT_ID || ""}
          client_secret={process.env.REACT_APP_CLIENT_SECRET || ""}
          className={"storybook-button storybook-button--primary"}
          redirect_uri={REDIRECT_URI}
        >
          Login Github
        </LoginByGithub>
      </div>
    </div>
  );
};

export default Login;
