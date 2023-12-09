import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import { TodoList } from '../components/todo-list/todo-list';

/**
 * @jest-environment jsdom
 */

test("should render add todo button", () => {
    render(<TodoList/>);

    const element = screen.getByText(/Add/i);

    expect(element).toBeInTheDocument();
})

test("should render completed list message", () => {
    window.localStorage.setItem("todos", JSON.stringify([
        {
            id: "1",
            title: "Test",
            description: "Test",
            deadline: "9999-01-01",
            completed: true,
            disabled: false
        }
    ]));
    render(<TodoList/>);

    const element = screen.getByText(/List is completed/i);

    expect(element).toBeInTheDocument();
})

test("should render empty list message", () => {
    window.localStorage.clear();
    render(<TodoList/>);

    const element = screen.getByText(/No items in the list/i);

    expect(element).toBeInTheDocument();
})