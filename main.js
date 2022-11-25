let Notes = {
  tabl1: {
    semestre1: [],
  },
  tabl2: {
    semestre1: [],
  },
  tabl3: {
    mathSemestre1: [],
    mathSemestre2: [],
    mathSemestre3: [],
    anglaisSemestre1: [],
    anglaisSemestre2: [],
    anglaisSemestre3: [],
    anglaisSemestre4: [],
    anglaisSemestre5: [],
  },
  tabl4: {
    cultGSemestre1: [],
    cultGSemestre2: [],
    cultGSemestre3: [],
    cultGSemestre4: [],
    cultGSemestre5: [],
    cultGSemestre6: [],
  },
  tabl5: {
    semestre1: [],
  },
};
//Loop for index
for (var i = 1; i <= 5; i++) {
  getButton(i);
}
//Deletes the tab when semestre is changed.
function deleteTabl() {
  let selector = document.querySelectorAll(".dropdown1");
  for (const iterator of selector) {
    iterator.addEventListener("change", function (e) {
      let index = e.target.id.split("-")[1];
      let tabl = document.getElementById("tabl" + index);
      let row = tabl.rows.length;
      for (var i = 1; i <= row; i++) {
        tabl.deleteRow(0);
      }
    });
  }
}
deleteTabl();
//adds row columns and innerHTML.
function addRow(index, tablo, grade, descri) {
  if (index == 3 || index === 4) {
    let row = tablo.insertRow(0);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = grade;
  } else {
    let row = tablo.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = grade;
    cell2.innerHTML = descri;
  }
}
//Get and push grade in the right table.
function getButton(index) {
  document.getElementById("addButton-" + index).addEventListener("click", function () {
      let grade = parseFloat(
        document.getElementById("noteInput-" + index).value
      );
      if (grade > 6) {
        alert("Votre note n'est pas valable.");
        return 0;
      }
      if (!isNaN(grade)) {
        if (index == 3 || index === 4) {
          let sems = document.getElementById("dropdown-" + index).value;
          let tablo = document.getElementById("tabl" + index);
          Notes["tabl" + index][sems].push(grade);
          console.log(Notes["tabl" + index][sems]);
          addRow(index, tablo, grade);
        } else {
          let descri = document.getElementById("descri-" + index).value;
          let tablo = document.getElementById("tabl" + index);
          Notes["tabl" + index].semestre1.push(grade);
          addRow(index, tablo, grade, descri);
        }
      } else {
        alert("Votre note n'est pas valable.");
      }
    });
}
// });
// }
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
// s.push(Object.keys(Notes.tabl + index))
// console.log(Object.keys(Notes.tabl + index));
/* <div id="testBN"></div>;

function updateViewFromDatas(data) {
  for (const [key, value] of Object.entries(data)) {
    console.log(key);
    console.log(value);}} */
