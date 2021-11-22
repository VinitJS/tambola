import TicketActionTypes from "./ticket.types";
import { resetClaimedCount } from "../claims/claims.actions";
import { setChosenDraw } from "../drawing/drawing.actions";
import { joinGame } from "../../utils/firebase";
import { resetClapped } from "../playing/playing.actions";

export const toggleTick = (index, i, ticketNumber) => (
    {
        type: TicketActionTypes.TOGGLE_TICK,
        payload: { index, i, ticketNumber }
    }
)

export const createTicketSuccess = (myTicket, columnDensity, tVersion, myTNums, myTicket1, columnDensity1, myTNums1) => (
    {
        type: TicketActionTypes.SET_MYTICKET,
        payload: { myTicket, myTNums, columnDensity, tVersion, creatingTicket: false }
    }
)

export const setJoinFailure = (message) => (
    {
        type: TicketActionTypes.SET_JOIN_ERROR,
        payload: message
    }
)

export const resetTicket = () => (
    {
        type: TicketActionTypes.RESET_TICKET
    }
)

export const setCreatingTicket = (bool) => (
    {
        type: TicketActionTypes.SET_CREATING_TICKET,
        payload: bool
    }
)

export const createTicket = (tVersion, gameId, userId, name, v, p, shouldReset) => (
    (dispatch) => {
        dispatch(setCreatingTicket(true));
        const columnCount = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
        const rowCount = [0, 0, 0];
        const myT = [
            [-1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1, -1, -1, -1, -1]
        ];
        for (let i = 0; i < 9; i++) {
            const randRow = Math.floor(Math.random() * 3);
            if (rowCount[randRow] > 4 || (i > 1 && (myT[randRow][i - 1] === 0 && myT[randRow][i - 2] === 0))) {
                i--;
            } else {
                myT[randRow][i] = 0;
                rowCount[randRow] = rowCount[randRow] + 1;
                columnCount[i] = columnCount[i] + 1;
            }
        }
        for (let k = 0; k < 3; k++) {
            for (let j = rowCount[k]; j < 5; j++) {
                const rand = Math.floor(Math.random() * 9);
                if (myT[k][rand] === 0
                    || (myT[k][rand - 1] === 0 && myT[k][rand - 2] === 0)
                    || (myT[k][rand + 1] === 0 && myT[k][rand + 2] === 0)
                    || (myT[k][rand - 1] === 0 && myT[k][rand + 1] === 0)) {
                    j--;
                } else {
                    myT[k][rand] = 0;
                    rowCount[k] = rowCount[k] + 1;
                    columnCount[rand] = columnCount[rand] + 1;
                }
            }
        }

        let rand;
        let alt = 0;
        let myTNums = [];
        const allNums = [
            [[1, 3, 5, 7, 9], [2, 4, 6, 8]],
            [[11, 13, 15, 17, 19], [10, 12, 14, 16, 18]],
            [[21, 23, 25, 27, 29], [20, 22, 24, 26, 28]],
            [[31, 33, 35, 37, 39], [30, 32, 34, 36, 38]],
            [[41, 43, 45, 47, 49], [40, 42, 44, 46, 48]],
            [[51, 53, 55, 57, 59], [50, 52, 54, 56, 58]],
            [[61, 63, 65, 67, 69], [60, 62, 64, 66, 68]],
            [[71, 73, 75, 77, 79], [70, 72, 74, 76, 78]],
            [[81, 83, 85, 87, 89], [80, 82, 84, 86, 88]]
        ];
        for (let j = 0; j < 9; j++) {
            let pickArr = [];
            const tempCallArr = [];
            for (let l = 0; l < columnCount[j] + 1; l++) {
                pickArr = allNums[j][alt];
                rand = pickArr.splice(Math.floor(Math.random() * pickArr.length), 1)[0];
                tempCallArr.push(rand)
                if (alt === 0) {
                    alt = 1;
                } else {
                    alt = 0;
                }
            }
            tempCallArr.sort();
            for (let m = 2; m > -1; m--) {
                if (myT[m][j] === 0) {
                    rand = tempCallArr.pop();
                    myT[m][j] = [rand, false];
                    myTNums.push(rand);
                }
            }
        }

        joinGame(gameId, userId, name, v, p, myTNums, shouldReset)
            .then(() => {
                dispatch(createTicketSuccess(myT, columnCount, tVersion, myTNums));
                if(shouldReset) {
                    dispatch(resetClaimedCount());
                    dispatch(setChosenDraw(true));
                    dispatch(resetClapped());
                }
            }).catch((error) => {
                setJoinFailure(error.message);
            })
    }
)