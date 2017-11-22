function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      cb('error' + xhr.responseType);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function updateDom(err, data) {
  if (err) {
    console.log(err);
  } else {
    var users = JSON.parse(data);
    var table = document.getElementById('users-table');
    users.forEach(function(user) {
      var row = document.createElement('tr');
      var name = document.createElement('td');
      name.innerHTML = user.name;
      row.appendChild(name);
      var location = document.createElement('td');
      location.innerHTML = user.location;
      row.appendChild(location);
      table.appendChild(row);
    });
  }
}

request('/users', updateDom);
