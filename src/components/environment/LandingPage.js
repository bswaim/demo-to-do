import React from "react";
import ToggleSwitch from "../atom/ToggleSwitch";
import PropTypes from "prop-types";
import ToDoApp from "../organism/ToDoApp";

function LandingPage({
     setThemeSelection = Function.prototype,
     themeSelection
}) {
    return (
        <div className='max-w-2xl'>
            <header className='mb-4'>
                <ToggleSwitch
                    className="ml-4 mt-4"
                    toggleOn={themeSelection}
                    onToggleChange={e => setThemeSelection(e)}
                 />
            </header>
            <ToDoApp />
        </div>
    );
}

LandingPage.propTypes = {
    setThemeSelection: PropTypes.func.isRequired,
    themeSelection: PropTypes.bool.isRequired
};
export default LandingPage;