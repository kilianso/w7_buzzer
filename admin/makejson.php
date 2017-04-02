<?php
   $json = $_POST['json'];

   /* sanity check */
   if (json_decode($json) != null)
   {
     $file = fopen('data.json','w+');
     fwrite($file, $json);
     fclose($file);
   }
   else
   {
	 	echo "Object Not Received";
   }
?>
