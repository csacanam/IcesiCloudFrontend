function loadMachines(){
		var root = 'http://192.168.130.73:8080';

	$.ajax({
	  url: root + '/list-machines?userLogged=' + $.session.get('username'),
	  method: 'GET'
	}).then(function(data) {

	  var tabla = document.getElementById("machinesTable");

	  for (var i=0; i<data.length;i++)
	  {
	  	var machine = data[i];

	  	var tr = tabla.insertRow();        //insertar una fila en la tabla.

	  	var tdMachineName.insertCell();			//insertar columna username.
	  	tdMachineName.className="text-center";
	  	tdMachineName.appendChild(document.createTextNode(machine["username"]));
	  	
	  	
	  	var tdRunMachine= tr.insertCell();			//insertar columna eliminar.
	  	tdRunMachined.className="text-center";
	  	
	  	var btn = document.createElement("BUTTON");
    	var t = document.createTextNode("Correr");
    	btn.setAttribute("class", "runBtn");
    	btn.appendChild(t);


	  	tdRunMachine.appendChild(document.body.appendChild(btn)); //se crea el botón eliminar


 }

	});

}

$(document).ready(function(){
	$('body').delegate('.runBtn','click',function () {
		var i = r.parentNode.parentNode.rowIndex;
   		runMyMachine=document.getElementById("machinesTable").rows[i].cells[0].innerHTML; //nombre de la maquina que se correra
		runMachine(runMyMachine);
	})
})

function runMachine(maquina){					//correr maquina.
	var root = 'http://192.168.130.73:8080';
	var customUrl = root + '/run-vm';

	$.ajax({
	type: "POST",
	url: customUrl,
	data: {
		nombreMaquina: maquina,
		userLogged: $.session.get('username');
		
	},
	success: function(data)
	{
		if( data === true)
		{
			alert("La maquina esta corriendo")

		}
		else
		{
			alert("La maquina no esta corriendo")
		}
	}
});
	
	
}