
class StateMachine {
    constructor(state = {name: "", startState: ""}) {
        this.state = state;
        this.name = this.state.name;
        this.startState = state.startState;
        // this.spriteX = this.getState(this.name, this.startState).spriteX;
        // this.spriteY = this.getState(this.name, this.startState).spriteY;
        // this.sheetwidth = this.getState(this.name, this.startState).sheetWidth;
        // this.frames = this.getState(this.name, this.startState).frames;
        this.getState(state.name, state.startState);
    }


    getState(name, desiredState) {

        switch (name) {
            case 'frog':
                this.state = this.stateFrog(desiredState);
                break;
            case 'beardGuy':
                this.state = this.stateBeardGuy(desiredState);
                break;
        }
        return this.state;
    }

    stateFrog(stateName) {
       let state;
        switch(name) {

            case "running_right":
                state = {spriteX: 0, spriteY: 0, stateName: stateName, sheetWidth: 4, frames: 4};
                break;

            case "running_left":
                state = {spriteX: 0, spriteY: 32, stateName: stateName, sheetWidth: 4, frames: 4};
                break;
            default:
                state = {spriteX: 0, spriteY: 0, stateName: 'running_right', sheetWidth: 4, frames: 4};
                break;

        }
        return state;
    }


     stateBeardGuy(stateName) {
        let state;
        switch(name) {

            case "running_right":
                state = {spriteX: 0, spriteY: 0, stateName: stateName, sheetWidth: 4, frames: 4};
                break;

            case "running_left":
                state = {spriteX: 0, spriteY: 64, stateName: stateName, sheetWidth: 4, frames: 4};
                break;

            default:
                state = {spriteX: 0, spriteY: 0, stateName: 'running_right', sheetWidth: 4, frames: 4};
                break;
        }
        return state;
    }

}