// /**
//  * Nguyễn Bính
//  * 21130286 - DH21DTA
//  */

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
var rowGameBoard = 14;
var colGameBoard = 16;
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

    $('#level').text(playerData.currentLevel);
    $('#score').text(playerData.score);
    $('#time').text(playerData.timeIndex);
    $('#shuffle').text(playerData.shuffle);

    let arrBoard = Array.from({ length: row }, () => Array.from({ length: col }, () => 0));
    let itemList = new Array();
    let arrImage = loadImage();

    let boardHtml = "";
    //tạo các button chứa hình ảnh pokemon trong ma trận
    for (let i = 1; i < arrBoard.length - 1; i++) {
        if (i !== 0 && i !== (arrBoard.length - 1)) {
            boardHtml += "<div class=\"row-board\">\n";
            for (let j = 1; j < arrBoard[i].length - 1; j++) {
                if (j !== 0 && j !== (arrBoard.length - 1)) {
                    arrBoard[i][j] = 1;
                    boardHtml += "<button id='btn" + i + "-" + j + "' class=\"board-item\" x=" + i + " y=" + j + "></button>\n";
                    itemList.push({ x: i, y: j });
                }
            }
            boardHtml += "</div>\n";
        }
    }
    document.querySelector(".game-board").innerHTML += boardHtml;
    console.log(itemList.length);

    while (itemList.length > 0) {
        randomImages(itemList, arrImage);
    }

    console.log(arrBoard[0].length);
    console.log(arrBoard.length);

    return arrBoard;
}

//random các cặp ảnh vào bảng ma trận
function randomImages(itemList, arrImage) {
    //ảm 1
    let rdImg1 = itemList[Math.floor(Math.random() * itemList.length)];
    let rdX1 = rdImg1.x;
    let rdY1 = rdImg1.y;
    //tìm vị trí của tọa độ tấm ảnh có tồn tại trong Items không? 
    let index1 = itemList.findIndex(obj => (obj.x === rdX1 && obj.y === rdY1));
    if (index1 !== -1) {
        itemList.splice(index1, 1);
    }
    console.log('ảnh 1: ', rdX1, rdY1);

    //ảnh 2
    let rdImg2 = itemList[Math.floor(Math.random() * itemList.length)];
    let rdX2 = rdImg2.x;
    let rdY2 = rdImg2.y;
    //tìm vị trí của tọa độ tấm ảnh có tồn tại trong Items không? 
    let index2 = itemList.findIndex(obj => (obj.x === rdX2 && obj.y === rdY2));
    if (index2 !== -1) {
        itemList.splice(index2, 1);
    }
    console.log('ảnh 2: ', rdX2, rdY2);

    //tải ảnh vào các ô trống
    let img = arrImage[Math.floor(Math.random() * arrImage.length)];
    $(`#btn${rdX1}-${rdY1}`).css("background-image", `url(${img})`);
    $(`#btn${rdX2}-${rdY2}`).css("background-image", `url(${img})`);
}

//load ảnh
function loadImage() {
    var arrImg = [];
    for (var i = 0; i < images.length; i++) {
        arrImg.push(images[i]);
    }
    return arrImg;
};

let arrBoard = createGameBoard(rowGameBoard, colGameBoard);
handleClick();
// xử lý sự kiện bấm
function handleClick() {
    $(".board-item").click(function () {
        if (selectingItem === null) {
            $(this).addClass("selecting");
            selectingItem = $(this)
            x1 = parseInt($(this).attr("x"));
            y1 = parseInt($(this).attr("y"));
        } else {
            let currentItem = $(this)
            let x2 = parseInt($(this).attr("x"));
            let y2 = parseInt($(this).attr("y"));

            //kiểm tra
            checkRoadBetweenTwoImages(selectingItem, currentItem, x1, y1, x2, y2);

            $(selectingItem).removeClass("selecting");
            selectingItem = null;
            x1 = -1;
            y1 = -1;

        }
    })
}
// //kiểm tra đường ăn giữa 2 hình
function checkRoadBetweenTwoImages(selectingItem, currentItem, x1, y1, x2, y2) {
    if (selectingItem.css("background-image") === currentItem.css("background-image")) {
        if (checkTwoPoint(x1, y1, x2, y2)) {
            $(selectingItem).addClass("item-hidden");
            $(selectingItem).attr("disabled", true);
            $(currentItem).addClass("item-hidden");
            $(currentItem).attr("disabled", true);

            arrBoard[x2][y2] = 0;
            arrBoard[x1][y1] = 0;
            playerData.score += 50;
            $("#score").text(playerData.score);

            console.log(arrBoard)
            // moveToLeftSide()
            // checkWinCondition()
        } else chooseFalse()
    } else chooseFalse()
}
// //lựa chọn sai sẽ bị trừ điểm và thời gian
function chooseFalse() {

}

