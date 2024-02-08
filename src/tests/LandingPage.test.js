import { render, screen } from '@testing-library/react';
import LandingPage from "../components/environment/LandingPage";
import userEvent from "@testing-library/user-event";
describe('Landing Page', () => {
    test('renders toggleswitch', () => {
        const mockFunc = jest.fn();

        const component = render(
            <LandingPage
                themeSelection={true}
                setThemeSelection={mockFunc}
            />);

        const toggleSwitch = screen.getByTestId('toggle-switch');

        expect(toggleSwitch).toBeInTheDocument();
        expect(component).toMatchSnapshot();
    });
    test('setThemeSelection is triggered when toggle is clicked', () => {
        const mockFunc = jest.fn();

        const component = render(
            <LandingPage
                themeSelection={true}
                setThemeSelection={mockFunc}
            />);

        const toggleSwitchInput = screen.getByTestId('toggle-input');

        userEvent.click(toggleSwitchInput);

        expect(toggleSwitchInput).toBeInTheDocument();
        expect(mockFunc).toHaveBeenCalledTimes(1);
        expect(mockFunc).toHaveBeenCalledWith(false);
        expect(component).toMatchSnapshot();
    });
});
