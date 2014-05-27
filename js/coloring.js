/**
 * Created by uzich on 05.05.14.
 */

(function( $ ) {

// Создаем плагин
    jQuery.fn.coloring = function(options) {

         var defaultOptions = {
            width: 600,
            height: 600,
            lineWidth: 3,
            canvasId: this,
            toolbar: '#toolbar',
            clickMode: 'paint',
            color: '#000000',
            lineColor: '#000000'
        }




        var o = $.extend(defaultOptions,options);
        var ctx   = o.canvasId[0].getContext('2d');
//Выбираем действие
        $(o.toolbar+' li a').click(
            function () {
                o.clickMode = $(this).attr('href').slice(1);
                return false;
            }
        );

//Начальные значения при рисовании
        var mouseDown = false;
        var lastPoint = {x: 0, y: 0};
        ctx.lineWidth = o.lineWidth;
// Рисование
        function paint(){
            o.canvasId.mousedown(function(event) {
                    mouseDown = true;
                    lastPoint.x = event.offsetX;
                    lastPoint.y = event.offsetY;
                }
            ).mousemove(function(event){
                    if (mouseDown)
                    {
                        this.style.cursor='default';

                        ctx.beginPath();
                        ctx.moveTo(lastPoint.x, lastPoint.y);
                        ctx.lineTo(event.offsetX, event.offsetY);
                        ctx.stroke();

                        lastPoint.x = event.offsetX;
                        lastPoint.y = event.offsetY;
                    }
                }).mouseup(function(){
                    mouseDown = false;
                    return false
                });
        };
// Раскрашивание
        function floodFill(color, borderColor){
            $(o.canvasId).click(
                function(event) {
                    console.log('Закрашиваем');

                   var x = event.offsetX;
                   var y = event.offsetY;

                    var imageData = ctx.getImageData(0, 0, o.width, o.height);
                    var width = imageData.width;
                    var height = imageData.height;
                    var stack = [[x,y]];
                    var pixel;
                    var point = 0;
                    console.log(width+' - ширина'+height+' - высота'+stack+' - координаты');

                    while (stack.length > 0)
                    {
                        //извлекаем последний элемент массива(из массива его удаляем)
                        pixel = stack.pop();
                        if (pixel[0] < 0 || pixel[0] >= width)
                            continue;
                        if (pixel[1] < 0 || pixel[1] >= height)
                            continue;

                        // Alpha
                        point = pixel[1] * 4 * width + pixel[0] * 4 + 3;

                        // Если это не рамка и ещё не закрасили
                        if (imageData.data[point] != borderColor && imageData.data[point] != color)
                        {
                            // Закрашиваем
                            imageData.data[point] = color;

                            // Ставим соседей в стек на проверку
                            stack.push([
                                pixel[0] - 1,
                                pixel[1]
                            ]);
                            stack.push([
                                pixel[0] + 1,
                                pixel[1]
                            ]);
                            stack.push([
                                pixel[0],
                                pixel[1] - 1
                            ]);
                            stack.push([
                                pixel[0],
                                pixel[1] + 1
                            ]);
                        }
                    }

                    ctx.putImageData(imageData, 0, 0);
                }
            );

        }
// Стирание
        function clear() {
            $(o.canvasId).click(
                function () {
                    ctx.clearRect(0, 0, o.width, o.height);
                }
            );

        };
//Инициализация


    $(o.canvasId).hover(
        function () {
            console.log(o.clickMode);
//Убираем обработчики с события click
            $(o.canvasId).unbind('click');
            $(o.canvasId).unbind('mousedown');
            $(o.canvasId).unbind('mouseup');
            $(o.canvasId).unbind('mousemove');
//Добавляем обработчики
            switch(o.clickMode)
            {
                case "fill":
                    floodFill(o.color, o.lineColor);
                    break;
                case "clear":
                    clear();
                    break;
                case "paint":
                    paint();
                    break;
            }
        }
    );
    };

})(jQuery);