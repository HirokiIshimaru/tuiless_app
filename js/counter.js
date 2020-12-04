'use strict';

{
    window.onload = () =>{

        // タイマー変数
        let theme = document.getElementById('theme');
        let min = document.getElementById('min');
        let sec = document.getElementById('sec');
        let startBtn = document.getElementById('startBtn');
        let controlBtn = document.getElementById('btnBox');
        let stopBtn = document.getElementById('stop');
        let pauseBtn = document.getElementById('pause');
        let restartBtn = document.getElementById('restart');
        let backBtn = document.getElementById('backBtn');
        let endStop = document.getElementById('endStop');
        let timeOutStop = document.getElementById('timeOutStop');
        let data = JSON.parse(window.localStorage.getItem('setdata'));
        let timeNm = (data.time);
        let countTimer;
        let endModal = document.getElementById('end');
        let endRestart = document.getElementById('endRestart');
        let timeOut = document.getElementById('timeOut');
        let redoBtn = document.getElementById('redo');
        let result = document.getElementById('result');
        let speechcount = [];

        // 録音処理
        const recoding = new webkitSpeechRecognition();
        recoding.lang = 'ja-JP';
        recoding.continuous = true;
        let i = 0;
        let array = [];

        // modal隠す
        endModal.style.display = 'none';
        timeOut.style.display = 'none';
        result.style.display = 'none';

        // 保存したテーマと時間を表示
        function display(){
            theme.innerHTML=(data.theme);
            console.log(data);
            min.innerHTML = Math.floor( timeNm / 60);
            sec.innerHTML = timeNm % 60;
        }
        display();

        // 分秒を各変数に宣言
        let minNum = Math.floor(timeNm / 60);
        let secNum = timeNm % 60;

        // 桁数合わせ
        let minTimer = (`00${minNum}`).slice(-2);
        let secTimer = (`00${secNum}`).slice(-2);

        // HTMLに分秒を表示
        min.innerHTML = minTimer;
        sec.innerHTML = secTimer;

        // タイマースタート
        startBtn.onclick = () =>{

            // 録音
            recoding.start();
            console.log("タイマースタート");

            //保存したNGワード
            let speechData = JSON.parse(window.localStorage.getItem('wgWords'));
            let speechDataList = speechData.registerWords;
            console.log(speechDataList);
            speechDataList.forEach(element => {
                speechcount.push(0)
                console.log(speechcount);
                console.log(element);
            });
            // for (let a = 0; a < speechDataList.length; a++) {
            //     const element = speechDataList[a];
            //     let aaa = speechcount.push(0)
            //     console.log(aaa);
            // }
            // 取得した音声データを保存
            recoding.onresult = function(e) {
                let speechData = JSON.parse(window.localStorage.getItem('wgWords'));
                let speechDataList = speechData.registerWords;
                array.push(e.results[i][0].transcript);
                console.log(e);
                if(e.results[i].isFinal){
                    let autotext =  e.results[i][0].transcript;
                    let setSpeech = {
                        speech: autotext
                    }
                    
                    let speechString = setSpeech.speech;
                    console.log(speechString);
                    
                    speechDataList.forEach(speechEl => {
                        const speechString = setSpeech.speech;
                        const speechRegex = new RegExp(speechEl,"g");
                        if(speechString.match(speechRegex)){
                            speechcount[i]++;
                            console.log(speechcount);
                        }
                    });
                    // for (let i = 0; i < speechDataList.length; i++) {
                    //     const element = speechDataList[i];
                    //     const speechString = setSpeech.speech;
                    //     const speechRegex = new RegExp(element,"g");
                    //     if(speechString.match(speechRegex)){
                    //         let sss = speechcount[i]++;
                    //         console.log(sss);
                    //     }
                    // }
                    // if(speechString.match(speechRegex)){
                    //     speechcount[i]++;
                    //     console.log(speechcount);
                    // }
                }
                i++;
            }

            // ボタン切り替え
            startBtn.style.display = "none";
            controlBtn.style.display = "flex";
            restartBtn.style.display = "none";
            backBtn.style.visibility = "hidden";


            // タイマー処理
            let count = () =>{
                timeNm -= 1;
                
                min.innerHTML = (`00${Math.floor( timeNm / 60)}`).slice(-2);
                sec.innerHTML = (`00${timeNm % 60}`).slice(-2);

                // タイマー終了
                if(timeNm === 0){
                    clearInterval(countTimer);
                    recoding.stop();
                    console.log("タイマー終了");
                    timeOut.style.display = 'flex';
                }
            }

            // 一時停止ボタン処理
            pauseBtn.onclick = () =>{
                stopTimer();
                recoding.stop();
                pauseBtn.style.display = "none";
                restartBtn.style.display = "block";
                console.log("タイマーストップ");
            }

            // 再生ボタン処理
            restartBtn.onclick = () =>{
                restartBtn.style.display = "none";
                pauseBtn.style.display = "block";
                startTimer();
                recoding.start();
                console.log("タイマー再開");
            }

            // タイマー再開処理
            function startTimer(){
                countTimer = setInterval(count, 1000);
            }
            startTimer();

            // タイマーストップ処理
            function stopTimer(){
                clearInterval(countTimer);
            }

            // timeOutやり直しボタン処理
            redoBtn.onclick = () =>{
                resetTimer();
                timeOut.style.display = 'none';
                startBtn.style.display = 'block';
                controlBtn.style.display = 'none';
            }
            timeOutStop.onclick = () =>{
                dataSave();
            }

            // 終了ボタン処理
            stopBtn.onclick = () =>{
                stopTimer();
                recoding.stop();
                endModal.style.display = 'flex';
            }

            // modalリスタートボタン処理
            endRestart.onclick = () =>{
                endModal.style.display = 'none';
                pauseBtn.style.display = 'none';
                restartBtn.style.display = 'block';
            }
            // modal終了するボタン処理
            endStop.onclick = () =>{
                dataSave();
            }

            // タイマーリセット処理
            function resetTimer(){
                timeNm = data.time;
                minNum = Math.floor(timeNm / 60);
                secNum = timeNm % 60;
                minTimer = (`00${minNum}`).slice(-2);
                secTimer = (`00${secNum}`).slice(-2);
                min.innerHTML = minTimer;
                sec.innerHTML = secTimer;
                console.log("タイマーリセット");
            }

            function dataSave(){
                let speechcountList = {
                    count: speechcount
                }
                localStorage.setItem('setspeechData',JSON.stringify(speechcountList));
                location.href='result.html';
            }
        }
    }

}