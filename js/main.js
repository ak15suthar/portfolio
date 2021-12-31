console.clear();

const can = document.querySelector(".hero-content--img > img");

const randomX = random(10, 20);
const randomY = random(20, 30);
const randomDelay = random(0, 1);
const randomTime = random(3, 5);
const randomTime2 = random(5, 10);
const randomAngle = random(8, 12);

TweenLite.set(can, {
    x: randomX(-1),
    y: randomX(1),
    rotation: randomAngle(-1)
});

moveX(can, 1);
moveY(can, -1);
rotate(can, 1);

function rotate(target, direction) {

    TweenLite.to(target, randomTime2(), {
        rotation: randomAngle(direction),
        // delay: randomDelay(),
        ease: Sine.easeInOut,
        onComplete: rotate,
        onCompleteParams: [target, direction * -1]
    });
}

function moveX(target, direction) {

    TweenLite.to(target, randomTime(), {
        x: randomX(direction),
        ease: Sine.easeInOut,
        onComplete: moveX,
        onCompleteParams: [target, direction * -1]
    });
}

function moveY(target, direction) {

    TweenLite.to(target, randomTime(), {
        y: randomY(direction),
        ease: Sine.easeInOut,
        onComplete: moveY,
        onCompleteParams: [target, direction * -1]
    });
}

function random(min, max) {
    const delta = max - min;
    return (direction = 1) => (min + delta * Math.random()) * direction;
}

function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    if(elem.classList.contains("reveal_fromLeft")) {
        x = -100;
        y = 0;
    } else if (elem.classList.contains("reveal_fromRight")) {
        x = 100;
        y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() { animateFrom(elem) },
            onEnterBack: function() { animateFrom(elem, -1) },
            onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
        });
    });
});



const t1 = gsap.timeline({defaults: {duration: 1}})

t1    .from('.hero-circle', {
        opacity: 0, y: -100, ease:
            Elastic.easeOut.config(1, 1),
    })
    .from('.hero-content--img', {x: -400, y: 100, opacity: 0, ease:  Sine. easeInOut})
    .from('.content', {opacity: 0, y: -50, stagger: 0.6})
    .from('.hero-content__icon-list__li', {opacity: 0, y: -80, stagger: .2}, '-=.6')

t1.restart(true, false);



// Open Nav

const open = document.querySelector('.open-btn')
const close = document.querySelector('.close-btn')

let tl = gsap.timeline()

tl.to('.overlay', {opacity: 1, x: 0,scale: 1, pointerEvents: 'auto', duration: .3})
tl.to('.stagger', {opacity: 1, x: 0, stagger: .2}, '-=.3')
tl.from('.nav--link', {opacity: 0, y: -50, stagger: .2}, '-=.3')
tl.pause()

open.addEventListener('click', () => {
    tl.play()
})

close.addEventListener('click', () => {
    tl.reverse()
})