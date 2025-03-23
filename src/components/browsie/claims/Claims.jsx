import React from 'react';
import { connect } from 'react-redux';
import './Claims.css';
import { claimClaim } from '../../../redux/claims/claims.actions';

import { ReactComponent as BreakfastIcon } from '../../../assets/claims/breakfast.svg';
import { ReactComponent as LunchIcon } from '../../../assets/claims/lunch.svg';
import { ReactComponent as DinnerIcon } from '../../../assets/claims/dinner.svg';
import { ReactComponent as BottomRowIcon } from '../../../assets/claims/bottomrow.svg';
import { ReactComponent as MiddleRowIcon } from '../../../assets/claims/middlerow.svg';
import { ReactComponent as TopRowIcon } from '../../../assets/claims/toprow.svg';
import { ReactComponent as DayIcon } from '../../../assets/claims/day.svg';
import { ReactComponent as NightIcon } from '../../../assets/claims/night.svg';
import { ReactComponent as BorderIcon } from '../../../assets/claims/border.svg';
import { ReactComponent as FullHouseIcon } from '../../../assets/claims/fullhouse.svg';
import { ReactComponent as UnluckyIcon } from '../../../assets/claims/unlucky.svg';
import { ReactComponent as ZeroXIcon } from '../../../assets/claims/zerox.svg';
import { ReactComponent as OneXIcon } from '../../../assets/claims/onex.svg';
import { ReactComponent as TwoXIcon } from '../../../assets/claims/twox.svg';
import { ReactComponent as ThreeXIcon } from '../../../assets/claims/threex.svg';
import { ReactComponent as FourXIcon } from '../../../assets/claims/fourx.svg';
import { ReactComponent as FiveXIcon } from '../../../assets/claims/fivex.svg';
import { ReactComponent as SixXIcon } from '../../../assets/claims/sixx.svg';
import { ReactComponent as SevenXIcon } from '../../../assets/claims/sevenx.svg';
import { ReactComponent as EightXIcon } from '../../../assets/claims/eightx.svg';
import { ReactComponent as TopFirstIcon } from '../../../assets/claims/topfirst.svg';
import { ReactComponent as TopCenterIcon } from '../../../assets/claims/topcenter.svg';
import { ReactComponent as TopLastIcon } from '../../../assets/claims/toplast.svg';
import { ReactComponent as MiddleFirstIcon } from '../../../assets/claims/middlefirst.svg';
import { ReactComponent as MiddleCenterIcon } from '../../../assets/claims/middlecenter.svg';
import { ReactComponent as MiddleLastIcon } from '../../../assets/claims/middlelast.svg';
import { ReactComponent as BottomFirstIcon } from '../../../assets/claims/bottomfirst.svg';
import { ReactComponent as BottomCenterIcon } from '../../../assets/claims/bottomcenter.svg';
import { ReactComponent as BottomLastIcon } from '../../../assets/claims/bottomlast.svg';
import { ReactComponent as MinMaxIcon } from '../../../assets/claims/minmax.svg';
import { ReactComponent as TowerIcon } from '../../../assets/claims/tower.svg';
import { ReactComponent as FirstsIcon } from '../../../assets/claims/firsts.svg';
import { ReactComponent as SecondsIcon } from '../../../assets/claims/seconds.svg';
import { ReactComponent as CentersIcon } from '../../../assets/claims/centers.svg';
import { ReactComponent as FourthsIcon } from '../../../assets/claims/fourths.svg';
import { ReactComponent as LastsIcon } from '../../../assets/claims/lasts.svg';
import { ReactComponent as CharminarIcon } from '../../../assets/claims/charminar.svg';
import { ReactComponent as FiveStarIcon } from '../../../assets/claims/fivestar.svg';
import { ReactComponent as RainIcon } from '../../../assets/claims/rain.svg';
import { ReactComponent as SnowIcon } from '../../../assets/claims/snow.svg';
import { ReactComponent as BushIcon } from '../../../assets/claims/bush.svg';
import { ReactComponent as AntillaIcon } from '../../../assets/claims/antilla.svg';
import { ReactComponent as OddsIcon } from '../../../assets/claims/odds.svg';
import { ReactComponent as EvensIcon } from '../../../assets/claims/evens.svg';
import { ReactComponent as CouplesIcon } from '../../../assets/claims/couples.svg';
import { ReactComponent as SinglesIcon } from '../../../assets/claims/singles.svg';
import { ReactComponent as ZebraIcon } from '../../../assets/claims/zebra.svg';
import { ReactComponent as NewsIcon } from '../../../assets/claims/news.svg';
import { ReactComponent as NavgrahaIcon } from '../../../assets/claims/navgraha.svg';
import { ReactComponent as TriangleIcon } from '../../../assets/claims/triangle.svg';
import { ReactComponent as ConeIcon } from '../../../assets/claims/cone.svg';
import { ReactComponent as TwolanesIcon } from '../../../assets/claims/twolanes.svg';
import { ReactComponent as SidesIcon } from '../../../assets/claims/sides.svg';

