$(document).ready(function(){

	//Login
	$('#login-form').on('submit', function(e){
		e.preventDefault();		
		var username = $("#username").val();
		var password = $("#password").val();

		$.ajax({
			type: "POST",
			url: "http://192.168.130.73:8080/auth-user",
			data: {
				username: username,
				password: password
			},
			success: function(data)
			{
				if( data === true)
				{
					//Limpiar campos
					$("input[type=text], input[type=password]").val("");
					$("#messagesAuth").html("");	
					//Guardar username en la sesión
					$.session.set('username',username);
					//Cambiar de página
					window.location.replace("adminMachines.html");
				}
				else
				{
					$("#messagesAuth").html("La combinación usuario/contraseña es incorrecta");	
				}
			}
		});
	});

	//Registro
	$('#register-form').on('submit', function(e){
		e.preventDefault();
		if($("#passwordRegister").val() == $("#confirm-password").val())
		{
			$.ajax({
				type: "POST",
				url: "http://192.168.130.73:8080/new-user",
				data: {
					name: $("#name").val(),
					username: $("#usernameRegister").val(),
					password: $("#passwordRegister").val()
				},
				success: function(data)
				{
					if( data === 'true')
					{
						$("input[type=text], input[type=password]").val("");
						$("#messagesAuth").html("");	
					}
					else
					{
						$("#messagesAuth").html("El usuario no pudo ser creado");	
					}
				}
			});
		}
		else
		{
			$("#messagesAuth").html("Las contraseñas no coinciden");				
		}		
	});

});

