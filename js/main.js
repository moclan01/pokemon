const image = [
    "image/pokemon0.png",
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
    "image/pokemon32.png"
];

const arrTime = [10000, 9000, 8000, 7000, 6000, 5000];
const arrShuffle = [30, 25, 20, 15, 15, 10];
const arrLevel = [1, 2, 3, 4, 5, 6]
var disapper = false;
var rowGameBoard = 17;
var colGameBoard = 21;
let urlImage = 'image/pokemon';
let extensionImage = '.png';

const container = document.getElementById('#container');
const scoreMain = document.getElementById('#score-main');
let score = document.getElementById('#score');
const levelMain = document.getElementById('#level-main');
let level = document.getElementById('#level');
const shuffleMain = document.getElementById('#shuffle-main');
let shuffle = document.getElementById('#shuffle');
const board = document.getElementById('#game-board');

//dữ liệu người chơi
let playerData = {
    score: 0,
    currentLevel: arrLevel[0],
    maxLevel: arrLevel[arrLevel.length - 1],
    timeIndex: arrTime[0],
    win: false,
    shuffle: arrShuffle[0]
};

//tạo bảng game
function createGameBoard(row, col) {
    let arrImage = loadImage();
    let Items = new Array();
    //tạo mảng với giá trị các ô là 0
    let arrBoard = Array.from({ length: row + 1}, () => Array.from({ length: col + 1 }, () => 0));
    let boardHtml = "";
    $('#level').text(playerData.currentLevel);

    for (var i = 0; i < arrBoard.length; i++) {
        if (i !== 0 && i !== (arrBoard.length - 1)) {
            boardHtml += "<div class=\"row-board\">";
            for (var j = 0; j < arrBoard[i].length; j++) {
                if (j !== 0 && j !== (arrBoard.length - 1)) {
                    arrBoard[i][j] = 1;
                    boardHtml += "<button id=\"btn" + i + '-' + j + "\" class=\"board-item\" x=" + i + " \"y=" + j + "></button>";
                    Items.push({
                        x: i,
                        y: j
                    });

                }
            }
            boardHtml += "</div>";

        }
    }
    document.querySelector('#game-board').innerHTML += boardHtml;
};

createGameBoard(rowGameBoard, colGameBoard);

//load ảnh
function loadImage() {
    var arrImg = [];
    for (var i = 0; i < image.length; i++) {
        arrImg.push(image[i]);
    }
    return arrImg;
};
