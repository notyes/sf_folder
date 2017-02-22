    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.js"></script>
    <script src="js/jquery.cookie.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="<?=BASEJSURL?>/bootstrap-select.min.js"></script>
    <script src="js/custom.js"></script>

    <!--Facebook button count-->
    <div id="fb-root"></div>
    <script>
	(function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    </script>
    
	<script>   
         //Fix z-index youtube video embedding
        $(document).ready(function (){
            $('iframe').each(function(){
                var url = $(this).attr("src");
                $(this).attr("src",url+"?wmode=transparent");
            });
        });
    </script>