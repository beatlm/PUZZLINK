//prueba

var aliasKo="No tienes establecido un alias en facebook. Accede a facebook.com/username para elegir uno. En caso contrario usaremos tu ID numérico.";
var inicioSesion="Inicia sesi&oacute;n con tu cuenta de Facebook para poder crear puzzles!!";






$(document).ready(function(){ 
	cargaFb(document);
	$(".content2").hide();
	$("#detallePieza").hide();
	$("#newPieza").hide();
	$("#fondo").hide();
	$("#buscar").hide();
	$("#menu0").addClass( "selected" );
	$("#popupAceptar").hide();
	$("#variasPiezas").hide();
	$("#cPuzzles").hide();
	$("#cRegistro").hide();
	$('#popupAlias').hide();
	$("#cGrupos").hide();
	$("#cNewGrupo").hide();
	$("#pie").hide();
	$("#cNewPuzzle").hide();
	$("#cUsuarios").hide();	
	$("#cPiezas").hide();
	$("#fbButton").click(function(){FB.login();});	
	localStorage.clear();
	localStorage.uid="false";
	localStorage.puzzle="false";
});


  /************************** MENU *********************/
  
  //se mostrarÃ¡ el panel correspondiente a la funcion seleccionada
function mostrar(id){
	$(".content2").hide();
	$("#cMain").hide();
	$("#cPuzzles").hide();
	$("#cGrupos").hide();
	$("#cNewGrupo").hide();
	$("#cNewPuzzle").hide();
	$("#pie").hide();
	$("#pieGrupo").hide();
	$("#piePiezas").hide();
	$("#piePuzzles").hide();
	$("#pieNuevoGrupo").hide();
	$("#pieNuevoPuzzle").hide();
	$("#cUsuarios").hide();	
	$("#cPiezas").hide();

	desmarcar();
	
	switch(id){
	case(0)://INICIO
		$("#cMain").show();
		$("#menu0").addClass( "selected" );
		break;
	case(1)://PIEZAS
		$("#cPiezas").show();
		$("#pie").show();
		$("#piePiezas").show();
	 	$("#menu1").addClass( "selected" );
		$("#btnLrft").hide();
		$("#puzzlePieza").hide();
		$("#variable2").text("");
//		puzzleOut();
		showPieces(searchPieces(1));
		break;
	case (2)://PUZZLINKERS		
		$("#menu2").addClass( "selected" );	
		$("#cUsuarios").show();	
		showUsers(getUsers());
		break;
	case(3)://PUZZLES
		$("#cPuzzles").show();
		$("#puzzles").show();
		$("#variable").text("");	
		$("#menu3").addClass( "selected" );
		//puzzleOut();
		showPuzzles( getPuzzlesByUser(true),true,localStorage.name,false);//Se muestran los puzzles del usuario logado
		break;
	case(4)://GRUPOS
		showGrupos(getGroups(),false);
		$("#cGrupos").show();
		$("#pie").show();
		if(localStorage.uid!="false"){
			$("#pieGrupo").show();		
		}
		$("#menu4").addClass( "selected" ); 
		break;
	case(5): //Pantalle de registro
		$("#cRegistro").show("slow"); 
		break;
	case(6)://Pantalla gris
		$("#gris").show("slow");
		break;
	case(7)://Nuevo grupo
		$("#cNewGrupo").show();
		$("#menu4").addClass( "selected" ); 
		$("#pieNuevoGrupo").show();
		$("#pie").show();
		break;
	case(8)://Grupos
		$("#menu3").addClass( "selected" ); 
		showGrupos(getGroups(),true);//Cargamos el combo de grupos
		$("#cNewPuzzle").show();
		$("#pie").show();
		//Se mostrará el botón de nuevo puzzle si el usuario está logado.
	//	alert(localStorage.uid);
		//if(localStorage.uid!="false"){
			$("#pieNuevoPuzzle").show();
		//}
		break;	
	case(9)://Anadir piezas a puzzle
		$("#cPiezas").show();
		$("#pie").show();
		$("#piePiezas").show();
	 	$("#menu1").addClass( "selected" );
		$("#btnLrft").hide();
		$("#puzzlePieza").show();
		$("#btnAddPieza").text("Añadir pieza al puzzle "+localStorage.puzzle);	
	//	addPiecesPuzzle(1);//Buscamos la primera pieza
		showPieces(searchPieces(1));
		break;
	}
}
/* Funcion que desmarca todas las opciones del menu */
function desmarcar(){
	$("#menu0").removeClass( "selected" );
	$("#menu1").removeClass( "selected" );
	$("#menu2").removeClass( "selected" );
	$("#menu3").removeClass( "selected" );
	$("#menu4").removeClass( "selected" ); 	
}

  /************************** PIEZAS *********************/