let selectingItem = null
let x1 = -1
let y1 = -1

let timeLeft = playerData.time
let selectingButton = null

//kiểm tra 2 hình xem có ăn được hay không?
function checkTwoPoint(x1, y1, x2, y2) {
    function check1LineRow(y1, y2, x) {
        let min = Math.min(y1, y2)
        let max = Math.max(y1, y2)
        for (let y = min + 1; y < max; y++)
            if (arrBoard[x][y] != 0) // met another one
                return false
        return true
    }

    function check1LineCol(x1, x2, y) {
        let min = Math.min(x1, x2)
        let max = Math.max(x1, x2)
        for (let x = min + 1; x < max; x++)
            if (arrBoard[x][y] != 0)
                return false
        return true
    }

    function check2Line(x1, y1, x2, y2) {
        function check2LineRow(x1, y1, x2, y2) {
            let pMinY = { x: x1, y: y1 }
            let pMaxY = { x: x2, y: y2 }
            if (y1 > y2) {
                pMinY = { x: x2, y: y2 }
                pMaxY = { x: x1, y: y1 }
            }
            for (let y = pMinY.y; y <= pMaxY.y; y++) {
                if (y > pMinY.y && arrBoard[pMinY.x][y] != 0)
                    return false
                if ((arrBoard[pMaxY.x][y] == 0) && check1LineCol(pMinY.x, pMaxY.x, y) && check1LineRow(y, pMaxY.y, pMaxY.x))
                    return true
            }
            return false
        }

        function check2LineCol(x1, y1, x2, y2) {
            let pMinX = { x: x1, y: y1 }
            let pMaxX = { x: x2, y: y2 }
            if (x1 > x2) {
                pMinX = { x: x2, y: y2 }
                pMaxX = { x: x1, y: y1 }
            }
            for (let x = pMinX.x; x <= pMaxX.x; x++) {
                if (x > pMinX.x && arrBoard[x][pMinX.y] != 0)
                    return false
                if ((arrBoard[x][pMaxX.y] == 0) && check1LineRow(pMinX.y, pMaxX.y, x) && check1LineCol(x, pMaxX.x, pMaxX.y))
                    return true
            }
            return false
        }
        return check2LineCol(x1, y1, x2, y2)
            || check2LineRow(x1, y1, x2, y2);
    }

    function check3Line(x1, y1, x2, y2) {
        function check3LineRow(x1, y1, x2, y2, type) {
            let pMinY = { x: x1, y: y1 }
            let pMaxY = { x: x2, y: y2 }
            if (y1 > y2) {
                pMinY = { x: x2, y: y2 }
                pMaxY = { x: x1, y: y1 }
            }
            let y = pMaxY.y + type
            let row = pMinY.x
            let colFinish = pMaxY.y
            if (type == -1) {
                colFinish = pMinY.y
                y = pMinY.y + type
                row = pMaxY.x
            }

            if ((arrBoard[row][colFinish] == 0 || pMinY.y == pMaxY.y) && check1LineRow(pMinY.y, pMaxY.y, row))
                while (arrBoard[pMinY.x][y] == 0 && arrBoard[pMaxY.x][y] == 0) {
                    if (check1LineCol(pMinY.x, pMaxY.x, y))
                        return true
                    y += type
                }
            return false
        }

        function check3LineCol(x1, y1, x2, y2, type) {
            let pMinX = { x: x1, y: y1 }
            let pMaxX = { x: x2, y: y2 }
            if (x1 > x2) {
                pMinX = { x: x2, y: y2 }
                pMaxX = { x: x1, y: y1 }
            }
            let x = pMaxX.x + type
            let col = pMinX.y
            let rowFinish = pMaxX.x
            if (type == -1) {
                rowFinish = pMinX.x
                x = pMinX.x + type
                col = pMaxX.y
            }

            if ((arrBoard[rowFinish][col] == 0 || pMinX.x == pMaxX.x) && check1LineCol(pMinX.x, pMaxX.x, col))
                while (arrBoard[x][pMinX.y] == 0 && arrBoard[x][pMaxX.y] == 0) {
                    if (check1LineRow(pMinX.y, pMaxX.y, x))
                        return true
                    x += type
                }
            return false
        }
        return check3LineCol(x1, y1, x2, y2, 1)
            || check3LineCol(x1, y1, x2, y2, -1)
            || check3LineRow(x1, y1, x2, y2, 1)
            || check3LineRow(x1, y1, x2, y2, -1);
    }

    if (!(x1 === x2 && y1 === y2) && arrBoard[x1][y1] == arrBoard[x2][y2]) {
        if (x1 == x2)
            if (check1LineRow(y1, y2, x1))
                return true
        if (y1 == y2)
            if (check1LineCol(x1, x2, y1))
                return true
        return check2Line(x1, y1, x2, y2)
            || check3Line(x1, y1, x2, y2)
    }
    return false
}

