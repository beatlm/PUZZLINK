var altaOk="Enhorabuena, se ha dado de alta su pieza con ID: ";
var altaKo="No se ha podido dar de alta la pieza, por favor vuelve a intentarlo.";



/* Funcion para busqueda de piezas
   num-> el numero de la pieza a buscar
   Si no se pasa num, se busca por palabra 
   
   
   
   
   RETURN: El json con las piezas encontradas */
function searchPieces(num){
mostrarCarga();

	if(isLocalStorageAvailable()){
		localStorage.pieza=num;	 
	}
	
	if(!num){//No se pasa el numero de pieza-->Busqueda por palabra

				var	r=$.ajax({ data:{"texto":$("#buscarTerm").val()},
				url:'../php/getPiezaText.php', 
				type:"POST",async:false}).responseText;	
	
	}else{//Busqueda por número
	
	var	r=$.ajax({data:{"id":num},
	        url:'../php/getPiezaId.php', 
			type:"POST",async:false
			}).responseText;			
	}

	if(typeof r == "undefined"){
		showPopupAceptar("Ha ocurrido un error y no se han podido cargar las piezas, inténtalo más tarde.");
		trace("linea 37");
	
	}else{
		var result = JSON.parse(r);	
		return result;	
	}												
}


 /* Funcion que devuelve el id de la ultima pieza en BBDD*/
 function getLastPiece(){ 
	var r=	$.ajax({url:'../php/getId.php', 
					type:"POST", async:false}).responseText;		
	if(typeof r == "undefined"){
		showPopupAceptar("Ha habido un error, por favor vuelve a intentarlo.");
	}else{					
		var result = JSON.parse(r);	 
		return result[0].id;	
	}	
 }
 
 function searchNextPiece(next){
	mostrarCarga();

	var pieza=$("#contentPieza").html().substring(0,$("#contentPieza").html().indexOf("-",0));
	var ultima=getLastPiece();;

	if(next){
		if(pieza==ultima){
			pieza=1;
		}else{
			pieza=Number(pieza)+Number(1);
		}
	}else{
		if(pieza=="1"){
			pieza=ultima;
		}else{
			pieza=Number(pieza)-Number(1);
		}
	}

	showPieces(searchPieces(pieza));
 }
 
 /* Funcion que muestra la pantalla de nueva pieza*/

function showNewPiece(){
	$("#contentPieza").hide();
	$("#newPieza").show();
	$("#pieza").show();
	$("#btnLeft").hide();
	$("#btnRight").hide();
	$("#btnLeftM").hide();
	$("#btnRightM").hide();
	//$("#textoPieza").val("Introduce aqu&iacute; el contenido de tu pieza..."); 
}

/* Funcion que da de alta una pieza */
function uploadPiece(){
	var texto=document.getElementById("textoPieza").value;
	console.log("upLoadpiece");
	$.ajax({data:{"texto":texto},
	        url:   '../php/newFicha.php', 
			type:"POST",
			error:errorAlta
			});
	var last=getLastPiece();
		console.log("last "+last);
	searchPieces(last);
	showPopupAceptar(altaOk+last);
}

function errorAlta(){
	showPopupAceptar(altaKo);	
}
 
 function isLocalStorageAvailable() {
    try {
	localStorage.test="prueba";
	 
        return true
    } catch (e) {
        return false;
    }
}