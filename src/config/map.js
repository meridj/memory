const mode = {
  easy: {
    timeToWin: 30, // in second
    intervalIncrementForLoader: 3.3333, // in percent
    mapX: 4,
    mapY: 4,
    name: 'easy'
  },
  normal: {
    timeToWin: 60, // in second
    intervalIncrementForLoader: 1.6666, // in percent
    mapX: 7,
    mapY: 4,
    name: 'normal'
  },
  hard: {
    timeToWin: 90, // in second
    intervalIncrementForLoader: 1.1111, // in percent
    mapX: 9,
    mapY: 4,
    name: 'hard'
  }
};

export default mode;
