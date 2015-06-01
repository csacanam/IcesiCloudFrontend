function loadMachines(){
   
	var root = 'http://192.168.130.76:8080';

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

	  	var tdRunMachine= tr.insertCell();			//insertar columna correr.
	  	tdRunMachine.className="text-center";
	  	
	  	var btn = document.createElement("BUTTON");
    	var t = document.createTextNode("Correr");
    	btn.setAttribute("class", "runBtn");
    	btn.appendChild(t);
	  	tdRunMachine.appendChild(document.body.appendChild(btn)); //se inserta el botón Correr Maquina.

	  	//agregar select
	  	var tdApp=tr.insertCell();
	  	tdApp.className="text-center";
	  	var sel=document.createElement("select");
	  	sel.setAttribute("id", maquina);
	  	selectMachines(maquina);
	  	tdApp.appendChild(document.body.appendChild(sel));

	  	//agreagar boton para agregar app
	  	var tdAddApp= tr.insertCell();			//insertar columna correr.
	  	tdAddApp.className="text-center";
	  	var btnA = document.createElement("BUTTON");
    	var a = document.createTextNode("Agregar Aplicación");
    	btnA.setAttribute("class", "runBtnA");
    	btnA.appendChild(a);
	  	tdAddApp.appendChild(document.body.appendChild(btnA)); //se inserta el botón Correr Maquina.

	  	//Agregar botón destruir máquina
	  	var tdDestroyMaquina=tr.insertCell();
	  	tdDestroyMaquina.className="text-center";
	  	var btnDestroy=document.createElement("BUTTON");
	  	var d=document.createTextNode("Destruir Máquina");
	  	btnDestroy.setAttribute("class","runBtnD");		//cambiar atributos de los botones que se agregaran a runBtnD
	  	btnDestroy.appendChild(d);
	  	tdDestroyMaquina.appendChild(document.body.appendChild(btnDestroy));	//se inserta el botn a la tabla

	  }


	});
}
//Se asigna funcionalidad al botón btn.
$(document).ready(function(){
	$('body').delegate('.runBtn','click',function () {
		var i = this.parentNode.parentNode.rowIndex;
   		runMyMachine=document.getElementById("machinesTable").rows[i].cells[0].innerHTML; //nombre de la maquina que se correra
		runMachine(runMyMachine);
	})

	$('body').delegate('.runBtnA','click',function () {
		var i = this.parentNode.parentNode.rowIndex;
   		miMaquina=document.getElementById("machinesTable").rows[i].cells[0].innerHTML; //nombre de la maquina que se correra
   		//miApp=document.getElementById("machinesTable").rows[i].cells[2].innerHTML;
   		miApp = $("#" +miMaquina + " option:selected").text().trim();
		agregarApp(miMaquina,miApp);
	})

	$('body').delegate('.runBtnD','click',function () {
		var i = this.parentNode.parentNode.rowIndex;
   		miMaquina=document.getElementById("machinesTable").rows[i].cells[0].innerHTML; //nombre de la maquina que se correra
		destruirMaquina(miMaquina);
	})





})

//Se ejecuta una máquina.
function runMachine(maquina){					//correr maquina.
	var root = 'http://192.168.130.76:8080';
	var customUrl = root + '/run-vm';

	$.ajax({
	type: "POST",
	url: customUrl,
	data: {
		nombreMaquina: maquina,
		userLogged : $.session.get('username')
		
	},
	success: function(data)
	{
		if( data === true)
		{
			alert("La maquina esta corriendo");

		}
		else
		{
			alert("La maquina no esta corriendo");
		}
	}
});
	

}

//funcion que lista las maquinas en un componente select	
function selectMachines(idElemento){
   
	var root = 'http://192.168.130.76:8080';
	var app=""

	$.ajax({
	  url: root + '/list-apps-all',
	  method: 'GET'
	}).then(function(data) {


	  for (var i=0; i<data.length;i++)
	  {
		  
		app = data[i];
		$("#"+idElemento).append('<option value="'+app["nombre"]+'">'+app["nombre"]+'</option>');	
	  }
	  
	  
	});

}
//funcion que permite agregar apps a una máquina.
function agregarApp(maquina,aplicacion){
	var root = 'http://192.168.130.76:8080';
	var customUrl = root + '/associate-app';

	$.ajax({
	type: "POST",
	url: customUrl,
	data: {
		username: $.session.get('username'),
		nombreMaquina: maquina,
		nombreApp: aplicacion
		
	},
	success: function(data)
	{
		if( data === true)
		{
			alert("La aplicacion ha sido asociada a la máquina");

		}
		else
		{
			alert("No se pudo procesar la solicitud");
		}
	}
});
}	

//funcion para destruir maquina
function destruirMaquina(destrMaquina){
	var root='http://192.168.130.76:8080';
	var customUrl = root + '/destroy-vm';

	$.ajax({
		type: 'POST',
		url:customUrl,
		data:{
			userLogged: $.session.get('username'),
			nombreMaquina:destrMaquina 
		},

	success: function(data)
	{
		if( data === true)
		{
			alert("La aplicacion ha sido asociada a la máquina");

		}
		else
		{
			alert("No se pudo procesar la solicitud");
		}
	}	
});
}



