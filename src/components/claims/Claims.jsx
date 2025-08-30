import React, { useCallback, useMemo, useState } from 'react';
import './Claims.css';
import { FieldValue, firestore } from '../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { updateClaims } from '../../redux/claims.reducer';
import { updateUser } from '../../redux/user.reducer';
import { ReactComponent as BreakfastIcon } from '../../assets/claims/breakfast.svg';
import { ReactComponent as LunchIcon } from '../../assets/claims/lunch.svg';
import { ReactComponent as DinnerIcon } from '../../assets/claims/dinner.svg';
import { ReactComponent as BottomRowIcon } from '../../assets/claims/bottomrow.svg';
import { ReactComponent as MiddleRowIcon } from '../../assets/claims/middlerow.svg';
import { ReactComponent as TopRowIcon } from '../../assets/claims/toprow.svg';
import { ReactComponent as DayIcon } from '../../assets/claims/day.svg';
import { ReactComponent as NightIcon } from '../../assets/claims/night.svg';
import { ReactComponent as BorderIcon } from '../../assets/claims/border.svg';
import { ReactComponent as FullHouseIcon } from '../../assets/claims/fullhouse.svg';
import { ReactComponent as LuckyIcon } from '../../assets/claims/lucky.svg';
import { ReactComponent as ZeroXIcon } from '../../assets/claims/zerox.svg';
import { ReactComponent as OneXIcon } from '../../assets/claims/onex.svg';
import { ReactComponent as TwoXIcon } from '../../assets/claims/twox.svg';
import { ReactComponent as ThreeXIcon } from '../../assets/claims/threex.svg';
import { ReactComponent as FourXIcon } from '../../assets/claims/fourx.svg';
import { ReactComponent as FiveXIcon } from '../../assets/claims/fivex.svg';
import { ReactComponent as SixXIcon } from '../../assets/claims/sixx.svg';
import { ReactComponent as SevenXIcon } from '../../assets/claims/sevenx.svg';
import { ReactComponent as EightXIcon } from '../../assets/claims/eightx.svg';
import { ReactComponent as TopFirstIcon } from '../../assets/claims/topfirst.svg';
import { ReactComponent as TopCenterIcon } from '../../assets/claims/topcenter.svg';
import { ReactComponent as TopLastIcon } from '../../assets/claims/toplast.svg';
import { ReactComponent as MiddleFirstIcon } from '../../assets/claims/middlefirst.svg';
import { ReactComponent as MiddleCenterIcon } from '../../assets/claims/middlecenter.svg';
import { ReactComponent as MiddleLastIcon } from '../../assets/claims/middlelast.svg';
import { ReactComponent as BottomFirstIcon } from '../../assets/claims/bottomfirst.svg';
import { ReactComponent as BottomCenterIcon } from '../../assets/claims/bottomcenter.svg';
import { ReactComponent as BottomLastIcon } from '../../assets/claims/bottomlast.svg';
import { ReactComponent as MinMaxIcon } from '../../assets/claims/minmax.svg';
import { ReactComponent as TowerIcon } from '../../assets/claims/tower.svg';
import { ReactComponent as FirstsIcon } from '../../assets/claims/firsts.svg';
import { ReactComponent as SecondsIcon } from '../../assets/claims/seconds.svg';
import { ReactComponent as ThirdsIcon } from '../../assets/claims/thirds.svg';
import { ReactComponent as FourthsIcon } from '../../assets/claims/fourths.svg';
import { ReactComponent as FifthsIcon } from '../../assets/claims/fifths.svg';
import { ReactComponent as CornersIcon } from '../../assets/claims/corners.svg';
import { ReactComponent as CrossIcon } from '../../assets/claims/cross.svg';
import { ReactComponent as Eachcol1Icon } from '../../assets/claims/eachcol1.svg';
import { ReactComponent as FirstColumnIcon } from '../../assets/claims/firstColumn.svg';
import { ReactComponent as LastColumnIcon } from '../../assets/claims/lastColumn.svg';
import { ReactComponent as Eachrow1Icon } from '../../assets/claims/eachrow1.svg';
import { ReactComponent as Eachrow2Icon } from '../../assets/claims/eachrow2.svg';
import { ReactComponent as Eachrow3Icon } from '../../assets/claims/eachrow3.svg';
import { ReactComponent as Eachrow4Icon } from '../../assets/claims/eachrow4.svg';
import { ReactComponent as CouplesIcon } from '../../assets/claims/couples.svg';
import { ReactComponent as SinglesIcon } from '../../assets/claims/singles.svg';
import { ReactComponent as ZebraIcon } from '../../assets/claims/zebra.svg';
import { ReactComponent as NewsIcon } from '../../assets/claims/news.svg';
import { ReactComponent as PlusIcon } from '../../assets/claims/plus.svg';
import { ReactComponent as AlternateIcon } from '../../assets/claims/alternate.svg';
import { ReactComponent as TriangleIcon } from '../../assets/claims/triangle.svg';
import { ReactComponent as ConeIcon } from '../../assets/claims/cone.svg';
import { ReactComponent as TwolanesIcon } from '../../assets/claims/twolanes.svg';
import { ReactComponent as SidesIcon } from '../../assets/claims/sides.svg';

