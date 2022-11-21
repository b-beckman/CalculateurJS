let Objects = {
  tabl1: {
    semestre1: [],
  },
  tabl2: {
    semestre1: [],
  },
  tabl3: {
    maths: {
      semestre1: [],
      semestre2: [],
      semestre3: [],
    },
      anglais: {
        semestre1: [],
        semestre2: [],
        semestre3: [],
        semestre4: [],
        semestre5: [],
      },      
      }, 
      tabl4: {
      semestre1: [],
      semestre2: [],
      semestre3: [],
      semestre4: [],
    },
    tabl5:{
      semestre1: [],
    }
}

let inputs
let grade
let tablo
for (var i = 1; i <= 5; i++) {
  getButton(i);
}

function getButton(index) {
  inputs = document.getElementById("addButton-" + index);
  inputs.addEventListener("click", function () {
    tablo = document.getElementById("tablo-" + index);
    grade = parseFloat(document.getElementById("noteInput-" + index).value);
    console.log(tablo);
    if(!isNaN(grade)){
    console.log("jai click" + " " + index);
    var row = tablo.insertRow(0)
    console.log(row);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = grade;
    cell2.innerHTML = grade;
    }else{
    alert("Votre note n'est pas valable.")  
    }
}); 
}

// function getTablo(index) {
// var table = document.getElementById("tablo" + index);
// var row = table.insertRow([0]);
// getbutton(index, row);
// }
//Bastien 
// const buttons = document.querySelectorAll('.addButton')
// for (const button of buttons) {
//   button.addEventListener('click', (e) => {
//     const inputs = e.currentTarget.parentElement.parentElement.querySelectorAll('input')
//   })}




    // s.push(Object.keys(Objects.tabl + index))
    // console.log(Object.keys(Objects.tabl + index));