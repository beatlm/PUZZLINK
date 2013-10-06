
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
	 
	 
 }