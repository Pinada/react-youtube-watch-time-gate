import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import VideoContainer from "./containers/VideoContainer";
import MainPage from "./containers/MainPage";
import ScrollToTop from "./other/ScrollToTop";
import videoConfig from "./videoConfig.json";


function App() {

  let json;
  let tempArr = [];
  let arr = [];
  let Arr = [];

  json = JSON.parse(JSON.stringify(videoConfig));
  Object.keys(json).forEach(function (key) {
    tempArr.push(json[key]);
  });

 for (const item of tempArr){
    arr = [];
    Object.keys(item).forEach(function (key) {
      arr.push(item[key]);
    });
    arr.map((item) => {
      Arr.push(
        <Route
          exact
          path={item.url}
          render={(props) => (
            <VideoContainer
              pageTitle={item.metaTitle}
              name={item.name}
              {...props}
              videoId={item.url}
              perc={item.perc}
              link={item.link}
            />
          )}
        />
      );
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-start" style={{ margin: 0 }}>
            <div class="navbar-brand">
              <a class="navbar-item" href="/">
                <p class="logo" style={{ color: "white " }}>
                  Your Website
                </p>
              </a>

              <a
                role="button"
                class="navbar-burger burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
              <div class="navbar-start">
                <a href="/" style={{ fontSize: "16px" }} class="navbar-item">
                  Download
                </a>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="field is-grouped">
                <p class="control">
                  <a
                    class=""
                    data-social-network="Twitter"
                    data-social-action="tweet"
                    data-social-target="https://bulma.io"
                    target="_blank"
                    href="#"
                  >
                    <span class="icon">
                      <i
                        style={{
                          color: "white",
                          marginTop: 15,
                          marginRight: 39,
                        }}
                        class="fab fa-twitter"
                      ></i>
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="main">
        <BrowserRouter>
          <ScrollToTop>
            <Route exact path="/" component={MainPage} />
            {Arr}
          </ScrollToTop>
        </BrowserRouter>
      </div>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Your website</strong> by <a>your name</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