//Funcion para buscar la pieza siguiente o anterior. (Si next=true se busca la siguiente, en caso contrario la anterior)


//Funcion que muestra una pieza aleatoria de entre las existentes
function showRandom(){	
	var last=getLastPiece();
	var num=Math.floor(Math.random()*last)+1;
	showPieces(searchPieces(num));													
}
 






/*  Funcion que muestra las piezas de un puzzle */
function showPiecesPuzzle(puzzle, grupo, piezas, owner){
	localStorage.grupo=grupo;
	localStorage.owner=owner;
	//alert("showPiecesPuuzle "+piezas.length);
		if(piezas.length==0){//No hay piezas en el puzzle
			$("#txtPuzzles").text("Puzzle "+puzzle);
			$("#variable").text("El puzzle aún no tiene piezas, si eres el dueñ@ puedes añadirlas!");
			$('#puzzles').hide();
			
		}else {
			$('#piezas').show(); 
			$('#cPuzzles').hide();
			$('#cPiezas').show();
			$('#btnLeft').hide();
			$('#btnRight').hide();
			$('#puzzlePieza').hide();
	  		$("#txtIntro").text("Estas son las piezas del puzzle ");
			$("#variable2").text(puzzle +"   -  Grupo '"+grupo+"'");
	  		$("#variasPiezas").show();
			$("#pie").show();
			$('#pieza').hide();
			//Limpiamos las piezas anteriores
			$('#piezas').empty(); 
			for(var i=0;i<piezas.length;i++){
				var texto="<div  class='introTxt'> <p >"+piezas[i].id+"- "+piezas[i].texto +"</p>";
				$('#piezas').append(texto);
			} 
			
		}
		
		if(localStorage.uid!="false"){
			$("#piePuzzles").show();
			$('#pieAnadePiezas').show(); 
		}
		
	 	

}

/*function addPiecesPuzzle(num){
	//alert("addPiecesPuzzle  "+localStorage.puzzle+" grupo "+localStorage.grupo+ " owner "+localStorage.owner);
 showPieces(searchPieces(num));
		$("#cabeceraPuzzle").show();
		$("#cabPuzzle").text("PUZZLE: "+localStorage.puzzle+"	      GRUPO: "+localStorage.grupo);
		$("#puzzlePieza").show();
	
}*/

/* Funcion que pasandole el json con las piezas obtenidas, las muestra por pantalla 
piezas-->Piezas a mostrar
propietary=true-->El usuario es propietario del puzzle por lo que puede añadir piezas*/
function showPieces(piezas){

mostrarCarga();

	//Limpiamos datos
	$("#buscarID").val("");//Se limpia el campo de busqueda por numero
	$("#buscarTerm").val("");//Se limpia el campo de busqueda por palabra

	$("#fondo").hide();
	$("#buscar").hide();
	$('#piezas').empty();
	$("#pieza").hide();
	$("#contentPieza").hide();
	$("#variasPiezas").hide();
	$("#newPieza").hide();	  
	$("#piePuzzles").hide();
	$("#puzzlePieza").hide();
	/*$("#cabeceraPuzzle").hide();*/
		
	desmarcar();
	//Marcamos la opcion piezas
	$("#menu1").addClass( "selected" );
	$("#btnRight").show();
	$("#btnLeft").show();
	$('#cPuzzles').hide();
	$('#cPiezas').show();
		
		
	/*if(piezas.length>0){
		if(piezas[0].id==1){
			$("#btnLeft").hide();//Si es la primera no mostramos flecha izda
		}
		var last= getLastPiece();
		if(Number(last)==Number(piezas[0].id)){
			$("#btnRight").hide();//Si es la ultima no mostramos flecha dcha
		}
	}*/
	

	
	
	if (piezas.length == 0 ){//Sin piezas
		showPopupAceptar("No se han encontrado piezas con esos criterios.");		 
		
	 	piezas=searchPieces(1);
			$("#contentPieza").text(piezas[0].id+"- "+piezas[0].texto);
			$("#pie").show();
			$("#pieza").show();
			$("#contentPieza").show();
		//	$("#btnLeft").hide();
			$("#pieAnadePiezas").show();
			$('#piePiezas').show();  	
	  
	}else if(piezas.length==1){//Unica pieza 
		//alert("3");
	 
        $("#txtIntro").text("Una pieza PuzzLink mínima contiene Sujeto, Verbo y Predicado: tres nexos como mínimo y un máximo de 3.000 caracteres, con espacios incluidos. Como la función 'Buscar' es omnipotente, las piezas no contienen imágenes, pero si es necesario consultar alguna, pueden ser invocadas simultáneamente desde otros sites que la contengan.");
	 
		$('#pie').show();
		$("#contentPieza").text(piezas[0].id+"- "+piezas[0].texto);
		$("#pieza").show();
		$("#contentPieza").show();
		$('#piePiezas').show();
		
		
	}else{//Varias piezas
		  $("#txtIntro").text("Hay varias piezas con ese criterio.");
		  
		  	$("#variasPiezas").show();
			$("#pie").show();
		 
			$("#pieAnadePiezas").show();
		 //Limpiamos las piezas anteriores
		
		for(var i=0;i<piezas.length;i++){
		  	var texto="<div  class='introTxt'> <p >"+piezas[i].id+"- "+piezas[i].texto +"</p>";
	 		$('#piezas').append(texto);
		} 	
	}
	
	//Si hay seleccionado un puzzle, mostramos la cabecera y el boton añadir piezas.
	if(localStorage.puzzle!='false'){
	/*	$("#cabeceraPuzzle").show();
		$("#cabPuzzle").text("PUZZLE: "+localStorage.puzzle+"	      GRUPO: "+localStorage.grupo);*/
		$("#puzzlePieza").show();
		}
	ocultarCarga();
}











