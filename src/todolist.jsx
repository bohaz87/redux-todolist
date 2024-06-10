import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { addTodo, load, loadMore } from "./redux/todolist";

import "./todolist.scss";

function fetchTodo({ skip = 0, limit = 30 }) {
  return fetch(`https://dummyjson.com/todos?skip=${skip}&limit=${limit}`).then(
    (res) => res.json()
  );
}

function TodoList({ items, loadMore, load, addTodo }) {
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTodo({ skip, limit }).then((res) => {
      const todos = res.todos;
      setTotal(res.total);
      setSkip(res.limit);
      load(todos);
    });
  }, []);

  const handleLoadMore = function () {
    fetchTodo({ skip, limit }).then((res) => {
      const todos = res.todos;
      loadMore(todos);
      setSkip(skip + limit);
    });
  };

  const [inputValue, setInputValue] = useState("");

  return (
    <div className="applist">
      <div className="control">
        <input
          type="text"
          className="text"
          value={inputValue}
          placeholder="New todo"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          onClick={() => {
            if (inputValue) {
              setInputValue("");
              addTodo(inputValue);
            }
          }}
        >
          add
        </button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input type="checkbox" defaultChecked={item.completed} />
            {item.todo}
          </li>
        ))}
      </ul>
      <div>
        {skip < total && <button onClick={handleLoadMore}>load more</button>}
      </div>
    </div>
  );
}

export default connect(
  (state) => {
    return { items: state.todos };
  },
  {
    loadMore,
    load,
    addTodo,
  }
)(TodoList);
