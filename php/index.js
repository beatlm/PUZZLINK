
var altaOk="Enhorabuena, se ha dado de alta su pieza con ID: ";

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
});


  /************************** MENU *********************/
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
	case(0):
		$("#cMain").show();
		$("#menu0").addClass( "selected" );
		break;
	case(1):
		$("#cPiezas").show();
		$("#pie").show();
		$("#piePiezas").show();
	 	$("#menu1").addClass( "selected" );
		$("#btnLrft").hide();
		$("#puzzlePieza").hide();
		srchPcs(1);//Buscamos la primera pieza
		break;
	case (2):		
		$("#menu2").addClass( "selected" );	
		$("#cUsuarios").show();	
		getUsuarios()
		break;
	case(3):
		$("#cPuzzles").show();
		$("#puzzles").show();
		
		$("#menu3").addClass( "selected" );
		cargaPuzzles();
		break;
	case(4)://Grupos
		cargarGrupos();
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
	case(8):
		$("#menu3").addClass( "selected" ); 
		cargarGrupos(true);//Cargamos el combo de grupos
		$("#cNewPuzzle").show();
		$("#pie").show();
		$("#pieNuevoPuzzle").show();
		break;	
	case(9):
		$("#cPiezas").show();
		$("#pie").show();
		$("#piePiezas").show();
	 	$("#menu1").addClass( "selected" );
		$("#btnLrft").hide();
		$("#puzzlePieza").show();
		$("#btnAddPieza").text("Añadir pieza al puzzle "+localStorage.puzzle);	
		srchPcs(1);//Buscamos la primera pieza
		break;
	}
}

function desmarcar(){
	$("#menu0").removeClass( "selected" );
	$("#menu1").removeClass( "selected" );
	$("#menu2").removeClass( "selected" );
	$("#menu3").removeClass( "selected" );
	$("#menu4").removeClass( "selected" ); 	
}

  /************************** PIEZAS *********************/

//Funcion para buscar la pieza siguiente o anterior. (next=true--ªsiguiente)
function srchNext(next){
	var posicion=$("#contentPieza").html().indexOf("-",0);
	var final=$("#contentPieza").html().substring(0,posicion);
	$("#btnLeft").show();
	$("#btnRight").show();
	if(next){
		final=Number(final)+Number(1);
	}else{
		final=Number(final)-Number(1);
	}
	srchPcs(final);
 }

//Funcion que muestra una pieza aleatoria de entre las existentes
function aleatoria(){	
	var last=getLastPiece();
	srchPcs(Math.floor((Math.random()*last)+1));													
}
 
 
 function getLastPiece(){ 
	var r=	$.ajax({url:'php/getId.php', 
					type:"POST", async:false}).responseText;							
	var result = JSON.parse(r);	 
	return result[0].id;									 
 }

//Funcion para busqueda de piezas
// num-> el numero de la pieza a buscar
// Si no se pasa num, se busca por término
function srchPcs(num){
	 
	desmarcar();
	//Marcamos la opcion puzzles
		$("#menu3").addClass( "selected" );
	
	$("#btnRight").show();
	$("#btnLeft").show();
	localStorage.pieza=num;
	if(num==1){
		$("#btnLeft").hide();
	}
	var last= getLastPiece();
	if(Number(last)==Number(num)){
		$("#btnRight").hide();
	}
	if(!num){//No se pasa el numero de pieza-->Busqueda por termino
		$.ajax({ data:{"texto":$("#buscarTerm").val()},
				url:'php/getPiezaText.php', 
				type:"POST",
				success:okPiezas});
		$("#buscarTerm").val("");
	}else{
		$("#buscarID").val("");
		//Lanzamos la consulta
		$.ajax({data:{"id":num},
	        url:   'php/getPiezaId.php', 
			type:"POST",
			success:okPiezas});	
	}
	$("#fondo").hide();
	$("#buscar").hide();														
}


function okPiezas(restrs){
	var result = JSON.parse(restrs);
	 if (result.length <= 0){
		$("#txtIntro").text("No se han encontrado piezas con esos criterios");
		  //Limpiamos las piezas anteriores
		$('#piezas').empty();
		$("#pieza").hide();
		$("#contentPieza").hide();

      }else if(result.length==1){
        $("#txtIntro").text("Una pieza PuzzLink mínima contiene Sujeto, Verbo y Predicado: tres nexos como mínimo y un máximo de 3.000 caracteres, con espacios incluidos. Como la función 'Buscar' es omnipotente, las piezas no contienen imágenes, pero si es necesario consultar alguna, pueden ser invocadas simultáneamente desde otros sites que la contengan.");
		$("#variasPiezas").hide();	  
		$("#pieza").show();
		$("#contentPieza").show();
	  	$("#newPieza").hide();
		$("#contentPieza").text(result[0].id+"- "+result[0].texto);
	  }else{//Se encuentran varias piezas
	  	$("#txtIntro").text("Hay varias piezas con esos criterios, por favor haz click sobre la que te interese.");
	  	$("#variasPiezas").show();
	  	$("#pieza").hide();
	  	$("#contentPieza").hide();
	
		 //Limpiamos las piezas anteriores
		$('#piezas').empty();
		for(var i=0;i<result.length;i++){
		  	var texto="<div  class='introTxt' onclick='srchPcs("+result[i].id+")'> <p >"+result[i].id+"- "+result[i].texto +"</p>";
	 		$('#piezas').append(texto);
		} 
	  }
}


