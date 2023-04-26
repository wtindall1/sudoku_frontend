

//handler function for number input
function clickOnCell() {

    //unselect the last selected square
    squares.forEach(square => {
        square.classList.remove('selected');
    });

    //select clicked square
    this.classList.add("selected");

}

function enterNumber(e) {


    //get the selected square
    squares.forEach(square => {

        if (square.classList.contains("selected")  && !square.classList.contains("clue")) {
            
            //handle number keys
            if ([49, 50, 51, 52, 53, 54, 55, 56, 57].includes(e.keyCode)) {
                square.textContent = e.key;
            } else if (e.keyCode === 46) {
                square.textContent = null;
            }
        } 
    })

}



//returns promise 
async function getSudoku() {
    
    //call backend
    response = await fetch(url)
    
    return response.json()


}

function populateGrid() {
    
    let sudoku = ''
    
    getSudoku().then(obj => {

        console.log(obj)

        sudoku = obj.startingSudoku;

        squaresList = Array.from(squares);
        squaresList.map((square, index) => {
            
            //sets 0 to blank
            square.textContent = sudoku[index] === '0' ? null : sudoku[index];

            //add clue class to all starting clues (so they can't be edited and look different)
            if (square.textContent > 0) {
                square.classList.add('clue');
            }})
        
    })


}


function checkAnswer() {

    let valid = true;
    let full = true;

    //check columns for dupes
    //loop through the start of each column
    for (let i=0; i < squares.length; i+=9) {

        const column = [];

        for (let n=i; n < (i+9); n++) {

            column.push(squares[n].textContent);
        }

        //check dupes in column
        values = column.filter(value => value !== "")
        if (new Set(values).size !== values.length) {
            valid = false;
        }

    }

    //check columns for dupes
    //loop through start of each column
    for (let i=0; i < 9; i++) {

        
        const column = []
        
        //loop through each column
        for (let n=i; n < squares.length; n+=9) {

            column.push(squares[n].textContent);
        }

        //check dupes in column 
        values = column.filter(value => value !== "") //exclude empty
        if (new Set(values).size !== values.length) {
            valid = false;
        }
    }


    //check 3x3 cells for dupes
    //loop through start of each cell
    cellStarts = [0,3,6,27,30,33,54,57,60]
    cellStarts.forEach(i => {

        cell = []

        //loop through start of each row within cell
        for (let j=i; j < (i + 19); j+=9 ) {

            //loop through each row within the cell
            for (let n=j; n < (j+3); n++) {

                cell.push(squares[n].textContent);

            }
        }
        
        //check dupes in 3x3 cell 
        values = cell.filter(value => value !== "") //exclude empty
        if (new Set(values).size !== values.length) {
            valid = false;
        }

    })
            



    //check if the board is full
    squares.forEach(square => {
        if (square.textContent == "") {
            full = false;
        }
    });

    console.log(valid, full);

    //trigger correct or incorrect response function
    if (valid && full) {
        correct();
    } else if (!full) {
        incomplete();
    } else if (!valid){
        invalid();
    };

}

function correct() {

    //give board a green glow
    //pop up with congrats & play again button
        //if pressed, repopulates grid and gets rid of green glow

}

function incomplete() {

    //add colour (green?) to empty cells for 1-2s
}

function invalid() {

    //edit checkAnswer function to store the duplicate locations
    //make invalid cells red for 1-2s
}



//backend url
const url = 'http://localhost:5147/api/sudoku'

//nodelist of all squares on grid
const squares = document.querySelectorAll('.square');

//populate grid on load
window.addEventListener("load", populateGrid)

//event listener for cell selection
squares.forEach(square => {
    square.addEventListener("click", clickOnCell);
})

//event listener for number input
window.addEventListener("keydown", enterNumber);

//event listener for submit
const submitButton = document.querySelector('.check_answer');
submitButton.addEventListener("click", checkAnswer);


 