import React, {useEffect, useState} from 'react';
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

function ToDoApp() {
    const [listHistoryState, setListHistoryState] = useState([{isCurrent: true, list: [], isInEditMode: false}]);
    const currentListView = find([...listHistoryState], x => x.isCurrent)?.list || [];

    const undoEnabledLogic = !([...listHistoryState][0]?.isCurrent); // if first item in list is not current view
    const redoEnabledLogic = !([...listHistoryState][listHistoryState.length -1]?.isCurrent); // if last item in list's isCurrent prop is NOT true


    useEffect(() => {
        //TEST
        console.log('listHistoryState changed!');
        console.log('listHistoryState');
        console.log(listHistoryState);
        // console.log('currentListView');
        // console.log(currentListView);

    }, [listHistoryState]);

    const deleteAllItems = () => {
        const updateCurrentState = updateLatestChangeToDoHistory([], listHistoryState)
        setListHistoryState([...updateCurrentState])
    }
    const deleteAllCompletedItems = () => {
        const updatedArray = removeCheckedItems([...currentListView]);
        const updateCurrentState = updateLatestChangeToDoHistory(updatedArray, listHistoryState)
        setListHistoryState([...updateCurrentState])
    }
    const undoListStateChange = () => {
        const updateCurrentState = moveCurrentState(listHistoryState);
        setListHistoryState([...updateCurrentState]);
    }
    const redoListStateChange = () => {
        // setUndoRedoInProgress(true);

        const updateCurrentState = moveCurrentState(listHistoryState, false);
        setListHistoryState([...updateCurrentState]);
    }

    return (
        <div id='todo-id' className='todo-container bg-primary-bg max-w-2xl rounded-2xl border-2 border-solid border-black p-4'>
            <h1 className='text-center text-xl border-b-2 border-b-primary border-solid pb-2 pl-4 flex justify-between'>
                <div>To-Do App</div>
                {/* DELETE ALL ITEMS BUTTON */}
                <button onClick={() => deleteAllItems()}>
                    <FontAwesomeIcon icon={faTrash} className='text-delete-color'/>
                    <FontAwesomeIcon icon={faListCheck} className='text-delete-color ml-1'/>
                </button>
            </h1>

            {/* TO DO ITEMS START */}
            <CheckListSection
                listHistoryState={listHistoryState}
                setListHistoryState={(e) => setListHistoryState([...e])} // need to update list
            />
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
                <button onClick={() => deleteAllCompletedItems()}>
                    <FontAwesomeIcon icon={faTrashAlt} className='text-delete-color'/>
                    <FontAwesomeIcon icon={faCheckDouble} className='text-delete-color ml-1'/>
                </button>
            </h2>
            <CheckListSection
                groupedByUnChecked
                listHistoryState={listHistoryState}
                setListHistoryState={(e) => setListHistoryState([...e])}
            />

            {/* UNDO BUTTON */}
            <div className='flex justify-between px-4 mt-8 text-2xl bg-white rounded-b-lg'>
                <button
                    id='undo'
                    className={undoEnabledLogic ? 'cursor-pointer' : 'cursor-default'}
                    onClick={() => undoListStateChange()}
                    disabled={!(undoEnabledLogic)}
                >
                    <FontAwesomeIcon icon={faRotateLeft} className={undoEnabledLogic ? 'text-secondary-text' : 'text-gray-500'}/>
                </button>

                {/* REDO BUTTON */}
                <button
                    id='redo'
                    className='cursor-pointer'
                    onClick={() => redoListStateChange()}
                    disabled={!(redoEnabledLogic)}
                >
                    <FontAwesomeIcon icon={faRotateRight} className={redoEnabledLogic ? 'text-secondary-text' : 'text-gray-500'}/>
                </button>
            </div>
        </div>
    );
}
export default ToDoApp;