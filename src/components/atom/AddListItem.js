import React from 'react';
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

function AddListItem({
    onClicked
  }) {

    return (
        <div className='flex' >
            <button
                aria-label='add-new-icon'
                id='add-new-icon'
                name='add-new-icon'
                data-testid='add-new-icon'
                type='button'
                className='text-2xl ml-4 m-2 pt-.5 pb-1 px-2 rounded font-bold'
                onClick={() => onClicked()}
            >
                <FontAwesomeIcon icon={faCirclePlus}/>
            </button>
            <h2 className='mt-3 italic cursor-pointer' data-testid='add-new-text' onClick={() => onClicked()}>Add new item</h2>
        </div>
    );
}

AddListItem.propTypes = {
    onClicked: PropTypes.func
};

export default AddListItem;