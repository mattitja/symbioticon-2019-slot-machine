const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 100;


// excel data import
var data = [
    ['Wissenskultur', 'konn.png', 'Open Science', 'Informationsdesign', 'Bildungsbusiness', 'Massive Open Online Course', 'Gamification', 'Predictive Analytics', 'Talentismus', 'Open Innovation', 'Kollaboration', 'Sharing Economy', 'Female Shift', 'Life-Long-Learning', 'Tutorial Learning', 'Creativiteens', 'Neugiermanagement', ],
    ['Konnektivität', 'konn.png', 'Augmented Reality', 'E-Commerce', 'Crowd Funding', 'FinTech', 'Industrie 4.0', 'Big Data', 'Cybercrime', 'Privacy', 'Predictive Analytics', 'Selftracking', 'E-Health', 'Me-Cloud', 'Open Innovation', 'Pop-up Money', 'Swapping', 'Smart Devices', 'Internet der Dinge', 'Social Networks', ],
    ['Urbanisierung', 'konn.png', 'Bevölkerungswachstum', 'Third Places', 'Collaborative Living', 'Urban Manufacturing', 'Urban Mining', 'Urban Farming', 'E-Mobility', 'Bike Boom', 'Megacities', 'Global Cities', 'Landflucht', 'Schrumpfende Städte', 'Smart Cities', ],
    ['Neo-Ökologie', 'konn.png', 'Nachhaltigkeitsgesellschaft', 'Post-Carbon-Gesellschaft', 'Bio-Boom', 'Gutbürger', 'Slow Culture', 'Maker Movement', 'Sharing Economy', 'Postwachstumsökonomie', 'Social Business', 'Fair Trade', 'Swapping', 'Zero Waste', 'Green Tech', 'Urban Farming', 'E-Mobility', 'Circular Economy', ],
    ['Globalisierung', 'konn.png', 'Glokalisierung', 'Multipolare Weltordnung', 'Cybercrime', 'On-demand Business', 'Near-shoring', 'Schattenökonomie', 'Pop-up Money', 'Fair Trade', 'Social Business', 'Postwachstumsökonomie', 'Womanomics', 'Rising Africa', 'Weltmacht China', 'Global Cities', 'Migration', ],
    ['Individualisierung', 'konn.png', 'Single-Gesellschaft', 'Lebensqualität', 'Selftracking', 'Identitätsmanagement', 'Me-Cloud', 'Small-World-Networks', 'Maker Movement', 'Diversity', 'Liquid Youth', 'Multigrafie', 'Tutorial Learning', 'Regenbogenfamilien', 'Wir-Kultur', ],
    ['Gesundheit', 'konn.png', 'Sportivity', 'Detoxing', 'Komplementärmedizin', 'Lebensqualität', 'Selftracking', 'E-Health', 'Ambient Assisted Living', 'Slow Culture', 'Work-Life-Blending', 'Corporate Health', 'Healthness', 'Foodies', 'Lebensenergie', 'Achtsamkeit', ],
    ['New Work', 'konn.png', 'Work-Design', 'Outsourcing-Gesellschaft', 'Start-up-Culture', 'Slash-Slash-Biografien', 'Permanent Beta', 'Silver Potentials', 'Corporate Health', 'Work-Life Blending', 'Diversity', 'Female Shift', 'Womanomics', 'Co-Working', 'Service-Ökonomie', 'Social Business', 'Kollaboration', 'Open Innovation', 'Talentismus', 'On-demand Business', 'Flexicurity', 'Antifragilität', 'Urban Manufacturing', 'Power of Place', 'Kreativökonomie', ],
    ['Gender Shift', 'konn.png', 'Super Daddys', 'Alpha Softies', 'Sexdesign', 'Proll-Professionals', 'Work-Life-Blending', 'Diversity', 'Female Shift', 'Womanomics', 'Tiger Woman', 'Regenbogenfamilien', 'Neue Mütter', 'Phasenfamilien', ],
    ['Silver Society', 'konn.png', 'Downaging', 'Ageless Consuming', 'Forever Youngsters', 'E-Health', 'Ambient Assisted Living', 'Slow Culture', 'Diversity', 'Liquid Youth', 'Silver Potentials', 'Healthness', 'Universal Design', ],
    ['Mobilität', 'konn.png', '24/7 Gesellschaft', 'Carsharing', 'Autonomes Fahren', 'Third Places', 'Power of Place', 'Wearables', 'Langsamverkehr', 'E-Mobility', 'Bike-Boom', 'Unterwegsmärkte', 'Mobile Commerce', 'Mixed Mobility', 'End-to-End-Tourismus', ],
    ['Sicherheit', 'konn.png', 'Super-Safe-Society', 'Trust Technology', 'Transparenz-Märkte', 'E-Health', 'Identitätsmanagement', 'Digital Reputation', 'Predictive Analytics', 'Privacy', 'Cybercrime', 'Big Data', 'Industrie 4.0', 'Flexicurity', 'Antifragilität', 'Simplexity', ],
]
var trendCount = -1;
var trendHeadline = ""
var trendItems = []
var trendImage;

