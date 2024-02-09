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

                {/* DOWNLOADS AND LINK */}
                <div id='info-section' className='w-1/2 text-left text-yellow-950 mx-2'>
                    <div className='italic opacity-75'>
                        This is a demonstration of my ability to build a react application.
                        I will add more features to it, as written on my to do list.
                        In the meantime, check out its current features.
                        Resume and cover letter are available below, as well as a link to my Recommendations.
                    </div>
                    <ul className='mt-4'>
                        <li> <a
                            className='underline'
                            href={Resume}
                            download="Brandy_Brasket__Resume_Frontend_Engineer"
                            target='_blank'
                        >
                            Download my resume &nbsp;
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
                        </li>
                        <li> <a
                            className='underline'
                            href={CoverLetter}
                            download='Brandy_Brasket__Cover_Letter__Frontend_Engineer'
                            target='_blank'
                        >
                            Download my cover letter &nbsp;
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
                        </li>
                        <li>
                            <a
                                className='underline'
                                href='https://www.linkedin.com/in/brandy-brasket-84689746/details/recommendations/'
                                target='_blank'
                                aria-label='See my recommendations on LinkedIn'
                            >
                                View My Recommendations <FontAwesomeIcon textAnchor='LinkedIn' icon={faLinkedin} /> &nbsp;
                                <FontAwesomeIcon icon={faExternalLink}/>
                            </a>
                        </li>
                    </ul>
                    <div className='italic opacity-75'> More references available upon request. </div>
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