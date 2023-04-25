

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

        sudoku = obj.unsolved;

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
 