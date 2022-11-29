let Notes = {
  tabl1: {
    semestre1: [0,],
    mod1: [],
  },
  tabl2: {
    semestre1: [0,],
    mod1: [],
  },
  tabl3: {
    mathSemestre1: [0,],
    mathSemestre2: [0,],
    mathSemestre3: [0,],
    anglaisSemestre1: [0,],
    anglaisSemestre2: [0,],
    anglaisSemestre3: [0,],
    anglaisSemestre4: [0,],
    anglaisSemestre5: [0,],
  },
  tabl4: {
    cultGSemestre1: [0,],
    cultGSemestre2: [0,],
    cultGSemestre3: [0,],
    cultGSemestre4: [0,],
    cultGSemestre5: [0,],
    cultGSemestre6: [0,],
  },
  tabl5: {   
    semestre1: [0,],
    mod1: [],
  },
};
//Loop for index
for (var i = 1; i <= 5; i++) {
  getButton(i);
}
//Function that calculates the average grade and displays it.
function average(index, semestre) {
  let sum = 0;
  let rightNote = Notes["tabl" + index][semestre];
  Notes["tabl" + index][semestre].splice(0, 1, null)
  for (const value of rightNote) {
    sum += value
  }
//Display average
   if (sum > 0){
    let finMoyIndic = Notes["tabl" + index][semestre].length-1;
    document.getElementById("maMoyenne" + index).innerHTML = "Ma moyenne: " + (sum / finMoyIndic).toFixed(1);
    Notes["tabl" + index][semestre].splice(0, 1, (sum / finMoyIndic).toFixed(1));
   }
 }
//document.getElementById("cfc").innerHTML = "" + 

//Deletes the table and adds stored notes when semestre is changed.
function deleteTabl() {
  let selector = document.querySelectorAll(".dropdown1");
  for (const iterator of selector) {
    iterator.addEventListener("change", function (e) {
      let index = e.target.id.split("-")[1];
      let tabl = document.getElementById("tabl" + index);
      let rowLength = tabl.rows.length;
      for (var i = 1; i <= rowLength; i++) {
        tabl.deleteRow(0);
      }
//Adds the stored notes in table
      let semestre = e.target.value;
      let rightNote = Notes["tabl" + index][semestre];
          for (const grade of rightNote) {
            let row = tabl.insertRow(0);
            let cell1 = row.insertCell(0);
            cell1.innerHTML = grade;
          }
//average is stored in the same table this line displays not this line
      tabl.deleteRow(tabl.rows.length-1);
      average(index, semestre)
    });
  }
}
deleteTabl();
//adds row, columns and innerHTML.
function addRow(index, tablo, grade, descri) {
  if (index == 3 || index === 4) {
    let row = tablo.insertRow(0);
    let cell1 = row.insertCell(0);
    cell1.innerHTML = grade;
  }else {
    let row = tablo.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.style.width = "100px";
    cell2.style.width = "100px";
    cell1.innerHTML = grade;
    cell2.innerHTML = descri;
  }
}
//Get and push grade in the right table.
function getButton(index) {
  document.getElementById("addButton-" + index).addEventListener("click", function () {
      let grade = parseFloat(document.getElementById("noteInput-" + index).value);
      if (grade > 6) {
        alert("Votre note n'est pas valable.");
        return 0;
      }if (!isNaN(grade)) {
        if (index == 3 || index === 4) {
          let sems = document.getElementById("dropdown-" + index).value;
          let tablo = document.getElementById("tabl" + index);
          Notes["tabl" + index][sems].push(grade);
          addRow(index, tablo, grade);
          average(index, sems)
        } else {
          let descri = document.getElementById("descri-" + index).value;
          let tablo = document.getElementById("tabl" + index);
          Notes["tabl" + index].semestre1.push(grade);
          Notes["tabl" + index].mod1.push(descri);
          addRow(index, tablo, grade, descri);
          let param = "semestre1"
          average(index, param)
        }
      } else {
        alert("Votre note n'est pas valable.");
      }
    });
}