//Funcion para busqueda de piezas de un puzzle puzzles
// num-> el numero del puzzle a buscar, name el nombre del puzzle
function searchPuzzlePiece(num,name){	
//desmarcar();
//$("#menu1").addClass( "selected" );

	localStorage.puzzle=name;
	localStorage.puzzleID=num;
	var r=$.ajax({data:{"id":num},
	                url:   'php/getPiezasPuzzle.php', 
					type:"POST",
					async:false}).responseText;
	var result = JSON.parse(r);
	
	return result;										
}

  /************************** POPUPS *********************/
  //Funcion que muestra popups de busqueda
  //num->true  Busqueda por id (numerico)
  //num->false Busqueda por texto
function showPopup(num){
	$("#fondo").show();
	$("#buscar").show();
	if(num){
		$("#textoPopup").text("Introduce el número de la pieza");
		$("#buscarID").show();
		$("#buscarTerm").hide();
	}else{
		$("#textoPopup").text("Introduce el texto a buscar");
		$("#buscarID").hide();
		$("#buscarTerm").show();
	}
}

function closePopup(){
	$("#fondo").hide();
	$("#buscar").hide();
	$("#popupAceptar").hide();
	$("#textoPopup").text("Introduce un valor");
	$("#textoPopup").css('color', 'black');
	$("#buscarTerm").css('border-color', 'black');
	$("#buscarId").css('border-color', 'black');
	 
}

