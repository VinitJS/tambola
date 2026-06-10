const {onDocumentWritten} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onPlayStart = onDocumentWritten({
  document: "play/{playId}",
  timeoutSeconds: 540,
}, async (event) => {
  const playId = event.params.playId;
  const before = event.data.before?.data() || {};
  const after = event.data.after?.data() || {};
  if (!before.start && after.start) {
    return startGame(playId, after.speed, after.runId);
  }
  return null;
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function startGame(playId, speed = 12, runId) {
  const allNumbers = Array.from({length: 90}, (_, i) => i);
  let toggle = true;
  const delayMs = Math.max(Number(speed) || 12, 1) * 1000;
  const maxIntervals = Math.floor(500000 / delayMs);

  try {
    for (let remaining = maxIntervals; remaining > 0; remaining--) {
      await sleep(delayMs);

      const playDoc = await db.collection("play").doc(playId).get();
      const play = playDoc.data() || {};
      if (!play.start || (runId && play.runId !== runId)) return null;

      const callDoc = await db.collection("call").doc(playId).get();
      const {coins = [], players = {}, version = 0} = callDoc.data() || {};
      const playerTickets = Object.values(players)
          .map((player) => player.ticket || []);
      const usedNumbers = new Set(coins);
      const allTicketNumbers = new Set(
          playerTickets.flatMap((ticket) => ticket.filter((e) => e > -1)),
      );
      const nextNumber = getNextNumber(
          toggle,
          playerTickets.map((ticket) => ticket.filter((e) => e > -1 && !usedNumbers.has(e))),
          Array.from(allTicketNumbers),
          allNumbers.filter((n) => !allTicketNumbers.has(n) && !usedNumbers.has(n)),
          usedNumbers,
          version % 90,
      );
      if (nextNumber === null) {
        await db.collection("play").doc(playId).update({start: false});
        return null;
      }
      toggle = !toggle;
      await db.collection("call").doc(playId).update({
        coins: admin.firestore.FieldValue.arrayUnion(nextNumber),
      });
    }

    await db.collection("play").doc(playId).update({start: false});
    await sleep(10000);
    const playDoc = await db.collection("play").doc(playId).get();
    const play = playDoc.data() || {};
    if (!play.start && (!runId || play.runId === runId)) {
      await db.collection("play").doc(playId).update({
        start: true,
        runId: `${Date.now()}`,
      });
    }
  } catch (err) {
    console.error(`[${playId}] Error Running Game:`, err);
    await db.collection("play").doc(playId).update({
      start: false,
      error: err.message || String(err),
    });
  }
  return null;
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
