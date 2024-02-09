import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {
    addNewItemToList, changeCheckedState,
    changeEditMode,
    checkItem,
    deleteItem, moveCurrentState,
    unCheckItem,
    updateItemText,
    updateLatestChangeToDoHistory
} from "../../utils/utils";
import {find, isEmpty} from "lodash";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleMinus} from "@fortawesome/free-solid-svg-icons";
// import {updateLatestChangeToDoHistory} from "../../redux/actions";
// import {useDispatch} from "react-redux";

function ListItem({
    checked,
    editMode,
    id,
    listHistoryState,
    setListHistoryState,
    text = ''
  }) {
    const copyOfList = listHistoryState.slice();
    const currentListView = find(copyOfList, x => x.isCurrent)?.list || [];
    const [itemText, setItemText] = useState(text);

    const handleCheckboxChange = (checkEvent) => {
        let updatedArray = currentListView;

        updatedArray = changeCheckedState(id, updatedArray, checkEvent)

        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState);
        setListHistoryState(updateCurrentState);
    }

    const handleOnInputBlur = () => {
        if(isEmpty(itemText)) {
            // PERFORM AN UNDO IF ITEM TEXT IS EMPTY
            const undoHistoryState = moveCurrentState(listHistoryState);
            setListHistoryState([...undoHistoryState]);
            return;
        }

        const updatedArray = updateItemText(id, itemText, currentListView);
        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState);

        setListHistoryState(updateCurrentState);
    }

    const handleEnterKey = () => {
        if(isEmpty(itemText)) {
            // PERFORM AN UNDO IF ITEM TEXT IS EMPTY
            const undoHistoryState = moveCurrentState(listHistoryState);
            setListHistoryState([...undoHistoryState]);
            return;
        }

        const updatedTextArray = updateItemText(id, itemText, currentListView);

        // update text item in history
        let updateCurrentState = updateLatestChangeToDoHistory(updatedTextArray, listHistoryState);

        const updatedArrayWithNewItem = addNewItemToList(updatedTextArray);

        updateCurrentState = updateLatestChangeToDoHistory(updatedArrayWithNewItem, updateCurrentState, true);
        setListHistoryState(updateCurrentState);
    }

    function onStaticTextClick() {
        const updatedArray = changeEditMode(id, true, currentListView);
        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState, true);

        setListHistoryState(updateCurrentState);
    }

    const renderTextOrInput = () => {
        return editMode ?
        /* RENDER INPUT */
        (<input
            id={`text-input-${id}`}
            autoFocus={editMode}
            className='w-full active:w-full focus:text-yellow-950 pl-1'
            placeholder="Type to-do item here"
            type="text"
            value={itemText}
            onChange={(e) => setItemText(e.target.value)}
            onBlur={() => handleOnInputBlur()}
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleEnterKey()
            }}
        />) :
            /* RENDER STATIC TEXT */
            <div
                className='cursor-pointer text-left text-wrap break-words'
                onClick={() => onStaticTextClick()}
                id={`list-item-text-${id}`}
            >
                {text}
            </div>
    }

    function onDeleteItem() {
        const updatedArray = deleteItem(id, currentListView);
        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState);

        setListHistoryState(updateCurrentState);
    }

    return (
        <div className={
            classNames('flex w-full px-4 justify-between hover:bg-secondary-bg',
                {'line-through italic': checked, '': !checked})
            }
            id={`list-item-${id}`}
        >
            {/* LIST ITEM INPUT/TEXT ITEM */}
            <div className='flex m-2' id={`checkbox-${id}`}>
                <label id={`label-${id}`} aria-label={text}/>
                <input
                    id={`checkbox-${id}`}
                    aria-label={text}
                    aria-labelledby={`label-${id}`}
                    type="checkbox"
                    checked={checked}
                    className={classNames('mr-2 w-[24px] h-[24px] min-w-[24px] min-h-[24px]', {'font-bold': checked, 'font-light': !checked})}
                    onChange={(e) => handleCheckboxChange(!checked)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckboxChange(!checked);
                    }}
                />
                {renderTextOrInput()}
            </div>
            {/* DELETE INDIVIDUAL ITEM BUTTON */}
            <div className='items-end' data-testid='delete-icon' id={`to-do-delete-${id}`}>
                <button
                    data-testid='delete-item-icon'
                    id='delete-item-icon'
                    name='delete-item-icon'
                    type='button'
                    className='bold text-xl'
                    onClick={()=> onDeleteItem()}
                >
                    <FontAwesomeIcon icon={faCircleMinus} className='pt-2' />
                </button>
            </div>
        </div>
    );
}

ListItem.propTypes = {
    checked: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    listHistoryState:  PropTypes.arrayOf(PropTypes.shape({
        isCurrent: PropTypes.bool,
        list: PropTypes.arrayOf(PropTypes.shape({
            checked: PropTypes.bool,
            editMode: PropTypes.bool,
            id: PropTypes.string,
            text: PropTypes. string
        }))
    })).isRequired,
    setListHistoryState: PropTypes.func.isRequired,
    text: PropTypes.string
};

export default ListItem;