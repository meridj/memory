import mode from '../config/map';
import { newInlineStyle } from '../utils/functions';
import Game from './Game';
import HightScore from './HightScore';

export default class Launcher {
  constructor(hightScores) {
    this._easyButton = document.getElementById('easy');
    this._normalButton = document.getElementById('normal');
    this._hardButton = document.getElementById('hard');
    newInlineStyle(document.getElementById('welcome'), 'display', 'flex');

    this._easyButton.addEventListener('click', this._launcherGame);
    this._normalButton.addEventListener('click', this._launcherGame);
    this._hardButton.addEventListener('click', this._launcherGame);
  }

  _launcherGame(event) {
    const gameMode = mode[event.target.dataset.mode];
    newInlineStyle(document.getElementById('welcome'), 'display', 'none');

    this.game = new Game(gameMode, new HightScore(false));
    this.game.startGame();
  }
}
