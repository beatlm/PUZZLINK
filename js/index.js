//prueba
var altaOk="Enhorabuena, se ha dado de alta su pieza con ID: ";
var altaKo="No se ha podido dar de alta la pieza, por favor vuelve a intentarlo.";
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
	localStorage.uid =false;	
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
		puzzleOut();
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
		
		$("#menu3").addClass( "selected" );
		puzzleOut();
		showPuzzles( getPuzzlesByUser(true),true,localStorage.name,false);//Se muestran los puzzles del usuario logado
		break;
	case(4)://GRUPOS
		showGrupos(getGroups(),false);
		$("#cGrupos").show();
		$("#pie").show();
		$("#pieGrupo").show();		
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
		$("#pieNuevoPuzzle").show();
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
function searchNextPiece(next){
	var posicion=$("#contentPieza").html().indexOf("-",0);
	var final=$("#contentPieza").html().substring(0,posicion);
	$("#btnLeft").show();
	$("#btnRight").show();
	if(next){
		final=Number(final)+Number(1);
	}else{
		final=Number(final)-Number(1);
	}
	showPieces(searchPieces(final));
 }

//Funcion que muestra una pieza aleatoria de entre las existentes
function showRandom(){	
	var last=getLastPiece();
	var num=Math.floor(Math.random()*last)+1;
	showPieces(searchPieces(num));													
}
 
 /* Funcion que devuelve el id de la ultima pieza en BBDD*/
 function getLastPiece(){ 
	var r=	$.ajax({url:'php/getId.php', 
					type:"POST", async:false}).responseText;							
	var result = JSON.parse(r);	 
	return result[0].id;									 
 }

/* Funcion para busqueda de piezas
   num-> el numero de la pieza a buscar
   Si no se pasa num, se busca por palabra 
   
   RETURN: El json con las piezas encontradas */
function searchPieces(num){
	
	localStorage.pieza=num;	 
	
	if(!num){//No se pasa el numero de pieza-->Busqueda por palabra
	var	r=$.ajax({ data:{"texto":$("#buscarTerm").val()},
				url:'php/getPiezaText.php', 
				type:"POST",async:false}).responseText;		
	}else{
	var	r=$.ajax({data:{"id":num},
	        url:'php/getPiezaId.php', 
			type:"POST",async:false
			}).responseText;			
	}

	if(typeof r == "undefined"){
		showPopupAceptar("Ha ocurrido un error y no se han podido cargar las piezas, intentalo mas tarde");	
	}else{
		var result = JSON.parse(r);	
		return result;	
	}												
}



