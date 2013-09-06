
$(document).ready(function(){ 
	$(".content2").hide();
	$("#detallePieza").hide();
	  $("#newPieza").hide();
	  	$("#fondo").hide();
		$("#buscar").hide();
		$("#menu0").css("background-color","orange");
				$("#popupAlta").hide();
});


//Funcion para mostrar la seleccion de in boton onclick
function mostrar(id){
	$(".content2").hide();
	$("#cMain").hide();
		 
	
	$("#menu0").css("background-color","transparent");
	$("#menu1").css("background-color","transparent");
	$("#menu2").css("background-color","transparent");
	$("#menu3").css("background-color","transparent");
	$("#menu4").css("background-color","transparent");
	 
	
	
	switch(id){
	case(0):
		$("#cMain").show();
		$("#menu0").css("background-color","orange");
	break;
	case(1):
		$("#cPiezas").show();
		$("#menu1").css("background-color","orange");
		srchPcs(2172);//Buscamos la pieza de ejemplo
	break;
	case (2):
		$("#contenidoF").show();
		$("#menu2").css("background-color","orange");
	break;
	case(3):
		$("#contenidoA").show("slow");
		$("#menu3").css("background-color","orange");
	break;
	case(4):
		$("#contenidoH").show("slow");
		$("#menu4").css("background-color","orange");
	break;
	case(5):
		$("#contenidoH").show("slow");
		$("#menu5").css("background-color","orange");
	break;
	case(6)://Pantalla gris
		$("#gris").show("slow");
		//$("#menu5").css("background-color","lightgray");
	break;
	}
}

//Funcion para mostrar la seleccion de in boton onmouseover

function seleccionar(id){
	//$(".content2").hide();
	//$("#cMain").hide();
		 
	
	deseleccionar(5);//Deseleccionamos todos
	 
	//HACERLO DINAMICO
	
	switch(id){
	case(0):
	 if($("#menu0").css("background-color")=="transparent"){
		$("#menu0").css("background-color","#FC9");}
	break;
	case(1):
	 
	  if($("#menu1").css("background-color") =="transparent"){
		$("#menu1").css("background-color","#FC9");
	  }
	 
	break;
	case (2):
	  if($("#menu2").css("background-color")=="transparent"){
		$("#menu2").css("background-color","#FC9");
	  }
	break;
	case(3):
		  if($("#menu3").css("background-color")=="transparent"){
		$("#menu3").css("background-color","#FC9");
		  }
	break;
	case(4):
	  if($("#menu4").css("background-color")=="transparent"){
			$("#menu4").css("background-color","#FC9");}
	break;
	case(5):
	  if($("#menu5").css("background-color")=="transparent"){
			$("#menu5").css("background-color","#FC9");
	  }
	break;
	}
	 
}

function deseleccionar(id){
	
	switch(id){
		case (0):

	 if($("#menu0").css("background-color")=="#FC9"){
	$("#menu0").css("background-color","transparent");
	 }
	 break;
	 
	 case(1):
	  if($("#menu1").css("background-color") =="#FC9"){
	$("#menu1").css("background-color","transparent");
	  }
	  break;
	  
	  case(2):
	   if($("#menu2").css("background-color")=="#FC9"){
	$("#menu2").css("background-color","transparent");
	   }
	   break;
	   case(3):
	    if($("#menu3").css("background-color")=="#FC9"){
	$("#menu3").css("background-color","transparent");
		} 
		break;
		case(4):
		if($("#menu4").css("background-color")=="#FC9"){
	$("#menu4").css("background-color","transparent");
		}
		case(5):
		$("#menu0").css("background-color","transparent");
		$("#menu1").css("background-color","transparent");
		$("#menu2").css("background-color","transparent");
		$("#menu3").css("background-color","transparent");
		$("#menu4").css("background-color","transparent");
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
	}
	srchPcs(final);
 }




function srchPcs(num){	
	
	if(!num){
	 num=document.getElementById("buscarID").value;
	}
	
	//Lanzamos la consulta
	$.ajax({
	                data:{"id":num},
	                url:   'php/getPiezaId.php', 
					type:"POST",
					success:okPiezas,
						        });
								$("#fondo").hide();
		$("#buscar").hide();
															
}

function srchPcsTxt(){
	var id=document.getElementById("buscarTexto").value;
	
	//Lanzamos la consulta
	$.ajax({
	                data:{"texto":id},
	                url:   'php/getPiezaText.php', 
					type:"POST",
					success:okPiezas,
						        });
								
}



function okPiezas(restrs){
	
	var result = JSON.parse(restrs);

	 if (result.length <= 0){
       alert("No hay piezas con esos criterios");
      }

      else{
         	  
	//$("#detallePieza").show();
	$("#contentPieza").show();
	$("#btnLeft").show();
	$("#btnRight").show();
	  $("#newPieza").hide();
		 document.getElementById("contentPieza").innerHTML=result[0].id+"- "+result[0].texto;
	
	  }
}


function okNewPieza(){

		$.ajax({           
	                url:'php/getId.php', 
					type:"POST",
					success:getId,
						        });
								
	
}


function getId(r){
	var result = JSON.parse(r);
	 
	srchPcs(result[0].id);
	
	showPopupId(result[0].id);
 
}

function newPieza(){
	$("#contentPieza").hide();
	$("#newPieza").show();
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
		$("#buscarID").show();
		$("#buscarTerm").hide();}
		else{
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