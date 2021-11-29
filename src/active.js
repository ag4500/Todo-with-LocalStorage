import { Table } from "react-bootstrap";
const Active = () => {
  const activetodoDataString = localStorage.getItem("todo") || "[]";
  const todos = JSON.parse(activetodoDataString);
  const activetodo = todos.filter((t) => !t.completed);
  return (
    <>
      <Table striped bordered hover className="container" size="lg">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {activetodo
            ? activetodo.map((i, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i.todo.title}</td>
                  <td>{i.todo.desc}</td>
                </tr>
              ))
            : "No Active Todo Available"}
        </tbody>
      </Table>
    </>
  );
};
export default Active;
