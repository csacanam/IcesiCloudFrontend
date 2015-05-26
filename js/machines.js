function loadMachines(){
   
	var root = 'http://192.168.130.73:8080';

	$.ajax({
	  url: root + '/list-machines?username=' + $.session.get('username'),
	  method: 'GET'
	}).then(function(data) {

	  var tabla = document.getElementById("machinesTable");

	  for (var i=0; i<data.length;i++)
	  {
	  	var maquina = data[i]["nombre"];

	  	var tr = tabla.insertRow();

	  	var td = tr.insertCell();
	  	td.className="text-center";
	  	td.appendChild(document.createTextNode(maquina));

	  }


	});
}

