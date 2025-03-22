import ClaimsActionTypes from './claims.types';

const INITIAL_STATE = {
    isClaiming: false,
    claimedCount: 0,
    xx: true,
    claimList: [
        { name: "early", display: "EARLY", points: 1, description: "Any 1 number." },
        { name: "topFirst", display: "TOP FIRST", points: 1, description: "1st number, top row." },
        { name: "topCenter", display: "TOP CENTER", points: 1, description: "3rd number, top row." },
        { name: "topLast", display: "TOP LAST", points: 1, description: "5th number, top row." },
        { name: "middleFirst", display: "MIDDLE FIRST", points: 1, description: "1st number, middle row." },
        { name: "middleCenter", display: "MIDDLE CENTER", points: 1, description: "3rd number, middle row." },
        { name: "middleLast", display: "MIDDLE LAST", points: 1, description: "5th number, middle row." },
        { name: "bottomFirst", display: "BOTTOM FIRST", points: 1, description: "1st number, bottom row." },
        { name: "bottomCenter", display: "BOTTOM CENTER", points: 1, description: "3rd number, bottom row." },
        { name: "bottomLast", display: "BOTTOM LAST", points: 1, description: "5th number, bottom row." },
        { name: "twin", display: "TWIN", points: 1, description: "Any of 11, 22, 33, ..., 88." },
        { name: "zerox", display: "2 OF UNITS", points: 2, description: "Any 2 single-digit numbers." },
        { name: "onex", display: "2 OF 10s", points: 2, description: "Any 2 numbers in the 10s." },
        { name: "twox", display: "2 OF 20s", points: 2, description: "Any 2 numbers in the 20s." },
        { name: "threex", display: "2 OF 30s", points: 2, description: "Any 2 numbers in the 30s." },
        { name: "fourx", display: "2 OF 40s", points: 2, description: "Any 2 numbers in the 40s." },
        { name: "fivex", display: "2 OF 50s", points: 2, description: "Any 2 numbers in the 50s." },
        { name: "sixx", display: "2 OF 60s", points: 2, description: "Any 2 numbers in the 60s." },
        { name: "sevenx", display: "2 OF 70s", points: 2, description: "Any 2 numbers in the 70s." },
        { name: "eightx", display: "2 OF 80s", points: 2, description: "Any 2 numbers in the 80s." },
        { name: "minmax", display: "MIN-MAX", points: 2, description: "Smallest & largest number." },
        { name: "antilla", display: "ANTILLA", points: 2, description: "1 number from each row." },
        { name: "tower", display: "TOWER", points: 3, description: "3 vertical numbers in a column." },
        { name: "firsts", display: "FIRSTS", points: 3, description: "1st number from each row." },
        { name: "seconds", display: "SECONDS", points: 3, description: "2nd number from each row." },
        { name: "centers", display: "THIRDS", points: 3, description: "3rd number from each row." },
        { name: "fourths", display: "FOURTHS", points: 3, description: "4th number from each row." },
        { name: "lasts", display: "FIFTHS", points: 3, description: "5th number from each row." },
        { name: "unlucky", display: "LUCKY 13", points: 3, description: "No matches in first 13 calls." },
        { name: "earlyfive", display: "EARLY FIVE", points: 3, description: "Any 5 numbers." },
        { name: "news", display: "NEWS", points: 3, description: "3rd number (top & bottom), 1st & 5th (middle)." },
        { name: "charminar", display: "CHARMINAR", points: 3, description: "1st & 5th numbers (top & bottom rows)." },
        { name: "fivestar", display: "FIVE STAR", points: 4, description: "3rd (middle row), 1st & 5th (top & bottom rows)." },
        { name: "topRow", display: "TOP ROW", points: 4, description: "All 5 numbers, top row." },
        { name: "middleRow", display: "MIDDLE ROW", points: 4, description: "All 5 numbers, middle row." },
        { name: "bottomRow", display: "BOTTOM ROW", points: 4, description: "All 5 numbers, bottom row." },
        { name: "breakfast", display: "BREAKFAST", points: 4, description: "All numbers in columns 1-3." },
        { name: "lunch", display: "LUNCH", points: 4, description: "All numbers in columns 4-6." },
        { name: "dinner", display: "DINNER", points: 4, description: "All numbers in columns 7-9." },
        { name: "singles", display: "ALONE", points: 4, description: "All numbers without neighbors." },
        { name: "couples", display: "PAIRS", points: 5, description: "All horizontal pairs." },
        { name: "earlyten", display: "EARLY TEN", points: 5, description: "Any 10 numbers." },
        { name: "sides", display: "SIDES", points: 5, description: "1st & 5th (top, middle, bottom rows)." },
        { name: "twolanes", display: "TWO LANES", points: 5, description: "2nd & 4th (top, middle, bottom rows)." },
        { name: "day", display: "DAY", points: 5, description: "All numbers in columns 1-5." },
        { name: "night", display: "NIGHT", points: 5, description: "All numbers in columns 5-9." },
        { name: "zebra", display: "ZEBRA", points: 5, description: "All numbers in columns 1, 3, 5, 7, 9." },
        { name: "odds", display: "ODDS", points: 5, description: "All odd numbers." },
        { name: "evens", display: "EVENS", points: 5, description: "All even numbers." },
        { name: "rain", display: "RAIN", points: 5, description: "1 number from each column." },
        { name: "snow", display: "SNOW", points: 6, description: "First number from each column." },
        { name: "bush", display: "BUSH", points: 6, description: "Last number from each column." },
        { name: "triangle", display: "TRIANGLE", points: 6, description: "3rd (top), 2nd-4th (middle), all 5 (bottom)." },
        { name: "cone", display: "CONE", points: 6, description: "All 5 (top), 2nd-4th (middle), 3rd (bottom)." },
        { name: "navgraha", display: "NAVGRAHA", points: 6, description: "1st, 3rd, 5th (top, middle, bottom rows)." },
        { name: "border", display: "BORDER", points: 6, description: "All numbers on the border." },
        { name: "oneleft", display: "ONE LEFT", points: 6, description: "Any 14 numbers (takes 2 chances)." },
        { name: "fullHouse", display: "FULL HOUSE", points: 7, description: "All 15 numbers." }          
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
                ...INITIAL_STATE
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