<?php
define("DB_HOST", "mysql.hostinger.es");
define("DB_USER", "u185194903_user");//cambiar por el nombre de usuario definido en la configuracion de la BD.
define("DB_PASSWORD", "puzzBA13");//Modificar por el password elegido
define("DB_DATABASE", "u185194903_puzzlink");//Nombre de la base de datos reemplazar si se utilizo otro diferente al mencionado en el tutorial.
 


$alias =$_POST['alias'];
$id =$_POST['id'];
 
$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
        // selecting database
        mysql_select_db(DB_DATABASE);
        
        
 $result = mysql_query("INSERT INTO usuarios(user_id,user_name) VALUES('$id','$alias')");

	/*como el usuario debe ser unico cuenta el numero de ocurrencias con esos datos*/

     echo json_encode($result);   
		/*if ($result){
		
 		
				$resultado[]=array("result"=>"1");
		
		}else{
			$resultado[]=array("result"=>"0");
		}  
        
     echo json_encode($resultado);   */
?>