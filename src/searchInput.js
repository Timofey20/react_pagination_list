import React from "react";

export default class Search extends React.Component {
  handleinput(event) {
    this.props.handleInput(event.target.value);
  }
  render() {
    return (
      <div className="input">
        <input
          type="text"
          value={this.props.value}
          onChange={this.handleinput.bind(this)}
        ></input>
      </div>
    );
  }
}
