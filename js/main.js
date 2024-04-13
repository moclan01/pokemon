/**
 * Nguyễn Bính
 * 21130286 - DH21DTA
 */

const images = [
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
var rowGameBoard = 18;
var colGameBoard = 22;
let urlImage = './image/pokemon';
let extensionImage = '.png';

const container = document.getElementById('#container');
const scoreMain = document.getElementById('#score-main');
let score = document.getElementById('#score');
const levelMain = document.getElementById('#level-main');
let level = document.getElementById('#level');
const shuffleMain = document.getElementById('#shuffle-main');
let shuffle = document.getElementById('#shuffle');
const timeMain = document.getElementById('#time-main');
let time = document.getElementById('#time');
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
    let arrBoard = Array.from({ length: row }, () => Array.from({ length: col }, () => 0));
    let boardHtml = "";
    $('#level').text(playerData.currentLevel);
    $('#score').text(playerData.score);
    $('#time').text(playerData.timeIndex);
    $('#shuffle').text(playerData.shuffle);

    //tạo các button chứa hình ảnh pokemon trong ma trận
    for (var i = 0; i < arrBoard.length; i++) {
        if (i !== 0 && i !== (arrBoard.length - 1)) {
            boardHtml += "<div class=\"row-board\">";
            for (var j = 0; j < arrBoard[i].length; j++) {
                if (j !== 0 && j !== (arrBoard.length - 1)) {
                    arrBoard[i][j] = 1;
                    boardHtml += "<button id=\"btn" + i + '-' + j + "\" class=\"board-item\" x=" + i + " y=" + j + "></button>";
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

    while (Items.length > 0) {
        randomImages(Items, arrImage);
    }
    // console.log(Items.length);

    console.log(arrBoard[0].length);
    console.log(arrBoard.length);
    return arrBoard;
};

//random ảnh 
function randomImages(Items, arrImage) {

    let randomIndex1 = Items[Math.floor(Math.random() * Items.length)];
    let randomIndex2 = Items[Math.floor(Math.random() * Items.length)];
    if (randomIndex1 !== randomIndex2) {
        //ảnh 1
        let randomImagesX1 = randomIndex1.x;
        let randomImagesY1 = randomIndex1.y;
        //tìm vị trí của tọa độ tấm ảnh có tồn tại trong Items không? 
        let index1 = Items.findIndex(obj => (obj.x === randomImagesX1 && obj.y === randomImagesY1));
        if (index1 !== -1) {
            Items.splice(index1, 1);
        }
        console.log('ảnh 1: ', randomImagesX1, randomImagesY1);

        //ảnh 2
        let randomImagesX2 = randomIndex2.x;
        let randomImagesY2 = randomIndex2.y;
        //tìm vị trí của tọa độ tấm ảnh có tồn tại trong Items không? 
        let index2 = Items.findIndex(obj => (obj.x === randomImagesX2 && obj.y === randomImagesY2));
        if (index2 !== -1) {
            Items.splice(index2, 1);
        }
        console.log('ảnh 2:', randomImagesX2, randomImagesY2);

        //tải ảnh vào các ô trống
        let img = arrImage[Math.floor(Math.random() * arrImage.length)];
        $(`#btn${randomImagesX1}-${randomImagesY1}`).css("background-image", `url(${img})`);
        $(`#btn${randomImagesX2}-${randomImagesY2}`).css("background-image", `url(${img})`);
    }

};

//load ảnh
function loadImage() {
    var arrImg = [];
    for (var i = 0; i < images.length; i++) {
        arrImg.push(images[i]);
    }
    return arrImg;
};

let arrBoard = createGameBoard(rowGameBoard, colGameBoard);

//kiểm tra 2 hình xem có ăn được hay không?
function checkTwoPoint(x1, y1, x2, y2) {
    //kiểm tra 1 đường
    //kiểm tra 2 hình cùng 1 hàng ngang 
    function check1LineRow(x, y1, y2) {
        //lấy vị trí đầu và cuối của 2 ô trong 1 hàng
        let beginRow = Math.min(y1, y2);
        let endRow = Math.max(y1, y2);
        //kiểm tra 2 ô liền kề
        if ((endRow - beginRow) === 1) {
            return true;
        }
        //kiểm tra giữa 2 ô được chọn
        for (var i = beginRow + 1; i < endRow; i++) {
            if (arrBoard[x][i] !== 0) {
                return false;
            }
        }

        return true;
    };

    //kiểm tra 2 hình cùng 1 hàng dọc 
    function check1LineCol(x1, x2, y) {
        //lấy vị trí đầu và cuối của 2 ô trong 1 hàng
        let beginCol = Math.min(x1, x2);
        let endCol = Math.max(x1, x2);
        //kiểm tra giữa 2 ô được chọn
        for (var i = beginCol + 1; i < endCol; i++) {
            if (arrBoard[i][y] != 0) {
                return false;
            }
        }
        if ((endCol - beginCol) === 1) {
            return true;
        }
        return true;
    };

    //kiểm tra 2 đường (chữ L)
    function check2Line(x1, y1, x2, y2) {
        //kiểm tra theo chiều dọc
        //kiểm tra góc quẹo ở cột
        //vd: ảnh 1(1,1) -> ảnh 2(2,3): sẽ đi qua lần lượt các điểm (2,1), (2,2) (giống chữ L nằm dọc)
        function check2LineCol(x1, x2, y1, y2) {
            //đặt điểm p1 là điểm nhỏ nhất,  điểm p2 là lớn nhất 
            let pMinY = { x: x1, y: y1 };
            let pMaxY = { x: x2, y: y2 };
            //ngược lại, đổi vị trí 2 điểm cho nhau
            if (y1 > y2) {
                pMinY = { x: x2, y: y2 };
                pMaxY = { x: x1, y: y1 };
            }
            for (var i = pMinY.y; i <= pMaxY.y; i++) {
                if (i > pMinY.y && arrBoard[pMinY.x][i] !== 0) {
                    return false;
                }

                //kiểm tra đường đi của 2 hàng
                if (
                    (arrBoard[pMaxY.x][i] === 0)
                    && check1LineCol(pMinY.x, pMaxY.x, i)
                    && check1LineRow(pMaxY.x, i, pMaxY.y)
                ) {
                    return true;
                }
            }
            return false;
        }

        //kiểm tra theo chiều ngang
        //kiểm tra góc quẹo ở hàng
        //vd: ảnh 1(1,1) -> ảnh 2(2,3): sẽ đi qua lần lượt các điểm (1,2), (1,3) (giống chữ L nằm ngang)
        function check2LineRow(x1, x2, y1, y2) {
            let pMinX = { x: x1, y: y1 };
            let pMaxX = { x: x2, y: y2 };
            //ngược lại, đổi vị trí 2 điểm cho nhau
            if (x1 > x2) {
                pMinX = { x: x2, y: y2 };
                pMaxX = { x: x1, y: y1 };
            }
            for (var i = pMinX.x; i <= pMaxX.x; i++) {
                if (i > pMinX.x && arrBoard[i][pMinX.y] != 0) {
                    return false;
                }
                //kiểm tra đường đi của 2 hàng
                if (
                    (arrBoard[i][pMaxX.y] === 0)
                    && check1LineRow(i, pMinX.y, pMaxX.y)
                    && check1LineCol(i, pMaxX.x, pMaxX.y)
                ) {
                    return true;
                }
            }
            return false;
        }
        return check2LineRow(x1, x2, y1, y2)
            || check2LineCol(x1, x2, y1, y2);
    };

    //Kiểm tra 3 đường (chữ U,chữ Z)
    function check3Line(x1, x2, y1, y2) {
        //kiểm tra theo chiều ngang
        function check3LineRow(x1, x2, y1, y2, index) {
            let pMinY = { x: x1, y: y1 };
            let pMaxY = { x: x2, y: y2 };
            //ngược lại, đổi vị trí 2 điểm cho nhau
            if (y1 > y2) {
                pMinY = { x: x2, y: y2 };
                pMaxY = { x: x1, y: y1 };
            }

            //ảnh 1 trên, ảnh 2 dưới
            let beginRow = pMinY.x;
            // cột sẽ dịch dần từ trái qua phải nếu index = 1, lùi lại nếu index = -1
            let col = pMinY.y + index;
            let endCol = pMaxY.y;
            let endRow = pMaxY.x;
            if (index === -1) {
                beginRow = pMaxY.x;
                col = pMaxY.y + index;
                endCol = pMinY.y;
                endRow = pMinY.x;
            }
            //ra được chữ Z dọc lẫn ngang ??????
            if ((arrBoard[beginRow][col] === 0 || pMinY.y === pMaxY.y) && check1LineRow(beginRow,col,endCol)) {
                while(arrBoard[beginRow][col] === 0 && arrBoard[endRow][col] === 0){
                    if(check1LineCol(beginRow,endRow,col)){
                        return true;
                    }
                    col += index;
                }

            }
            return false;
        };


        function check3LineCol(x1, x2, y1, y2, index) {

        };
        return check3LineRow(x1, x2, y1, y2, 1)
            || check3LineRow(x1, x2, y1, y2, -1)
            || check3LineCol(x1, x2, y1, y2, 1)
            || check3LineCol(x1, x2, y1, y2, -1);
    }

    //kiểm tra vị trí của 2 ảnh
    if (x1 === x2 && y1 !== y2 && arrBoard[x1][y1] === arrBoard[x2][y2]) {
        return check1LineRow(x1, y1, y2);
    } else if (y1 === y2 && x1 !== x2 && arrBoard[x1][y1] === arrBoard[x2][y2]) {
        return check1LineCol(x1, x2, y1);
    } else {
        return check2Line(x1, y1, x2, y2)
            || check3Line(x1, y1, x2, y2);
    }
};



// xử lý sự kiện bấm
function handleClick() {
    let itemSelecting = null;
    let itemCurrent = null;
    $('.board-item').click(function () {
        if (itemSelecting === null) {
            //chọn hình đầu tiên
            $(this).addClass('selecting');
            //lấy tọa độ hình được chọn
            x1 = parseInt($(this).attr("x"));
            y1 = parseInt($(this).attr("y"));
            console.log(`${x1} , ${y1}`);
            console.log("abc");

            //lấy các thuộc tính của hình được chọn đầu tiên
            //set chỉ được chọn 1 cái
            itemSelecting = $(this);
            console.log(itemSelecting);
        } else {
            // chọn hình thứ 2
            itemCurrent = $(this);
            //lấy tọa độ hình thứ 2
            x2 = Number($(this).attr("x"));
            y2 = Number($(this).attr("y"));

            //kiểm tra
            checkRoadBetweenTwoImages(itemSelecting, itemCurrent, x1, y1, x2, y2);

            // sau khi kết thúc 1 cặp thì setting lại các giá trị cần
            $(itemSelecting).removeClass("selecting");
            itemSelecting = null;
            itemCurrent = null;
            x1 = -1;
            y1 = -1;
        }

    });
};

//kiểm tra đường ăn giữa 2 hình
function checkRoadBetweenTwoImages(itemSelecting, itemCurrent, x1, y1, x2, y2) {
    //kiểm tra 2 hình có giống nhau
    if (itemSelecting.css("background-image") === itemCurrent.css("background-image")) {
        //kiểm tra đường đi
        if (checkTwoPoint(x1, y1, x2, y2)) {
            //xóa 2 ảnh
            $(itemSelecting).css("background-image", "none");
            $(itemCurrent).css("background-image", "none");

            //set giá trị 2 ô được ăn về 0
            arrBoard[x1][y1] = 0;
            arrBoard[x2][y2] = 0;
            console.log(arrBoard);
        } else {
            selectFalse()
        }
    } else {
        selectFalse()
    }
};

//lựa chọn sai sẽ bị trừ điểm và thời gian
function selectFalse() {

}

handleClick();