// Đếm ngược thời gian
function countDownTime(time){
    let timer = time;
    const countDownInterval = setInterval(() => {
        timer--;
        console.log(timer);
        if(timer < 0){
            console.log("hết giờ");
            clearInterval(countDownInterval);
        }
    },3000);  
}

//kiểm tra 2 hình xem có ăn được hay không?
// function checkTwoPoint(x1, y1, x2, y2) {
//     function check1LineRow(y1, y2, x) {
//         let min = Math.min(y1, y2)
//         let max = Math.max(y1, y2)
//         for (let y = min + 1; y < max; y++)
//             if (arrBoard[x][y] != 0) // met another one
//                 return false
//         return true
//     }

//     function check1LineCol(x1, x2, y) {
//         let min = Math.min(x1, x2)
//         let max = Math.max(x1, x2)
//         for (let x = min + 1; x < max; x++)
//             if (arrBoard[x][y] != 0)
//                 return false
//         return true
//     }
//     //kiểm tra 2 đường (chữ L)
//     // function check2Line(x1, y1, x2, y2) {
//     //kiểm tra theo chiều dọc
//     //kiểm tra góc quẹo ở cột
//     //vd: ảnh 1(1,1) -> ảnh 2(2,3): sẽ đi qua lần lượt các điểm (2,1), (2,2) (giống chữ L nằm dọc)
//     function check2LineCol(x1, y2, x1, y2) {
//         //đặt điểm p1 là điểm nhỏ nhất,  điểm p2 là lớn nhất
//         let pMinY = { x: x1, y: y1 };
//         let pMaxY = { x: x2, y: y2 };
//         //ngược lại, đổi vị trí 2 điểm cho nhau
//         if (y1 > y2) {
//             pMinY = { x: x2, y: y2 };
//             pMaxY = { x: x1, y: y1 };
//         }

//         for (var i = pMinY.y; i <= pMaxY.y; i++) {
//             if (i > pMinY.y && arrBoard[pMinY.x][i] !== 0) {
//                 return false;
//             }

//             //kiểm tra đường đi của 2 hàng
//             if (
//                 (arrBoard[pMaxY.x][i] === 0)
//                 && check1LineCol(pMinY.x, pMaxY.x, i)
//                 && check1LineRow(pMaxY.x, i, pMaxY.y)
//             ) {
//                 console.log("check2LineCol:" + pMinY + "," + pMaxY);
//                 return true;
//             }
//         }

//         return false;
//     }

//     //kiểm tra theo chiều ngang
//     //kiểm tra góc quẹo ở hàng
//     //vd: ảnh 1(1,1) -> ảnh 2(2,3): sẽ đi qua lần lượt các điểm (1,2), (1,3) (giống chữ L nằm ngang)
//     function check2LineRow(x1, y1, x2, y2) {
//         let pMinX = { x: x1, y: y1 };
//         let pMaxX = { x: x2, y: y2 };
//         //ngược lại, đổi vị trí 2 điểm cho nhau
//         if (x1 > x2) {
//             pMinX = { x: x2, y: y2 };
//             pMaxX = { x: x1, y: y1 };
//         }

//         for (var i = pMinX.x; i <= pMaxX.x; i++) {
//             if (i > pMinX.x && arrBoard[i][pMinX.y] !== 0) {
//                 return false;
//             }
//             //kiểm tra đường đi của 2 hàng
//             if (
//                 (arrBoard[i][pMaxX.y] === 0)
//                 && check1LineRow(i, pMinX.y, pMaxX.y)
//                 && check1LineCol(i, pMaxX.x, pMaxX.y)
//             ) {
//                 console.log("check2LineRow:" + pMinX + "," + pMaxX);
//                 return true;
//             }
//         }

//         return false;
//     }
//     //     return check2LineRow(x1, y1, x2, y2)
//     //         || check2LineCol(x1, y1, x2, y2);
//     // };

//     function check3LineRow(x1, y1, x2, y2, type) {
//         let pMinY = { x: x1, y: y1 }
//         let pMaxY = { x: x2, y: y2 }
//         if (y1 > y2) {
//             pMinY = { x: x2, y: y2 }
//             pMaxY = { x: x1, y: y1 }
//         }
//         let y = pMaxY.y + type
//         let row = pMinY.x
//         let colFinish = pMaxY.y
//         if (type == -1) {
//             colFinish = pMinY.y
//             y = pMinY.y + type
//             row = pMaxY.x
//         }

