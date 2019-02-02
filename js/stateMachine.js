class StateMachine {

    constructor() {
        this.stateMap = new Map();
    }

    getState() {
        return this.state;
    }

    addState(stateName, stateAnimation) {
        this.stateMap.set(stateName, stateAnimation);

    }

    setState(stateAnimation){
        this.state = this.stateMap.get(stateAnimation);
    }

    draw(clockTick, ctx, x, y) {
        this.state.drawFrame(clockTick, ctx, x, y);
    }

}