function okNewPieza(){
	var last=getLastPiece();
	srchPcs(last);
	showPopupAceptar(altaOk+last);
}


function newPieza(){
	$("#contentPieza").hide();
	$("#newPieza").show();
	$("#pieza").show();
	$("#btnLeft").hide();
	$("#btnRight").hide();
	$("#textoPieza").val("Introduce aquí el contenido de tu pieza..."); 
}

function uploadPieza(){
	var texto=document.getElementById("textoPieza").value;
	$.ajax({data:{"texto":texto},
	        url:   'php/newFicha.php', 
			type:"POST",
			error:errorAlta,
			success:okNewPieza,
			});
}


//Funcion para busqueda de piezas de un puzzle puzzles
// num-> el numero del puzzle a buscar, name el nombre del puzzle
function srchPzz(num,name){	
desmarcar();
$("#menu1").addClass( "selected" );

	localStorage.puzzle=name;
	localStorage.puzzleID=num;
	var r=$.ajax({data:{"id":num},
	                url:   'php/getPiezasPuzzle.php', 
					type:"POST",
					async:false}).responseText;
	var result = JSON.parse(r);
	$("#puzzles").hide();
	$("#cPiezas").show();
	if(result.length>0){		
		$("#txtPuzzles").text("Estas son las piezas del puzzle "+name);
	}else{
		$("#txtPuzzles").text("El puzzle "+name+" aún no tiene piezas, añádelas!.");
	}
	$("#variasPiezas").show();
	$("#pieza").hide();
	$("#contentPieza").hide();
	$("#btnLeft").hide();
	$("#btnRight").hide();
	$("#pieAnadePiezas").show();
	//Limpiamos las piezas anteriores
	$('#piezas').empty();
	for(var i=0;i<result.length;i++){
		var texto="<div class='introTxt'> <p class='puzzleName' >"+result[i].texto+"</p>";
		$('#piezas').append(texto);
	}															
}

  /************************** POPUPS *********************/
  //Funcion que muestra popups de busqueda
  //num->true  Busqueda por id (numerico)
  //num->false Busqueda por texto
