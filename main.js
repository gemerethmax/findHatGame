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

    runGame() {
        let playing = true;
        while (playing) {
            this.print();
            this.askQuestion();
            if (!this.isInBounds()) {
                console.log("Out of bounds! Game over.");
                playing = false;
                break;
            } else if (this.isHat()) {
                console.log("Congratulations! You found your hat!");
                playing = false;
                break;
            } else if (this.isHole()) {
                console.log("You fell into a hole! Game over.");
                playing = false;
                break;
            } 
        
            this.field[this.locationY][this.locationX] = pathCharacter;
            
        }
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

    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for(let y=0; y <height; y++) {
            for(let x=0; x < width; x++) {
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

    const hatLocation = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height)
    }

    while (hatLocation.x === 0 && hatLocation.y === 0) {
        hatLocation.x = Math.floor(Math.random() * width);
        hatLocation.y = Math.floor(Math.random() * height);
    }

    field[hatLocation.y][hatLocation.x] = hat;
    return field;

    }
}

const myField = new Field(Field.generateField(10, 10, 0.2));
myField.runGame();
// To run the game, execute this file using Node.js