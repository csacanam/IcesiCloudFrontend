function selectMachines(){
   
	var root = 'http://192.168.130.76:8080';

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
	$("body").delegate("#reanudarMachines", "click", function(){
		reanudar();
	});
	
});

function reanudar(){	
	var root = 'http://192.168.130.76:8080';

	$.ajax({
	  url: root + '/resume-vm?userLogged =' + $.session.get('username') + '&nombreMaquina='+ encodeURIComponent($( "#selectMachine option:selected" ).text().trim()),
	  method: 'POST'
	}).then(function(data) {

	if(data===true)
	{
		alert("La máquina fue reanudada.")
	}
	else
	{
		alert("No se pudo reanudar la máquina.")
	}  
	  
	});
	
	
}



