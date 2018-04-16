import HightScore from './HightScore';

import mode from '../config/map';
import Launcher from './Launcher';

export default class App {
  constructor() {
    this.launcher = new Launcher(new HightScore(true));
  }
}