//Funcion que muestra un popup con un mensaje y un boton aceptar pasandole el texto
function showPopupAceptar(texto){
	$("#fondo").show();
	$("#popupAceptar").show();
	$("#txtAceptar").text(texto);
	//document.getElementById("txtAceptar").innerHTML=texto;	
}




 
 /************************** LOGIN FB *********************/
 function  fbAsyncInit ()  {
	 
    FB.init({
      appId      : '442776155842772', // App ID
      channelUrl : '//WWW.puzzlink.hol.es/channel.html', // Channel File
      status     : false, // check login status
      cookie     : false, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });  
  
   // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {
	

    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
  

		localStorage.uid = response.authResponse.userID
		
	  	FB.api('/me', function(response) {

			if(typeof response.username == "undefined"  ){//Si no tiene username definido, utuliazaremos el id para obtener la foto y mostraremos el nombre?? y le avisaremos de poder establecer un username en facebook facebook.com/username.
				localStorage.name = localStorage.uid;
			 
				showPopupAceptar(aliasKo);
			 	////alert("https://graph.facebook.com/"+localStorage.uid+"/picture");
				$("#foto").attr("src","https://graph.facebook.com/"+localStorage.uid+"/picture");
				$("#alias").text( "Bienvenid@ "+localStorage.uid);	
			
				checkUser(); 
			}else{
				 
			 	localStorage.name = response.username;
				$("#foto").attr("src","https://graph.facebook.com/"+response.username+"/picture");
				$("#alias").text("Bienvenid@ "+ response.username);	
				checkUser(); 
			}
	 
		});
		
	/*$("#fbLogin").hide();
	$("#fbLogout").show();
	$("#txtCabLog").hide();
	$("#logData").show();*/
	
	/*$('#login').hide();*/
	$("#login").css('display', 'none');
	$("#logout").css('display', 'inline-flex');
	$("#logout").css('display', 'webkit-inline-flex');
	$("#logout").css('display', 'moz-inline-flex');
	/*$('#logout').show();*/
	
	mostrar(0);//Vamos al inicio
	
    } else if (response.status === 'not_authorized') {
	  	showPopupAceptar("Los datos no son correctos, vuelve a intentarlo");
      	FB.login();
	  	localStorage.clear();
	  	mostrar(0);
	   	$("#txtCabLog").text(inicioSesion);
    } else {

	   $("#txtCabLog").show();
	    mostrar(0);
	   localStorage.clear();
		$("#foto").attr("src","url('img/Transparent.gif')");		
		/*$("#fbLogin").show();
		$("#fbLogout").hide();
		$("#logData").hide();*/
		
		/*$('#login').show();
		$('#logout').hide();*/
		
	$("#logout").css('display', 'none');
	$("#login").css('display', 'inline-flex');
	$("#login").css('display', 'webkit-inline-flex');
	$("#login").css('display', 'moz-inline-flex');
 
    }
  });
  

}

// Funcion que da de alta un  usuario en BBDD, FALTA comprobar si no tiene alias y actualizarlo
function checkUser(){
	////alert("alias "+localStorage.name+" id "+localStorage.uid);
 
  var r=$.ajax({data:{"alias":localStorage.name,
					"id":localStorage.uid}, 
	                url:'php/alias.php', 
					type:"POST", 
					async:false }).responseText;
  }
  
  
 function iniciar(){
	 FB.login();
	//NcheckUser();						 
} 

  // Load the SDK asynchronously
function cargaFb(d){
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/es_ES/all.js";
		ref.parentNode.insertBefore(js, ref);
		 
}
   

 /************************** PUZZLES *********************/
 
 /* Funcion que obtiene todos los puzzles de un usuario */
 function getPuzzlesByUser(id){
//alert("getpuzzlesbyuser "+id);
 if(id==true){//Si uid es true-->Se buscan los del usuario logado	
	var uid=localStorage.uid;
	//alert("logado "+localStorage.uid);
 }else{
	var uid=id;
 }
	var r=	$.ajax({data:{"id":  uid},      
						url:'php/getPuzzles.php', 
						type:"POST", async:false}).responseText;						
	
	
	if(typeof r == "undefined"){
		return false;
		//showPopupAceptar("Ha ocurrido un error y no se han podido cargar los puzzles, inténtalo más tarde.");	
	}else{
		var result = JSON.parse(r);	
		return result;
	}
}
 
 /*  Funcion que muestra los puzles pasados por parametros 
 result -- Json con los puzzles a mostrar, user=true si son los del usuario logado*/
function showPuzzles(result,user,name,grupo) {
	
	desmarcar();
	$("#menu3").addClass( "selected" );
	$("#pieAnadePiezas").hide();	
	$('#puzzles').empty();//Limpiamos los puzzles anteriores
	$("#pieGrupo").hide();
	$("#cGrupos").hide();
	
	if(result.length==0 || result==false){

		if(user && localStorage.uid=="false"){//Se buscan los puzzles del usuario logado
			$("#txtPuzzles").text("Conéctate con tu cuenta de Facebook para poder crear y ver tus puzzles.");
		}else{
			$("#pie").show();
			$("#piePuzzles").show();
			$("#txtPuzzles").text("No has creado ningun puzzle."); 
		}
	}else{
	//alert("grupo "+grupo);
	//Mostramos los puzzles de un grupo
	if(grupo!=false){
		$("#txtPuzzles").text("Los siguientes puzzles pertenecen al grupo ");
		$("#variable").text(grupo);
	}else{
	//alert("name "+name);
		$("#txtPuzzles").text("Puzzles de ");
		$("#variable").text(name);
	}
	 	for(var i=0;i<result.length;i++){
				//var propietary=(name==localStorage.name);
			 
			console.log( result[i].nombre+' propietary '+result[i].userID);
		
			var texto="<div class='caja' onclick='showPiecesPuzzle(&quot;"+result[i].nombre+"&quot;,&quot;"+result[i].grupo+"&quot;,searchPuzzlePiece("+result[i].id+",&quot;"+result[i].nombre+"&quot;),&quot;"+result[i].userID+"&quot;);'><img class='icon' alt='icono puzzle' src='data:image/png;base64,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' /> <p class='nombre' >"+result[i].nombre+"</p>";
			$('#puzzles').append(texto);
			}
		$('#listaPuzzles').show();  
		$('#cUsuarios').hide();
		$('#cPuzzles').show();
		if(localStorage.uid!="false"){
				$("#pie").show();
	$("#piePuzzles").show();
		}
 
	 } 
	
}


