


$(document).ready(function(){ 

 
 cargaFb(document);

	$(".content2").hide();
	$("#detallePieza").hide();
	  $("#newPieza").hide();
	  	$("#fondo").hide();
		$("#buscar").hide();

			$("#menu0").addClass( "selected" );
				$("#popupAlta").hide();
				 $("#variasPiezas").hide();
				 $("#cPuzzles").hide();
				 $("#cRegistro").hide();
				 
			$('#popupAlias').hide();
			$("#cGrupos").hide();
				$("#cNewGrupo").hide();
					$("#pie").hide();
						$("#cNewPuzzle").hide();
			
});


//Funcion para mostrar la seleccion de in boton onclick
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
		 
	$("#menu0").removeClass( "selected" );
	$("#menu1").removeClass( "selected" );
	$("#menu2").removeClass( "selected" );
	$("#menu3").removeClass( "selected" );
	$("#menu4").removeClass( "selected" ); 
	
	
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
		srchPcs(1);//Buscamos la primera pieza
	break;
	case (2):		
		  $("#menu2").addClass( "selected" );		
	break;
	case(3):
		$("#cPuzzles").show();
		$("#puzzles").show();
		$("#pie").show();
		$("#piePuzzles").show();
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
		//$("#menu5").css("background-color","lightgray");
	break;
	case(7)://Nuevo grupo
		$("#cNewGrupo").show();
		$("#menu4").addClass( "selected" ); 
		$("#pieNuevoGrupo").show();
		$("#pie").show();

	
	break;
	case(8):
	$("#menu3").addClass( "selected" ); 
		$("#cNewPuzzle").show();
		$("#pie").show();
			$("#pieNuevoPuzzle").show();
	
	}
}



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
		if(final==0){
			return;//Si es la pieza uno no hacemos nada
		}
	}
	var last= getLastPiece();
 
 	if(last==final){
	 	$("#btnRight").hide();
		
 	}
		srchPcs(final);
 	
 }



