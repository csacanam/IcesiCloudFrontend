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