/* Funcion que da de alta un puzzle*/
  
  function newPuzzle(){
	if($("#puzzleName").val().trim().length==0){
		showPopupAceptar("Por favor introduce un nombre para el nuevo puzzle");  
	}else{
		//alert("Grupo sel "+$('select[name=Grupos]').val());
		//////alert("localStorage.uid nuevo puzzle "+localStorage.uid);
		var r=$.ajax({data:{"nombre":$('#puzzleName').val(),"usuario":localStorage.uid,"grupo":$('select[name=Grupos]').val()},
						url:'php/newPuzzle.php', 
						type:"POST",
						async:false}).responseText;
		$("#puzzleName").val('');
		var result = JSON.parse(r);
		if(result[0].insert=='1'){
			showPopupAceptar("Tu puzzle se ha generado correctamente");	
			mostrar(3);
		}else{
			showPopupAceptar("ERROR tu puzzle no se ha generado correctamente");	
		}
	}  
}  
  
  
function anadirPiezaPuzzle(){
	//Comprobamos si es el propietario del puzzle 
	
	
	
	if(localStorage.owner!=localStorage.uid){
		showPopupAceptar("Tienes que logarte y ser el dueño del puzzle para poder añadir piezas.");
		
	}else{
	
	
	////alert(localStorage.puzzleID+"-"+localStorage.pieza);
	var r=	$.ajax({data:{"puzzle":  localStorage.puzzleID,"pieza":localStorage.pieza},      
	                url:'php/newPiezaPuzzle.php', 
					type:"POST", async:false
					}).responseText;							 
	var result = JSON.parse(r);	
	//alert(result[0].insert);
	if(result[0].insert==0){
		showPopupAceptar("No se ha añadido la pieza correctamente, intentalo de nuevo.");
	}else{
showPopupAceptar("Se ha añadido la pieza correctamente.");
	}
	
	}
}
/*function puzzleOut(){
localStorage.puzzle=false;
localStorage.owner=false;
localStorage.grupo=false;
	/*$("#cabeceraPuzzle").hide();*/
		/*$("#puzzlePieza").hide();
	

}*/

//Busca un puzzle que pertenece a un userID
/*function searchPuzzleByUser(userID,name){ 
showPuzzles( getPuzzlesByUser(userID),false);
//showPuzzles();


/*desmarcar();
	//Marcamos la opcion puzzles
		$("#menu3").addClass( "selected" );

	 var r=	$.ajax({data:{"id":  userID},      
	                url:'php/getPuzzles.php', 
					type:"POST", async:false
					}).responseText;						 
	var result = JSON.parse(r);
	$('#puzzles').empty();
	$("#txtPuzzles").text("Puzzles del usuario :"+name);
	for(var i=0;i<result.length;i++){
		console.log( result[i].nombre);
		var texto="<div  class='caja' onclick='searchPuzzlePiece("+result[i].id+",&quot;"+result[i].nombre+"&quot;);'> <img class='icon' id='iconPuzzle' src='img/iconPuzzle.jpg'/><p class='puzzleName' >"+result[i].nombre+"</p>";
	 	$('#puzzles').append(texto);
	}
	$('#puzzles').show();
	$('#listaPuzzles').show();
	$('#cPuzzles').show();
	$('#cUsuarios').hide();	
}
  
function anadirPiezaPuzzle(){
	//alert(localStorage.puzzleID+"-"+localStorage.pieza);
	var r=	$.ajax({data:{"puzzle":  localStorage.puzzleID,"pieza":localStorage.pieza},      
	                url:'php/newPiezaPuzzle.php', 
					type:"POST", async:false
					}).responseText;							 
	var result = JSON.parse(r);	
	//alert(result);
showPopupAceptar("Se ha aÃƒÂ±adido la pieza correctamente.");*/
	
