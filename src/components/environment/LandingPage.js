import React, {useState} from "react";
import ToggleSwitch from "../atom/ToggleSwitch";
import PropTypes from "prop-types";

// function NavButton() {
//     return (<button className="bg-red-500"> I'm a button</button>);
// }

function LandingPage({
     setThemeSelection = Function.prototype,
     themeSelection
}) {
    // const [themeSelection, setThemeSelection] = useState(true);
    // const theme = themeSelection ? 'dark-theme' : 'light-theme';

    return (
        <header>
            <ToggleSwitch
                toggleOn={themeSelection}
                onToggleChange={e => setThemeSelection(e)}
             />
        </header>
    );
}

LandingPage.propTypes = {
    setThemeSelection: PropTypes.func.isRequired,
    themeSelection: PropTypes.bool.isRequired
};
export default LandingPage;