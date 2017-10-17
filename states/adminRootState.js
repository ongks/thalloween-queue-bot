import State from './state';
import RegisterState from './registerState'
import DeregisterState from './deregisterState'

export default class AdminRootState extends State {
  constructor(id, dataInstance) {
    super();
    this.dataInstance = dataInstance;
    this.nextStates = {
      // 'Register': () => new RegisterState(id, dataInstance),
      // 'Cancel Registration': () => new DeregisterState(id, dataInstance),
      'Pop Queue': () => dataInstance.popQueue()
    };
  }

  makeButtons() {
    return Object.keys(this.nextStates)
      .map(commandString => [commandString]);
  }

  process(msg) {
    const selectedOption = Object.keys(this.nextStates).indexOf(msg.text);
    if (selectedOption === -1) {
      return this.render();
    }
    // } else if (selectedOption === 2) {
    return (this.nextStates[msg.text])();
    // } else {
    //   return { transition: (this.nextStates[msg.text])() };
    // }
  }
}