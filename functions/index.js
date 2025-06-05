const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
const activeGames = {};
exports.onPlayStart = onDocumentWritten("play/{playId}", async (event) => {
  const playId = event.params.playId;
  const before = event.data.before?.data() || {};
  const after = event.data.after?.data() || {};
  if (!before.start && after.start) return startGame(playId, after.speed);
  if (before.start && !after.start) stopGame(playId);
  return null;
});
function stopGame(playId) {
  if (activeGames[playId]) {
    clearInterval(activeGames[playId].interval);
    delete activeGames[playId];
  }
}
async function startGame(playId, speed) {
  const allNumbers = Array.from({length: 90}, (_, i) => i);
  let toggle = true;
  let maxIntervals = Math.floor(500 / speed);
  activeGames[playId] = {
    interval: setInterval(async () => {
      try {
        maxIntervals--;
        if (maxIntervals === 0) {
          await db.collection("play").doc(playId).update({start: false});
          stopGame(playId);
          setTimeout(async () => await db.collection("play").doc(playId).update({start: true}), 10000);
          return;
        }
        const callDoc = await db.collection("call").doc(playId).get();
        const {coins = [], players = {}, version = 0} = callDoc.data() || {};
        const usedNumbers = new Set(coins);
        const allTicketNumbers = new Set(Object.values(players).flatMap((player) => player.ticket.filter((e) => e > -1)));
        const nextNumber = getNextNumber(
            toggle,
            Object.values(players).map((player) => player.ticket.flat().filter((e) => e > -1 && !usedNumbers.has(e))),
            Array.from(allTicketNumbers),
            allNumbers.filter((n) => !allTicketNumbers.has(n) && !usedNumbers.has(n)),
            usedNumbers,
            version%90,
        );
        if (nextNumber === null) {
          await db.collection("play").doc(playId).update({start: false});
          return stopGame(playId);
        }
        toggle = !toggle;
        await db.collection("call").doc(playId).update({coins: admin.firestore.FieldValue.arrayUnion(nextNumber)});
      } catch (err) {
        console.error(`[${playId}] Error Running Game:`, err);
        stopGame(playId);
        await db.collection("play").doc(playId).update({
          start: false,
          error: err.message || String(err),
        });
      }
    }, speed * 1000),
  };
}

function pickNumberFromTickets(tickets) {
  const maxTicket = tickets.reduce((a, b) => b.length > a.length ? b : a, []);
  const freqMap = tickets.flat().reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  const minFreq = Math.min(...maxTicket.map((num) => freqMap[num] || 0));
  const leastFrequent = maxTicket.filter((num) => freqMap[num] === minFreq);
  return leastFrequent[Math.floor(Math.random() * leastFrequent.length)];
}

function getNextNumber(toggle, tickets, ticketArr, restArr, usedNumbers, specialNumber) {
  if (!usedNumbers.has(specialNumber) && ticketArr.every((num) => num === specialNumber || usedNumbers.has(num))) return specialNumber;
  const filteredTickets = tickets.map((t) => t.filter((n) => n !== specialNumber));
  if (toggle && filteredTickets.some((t) => t.length > 0)) return pickNumberFromTickets(filteredTickets);
  if (restArr.length) return restArr[Math.floor(Math.random() * restArr.length)];
  if (filteredTickets.some((t) => t.length > 0)) return pickNumberFromTickets(filteredTickets);
  return null;
}
