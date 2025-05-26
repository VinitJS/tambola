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
import { ReactComponent as CharminarIcon } from '../../assets/claims/charminar.svg';
import { ReactComponent as FiveStarIcon } from '../../assets/claims/fivestar.svg';
import { ReactComponent as RainIcon } from '../../assets/claims/rain.svg';
import { ReactComponent as SnowIcon } from '../../assets/claims/snow.svg';
import { ReactComponent as BushIcon } from '../../assets/claims/bush.svg';
import { ReactComponent as TriveniIcon } from '../../assets/claims/triveni.svg';
import { ReactComponent as CouplesIcon } from '../../assets/claims/couples.svg';
import { ReactComponent as SinglesIcon } from '../../assets/claims/singles.svg';
import { ReactComponent as ZebraIcon } from '../../assets/claims/zebra.svg';
import { ReactComponent as NewsIcon } from '../../assets/claims/news.svg';
import { ReactComponent as AlternateIcon } from '../../assets/claims/alternate.svg';
import { ReactComponent as TriangleIcon } from '../../assets/claims/triangle.svg';
import { ReactComponent as ConeIcon } from '../../assets/claims/cone.svg';
import { ReactComponent as TwolanesIcon } from '../../assets/claims/twolanes.svg';
import { ReactComponent as SidesIcon } from '../../assets/claims/sides.svg';

