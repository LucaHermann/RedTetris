export function* randomizer() {
  const pieces = ["I", "J", "L", "O", "S", "T", "Z"];
  const order: string[] = [];

  const pool = pieces.concat(pieces, pieces, pieces, pieces);

  const firstPiece = ["I", "J", "L", "T"][Math.floor(Math.random() * 4)];
  yield firstPiece;

  const history = ["S", "Z", "S", firstPiece];

  while (true) {
    let roll: number;
    let i: number = 0;
    let piece: string = pool[Math.floor(Math.random() * 35)];

    for (roll = 0; roll < 6; ++roll) {
      i = Math.floor(Math.random() * 35);
      piece = pool[i];
      if (history.includes(piece) === false || roll === 5) {
        break;
      }
      if (order.length) pool[i] = order[0];
    }

    if (order.includes(piece)) {
      order.splice(order.indexOf(piece), 1);
    }
    order.push(piece);

    pool[i] = order[0];

    history.shift();
    history[3] = piece;

    yield piece;
  }
}
