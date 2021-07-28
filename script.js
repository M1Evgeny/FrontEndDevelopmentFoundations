(function run() {
  function createTable() {
    let tableBody = '';
    for (let i = 0; i < 100; i += 1) {
      tableBody += '<tr>';
      for (let e = 0; e < 100; e += 1) {
        tableBody += `<td>${i}_${e}</td>`;
      }
      tableBody += '</tr>';
    }
    const table = document.getElementById('table');
    table.innerHTML = tableBody;
  }

  function addEventListener(e) {
    const { target } = e;
    if (target.tagName === 'TD') {
      console.log(e.target);
    }
  }

  createTable();

  console.time('ownEventListener');
  document.querySelectorAll('td').forEach((el) => el.addEventListener('click', addEventListener, false));
  console.timeEnd('ownEventListener');

  console.time('eventDelegation');
  document.getElementById('table').addEventListener('click', addEventListener, false);
  console.timeEnd('eventDelegation');
}());
