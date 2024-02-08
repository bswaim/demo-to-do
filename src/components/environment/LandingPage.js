import React from "react";
import PropTypes from "prop-types";
import ToggleSwitch from "../atom/ToggleSwitch";
import ToDoApp from "../organism/ToDoApp";
import Resume from "../../downloads/Brandy_Brasket__Resume_Frontend_Engineer.pdf"
import CoverLetter from "../../downloads/Brandy_Brasket__Cover_Letter__Frontend_Engineer.pdf"
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

                {/* DOWNLOADS AND LINK */}
                <div id='info-section' className='w-1/2 text-left text-yellow-950 m-2'>
                    <ul>
                        <li> <a
                            className='underline'
                            href={Resume}
                            download="Brandy_Brasket__Resume_Frontend_Engineer"
                            target='_blank'
                        >
                            Download my resume
                        </a>
                        </li>
                        <li> <a
                            className='underline'
                            href={CoverLetter}
                            download='Brandy_Brasket__Cover_Letter__Frontend_Engineer'
                            target='_blank'
                        >
                            Download my cover letter
                        </a>
                        </li>
                        <li>
                            <a
                                className='underline'
                                href='https://www.linkedin.com/in/brandy-brasket-84689746/details/recommendations/'
                                target='_blank'
                                aria-label='See my recommendations on LinkedIn'
                            >
                            Recommendations on LinkedIn
                            </a>
                        </li>
                        <li className='italic opacity-75'> More references available upon request </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

LandingPage.propTypes = {
    setThemeSelection: PropTypes.func.isRequired,
    themeSelection: PropTypes.bool.isRequired
};
export default LandingPage;