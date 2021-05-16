import React from "react";
import YouTube from "react-youtube";
import Helmet from "helmet";

import RenderTemplate from "../components/RenderTemplate";
import  config  from "../config.json";

var myTimer;

export default class VideoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      duration: 1,
      isAvailable: false,
      isDownloading: false,

    };
  }

  download = () => {
    this.setState({ isDownloading: true });

    var element = document.createElement("a");
    element.setAttribute("href", this.props.link);
    element.setAttribute("download", "Free_stuff");
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  componentDidUpdate = () => {
    if (
      this.state.current >
      this.state.duration - (this.props.perc / 100) * this.state.duration
    ) {
      this.setState({ isAvailable: true });
      this.setState({ current: 0 });
    }
  };

  stopPlaying = () => {
    this.setState({ isPlaying: false });
  };
  increment = (event) => {
    clearInterval(myTimer);
    var self = this;
    this.setState({ isPlaying: true });
    this.setState({
      duration:
        event.target.getDuration() -
        (this.props.perc / 100) * event.target.getDuration(),
    });

    if (this.state.isAvailable == false) {
      myTimer = setInterval(function () {
        if (self.state.isPlaying == true) {
          self.setState({ current: self.state.current + 1 });
        } else {
          clearInterval(myTimer);
        }
      }, 1000);
    } else {
      clearInterval(myTimer);
    }
  };

  render() {
    let perc = Math.trunc(
      (this.state.current /
        (this.state.duration - (this.props.perc / 100) * this.state.duration)) *
        100
    );
    let opts = {
      height: "315",
      width: "560",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
      },
    };

    return (
      <div style={{ width: "95%", margin: "0 auto" }}>
        <div className="columns">
          <div className="column ">
            <div></div>
          </div>
          <div className="column ">
            <div style={{ margin: "0 auto", marginTop: 70 }}>
              <Helmet>
                <title>{this.props.pageTitle}</title>
                <meta name="description" content=""></meta>
              </Helmet>

              <div class="">
                <h2 style={{ fontWeight: "400" }} class="titleWatch">
                  Watch the video to unluck the download link !
                </h2>
                <br></br>
                <h2
                  style={{ fontWeight: "300", marginBottom: 0 }}
                  class="titleRead"
                >
                  Write a custom message Here
                </h2>
                <br></br>
                <YouTube
                  videoId={this.props.videoId}
                  opts={opts}
                  onPlay={this.increment}
                  onPause={this.stopPlaying}
                  onEnd={this.stopPlaying}
                />
                <br></br>

                {this.state.isAvailable ? (
                  <div>
                    <h3 class="title red" style={{ width: "100%" }}>
                      Done
                    </h3>
                  </div>
                ) : (
                  <div>
                    <progress
                      class="progress is-primary"
                      value={perc}
                      max="100"
                    ></progress>
                    <h3>{perc + " % watched"}</h3>
                  </div>
                )}
                {this.state.isAvailable && (
                  <div class="">
                    <div class="">
                      <a target="_blank" href="#" class="subtitle">
                        Follow on twitter to get latest news .
                      </a>
                      <div class="column"></div>
                    </div>
                  </div>
                )}
                <br></br>
                <button
                  className="button is-fullwidth is-medium is-success"
                  onClick={this.download}
                  disabled={this.state.isAvailable ? false : true}
                >
                  Download
                </button>

                <br></br>
                <br></br>
                {this.state.isDownloading && (
                  <div>
                    <p className="subtitle">Thanks for downloading !</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="column is-3">
            <div>
              <div style={{ marginTop: 70, height: 750 }} class="mainContainer">
                <h6 style={{ textAlign: "left" }} class="titleRecommanded">
                  You might like ...
                </h6>

                <div> <RenderTemplate cat nbColomn={1}/></div>
                <div style={{ textAlign: "left" }}>
                  <a
                    href={config.url}
                    style={{ textAlign: "left", textDecoration: "underline" }}
                    class="titleRecommanded"
                  >
                    See all ...
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
      </div>
    );
  }
}
