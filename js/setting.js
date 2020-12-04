'use strict';

{
    window.onload = () =>{
        let compBtn = document.getElementById('btn');
        let errow = document.getElementById('errow');
        let errowBtn = document.getElementById('errowStop');

        // modal隠す
        errow.style.display = 'none';

        compBtn.onclick = () =>{

        // 入力されたデータを取得
        let theme = document.getElementById('theme').value;
        let time = document.getElementById('time').value;

        // データをオブジェクト保存する
        let settingList = {
            theme: theme,
            time: time
        }

        // jsonデータに変換して登録
        window.localStorage.setItem('setdata',JSON.stringify(settingList));

        // データ表示
        display();

        // 表示する処理
        function display(){
            let data = JSON.parse(window.localStorage.getItem('setdata'));
            console.log(data.theme);
            console.log(data.time);
        }

        // 入力チェック
        if(theme.length == 0 || time.length == 0){
            errow.style.display = 'flex';
        }else{
            location.href='counter.html';
        }

        // エラー解除
        errowBtn.onclick = () =>{
            errow.style.display = 'none';
        }
        }
    }
}