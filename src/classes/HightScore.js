import { setObj, getObj } from '../utils/functions';

export default class HightScore {
  constructor(initialize) {
    this._table = document.getElementById('table');
    this._valuesToSave = [];
    this._savesValues = getObj('partie') || [];

    if (initialize) this._createArrayWithSavesValues();
  }

  addHightScore(tableValues) {
    const tableTr = document.createElement('tr');

    const mode = document.createElement('td');
    const result = document.createElement('td');
    const timeToWin = document.createElement('td');

    mode.textContent = tableValues.mode;
    result.textContent = tableValues.result;
    timeToWin.textContent = tableValues.timeToWin;
    tableTr.appendChild(mode);
    tableTr.appendChild(result);
    tableTr.appendChild(timeToWin);
    this._table.appendChild(tableTr);
    this._saveOnLocalStorage(tableValues);
  }

  _createArrayWithSavesValues() {
    this._savesValues.forEach((elem, key) => {
      const tableTr = document.createElement('tr');
      const mode = document.createElement('td');
      const result = document.createElement('td');
      const timeToWin = document.createElement('td');

      mode.textContent = elem.mode;
      result.textContent = elem.result;
      timeToWin.textContent = elem.timeToWin;

      tableTr.appendChild(mode);
      tableTr.appendChild(result);
      tableTr.appendChild(timeToWin);
      this._table.appendChild(tableTr);
    });
  }

  _saveOnLocalStorage(tableValues) {
    console.log(this._savesValues);
    const newStorage = [...this._savesValues, tableValues];
    setObj('partie', newStorage);
  }
}
