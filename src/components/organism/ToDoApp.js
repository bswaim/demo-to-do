import React, {useState} from 'react';
import AddListItem from "../atom/AddListItem";
import {
    addNewItemToList,
    moveCurrentState,
    removeCheckedItems, updateLatestChangeToDoHistory
} from "../../utils/utils";
import CheckListSection from "../molecule/CheckListSection";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckDouble,
    faListCheck,
    faRotateLeft,
    faRotateRight,
    faTrash,
    faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import {find} from "lodash";
import {v4 as uuidv4} from "uuid";

function ToDoApp() {
    const initialList = [
        {text: 'View resume and cover letter', checked: false, editMode: false, id: uuidv4()},
        {text: 'View Recommendations', checked: false, editMode: false, id: uuidv4()},
        {text: 'Make a to-do app', checked: true, editMode: false, id: uuidv4()}
    ]
    const [listHistoryState, setListHistoryState] = useState([{isCurrent: true, list: initialList, isInEditMode: false}]);
    const currentListView = find(listHistoryState, x => x.isCurrent)?.list || [];
    const undoEnabledLogic = !(listHistoryState[0]?.isCurrent); // if first item in list is not current view
    const redoEnabledLogic = !(listHistoryState[listHistoryState.length -1]?.isCurrent); // if last item in list's isCurrent prop is NOT true

    const deleteAllItems = () => {
        const updateCurrentState = updateLatestChangeToDoHistory([], listHistoryState);
        setListHistoryState([...updateCurrentState])
    }
    const deleteCompletedItems = () => {
        const updatedArray = removeCheckedItems([...currentListView]);
        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState);
        setListHistoryState([...updateCurrentState])
    }
    const moveUpOrDownHistoryListState = (undo) => {
        const updateCurrentState = moveCurrentState(listHistoryState, undo);
        setListHistoryState([...updateCurrentState]);
    }

    // todo: add a way to mark all completed
    // const markAllCompleted = (list) => {
    //     const updatedArray = checkAllItems(listHistoryState);
    //     const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState);
    //     setListHistoryState([...updateCurrentState]);
    // }

    return (
        <div
            id='todo-id'
            data-testid='todo-id'
            className='todo-container bg-primary-bg w-full rounded-2xl border-2 border-solid border-black p-4'
        >
            <h1 className='text-center text-xl border-b-2 border-b-primary border-solid pb-2 pl-4 flex justify-between'>
                <div>To-Do App</div>
                {/* DELETE ALL ITEMS BUTTON */}
                <button
                    aria-description='delete all list items'
                    data-testid='delete-all-icon'
                    id='delete-all-icon'
                    name='delete-all-icon'
                    onClick={() => deleteAllItems()}
                >
                    <FontAwesomeIcon icon={faTrash} className='text-delete-color'/>
                </button>
            </h1>
            {/* TO DO ITEMS START */}
            <div className='mt-4'>
                <CheckListSection
                    listHistoryState={listHistoryState}
                    setListHistoryState={(e) => setListHistoryState([...e])} // need to update list
                />
            </div>
            <div className='text-left'>
                <AddListItem onClicked={() => {
                    const updatedArray = addNewItemToList(currentListView);
                    const updatedListHistory = updateLatestChangeToDoHistory(updatedArray, listHistoryState, true);
                    setListHistoryState([...updatedListHistory]);
                }}/>
            </div>

            {/* SEPARATOR */}
            <div className='w-full h-2 border-b-2 border-b-primary border-dashed mb-4'/>

            {/* COMPLETED SECTION START */}
            <h2 className='text-left ml-6 flex justify-between'>
                COMPLETED
                <button
                    aria-description='delete all completed list items'
                    id='delete-all-checked-icon'
                    name='delete-all-checked-icon'
                    data-testid='delete-all-checked-icon'
                    onClick={() => deleteCompletedItems()}
                >
                    <FontAwesomeIcon icon={faTrashAlt} className='text-delete-color'/>
                    <FontAwesomeIcon icon={faCheckDouble} className='text-delete-color ml-1'/>
                </button>
            </h2>
            <CheckListSection
                groupedByUnChecked
                listHistoryState={listHistoryState}
                setListHistoryState={(e) => setListHistoryState([...e])}
            />

            {/* UNDO AND REDO BUTTONS */}
            <div className='flex justify-between px-4 mt-8 text-2xl bg-white rounded-b-lg'>
                <button
                    id='undo'
                    className={undoEnabledLogic ? 'cursor-pointer' : 'cursor-default'}
                    onClick={() => moveUpOrDownHistoryListState(true)}
                    data-testid='undo-icon'
                    disabled={!undoEnabledLogic}
                >
                    <FontAwesomeIcon icon={faRotateLeft} className={undoEnabledLogic ? 'text-secondary-text' : 'text-gray-500'}/>
                </button>
                <button
                    id='redo'
                    className={redoEnabledLogic ? 'cursor-pointer' : 'cursor-default'}
                    onClick={() => moveUpOrDownHistoryListState(false)}
                    data-testid='redo-icon'
                    disabled={!redoEnabledLogic}
                >
                    <FontAwesomeIcon icon={faRotateRight} className={redoEnabledLogic ? 'text-secondary-text' : 'text-gray-500'}/>
                </button>
            </div>
        </div>
    );
}
export default ToDoApp;