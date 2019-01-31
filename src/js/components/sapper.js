export default class Sapper {
  constructor({ element }) {
    this.element = element;
    this.rows = 6;
    this.columns = 6;
    this.cells = [];

    this.createCells();    
    this.addEvents();
    this.generateBomb();
    this.createBomb();
    this.render();
  }
  render() {
    let cells = this.cells
      .map(e => {
        return e
          .map(j => {
            if(j.isBomb === true) {
              return `<div class="test" data-id="${j.id}" data-columns="${j.columns}"></div>`;
            } else {
              return `<div class="test" data-id="${j.id}" data-columns="${j.columns}">${j.isHide === true ? '' : j.text}</div>`;
            }
          })
          .join("");
      })
      .join("");

    this.element.innerHTML = cells;
  }
  createCells() {
    for (let i = 0; i < this.columns; i++) {
      let tempArr = [];
      for (let j = 0; j < this.rows; j++) {
        let cell = {
          columns: i,
          id: j,
          isBomb: false,
          text: 0,
          isHide: false,
        };
        tempArr.push(cell);
      }
      this.cells.push(tempArr);
    }
  }
  addEvents() {
    this.element.addEventListener('click', (e) => {
      if(e.target.closest('.test')) {
        let id = +e.target.dataset.id;
        let columns = +e.target.dataset.columns;

        if(this.cells[columns][id].text >= 1) {
          this.cells[columns][id].isHide = false;
        }
        if(this.cells[columns][id].text === 0) {
          console.log(0);
        }
        this.render();
      }  
    });
  }
  generateBomb() {
    for(let i = 0; i < 3; i++) {
      let idBombs = Math.floor(Math.random() * 5);
      let columnsBombs = Math.floor(Math.random() * 5);

      this.cells[columnsBombs][idBombs].isBomb = true;
    }
  }
  createBomb() {
    let id = [];
    let columns = [];
    this.cells.map(e => {
      e.find(j => {
        if(j.isBomb === true) {
          id.push(j.id);
          columns.push(j.columns);
        }
      })
    })

    for(let j = 0; j < id.length; j++) {
      
      let arr = [-1,0,1];
      for(let i = 0; i < arr.length; i++) {
        if(this.cells[columns[j] + 1]) { 
          if(this.cells[columns[j] + 1][id[j] + arr[i]]) {
            this.cells[columns[j] + 1][id[j] + arr[i]].text++
          }
        }
        if(this.cells[columns[j]]) { 
          if(this.cells[columns[j]][id[j] + arr[i]]) {
            this.cells[columns[j]][id[j] + arr[i]].text++
          }
        }
        if(this.cells[columns[j] - 1]) { 
          if(this.cells[columns[j] - 1][id[j] + arr[i]]) {
            this.cells[columns[j] - 1][id[j] + arr[i]].text++
          }
        }
      }
    }

    this.render()
  }
}