//Funcion para busqueda de piezas
// num-> el numero de la pieza a buscar
// Si no se pasa num, se busca por término
function srchPcs(num){	
	
	if(!num){//No se pasa el numero de pieza-->Busqueda por termino
		//Lanzamos la consulta
		 
	$.ajax({
	                data:{"texto":$("#buscarTerm").val()},
	                url:   'php/getPiezaText.php', 
					type:"POST",
					success:okPiezas,
						        });
								$("#buscarTerm").val("");
		
	
	}else{
	$("#buscarID").val("");
	//Lanzamos la consulta
	$.ajax({
	                data:{"id":num},
	                url:   'php/getPiezaId.php', 
					type:"POST",
					success:okPiezas,
						        });
		
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
		$("#btnLeft").show();
			$("#btnRight").show();
	
	  	$("#newPieza").hide();
		$("#contentPieza").text(result[0].id+"- "+result[0].texto);
		if(result[0].id==1){//Primera pieza
			$("#btnLeft").hide();
		 
		}
		
	
	  }else{//Se encuentran varias piezas
	  
	  	$("#txtIntro").text("Hay varias piezas con esos criterios, por favor haz click sobre la que te interese.");
	  	$("#variasPiezas").show();
	  	$("#pieza").hide();
	  	$("#contentPieza").hide();
		$("#btnLeft").hide();
		$("#btnRight").hide();
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
	showPopupId(last);
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
	//var id=document.getElementById("buscarTexto").value;
	var texto=document.getElementById("textoPieza").value;
	 
		
		//Lanzamos la consulta
	$.ajax({
	                data:{"texto":texto},
	                url:   'php/newFicha.php', 
					type:"POST",
					error:errorAlta,
					success:okNewPieza,
						        });
	
}
function showPopup(num){
		$("#fondo").show();
		$("#buscar").show();
		if(num){
			$("#textoPopup").text("Introduce el número de pieza");
		$("#buscarID").show();
		$("#buscarTerm").hide();}
		else{
				$("#textoPopup").text("Introduce el texto a buscar");
		$("#buscarID").hide();
		$("#buscarTerm").show();}
}
function closePopup(){
	$("#fondo").hide();
		$("#buscar").hide();
				$("#popupAlta").hide();
				$("#popupAlias").hide();
	
}

function showPopupId(id){
	$("#fondo").show();
	$("#popupAlta").show();
	document.getElementById("txtAlta").innerHTML="Enhorabuena, se ha dado de alta su pieza con ID: "+id;
		
}
function errorAlta(){
alert("no se ha podido dar de alta la pieza");	
}


//Funcion que muestra una pieza aleatoria de entre las existentes
function aleatoria(){	
			
		var last=getLastPiece();
	 
		srchPcs(Math.floor((Math.random()*last)+1));
														
}
 
 
 function getLastPiece(){
	 
	var r=	$.ajax({           
	                url:'php/getId.php', 
					type:"POST", async:false		
						        }).responseText;
								
	var result = JSON.parse(r);
	 
	return result[0].id;
									
	 
 }
 
 
 <!-- FUNCIONES FACEBOOK -->
 function  fbAsyncInit ()  {
	//alert("fbAsyncInit");
    FB.init({
      appId      : '442776155842772', // App ID
      channelUrl : '//WWW.puzzlink.hol.es/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });  
   
   
   
   
     // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
  // for any authentication related change, such as login, logout or session refresh. This means that
  // whenever someone who was previously logged out tries to log in again, the correct case below 
  // will be handled. 
  FB.Event.subscribe('auth.authResponseChange', function(response) {
	 
	//alert("response "+response.status);
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.

	 localStorage.uid = response.authResponse.userID;
	  
	  
	  	FB.api('/me', function(response) {
  			//alert(response.name);
			localStorage.name = response.name;
   			//$("#txtCabLog").text("Usuario: "+response.name);
		});
	
	
		var r=	$.ajax({data:{"id":localStorage.uid}, 
	                url:'php/login.php', 
					type:"POST", async:false
					
						        }).responseText;
								
		var result = JSON.parse(r);
							 
		if(result.length>0){
			 
	 		$("#txtCabLog").text("Alias: "+result[0].user_name);
				 
		}else{
			
			$('#popupAlias').show();
		}

	
	      
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
	  alert("los datos no son correctos, vuelve a intentarlo");
      FB.login();
	  localStorage.uid=false;
	  mostrar(0);
	   $("#txtCabLog").text("Inicia sesión con tu cuenta de Facebook para poder crear puzzles!!");
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
	   $("#txtCabLog").text("Inicia sesión con tu cuenta de Facebook para poder crear puzzles!!");
      FB.login();
	    mostrar(0);
	    localStorage.uid=false;
    }
  });
  

  };
  
function setAlias(alias){
	var r=	$.ajax({data:{"alias":alias,
							"id":localStorage.uid}, 
	                url:'php/alias.php', 
					type:"POST", async:false
					
						        }).responseText;
							 
	if(r!='false'){
		closePopup();
		  $("#txtCabLog").text("Alias: "+alias);
	}else{
	alert("Lo sentimos, no se ha podido establecer tu alias, vuelve a intentarlo más tarde.");
	 $("#txtCabLog").text("Nombre: "+localStorage.name);	
		closePopup();
	}
	
}

  // Load the SDK asynchronously
  function cargaFb(d){
	 
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/es_ES/all.js";
     ref.parentNode.insertBefore(js, ref);
   };
   

function cargaPuzzles() {

	if(localStorage.uid=="false"){
		$("#txtPuzzles").text("Conéctate con tu cuenta de facebook para poder crear y ver tus puzzles.");
	
	}else{
	
	   
	   var r=	$.ajax({    data:{"id":  localStorage.uid},      
	                url:'php/getPuzzles.php', 
					type:"POST", async:false
					
						        }).responseText;
								
		var result = JSON.parse(r);
	 	//Limpiamos las puzzles anteriores
		 $('#puzzles').empty();
		 
		 
		 if(result.length==0){
				$("#txtPuzzles").text("Conéctate con tu cuenta de facebook para poder crear y ver tus puzzles."); 
		 }else{
		 	$("#txtPuzzles").text("Aquí estan tus puzzles:");
		 
	 		for(var i=0;i<result.length;i++){
			console.log( result[i].nombre);
		
		 
		  	var texto="<div  class='puzzleName' onclick='srchPzz("+result[i].id+")'> <p class='puzzleName' >"+result[i].nombre+"</p>";
	 		$('#puzzles').append(texto);
			$('#listaPuzzles').show();
			}
		  
	 	}
	 
}
	   
	   
 
  }
  
  //Funcion para busqueda de puzzles
// num-> el numero del puzzle a buscar

function srchPzz(num){	
	
 
		 
	var r=$.ajax({
	                data:{"id":num},
	                url:   'php/getPiezasPuzzle.php', 
					type:"POST",
					async:false
					
						        }).responseText;
							 
		var result = JSON.parse(r);
	 
		$("#puzzles").hide();
			$("#cPiezas").show();
		
		$("#txtIntro").text("Hay varias piezas en este puzzle.");
	  	$("#variasPiezas").show();
	  	$("#pieza").hide();
	  	$("#contentPieza").hide();
		$("#btnLeft").hide();
		$("#btnRight").hide();
		 //Limpiamos las piezas anteriores
		 $('#piezas').empty();
		  for(var i=0;i<result.length;i++){
		 
		  	var texto="<div  class='introTxt' onclick='srchPcs("+result[i].id+")'> <p >"+result[i].id+"- "+result[i].texto +"</p>";
	 		$('#piezas').append(texto);
		  }
															
}
  
 //Funcion para cargar la lista de grupos
 function cargarGrupos(){
	 var r=$.ajax({
	                url: 'php/getGrupos.php', 
					type:"POST",
					async:false
					
						        }).responseText;
							 
		var result = JSON.parse(r);

	 
	 
	 $('#grupos').empty();
		  for(var i=0;i<result.length;i++){
		
		  	var texto="<div  class='bigTxt' onclick='srchGrupo("+result[i].id+")'> <p >"+result[i].nombre+"- "+result[i].descripcion +"</p>";
	 		$('#grupos').append(texto);
		  }
 }
  
  
  //Nuevo grupo en bbdd
  function newGrupo(){
	  
	  var texto=document.getElementById("textoPieza").value;
	 
		
		//Lanzamos la consulta
	var r=$.ajax({
	                data:{"nombre":$('#groupName').val(),
					"desc":$('#groupDesc').val()},
	                url:   'php/newGrupo.php', 
					async:false,
					type:"POST"}).responseText;
							 
								
			var result = JSON.parse(r);			 
					 
								if(result[0].insert=='1'){
								alert("Tu grupo se ha generado correctamente");	
								mostrar(4);
								}else{
									alert("ERROR tu grupo no se ha generado correctamente");	
								}
	  
  }
  
  function newPuzzle(){
	  
	  if($("#puzzleName").val().length==0){
		alert("por favor introduce un nombre para el nuevo puzzle");  
	  }else{
		  
	
		  
		  var r=$.ajax({data:{"nombre":$('#puzzleName').val(),
							"usuario":localStorage.uid},
	                url:'php/newPuzzle.php', 
					type:"POST",
					async:false
						        }).responseText;
			var result = JSON.parse(r);
		 
			if(result[0].insert=='1'){
				alert("Tu puzzle se ha generado correctamente");	
				mostrar(3);
			}else{
				alert("ERROR tu puzzle no se ha generado correctamente");	
			}
	  
		  
		  
	  }
	  
  }
