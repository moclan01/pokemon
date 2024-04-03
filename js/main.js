const image = [
    "image/pokemon1.png",
    "image/pokemon2.png",
    "image/pokemon3.png",
    "image/pokemon4.png",
    "image/pokemon5.png",
    "image/pokemon6.png",
    "image/pokemon7.png",
    "image/pokemon8.png",
    "image/pokemon9.png",
    "image/pokemon10.png",
    "image/pokemon11.png",
    "image/pokemon12.png",
    "image/pokemon13.png",
    "image/pokemon14.png",
    "image/pokemon15.png",
    "image/pokemon16.png",
    "image/pokemon17.png",
    "image/pokemon18.png",
    "image/pokemon19.png",
    "image/pokemon20.png",
    "image/pokemon21.png",
    "image/pokemon22.png",
    "image/pokemon23.png",
    "image/pokemon24.png",
    "image/pokemon25.png",
    "image/pokemon26.png",
    "image/pokemon27.png",
    "image/pokemon28.png",
    "image/pokemon29.png",
    "image/pokemon30.png",
    "image/pokemon31.png",
    "image/pokemon32.png",
    "image/pokemon33.png"
];

//board
var size = 11;
$(document).ready(function board() {
    var matrixHtml = '<table boder="1">';
    for (var i = 0; i < size; i++) {
        matrixHtml += '<tr>';
        for (var j = 0; j < size; j++) {
            if (i === 0 || i === (size - 1) || j === 0 || j === (size - 1)) {
                matrixHtml += '<td class="boder">' + '(' + (i + 1) + ',' + (j + 1) + ')</td>';
            }else{
                matrixHtml += '<td class="inner-part">' + '(' + (i + 1) + ',' + (j + 1) + ')</td>';
            }
        }
        matrixHtml += '</tr>'
    }
    matrixHtml += '</table>';
    $('#board').html(matrixHtml);
});