//         if ((arrBoard[row][colFinish] == 0 || pMinY.y == pMaxY.y) && check1LineRow(pMinY.y, pMaxY.y, row))
//             while (arrBoard[pMinY.x][y] == 0 && arrBoard[pMaxY.x][y] == 0) {
//                 if (check1LineCol(pMinY.x, pMaxY.x, y))
//                     return true
//                 y += type
//             }
//         return false
//     }

//     function check3LineCol(x1, y1, x2, y2, type) {
//         let pMinX = { x: x1, y: y1 }
//         let pMaxX = { x: x2, y: y2 }
//         if (x1 > x2) {
//             pMinX = { x: x2, y: y2 }
//             pMaxX = { x: x1, y: y1 }
//         }
//         let x = pMaxX.x + type
//         let col = pMinX.y
//         let rowFinish = pMaxX.x
//         if (type == -1) {
//             rowFinish = pMinX.x
//             x = pMinX.x + type
//             col = pMaxX.y
//         }

//         if ((arrBoard[rowFinish][col] == 0 || pMinX.x == pMaxX.x) && check1LineCol(pMinX.x, pMaxX.x, col))
//             while (arrBoard[x][pMinX.y] == 0 && arrBoard[x][pMaxX.y] == 0) {
//                 if (check1LineRow(pMinX.y, pMaxX.y, x))
//                     return true
//                 x += type
//             }
//         return false
//     }

//     if (!(x1 === x2 && y1 === y2) && arrBoard[x1][y1] == arrBoard[x2][y2]) {
//         if (x1 == x2)
//             if (check1LineRow(y1, y2, x1))
//                 return true
//         if (y1 == y2)
//             if (check1LineCol(x1, x2, y1))
//                 return true
//         return check2LineRow(x1, y1, x2, y2)
//             || check2LineCol(x1, y1, x2, y2)
//             || check3LineRow(x1, y1, x2, y2, 1)
//             || check3LineRow(x1, y1, x2, y2, -1)
//             || check3LineCol(x1, y1, x2, y2, 1)
//             || check3LineCol(x1, y1, x2, y2, -1)
//     }
//     return false
// }



// function handleClick() {
//     let itemSelecting = null;
//     let x1 = -1;
//     let y1 = -1
//     $('.board-item').click(function () {
//         if (itemSelecting === null) {
//             //chọn hình đầu tiên
//             $(this).addClass('selecting');
//             //lấy tọa độ hình được chọn
//             x1 = parseInt($(this).attr("x"));
//             y1 = parseInt($(this).attr("y"));
//             console.log(`${x1} , ${y1}`);
//             console.log("abc");

//             //lấy các thuộc tính của hình được chọn đầu tiên
//             //set chỉ được chọn 1 cái
//             itemSelecting = $(this);
//             console.log(itemSelecting);
//         } else {
//             // chọn hình thứ 2
//             let itemCurrent = $(this);
//             //lấy tọa độ hình thứ 2
//             let x2 = parseInt($(this).attr("x"));
//             let y2 = parseInt($(this).attr("y"));
//             console.log(`${x2} , ${y2}`);
//             console.log(itemCurrent);

//             //kiểm tra
//             checkRoadBetweenTwoImages(itemSelecting, itemCurrent, x1, y1, x2, y2);
//             // sau khi kết thúc 1 cặp thì setting lại các giá trị về ban đầu
//             $(itemSelecting).removeClass("selecting");
//             itemSelecting = null;
//             x1 = -1;
//             y1 = -1;
//         }

//     });
// };

// //kiểm tra đường ăn giữa 2 hình
// function checkRoadBetweenTwoImages(itemSelecting, itemCurrent, x1, y1, x2, y2) {
//     //kiểm tra 2 hình có giống nhau
//     if (itemSelecting.css("background-image") === itemCurrent.css("background-image")) {
//         //kiểm tra đường đi
//         if (checkTwoPoint(x1, y1, x2, y2)) {
//             //xóa 2 ảnh
//             // $(itemSelecting).css("background-image", "none");
//             // $(itemCurrent).css("background-image", "none");
//             $(itemSelecting).addClass("item-hidden");
//             $(itemSelecting).attr("disabled", true);
//             $(itemCurrent).addClass("item-hidden");
//             $(itemCurrent).attr("disabled", true);

//             //set giá trị 2 ô được ăn về 0
//             arrBoard[x1][y1] = 0;
//             arrBoard[x2][y2] = 0;
//             console.log(arrBoard);
//         } else {
//             selectFalse();
//         }
//     } else {
//         selectFalse();
//     }
// };

// //lựa chọn sai sẽ bị trừ điểm và thời gian
// function selectFalse() {

// }

// handleClick();