const svgs = {
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
    unlucky: <UnluckyIcon className="mrs" />,
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
    centers: <CentersIcon className="mrs" />,
    fourths: <FourthsIcon className="mrs" />,
    lasts: <LastsIcon className="mrs" />,
    charminar: <CharminarIcon className="mrs" />,
    fivestar: <FiveStarIcon className="mrs" />,
    rain: <RainIcon className="mrs" />,
    snow: <SnowIcon className="mrs" />,
    bush: <BushIcon className="mrs" />,
    antilla: <AntillaIcon className="mrs" />,
    odds: <OddsIcon className="mrs" />,
    evens: <EvensIcon className="mrs" />,
    singles: <SinglesIcon className="mrs" />,
    couples: <CouplesIcon className="mrs" />,
    twolanes: <TwolanesIcon className="mrs" />,
    sides: <SidesIcon className="mrs" />,
    zebra: <ZebraIcon className="mrs" />,
    news: <NewsIcon className="mrs" />,
    navgraha: <NavgrahaIcon className="mrs" />,
    triangle: <TriangleIcon className="mrs" />,
    cone: <ConeIcon className="mrs" />
}

const Claims = ({ claimList, claimClaim, isClaiming, id, name, gameId, coins, claims, myTicket, columnDensity, chances, gVersion, size, tVersion, claimedCount, xx }) => {


    const claimIt = (claim) => {
        const remChances = chances - claimedCount;
        const required = claim.name === "oneleft" ? 1 : 0;
        let warn = claim.name === "oneleft" ? "Need 2 chances to claim ONE LEFT! " : "";
        warn = warn + `You have ${remChances} chance left!`;
        remChances > required ? claimClaim(gameId, coins, claim, id, name, myTicket, columnDensity, xx, size) : alert(warn);
    }

    const points_multiplier = 10
    const claimArray = [
        [1, 0, 11],
        [2, 11, 22],
        [3, 22, 32],
        [4, 32, 40],
        [5, 40, 50],
        [6, 50, 57],
        [7, 57, 58]
    ]
    const emojis = {
        early: <span role="img" className="mrxs fsxl">☝</span>,
        twin: <span role="img" className="mrxs fsxl">✌️</span>,
        earlyfive: <span role="img" className="mrxs fsxl">🖐</span>,
        earlyten: <span role="img" className="mrxs fsxl">🙌</span>,
        oneleft: <span role="img" className="mrxs fsxl">🤌</span>
    }

    return (
        <div className="Claims mtm w100pc">
            <div className="card-body tac">
                <h2 className="title co">Claims</h2>
                {
                    claimArray.map(range => <>
                        <div className="cl">{points_multiplier * range[0]} points</div>
                        {
                            claimList.slice(range[1], range[2]).map(claim =>
                                <div key={claim.name} className="claim w100pc frow faic fjcsb">
                                    <button className="info">
                                        {svgs[claim.name] ? svgs[claim.name] : emojis[claim.name]}
                                        <span className="tooltip ps brs">{claim.display}<br />{claim.description}</span>
                                    </button>
                                    {
                                        claims[claim.name]
                                            ? <span className="claimName bclst brs fgr1 op50pc">{claims[claim.name]?.substring(0, 20)}</span>
                                            : <>
                                                <button disabled={isClaiming} className="claim-btn btn btn-y frow fjcsb faic fgr1" 
                                                    onClick={() => (gVersion === tVersion && chances !== 0) ? claimIt(claim, chances, claimedCount) : alert("Claims will be active after game starts.")}>
                                                    <span className="ps fgr1">{claim.display}</span>
                                                    <span className="point bco cw">{claim.points * points_multiplier}{xx && `+${claim.points * points_multiplier}`}{claim.name === "oneleft" && `+${(claim.points-1) * points_multiplier}`}</span>
                                                </button>
                                                {
                                                    claim.name === "fulhouse" && size > 3 && <span role="img" aria-label="star" className="mlxs">⭐</span>
                                                }
                                            </>
                                    }
                                </div>
                            )
                        }
                    </>)
                }
            </div>
        </div >
    );
};

const mapStateToProps = ({ claims, user, play, ticket }) => (
    {
        claimList: claims.claimList,
        isClaiming: claims.isClaiming,
        claimedCount: claims.claimedCount,
        xx: claims.xx,
        id: user.id,
        name: user.name,
        gameId: play.gameId,
        coins: play.coins,
        claims: play.claims,
        chances: play.chances,
        gVersion: play.gVersion,
        size: play.size,
        tVersion: ticket.tVersion,
        myTicket: ticket.myTicket,
        columnDensity: ticket.columnDensity
    }
);

const mapDispatchToProps = dispatch => (
    {
        claimClaim: (gameId, coins, claim, id, name, myTicket, columnDensity, xx, size) => dispatch(claimClaim(gameId, coins, claim, id, name, myTicket, columnDensity, xx, size))
    }
)

export default connect(mapStateToProps, mapDispatchToProps)(Claims);