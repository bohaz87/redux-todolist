import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load, loadMore } from "./redux/todolist";

function fetchTodo({ skip = 0, limit = 30 }) {
  return fetch(`https://dummyjson.com/todos?skip=${skip}&limit=${limit}`).then(
    (res) => res.json()
  );
}

function TodoList({ items, loadMore, load }) {
  const skip = items.length;
  const limit = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchTodo({ skip, limit }).then((res) => {
      const todos = res.todos;
      setTotal(res.total);
      load(todos);
    });
  }, []);

  const handleLoadMore = function () {
    fetchTodo({ skip, limit }).then((res) => {
      const todos = res.todos;
      loadMore(todos);
    });
  };

  return (
    <div>
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
  }
)(TodoList);
