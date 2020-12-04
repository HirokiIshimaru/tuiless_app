{
    'use strict';

    document.addEventListener('DOMContentLoaded', ()=> {

        // 変数設定
        const wordListEl = document.querySelector('.word-list');
        const addWordBtn = document.getElementById('addWord');
        const saveWordBtn = document.getElementById('saveWord');
        let getNgWords;

        const ngWords = {}
        const bgWordsList =[];
        // 初期localstrageセット
        if(!JSON.parse(localStorage.getItem('wgWords'))) {
            ngWords.registerWords = bgWordsList;
            localStorage.setItem('wgWords',JSON.stringify(ngWords));
        } else {
            getNgWords  = JSON.parse(localStorage.getItem('wgWords'));
        }
        

        // ローカルストレージ変更
        const addLocalStrage = () => {
            // const ngWords = {}
            // const bgWordsList =[];
            wordListEl.querySelectorAll('.ng-word').forEach(word => {
                if(!word.value == '') {
                    bgWordsList.push(word.value);
                }
            });
            ngWords.registerWords = bgWordsList;
            localStorage.setItem('wgWords',JSON.stringify(ngWords));
        }

        // NGワードの削除
        const deleteNgWord = (deleteEl) => {
            deleteEl.parentElement.remove();
            addLocalStrage();
        };

        // 要素生成Func
        const createEl = (value = "") => {
            const div = document.createElement('div');
            const input = document.createElement('input');
            const deleteBtn = document.createElement('div');
            const span = document.createElement('span');

            div.classList.add('word-item');
            input.classList.add('ng-word');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', 'NGワードを入力してください');
            input.value = value;
            deleteBtn.classList.add('delete-btn');
            deleteBtn.appendChild(span);
            deleteBtn.addEventListener('click', deleteNgWord.bind(null,deleteBtn));
            div.appendChild(input);
            div.appendChild(deleteBtn);
            return div;
        };

        // 初期レンダー
        const firstItemsRender = () => {
            if(getNgWords.registerWords[0]) {
                // 登録したNGワードを一覧表示
                for(let i in getNgWords.registerWords) {
                    const div = createEl(getNgWords.registerWords[i]);
                    wordListEl.appendChild(div);
                }
            } else {
                // 登録したNGワードが存在しない場合、初期入力ボックスを表示
                const div = createEl();
                wordListEl.appendChild(div);
                const firstDeleteBtn = document.querySelector('.delete-btn');
                firstDeleteBtn.addEventListener('click', deleteNgWord.bind(null,firstDeleteBtn));
            }
        };

        // 入力ボックスの追加
        const addNgWordItem = ()=> {
            addWordBtn.addEventListener('click', ()=> {
                const div = createEl();
                wordListEl.appendChild(div);
            });
        };
        

        // NGワード保存
        const saveNgWords = () => {
            saveWordBtn.addEventListener('click', () => {
                addLocalStrage();
                location.href='setting.html';
            });
        };

        firstItemsRender();
        addNgWordItem();
        saveNgWords();
    });
    
}
