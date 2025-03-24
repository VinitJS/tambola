import ClaimsActionTypes from './claims.types';

const INITIAL_STATE = {
    isClaiming: false,
    claimedCount: 0,
    claimList: {
        1: [
            { name: "early", display: "EARLY", description: "Any 1 number." },
            { name: "topFirst", display: "TOP FIRST", description: "1st number, top row." },
            { name: "topCenter", display: "TOP CENTER", description: "3rd number, top row." },
            { name: "topLast", display: "TOP LAST", description: "5th number, top row." },
            { name: "middleFirst", display: "MIDDLE FIRST", description: "1st number, middle row." },
            { name: "middleCenter", display: "MIDDLE CENTER", description: "3rd number, middle row." },
            { name: "middleLast", display: "MIDDLE LAST", description: "5th number, middle row." },
            { name: "bottomFirst", display: "BOTTOM FIRST", description: "1st number, bottom row." },
            { name: "bottomCenter", display: "BOTTOM CENTER", description: "3rd number, bottom row." },
            { name: "bottomLast", display: "BOTTOM LAST", description: "5th number, bottom row." },
            { name: "twin", display: "TWIN", description: "Any of 11, 22, 33, 44, 55, 66, 77, 88." },
        ],
        2: [
            { name: "zerox", display: "2 OF UNITS", description: "Any 2 single-digit numbers." },
            { name: "onex", display: "2 OF 10s", description: "Any 2 numbers in the 10s." },
            { name: "twox", display: "2 OF 20s", description: "Any 2 numbers in the 20s." },
            { name: "threex", display: "2 OF 30s", description: "Any 2 numbers in the 30s." },
            { name: "fourx", display: "2 OF 40s", description: "Any 2 numbers in the 40s." },
            { name: "fivex", display: "2 OF 50s", description: "Any 2 numbers in the 50s." },
            { name: "sixx", display: "2 OF 60s", description: "Any 2 numbers in the 60s." },
            { name: "sevenx", display: "2 OF 70s", description: "Any 2 numbers in the 70s." },
            { name: "eightx", display: "2 OF 80s", description: "Any 2 numbers in the 80s." },
            { name: "minmax", display: "MIN-MAX", description: "Smallest & largest number." },
            { name: "antilla", display: "ANTILLA", description: "1 number from each row." },    
        ],
        3: [
            { name: "tower", display: "TOWER", description: "3 vertical numbers in a column." },
            { name: "firsts", display: "FIRSTS", description: "1st number from each row." },
            { name: "seconds", display: "SECONDS", description: "2nd number from each row." },
            { name: "centers", display: "THIRDS", description: "3rd number from each row." },
            { name: "fourths", display: "FOURTHS", description: "4th number from each row." },
            { name: "lasts", display: "FIFTHS", description: "5th number from each row." },
            { name: "earlyfive", display: "EARLY FIVE", description: "Any 5 numbers." },
            { name: "news", display: "NEWS", description: "3rd number (top & bottom), 1st & 5th (middle)." },
            { name: "charminar", display: "CHARMINAR", description: "1st & 5th numbers (top & bottom rows)." },        
        ],
        4: [
            { name: "fivestar", display: "FIVE STAR", description: "3rd (middle row), 1st & 5th (top & bottom rows)." },
            { name: "topRow", display: "TOP ROW", description: "All 5 numbers, top row." },
            { name: "middleRow", display: "MIDDLE ROW", description: "All 5 numbers, middle row." },
            { name: "bottomRow", display: "BOTTOM ROW", description: "All 5 numbers, bottom row." },
            { name: "breakfast", display: "BREAKFAST", description: "All numbers in columns 1-3." },
            { name: "lunch", display: "LUNCH", description: "All numbers in columns 4-6." },
            { name: "dinner", display: "DINNER", description: "All numbers in columns 7-9." },
            { name: "singles", display: "ALONE", description: "All numbers without neighbors." },
        ],
        5: [
            { name: "couples", display: "PAIRS", description: "All horizontal pairs." },
            { name: "earlyten", display: "EARLY TEN", description: "Any 10 numbers." },
            { name: "sides", display: "SIDES", description: "1st & 5th (top, middle, bottom rows)." },
            { name: "twolanes", display: "TWO LANES", description: "2nd & 4th (top, middle, bottom rows)." },
            { name: "day", display: "DAY", description: "All numbers in columns 1-5." },
            { name: "night", display: "NIGHT", description: "All numbers in columns 5-9." },
            { name: "zebra", display: "ZEBRA", description: "All numbers in columns 1, 3, 5, 7, 9." },
            { name: "odds", display: "ODDS", description: "All odd numbers." },
            { name: "evens", display: "EVENS", description: "All even numbers." },
            { name: "rain", display: "RAIN", description: "1 number from each column." },    
        ],
        6: [
            { name: "lucky", display: "LUCKY 13", description: "No matches in first 13 calls." },
            { name: "snow", display: "SNOW", description: "First number from each column." },
            { name: "bush", display: "BUSH", description: "Last number from each column." },
            { name: "triangle", display: "TRIANGLE", description: "3rd (top), 2nd-4th (middle), all 5 (bottom)." },
            { name: "cone", display: "CONE", description: "All 5 (top), 2nd-4th (middle), 3rd (bottom)." },
            { name: "navgraha", display: "NAVGRAHA", description: "1st, 3rd, 5th (top, middle, bottom rows)." },
            { name: "border", display: "BORDER", description: "All numbers on the border." },
            { name: "oneleft", display: "ONE LEFT", description: "Any 14 numbers (takes away 2 chances)." },
        ],
        7: [
            { name: "fullHouse", display: "FULL HOUSE", description: "All 15 numbers." },
        ]
    }
}

const claimsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ClaimsActionTypes.SET_CLAIMING:
            return {
                ...state,
                isClaiming: action.payload
            }
        case ClaimsActionTypes.SET_CLAIMED_SUCCESS:
            return {
                ...state,
                isClaiming: false,
                claimedCount: state.claimedCount + action.payload
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