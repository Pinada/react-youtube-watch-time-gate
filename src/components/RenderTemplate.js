import React from "react";
import videoConfig from "../videoConfig.json";
import MainTileComponent from "./MainTileComponent";

export default class RenderTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = { numberCol: this.props.nbColomn,Htmlarr:[] };
  }

  componentDidMount() {
    let json;
    let tempArr = [];
    let arr = [];
    let temp = [];
   

    json = JSON.parse(JSON.stringify(videoConfig));
    Object.keys(json).forEach(function (key) {
      tempArr.push(json[key]);
    });
    var Htmlarr = Array.from(
      Array(tempArr.length),
      () => new Array(tempArr.length)
    );
    for (const [i, item] of tempArr.entries()) {
      arr = [];

      Object.keys(item).forEach(function (key) {
        arr.push(item[key]);
      });
      let rows = Math.ceil(arr.length / this.state.numberCol);
      if (this.props.cat) rows = 4;
      for (let j = 0; j < rows; j++) {
        temp = [];
        for (
          let i = j * this.state.numberCol;
          i < j * this.state.numberCol + this.state.numberCol;
          i++
        ) {
          if (arr[i]) {
            temp.push(
              <div class="column">
                <MainTileComponent
                  source={arr[i].tileImageSrc}
                  videoId={arr[i].url}
                  titleText={arr[i].tileText}
                />
              </div>
            );
          } else {
            temp.push(<div class="column"></div>);
          }
        }
        Htmlarr[i][j] = <div class="is-variable columns is-5">{temp}</div>;
      }
    }

    this.setState({rand:Math.floor(Math.random() * Htmlarr.length)})
    this.setState({Htmlarr:Htmlarr})
  }
  render() {
    return (
      <div>
        {this.props.cat && (
          <div>{this.state.Htmlarr[this.state.rand]}</div>
        )}
        {!this.props.cat && (
          <div>
            {this.state.Htmlarr.map((item, i) => (
              <div>
                <h6 class="title titleCategory">Category {i + 1}</h6>
                <div className="mainContainer">{item}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
