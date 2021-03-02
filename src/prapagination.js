import React from "react";

export default class Prapagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.items,
      checkArr: [],
      currentPage: 1,
      todosPerPage: 20,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }
  handleSortBy = (value, item) => {
    console.log(item.target.classList);
    let list = document.querySelectorAll(".butt");
    for (const i of list) {
      i.classList.remove("active");
    }
    item.target.classList.add("active");
    let { checkArr } = this.state;
    if (checkArr[checkArr.length - 1] !== value) {
      if (value === "id") {
        this.state.todos.sort((a, b) => a[value] - b[value]);
      } else {
        this.state.todos.sort((a, b) => (a[value] < b[value] ? -1 : 1));
      }
      checkArr.push(value);
    } else if (checkArr[checkArr.length - 1] === value) {
      if (value === "id") {
        this.state.todos.sort((a, b) => b[value] - a[value]);
      } else {
        this.state.todos.sort((a, b) => (a[value] > b[value] ? -1 : 1));
      }
      checkArr.push("abc");
    }
    this.setState({ todos: this.state.todos });
  };

  render() {
    const { todos, currentPage, todosPerPage } = this.state;

    let renderTodos = todos.map((todo) => {
      let title = todo.title.toLowerCase();
      let body = todo.body.toLowerCase();
      let number = todo.id.toString();
      if (
        title.includes(this.props.search.toLowerCase()) ||
        body.includes(this.props.search.toLowerCase()) ||
        number.includes(this.props.search.toLowerCase())
      ) {
        return (
          <li key={todo.id}>
            <span className="numbering">{todo.id})</span>{" "}
            <strong className="title">{todo.title}</strong>
            <br />
            {todo.body}
          </li>
        );
      }
      return undefined;
    });

    let sortrenderTodos = renderTodos.filter(
      (item) => typeof item !== "undefined"
    );

    let indexOfLastTodo = currentPage * todosPerPage;
    let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    let currentTodos = sortrenderTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    let pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(sortrenderTodos.length / todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    let renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li
          className="pageNumber"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div>
        <div>
          Sort by:{" "}
          <button
            className="butt"
            value="title"
            onClick={(item) => this.handleSortBy(item.target.value, item)}
          >
            Title
          </button>
          <button
            className="butt"
            value="id"
            onClick={(item) => this.handleSortBy(item.target.value, item)}
          >
            Id
          </button>
          <button
            className="butt"
            value="body"
            onClick={(item) => this.handleSortBy(item.target.value, item)}
          >
            Body
          </button>
        </div>
        <ul>{currentTodos}</ul>
        <div className="notefication">
          {currentTodos.length === 0 && "Ничего не найдено!"}
        </div>
        <ul id="page-numbers">
          {renderPageNumbers.length !== 1 && renderPageNumbers}
        </ul>
      </div>
    );
  }
}
