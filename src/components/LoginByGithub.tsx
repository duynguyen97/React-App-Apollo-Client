import React, { Fragment, FunctionComponent, useEffect } from "react";
import { useHistory } from "react-router";

interface Props {
  scope?: string;
  client_id: string;
  client_secret: string;
  className?: string;
  redirect_uri: string;
  allow_signup?: boolean;
  children?: React.ReactNode;
}

const GITHUB_URL: string = "https://github.com";

const LoginByGithub: FunctionComponent<Props> = ({
  scope = "repo,gist",
  client_id,
  client_secret,
  className = "",
  redirect_uri,
  allow_signup = false,
  children,
}) => {
  const history = useHistory();

  useEffect(() => {
    const popupWindowURL = new URL(window.location.href);
    const code = popupWindowURL.searchParams.get("code");
    if (code) {
      localStorage.setItem("OAUTH-TOKEN", code);
      window.close();
    }
  }, []);

  const requestGithubUserAccount = (code: string): any => {
    var xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${GITHUB_URL}/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`,
      true
    );
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var resp = JSON.parse(xhr.response);
        localStorage.setItem("ACCESS-TOKEN", resp.access_token);
      }
    };
    xhr.send();
  };

  const onChangeLocalStorage = async () => {
    try {
      window.removeEventListener("storage", onChangeLocalStorage, false);
      const code = localStorage.getItem("OAUTH-TOKEN");
      if (code) {
        await requestGithubUserAccount(code);
        localStorage.removeItem("OAUTH-TOKEN");
        history.push("/search");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = () => {
    window.addEventListener("storage", onChangeLocalStorage, false);
    const oauthUrl = `${GITHUB_URL}/login/oauth/authorize?client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&allow_signup=${allow_signup}`;
    const width = 450;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      oauthUrl,
      "Github",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  return (
    <Fragment>
      <div className={className} onClick={onLogin}>
        {children}
      </div>
    </Fragment>
  );
};

export default LoginByGithub;
