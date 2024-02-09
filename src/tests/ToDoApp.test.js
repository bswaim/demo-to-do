import {render, screen} from "@testing-library/react";
import ToDoApp from "../components/organism/ToDoApp";

describe('TO-DO APP', () => {
    test('default render components', () => {
        const component = render(<ToDoApp />);
        const container = screen.getByTestId(/todo-id/i);
        const header = screen.getByText(/to-do app/i);
        const deleteAllIcon = screen.getByTestId(/delete-all-icon/i);
        const deleteAllCheckedIcon = screen.getByTestId(/delete-all-checked-icon/i);
        const addNewItemIcon = screen.getByTestId(/add-new-icon/i);
        const addNewItemText = screen.getByTestId(/add-new-text/i);
        const completedText = screen.getByText(/Completed/i);
        const undoIcon = screen.getByTestId(/undo-icon/i);
        const redoIcon = screen.getByTestId(/redo-icon/i);

        expect(container).toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(deleteAllIcon).toBeInTheDocument();
        expect(deleteAllCheckedIcon).toBeInTheDocument();
        expect(addNewItemIcon).toBeInTheDocument();
        expect(addNewItemText).toBeInTheDocument();
        expect(completedText).toBeInTheDocument();
        expect(undoIcon).toBeInTheDocument();
        expect(redoIcon).toBeInTheDocument();
    });
});