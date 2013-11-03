<?php
define("DB_HOST", "mysql.hostinger.es");
define("DB_USER", "u185194903_user");//cambiar por el nombre de usuario definido en la configuracion de la BD.
define("DB_PASSWORD", "puzzBA13");//Modificar por el password elegido
define("DB_DATABASE", "u185194903_puzzlink");//Nombre de la base de datos reemplazar si se utilizo otro diferente al mencionado en el tutorial.
 



$con = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

        mysql_select_db(DB_DATABASE);
        
$result=mysql_query(" SELECT distinct(u.user_name), u.user_id FROM puzzles as p , usuarios as u WHERE u.user_id=p.userID" );



$rows = array();
while($r = mysql_fetch_assoc($result)) {
    $rows[] = $r;
}
echo json_encode($rows);



 
?>