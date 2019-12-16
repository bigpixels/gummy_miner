'use strict';

var startButton = document.querySelector('#startButton');
var easyLevelButton = document.querySelector('#easyLevelButton');
var normalLevelButton = document.querySelector('#normalLevelButton');
var hardLevelButton = document.querySelector('#hardLevelButton');

var audio = document.querySelector("#myAudio");
var clickAudio = document.querySelector("#clickAudio");
var finishAudio = document.querySelector("#finishAudio");
var playAudioButton = document.querySelector("#playAudioButton");
var pauseAudioButton = document.querySelector("#pauseAudioButton");

var gummy = document.querySelector('#gummy');
var infoText = document.querySelector("#info");
var timeText = document.querySelector("#time");

var setGummyPosition = function () {
    gummy.style.left = Math.round(Math.random() * 90) + '%';
    gummy.style.top = Math.round(Math.random() * 90) + '%';
};

gummy.addEventListener('click', function (event) {
    event.preventDefault();
    clickAudio.play();
});

easyLevelButton.addEventListener('click', function (event) {
    event.preventDefault();
    startButton.style.display = 'block';
    normalLevelButton.style.display = 'none';
    hardLevelButton.style.display = 'none';
    easyLevelButton.setAttribute('disabled', 'disabled');
});

normalLevelButton.addEventListener('click', function (event) {
    event.preventDefault();
    startButton.style.display = 'block';
    easyLevelButton.style.display = 'none';
    hardLevelButton.style.display = 'none';
    normalLevelButton.setAttribute('disabled', 'disabled');
    setInterval(setGummyPosition, 2500);
});

hardLevelButton.addEventListener('click', function (event) {
    event.preventDefault();
    startButton.style.display = 'block';
    easyLevelButton.style.display = 'none';
    normalLevelButton.style.display = 'none';
    hardLevelButton.setAttribute('disabled', 'disabled');
    setInterval(setGummyPosition, 100);

    audio.play();
    playAudioButton.style.display = 'block';
    pauseAudioButton.style.display = 'block';
    pauseAudioButton.addEventListener('click', function (event) {
        audio.pause();
    });
    playAudioButton.addEventListener('click', function (event) {
        audio.play();
    });
});

var gummiesCounter = 0; //переменная, которая хранит счетчик, сколько раз кликнули на мишку

startButton.addEventListener('click', function (event) {
    event.preventDefault();

    gummy.style.display = 'block';
    setGummyPosition();

    startButton.setAttribute('disabled', 'disabled');
    infoText.textContent = "You caught 0 Gummies!"
    var duration = 10;
    timeText.textContent = duration + " seconds left";

    function counterGummies () {
        setGummyPosition();
        clearInterval(gummyInterval); //убиваем предыдущий интервал
        gummyInterval = setInterval(setGummyPosition, 1000);
        gummiesCounter++;
        infoText.textContent = "You caught " + gummiesCounter + " Gummies!";
    }

    gummy.addEventListener('click', counterGummies);

    setTimeout(function() { //функция всё отменяет через 10 секунд
        infoText.textContent = "You result is " + gummiesCounter + " !";
        startButton.removeAttribute('disabled');
        gummy.removeEventListener('click', counterGummies);
    },10000);

    var gummyInterval = setInterval(setGummyPosition, 1000);//устанавливем интервал между вызовами функции setGummyPosition

    var durationInterval = setInterval(function () { //устанавливаем длительность интервала (секунды тикают)
        duration--;
        timeText.textContent = duration + " seconds left";

        if(duration === 0) {
            timeText.textContent = "Time out!!!";
            clearInterval(durationInterval);
            clearInterval(gummyInterval);
            gummiesCounter = 0;
            gummy.style.display = 'none';
            audio.pause();
            finishAudio.play();
        }
    }, 1000);
});
