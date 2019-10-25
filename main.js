const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 100;

var startSound;
var stopSound;
var bingSound;

var running1Sound;
var winningSound;

var startable = true;
var stopable = false;
var m = true;

// excel data import
var data = [
    ['Wissenskultur', 'Wissenskultur.svg', 'w', 'elevator', 'Open Science', 'Informationsdesign', 'Bildungsbusiness', 'Massive Open Online Course', 'Gamification', 'Predictive Analytics', 'Talentismus', 'Open Innovation', 'Kollaboration', 'Sharing Economy', 'Female Shift', 'Life-Long-Learning', 'Tutorial Learning', 'Creativiteens', 'Neugiermanagement', ],
    ['Konnektivität', 'Konnektivität.svg', 'k', 'elevator', 'Augmented Reality', 'E-Commerce', 'Crowd Funding', 'FinTech', 'Industrie 4.0', 'Big Data', 'Cybercrime', 'Privacy', 'Predictive Analytics', 'Selftracking', 'E-Health', 'Me-Cloud', 'Open Innovation', 'Pop-up Money', 'Swapping', 'Smart Devices', 'Internet der Dinge', 'Social Networks', ],
    ['Urbanisierung', 'Urbanisierung.svg', 'u', 'java', 'Bevölkerungswachstum', 'Third Places', 'Collaborative Living', 'Urban Manufacturing', 'Urban Mining', 'Urban Farming', 'E-Mobility', 'Bike Boom', 'Megacities', 'Global Cities', 'Landflucht', 'Schrumpfende Städte', 'Smart Cities', ],
    ['Neo-Ökologie', 'Neo-Oekologie.svg', 'ö', 'elevator', 'Nachhaltigkeitsgesellschaft', 'Post-Carbon-Gesellschaft', 'Bio-Boom', 'Gutbürger', 'Slow Culture', 'Maker Movement', 'Sharing Economy', 'Postwachstumsökonomie', 'Social Business', 'Fair Trade', 'Swapping', 'Zero Waste', 'Green Tech', 'Urban Farming', 'E-Mobility', 'Circular Economy', ],
    ['Globalisierung', 'Globalisierung.svg', 'q', 'elevator', 'Glokalisierung', 'Multipolare Weltordnung', 'Cybercrime', 'On-demand Business', 'Near-shoring', 'Schattenökonomie', 'Pop-up Money', 'Fair Trade', 'Social Business', 'Postwachstumsökonomie', 'Womanomics', 'Rising Africa', 'Weltmacht China', 'Global Cities', 'Migration', ],
    ['Individualisierung', 'Individualisierung.svg', 'i', 'elevator', 'Single-Gesellschaft', 'Lebensqualität', 'Selftracking', 'Identitätsmanagement', 'Me-Cloud', 'Small-World-Networks', 'Maker Movement', 'Diversity', 'Liquid Youth', 'Multigrafie', 'Tutorial Learning', 'Regenbogenfamilien', 'Wir-Kultur', ],
    ['Gesundheit', 'Gesundheit.svg', 'g', 'spanish-flea', 'Sportivity', 'Detoxing', 'Komplementärmedizin', 'Lebensqualität', 'Selftracking', 'E-Health', 'Ambient Assisted Living', 'Slow Culture', 'Work-Life-Blending', 'Corporate Health', 'Healthness', 'Foodies', 'Lebensenergie', 'Achtsamkeit', ],
    ['New Work', 'New Work.svg', 'n', 'elevator', 'Work-Design', 'Outsourcing-Gesellschaft', 'Start-up-Culture', 'Slash-Slash-Biografien', 'Permanent Beta', 'Silver Potentials', 'Corporate Health', 'Work-Life Blending', 'Diversity', 'Female Shift', 'Womanomics', 'Co-Working', 'Service-Ökonomie', 'Social Business', 'Kollaboration', 'Open Innovation', 'Talentismus', 'On-demand Business', 'Flexicurity', 'Antifragilität', 'Urban Manufacturing', 'Power of Place', 'Kreativökonomie', ],
    ['Gender Shift', 'Gender Shift.svg', 't', 'elevator', 'Super Daddys', 'Alpha Softies', 'Sexdesign', 'Proll-Professionals', 'Work-Life-Blending', 'Diversity', 'Female Shift', 'Womanomics', 'Tiger Woman', 'Regenbogenfamilien', 'Neue Mütter', 'Phasenfamilien', ],
    ['Silver Society', 'Silver Society.svg', 'y', 'elevator', 'Downaging', 'Ageless Consuming', 'Forever Youngsters', 'E-Health', 'Ambient Assisted Living', 'Slow Culture', 'Diversity', 'Liquid Youth', 'Silver Potentials', 'Healthness', 'Universal Design', ],
    ['Mobilität', 'Mobilitaet.svg', 'm', 'elevator', '24/7 Gesellschaft', 'Carsharing', 'Autonomes Fahren', 'Third Places', 'Power of Place', 'Wearables', 'Langsamverkehr', 'E-Mobility', 'Bike-Boom', 'Unterwegsmärkte', 'Mobile Commerce', 'Mixed Mobility', 'End-to-End-Tourismus', ],
    ['Sicherheit', 'Sicherheit.svg', 's', 'elevator', 'Super-Safe-Society', 'Trust Technology', 'Transparenz-Märkte', 'E-Health', 'Identitätsmanagement', 'Digital Reputation', 'Predictive Analytics', 'Privacy', 'Cybercrime', 'Big Data', 'Industrie 4.0', 'Flexicurity', 'Antifragilität', 'Simplexity', ],
]
var currentTrendNumber = -1;
var trendHeadline = ""
var trendItems = []
var trendImage;
var trendMusic;

