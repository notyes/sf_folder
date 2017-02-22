<?php
function URL($href, $title){
	return '<a href="'.$href.'" title="'.strip_tags($title).'" itemprop="url"><span itemprop="name">'.$title.'</span></a>';
}
?>