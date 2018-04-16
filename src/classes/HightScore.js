export default class HightScore {
  constructor() {
    this._table = document.getElementById('table');
    this._valuesToSave = [];
    const partie = localStorage.getItem('partie');

    console.log(partie);
  }

  updateHightScore(tableValues) {
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
    //console.log(localStorage);
    this._saveOnLocalStorage(tableValues);
  }

  /*_saveOnLocalStorage(tableValues) {
    const valueToSaveJSON = localStorage.getItem('partie');

    const valuesToSave = JSON.parse(valueToSaveJSON);

    this._valuesToSave.push(valuesToSave);
    localStorage.setItem('partie', JSON.stringify(this._valuesToSave));
  }*/
}
