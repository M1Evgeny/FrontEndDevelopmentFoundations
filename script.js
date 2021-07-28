(function run() {
  function createTable() {
    let tableBody = '';
    for (let i = 0; i < 100; i += 1) {
      tableBody += '<tr>';
      for (let e = 0; e < 100; e += 1) {
        if (e === 0 && i === 0) {
          tableBody += `<td ondrop="drop(event)" ondragover="allowDrop(event)"><img id="refImage" src="http://media.idownloadblog.com/wp-content/uploads/2014/11/Google-Maps-4.0-for-iOS-app-icon-small.png" draggable="true"
            ondragstart="drag(event)"></img>${i}_${e}</td>`;
        }
        tableBody += `<td ondrop="drop(event)" ondragover="allowDrop(event)">${i}_${e}</td>`;
      }
      tableBody += '</tr>';
    }
    const table = document.getElementById('table');
    table.innerHTML = tableBody;
  }

  function eventListener(e) {
    const { target } = e;
    if (target.tagName === 'TD') {
      console.log(e.target);
    }
  }

  createTable();

  console.time('ownEventListener');
  document.querySelectorAll('td').forEach((el) => el.addEventListener('click', eventListener, false));
  console.timeEnd('ownEventListener');

  console.time('eventDelegation');
  document.getElementById('table').addEventListener('click', eventListener, false);
  console.timeEnd('eventDelegation');
}());

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('dropItem', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('dropItem');
  ev.target.appendChild(document.getElementById(data));
}
