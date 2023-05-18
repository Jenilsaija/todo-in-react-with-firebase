import { Button, Container, FormControl,  Input, InputLabel } from "@mui/material";
import { useState, useEffect } from "react";
import Todo from "./Todo";
import { db } from "./base";
import {
  addDoc,
  collection,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    getTodo();
  }, [input]);

  const handledelete = async (id) => {
    const task = collection(db, "todo");
    await deleteDoc(doc(task, id));
    const newtask = todos.filter((task) => {
      return task.id !== id;
    });
    setTodos(newtask);
  };

  async function getTodo() {
    const task = collection(db, "todo");
    const taskSnapshot = await getDocs(task);
    const taskList =
      taskSnapshot.docs &&
      taskSnapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }));
    setTodos(taskList);
  }

  const addTodo = async (e) => {
    e.preventDefault();
    const task = collection(db, "todo");
    await addDoc(task, { todo: input });
    setInput("");
  };
  return (
    <Container maxWidth="sm">
      <div className="App" style={{textAlign:"center",marginTop:'30px'}}>
      <img src="/TODO.gif" alt="logogif" height={'200px'} width={'200px'}/>
       <h1>MY TODO LIST</h1>
        <form>
          <FormControl>
            <InputLabel>Write a TODO</InputLabel>
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
          </FormControl>
          <Button
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
            disabled={!input}
          >
            Add Todo
          </Button>
        </form>
        <ul>
          {todos.map((todo) => (
            <Todo
              todo={todo.data.todo}
              key={todo.id}
              id={todo.id}
              onClick={() => {
                handledelete(todo.id);
              }}
            />
          ))}
        </ul>
      </div>
    </Container>
  );
}

export default App;
