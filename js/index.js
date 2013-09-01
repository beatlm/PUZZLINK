
$(document).ready(function(){ 
	$(".content2").hide();
	$("#detallePieza").hide();
	  $("#newPieza").hide();
	  	$("#fondo").hide();
		$("#buscar").hide();
});

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
		$("#menu0").css("background-color","lightgray");
	break;
	case(1):
		$("#cPiezas").show();
		$("#menu1").css("background-color","lightgray");
	break;
	case (2):
		$("#contenidoF").show("slow");
		$("#menu2").css("background-color","lightgray");
	break;
	case(3):
		$("#contenidoA").show("slow");
		$("#menu3").css("background-color","lightgray");
	break;
	case(4):
		$("#contenidoH").show("slow");
		$("#menu4").css("background-color","lightgray");
	break;
	case(5):
		$("#contenidoH").show("slow");
		$("#menu5").css("background-color","lightgray");
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
	}
	srchPcs(final);
 }

function showPopup(){
		$("#fondo").show();
		$("#buscar").show();
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
         
		 document.getElementById("contentPieza").innerHTML=result[0].id+"- "+result[0].texto;
		//  document.getElementById("idPieza").innerHTML=result[0].id;
		  
	$("#detallePieza").show();
	  $("#newPieza").hide();
		
	  }
}
function getId(r){
	alert("obtenemos id" +r[0].id);
	return r[0].id;
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
	var id="";
		$.ajax({
	                
	                url:   'php/getId.php', 
					type:"POST",
					success:id=getId,
						        });
		//Lanzamos la consulta
	$.ajax({
	                data:{"texto":texto,"id":id},
	                url:   'php/newFicha.php', 
					type:"POST",
					success:okPiezas,
						        });
								
	$("#newPieza").show();
	$("#detallePieza").hide();
	
	//Lanzar llamada a BBDD para determinar el id y establecerlo en la pantalla
	document.getElementById("idPiezaNew").innerHTML=2013;
}
