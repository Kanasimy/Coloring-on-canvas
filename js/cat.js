/**
 * Created by uzich on 07.05.14.
 */
jQuery( function($) {
    $('.cat').click(
        function() {
            var h=-20;
            var hMax = $('#box')[0].clientWidth;
            var v=-20;
            var vMax = $('#box')[0].clientHeight;

            $('.text').append('В бой!');
            $(document).keydown(
                function(event){
                   var key = event.which;
                    //console.log(key);

                switch(key)
                {
                    case 38:
                        v-=10;
                        break
                    case 39:
                        h+=10;
                        break
                    case 40:
                       v+=10;
                        break
                    case 37:
                        h-=10;
                }
                    console.log('ширина '+vMax+' Позиция '+$('.cat')[0].offsetLeft);
                    if($('.cat')[0].offsetTop>15&&$('.cat')[0].offsetTop<vMax-45&&$('.cat')[0].offsetLeft>15&&$('.cat')[0].offsetLeft<hMax-45)
                    {$('.cat').stop().animate({marginLeft:h, marginTop:v}, 300)}
                }
            )

        }
    );
    }
);