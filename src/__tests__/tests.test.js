import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../components/todo-list/todo-list";
import { store } from '../state/store';
import { Provider } from "react-redux";
import { replace } from '../state/todos/todosSlice';
import { getTodos } from "../utils";

/**
 * @jest-environment jsdom
 */

beforeEach(() => {
  window.localStorage.clear();
});

test("should render empty list message", () => {
  render(<Provider store={store}><TodoList /></Provider>);

  store.dispatch(replace([]));

  const element = screen.getByText(/No items in the list/i);

  expect(element).toBeInTheDocument();
});

test("should render add todo button", () => {
  render(<Provider store={store}><TodoList /></Provider>);

  const element = screen.getByText(/Add/i);

  expect(element).toBeInTheDocument();
});

test("should render todo form when click on add button", () => {
  render(<Provider store={store}><TodoList /></Provider>);

  const button = screen.getByText(/Add/i);

  fireEvent(
    button,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  const form = screen.getByRole("form");

  expect(form).toBeInTheDocument();
});  

test("should render todo form with populated fields when click on edit button", () => {
    window.localStorage.setItem(
        "todos",
        JSON.stringify([
          {
            id: "1",
            title: "To be",
            description: "Edited",
            deadline: "9999-01-01",
            completed: false,
            disabled: false,
          },
        ])
      );

    store.dispatch(replace(getTodos()));
  
    render(<Provider store={store}><TodoList /></Provider>);
  
    const button = screen.getByTestId(/edit-1/i);
  
    fireEvent(
      button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  
    const form = screen.getByRole("form");
    const title = form.querySelector("#title");
    const description = form.querySelector("#description");
    const deadline = form.querySelector("#deadline");
  
    expect(form).toBeInTheDocument();
    expect(title.value).toEqual("To be");
    expect(description.value).toEqual("Edited");
    expect(deadline.value).toEqual("9999-01-01");
  });  
  

test("should render completed list message", () => {
  window.localStorage.setItem(
    "todos",
    JSON.stringify([
      {
        id: "1",
        title: "Test",
        description: "Test",
        deadline: "9999-01-01",
        completed: true,
        disabled: false,
      },
    ])
  );
  store.dispatch(replace(getTodos()));

  render(<Provider store={store}><TodoList /></Provider>);

  const element = screen.getByText(/List is completed/i);

  expect(element).toBeInTheDocument();
});

test("should render empty list message when delete button is clicked on last item", () => {
    window.localStorage.setItem(
      "todos",
      JSON.stringify([
        {
          id: "1",
          title: "To be",
          description: "Removed",
          deadline: "9999-01-01",
          completed: true,
          disabled: false,
        },
      ])
    );
    store.dispatch(replace(getTodos()));

    render(<Provider store={store}><TodoList /></Provider>);

    const button = screen.getByText(/Delete/i);

    fireEvent(
      button,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  
    const element = screen.getByText(/No items in the list/i);

    expect(element).toBeInTheDocument();
  });


test("should render list item with correct data", () => {
  window.localStorage.setItem(
    "todos",
    JSON.stringify([
      {
        id: "1",
        title: "Title",
        description: "Description",
        deadline: "2012-12-12",
        completed: false,
        disabled: false,
      },
    ])
  );
  store.dispatch(replace(getTodos()));

  render(<Provider store={store}><TodoList /></Provider>);

  const title = screen.getByText(/Title/i);
  const description = screen.getByText(/Description/i);
  const deadline = screen.getByText(/2012-12-12/i);
  const deleteBtn = screen.getByText(/Delete/i);
  const editBtn = screen.getByText(/Edit/i);

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(deadline).toBeInTheDocument();
  expect(deleteBtn).toBeInTheDocument();
  expect(editBtn).toBeInTheDocument();
});

test("should render list item with disabled actions", () => {
  window.localStorage.setItem(
    "todos",
    JSON.stringify([
      {
        id: "1",
        title: "Title",
        description: "Description",
        deadline: "2012-12-12",
        completed: true,
        disabled: true,
      },
    ])
  );
  store.dispatch(replace(getTodos()));

  render(<Provider store={store}><TodoList /></Provider>);

  const completedCheckbox = screen
    .getByTestId(/completed/i)
    .querySelector("input");
  const disabledSwitch = screen.getByTestId(/disabled/i).querySelector("input");
  const deleteBtn = screen.getByText(/Delete/i);
  const editBtn = screen.getByText(/Edit/i);

  expect(completedCheckbox.disabled).toEqual(true);
  expect(disabledSwitch.disabled).toEqual(true);
  expect(deleteBtn.disabled).toEqual(true);
  expect(editBtn.disabled).toEqual(true);
});
