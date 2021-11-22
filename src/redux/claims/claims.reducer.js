import ClaimsActionTypes from './claims.types';

const INITIAL_STATE = {
    isClaiming: false,
    claimedCount: 0,
    xx: true,
    claimList: [
        { name: "early", display: "EARLY", points: 1, description: "First to cross any 1 number." },
        { name: "topFirst", display: "TOP FIRST", points: 1, description: "First to cross 1st number from top row." },
        { name: "topCenter", display: "TOP CENTER", points: 1, description: "First to cross 3rd number from top row." },
        { name: "topLast", display: "TOP LAST", points: 1, description: "First to cross 5th number from top row." },
        { name: "middleFirst", display: "MIDDLE FIRST", points: 1, description: "First to cross 1st number from middle row." },
        { name: "middleCenter", display: "MIDDLE CENTER", points: 1, description: "First to cross 3rd number from middle row." },
        { name: "middleLast", display: "MIDDLE LAST", points: 1, description: "First to cross 5th number from middle row." },
        { name: "bottomFirst", display: "BOTTOM FIRST", points: 1, description: "First to cross 1st number from bottom row." },
        { name: "bottomCenter", display: "BOTTOM CENTER", points: 1, description: "First to cross 3rd number from bottom row." },
        { name: "bottomLast", display: "BOTTOM LAST", points: 1, description: "First to cross 5th number from bottom row." },
        { name: "twin", display: "TWIN", points: 1, description: "First to cross either of 11, 22, 33, 44, 55, 66, 77, and 88." },
        { name: "zerox", display: "2 OF UNITS", points: 2, description: "First to cross minimum 2 of single-digit numbers." },
        { name: "onex", display: "2 OF 10s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 1." },
        { name: "twox", display: "2 OF 20s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 2." },
        { name: "threex", display: "2 OF 30s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 3." },
        { name: "fourx", display: "2 OF 40s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 4." },
        { name: "fivex", display: "2 OF 50s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 5." },
        { name: "sixx", display: "2 OF 60s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 6." },
        { name: "sevenx", display: "2 OF 70s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 7." },
        { name: "eightx", display: "2 OF 80s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 8." },
        { name: "minmax", display: "MIN-MAX", points: 2, description: "First to cross the smallest and the largest number on the ticket." },
        { name: "antilla", display: "ANTILLA", points: 2, description: "First to cross 3 numbers — 1 from top row, 1 from middle row, and 1 from bottom row." },
        { name: "tower", display: "TOWER", points: 3, description: "First to cross 3 numbers from the same column, one below the other." },
        { name: "firsts", display: "FIRSTS", points: 3, description: "First to cross these 3 numbers — 1st from each of the 3 rows." },
        { name: "seconds", display: "SECONDS", points: 3, description: "First to cross these 3 numbers — 2nd from each of the 3 rows." },
        { name: "centers", display: "THIRDS", points: 3, description: "First to cross these 3 numbers — center (3rd) from each of the 3 rows." },
        { name: "fourths", display: "FOURTHS", points: 3, description: "First to cross these 3 numbers — 4th from each of the 3 rows." },
        { name: "lasts", display: "FIFTHS", points: 3, description: "First to cross these 3 numbers — last (5th) from each of the 3 rows." },
        { name: "unlucky", display: "LUCKY 13", points: 3, description: "No numbers matched until the first 13 numbers are drawn." },
        { name: "earlyfive", display: "EARLY FIVE", points: 3, description: "First to cross any 5 numbers on the ticket." },
        { name: "news", display: "NEWS", points: 3, description: "First to cross these 4 numbers (North, East, West, South) — 3rd number from top and bottom row, 1st and 5th numbers from middle row." },
        { name: "charminar", display: "CHARMINAR", points: 3, description: "First to cross 1st and last (5th) numbers from top and bottom rows." },
        { name: "fivestar", display: "FIVE STAR", points: 4, description: "First to cross center (3rd) number from middle row and 1st and last (5th) numbers from top and bottom rows." },
        { name: "topRow", display: "TOP ROW", points: 4, description: "First to cross all 5 numbers from top row." },
        { name: "middleRow", display: "MIDDLE ROW", points: 4, description: "First to cross all 5 numbers from middle row." },
        { name: "bottomRow", display: "BOTTOM ROW", points: 4, description: "First to cross all 5 numbers from bottom row." },
        { name: "breakfast", display: "BREAKFAST", points: 4, description: "First to cross all numbers from first 3 columns (column 1, 2, and 3)" },
        { name: "lunch", display: "LUNCH", points: 4, description: "First to cross all numbers from center 3 columns (column 4, 5, and 6)" },
        { name: "dinner", display: "DINNER", points: 4, description: "First to cross all numbers from last 3 columns (column 7, 8, and 9)" },
        { name: "singles", display: "ALONE", points: 4, description: "First to cross all numbers standing alone with no number on the immediate left or right side." },
        { name: "couples", display: "PAIRS", points: 5, description: "First to cross all numbers in horizontal pairs." },
        { name: "earlyten", display: "EARLY TEN", points: 5, description: "First to cross any 10 numbers on the ticket." },
        { name: "sides", display: "SIDES", points: 5, description: "First to cross these 6 numbers — first and last numbers from top, middle, and bottom rows." },
        { name: "twolanes", display: "TWO LANES", points: 5, description: "First to cross these 6 numbers — second and fourth numbers from top, middle, and bottom rows." },
        { name: "day", display: "DAY", points: 5, description: "First to cross all numbers from first 5 columns (column 1, 2, 3, 4, and 5)" },
        { name: "night", display: "NIGHT", points: 5, description: "First to cross all numbers from last 5 columns (column 5, 6, 7, 8, and 9)" },
        { name: "zebra", display: "ZEBRA", points: 5, description: "First to cross all numbers from alternate columns (column 1, 3, 5, 7, and 9)" },
        { name: "odds", display: "ODDS", points: 5, description: "First to cross all odd numbers on the ticket." },
        { name: "evens", display: "EVENS", points: 5, description: "First to cross all even numbers on the ticket." },
        { name: "rain", display: "RAIN", points: 5, description: "First to cross 9 numbers — 1 from each of the 9 columns." },
        { name: "snow", display: "SNOW", points: 6, description: "First to cross 1st number from each of the 9 columns." },
        { name: "bush", display: "BUSH", points: 6, description: "First to cross last number from each of the 9 columns." },
        { name: "pyramid", display: "PYRAMID", points: 6, description: "First to cross these 9 numbers — center (3rd) number from top row, 2nd, 3rd, and 4th numbers from middle row, and all 5 numbers from bottom row." },
        { name: "pi", display: "π", points: 6, description: "First to cross these 9 numbers — all 5 numbers from top row, second and fourth numbers from middle and last rows." },
        { name: "navgraha", display: "NAVGRAHA", points: 6, description: "First to cross these 9 numbers — 1st, 3rd, and 5th (last) numbers from top, middle and bottom rows." },
        { name: "border", display: "BORDER", points: 6, description: "First to cross all numbers on the border of the ticket — 1st and last rows, and 1st and last columns." },
        { name: "oneleft", display: "ONE LEFT", points: 6, description: "First to cross any 14 numbers. You need 2 chances to claim this." },
        { name: "fullHouse", display: "FULL HOUSE", points: 7, description: "First to cross all 15 numbers on the ticket." },
    ]
}

const claimsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ClaimsActionTypes.SET_CLAIMS_SUCCESS:
            return {
                ...state,
                claimByList: action.payload
            }
        case ClaimsActionTypes.SET_CLAIMING:
            return {
                ...state,
                isClaiming: action.payload
            }
        case ClaimsActionTypes.SET_CLAIMED_SUCCESS:
            return {
                ...state,
                isClaiming: false,
                claimedCount: state.claimedCount + action.payload,
                xx: false
            }
        case ClaimsActionTypes.SET_CLAIMING_ERROR:
            return {
                ...state,
                ...action.payload
            }
        case ClaimsActionTypes.SET_BOGUS_CLAIM:
            return {
                ...state,
                isClaiming: false
                // claimedCount: state.claimedCount + 1
            }
        case ClaimsActionTypes.RESET_CLAIMED_COUNT:
            return {
                claimedCount: 0,
                isClaiming: false,
                xx: true,
                claimList: [
                    { name: "early", display: "EARLY", points: 1, description: "First to cross any 1 number." },
                    { name: "topFirst", display: "TOP FIRST", points: 1, description: "First to cross 1st number from top row." },
                    { name: "topCenter", display: "TOP CENTER", points: 1, description: "First to cross 3rd number from top row." },
                    { name: "topLast", display: "TOP LAST", points: 1, description: "First to cross 5th number from top row." },
                    { name: "middleFirst", display: "MIDDLE FIRST", points: 1, description: "First to cross 1st number from middle row." },
                    { name: "middleCenter", display: "MIDDLE CENTER", points: 1, description: "First to cross 3rd number from middle row." },
                    { name: "middleLast", display: "MIDDLE LAST", points: 1, description: "First to cross 5th number from middle row." },
                    { name: "bottomFirst", display: "BOTTOM FIRST", points: 1, description: "First to cross 1st number from bottom row." },
                    { name: "bottomCenter", display: "BOTTOM CENTER", points: 1, description: "First to cross 3rd number from bottom row." },
                    { name: "bottomLast", display: "BOTTOM LAST", points: 1, description: "First to cross 5th number from bottom row." },
                    { name: "twin", display: "TWIN", points: 1, description: "First to cross either of 11, 22, 33, 44, 55, 66, 77, and 88." },
                    { name: "zerox", display: "2 OF UNITS", points: 2, description: "First to cross minimum 2 of single-digit numbers." },
                    { name: "onex", display: "2 OF 10s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 1." },
                    { name: "twox", display: "2 OF 20s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 2." },
                    { name: "threex", display: "2 OF 30s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 3." },
                    { name: "fourx", display: "2 OF 40s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 4." },
                    { name: "fivex", display: "2 OF 50s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 5." },
                    { name: "sixx", display: "2 OF 60s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 6." },
                    { name: "sevenx", display: "2 OF 70s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 7." },
                    { name: "eightx", display: "2 OF 80s", points: 2, description: "First to cross minimum 2 of two-digit numbers starting with 8." },
                    { name: "minmax", display: "MIN-MAX", points: 2, description: "First to cross the smallest and the largest number on the ticket." },
                    { name: "antilla", display: "ANTILLA", points: 2, description: "First to cross 3 numbers — 1 from top row, 1 from middle row, and 1 from bottom row." },
                    { name: "tower", display: "TOWER", points: 3, description: "First to cross 3 numbers from the same column, one below the other." },
                    { name: "firsts", display: "FIRSTS", points: 3, description: "First to cross these 3 numbers — 1st from each of the 3 rows." },
                    { name: "seconds", display: "SECONDS", points: 3, description: "First to cross these 3 numbers — 2nd from each of the 3 rows." },
                    { name: "centers", display: "THIRDS", points: 3, description: "First to cross these 3 numbers — center (3rd) from each of the 3 rows." },
                    { name: "fourths", display: "FOURTHS", points: 3, description: "First to cross these 3 numbers — 4th from each of the 3 rows." },
                    { name: "lasts", display: "FIFTHS", points: 3, description: "First to cross these 3 numbers — last (5th) from each of the 3 rows." },
                    { name: "unlucky", display: "LUCKY 13", points: 3, description: "No numbers matched until the first 13 numbers are drawn." },
                    { name: "earlyfive", display: "EARLY FIVE", points: 3, description: "First to cross any 5 numbers on the ticket." },
                    { name: "news", display: "NEWS", points: 3, description: "First to cross these 4 numbers (North, East, West, South) — 3rd number from top and bottom row, 1st and 5th numbers from middle row." },
                    { name: "charminar", display: "CHARMINAR", points: 3, description: "First to cross 1st and last (5th) numbers from top and bottom rows." },
                    { name: "fivestar", display: "FIVE STAR", points: 4, description: "First to cross center (3rd) number from middle row and 1st and last (5th) numbers from top and bottom rows." },
                    { name: "topRow", display: "TOP ROW", points: 4, description: "First to cross all 5 numbers from top row." },
                    { name: "middleRow", display: "MIDDLE ROW", points: 4, description: "First to cross all 5 numbers from middle row." },
                    { name: "bottomRow", display: "BOTTOM ROW", points: 4, description: "First to cross all 5 numbers from bottom row." },
                    { name: "breakfast", display: "BREAKFAST", points: 4, description: "First to cross all numbers from first 3 columns (column 1, 2, and 3)" },
                    { name: "lunch", display: "LUNCH", points: 4, description: "First to cross all numbers from center 3 columns (column 4, 5, and 6)" },
                    { name: "dinner", display: "DINNER", points: 4, description: "First to cross all numbers from last 3 columns (column 7, 8, and 9)" },
                    { name: "singles", display: "ALONE", points: 4, description: "First to cross all numbers standing alone with no number on the immediate left or right side." },
                    { name: "couples", display: "PAIRS", points: 5, description: "First to cross all numbers in horizontal pairs." },
                    { name: "earlyten", display: "EARLY TEN", points: 5, description: "First to cross any 10 numbers on the ticket." },
                    { name: "sides", display: "SIDES", points: 5, description: "First to cross these 6 numbers — first and last numbers from top, middle, and bottom rows." },
                    { name: "twolanes", display: "TWO LANES", points: 5, description: "First to cross these 6 numbers — second and fourth numbers from top, middle, and bottom rows." },
                    { name: "day", display: "DAY", points: 5, description: "First to cross all numbers from first 5 columns (column 1, 2, 3, 4, and 5)" },
                    { name: "night", display: "NIGHT", points: 5, description: "First to cross all numbers from last 5 columns (column 5, 6, 7, 8, and 9)" },
                    { name: "zebra", display: "ZEBRA", points: 5, description: "First to cross all numbers from alternate columns (column 1, 3, 5, 7, and 9)" },
                    { name: "odds", display: "ODDS", points: 5, description: "First to cross all odd numbers on the ticket." },
                    { name: "evens", display: "EVENS", points: 5, description: "First to cross all even numbers on the ticket." },
                    { name: "rain", display: "RAIN", points: 5, description: "First to cross 9 numbers — 1 from each of the 9 columns." },
                    { name: "snow", display: "SNOW", points: 6, description: "First to cross 1st number from each of the 9 columns." },
                    { name: "bush", display: "BUSH", points: 6, description: "First to cross last number from each of the 9 columns." },
                    { name: "pyramid", display: "PYRAMID", points: 6, description: "First to cross these 9 numbers — center (3rd) number from top row, 2nd, 3rd, and 4th numbers from middle row, and all 5 numbers from bottom row." },
                    { name: "pi", display: "π", points: 6, description: "First to cross these 9 numbers — all 5 numbers from top row, second and fourth numbers from middle and last rows." },
                    { name: "navgraha", display: "NAVGRAHA", points: 6, description: "First to cross these 9 numbers — 1st, 3rd, and 5th (last) numbers from top, middle and bottom rows." },
                    { name: "border", display: "BORDER", points: 6, description: "First to cross all numbers on the border of the ticket — 1st and last rows, and 1st and last columns." },
                    { name: "oneleft", display: "ONE LEFT", points: 6, description: "First to cross any 14 numbers. You need 2 chances to claim this." },
                    { name: "fullHouse", display: "FULL HOUSE", points: 7, description: "First to cross all 15 numbers on the ticket." },
                ]
            }
        case ClaimsActionTypes.RESET_CLAIMS:
            return {
                ...INITIAL_STATE
            }
        default:
            return state;
    }
}

export default claimsReducer;