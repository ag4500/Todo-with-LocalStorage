import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { handletoggle, updatingtodoindex } from "./actions/index";
import Todo from "./TodoForm";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function App() {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.todo);
  const handleShowToggle = (id) => {
    if (id === undefined) {
      dispatch(handletoggle(!select.toggle));
    } else {
      const todoIndex = select.record.findIndex((todo) => todo.id === id);
      dispatch(updatingtodoindex(todoIndex));
      dispatch(handletoggle(!select.toggle));
    }
  };
  return (
    <div className="App">
      <div className="p-3 container text-center bg-light">
        <h1 className="mb-1">Todo...</h1>
      </div>
      <Button
        className="mx-2 my-3"
        variant="info"
        onClick={() => handleShowToggle()}
      >
        Add Todo
      </Button>
      
      {select.toggle ? <Todo /> : console.log("Add form not display")}
    </div>
  );
}

export default App;
