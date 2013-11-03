<?php
define("DB_HOST", "mysql.hostinger.es");
define("DB_USER", "u185194903_user");//cambiar por el nombre de usuario definido en la configuracion de la BD.
define("DB_PASSWORD", "puzzBA13");//Modificar por el password elegido
define("DB_DATABASE", "u185194903_puzzlink");//Nombre de la base de datos reemplazar si se utilizo otro diferente al mencionado en el tutorial.
 


$nombre =$_POST['nombre'];
$usuario =$_POST['usuario'];
 
$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
        // selecting database
        mysql_select_db(DB_DATABASE);
        
        
 $result = mysql_query("INSERT INTO puzzles(nombre,userID) VALUES('$nombre','$usuario')");


	/*como el usuario debe ser unico cuenta el numero de ocurrencias con esos datos*/

	if ($result){
		
 		
				$resultado[]=array("insert"=>"1");
		
		}else{
			$resultado[]=array("insert"=>"0");
		}  
        
     echo json_encode($resultado);  
?>