import { Route, Switch, BrowserRouter } from "react-router-dom";
import TodoList from "./components/TodoList";
import EditTodo from "./components/EditTodo";
import "./App.css";
import "./checkbox.scss";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TodoList} />
          <Route path="/edit/:id" component={EditTodo} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
