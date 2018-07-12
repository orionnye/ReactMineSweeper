import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            display: ".",
            hidden: this.props.hidden,
        }
    }
    render(props){
        if (!this.state.hidden) {
            this.state.display = this.state.value 
        }
        return (
            <button className="square" onClick={() => this.setState({hidden:false})}>
                {this.state.display}
            </button>
        )
    }
}

function upValueIfNotBomb(grid, x, y) {
    if (grid[y][x] !== '💣') {
        grid[y][x] += 1
    }
}

function upValuesAroundBomb(grid, x, y) {
    if (y > 0) {
        //top
        upValueIfNotBomb(grid, x, y - 1)
        //top left corner
        if (x > 0) {
            upValueIfNotBomb(grid, x -1, y -1)
        }
        //top right corner
        if (x < grid[y].length - 1) {
            upValueIfNotBomb(grid, x + 1, y - 1)
        }
    }
    if (y < grid.length - 1) {
        //bottom
        upValueIfNotBomb(grid, x, y + 1)
        //bottom left corner
        if (x > 0) {
            upValueIfNotBomb(grid, x - 1, y + 1)
        }
        //bottom right corner
        if (x < grid[y].length - 1) {
            upValueIfNotBomb(grid, x + 1, y + 1)
        }
    }
    //right
    if (x > 0) {
        upValueIfNotBomb(grid, x - 1, y)
    }
    //left
    if (x < grid[y].length - 1) {
        upValueIfNotBomb(grid, x + 1, y)
    }
}

function countBombsNearby(grid, x, y) {
    let count = 0
    for (let j = -1; j < 1; j++) {
        for (let i = -1; i < 1; i++) {
            if (grid.getValue(i, j) == '💣') {

            }
        }
    }
}

class Grid {
    constructor(width, height, mineTotal = 10){
        this.width = width
        this.height = height
        this.grid = []
        this.mineTotal = mineTotal

        //fill array
        for (let y = 0; y < this.height; y++){
            let row = []
            for (let x = 0; x < this.width; x++){
                row.push(0)
            }
            this.grid.push(row)
        }
        //places mines & assigns warning values
        for (let m = 0; m < this.mineTotal; m++) {
            let y = Math.floor(Math.random() * height)
            let x = Math.floor(Math.random() * width)
            //checks to make sure the page isnt reitterating over previous bomb instances
            if (this.grid[y][x] !== '💣'){
                this.grid[y][x] = '💣'//places bomb
                upValuesAroundBomb(this.grid, x, y)
            }
            // for (let rows = 0; rows < this.grid.length; rows++) {
            //     for (let columns = 0; columns < this.grid[y].length; columns++) {
            //         countBombsNearby(this.grid, columns, rows)
            //     }
            // }
        }
        
    }

    getValue(x, y) {
        if(y => 0 && y < this.grid.length) {
            if (x => 0 && x < this.grid[y].length) {
                return this.grid[y][x]
            } else return("not in grid")
        } else return("not in grid")
    }

    setValue(x, y, newValue) {
        if(this.getValue(x, y) !== "not in grid"){
            this.grid[y][x] = newValue
        }
    }

    render() {
        let displayGrid = []
        for (let y = 0; y < this.grid.length; y++) {
            let row = []
            for (let x = 0; x < this.grid[y].length; x++) {
                row.push(<Square value={this.grid[y][x]} hidden={true}/>)
            }
            row.push(<div className="afterRow"/>)
            displayGrid.push(row)
        }
        return(displayGrid)
    }
}

let model = new Grid(10, 10, 10);

//========================================

ReactDOM.render(model.render(), document.getElementById('root'))