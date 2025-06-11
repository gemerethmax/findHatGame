const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field = [[]]) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0
        this.field[0][0] = pathCharacter;
    }

    askQuestion() {
        const answer = prompt("Which way? (u, d, l, r): ").toLowerCase();
        switch (answer) {
            case 'u':
                this.locationY -= 1;
                break;
            case 'd':
                this.locationY += 1;
                break;
            case 'l':
                this.locationX -= 1;
                break;
            case 'r':
                this.locationX += 1;
                break;
            default:
                console.log("Invalid input. Please enter 'u', 'd', 'l', or 'r'.");
                this.askQuestion();
                break;
        }
    }     

    // isInBounds is just returning a Boolean value indicating if the current location is within the bounds of the field
    isInBounds() {
        return (
            this.locationY >= 0 && this.locationX >=0 && this.locationY < this.field.length && this.locationX < this.field[0].length
        )

    }

    // isHat checks if the current location contains a hat
    isHat() {
        return this.field[this.locationY][this.locationX] === hat;  
    }

    // isHole checks if the current location contains a hole
    isHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    print() {
        const displayString = this.field.map(row =>{
             return row.join('')
         }).join('\n');
         console.log(displayString);
    }
}