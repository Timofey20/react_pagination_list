import React from "react";
import ReactDOM from "react-dom";
import Prapagination from "./prapagination";
import SearchInput from "./searchInput";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      searchInput: "",

      activePage: 1,
      items: [],
    };
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.fetch_Data();
  }
  fetch_Data = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => res.json())
      .then((item) => this.setState({ items: item }))
      .catch((error) => console.error(error))
      .then(() => this.setState({ isLoaded: false }));
  };
  handleInput(item) {
    this.setState({ searchInput: item });
  }
  render() {
    const { isLoaded } = this.state;
    return (
      <div className="wrapper">
        <SearchInput
          value={this.state.searchInput}
          handleInput={this.handleInput}
        />
        {this.state.items.length !== 0 && (
          <Prapagination
            items={this.state.items}
            search={this.state.searchInput}
          />
        )}
        <div className="center_center">
          {isLoaded === true && <div className="anim"></div>}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
