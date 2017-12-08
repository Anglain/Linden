$(function () {
    //це некрасиво, просто прототипчик, щоб працювала менюшка - переробити на файно
    var menu = false;
   $(".open-close-menu-button").click(function () {
       if(menu){
           $(".left-menu-panel").width(0);
           menu = false;
       }else{
           $(".left-menu-panel").width(300);
           menu = true;
       }
   });
});