const Claims = ({ game_id }) => {
    const dispatch = useDispatch();
    // Get state from Redux store
    const { claims, chances_left, players_count } = useSelector((state) => state.claims);
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
        charminar: <CharminarIcon className="mrs" />,
        fivestar: <FiveStarIcon className="mrs" />,
        rain: <RainIcon className="mrs" />,
        snow: <SnowIcon className="mrs" />,
        bush: <BushIcon className="mrs" />,
        triveni: <TriveniIcon className="mrs" />,
        singles: <SinglesIcon className="mrs" />,
        couples: <CouplesIcon className="mrs" />,
        twolanes: <TwolanesIcon className="mrs" />,
        sides: <SidesIcon className="mrs" />,
        zebra: <ZebraIcon className="mrs" />,
        news: <NewsIcon className="mrs" />,
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
    
    const claimGroups = useMemo(() => ({
        1: [
            { name: "early", display: "EARLY", description: "ANY 1 number." },
            { name: "topFirst", display: "TOP FIRST", description: "FIRST from TOP row." },
            { name: "topCenter", display: "TOP CENTER", description: "MIDDLE from TOP row." },
            { name: "topLast", display: "TOP LAST", description: "LAST from TOP row." },
            { name: "middleFirst", display: "MIDDLE FIRST", description: "FIRST from MIDDLE row." },
            { name: "middleCenter", display: "MIDDLE CENTER", description: "MIDDLE from MIDDLE row." },
            { name: "middleLast", display: "MIDDLE LAST", description: "LAST from MIDDLE row." },
            { name: "bottomFirst", display: "BOTTOM FIRST", description: "FIRST from BOTTOM row." },
            { name: "bottomCenter", display: "BOTTOM CENTER", description: "MIDDLE from BOTTOM row." },
            { name: "bottomLast", display: "BOTTOM LAST", description: "LAST from BOTTOM row." },
            { name: "twin", display: "TWIN", description: "ANY 1 number from 11, 22, 33, 44, 55, 66, 77, 88." },
        ],
        2: [
            { name: "zerox", display: "ALL UNITS", description: "ALL numbers from 0-9." },
            { name: "onex", display: "ALL 10s", description: "ALL numbers from 10-19." },
            { name: "twox", display: "ALL 20s", description: "ALL numbers from 20-29." },
            { name: "threex", display: "ALL 30s", description: "ALL numbers from 30-39." },
            { name: "fourx", display: "ALL 40s", description: "ALL numbers from 40-49." },
            { name: "fivex", display: "ALL 50s", description: "ALL numbers from 50-59." },
            { name: "sixx", display: "ALL 60s", description: "ALL numbers from 60-69." },
            { name: "sevenx", display: "ALL 70s", description: "ALL numbers from 70-79." },
            { name: "eightx", display: "ALL 80s", description: "ALL numbers from 80-89." },
            { name: "triveni", display: "TRIVENI", description: "ANY 1 number from EACH of the 3 rows." },    
        ],
        3: [
            { name: "tower", display: "TOWER", description: "ALL 3 from ANY 1 column." },
            { name: "earlyfive", display: "EARLY FIVE", description: "ANY 5." },
            { name: "minmax", display: "MIN-MAX", description: "SMALLEST & LARGEST number." },
            { name: "firsts", display: "FIRSTS", description: "1st from ALL 3 rows." },
            { name: "seconds", display: "SECONDS", description: "2nd from ALL 3 rows." },
            { name: "thirds", display: "THIRDS", description: "3rd from ALL 3 rows." },
            { name: "fourths", display: "FOURTHS", description: "4th from ALL 3 rows." },
            { name: "fifths", display: "FIFTHS", description: "5th from ALL 3 rows." },
            { name: "news", display: "NEWS", description: "1st & 5th from MIDDLE row, 3rd from TOP & BOTTOM rows." },
            { name: "charminar", display: "CHAR-MINAR", description: "1st & 5th from TOP & BOTTOM rows." },        
        ],
        4: [
            { name: "fivestar", display: "FIVE STAR", description: "1st & 5th from TOP & BOTTOM rows, 3rd from MIDDLE row)." },
            { name: "today", display: `TODAY (${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear().toString().slice(-2)})`, description: `Any number from today's date: ${new Date().getDate()} / ${new Date().getMonth() + 1} / ${new Date().getFullYear().toString().slice(-2)}` },
            { name: "topRow", display: "TOP ROW", description: "ALL 5 numbers from TOP row." },
            { name: "middleRow", display: "MIDDLE ROW", description: "ALL 5 numbers from MIDDLE row." },
            { name: "bottomRow", display: "BOTTOM ROW", description: "ALL 5 numbers from BOTTOM row." },
            { name: "breakfast", display: "BREAK-FAST", description: "ALL numbers in FIRST 3 columns." },
            { name: "lunch", display: "LUNCH", description: "ALL numbers in MIDDLE 3 columns." },
            { name: "dinner", display: "DINNER", description: "ALL numbers in LAST 3 columns." },
            { name: "lucky", display: "LUCKY 13", description: "NO MATCH in the first 13 calls." },
            { name: "singles", display: "SINGLES", description: "ALL numbers with NO number on LEFT and RIGHT of it." },
        ],
        5: [
            { name: "couples", display: "COUPLES", description: "ALL numbers with ANOTHER number beside it." },
            { name: "earlyten", display: "EARLY TEN", description: "ANY 10 numbers." },
            { name: "sides", display: "SIDES", description: "1st & 5th from TOP, MIDDLE, BOTTOM rows." },
            { name: "twolanes", display: "NEXT 2 SIDES", description: "2nd & 4th from TOP, MIDDLE, BOTTOM rows." },
            { name: "day", display: "DAY", description: "ALL numbers in FISRT 5 columns." },
            { name: "night", display: "NIGHT", description: "ALL numbers in LAST 5 columns." },
            { name: "zebra", display: "ZEBRA", description: "ALL numbers in columns 1, 3, 5, 7, 9." },
            { name: "odds", display: "ODDS", description: "ALL ODD numbers." },
            { name: "evens", display: "EVENS", description: "ALL EVEN numbers." },
            { name: "rain", display: "RAIN", description: "1 number in EACH column." },    
        ],
        6: [
            { name: "snow", display: "SNOW", description: "FIRST number in EACH column." },
            { name: "bush", display: "BUSH", description: "LAST number in EACH column." },
            { name: "triangle", display: "TRIANGLE", description: "3rd in TOP row, 2nd, 3rd, 4th in MIDDLE row, AL 5 in BOTTOM row." },
            { name: "cone", display: "CONE", description: "ALL 5 in TOP row, 2nd, 3rd, 4th in MIDDLE row, 3rd in BOTTOM row." },
            { name: "alternate", display: "ALT", description: "1st, 3rd, 5th in TOP and BOTTOM row, 2nd, 4th in MIDDLE row." },
            { name: "border", display: "BORDER", description: "ALL numbers on the BORDER." },
            { name: "oneleft", display: "ONE LEFT", description: "ANY 14 numbers (takes away 2 chances, gives double the points)." },
        ],
        7: [
            { name: "fullHouse", display: "FULL HOUSE", description: "ALL 15 numbers." },
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
                case "triveni":
                    success = ticket[0].some(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0])) && ticket[1].some(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0])) && ticket[2].some(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0]));
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
                case "charminar":
                    const charminarNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [0, 4, 10, 14].every(i => charminarNumbers[i][1] && coinsSet.has(charminarNumbers[i][0]));
                    break;
                case "fivestar":
                    const fivestarNumbers = ticket.flat().filter(element => Array.isArray(element));
                    success = [0, 4, 7, 10, 14].every(i => fivestarNumbers[i][1] && coinsSet.has(fivestarNumbers[i][0]));
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
                case "rain":
                    success = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(col => [ticket[0][col], ticket[1][col], ticket[2][col]].some(cell => Array.isArray(cell) && cell[1] && coinsSet.has(cell[0]))).every(Boolean);
                    break;
                case "snow":
                    success = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(col => [ticket[0][col], ticket[1][col], ticket[2][col]].find(cell => Array.isArray(cell))).every(([value, marked]) => marked && coinsSet.has(value));
                    break;
                case "bush":
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
                {Object.entries(claimGroups)?.map(([points, claimList]) => (
                    <div key={points} className="section">
                        <div className="cl">{players_count * Number(points)} points</div>
                        {claimList?.map(claim => (
                            <div key={claim.name} className="claim w100pc frow faic fjcsb">
                                <button className="info">
                                    {svgs[claim.name] || emojis[claim.name]}
                                    <span className="tooltip ps brs">{claim.display}<br/>{claim.description}</span>
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