var trendNumbersArray = []
var trendHeadlinesArray = []

function extractTrendNumbers() {
    for (var i = 0; i < data.length; i++) {
        trendHeadlinesArray.push(data[i][0]);
        trendNumbersArray.push(data[i][2]);
    }
}

function createSlots(ringNumber) {

    var amountOfSlots = Math.floor(trendItems.length / 3);

    var startIndex;
    var endIndex;

    if (ringNumber == 1) {
        startIndex = 0;
        endIndex = amountOfSlots;
    } else if (ringNumber == 2) {
        startIndex = amountOfSlots;
        endIndex = amountOfSlots * 2;
    } else if (ringNumber == 3) {
        startIndex = amountOfSlots * 2;
        endIndex = trendItems.length;
    }
    console.log('startIndex ' + startIndex)
    console.log('endIndex ' + endIndex)
    console.log('ringNumber ' + ringNumber)


    var finalRingItems = [...trendItems].slice(startIndex, endIndex);
    var ringItems = [...trendItems].slice(startIndex, endIndex);
    console.log('ringItems ' + ringItems)

    for (var i = 0; i < SLOTS_PER_REEL; i++) {

        if (ringItems.length == 0) {
            ringItems = [...finalRingItems];
        }
        var randomItem = ringItems[0];
        ringItems.shift();

        var slot = document.createElement('div');

        slot.className = 'slot';

        // compute and assign the transform for this slot
        var slotAngle = 360 / SLOTS_PER_REEL;
        var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

        slot.style.transform = transform;

        // setup the number to show inside the slots
        // the position is randomized to 

        //var content = $(slot).append('<p>' + ((seed + i)%12)+ '</p>');
        var content = $(slot).append('<p class="item">' + randomItem.toUpperCase() + '</p>');

        // add the poster to the row
        $('#ring' + ringNumber).append(slot);
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

function createFrameSlots(ring) {

    var slotAngle = 360 / SLOTS_PER_REEL;

    i = 0;
    var slot = document.createElement('div');

    slot.className = 'frameSlot frameSlotBorder' + ring;

    // compute and assign the transform for this slot
    var transform = 'rotateX(0deg) translateZ(' + REEL_RADIUS + 'px)';

    slot.style.transform = transform;

    var content = $(slot).append('<p>' + "" + '</p>');

    // add the poster to the row
    $('#ring' + ring).append(slot);

}

function getSeed() {
    // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
    return Math.floor(Math.random() * (SLOTS_PER_REEL));
}


function initWheelSpin() {
    //var txt = 'seeds: ';
    for (var i = 1; i < 4; i++) {
        $('#ring' + i)
            .css('-webkit-animation', 'initWheelSpin ' + TURNING_SPEED + 's')
            .css('-moz-animation', 'initWheelSpin ' + TURNING_SPEED + 's')
            .css('-o-animation', 'initWheelSpin ' + TURNING_SPEED + 's')
            .css('animation', 'initWheelSpin ' + TURNING_SPEED + 's')
            .attr('class', 'ring initWheelSpin')
            .css('-webkit-animationIterationCount', '1')
            .css('-moz-animationIterationCount', '1')
            .css('-o-animationIterationCount', '1')
            .css('animationIterationCount', '1')
            .css('-webkit-animation-timing-function', 'ease-in')
            .css('-moz-animation-timing-function', 'ease-in')
            .css('-o-animation-timing-function', 'ease-in')
            .css('animation-timing-function', 'ease-in');
    }
}

function spin() {
    startable = false;
    running = true;
    startSound.play();

    initWheelSpin();

    setTimeout(function() {
        running1Sound.play();

    }, 1000)

    setTimeout(function() {
        stopable = true;
        for (var i = 1; i < 4; i++) {
            $('#ring' + i)
                .css('-webkit-animation', 'spin ' + TURNING_SPEED + 's')
                .css('-moz-animation', 'spin ' + TURNING_SPEED + 's')
                .css('-o-animation', 'spin ' + TURNING_SPEED + 's')
                .css('animation', 'spin ' + TURNING_SPEED + 's')
                .attr('class', 'ring spin')
                .css('-webkit-animationIterationCount', 'infinite')
                .css('-moz-animationIterationCount', 'infinite')
                .css('-o-animationIterationCount', 'infinite')
                .css('animationIterationCount', 'infinite')
                .css('-webkit-animation-timing-function', 'linear')
                .css('-moz-animation-timing-function', 'linear')
                .css('-o-animation-timing-function', 'linear')
                .css('animation-timing-function', 'linear');
        }

        playMusic();

    }, TURNING_SPEED * 1000)
}

var STOP_CONST = 30;

var TURNING_SPEED = 1.5;

function stopRing(ringNumber) {
    var rotation = getRotationDegree(ringNumber);
    console.log("rotation " + rotation);
    var straightRotation = rotation + (rotation % 2);
    console.log("straightRotation " + straightRotation);
    var modulo = ((straightRotation % STOP_CONST) + STOP_CONST) % STOP_CONST;
    console.log("modulo " + modulo);
    var time = ((modulo * TURNING_SPEED) / 360);
    console.log("time " + time);
    //var time = 0.2;
    $('#ring' + ringNumber)
        .css('-webkit-animation', 'stop' + straightRotation + ' ' + time + 's')
        .css('-moz-animation', 'stop' + straightRotation + ' ' + time + 's')
        .css('-o-animation', 'stop' + straightRotation + ' ' + time + 's')
        .css('animation', 'stop' + straightRotation + ' ' + time + 's')
        .attr('class', 'ring stop' + straightRotation)
        .css('-webkit-animationIterationCount', '1')
        .css('-moz-animationIterationCount', '1')
        .css('-o-animationIterationCount', '1')
        .css('animationIterationCount', '1')
        .css('-webkit-animation-timing-function', 'linear')
        .css('-moz-animation-timing-function', 'linear')
        .css('-o-animation-timing-function', 'linear')
        .css('animation-timing-function', 'linear');
}

function stop() {
    running = false;
    stopable = false;

    stopRing(1);
    playStopSounds();
    stopMusic();

    setTimeout(function() {
        stopRing(2);
        playStopSounds();
    }, 750)

    setTimeout(function() {
        stopRing(3);
        bingSound.stop();
        bingSound.play();
        playStopSounds();
    }, 1500)

    setTimeout(function() {
        running1Sound.stop();
    }, 1700)

    setTimeout(function() {
        confetti1();
    }, 2000)

    setTimeout(function() {
        winningSound.play();
        startable = true;

    }, 2500)

}

function confetti1() {
    confetti({
        particleCount: 100,
        spread: 70,
        angle: 60,
        ticks: 250,
        zIndex: 500,
        origin: {
            x: 0,
            y: 0
        }
    });
    confetti({
        particleCount: 100,
        spread: 70,
        angle: 120,
        ticks: 250,
        zIndex: 500,
        origin: {
            x: 1,
            y: 0
        }
    });
}

function playStopSounds() {
    stopSound.stop();
    stopSound.play();
}

var running = false;

$(document).ready(function() {



    initSounds();

    extractTrendNumbers();
    showHelpbox();

    // hook start button
    $(window).keypress(function(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            if (running && stopable) {
                stop();
            }
        }

        if (e.key === '+') {
            selectTrend(currentTrendNumber + 1);
        }

        if (e.key === '-') {
            selectTrend(currentTrendNumber - 1);
        }

        if (e.key === 'ü') {
            console.log("ding: " + getRotationDegree(1));
        }

        if (e.key === 'p') {
            $('#stage').toggleClass('perspective-on perspective-off');
        }

        if (e.key === 'c') {
            $('#calibration-line').toggleClass('calibration-line-on calibration-line-off');
        }

        if (e.key === 'h') {
            $('#helpbox').toggleClass('helpbox-on helpbox-off');
        }

        if (e.key === 'd') {
            dynamicMusic = !dynamicMusic;
            $('#symb-logo').toggleClass('normal inverted');
        }

        if (e.key === 'x') {
            if (startable) {
                showMaps();
            }
        }

        for (var i = 0; i < trendNumbersArray.length; i++) {
            if (e.key === trendNumbersArray[i]) {
                console.log(i);
                selectTrend(i);
            }
        }
    })
});



function initSounds() {
    stopSound = new sound("Sounds/stop.mp3", false, 1);
    bingSound = new sound("Sounds/bing.mp3", false, 1);
    startSound = new sound("Sounds/start.wav", false, 1);
    running1Sound = new sound("Sounds/running1.mp3", true, 0.5);
}

function playMusic() {
    if (m) {
        music1.play();
    } else {
        music2.play();
    }
    //m = !m;
}

function stopMusic() {
    music1.stop();
    //music2.stop();
}

function showHelpbox() {
    $('#helpbox').append('[Space] Rad stoppen    ');
    $('#helpbox').append('[h] Hilfe toggeln    ');
    $('#helpbox').append('[x] Karte    ');
    $('#helpbox').append('[+/-] Trend weiter/zurück    ');
    $('#helpbox').append('[c] Kalibrierungslinie<br>');
    for (var i = 0; i < trendNumbersArray.length; i++) {
        $('#helpbox').append('[' + trendNumbersArray[i] + '] ' + trendHeadlinesArray[i] + '    ');
    }
    $('#helpbox').append('<br> Nur mit Firefox kompatibel');
}

function selectTrend(trendNumber) {
    if (startable) {
        hideMaps();
        currentTrendNumber = trendNumber;
        if (currentTrendNumber < 0) {
            currentTrendNumber = data.length - 1;
        }
        if (currentTrendNumber > data.length - 1) {
            currentTrendNumber = 0;
        }
        ringToStop = 1;

        trendItems = [...data[currentTrendNumber]]
        trendHeadline = trendItems[0];
        trendItems.shift();

        trendImage = trendItems[0];
        trendItems.shift();
        trendItems.shift();

        trendMusic = trendItems[0];
        trendItems.shift();

        loadMusic();

        shuffle(trendItems);

        newSpin();
    }

}

var dynamicMusic = false;

function loadMusic() {
    if (dynamicMusic) {
        music1 = new sound("Music/" + trendMusic + ".mp3", true, 0.7);
        winningSound = new sound("Music/" + trendMusic + "_end.mp3", false, 0.7);
    } else {
        music1 = new sound("Music/elevator.mp3", true, 0.7);
        winningSound = new sound("Music/elevator_end.mp3", false, 0.7);
    }
}

function newSpin() {
    updateUI();
    spin();
}

function updateUI() {
    // clean previous contents
    $('.ring').html('');

    createSlots(1);
    createSlots(2);
    createSlots(3);
    createFrameSlots(4);
    createFrameSlots(5);
    createFrameSlots(6);

    updateHeadline();
}

function showMaps() {
    $('#map0').attr('class', 'map0-visible');
    $('#map1').attr('class', 'map1-visible');
    $('#map2').attr('class', 'map2-visible');
    $('#map3').attr('class', 'map3-visible');
}

function hideMaps() {
    $('#map0').attr('class', 'map-invisible');
    $('#map1').attr('class', 'map-invisible');
    $('#map2').attr('class', 'map-invisible');
    $('#map3').attr('class', 'map-invisible');
}

function updateHeadline() {
    $("#headline").html('<img src="Logos/' + trendImage + '" width="60px" style="vertical-align: middle;padding-right:15px" /><span style="vertical-align: middle;">' + trendHeadline.toUpperCase() + '</span>');
}

function sound(src, loop, volume) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    this.sound.volume = volume;
    if (loop == true) {
        this.sound.loop = true;
    }
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();

    }
    this.stop = function() {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}

function getRotationDegree(elementNumber) {
    var el = document.getElementById("ring" + elementNumber);
    var st = window.getComputedStyle(el, null);
    var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "FAIL";

    // With rotate(30deg)...
    // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
    //console.log('Matrix: ' + tr);

    // rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

    var values = tr.split('(')[1].split(')')[0].split(',');
    //console.log(values);
    var a = values[5]; //10
    var b = values[6]; //9

    var scale = Math.sqrt(a * a + b * b);

    //console.log('Scale: ' + scale);

    // arc sin, convert from radians to degrees, round
    var sin = b / scale;
    // next line works for 30deg but not 130deg (returns 50);
    // var angle = Math.round(Math.asin(sin) * (180/Math.PI));
    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

    //console.log('Rotate: ' + angle + 'deg');
    if (angle > 0) {
        angle = (360 - angle) * -1;
    }
    return angle;
}