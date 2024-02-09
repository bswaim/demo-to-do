import {
    addNewItemToList,
    changeCheckedState,
    changeEditMode,
    clearIsCurrentProps,
    deleteItem,
    limitListLength,
    moveCurrentState,
    removeAllEditModeFromHistory,
    removeCheckedItems,
    updateItemText,
    updateLatestChangeToDoHistory
} from "../utils/utils";
import {
    changeCheckedStateResult,
    changeEditModeResult,
    clearIsCurrentPropsResult,
    id1,
    initialListMock,
    initialMoveCurrentMockData,
    limitListLengthMockInitialList,
    limitListLengthMockResult,
    mockListHistoryInitialState,
    newListItemWithEditFalse,
    newListItemWithEditTrue,
    newText,
    removeAllEditModeFromHistoryInitialMockData,
    removeAllEditModeFromHistoryResult,
    updateItemTextResult,
    updateLatestChangeToDoHistoryResultWithEditModeFalse,
    updateLatestChangeToDoHistoryResultWithEditModeTrue
} from "../utils/mockData";

describe('utils', () => {
    // LIST
    test('limitListLength', () => {
        const result = limitListLength(limitListLengthMockInitialList, 5);
        expect(result).toEqual(limitListLengthMockResult);
    });
    test('changeEditMode', () => {
        const result = changeEditMode(id1, true, initialListMock);
        expect(result).toMatchObject(changeEditModeResult);
    });
    test('updateItemText', () => {
        const result = updateItemText(id1, newText, initialListMock);
        expect(result).toMatchObject(updateItemTextResult);
    });
    test('addNewItemToList', () => {
        const result = addNewItemToList(initialListMock);

        function idIsGuid(str) {
            const guidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return guidPattern.test(str);
        }

        const indexOfNewItem = result.length - 1;
        const newItemId = result[indexOfNewItem].id;
        const newItemText = result[indexOfNewItem].text;
        const newItemEditMode = result[indexOfNewItem].editMode;
        const newItemChecked = result[indexOfNewItem].checked;

        expect(result).toHaveLength(initialListMock.length + 1);
        expect(idIsGuid(newItemId)).toBe(true);
        expect(newItemText).toBe('');
        expect(newItemEditMode).toBeTruthy();
        expect(newItemChecked).toBeFalsy();
    });
    test('changeCheckedState', () => {
        const result = changeCheckedState(id1, initialListMock, true);
        expect(result).toMatchObject(changeCheckedStateResult);
    });
    test('deleteItem', () => {
        const result = deleteItem(id1, initialListMock);
        expect(result).toMatchObject([initialListMock[1]]);
    });
    test('removeCheckedItems', () => {
        const result = removeCheckedItems(initialListMock);
        expect(result).toMatchObject([initialListMock[0]]);
    });

    // LIST HISTORY
    test('clearIsCurrentProps', () => {
        const result = clearIsCurrentProps(mockListHistoryInitialState);
        expect(result).toMatchObject(clearIsCurrentPropsResult);
    });
    test('removeAllEditModeFromHistory', () => {
        const result = removeAllEditModeFromHistory(removeAllEditModeFromHistoryInitialMockData);
        expect(result).toMatchObject(removeAllEditModeFromHistoryResult);
    });
    test('moveCurrentState undo true', () => {
        const result = moveCurrentState(initialMoveCurrentMockData);
        const isCurrentIndex = result.findIndex(x => x.isCurrent);
        expect(isCurrentIndex).toBe(0);
    });
    test('moveCurrentState undo false', () => {
        const result = moveCurrentState(initialMoveCurrentMockData, false);
        const isCurrentIndex = result.findIndex(x => x.isCurrent);
        expect(isCurrentIndex).toBe(2);
    });
    test('updateLatestChangeToDoHistory editMode true', () => {
        const result = updateLatestChangeToDoHistory(
            newListItemWithEditTrue,
            mockListHistoryInitialState,
            true
        );
        expect(result).toMatchObject(updateLatestChangeToDoHistoryResultWithEditModeTrue);
    });
    test('updateLatestChangeToDoHistory editMode false', () => {
        const result = updateLatestChangeToDoHistory(
            newListItemWithEditFalse,
            updateLatestChangeToDoHistoryResultWithEditModeTrue,
            false
        );
        expect(result).toMatchObject(updateLatestChangeToDoHistoryResultWithEditModeFalse);
    });
});
