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

//Agregar Nodo

	$('#loginform').on('submit', function(e){
		e.preventDefault();		
		var nombreNodoadd = $("#nombreNodoadd").val();
		var ipPrivada = $("#ipPrivada").val();
		var ipPublica = $("#ipPublica").val();
		var mascaraRed = $("#mascaraRed").val();
		var cantidadMemoria = $("#cantidadMemoria").val();
		var cantidadCPU = $("#cantidadCPU").val();
		var interfazPuente = $("#interfazPuente").val();
		var parametrosJSON = $("#parametrosJSON").val();
		var nombreMaquina =  $( "#selectMachine option:selected" ).text().trim();

		$.ajax({
			type: "POST",
			url: "http://192.168.130.73:8080/add-node",
			data: {
				nombreNodo: nombreNodoadd,
				ipPrivada: ipPrivada,
				ipPublica: ipPublica,
				mascaraRed: mascaraRed,
				cantidadMemoria: cantidadMemoria,
				cantidadCPU: cantidadCPU,
				interfazPuente: interfazPuente,
				parametrosJSON: parametrosJSON,
				nombreMaquina: nombreMaquina,
				userLogged: $.session.get('username') 
			},
			success: function(data)
			{
				if( data === true)
				{
					
					alert("El nodo fue agregado.");
			
				}
				else
				{
					alert("El nodo no pudo ser agregado.");
				}
			}
		});	
	});


});