const Claims = ({ game_id }) => {
    const dispatch = useDispatch();
    // Get state from Redux store
    const { claims, chances_left, players_count } = useSelector((state) => state.claims);
    const { difficulty } = useSelector((state) => state.game);
    const coins = useSelector((state) => state.coins.coins);
    const ticket = useSelector((state) => state.ticket.ticket);
    const { id, name } = useSelector((state) => state.user);
    
    const [loading, setLoading] = useState(false);

    const svgs = useMemo(() => ({
        breakfast: <BreakfastIcon className="mrs" />,
        lunch: <LunchIcon className="mrs" />,
        dinner: <DinnerIcon className="mrs" />,
        bottomRow: <BottomRowIcon className="mrs" />,
        middleRow: <MiddleRowIcon className="mrs" />,
        topRow: <TopRowIcon className="mrs" />,
        day: <DayIcon className="mrs" />,
        night: <NightIcon className="mrs" />,
        border: <BorderIcon className="mrs" />,
        fullHouse: <FullHouseIcon className="mrs" />,
        lucky: <LuckyIcon className="mrs" />,
        zerox: <ZeroXIcon className="mrs" />,
        onex: <OneXIcon className="mrs" />,
        twox: <TwoXIcon className="mrs" />,
        threex: <ThreeXIcon className="mrs" />,
        fourx: <FourXIcon className="mrs" />,
        fivex: <FiveXIcon className="mrs" />,
        sixx: <SixXIcon className="mrs" />,
        sevenx: <SevenXIcon className="mrs" />,
        eightx: <EightXIcon className="mrs" />,
        topFirst: <TopFirstIcon className="mrs" />,
        topCenter: <TopCenterIcon className="mrs" />,
        topLast: <TopLastIcon className="mrs" />,
        middleFirst: <MiddleFirstIcon className="mrs" />,
        middleCenter: <MiddleCenterIcon className="mrs" />,
        middleLast: <MiddleLastIcon className="mrs" />,
        bottomFirst: <BottomFirstIcon className="mrs" />,
        bottomCenter: <BottomCenterIcon className="mrs" />,
        bottomLast: <BottomLastIcon className="mrs" />,
        minmax: <MinMaxIcon className="mrs" />,
        tower: <TowerIcon className="mrs" />,
        firsts: <FirstsIcon className="mrs" />,
        seconds: <SecondsIcon className="mrs" />,
        thirds: <ThirdsIcon className="mrs" />,
        fourths: <FourthsIcon className="mrs" />,
        fifths: <FifthsIcon className="mrs" />,
        corners: <CornersIcon className="mrs" />,
        cross: <CrossIcon className="mrs" />,
        eachcol1: <Eachcol1Icon className="mrs" />,
        firstColumn: <FirstColumnIcon className="mrs" />,
        lastColumn: <LastColumnIcon className="mrs" />,
        eachrow1: <Eachrow1Icon className="mrs" />,
        eachrow2: <Eachrow2Icon className="mrs" />,
        eachrow3: <Eachrow3Icon className="mrs" />,
        eachrow4: <Eachrow4Icon className="mrs" />,
        singles: <SinglesIcon className="mrs" />,
        couples: <CouplesIcon className="mrs" />,
        twolanes: <TwolanesIcon className="mrs" />,
        sides: <SidesIcon className="mrs" />,
        zebra: <ZebraIcon className="mrs" />,
        news: <NewsIcon className="mrs" />,
        plus: <PlusIcon className="mrs" />,
        alternate: <AlternateIcon className="mrs" />,
        triangle: <TriangleIcon className="mrs" />,
        cone: <ConeIcon className="mrs" />
    }), [])
    
    const emojis = useMemo(() => ({
        early: <span role="img" className="mrxs fsxl">☝</span>,
        twin: <span role="img" className="mrxs fsxl">👯</span>,
        earlyfive: <span role="img" className="mrxs fsxl">🖐</span>,
        earlyten: <span role="img" className="mrxs fsxl">🙌</span>,
        oneleft: <span role="img" className="mrxs fsxl">🤌</span>,
        today: <span role="img" className="mrxs fsxl">🗓️</span>,
        odds: <span role="img" className="mrxs fsxl clst">1 3 5...</span>,
        evens: <span role="img" className="mrxs fsxl clst">0 2 4...</span>
    }), []);
    
    const claimGroupsBeginner = useMemo(() => ({
        7: [
            { name: "fullHouse", display: "FULL HOUSE", description: "All 15 numbers." },
        ],
        6: [
            { name: "oneleft", display: "ONE LEFT", description: "Any 14 numbers (takes away 2 chances, gives double the points)." },
            { name: "border", display: "BORDER", description: "All numbers on the border of the ticket." },
        ],
        5: [
            { name: "eachrow4", display: "4 PER ROW", description: "12 numbers, Any 4 numbers from each of the 3 rows." },
            { name: "evens", display: "EVENS", description: "All even numbers on the ticket." },
            { name: "odds", display: "ODDS", description: "All odd numbers on the ticket." },
            { name: "earlyten", display: "EARLY TEN", description: "Any 10 numbers on the ticket." },
        ],
        4: [
            { name: "eachrow3", display: "3 PER ROW", description: "9 numbers, Any 3 numbers from each of the 3 rows." },
            { name: "lucky", display: "LUCKY 13", description: "No match in the first 13 numbers on the board marked in red." },
            { name: "topRow", display: "TOP ROW", description: "All 5 numbers from Top row." },
            { name: "middleRow", display: "MIDDLE ROW", description: "All 5 numbers from Middle row." },
            { name: "bottomRow", display: "BOTTOM ROW", description: "All 5 numbers from Bottom row." },
            { name: "dinner", display: "DINNER", description: "All numbers in Last 3 columns." },
            { name: "lunch", display: "LUNCH", description: "All numbers in Middle 3 columns." },
            { name: "breakfast", display: "BREAKFAST", description: "All numbers in First 3 columns." },
        ],
        3: [
            { name: "eachrow2", display: "2 PER ROW", description: "6 numbers, Any 2 numbers from each of the 3 rows." },
            { name: "earlyfive", display: "EARLY FIVE", description: "Any 5 numbers from the ticket." },
        ],
        2: [
            { name: "eachrow1", display: "1 PER ROW", description: "3 numbers, Any 1 number from each of the 3 rows." },
            { name: "minmax", display: "MIN-MAX", description: "Smallest and Largest number on the ticket." },
        ],
        1: [
            { name: "twin", display: "TWIN", description: "Any 1 number from 11, 22, 33, 44, 55, 66, 77, 88." },
            { name: "early", display: "EARLY", description: "Any 1 number." },
        ]
    }), []);
    
    const claimGroups = useMemo(() => ({
        7: [
            { name: "fullHouse", display: "FULL HOUSE", description: "All 15 numbers." },
        ],
        6: [
            { name: "oneleft", display: "ONE LEFT", description: "Any 14 numbers (takes away 2 chances, gives double the points)." },
            { name: "border", display: "BORDER", description: "All numbers on the border of the ticket." },
            { name: "cone", display: "CONE", description: "9 number, All 5 numbers from the Top row, 2nd, 3rd, and 4th numbers from the Middle row, middle number from the Bottom row." },
            { name: "triangle", display: "TRIANGLE", description: "9 number, Middle number from the Top row, 2nd, 3rd, 4th from the Middle row, and All 5 numbers from the Bottom row." },
            { name: "alternate", display: "ALT", description: "8 number, 1st, 3rd, 5th numbers from the Top and Bottom rows, 2nd and 4th numbers from the Middle row." },
            { name: "lastColumn", display: "BUSH", description: "9 numbers, Last number from each column." },
            { name: "firstColumn", display: "SNOW", description: "9 numbers, First number from each column." },
        ],
        5: [
            { name: "eachcol1", display: "RAIN", description: "9 numbers, Any 1 number from each column." },    
            { name: "eachrow4", display: "4 PER ROW", description: "12 numbers, Any 4 numbers from each of the 3 rows." },
            { name: "evens", display: "EVENS", description: "All even numbers on the ticket." },
            { name: "odds", display: "ODDS", description: "All odd numbers on the ticket." },
            { name: "zebra", display: "ZEBRA", description: "All numbers from 1st, 3rd, 5th, 7th, and 9th columns." },
            { name: "night", display: "NIGHT", description: "ALL numbers from the last 5 columns." },
            { name: "day", display: "DAY", description: "ALL numbers from the 1st 5 columns." },
            { name: "twolanes", display: "NEXT 2 SIDES", description: "6 numbers, 2nd & 4th from Top, Middle, and Bottom rows." },
            { name: "sides", display: "SIDES", description: "6 numbers, First and Last numbers from Top, Middle, and Bottom rows." },
            { name: "earlyten", display: "EARLY TEN", description: "Any 10 numbers on the ticket." },
            { name: "couples", display: "COUPLES", description: "All numbers in pairs." },
        ],
        4: [
            { name: "singles", display: "SINGLES", description: "All numbers with No number on the left and right side of it." },
            { name: "eachrow3", display: "3 PER ROW", description: "9 numbers, Any 3 numbers from each of the 3 rows." },
            { name: "lucky", display: "LUCKY 13", description: "No match in the first 13 numbers on the board marked in red." },
            { name: "topRow", display: "TOP ROW", description: "All 5 numbers from Top row." },
            { name: "middleRow", display: "MIDDLE ROW", description: "All 5 numbers from Middle row." },
            { name: "bottomRow", display: "BOTTOM ROW", description: "All 5 numbers from Bottom row." },
            { name: "dinner", display: "DINNER", description: "All numbers in Last 3 columns." },
            { name: "lunch", display: "LUNCH", description: "All numbers in Middle 3 columns." },
            { name: "breakfast", display: "BREAKFAST", description: "All numbers in First 3 columns." },
            { name: "plus", display: "PLUS", description: "Middle number from Top & Bottom rows, First, Center, and Last number from Middle row." },
            { name: "cross", display: "CROSS", description: "First and Last numbers from Top & Bottom rows, Middle number from Middle row)." },
        ],
        3: [
            { name: "earlyfive", display: "EARLY FIVE", description: "Any 5 numbers from the ticket." },
            { name: "eachrow2", display: "2 PER ROW", description: "6 numbers, Any 2 numbers from each of the 3 rows." },
            { name: "corners", display: "CORNERS", description: "First and Last numbers from Top & Bottom rows." },
            { name: "news", display: "MIDDLES", description: "Middle number from Top & Bottom rows, 1st & Last number from Middle row." },
            { name: "fifths", display: "FIFTHS", description: "5th from all 3 rows." },
            { name: "fourths", display: "FOURTHS", description: "4th from all 3 rows." },
            { name: "thirds", display: "THIRDS", description: "3rd from all 3 rows." },
            { name: "seconds", display: "SECONDS", description: "2nd from all 3 rows." },
            { name: "firsts", display: "FIRSTS", description: "1st from all 3 rows." },
            { name: "today", display: `TODAY (${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear().toString().slice(-2)})`, description: `Any number from today's date: ${new Date().getDate()} / ${new Date().getMonth() + 1} / ${new Date().getFullYear().toString().slice(-2)}` },
            { name: "tower", display: "TOWER", description: "3 numbers from any 1 column." },
        ],
        2: [
            { name: "minmax", display: "MIN-MAX", description: "Smallest and Largest number on the ticket." },
            { name: "eachrow1", display: "1 PER ROW", description: "3 numbers, Any 1 number from each of the 3 rows." },
            { name: "eightx", display: "ALL 80s", description: "All numbers from 80-89." },
            { name: "sevenx", display: "ALL 70s", description: "All numbers from 70-79." },
            { name: "sixx", display: "ALL 60s", description: "All numbers from 60-69." },
            { name: "fivex", display: "ALL 50s", description: "All numbers from 50-59." },
            { name: "fourx", display: "ALL 40s", description: "All numbers from 40-49." },
            { name: "threex", display: "ALL 30s", description: "All numbers from 30-39." },
            { name: "twox", display: "ALL 20s", description: "All numbers from 20-29." },
            { name: "onex", display: "ALL 10s", description: "All numbers from 10-19." },
            { name: "zerox", display: "ALL UNITS", description: "All numbers from 0-9." },
        ],
        1: [
            { name: "twin", display: "TWIN", description: "Any 1 number from 11, 22, 33, 44, 55, 66, 77, 88." },
            { name: "topFirst", display: "TOP FIRST", description: "First number from top row." },
            { name: "topCenter", display: "TOP CENTER", description: "Middle number from top row." },
            { name: "topLast", display: "TOP LAST", description: "Last number from top row." },
            { name: "middleFirst", display: "MIDDLE FIRST", description: "First number from middle row." },
            { name: "middleCenter", display: "MIDDLE CENTER", description: "Middle number from middle row." },
            { name: "middleLast", display: "MIDDLE LAST", description: "Last number from last row." },
            { name: "bottomFirst", display: "BOTTOM FIRST", description: "First number from bottom row." },
            { name: "bottomCenter", display: "BOTTOM CENTER", description: "Middle number from bottom row." },
            { name: "bottomLast", display: "BOTTOM LAST", description: "Last number from bottom row." },
            { name: "early", display: "EARLY", description: "Any 1 number." },
        ]
    }), []);

    const handleClick = useCallback(async (claim, points, ticket, coins, name, id, chances_left, game_id) => {
        setLoading(true);
        try {
            const coinsSet = new Set(coins);
            let success = false;

            switch (claim.name) {
                case "early":
                    success = ticket.flat().filter(element => Array.isArray(element) && element[1] && coinsSet.has(element[0])).length > 0;
                    break;
                case "twin":
                    success = [11, 22, 33, 44, 55, 66, 77, 88].some(num =>
                        coinsSet.has(num) &&
                        ticket.flat().filter(element => Array.isArray(element)).filter(element => element[1] && coinsSet.has(element[0])).some(([value]) => num === value)
                    );
                    break;
                case "topFirst":
                    const first = ticket.flat().find(element => Array.isArray(element));
                    success = first && first[1] && coinsSet.has(first[0]);
                    break;
                case "topCenter":
                    const third = ticket.flat().filter(element => Array.isArray(element))[2];
                    success = third && third[1] && coinsSet.has(third[0]);
                    break;
                case "topLast":
                    const fifth = ticket.flat().filter(element => Array.isArray(element))[4];
                    success = fifth && fifth[1] && coinsSet.has(fifth[0]);
                    break;
                case "middleFirst":
                    const sixth = ticket.flat().filter(element => Array.isArray(element))[5];
                    success = sixth && sixth[1] && coinsSet.has(sixth[0]);
                    break;
                case "middleCenter":
                    const eighth = ticket.flat().filter(element => Array.isArray(element))[7];
                    success = eighth && eighth[1] && coinsSet.has(eighth[0]);
                    break;
                case "middleLast":
                    const ninth = ticket.flat().filter(element => Array.isArray(element))[9];
                    success = ninth && ninth[1] && coinsSet.has(ninth[0]);
                    break;
                case "bottomFirst":
                    const tenth = ticket.flat().filter(element => Array.isArray(element))[10];
                    success = tenth && tenth[1] && coinsSet.has(tenth[0]);
                    break;
                case "bottomCenter":
                    const twelfth = ticket.flat().filter(element => Array.isArray(element))[12];
                    success = twelfth && twelfth[1] && coinsSet.has(twelfth[0]);
                    break;
                case "bottomLast":
                    const fourteenth = ticket.flat().filter(element => Array.isArray(element))[14];
                    success = fourteenth && fourteenth[1] && coinsSet.has(fourteenth[0]);
                    break;
                case "earlyfive":
                    success = ticket.flat().filter(element => Array.isArray(element) && element[1] && coinsSet.has(element[0])).length >= 5;
                    break;
                case "lucky":
                    success = coins.length > 12 && !ticket.flat().filter(element => Array.isArray(element)).some(([value]) => new Set(coins.slice(0, 13)).has(value));
                    break;
                case "zerox":
                    success = [0, 1, 2].every(i => ticket[i][0] === -1 || (Array.isArray(ticket[i][0]) && ticket[i][0][1] && coinsSet.has(ticket[i][0][0])));
                    break;
                case "onex":
                    success = [0, 1, 2].every(i => ticket[i][1] === -1 || (Array.isArray(ticket[i][1]) && ticket[i][1][1] && coinsSet.has(ticket[i][1][0])));
                    break;
                case "twox":
                    success = [0, 1, 2].every(i => ticket[i][2] === -1 || (Array.isArray(ticket[i][2]) && ticket[i][2][1] && coinsSet.has(ticket[i][2][0])));
                    break;
                case "threex":
                    success = [0, 1, 2].every(i => ticket[i][3] === -1 || (Array.isArray(ticket[i][3]) && ticket[i][3][1] && coinsSet.has(ticket[i][3][0])));
                    break;
                case "fourx":
                    success = [0, 1, 2].every(i => ticket[i][4] === -1 || (Array.isArray(ticket[i][4]) && ticket[i][4][1] && coinsSet.has(ticket[i][4][0])));
                    break;
                case "fivex":
                    success = [0, 1, 2].every(i => ticket[i][5] === -1 || (Array.isArray(ticket[i][5]) && ticket[i][5][1] && coinsSet.has(ticket[i][5][0])));
                    break;
                case "sixx":
                    success = [0, 1, 2].every(i => ticket[i][6] === -1 || (Array.isArray(ticket[i][6]) && ticket[i][6][1] && coinsSet.has(ticket[i][6][0])));
                    break;
                case "sevenx":
                    success = [0, 1, 2].every(i => ticket[i][7] === -1 || (Array.isArray(ticket[i][7]) && ticket[i][7][1] && coinsSet.has(ticket[i][7][0])));
                    break;
                case "eightx":
                    success = [0, 1, 2].every(i => ticket[i][8] === -1 || (Array.isArray(ticket[i][8]) && ticket[i][8][1] && coinsSet.has(ticket[i][8][0])));
                    break;
                case "minmax":
                    success = [[ticket[0][0], ticket[1][0], ticket[2][0]].find(element => Array.isArray(element)), [ticket[2][8], ticket[1][8], ticket[0][8]].find(element => Array.isArray(element))].every(([value, marked]) => marked && coinsSet.has(value))
                    break;
                case "eachrow1":
                    success = ticket.every(row => row.filter(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0])).length >= 1);
                    break;
                case "eachrow2":
                    success = ticket.every(row => row.filter(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0])).length >= 2);
                    break;
                case "eachrow3":
                    success = ticket.every(row => row.filter(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0])).length >= 3);
                    break;
                case "eachrow4":
                    success = ticket.every(row => row.filter(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0])).length >= 4);
                    break;
                case "tower":
                    success = [0, 1, 2, 3, 4, 5, 6, 7, 8].some(col => [0, 1, 2].every(row => Array.isArray(ticket[row][col]) && ticket[row][col][1] && coinsSet.has(ticket[row][col][0])));
                    break;
                case "firsts":
                    const firstsNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [0, 5, 10].every(i => firstsNumbers[i][1] && coinsSet.has(firstsNumbers[i][0]));
                    break;
                case "seconds":
                    const secondsNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [1, 6, 11].every(i => secondsNumbers[i][1] && coinsSet.has(secondsNumbers[i][0]));
                    break;
                case "thirds":
                    const thirdsNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [2, 7, 12].every(i => thirdsNumbers[i][1] && coinsSet.has(thirdsNumbers[i][0]));
                    break;
                case "fourths":
                    const fourthsNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [3, 8, 13].every(i => fourthsNumbers[i][1] && coinsSet.has(fourthsNumbers[i][0]));
                    break;
                case "fifths":
                    const fifthsNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [4, 9, 14].every(i => fifthsNumbers[i][1] && coinsSet.has(fifthsNumbers[i][0]));
                    break;
                case "today":
                    const today = [new Date().getDate(), new Date().getMonth() + 1, Number(new Date().getFullYear().toString().slice(-2))]
                    success = ticket.flat().some(element => Array.isArray(element) && element[1] && coinsSet.has(element[0]) && today.includes(element[0]));
                break;
                case "news":
                    const newsNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [2, 5, 9, 12].every(i => newsNumbers[i][1] && coinsSet.has(newsNumbers[i][0]));
                    break;
                case "plus":
                    const plusNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [2, 5, 7, 9, 12].every(i => plusNumbers[i][1] && coinsSet.has(plusNumbers[i][0]));
                    break;
                case "corners":
                    const cornersNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [0, 4, 10, 14].every(i => cornersNumbers[i][1] && coinsSet.has(cornersNumbers[i][0]));
                    break;
                case "cross":
                    const crossNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [0, 4, 7, 10, 14].every(i => crossNumbers[i][1] && coinsSet.has(crossNumbers[i][0]));
                    break;
                case "topRow":
                    success = 
                    success = ticket[0].every(element => element === -1 || (Array.isArray(element) && element[1] && coinsSet.has(element[0])))
                    break;
                case "middleRow":
                    success = ticket[1].every(element => element === -1 || (Array.isArray(element) && element[1] && coinsSet.has(element[0])))
                    break;
                case "bottomRow":
                    success = ticket[2].every(element => element === -1 || (Array.isArray(element) && element[1] && coinsSet.has(element[0])));
                    break;
                case "breakfast":
                    success = [0, 1, 2].every(i => [0, 1, 2].every(j => ticket[i][j] === -1 || (Array.isArray(ticket[i][j]) && ticket[i][j][1] && coinsSet.has(ticket[i][j][0]))));
                    break;
                case "lunch":
                    success = [0, 1, 2].every(i => [3, 4, 5].every(j => ticket[i][j] === -1 || (Array.isArray(ticket[i][j]) && ticket[i][j][1] && coinsSet.has(ticket[i][j][0]))));
                    break;
                case "dinner":
                    success = [0, 1, 2].every(i => [6, 7, 8].every(j => ticket[i][j] === -1 || (Array.isArray(ticket[i][j]) && ticket[i][j][1] && coinsSet.has(ticket[i][j][0]))));
                    break;
                case "day":
                    success = [0, 1, 2].every(i => [0, 1, 2, 3, 4].every(j => ticket[i][j] === -1 || (Array.isArray(ticket[i][j]) && ticket[i][j][1] && coinsSet.has(ticket[i][j][0]))));
                    break;
                case "night":
                    success = [0, 1, 2].every(i => [4, 5, 6, 7, 8].every(j => ticket[i][j] === -1 || (Array.isArray(ticket[i][j]) && ticket[i][j][1] && coinsSet.has(ticket[i][j][0]))));
                    break;
                case "zebra":
                    success = [0, 1, 2].every(i => [0, 2, 4, 6, 8].every(j => ticket[i][j] === -1 || (Array.isArray(ticket[i][j]) && ticket[i][j][1] && coinsSet.has(ticket[i][j][0]))));
                    break;
                case "couples":
                    success = ticket.every(row => row.slice(0, 8).every((cell, i) => !(Array.isArray(cell) && Array.isArray(row[i + 1])) || (cell[1] && row[i + 1][1] && coinsSet.has(cell[0]) && coinsSet.has(row[i + 1][0]))));
                    break;
                case "singles":
                    success = ticket.every(row => row.every((cell, j) => !Array.isArray(cell) || Array.isArray(row[j - 1]) || Array.isArray(row[j + 1]) || (cell[1] && coinsSet.has(cell[0]))));
                    break;
                case "sides":
                    const sidesNumbers = ticket.flat().filter(ele => Array.isArray(ele));
                    success = [0, 4, 5, 9, 10, 14].every(i => sidesNumbers[i][1] && coinsSet.has(sidesNumbers[i][0]));
                    break;
                case "twolanes":
                    const twolanesNumbers = ticket.flat().filter(Array.isArray);
                    success = [1, 3, 6, 8, 11, 13].every(i => {
                        const [value, marked] = twolanesNumbers[i] || [];
                        return marked && coins.includes(value);
                    });
                    break;
                case "odds":
                    success = ticket.flat().filter(Array.isArray).filter(([value]) => value % 2 === 1).every(([value, marked]) => marked && coinsSet.has(value));
                    break;
                case "evens":
                    success = ticket.flat().filter(Array.isArray).filter(([value]) => value % 2 === 0).every(([value, marked]) => marked && coinsSet.has(value));
                    break;
                case "earlyten":
                    success = ticket.flat().filter(element => Array.isArray(element) && element[1] && coinsSet.has(element[0])).length > 9;
                    break;
                case "eachcol1":
                    success = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(col => [ticket[0][col], ticket[1][col], ticket[2][col]].some(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0]))).every(Boolean);
                    break;
                case "firstColumn":
                    success = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(col => [ticket[0][col], ticket[1][col], ticket[2][col]].find(cell => Array.isArray(cell))).every(([value, marked]) => marked && coinsSet.has(value));
                    break;
                case "lastColumn":
                    success = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(col => [ticket[2][col], ticket[1][col], ticket[0][col]].find(cell => Array.isArray(cell))).every(([value, marked]) => marked && coinsSet.has(value));
                    break;
                case "triangle":
                    success = [2, 6, 7, 8, 10, 11, 12, 13, 14].map(i => ticket.flat().filter(Array.isArray)[i]).every(([value, marked]) => marked && coinsSet.has(value));
                    break;
                case "cone":
                    success = [0, 1, 2, 3, 4, 6, 7, 8, 12].map(i => ticket.flat().filter(Array.isArray)[i]).every(([value, marked]) => marked && coinsSet.has(value));
                    break;
                case "alternate":
                    success = [0, 2, 4, 6, 8, 10, 12, 14].map(i => ticket.flat().filter(Array.isArray)[i]).every(([value, marked]) => marked && coinsSet.has(value));
                    break;
                case "border":
                    success = [0, 1, 2, 3, 4, 5, 6, 7, 8].flatMap(i => [ticket[0][i], ticket[2][i]]).filter(Array.isArray).every(([value, marked]) => marked && coinsSet.has(value)) && [ticket[1][0], ticket[1][8]].every(cell => !Array.isArray(cell) || (cell[1] && coinsSet.has(cell[0])));
                    break;
                case "oneleft":
                    success = ticket.flat().filter(element => Array.isArray(element) && element[1] && coinsSet.has(element[0])).length > 13;
                    break;
                case "fullHouse":
                    success = ticket.flat().filter(element => Array.isArray(element)).every(([value, marked]) => marked && coinsSet.has(value))
                    break;
                default:
                    success = false
            }

            if (!success) {
                alert("Bogus Claim.");
                setLoading(false);
                return;
            }

            const increment_points = claim.name === "oneleft" ? (chances_left === 2 ? (points * 2) + (points - 1) : points + (points - 1)) : chances_left === 1 ? points * 2 : points;
            const change_chances = claim.name === "oneleft" ? -2 : -1;

            const { status, reason } = await firestore.runTransaction(async (transaction) => {
                const doc = await transaction.get(firestore.collection("call").doc(game_id));
                if (!doc.exists) return { status: false, reason: "not_started"}
                if (doc.data().claims[claim.name]) return { status: false, reason: "already_claimed" };
                transaction.update(firestore.collection("call").doc(game_id), {
                    [`claims.${claim.name}`]: name,
                    [`players.${id}.points`]: FieldValue.increment(increment_points),
                    [`players.${id}.chances_left`]: FieldValue.increment(change_chances),
                });
                return {
                    status: true
                };
            });
            if (status) {
                dispatch(updateClaims({ change_chances }));
                dispatch(updateUser({ increment_stars: claim.name === "fullHouse", increment_points }));
            }
            else if (reason) {
                if (reason === "not_started") {
                    alert("Game not started!");
                } else if (reason === "already_claimed") {
                    alert("Sorry! Just claimed by someone else.");
                }
            }
        } catch (error) {
            console.log("Claim Error:", error)
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    return (
        <div className="Claims mtm w100pc">
            <div className="card-body tac">
                {Object.entries(difficulty === "Beginner" ? claimGroupsBeginner : claimGroups)?.sort((a, b) => Number(b[0]) - Number(a[0])).map(([points, claimList]) => (
                    <div key={points} className="section">
                        <div className="clst">{players_count * Number(points)} points</div>
                        {claimList?.map(claim => (
                            <div key={claim.name} className="claim w100pc frow faic fjcsb">
                                <button className="info">
                                    {svgs[claim.name] || emojis[claim.name]}
                                    <span className="tooltip ps brs"><b>{claim.display}</b><br/>{claim.description}</span>
                                </button>
                                {claims && claims[claim.name] ? (
                                    <span className="claimName bclst brs fgr1 op50pc cd">
                                        {claims[claim.name]?.substring(0, 20)}
                                    </span>
                                ) : (
                                    <>
                                        <button 
                                            disabled={chances_left < (claim.name === "oneleft" ? 2 : 1) || loading || coins.length === 0} 
                                            className="claim-btn btn btn-y frow fjcsb faic fgr1" 
                                            onClick={() => handleClick(claim, Number(points), ticket, coins, name, id, chances_left, game_id)}
                                        >
                                            <span className="ps fgr1">{claim.display}</span>
                                            <span className={`point cw ${chances_left === (claim.name === "oneleft" ? 2 : 1) ? "bcg" : "bco"}`}>
                                                {points * players_count}
                                                {claim.name === "oneleft" && `+${(points-1) * players_count}`}
                                                {chances_left === (claim.name === "oneleft" ? 2 : 1) && `+${points * players_count}`}
                                            </span>
                                        </button>
                                        {claim.name === "fullHouse" && players_count > 3 && <span role="img" aria-label="star" className="mlxs">⭐</span>}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Claims;