import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  completetodo,
  deletetodo,
  settodo,
  handletoggle,
  updatingtodoindex,
} from "./actions/index";
import Todo from "./TodoForm";
import { Table } from "react-bootstrap";
const All = () => {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.todo);
  const handleShowToggle = (id) => {
    const usersDataString = localStorage.getItem("todo");
    const users = JSON.parse(usersDataString);
    let data = users.findIndex((i) => id == i.id);
    dispatch(updatingtodoindex(data));
    dispatch(handletoggle(!select.toggle));
    dispatch(settodo(users[data].todo));
  };
  const handleDelete = (id) => {
    const deleteuser = localStorage.getItem("todo");
    const getuser = JSON.parse(deleteuser);
    const filteruser = getuser.filter((data) => data.id != id);
    localStorage.setItem("todo", JSON.stringify(filteruser));
    dispatch(deletetodo(id));
  };
  const handleComplete = (e, id) => {
    const usersDataString = localStorage.getItem("todo");
    const users = JSON.parse(usersDataString);
    const datas = users.map((data) => {
      if (data.id != id) {
        return data;
      } else {
        return {
          ...data,
          completed: e.target.value,
        };
      }
    });

    localStorage.setItem("todo", JSON.stringify(datas));

    dispatch(completetodo({ id, completed: e.target.checked }));
  };
  const todoallDataString = localStorage.getItem("todo");
  const todoall = JSON.parse(todoallDataString);

  return (
    <>
      {select.toggle ? <Todo /> : console.log("edit form not displayed")}
      <Table striped bordered hover className="container" size="lg">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {todoall
            ? todoall.map((i, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i.todo.title}</td>
                  <td>{i.todo.desc}</td>
                  <Button
                    variant="outline-warning"
                    className="mx-1"
                    onClick={() => handleShowToggle(i.id)}
                  >
                    Edit Todo
                  </Button>
                  <Button
                    variant="outline-warning"
                    className="mx-1"
                    onClick={() => handleDelete(i.id)}
                  >
                    Delete Todo
                  </Button>
                  <Button variant="outline-warning">
                    complete
                    <input
                      type="checkbox"
                      checked={i.completed}
                      onClick={(event) => handleComplete(event, i.id)}
                    />
                  </Button>
                </tr>
              ))
            : "No Todo Added"}
        </tbody>
      </Table>
    </>
  );
};
export default All;
