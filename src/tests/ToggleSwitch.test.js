import { render, screen } from '@testing-library/react';
import ToggleSwitch from "../components/atom/ToggleSwitch";
import userEvent from "@testing-library/user-event";
describe('Toggle Switch', () => {
    test('renders toggle with passed className prop', () => {
        const classNameProp = 'class-name';
        const mockFunc = jest.fn();
        const component = render(
            <ToggleSwitch
                toggleOn={true}
                onToggleChange={mockFunc}
                className={classNameProp}
            />);
        const toggle = screen.getByTestId('toggle-switch');

        expect(toggle).toBeInTheDocument();
        expect(toggle).toHaveClass(`switch ${classNameProp}`);
        expect(component).toMatchSnapshot();
    });
    test('toggle click triggers onToggleChange', () => {
        const mockFunc = jest.fn();
        const component = render(
            <ToggleSwitch
                toggleOn={true}
                onToggleChange={mockFunc}
            />);
        const toggleInput = screen.getByTestId('toggle-input');

        expect(toggleInput).toBeInTheDocument();

        userEvent.click(toggleInput);

        expect(mockFunc).toHaveBeenCalledTimes(1);
        expect(mockFunc).toHaveBeenCalledWith(false);
        expect(component).toMatchSnapshot();
    });
});
