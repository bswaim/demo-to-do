import React from "react";
import PropTypes from "prop-types";
import ToggleSwitch from "../atom/ToggleSwitch";
import ToDoApp from "../organism/ToDoApp";
import Resume from "../../downloads/Brandy_Brasket__Resume_Frontend_Engineer.pdf"
import CoverLetter from "../../downloads/Brandy_Brasket__Cover_Letter__Frontend_Engineer.pdf"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faExternalLink, faLink} from "@fortawesome/free-solid-svg-icons";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";
function LandingPage({
     setThemeSelection = Function.prototype,
     themeSelection
}) {
    return (
        <div className='bg-white h-full w-full p-4' data-testid='landing-page'>
            <header className='mb-4'>
                <ToggleSwitch
                    toggleOn={themeSelection}
                    onToggleChange={e => setThemeSelection(e)}
                />
            </header>
            <div id='page-content' className='flex justify-between'>
                {/* TO DO APP */}
                <div id='todo-list-section' className='w-1/2'><ToDoApp /></div>
            </div>
        </div>
    );
}

LandingPage.propTypes = {
    setThemeSelection: PropTypes.func.isRequired,
    themeSelection: PropTypes.bool.isRequired
};
export default LandingPage;