function showPopup(num){
	$("#fondo").show();
	$("#buscar").show();
	if(num){
		$("#textoPopup").text("Introduce el número de pieza");
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
	document.getElementById("txtAceptar").innerHTML=texto;
		
}

function errorAlta(){
	showPopupAceptar("No se ha podido dar de alta la pieza, por favor vuelve a intentarlo.");	
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
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.

		localStorage.uid = response.authResponse.userID;
		//alert(response.authResponse.userID);
		
		
		
		
	  	FB.api('/me', function(response) {
  		//alert(response.name);
			
		
			if(typeof response.username == "undefined"  ){//Si no tiene username definido, utuliazaremos el id para obtener la foto y mostraremos el nombre?? y le avisaremos de poder establecer un username en facebook facebook.com/username.
			localStorage.name = localStorage.uid;
				showPopupAceptar("No tienes establecido un alias en facebook. Accede a facebook.com/username para elegir uno. En caso contrario usaremos tu ID numérico.");
			 	//alert("https://graph.facebook.com/"+localStorage.uid+"/picture");
				$("#foto").attr("src","https://graph.facebook.com/"+localStorage.uid+"/picture");
				$("#alias").text( "Bienvenid@ "+localStorage.uid);	 
			}else{
			 localStorage.name = response.username;
			$("#foto").attr("src","https://graph.facebook.com/"+response.username+"/picture");
			$("#alias").text("Bienvenid@ "+ response.username);	 
			}
	 
		});
	
comprobarUsuario();
	
		
	$("#fbLogin").hide();
	$("#fbLogout").show();
	$("#txtCabLog").hide();
		$("#logData").show();
	
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
	  showPopupAceptar("Los datos no son correctos, vuelve a intentarlo");
      FB.login();
	  localStorage.uid=false;localStorage.name=false;
	  mostrar(0);
	   $("#txtCabLog").text("Inicia sesión con tu cuenta de Facebook para poder crear puzzles!!");
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
	   $("#txtCabLog").show();
    
	    mostrar(0);
	    localStorage.uid=false;localStorage.name=false;
	 
	 
		$("#foto").attr("src","url('img/Transparent.gif')");
		
				
	$("#fbLogin").show();
	$("#fbLogout").hide();
		 $("#logData").hide();
 
    }
  });
  

}
  function comprobarUsuario(){
 alert(localStorage.name+"-"+localStorage.uid);
  var r=	$.ajax({data:{"alias":localStorage.name,
							"id":localStorage.uid}, 
	                url:'php/alias.php', 
					type:"POST", async:false
					
						        }).responseText;
  
  }
 function iniciar(){
	 FB.login();
	var r=	$.ajax({data:{"alias":localStorage.name,
							"id":localStorage.uid}, 
	                url:'php/alias.php', 
					type:"POST", async:false
					
						        }).responseText;
							 
	
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
function cargaPuzzles() {
	if( typeof localStorage.uid == "undefined"){
		$("#txtPuzzles").text("Conéctate con tu cuenta de facebook para poder crear y ver tus puzzles.");
	}else{
	alert("carga puzzles logado localst"+localStorage.uid);
		$("#pie").show();
		$("#piePuzzles").show();
		$("#pieAnadePiezas").hide();
		
		
		var r=	$.ajax({data:{"id":  localStorage.uid},      
						url:'php/getPuzzles.php', 
						type:"POST", async:false}).responseText;						
		var result = JSON.parse(r);
	 	//Limpiamos las puzzles anteriores
		$('#puzzles').empty();
		alert(result);
		if(result.length==0){
			$("#txtPuzzles").text("No has creado ningun puzzle."); 
		}else{
		 	$("#txtPuzzles").text("Aquí estan tus puzzles:");
	 		for(var i=0;i<result.length;i++){
				console.log( result[i].nombre);
				var texto="<div class='caja' onclick='srchPzz("+result[i].id+",&quot;"+result[i].nombre+"&quot;);'> <p class='puzzleName' >"+result[i].nombre+"</p>";
				$('#puzzles').append(texto);
			}
			$('#listaPuzzles').show();  
	 	} 
	}
}
  
  function newPuzzle(){
	if($("#puzzleName").val().length==0){
		showPopupAceptar("Por favor introduce un nombre para el nuevo puzzle");  
	}else{
		alert("localStorage.uid nuevo puzzle "+localStorage.uid);
		var r=$.ajax({data:{"nombre":$('#puzzleName').val(),"usuario":localStorage.uid},
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
  
 


//Busca un puzzle que pertenece a un userID
function srchPuzzleUser(userID,name){ 

desmarcar();
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
		var texto="<div  class='caja' onclick='srchPzz("+result[i].id+",&quot;"+result[i].nombre+"&quot;);'> <img class='icon' id='iconPuzzle' src='img/iconPuzzle.jpg'/><p class='puzzleName' >"+result[i].nombre+"</p>";
	 	$('#puzzles').append(texto);
	}
	$('#puzzles').show();
	$('#listaPuzzles').show();
	$('#cPuzzles').show();
	$('#cUsuarios').hide();	
}
  
function anadirPiezaPuzzle(){
	alert(localStorage.puzzleID+"-"+localStorage.pieza);
	var r=	$.ajax({data:{"puzzle":  localStorage.puzzleID,"pieza":localStorage.pieza},      
	                url:'php/newPiezaPuzzle.php', 
					type:"POST", async:false
					}).responseText;							 
	var result = JSON.parse(r);	
	alert(result);
showPopupAceptar("Se ha añadido la pieza correctamente.");
	
}

	
   /************************** GRUPOS *********************/
 //Funcion para cargar la lista de grupos
 // combo->true si se cargara en el combo de alta de puzzle
 function cargarGrupos(combo){
	var r=$.ajax({url: 'php/getGrupos.php', 
				type:"POST",
				async:false
				}).responseText;
	var result = JSON.parse(r);
	
	
	if(combo){
		$('#comboGrupos').empty();
		
	for(var i=0;i<result.length;i++){
			var texto="<option>"+result[i].nombre+"</option>";
	 		$('#comboGrupos').append(texto);
		}
	
		
	}else{
	 	$('#grupos').empty();
		for(var i=0;i<result.length;i++){
			var texto="<div  class='caja' onclick='srchGrupo("+result[i].id+")'> <p >"+result[i].nombre+"- "+result[i].descripcion +"</p>";
	 		$('#grupos').append(texto);
		}
	}
 }
   
  function newGrupo(){	  
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
  
  /************************** PUZZLINKERS *********************/
  
  function getUsuarios(){
	var r=$.ajax({
	            url:'php/getUsuarios.php', 
				type:"POST",
				async:false
				}).responseText;
	var result = JSON.parse(r);
	$('#usuarios').empty();
	for(var i=0;i<result.length;i++){
		var texto="<div  class='caja' onclick='srchPuzzleUser("+result[i].user_id+",\""+result[i].user_name+"\")'> <img class='icon' src='img/users.jpg' /><p >"+result[i].user_name+"</p></div>";
	 	$('#usuarios').append(texto);
	}  
  }


 
