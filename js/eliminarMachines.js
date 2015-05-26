function selectMachines(){
   
	var root = 'http://192.168.130.73:8080';

	$.ajax({
	  url: root + '/list-machines?username=' + $.session.get('username'),
	  method: 'GET'
	}).then(function(data) {


	  for (var i=0; i<data.length;i++)
	  {
		  
		var maquina = data[i];
		$('#selectMachine').append('<option value="'+maquina["nombre"]+'">'+maquina["nombre"]+'</option>');		  
	  }
	  
	});
}

$(document).ready(function(){
	$("body").delegate("#eliminarMachines", "click", function(){
		eliminar();
	});
	
});

function eliminar(){	
	var root = 'http://192.168.130.73:8080';

	$.ajax({
	  url: root + '/delete-vm?usernameLogged =' + $.session.get('username') + '&nombreMaquina='+ $( "#selectMachine option:selected" ).text() ,
	  method: 'GET'
	}).then(function(data) {

	if(data===true)
	{
		alert("La máquina fue eliminada.")
	}
	else
	{
		alert("No se pudo eliminar la máquina.")
	}  
	  
	});
	
	
}
