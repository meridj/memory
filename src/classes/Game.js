import { newInlineStyle, shuffleArray } from '../utils/functions';
import Launcher from './Launcher';

/*
**
** property like : this._property are private
** property like : this.property are public
**
*/
export default class Game {
  constructor(gameMode, hightScores) {
    this._gameMode = gameMode;
    this._hightScores = hightScores || null;
    this._board = document.getElementsByClassName('board-game')[0];
    this._loaderWrapper = document.getElementById('loader-wrapper');
    this._loader = null;
    this._loaderPercent = null;
    this._timeToWin = null;

    this._timerForLoader = 0;
    this._timeToWinCpt = 0;
    this._cards = [];
    this._currentsImagesSelected = [];
    this._pairs = this._gameMode.mapY * this._gameMode.mapX / 2;
    this._timeout = null;
    this._timeoutEndGame = null;
  }

  /*
  ** Publics Methods
  */
  startGame() {
    this._createGameBoard();
    this._createCards();
    this._createLoader();
    this._addCardsOnBoard();
    this._increaseLoader();
    this._timeoutEndGame = setTimeout(() => {
      this.removeBoardAndLoaderChild();
      this.stopGame(false);
    }, this._gameMode.timeToWin * 1000);
  }

  removeBoardAndLoaderChild() {
    newInlineStyle(this._loaderWrapper, 'display', `none`);
    newInlineStyle(this._board, 'display', `none`);

    this._loaderWrapper.removeChild(this._loaderPercent);
    this._loaderWrapper.removeChild(this._loader);
    this._loaderWrapper.removeChild(this._timeToWin);

    this._cards.forEach(element => {
      this._board.removeChild(element.card);
    });
  }

  stopGame(isWin) {
    const result = document.getElementById('result-of-game');
    const resultMessage = document.getElementById('result-message');
    const retryButton = document.getElementById('retry-button');

    retryButton.addEventListener('click', () => {
      newInlineStyle(result, 'display', 'none');
      new Launcher();
    });
    clearTimeout(this._timeoutEndGame);
    if (isWin) {
      resultMessage.textContent = 'Gagné !';
    } else {
      resultMessage.textContent = 'Perdu !';
    }
    newInlineStyle(result, 'display', 'flex');
    this._hightScores.addHightScore({
      mode: this._gameMode.name,
      result: isWin ? 'Gagné' : 'Perdu',
      timeToWin: isWin ? `${this._timeToWinCpt}s` : '-'
    });
  }

  _increaseLoader() {
    newInlineStyle(this._loaderWrapper, 'display', `block`);
    let interval = setInterval(() => {
      this._timerForLoader += this._gameMode.intervalIncrementForLoader;
      this._loader.style.width = `${this._timerForLoader}%`;
      this._timeToWinCpt += 1;
      this._loaderPercent.textContent = `${Math.floor(
        this._timerForLoader
      )}% du temps écoulé`;
      this._timeToWin.textContent = `Il vous reste ${this._gameMode.timeToWin -
        this._timeToWinCpt}s`;
      if (this._timerForLoader >= 100) clearInterval(interval);
    }, 1000);
  }

  /*
  ** End Publics Methods
  */

  /*
  ** Privates Methods
  */
  _createGameBoard() {
    newInlineStyle(this._board, 'display', 'grid');
    newInlineStyle(
      this._board,
      'grid-template-columns',
      `repeat(${this._gameMode.mapX}, 100px)`
    );
    newInlineStyle(
      this._board,
      'display',
      `repeat(${this._gameMode.mapY}, 100px)`
    );
  }

  _createLoader() {
    this._loaderPercent = document.createElement('span');
    this._loader = document.createElement('div');
    this._timeToWin = document.createElement('span');

    this._loaderPercent.setAttribute('id', 'loader-percent');
    this._loader.setAttribute('id', 'loader');
    this._timeToWin.setAttribute('id', 'time-to-win');

    this._loaderWrapper.appendChild(this._loaderPercent);
    this._loaderWrapper.appendChild(this._loader);
    this._loaderWrapper.appendChild(this._timeToWin);
  }

  _createCards() {
    const cardsNumber = this._gameMode.mapY * this._gameMode.mapX;
    let backgroundPositionCounter = 0;

    for (let index = 0; index < cardsNumber; index++) {
      const card = document.createElement('div');
      const hiddenSide = document.createElement('div');
      const visibleSide = document.createElement('div');
      card.classList.add('carte');
      hiddenSide.classList.add('cache');
      visibleSide.classList.add('image');
      newInlineStyle(
        visibleSide,
        'background-position',
        `0 -${backgroundPositionCounter++}00px`
      );
      card.appendChild(hiddenSide);
      card.appendChild(visibleSide);
      this._cards.push({
        id: index,
        card: card,
        numCard: backgroundPositionCounter,
        isPairing: false
      });
      if (backgroundPositionCounter === this._pairs)
        backgroundPositionCounter = 0;
    }
    shuffleArray(this._cards);
  }

  _addCardsOnBoard() {
    this._cards.forEach(currentCard => {
      currentCard.card.addEventListener('click', () => {
        this._returnCard(event, currentCard);
      });
      this._board.appendChild(currentCard.card);
    });
  }

  _returnCard(event, clickedCard) {
    if (!this._timeout && !clickedCard.isPairing) {
      if (
        this._currentsImagesSelected.length === 1 &&
        this._currentsImagesSelected[0].id === clickedCard.id
      ) {
        return;
      }
      this._currentsImagesSelected.push(clickedCard);
      newInlineStyle(clickedCard.card.childNodes[0], 'display', 'none');
      newInlineStyle(clickedCard.card.childNodes[1], 'display', 'block');
      if (this._currentsImagesSelected.length === 2)
        this._isCurrentImageIdentic();
    }
  }

  _isCurrentImageIdentic() {
    if (
      this._currentsImagesSelected[0].numCard ===
      this._currentsImagesSelected[1].numCard
    ) {
      this._pairs = this._pairs - 1;
      if (this._pairs === 0) {
        this.removeBoardAndLoaderChild();
        this.stopGame(true);
      }
      const prevIndex = this._cards.indexOf(this._currentsImagesSelected[0]);
      const currentIndex = this._cards.indexOf(this._currentsImagesSelected[1]);
      this._cards[prevIndex].isPairing = true;
      this._cards[currentIndex].isPairing = true;
      this._currentsImagesSelected.length = 0;
    } else {
      this._createTimer();
    }
  }

  _createTimer() {
    this._timeout = true;
    setTimeout(() => {
      this._currentsImagesSelected[0].card.childNodes[1];
      newInlineStyle(
        this._currentsImagesSelected[0].card.childNodes[0],
        'display',
        'block'
      );
      newInlineStyle(
        this._currentsImagesSelected[0].card.childNodes[1],
        'display',
        'none'
      );
      newInlineStyle(
        this._currentsImagesSelected[1].card.childNodes[0],
        'display',
        'block'
      );
      newInlineStyle(
        this._currentsImagesSelected[1].card.childNodes[1],
        'display',
        'none'
      );
      this._currentsImagesSelected.length = 0;
      this._timeout = false;
    }, 1000);
  }

  /*
  ** End Privates Methods
  */
}
