function loadUsuarios(){
		var root = 'http://192.168.130.15:8080';

	$.ajax({
	  url: root + '/list-users?usernameLogged=' + $.session.get('username'),
	  method: 'GET'
	}).then(function(data) {

	  var tabla = document.getElementById("usersTable");

	  for (var i=0; i<data.length;i++)
	  {
	  	var usuario = data[i];

	  	var tr = tabla.insertRow();        //insertar una fila en la tabla.

	  	var tdUsername = tr.insertCell();			//insertar columna username.
	  	tdUsername.className="text-center";
	  	tdUsername.appendChild(document.createTextNode(usuario["username"]));
	  	
	  	
	  	var tdUser = tr.insertCell();			//insertar columna usuario.
	  	tdUser.className="text-center";
	  	tdUser.appendChild(document.createTextNode(usuario["nombre"]));


	  	var tdDelete = tr.insertCell();			//insertar columna eliminar.
	  	tdDelete.className="text-center";
	  	
	  	var btn = document.createElement("BUTTON");
    	var t = document.createTextNode("Eliminar");
    	btn.setAttribute("class", "deleteBtn");
    	btn.appendChild(t);


	  	tdDelete.appendChild(document.body.appendChild(btn)); //se crea el botón eliminar


 }

	});

}

function deleteRow(r) {
	var i = r.parentNode.parentNode.rowIndex;
    usuarioEliminado=document.getElementById("usersTable").rows[i].cells[0].innerHTML;
    tabla=document.getElementById("usersTable").deleteRow(i);
    eliminarUsuario(usuarioEliminado);
 }

$(document).ready(function(){
	$('body').delegate('.deleteBtn','click',function () {
		deleteRow(this);
	})
})

function eliminarUsuario(usuarioE){					//eliminar usuario.
	var root = 'http://192.168.130.15:8080';
	var customUrl = root + '/delete-user';

	$.ajax({
	type: "POST",
	url: customUrl,
	data: {
		usernameLogged: $.session.get('username'),
		usernameToDelete: usuarioE
	},
	success: function(data)
	{
		if( data === true)
		{
			alert("El usuario fue eliminado.")

		}
		else
		{
			alert("El usuario no pudo ser eliminado.")
		}
	}
});
	
	
}
