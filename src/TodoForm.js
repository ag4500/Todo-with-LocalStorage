import React from "react";
import { handletoggle, settodo, addtodo, updatetodo } from "./actions";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
function Todo() {
  const dispatch = useDispatch();
  const select = useSelector((state) => state.todo);
  const getId = select.updatingTodoIndex;
  const { title, desc } = select.todo;
  const onChange = (event) => {
    const { name, value } = event.target;
    const updatedTodo = { ...select.todo, [name]: value };
    dispatch(settodo(updatedTodo));
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (!title) return;
    if (!select.updatingTodoIndex && select.updatingTodoIndex !== 0) {
      dispatch(addtodo({ ...select.todo, id: new Date().getTime() }));
      let gettodo = localStorage.getItem("todo") || "[]";
      let parsedata = JSON.parse(gettodo);
      parsedata.push({
        todo: select.todo,
        id: new Date().getTime(),
      });
      localStorage.setItem("todo", JSON.stringify(parsedata));
      dispatch(handletoggle(!select.toggle));
    } else {
      let getdata = localStorage.getItem("todo") || "[]";
      let parsedata = JSON.parse(getdata);
      let data = parsedata.find(
        (i, index) => index == select.updatingTodoIndex
      );
      if (data) {
        data.todo = select.todo;
      }
      localStorage.setItem("todo", JSON.stringify(parsedata));
      dispatch(handletoggle(!select.toggle));
      dispatch(updatetodo((select.updatingTodoIndex = null)));
    }
  };
  const handleHideToggle = () => {
    dispatch(handletoggle(!select.toggle));
    dispatch(updatetodo((select.updatingTodoIndex = null)));
  };
  return (
    <div className="container p-3 text-center bg-light">
      <Modal show={select.toggle} onHide={handleHideToggle}>
        <Modal.Header closeButton>
          {getId != null ? (
            <Modal.Title>Edit Todo</Modal.Title>
          ) : (
            <Modal.Title>Add Todo</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <InputGroup className=" p-2 -3 ">
              <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
              <FormControl
                type="text"
                name="title"
                value={title}
                onChange={(event) => onChange(event)}
              />
            </InputGroup>
            <InputGroup className="p-2 -3 ">
              <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
              <FormControl
                type="text"
                name="desc"
                value={desc}
                onChange={(event) => onChange(event)}
              />
            </InputGroup>
            <Modal.Footer>
              {getId != null ? (
                <Button variant="success" type="submit">
                  Edit Todo
                </Button>
              ) : (
                <Button variant="success" type="submit">
                  Add Todo
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default Todo;