var firstSelectedItem, secondSelectedItem;

function createSlots(ringNumber) {

    var slotAngle = 360 / SLOTS_PER_REEL;

    //var items = ['Künstliche Intelligenz', 'Deine Mudda', 'Alice Weidel', 'Mobilität', 'Tukas', 'Haschisch legalisieren', 'Kopfkino', 'Liebe', 'Minze', 'Qualle', 'Pizza', 'Blockchain']

    var ringItems = [...trendItems];


    // shuffle and make sure all 3 rings are different
    shuffle(ringItems);
    if (ringNumber == 1) {
        firstSelectedItem = ringItems[0];
    } else if (ringNumber == 2) {
        while (ringItems[0] == firstSelectedItem) {
            shuffle(ringItems);
        }
        secondSelectedItem = ringItems[0];
    } else {
        while (ringItems[0] == firstSelectedItem || ringItems[0] == secondSelectedItem) {
            shuffle(ringItems);
        }
    }

    for (var i = 0; i < SLOTS_PER_REEL; i++) {

        if (ringItems.length == 0) {
            ringItems = [...trendItems];
        }
        var randomItem = ringItems[0];
        ringItems.shift();

        var slot = document.createElement('div');

        slot.className = 'slot';

        // compute and assign the transform for this slot
        var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

        slot.style.transform = transform;

        // setup the number to show inside the slots
        // the position is randomized to 

        //var content = $(slot).append('<p>' + ((seed + i)%12)+ '</p>');
        var content = $(slot).append('<p>' + randomItem.toUpperCase() + '</p>');

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

    slot.className = 'frameSlot';

    // compute and assign the transform for this slot
    var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

    slot.style.transform = transform;

    var content = $(slot).append('<p>' + "" + '</p>');

    // add the poster to the row
    ring.append(slot);

}

function getSeed() {
    // generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
    return Math.floor(Math.random() * (SLOTS_PER_REEL));
}

function spin() {
    //var txt = 'seeds: ';
    for (var i = 1; i < 4; i++) {
        var oldSeed = -1;
        /*
        checking that the old seed from the previous iteration is not the same as the current iteration;
        if this happens then the reel will not spin at all
        */
        var oldClass = $('#ring' + i).attr('class');
        if (oldClass.length > 4) {
            oldSeed = parseInt(oldClass.slice(10));
            console.log(oldSeed);
        }
        var seed = getSeed();
        while (oldSeed == seed) {
            seed = getSeed();
        }

        var ani2 = 'spin ' + (0.3 + (0.05 * i)) + 's';

        $('#ring' + i)
            .css('animation', ani2)
            .attr('class', 'ring spin')
            .css('animationIterationCount', 'infinite')
            .css('animation-timing-function', 'linear');
    }
}

function stop(ringNumber) {
    $('#ring' + ringNumber)
        .css('animation', 'stop 3s')
        .attr('class', 'ring stop')
        .css('animationIterationCount', '1')
        .css('animation-timing-function', 'ease-out');
}

var ringToStop = 1;

$(document).ready(function() {

    nextTrend();

    // hook start button
    $(window).keypress(function(e) {
        if (e.key === ' ' || e.key === 'Spacebar') {
            if (ringToStop <= 3) {
                stop(ringToStop);
                ringToStop++;
            } else {
                respin();
                ringToStop = 1;
            }
        }
    })

    $(window).keypress(function(e) {
        if (e.key === 'n' || e.key === 'N') {
            nextTrend();
        }
    })

    // hook perspective
    $(window).keypress(function(e) {
        if (e.key === 'p' || e.key === 'P') {
            $('#stage').toggleClass('perspective-on perspective-off');
        }
    })
});

function nextTrend() {
    ringToStop = 1;
    trendCount++;
    if (trendCount >= data.length) {
        trendCount = 0;
    }
    trendItems = [...data[trendCount]]
    trendHeadline = trendItems[0];
    trendItems.shift();

    trendImage = trendItems[0];
    trendItems.shift();

    updateUI();

    spin();
}

function respin() {
    updateUI();
    spin();
}

function updateUI() {
    $('.ring').html('');

    // initiate slots 
    createSlots(1);
    createSlots(2);
    createSlots(3);
    createFrameSlots($('#ring4'));
    createFrameSlots($('#ring5'));
    createFrameSlots($('#ring6'));

    updateHeadline();
}

function updateHeadline() {
    $("#headline").html('<img src="' + trendImage + '" width="60px" style="vertical-align: middle;padding-right:15px" /><span style="vertical-align: middle;">' + trendHeadline.toUpperCase() + '</span>');
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}