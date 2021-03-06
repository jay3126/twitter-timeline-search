$(function() {
   $("form#load-tweets-form").submit(function(e) {
      $("#message-drawer span").html("Loading tweets. Hang on...");
      $("#message-drawer").show();
      $(this).children(".loading").show();
      $(this).children("#load-tweets-button").disable();
      
      $.ajax({
         url : "loading",
         data : { "user" : $("input#load-tweets-box").val() },
         success : function(success) {
            $(".loading").hide();
            $(this).children("#load-tweets-button").enable();
            if(success == "true") {
               location.href = "/?status=done";
            }
            else {
               $("#message-drawer .message-inside span").html("No such user.");
            }
         }
      });
      
      return false;
   });
   
   $("form#load-tweets-form input#load-tweets-box,#search form input#search-tweets-box").keyup(check_input);
   $("form#load-tweets-form input#load-tweets-box,#search form input#search-tweets-box").click(check_input);
   $("form#load-tweets-form input#load-tweets-box,#search form input#search-tweets-box").dblclick(check_input);
   $("form#load-tweets-form input#load-tweets-box,#search form input#search-tweets-box").blur(check_input);
   
   $("select#category").change(function() {
      if($(this).val() == "1")
         $("div#date-format-info").show();
      else
         $("div#date-format-info").hide();
   });
   
   $(".dismiss").click(function() {
      $("#message-drawer").hide();
      return false;
   });
   
   jQuery.fn.extend({
      disable: function() {
         return $(this).addClass('disabled').attr('disabled', 'disabled');
      },
      enable: function() {
         return $(this).removeClass('disabled').removeAttr('disabled');
      }
   });
   
   $("#content, #main-content").css('min-height', ($(window).height()-60)+"px");
});

function check_input() {
   if($(this).val().length == 0) {
      $(this).siblings("input[type=submit]").disable();
   }
   else {
      $(this).siblings("input[type=submit]").enable();
   }
}
