import React from "react";
import config from "../config.json"

export default class MainTileComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }



  render() {

    return (
      <div
        onClick={(e) => {
          window.location =config.url + this.props.videoId;
        }}
      >
        <article class="link tile is-child notification ">
          <figure class="image is-16by9">
            <img
              class="hoverTile"
              style={{ borderRadius: 4 }}
              src={this.props.source}
            ></img>
          </figure>
        </article>
      </div>
    );
  }
}
