import {
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import React from "react";
function Todo(props) {
  return (
    <>
      <List className="todo__list">
        <ListItem>
          <ListItemText primary={props.todo} />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fontSize="large"
            onClick={props.onClick}
          >
            Delete
          </Button>
        </ListItem>
      </List>
    </>
  );
}

export default Todo;
