// /**
//  * Nguyễn Bính
//  * 21130286 - DH21DTA
//  */

$(document).ready(function () {

    const images = [
        "./image/pokemon0.png",
        "./image/pokemon1.png",
        "./image/pokemon2.png",
        "./image/pokemon3.png",
        "./image/pokemon4.png",
        "./image/pokemon5.png",
        "./image/pokemon6.png",
        "./image/pokemon7.png",
        "./image/pokemon8.png",
        "./image/pokemon9.png",
        "./image/pokemon10.png",
        "./image/pokemon11.png",
        "./image/pokemon12.png",
        "./image/pokemon13.png",
        "./image/pokemon14.png",
        "./image/pokemon15.png",
        "./image/pokemon16.png",
        "./image/pokemon17.png",
        "./image/pokemon18.png",
        "./image/pokemon19.png",
        "./image/pokemon20.png",
        "./image/pokemon21.png",
        "./image/pokemon22.png",
        "./image/pokemon23.png",
        "./image/pokemon24.png",
        "./image/pokemon25.png",
        "./image/pokemon26.png",
        "./image/pokemon27.png",
        "./image/pokemon28.png",
        "./image/pokemon29.png",
        "./image/pokemon30.png",
        "./image/pokemon31.png",
        "./image/pokemon32.png"
    ];

    const levelInstructions = {
        1: `<ol>
                <li>Chào mừng bạn đến với Pikachu - Một trò chơi giải đố kinh điển. Bạn sẽ thấy màn
                hình hiển thị một lười các biểu tượng pokemon.</li>
        
                <li>Nhiệm vụ của trò chơi là tìm những cặp pokemon giống nhau và kết nối chúng.</li>
                
                <li>Bạn cần phải chọn vào 2 ô pokemon có hình giống nhau và làm biến mất nó với điều
                kiện không có pokemon nào chắn trên đường đi của chúng.</li>
            
                <li>Đường đi giữa 2 ô pokemon giống nhau có thể là hàng dọc, hàng ngang, theo hình chữ L,
                chữ U hoặc chữ Z.</li>
        
                <li>Trò chơi kết thúc khi tất cả các cặp pokemon được loại bỏ hoặc hết thời gian.</li>
            
                <li>Chúc bạn chơi vui vẻ!</li>
            </ol>`,

        
    }

    const arrShuffle = [30, 25, 20, 15, 15, 10];
    const arrLevel = [1, 2, 3, 4, 5, 6]
    var rowGameBoard = 14;
    var colGameBoard = 18;
    var countDownInterval;
    var intervalLV3;
    var isLevel2 = false;
    var isLevel4 = false;
    var intervalLevel5
    var shuffle;

    //dữ liệu người chơi
    let playerData = {
        score: 0,
        currentLevel: arrLevel[0],
        timeIndex: 1000,
        win: false,
        shuffle: arrShuffle[0]
    };


    //setup lại dữ liệu người chơi khi chọn level
    function updateDataPlayer(level) {
        console.log("Update");
        playerData.win = false;
        playerData.currentLevel = arrLevel[level - 1];

        playerData.shuffle = arrShuffle[level - 1];
        shuffle = playerData.shuffle;

        resetPreviousLevelState();

        $('#level').html(playerData.currentLevel);
        $('#shuffle').html(playerData.shuffle);
        $('#time').html(playerData.timeIndex);

    }

    //xóa trạng thái của level cũ
    function resetPreviousLevelState() {
        // Xóa tất cả các hình ảnh đã được chọn
        $(".board-item").removeClass("selecting").removeClass("item-hidden").removeAttr("disabled");

        // Xóa điểm số
        playerData.score = 0;
        $("#score").text(playerData.score);
        shuffle = playerData.shuffle;

        // Đặt lại thời gian còn lại 

        // Reset thời gian còn lại trên giao diện (nếu có)
        $('#game-board').empty();
        arrBoard = createGameBoard(rowGameBoard, colGameBoard);
        handleClick();

    }


    //tạo bảng game
    function createGameBoard(row, col) {
        playerData.score = 0;
        $('#score').text(playerData.score);

        // Đặt lại cấp độ của người chơi về cấp độ mặc định
        $('#level').html(playerData.currentLevel);

        // Đặt lại thời gian của người chơi về thời gian mặc định
        $('#time').html(playerData.timeIndex);

        // Đặt lại số lượt trộn của người chơi về số lượt trộn mặc định
        $('#shuffle').html(playerData.shuffle);
        shuffle = playerData.shuffle;

        let arrBoard = Array.from({ length: row }, () => Array.from({ length: col }, () => 0));
        let itemList = new Array();
        let arrImage = loadImage();

        let boardHtml = "";
        //tạo các button chứa hình ảnh pokemon trong ma trận
        for (let i = 1; i < arrBoard.length - 1; i++) {
            if (i !== 0 && i !== (arrBoard.length - 1)) {
                boardHtml += "<div class=\"row-board\">";
                for (let j = 1; j < arrBoard[i].length - 1; j++) {
                    if (j !== 0 && j !== (arrBoard[i].length - 1)) {
                        arrBoard[i][j] = 1;
                        boardHtml += "<button id='btn" + i + "-" + j + "' class=\"board-item\" x=" + i + " y=" + j + "></button>";
                        itemList.push({ x: i, y: j });
                    }
                }
                boardHtml += "</div>";
            }
        }

        document.querySelector(".game-board").innerHTML += boardHtml;
        // console.log(itemList.length);
        if (isLevel2) {
            getWall(itemList, arrBoard);
        }

        while (itemList.length > 0) {
            randomImages(itemList, arrImage);
        }


        if (isLevel4) {
            level4();
        }
        // if (isLevel5) {
        //     level5();
        // }

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
        // console.log('ảnh 1: ', rdX1, rdY1);

        //ảnh 2
        let rdImg2 = itemList[Math.floor(Math.random() * itemList.length)];
        let rdX2 = rdImg2.x;
        let rdY2 = rdImg2.y;
        //tìm vị trí của tọa độ tấm ảnh có tồn tại trong Items không? 
        let index2 = itemList.findIndex(obj => (obj.x === rdX2 && obj.y === rdY2));
        if (index2 !== -1) {
            itemList.splice(index2, 1);
        }
        // console.log('ảnh 2: ', rdX2, rdY2);

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
        $(".board-item").not("wall").click(function () {
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
                if (checkWin()) {
                    alert('Bạn đã chiến thắng!');
                }
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

                arrBoard[x1][y1] = 0;
                arrBoard[x2][y2] = 0;
                playerData.score += 50;
                $("#score").text(playerData.score);

                console.log(arrBoard)
            } else chooseFalse()
        } else chooseFalse()
    }
    // //lựa chọn sai sẽ bị trừ điểm và thời gian
    function chooseFalse() {
        if (playerData.score >= 10) {
            playerData.score -= 10;
            $("#score").text(playerData.score);
        } else {
            $("#score").text(0);
        }
    }

    let selectingItem = null
    let x1 = -1
    let y1 = -1


    //kiểm tra 2 hình xem có ăn được hay không?
    function checkTwoPoint(x1, y1, x2, y2) {
        function check1LineRow(y1, y2, x) {
            let min = Math.min(y1, y2)
            let max = Math.max(y1, y2)
            for (let y = min + 1; y < max; y++)
                if (arrBoard[x][y] != 0)
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

        //kiểm tra 2 đường (chữ L)
        function check2Line(x1, y1, x2, y2) {
            //kiểm tra theo chiều dọc
            //kiểm tra góc quẹo ở cột
            //vd: ảnh 1(1,1) -> ảnh 2(2,3): sẽ đi qua lần lượt các điểm (2,1), (2,2) (giống chữ L nằm dọc)
            function check2LineRow(x1, y1, x2, y2) {
                //đặt điểm p1 là điểm nhỏ nhất,  điểm p2 là lớn nhất
                let pMinY = { x: x1, y: y1 }
                let pMaxY = { x: x2, y: y2 }
                //đổi ngược lại
                if (y1 > y2) {
                    pMinY = { x: x2, y: y2 }
                    pMaxY = { x: x1, y: y1 }
                }
                for (let y = pMinY.y; y <= pMaxY.y; y++) {
                    if (y > pMinY.y && arrBoard[pMinY.x][y] != 0)
                        return false
                    //kiểm tra đường đi của 2 hàng
                    if ((arrBoard[pMaxY.x][y] == 0) && check1LineCol(pMinY.x, pMaxY.x, y) && check1LineRow(y, pMaxY.y, pMaxY.x))
                        return true
                }
                return false
            }
            //kiểm tra theo chiều ngang
            //kiểm tra góc quẹo ở hàng
            //vd: ảnh 1(1,1) -> ảnh 2(2,3): sẽ đi qua lần lượt các điểm (1,2), (1,3) (giống chữ L nằm ngang)
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
    function countDownTime(timeCountDown) {
        clearInterval(countDownInterval);
        // console.log("CountDown");
        let time;
        time = parseInt(timeCountDown);
        // $('#time').text(time);
        countDownInterval = setInterval(() => {
            time--;
            // console.log(time);
            $('#time').html(time + 's');
            if (time < 0) {
                console.log("hết giờ");
                $('#time').html('hết giờ');
                // clearInterval(countDownInterval);
            }
        }, 1000);
    }

    // $('.level-btn').on('click', function () {
    //     let level = $(this).attr('id');
    //     switch (level) {
    //         case '1':

    //             break;

    //         default:
    //             break;
    //     }
    // })

    function createInstructions(level) {
        const instructionDiv = $('#game-instruction-content');
        const levelInstruction = levelInstructions[level];

        instructionDiv.html(levelInstruction);
    }


    $('#1').on('click', function () {
        resetPreviousLevelState();
        console.log('level 1');
        isLevel5 = false;
        isLevel4 = false;
        isLevel2 = false;
        clearInterval(intervalLV3);
        clearInterval(intervalLevel5);
        updateDataPlayer(1);
        countDownTime(1000);
        createInstructions(1);
        $('#level-modal').hide();

    })
    $('#2').on('click', function () {
        resetPreviousLevelState();
        console.log('level 2');
        isLevel2 = true;
        isLevel5 = false;
        isLevel4 = false;
        clearInterval(intervalLV3);
        clearInterval(intervalLevel5);
        level2();
        updateDataPlayer(2);
        countDownTime(1000);
        $('#level-modal').hide();
    })
    $('#3').on('click', function () {
        resetPreviousLevelState();
        console.log('level 3');
        isLevel2 = false;
        isLevel5 = false;
        isLevel4 = false;
        level3();
        clearInterval(intervalLevel5);
        updateDataPlayer(3);
        countDownTime(1000);
        $('#level-modal').hide();
    })
    $('#4').on('click', function () {
        resetPreviousLevelState();
        console.log('level 4');
        isLevel2 = false;
        isLevel4 = true;
        isLevel5 = false;
        clearInterval(intervalLV3);
        clearInterval(intervalLevel5);
        updateDataPlayer(4);
        countDownTime(1000);
        $('#level-modal').hide();
    })
    $('#5').on('click', function () {
        resetPreviousLevelState();
        console.log('level 5');
        isLevel2 = false;
        isLevel4 = false;
        clearInterval(intervalLV3);
        level5();
        updateDataPlayer(5);
        countDownTime(1000);
        $('#level-modal').hide();
    })
    $('#random-imgs-btn').on('click', function () {
        console.log('random images');
        if (shuffle > 0) {
            shuffle -= 1;
            $('#shuffle').html(shuffle);
            randomPokemon();
            console.log(shuffle);
        } else {
            alert('bạn đã hết lượt đổi');
        }
    })
    $('#reset-game-btn').on('click', function () {
        console.log('reset game')
        resetGame();
        countDownTime(1000)
    })

    // function createLevel(level) {

    // }
    function randomPokemon() {

        // Xoá lớp "selecting" từ các phần tử
        $(".selecting").removeClass("selecting");
        selectingItem = null;

        //add ảnh hiện tại chưa ăn vào 1 list
        let ImgExists = [];
        let locationBtnExist = []
        let wallList = [];
        for (let i = 0; i < arrBoard.length; i++) {
            for (let j = 0; j < arrBoard[i].length - 1; j++) {
                if (arrBoard[i][j] === 1) {
                    //lưu vị trí các button chưa ăn
                    locationBtnExist.push('#btn' + i + '-' + j);
                    //lưu ảnh tương ứng với button
                    ImgExists.push($(`#btn${i}-${j}`).css("background-image"));
                }
            }
        }

        for (let x = 0; x < locationBtnExist.length; x++) {
            console.log(locationBtnExist[x]);
        }

        //tách các url thành dạng /image/pokemonx.png
        let urlImage = splitUrlImage(ImgExists);

        //thêm các ảnh ngẫu nhiên từ list ảnh trên vào lần lượt các button
        for (let i = 0; i < locationBtnExist.length; i++) {
            if (urlImage.length > 0) {
                let rdIndex = Math.floor(Math.random() * urlImage.length);
                let rdImg = urlImage[rdIndex];
                if (rdIndex > -1) {
                    urlImage.splice(rdIndex, 1);
                }
                $(locationBtnExist[i]).css("background-image", "url(\"" + rdImg + "\"")
            } else {
                break;
            }

        }

        for (let i = 0; i < locationBtnExist.length; i++) {
            // console.log(locationBtnExist[i]);
            // console.log(urlImage[i]);
        }
    }

    function splitUrlImage(arrImg) {
        if (!arrImg || arrImg.length <= 0) {
            console.error('Invalid input array.'); // Ghi log lỗi nếu mảng không hợp lệ hoặc không có phần tử
            return []; // Trả về mảng rỗng nếu không có mảng hoặc mảng không có phần tử
        }

        function extractImgPath(url) {
            url = url.slice(5, -2);
            const urlObj = new URL(url);
            return urlObj.pathname;
        }

        // let urlString = 'url("http://127.0.0.1:5501/image/pokemon29.png")';
        // let imagePath = extractImgPath(urlString);
        // console.log(imagePath);
        let imgPaths = [];
        for (let i = 0; i < arrImg.length; i++) {
            const imagePath = extractImgPath(arrImg[i]);
            imgPaths.push(imagePath);
        }

        return imgPaths;
    }


    function resetGame() {

        // Đặt lại điểm số của người chơi về 0
        playerData.score = 0;
        $('#score').text(playerData.score);

        // Đặt lại cấp độ của người chơi về cấp độ mặc định
        $('#level').html(playerData.currentLevel);
        clearInterval(countDownInterval);

        // Đặt lại thời gian của người chơi về thời gian mặc định
        $('#time').html(playerData.timeIndex);

        // Đặt lại số lượt trộn của người chơi về số lượt trộn mặc định
        $('#shuffle').html(playerData.shuffle);

        // Xóa hết các button hiện tại trên bảng game
        $('.row-board').remove();

        // Tạo lại bảng game với kích thước và trạng thái ban đầu
        arrBoard = createGameBoard(rowGameBoard, colGameBoard);
        shuffle = playerData.shuffle;
        handleClick();


        // // Bắt đầu lại đếm ngược thời gian
        // countDownTime(playerData.timeIndex);
    }

    function checkWin() {
        for (let i = 0; i < arrBoard.length; i++) {
            for (let j = 0; j < arrBoard[i].length; j++) {
                if (arrBoard[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    function getWall(itemList, arrBoard) {
        for (let j = 0; j < itemList.length; j++) {
            if (j % 10 == 0) {
                let obj = itemList[j];
                arrBoard[obj.x][obj.y] = 2;
                console.log(arrBoard[obj.x][obj.y]);
                let btnId = '#btn' + obj.x + '-' + obj.y;
                $(btnId).css('background-image', 'url("./image/wall.png")'); // Đặt hình nền cho button
                $(btnId).addClass('wall'); // Thêm lớp 'wall' cho button
                $(btnId).attr("disabled", true); // Vô hiệu hóa button
                itemList.splice(j, 1);
            }
        }
    }

    //level2
    //Tạo các bức tường ở vị trí ngẫu nhiên chắn lối đi
    function level2() {
        let wallList = [];
        for (let i = 1; i < (arrBoard.length - 1); i++) {
            for (let j = 1; j < (arrBoard[i].length - 1); j++) {
                wallList.push({ x: i, y: j });
            }
        }

        resetGame();
    }


    //level 3
    //cứ 30s sẽ random lại vị trí nhưng ô chưa ăn 1 lần
    function level3() {
        intervalLV3 = setInterval(randomPokemon, 10000);
    }

    //level 4
    //khi ta di chuyển chuột vào vùng nào thì vùng đó sẽ sáng lên (toàn bộ bàn đều chìm vào bóng đêm)
    //dùng opacity
    function level4() {
        for (let i = 1; i < rowGameBoard - 1; i++) {
            for (let j = 1; j < colGameBoard - 1; j++) {
                let id = i * colGameBoard + j;
                let btnId = `#btn${i}-${j}`;
                $(btnId).mouseover(function () {
                    // Thiết lập opacity của ô và các ô láng giềng của nó thành 1
                    for (let k = -1; k <= 1; k++) {
                        for (let l = -1; l <= 1; l++) {
                            let neighborId = (i + k) * colGameBoard + (j + l);
                            if (
                                neighborId >= colGameBoard &&
                                neighborId < (rowGameBoard - 1) * colGameBoard &&
                                neighborId % colGameBoard !== 0 &&
                                (neighborId + 1) % colGameBoard !== 0
                            ) {
                                $(`#btn${i + k}-${j + l}`).css("opacity", "1");
                            }
                        }
                    }
                }).mouseout(function () {
                    // Đặt lại opacity của ô và các ô láng giềng của nó về 0
                    for (let k = -1; k <= 1; k++) {
                        for (let l = -1; l <= 1; l++) {
                            let neighborId = (i + k) * colGameBoard + (j + l);
                            if (
                                neighborId >= colGameBoard &&
                                neighborId < (rowGameBoard - 1) * colGameBoard &&
                                neighborId % colGameBoard !== 0 &&
                                (neighborId + 1) % colGameBoard !== 0
                            ) {
                                $(`#btn${i + k}-${j + l}`).css("opacity", "0.5");
                            }
                        }
                    }
                });
            }
        }
    }

    //level 5
    // mỗi 10s thêm 1 cặp hình bất kì vô các ô trống đã ăn
    function level5() {
        intervalLevel5 = setInterval(() => {
            let emptyItems = [];
            let emptyButtons = [];
            let arrImage = loadImage();

            // Tìm tất cả các vị trí trống trên bảng
            for (let i = 1; i < (arrBoard.length - 1); i++) {
                for (let j = 1; j < (arrBoard[i].length - 1); j++) {
                    if (arrBoard[i][j] === 0) {
                        emptyItems.push("#btn" + i + "-" + j);
                        emptyButtons.push({ x: i, y: j });
                    }
                }
            }

            // Nếu có ít nhất 2 vị trí trống
            if (emptyItems.length >= 2) {
                let rdIndex1, rdIndex2;
                // Chọn ngẫu nhiên hai vị trí
                do {
                    rdIndex1 = Math.floor(Math.random() * emptyItems.length);
                    rdIndex2 = Math.floor(Math.random() * emptyItems.length);
                } while (rdIndex1 === rdIndex2); // Lặp lại cho đến khi hai chỉ số khác nhau

                let emptyItem1 = emptyItems[rdIndex1];
                let button1 = emptyButtons[rdIndex1];
                let emptyItem2 = emptyItems[rdIndex2];
                let button2 = emptyButtons[rdIndex2];

                let rdImage = arrImage[Math.floor(Math.random() * arrImage.length)];

                // Hiển thị hình ảnh và cập nhật trạng thái của các ô
                $(emptyItem1).removeClass("item-hidden").attr("disabled", false);
                $(emptyItem2).removeClass("item-hidden").attr("disabled", false);
                arrBoard[button1.x][button1.y] = 1;
                arrBoard[button2.x][button2.y] = 1;
                $(emptyItem1).css("background-image", "url(\"" + rdImage + "\")");
                $(emptyItem2).css("background-image", "url(\"" + rdImage + "\")");
            }
        }, 30000);

    }

    //     sự kiện cho các nút modal

    // mở level modal
    $('#select-level-btn').on('click', () => {
        $('#level-modal').css('display', 'flex');
    });

    // đóng level modal
    $('#level-modal-close-btn').on('click', () => {
        $('#level-modal').hide();
    });

    // mở
    $('#about-me-btn').on('click', () => {
        $('#about-modal').css('display', 'flex');
    });

    // đóng level modal
    $('#about-modal-close-btn').on('click', () => {
        $('#about-modal').hide();
    });

})