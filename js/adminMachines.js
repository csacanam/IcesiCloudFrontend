$(document).ready(function(){

//Crear Máquina

	$('#loginform').on('submit', function(e){
		e.preventDefault();		
		var sistemaOperativo = $( "#nombreSO option:selected" ).text();
		var nombreMaquina = $("#nombreMaquina").val();

		$.ajax({
			type: "POST",
			url: "http://192.168.130.73:8080/create-machine",
			data: {
				nombreSO: sistemaOperativo,
				nombreMaquina: nombreMaquina,
				username: $.session.get('username') 
			},
			success: function(data)
			{
				if( data === true)
				{
					
					alert("La Máquina fue creada.");
			
				}
				else
				{
					alert("La Máquina no pudo ser creada.");
				}
			}
		});	
	});
		
	function listarSO()
	{
		//Listar Sistema Operativo
		var root = 'http://192.168.130.73:8080';

		$.ajax({
		  url: root + '/list-so' ,
		  method: 'GET'
		}).then(function(data) {


		  for (var i=0; i<data.length;i++)
		  {			  
			var sistemaOperativo = data[i];
			$('#nombreSO').append('<option value="'+sistemaOperativo["nombre"]+'">'+sistemaOperativo["nombre"]+'</option>');	
			console.log(sistemaOperativo["nombre"]);	  
		  }
		});	
	}
	listarSO();
	 	
	
});


