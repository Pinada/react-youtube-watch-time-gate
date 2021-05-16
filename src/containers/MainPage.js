import React from "react";

import Helmet from "helmet";
import RenderTemplate from "../components/RenderTemplate";


export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  
    return (
      <div style={{ width: "100%" }}>
        <Helmet>
          <title>Download free stuff !</title>
          <meta name="description" content=""></meta>
        </Helmet>
        <section class="hero is-light">
          <div class="hero-body">
            <h1
              className="titleHero"
              style={{
                margin: "40px 0px 50px 0px",
                fontSize: 35,
                fontWeight: "600",
              }}
            >
              Welcome
            </h1>
            <h5
              style={{
                color: "rgb(180, 180, 180)",
                fontWeight: "300",
                marginBottom: 100,
              }}
              className="subtitle"
            ></h5>
          </div>
        </section>
        <div style={{ width: "70%", margin: "0 auto" }}>
         <RenderTemplate nbColomn={3}/>
        </div>
      </div>
    );
  }
}
