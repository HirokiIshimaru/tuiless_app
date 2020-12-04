'use strict';

{
    window.onload = () =>{
        let speechData = JSON.parse(window.localStorage.getItem('wgWords'));
        let speechCount = JSON.parse(window.localStorage.getItem('setspeechData'));
        let speechDataList = speechData.registerWords;
        let speechCountList = speechCount.count;
        let num = 0;
        for (let i = 0; i < speechDataList.length; i++) {
            const speechShow = document.getElementById('speech_show');
            const div = document.createElement('div');
            const speech = document.createElement('p');
            const speechCountlength = document.createElement('span');
            num ++;
            const speechstring = speechDataList[num-1];
            const speechlength = speechCountList[num-1];
            let speechstringShow = document.createTextNode(speechstring);
            let speechlengthShow = document.createTextNode(speechlength);
            console.log(speechlength);
            console.log(speechstring);

            speechShow.appendChild(div);
            div.classList.add('speechBox');

            div.appendChild(speech);
            speech.classList.add('speech_content');
            speech.appendChild(speechstringShow);      
            speech.appendChild(speechCountlength);
            speechCountlength.classList.add('length');
            speechCountlength.appendChild(speechlengthShow);
        }
    }
}