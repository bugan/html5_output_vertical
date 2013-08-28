<?php   
	 /* pega o endereço do diretório
		Caso o Bugan queira o diretorio local*/  	
    get('./');

	 /*Caso o Bugan tenha o diretorio fixo*/
	 
function get($diretorio){

	// echo $diretorio . "<br>x<br>x<br><br>";
	 
     	/* abre o diretório */

	$dir  = opendir($diretorio);
	/* monta um array com o itens dentro da pasta */
     //while (false !==($todos = readdir($dir))) {

	while (false !== $arquivo = readdir($dir)) {
	   if($arquivo != '.' && $arquivo != '..'){
			//echo '<br><br><br> arquivo -> ' .$arquivo;
            if (is_dir($diretorio.'\\'.$arquivo)) {
                
                get($diretorio."\\".$arquivo );
            }else{
				$origem = str_replace("./", "", $diretorio);
                $origem = str_replace("\\", "/", $diretorio);
                
                echo ($origem).'/'.$arquivo.'<br />';
            }
        }
	}

	/* percorre todo o array para verificar se são arquivos ou pastas */

 }

?>