//}*/

	
   /************************** GRUPOS *********************/
 //Funcion para cargar la lista de grupos
 // combo->true si se cargara en el combo de alta de puzzle
 
 /* Funcion que obtiene todos los grupos de BBDD */
 function getGroups(){
 var r=$.ajax({url: 'php/getGrupos.php', 
				type:"POST",
				async:false
				}).responseText;
				
	if(typeof r == "undefined"){
		showPopupAceptar("No se han podido cargar los grupos, por favor inténtalo de nuevo más tarde.");
	}else{
		var result = JSON.parse(r);
		return result;
	}
 
 }
 
 function showGrupos(result,combo){
		
	if(combo){
		$('#comboGrupos').empty();
		for(var i=0;i<result.length;i++){
			var texto="<option value="+result[i].id+">"+result[i].nombre+"</option>";
	 		$('#comboGrupos').append(texto);
		}		
	}else{
	 	$('#grupos').empty();
		for(var i=0;i<result.length;i++){
			var texto="<div  class='caja' onclick='searchGrupo("+result[i].id+",&quot;"+result[i].nombre+"&quot;)'><img class='icon' src='data:image/png;base64,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'></img> <p class='nombre'>"+result[i].nombre+"- "+result[i].descripcion +"</p>";
	 		$('#grupos').append(texto);
		}
	}
 }
   
  function newGroup(){	  
	//var texto=document.getElementById("textoPieza").value;	
	if($("#groupName").val().trim().length==0){
		showPopupAceptar("Por favor introduce un nombre para el nuevo grupo");  
	}else if($("#groupDesc").val().trim().length==0){
		showPopupAceptar("Por favor introduce una descripción para el nuevo grupo");  
	}else{

		var r=$.ajax({
	                data:{"nombre":$('#groupName').val(),
					"desc":$('#groupDesc').val()},
	                url:   'php/newGrupo.php', 
					async:false,
					type:"POST"}).responseText;
					
		var result = JSON.parse(r);			 
					 
		if(result[0].insert=='1'){
			showPopupAceptar("Tu grupo se ha generado correctamente");	
			mostrar(4);
		}else{
			showPopupAceptar("ERROR tu grupo no se ha generado correctamente");	
		}	  
	}
  }
  
  function searchGrupo(id,name){
	  	var r=	$.ajax({data:{"id":  id},      
						url:'php/getPuzzlesByGroup.php', 
						type:"POST", async:false}).responseText;						
	var result = JSON.parse(r);	

	if(result.length>0){
			showPuzzles(result,false,false,name);
	}else{
		showPopupAceptar("El grupo "+name+" aún no tiene puzzles")

	}

  }
  
  /************************** PUZZLINKERS *********************/
  function getUsers(){
  var r=$.ajax({
	            url:'php/getUsuarios.php', 
				type:"POST",
				async:false
				}).responseText;
	if(typeof r == "undefined"){
		showPopupAceptar("No se han podido cargar los Puzzlinkers, por favor intentalo más tarde.");		
	}else{
		var result = JSON.parse(r);
		return result;
	}
  
  }
  function showUsers(result){
	
	$('#usuarios').empty();
	for(var i=0;i<result.length;i++){
		var texto="<div  class='caja' onclick='showPuzzles(getPuzzlesByUser("+result[i].user_id+"),false,\""+result[i].user_name+"\",false)'> <img class='icon' src='data:image/png;base64,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' /><p class='nombre'>"+result[i].user_name+"</p></div>";
	 	$('#usuarios').append(texto);
	}  
  }

  function comprobarVacio(valor){
	
		if($("#buscarTerm").val().trim()==="" && $('#buscarID').val().trim()===""){
			$("#textoPopup").text("Porfavor introduce un valor");
			$("#textoPopup").css('color', 'red');
			$("#buscarTerm").css('border-color', 'red');
			$("#buscarID").css('border-color', 'red');
			
		}else{
				
			showPieces(searchPieces(valor),false);
		}
  
  }
function mostrarCarga(){
$("#fondo").css("background-image"," url(img/reloj.gif)");
$("#fondo").css("background-repeat"," no-repeat");
$("#fondo").css("background-position"," center");
$("#fondo").show();
}

function ocultarCarga(){
$("#fondo").hide();
$("#fondo").css("background-image"," none");

}
  