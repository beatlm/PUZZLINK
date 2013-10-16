
$(document).ready(function(){ 
	$(".content2").hide();
	$("#detallePieza").hide();
	  $("#newPieza").hide();
	  	$("#fondo").hide();
		$("#buscar").hide();
		 
		//$("#menu0").css("background-color","orange");
		//Se selecciona el botón inicio
			$("#menu0").addClass( "selected" );
				$("#popupAlta").hide();
				 $("#variasPiezas").hide();
				 $("#cPuzzlinkers").hide();
				 $("#cRegistro").hide();
});


//Funcion para mostrar la seleccion de in boton onclick
function mostrar(id){
	$(".content2").hide();
	$("#cMain").hide();
	$("#cPuzzlinkers").hide();
		 
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
	 $("#menu1").addClass( "selected" );
		srchPcs(1);//Buscamos la primera pieza
	break;
	case (2):
	
		$("#cPuzzlinkers").show();
		  $("#menu2").addClass( "selected" );
		  cargaFb(document);
		//comprobarLogged();
		//  fbAsyncInit();//comprobamos logueo fb
		 
	break;
	case(3):
		$("#contenidoA").show("slow");
		  $("#menu3").addClass( "selected" );
	break;
	case(4):
		$("#contenidoH").show("slow");
		 $("#menu4").addClass( "selected" ); 
	break;
	case(5): //Pantalle de registro
		$("#cRegistro").show("slow");
	 
	break;
	case(6)://Pantalla gris
		$("#gris").show("slow");
		//$("#menu5").css("background-color","lightgray");
	break;
	}
}


function srchNext(next){
	 var posicion=document.getElementById("contentPieza").innerHTML.indexOf("-",0);
	// alert("posicion:"+posicion);
	var final=document.getElementById("contentPieza").innerHTML.substring(0,posicion);
	
	if(next){
		final=Number(final)+Number(1);
	}else{
		final=Number(final)-Number(1);
		if(final==0){
			return;//Si es la pieza uno no hacemos nada
		
			//final=1;
		}
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
		<!--$("#piezas").removeClass("introTxt");-->
		//Modificar para borrar las piezas cargadas varias, mediante el id que sera identico
	
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

	/*var r=	$.ajax({           
	                url:'php/getId.php', 
					type:"POST", async:false
					
						        }).responseText;
								
	var result = JSON.parse(r);*/
	 	var last=getLastPiece();
	srchPcs(last);
	
	showPopupId(result[0].id);
}




function newPieza(){
	$("#contentPieza").hide();
	$("#newPieza").show();
		$("#pieza").show();
	$("#btnLeft").hide();
	$("#btnRight").hide();
	 
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
	
}

function showPopupId(id){
		$("#fondo").show();
		$("#popupAlta").show();
			 document.getElementById("txtAlta").innerHTML="Enhorabuena, se ha dado de alta su pieza "+id;
		
}
function errorAlta(){
alert("no se ha podido dar de alta la pieza");	
}


//Funcion que muestra una pieza aleatoria de entre las existentes
function aleatoria(){	
		 
	/*var r=$.ajax({
	                data:{},
	                url:   'php/getId.php', 
					type:"POST",
					async:false}).responseText;
	  
		var result = JSON.parse(r);*/
		
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
 /*
 function logar(){
	// alert($("#login_input_username").val());
	 //alert($("#login_input_password").val());
	$.ajax({ 
					data:{"user_name":$("#login_input_username").val(),"user_password":$("#login_input_password").val()},          
	                url:'Login/index.php', 
					type:"POST",
					async:false,	
					error:kolog,
					success:oklog, 
					
						        });
							//	alert(r)
								
	//var result = JSON.parse(r); 
	 
	 
 }
function kolog(){
	alert("Logado ko");
}

function oklog(result){
		alert("Logado ok "+result);
}

function deslogar(){
		$.ajax({ 
					         
	                url:'Login/index.php?logout=true', 
					type:"POST",
					async:false,	
					error:kolog,
					success:oklog, 
					
						        });
}
 
 
 
  
 function registrar(){
	// alert($("#login_input_username").val());
	 //alert($("#login_input_password").val());
	$.ajax({ 
					data:{"user_name":$("#login_input_username").val(),"user_password":$("#login_input_password").val()},          
	                url:'Login/register.php', 
					type:"POST",
					async:false,	
					error:kolog,
					success:oklog, 
					
						        });
							//	alert(r)
								
	//var result = JSON.parse(r); 
	 
	 
 }*/
 
 <!-- FUNCIONES FACEBOOK -->
 function  fbAsyncInit ()  {
	
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
	
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {
      // The response object is returned with a status field that lets the app know the current
      // login status of the person. In this case, we're handling the situation where they 
      // have logged in to the app.
      cargaPuzzles(response.authResponse.userID);
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
      FB.login();
	   $("#introLog").text("Inicia sesión con tu cuenta de Facebook para poder crear puzzles!!");
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
	   $("#introLog").text("Inicia sesión con tu cuenta de Facebook para poder crear puzzles!!");
      FB.login();
    }
  });
  

  };

  // Load the SDK asynchronously
  function cargaFb(d){
	 
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/es_ES/all.js";
     ref.parentNode.insertBefore(js, ref);
   };
   
   
   // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function cargaPuzzles(id) {
    console.log('Bienvenido!  Obteniendo información.... ');
    FB.api('/me', function(response) {
      console.log('Bienvenid@, ' + response.name + '.'+id);
	 
	 
	   $("#introLog").text("Aqui estan tus puzzles "+response.name);
	   
	   //Cargamos el nombre de los puzzles asociados al usuario
	   
	   var r=	$.ajax({    data:{"id":id},      
	                url:'php/getPuzzles.php', 
					type:"POST", async:false
					
						        }).responseText;
								
	var result = JSON.parse(r);
	 //Limpiamos las puzzles anteriores
		 $('#piezas').empty();
	 for(var i=0;i<result.length;i++){
		console.log( result[i].nombre);
		
		 
		  	var texto="<div  class='introTxt' onclick='srchPzz("+result[i].id+")'> <p >"+result[i].nombre+"</p>";
	 		$('#puzzles').append(texto);
		  
	 }
	 
	   
	   
	   
    });
  }
  
  //Funcion para busqueda de puzzles
// num-> el numero del puzzle a buscar

function srchPzz(num){	
	
	alert(num);
		 
	var r=$.ajax({
	                data:{"id":num},
	                url:   'php/getPiezasPuzzle.php', 
					type:"POST",
					async:false
					
						        }).responseText;
							 
		var result = JSON.parse(r);
		alert(result);
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
			  alert(result[i].texto);
		  	var texto="<div  class='introTxt' onclick='srchPcs("+result[i].id+")'> <p >"+result[i].id+"- "+result[i].texto +"</p>";
	 		$('#piezas').append(texto);
		  }
		  
		  
	/* for(var i=0;i<result.length;i++){
		console.log( result[i].nombre);
	 }*/
	
															
}
  
 
  
