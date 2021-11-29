import { Table } from "react-bootstrap";
const Complete = () => {
  const todoDataString = localStorage.getItem("todo") || "[]";
  const todos = JSON.parse(todoDataString);
  const completetodo = todos.filter((t) => t.completed);
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
          {completetodo
            ? completetodo.map((i, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{i.todo.title}</td>
                  <td>{i.todo.desc}</td>
                </tr>
              ))
            : "No Todos Completed"}
        </tbody>
      </Table>
    </>
  );
};
export default Complete;
