import { useEffect, useState } from "react";

// Server side page is first rendered and then updated

export default function Home({ todos }) {
  const [_todos, setTodos] = useState(todos);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          const res = await fetch("http://localhost:3000/todos");
          // Cast value to json object
          const list = await res.json();
          setTodos(list);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.log("err", err);
      }
    })();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <h3>Home Page</h3>
      {loading && <p>...loading</p>}
      <ul>
        {_todos &&
          _todos.map(({ title }, key) => (
            <li key={key} style={{ marginBottom: "5px" }}>
              {title}
            </li>
          ))}
      </ul>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  // API fetching
  const res = await fetch("http://localhost:3000/todos");

  // Cast value to json object
  const todos = await res.json();
  return {
    // Sending todos to page
    props: { todos: todos },
  };
};
