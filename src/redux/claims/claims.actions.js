import ClaimsActionTypes from "./claims.types";
import { saveClaim } from "../../utils/firebase";
import { increaseUserV, increasePoints } from "../user/user.actions";

export const setClaimsSuccess = (claimList) => (
    {
        type: ClaimsActionTypes.SET_CLAIMS_SUCCESS,
        payload: claimList
    }
)

export const setClaimingError = (message) => (
    {
        type: ClaimsActionTypes.SET_CLAIMING_ERROR,
        payload: { isClaiming: false, error: message }
    }
)

export const setBogusClaim = () => (
    {
        type: ClaimsActionTypes.SET_BOGUS_CLAIM
    }
)

export const setClaimedSuccess = (chances) => (
    {
        type: ClaimsActionTypes.SET_CLAIMED_SUCCESS,
        payload: chances
    }
)

export const setClaiming = (isClaiming) => (
    {
        type: ClaimsActionTypes.SET_CLAIMING,
        payload: isClaiming
    }
)

export const resetClaimedCount = () => (
    {
        type: ClaimsActionTypes.RESET_CLAIMED_COUNT
    }
)

export const resetClaims = () => (
    {
        type: ClaimsActionTypes.RESET_CLAIMS
    }
)

export const claimClaim = (gameId, coins, claim, userId, userName, myTicket, columnDensity, xx, size) => (
    (dispatch) => {
        try {
            dispatch(setClaiming(true));
            let ticketList, markedListValidNums, i, j, k, count;
            let failingCondition = true;
            let points = claim.points;
            switch (claim.name) {
                case "early":
                    markedListValidNums = myTicket.flat().filter(ele => Array.isArray(ele) && ele[1] && coins.includes(ele[0]));
                    if (markedListValidNums.length > 0) {
                        failingCondition = false;
                    }
                    break;
                case "twin":
                    const twinCoins = coins.filter(coin => [11, 22, 33, 44, 55, 66, 77, 88].includes(coin));
                    markedListValidNums = myTicket.flat().filter(ele => Array.isArray(ele) && ele[1] && coins.includes(ele[0]));
                    if (markedListValidNums.some(num => twinCoins.includes(num[0]))) {
                        failingCondition = false;
                    }
                    break;
                case "topFirst":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[0][1] && coins.includes(ticketList[0][0])) {
                        failingCondition = false;
                    }
                    break;
                case "topCenter":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[2][1] && coins.includes(ticketList[2][0])) {
                        failingCondition = false;
                    }
                    break;
                case "topLast":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[4][1] && coins.includes(ticketList[4][0])) {
                        failingCondition = false;
                    }
                    break;
                case "middleFirst":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[5][1] && coins.includes(ticketList[5][0])) {
                        failingCondition = false;
                    }
                    break;
                case "middleCenter":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[7][1] && coins.includes(ticketList[7][0])) {
                        failingCondition = false;
                    }
                    break;
                case "middleLast":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[9][1] && coins.includes(ticketList[9][0])) {
                        failingCondition = false;
                    }
                    break;
                case "bottomFirst":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[10][1] && coins.includes(ticketList[10][0])) {
                        failingCondition = false;
                    }
                    break;
                case "bottomCenter":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[12][1] && coins.includes(ticketList[12][0])) {
                        failingCondition = false;
                    }
                    break;
                case "bottomLast":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[14][1] && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "earlyfive":
                    markedListValidNums = myTicket.flat().filter(ele => Array.isArray(ele) && ele[1] && coins.includes(ele[0]));
                    if (markedListValidNums.length > 4) {
                        failingCondition = false;
                    }
                    break;
                case "unlucky":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (coins.length > 12 && ticketList.every(cell => !coins.slice(0, 13).includes(cell[0]))) {
                        failingCondition = false;
                    }
                    break;
                case "zerox":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][0] !== -1 && (myTicket[i][0][1] && coins.includes(myTicket[i][0][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "onex":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][1] !== -1 && (myTicket[i][1][1] && coins.includes(myTicket[i][1][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "twox":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][2] !== -1 && (myTicket[i][2][1] && coins.includes(myTicket[i][2][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "threex":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][3] !== -1 && (myTicket[i][3][1] && coins.includes(myTicket[i][3][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "fourx":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][4] !== -1 && (myTicket[i][4][1] && coins.includes(myTicket[i][4][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "fivex":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][5] !== -1 && (myTicket[i][5][1] && coins.includes(myTicket[i][5][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "sixx":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][6] !== -1 && (myTicket[i][6][1] && coins.includes(myTicket[i][6][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "sevenx":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][7] !== -1 && (myTicket[i][7][1] && coins.includes(myTicket[i][7][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "eightx":
                    count = 0;
                    for (i = 0; i < 3; i++) {
                        if (myTicket[i][8] !== -1 && (myTicket[i][8][1] && coins.includes(myTicket[i][8][0]))) {
                            count++;
                        }
                    }
                    if (count > 1) {
                        failingCondition = false;
                    }
                    break;
                case "minmax":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele)).sort((a, b) => a[0] > b[0] ? 1 : -1);
                    if (ticketList[0][1]
                        && ticketList[14][1]
                        && coins.includes(ticketList[0][0])
                        && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "antilla":
                    if (myTicket[0].some(cell => cell !== -1 && cell[1] && coins.includes(cell[0]))
                        && myTicket[1].some(cell => cell !== -1 && cell[1] && coins.includes(cell[0]))
                        && myTicket[2].some(cell => cell !== -1 && cell[1] && coins.includes(cell[0]))) {
                        failingCondition = false;
                    }
                    break;
                case "tower":
                    columnDensity.forEach((value, index) => {
                        if (value > 1) {
                            if (myTicket[0][index][1]
                                && myTicket[1][index][1]
                                && myTicket[2][index][1]
                                && coins.includes(myTicket[0][index][0])
                                && coins.includes(myTicket[1][index][0])
                                && coins.includes(myTicket[2][index][0])) {
                                failingCondition = false;
                            }
                        }
                    });
                    break;
                case "firsts":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[0][1]
                        && ticketList[5][1]
                        && ticketList[10][1]
                        && coins.includes(ticketList[0][0])
                        && coins.includes(ticketList[5][0])
                        && coins.includes(ticketList[10][0])) {
                        failingCondition = false;
                    }
                    break;
                case "seconds":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[1][1]
                        && ticketList[6][1]
                        && ticketList[11][1]
                        && coins.includes(ticketList[1][0])
                        && coins.includes(ticketList[6][0])
                        && coins.includes(ticketList[11][0])) {
                        failingCondition = false;
                    }
                    break;
                case "centers":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[2][1]
                        && ticketList[7][1]
                        && ticketList[12][1]
                        && coins.includes(ticketList[2][0])
                        && coins.includes(ticketList[7][0])
                        && coins.includes(ticketList[12][0])) {
                        failingCondition = false;
                    }
                    break;
                case "fourths":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[3][1]
                        && ticketList[8][1]
                        && ticketList[13][1]
                        && coins.includes(ticketList[3][0])
                        && coins.includes(ticketList[8][0])
                        && coins.includes(ticketList[13][0])) {
                        failingCondition = false;
                    }
                    break;
                case "lasts":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[4][1]
                        && ticketList[9][1]
                        && ticketList[14][1]
                        && coins.includes(ticketList[4][0])
                        && coins.includes(ticketList[9][0])
                        && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "news":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[2][1]
                        && ticketList[5][1]
                        && ticketList[9][1]
                        && ticketList[12][1]
                        && coins.includes(ticketList[2][0])
                        && coins.includes(ticketList[5][0])
                        && coins.includes(ticketList[9][0])
                        && coins.includes(ticketList[12][0])) {
                        failingCondition = false;
                    }
                    break;
                case "charminar":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[0][1]
                        && ticketList[4][1]
                        && ticketList[10][1]
                        && ticketList[14][1]
                        && coins.includes(ticketList[0][0])
                        && coins.includes(ticketList[4][0])
                        && coins.includes(ticketList[10][0])
                        && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "fivestar":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[0][1]
                        && ticketList[4][1]
                        && ticketList[7][1]
                        && ticketList[10][1]
                        && ticketList[14][1]
                        && coins.includes(ticketList[0][0])
                        && coins.includes(ticketList[4][0])
                        && coins.includes(ticketList[7][0])
                        && coins.includes(ticketList[10][0])
                        && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "topRow":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[0][1]
                        && ticketList[1][1]
                        && ticketList[2][1]
                        && ticketList[3][1]
                        && ticketList[4][1]
                        && coins.includes(ticketList[0][0])
                        && coins.includes(ticketList[1][0])
                        && coins.includes(ticketList[2][0])
                        && coins.includes(ticketList[3][0])
                        && coins.includes(ticketList[4][0])) {
                        failingCondition = false;
                    }
                    break;
                case "middleRow":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[5][1]
                        && ticketList[6][1]
                        && ticketList[7][1]
                        && ticketList[8][1]
                        && ticketList[9][1]
                        && coins.includes(ticketList[5][0])
                        && coins.includes(ticketList[6][0])
                        && coins.includes(ticketList[7][0])
                        && coins.includes(ticketList[8][0])
                        && coins.includes(ticketList[9][0])) {
                        failingCondition = false;
                    }
                    break;
                case "bottomRow":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[10][1]
                        && ticketList[11][1]
                        && ticketList[12][1]
                        && ticketList[13][1]
                        && ticketList[14][1]
                        && coins.includes(ticketList[10][0])
                        && coins.includes(ticketList[11][0])
                        && coins.includes(ticketList[12][0])
                        && coins.includes(ticketList[13][0])
                        && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "breakfast":
                    failingCondition = false;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 3; j++) {
                            if (Array.isArray(myTicket[i][j]) && (!myTicket[i][j][1] || !coins.includes(myTicket[i][j][0]))) {
                                failingCondition = true;
                            }
                        }
                    }
                    break;
                case "lunch":
                    failingCondition = false;
                    for (i = 0; i < 3; i++) {
                        for (j = 3; j < 6; j++) {
                            if (Array.isArray(myTicket[i][j]) && (!myTicket[i][j][1] || !coins.includes(myTicket[i][j][0]))) {
                                failingCondition = true;
                            }
                        }
                    }
                    break;
                case "dinner":
                    failingCondition = false;
                    for (i = 0; i < 3; i++) {
                        for (j = 6; j < 9; j++) {
                            if (Array.isArray(myTicket[i][j]) && (!myTicket[i][j][1] || !coins.includes(myTicket[i][j][0]))) {
                                failingCondition = true;
                            }
                        }
                    }
                    break;
                case "day":
                    failingCondition = false;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 5; j++) {
                            if (Array.isArray(myTicket[i][j]) && (!myTicket[i][j][1] || !coins.includes(myTicket[i][j][0]))) {
                                failingCondition = true;
                            }
                        }
                    }
                    break;
                case "night":
                    failingCondition = false;
                    for (i = 0; i < 3; i++) {
                        for (j = 5; j < 9; j++) {
                            if (Array.isArray(myTicket[i][j]) && (!myTicket[i][j][1] || !coins.includes(myTicket[i][j][0]))) {
                                failingCondition = true;
                            }
                        }
                    }
                    break;
                case "zebra":
                    failingCondition = false;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 9; j = j + 2) {
                            if (Array.isArray(myTicket[i][j]) && (!myTicket[i][j][1] || !coins.includes(myTicket[i][j][0]))) {
                                failingCondition = true;
                            }
                        }
                    }
                    break;
                case "couples":
                    failingCondition = false;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 8; j++) {
                            if (Array.isArray(myTicket[i][j]) && Array.isArray(myTicket[i][j + 1]) && (!myTicket[i][j][1] || !myTicket[i][j + 1][1] || !coins.includes(myTicket[i][j][0]) || !coins.includes(myTicket[i][j + 1][0]))) {
                                failingCondition = true;
                            }
                        }
                    }
                    break;
                case "singles":
                    failingCondition = false;
                    for (i = 0; i < 3; i++) {
                        for (j = 0; j < 9; j++) {
                            if (Array.isArray(myTicket[i][j]) && !Array.isArray(myTicket[i][j + 1]) && !Array.isArray(myTicket[i][j - 1]) && (!myTicket[i][j][1] || !coins.includes(myTicket[i][j][0]))) {
                                failingCondition = true;
                            }
                        }
                    }
                    break;
                case "sides":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[0][1]
                        && ticketList[4][1]
                        && ticketList[5][1]
                        && ticketList[9][1]
                        && ticketList[10][1]
                        && ticketList[14][1]
                        && coins.includes(ticketList[0][0])
                        && coins.includes(ticketList[4][0])
                        && coins.includes(ticketList[5][0])
                        && coins.includes(ticketList[9][0])
                        && coins.includes(ticketList[10][0])
                        && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "twolanes":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[1][1]
                        && ticketList[3][1]
                        && ticketList[6][1]
                        && ticketList[8][1]
                        && ticketList[11][1]
                        && ticketList[13][1]
                        && coins.includes(ticketList[1][0])
                        && coins.includes(ticketList[3][0])
                        && coins.includes(ticketList[6][0])
                        && coins.includes(ticketList[8][0])
                        && coins.includes(ticketList[11][0])
                        && coins.includes(ticketList[13][0])) {
                        failingCondition = false;
                    }
                    break;
                case "odds":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    failingCondition = ticketList.filter(ele => ele[0] % 2 === 1).some(ele => !ele[1] || !coins.includes(ele[0]));
                    break;
                case "evens":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    failingCondition = ticketList.filter(ele => ele[0] % 2 === 0).some(ele => !ele[1] || !coins.includes(ele[0]))
                    break;
                case "earlyten":
                    markedListValidNums = myTicket.flat().filter(ele => Array.isArray(ele) && ele[1] && coins.includes(ele[0]));
                    if (markedListValidNums.length > 9) {
                        failingCondition = false;
                    }
                    break;
                case "rain":
                    k = 0;
                    for (i = 0; i < 9; i++) {
                        if ((Array.isArray(myTicket[0][i]) && myTicket[0][i][1] && coins.includes(myTicket[0][i][0]))
                            || (Array.isArray(myTicket[1][i]) && myTicket[1][i][1] && coins.includes(myTicket[1][i][0]))
                            || (Array.isArray(myTicket[2][i]) && myTicket[2][i][1] && coins.includes(myTicket[2][i][0]))) {
                            k++;
                        }
                    }
                    if (k === 9) {
                        failingCondition = false;
                    }
                    break;
                case "snow":
                    k = 0;
                    for (i = 0; i < 9; i++) {
                        for (j = 0; j < 3; j++) {
                            if (Array.isArray(myTicket[j][i])) {
                                if (myTicket[j][i][1] && coins.includes(myTicket[j][i][0])) {
                                    k++;
                                }
                                j = 2;
                            }
                        }
                    }
                    if (k === 9) {
                        failingCondition = false;
                    }
                    break;
                case "bush":
                    k = 0;
                    for (i = 0; i < 9; i++) {
                        for (j = 2; j > -1; j--) {
                            if (Array.isArray(myTicket[j][i])) {
                                if (myTicket[j][i][1] && coins.includes(myTicket[j][i][0])) {
                                    k++;
                                }
                                j = 0;
                            }
                        }
                    }
                    if (k === 9) {
                        failingCondition = false;
                    }
                    break;
                case "triangle":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[2][1]
                        && ticketList[6][1]
                        && ticketList[7][1]
                        && ticketList[8][1]
                        && ticketList[10][1]
                        && ticketList[11][1]
                        && ticketList[12][1]
                        && ticketList[13][1]
                        && ticketList[14][1]
                        && coins.includes(ticketList[2][0])
                        && coins.includes(ticketList[6][0])
                        && coins.includes(ticketList[7][0])
                        && coins.includes(ticketList[8][0])
                        && coins.includes(ticketList[10][0])
                        && coins.includes(ticketList[11][0])
                        && coins.includes(ticketList[12][0])
                        && coins.includes(ticketList[13][0])
                        && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "cone":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[0][1]
                        && ticketList[1][1]
                        && ticketList[2][1]
                        && ticketList[3][1]
                        && ticketList[4][1]
                        && ticketList[6][1]
                        && ticketList[7][1]
                        && ticketList[8][1]
                        && ticketList[12][1]
                        && coins.includes(ticketList[0][0])
                        && coins.includes(ticketList[1][0])
                        && coins.includes(ticketList[2][0])
                        && coins.includes(ticketList[3][0])
                        && coins.includes(ticketList[4][0])
                        && coins.includes(ticketList[6][0])
                        && coins.includes(ticketList[7][0])
                        && coins.includes(ticketList[8][0])
                        && coins.includes(ticketList[12][0])) {
                        failingCondition = false;
                    }
                    break;
                case "navgraha":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList[0][1]
                        && ticketList[2][1]
                        && ticketList[4][1]
                        && ticketList[5][1]
                        && ticketList[7][1]
                        && ticketList[9][1]
                        && ticketList[10][1]
                        && ticketList[12][1]
                        && ticketList[14][1]
                        && coins.includes(ticketList[0][0])
                        && coins.includes(ticketList[2][0])
                        && coins.includes(ticketList[4][0])
                        && coins.includes(ticketList[5][0])
                        && coins.includes(ticketList[7][0])
                        && coins.includes(ticketList[9][0])
                        && coins.includes(ticketList[10][0])
                        && coins.includes(ticketList[12][0])
                        && coins.includes(ticketList[14][0])) {
                        failingCondition = false;
                    }
                    break;
                case "border":
                    if (myTicket[0].filter(ele => Array.isArray(ele) && ele[1] && coins.includes(ele[0])).length === 5
                        && myTicket[2].filter(ele => Array.isArray(ele) && ele[1] && coins.includes(ele[0])).length === 5
                        && (Array.isArray(myTicket[1][0]) ? (myTicket[1][0][1] && coins.includes(myTicket[1][0][0])) : true)
                        && (Array.isArray(myTicket[1][8]) ? (myTicket[1][8][1] && coins.includes(myTicket[1][8][0])) : true)) {
                        failingCondition = false;
                    }
                    break;
                case "oneleft":
                    markedListValidNums = myTicket.flat().filter(ele => Array.isArray(ele) && ele[1] && coins.includes(ele[0]));
                    if (markedListValidNums.length > 13) {
                        failingCondition = false;
                        points = points + claim.points - 1
                    }
                    break;
                case "fullHouse":
                    ticketList = myTicket.flat().filter(ele => Array.isArray(ele));
                    if (ticketList.every(ele => ele[1] && coins.includes(ele[0]))) {
                        failingCondition = false;
                    }
                    break;
                default:
                    dispatch(setClaimingError("No matching claims!"));
                    break;
            }
            if (failingCondition) {
                alert("Bogus Claim!");
                dispatch(setBogusClaim());
            } else {
                saveClaim(
                    gameId,
                    claim.name,
                    userName,
                    userId,
                    xx ? points + claim.points : points
                ).then(function () {
                    dispatch(setClaimedSuccess(claim.name === "oneleft" ? 2 : 1));
                    if(size > 3) dispatch(claim.name === "fullHouse" ? increaseUserV(claim.points) : increasePoints(claim.points));
                }).catch(function (error) {
                    alert(error);
                    dispatch(setClaimingError(error));
                });
            }
        } catch (error) {
            dispatch(setClaimingError(error.message));
        }
    }
)