/*  Funcion que muestra las piezas de un puzzle */
function showPiecesPuzzle(puzzle, grupo, piezas, owner){
	//alert("showPiecesPuzzle  "+puzzle+" grupo "+grupo+ "piezas"+piezas.length+" owner "+owner);
	localStorage.grupo=grupo;
	localStorage.owner=owner;
		if(piezas.length==0){//No hay piezas en el puzzle
			$("#txtIntro").text("El puzzle aún no tiene piezas, añádelas!.");
		}else {
			$('#cPuzzles').hide();
			$('#cPiezas').show();
			$('#btnLeft').hide();
			$('#btnRight').hide();
			$('#puzzlePieza').hide();
			$("#piePuzzles").show();
			$('#pieAnadePiezas').show(); 
	 		$('#piezas').show(); 
	  		$("#txtIntro").text("Estas son las piezas del puzzle seleccionado.");
	  		$("#variasPiezas").show();
			$("#pie").show();
			$('#pieza').hide();
 
		$("#cabPuzzle").text("PUZZLE: "+localStorage.puzzle+"	         GRUPO: "+localStorage.grupo);
	 
		 //Limpiamos las piezas anteriores
		
		for(var i=0;i<piezas.length;i++){
		  	var texto="<div  class='introTxt'> <p >"+piezas[i].id+"- "+piezas[i].texto +"</p>";
	 		$('#piezas').append(texto);
		} 
			
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
	//alert("showPieces "+piezas.length);
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
	$("#cabeceraPuzzle").hide();
		
	desmarcar();
	//Marcamos la opcion piezas
	$("#menu1").addClass( "selected" );
	$("#btnRight").show();
	$("#btnLeft").show();
	$('#cPuzzles').hide();
	$('#cPiezas').show();
		
		
	if(piezas.length>0){
		if(piezas[0].id==1){
			$("#btnLeft").hide();//Si es la primera no mostramos flecha izda
		}
		var last= getLastPiece();
		if(Number(last)==Number(piezas[0].id)){
			$("#btnRight").hide();//Si es la ultima no mostramos flecha dcha
		}
	}
	

	
	
	if (piezas.length == 0 ){//Sin piezas
		showPopupAceptar("No se han encontrado piezas con esos criterios.");		 
		
	 	piezas=searchPieces(1);
			$("#contentPieza").text(piezas[0].id+"- "+piezas[0].texto);
			$("#pie").show();
			$("#pieza").show();
			$("#contentPieza").show();
			$("#btnLeft").hide();
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
		$("#cabeceraPuzzle").show();
		$("#cabPuzzle").text("PUZZLE: "+localStorage.puzzle+"	      GRUPO: "+localStorage.grupo);
		$("#puzzlePieza").show();
		}
	
}




/* Funcion que muestra la pantalla de nueva pieza*/

/*function showNewPiece(){
	$("#contentPieza").hide();
	$("#newPieza").show();
	$("#pieza").show();
	$("#btnLeft").hide();
	$("#btnRight").hide();
	$("#textoPieza").val("Introduce aqu&iacute; el contenido de tu pieza..."); 
}*/



/* Funcion que da de alta una pieza */
function uploadPiece(){
	var texto=document.getElementById("textoPieza").value;
	$.ajax({data:{"texto":texto},
	        url:   'php/newFicha.php', 
			type:"POST",
			error:errorAlta
			});
	var last=getLastPiece();
	searchPieces(last);
	showPopupAceptar(altaOk+last);
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
	 
}

//Funcion que muestra un popup con un mensaje y un boton aceptar pasandole el texto
function showPopupAceptar(texto){
	$("#fondo").show();
	$("#popupAceptar").show();
	$("#txtAceptar").text(texto);
	//document.getElementById("txtAceptar").innerHTML=texto;	
}

function errorAlta(){
	showPopupAceptar(altaKo);	
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
	
	
	$("#fbLogin").hide();
	$("#fbLogout").show();
	$("#txtCabLog").hide();
	$("#logData").show();
	
	mostrar(0);//Vamos al inicio
	
    } else if (response.status === 'not_authorized') {
	  	showPopupAceptar("Los datos no son correctos, vuelve a intentarlo");
      	FB.login();
	  	localStorage.uid=false;
		localStorage.name=false;
	  	mostrar(0);
	   	$("#txtCabLog").text(inicioSesion);
    } else {

	   $("#txtCabLog").show();
	    mostrar(0);
	    localStorage.uid=false;
		localStorage.name=false;
	
		$("#foto").attr("src","url('img/Transparent.gif')");		
		$("#fbLogin").show();
		$("#fbLogout").hide();
		$("#logData").hide();
 
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
	var result = JSON.parse(r);	
	return result;
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
	
	if(result.length==0){

		if(user && localStorage.uid=="false"){//Se buscan los puzzles del usuario logado
			$("#txtPuzzles").text("Conéctate con tu cuenta de Facebook para poder crear y ver tus 		puzzles.");
		}else{
			$("#pie").show();
			$("#piePuzzles").show();
			$("#txtPuzzles").text("No has creado ningun puzzle."); 
		}
	}else{
	//alert("grupo "+grupo);
	//Mostramos los puzzles de un grupo
	if(grupo!=false){
	$("#txtPuzzles").text("Puzzles del grupo "+grupo);
	}else{
	//alert("name "+name);
		$("#txtPuzzles").text("Puzzles de "+name);
		}
	 	for(var i=0;i<result.length;i++){
				//var propietary=(name==localStorage.name);
			 
			console.log( result[i].nombre+' propietary '+result[i].userID);
		
			var texto="<div class='caja' onclick='showPiecesPuzzle(&quot;"+result[i].nombre+"&quot;,&quot;"+result[i].grupo+"&quot;,searchPuzzlePiece("+result[i].id+",&quot;"+result[i].nombre+"&quot;),&quot;"+result[i].userID+"&quot;);'> <p class='puzzleName' >"+result[i].nombre+"</p>";
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
	if($("#puzzleName").val().length==0){
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
function puzzleOut(){
localStorage.puzzle=false;
localStorage.owner=false;
localStorage.grupo=false;
	$("#cabeceraPuzzle").hide();
		$("#puzzlePieza").hide();
	

}

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
	var result = JSON.parse(r);
	return result;
 
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
			var texto="<div  class='caja' onclick='searchGrupo("+result[i].id+",&quot;"+result[i].nombre+"&quot;)'> <p >"+result[i].nombre+"- "+result[i].descripcion +"</p>";
	 		$('#grupos').append(texto);
		}
	}
 }
   
  function newGroup(){	  
	var texto=document.getElementById("textoPieza").value;

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
  
  function searchGrupo(id,name){
	  	var r=	$.ajax({data:{"id":  id},      
						url:'php/getPuzzlesByGroup.php', 
						type:"POST", async:false}).responseText;						
	var result = JSON.parse(r);	
 
	
	showPuzzles(result,false,false,name);
  }
  
  /************************** PUZZLINKERS *********************/
  function getUsers(){
  var r=$.ajax({
	            url:'php/getUsuarios.php', 
				type:"POST",
				async:false
				}).responseText;
	var result = JSON.parse(r);
	return result;
  
  }
  function showUsers(result){
	
	$('#usuarios').empty();
	for(var i=0;i<result.length;i++){
		var texto="<div  class='caja' onclick='showPuzzles(getPuzzlesByUser("+result[i].user_id+"),false,\""+result[i].user_name+"\",false)'> <img class='icon' src='img/users.jpg' /><p >"+result[i].user_name+"</p></div>";
	 	$('#usuarios').append(texto);
	}  
  }


  