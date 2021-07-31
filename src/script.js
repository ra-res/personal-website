import './style.css'
import $ from 'jquery'

const canvas = document.getElementById("canvas1");
$(canvas).css("background-color", "black")
const ctx = canvas.getContext('2d');
const navbar = document.getElementById("navbar");
let navbarCoord = {
    top: navbar.getBoundingClientRect().top,
    bottom: navbar.getBoundingClientRect().bottom,
    left: navbar.getBoundingClientRect().left,
    right: navbar.getBoundingClientRect().right,
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let numberOfParticles = (canvas.height * canvas.width) / 6000;
let particlesArray;

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80),
}

window.addEventListener("mousemove",
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    })

// particle
class Particle {
    constructor(x, y, directionX, directionY, size, colour) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.colour = colour;
    }
    //draw method
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        if (this.x > navbarCoord.left && this.y > navbarCoord.top && this.x < navbarCoord.right && this.y < navbarCoord.bottom) {
            this.directionX = -this.directionX;
            this.directionY = -this.directionY;
        }

        // collusion detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.directionX = -this.directionX;
                this.x += 10;
                if (isInsideNavbar(this)) this.x += navbar.getBoundingClientRect().width;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.directionX = -this.directionX;
                this.x -= 10;
                if (isInsideNavbar(this)) this.x -= navbar.getBoundingClientRect().width;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.directionY = -this.directionY;
                this.y += 10;
                if (isInsideNavbar(this)) this.y += navbar.getBoundingClientRect().height;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.directionY = -this.directionY;
                this.y -= 10;
                if (isInsideNavbar(this)) this.y -= navbar.getBoundingClientRect().height;
            }
        }
        // move particles  and draw
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function createParticleAttributes() {
    let size, x, y, directionX, directionY, colour = "#ffffff";
    while (true) {
        size = (Math.random() * 5) + 1;
        x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        directionX = Math.random() - 0.5;
        directionY = Math.random() - 0.5;
        colour = "rgba(255,255,255," + Math.random() + ")";
        let p = {
            size: size,
            x: x,
            y: y,
            directionX: directionX,
            directionY: directionY,
            colour: colour
        }
        if (!isInsideNavbar(p)) {
            return p;
        }
    }
}


function init() {
    particlesArray = []
    for (let i = 0; i < numberOfParticles; i++) {
        let p = createParticleAttributes();
        particlesArray.push(new Particle(p.x, p.y, p.directionX, p.directionY, p.size, p.colour));
    }
}

function isInsideNavbar(p) {
    return p.x > navbarCoord.left && p.y > navbarCoord.top && p.x < navbarCoord.right && p.y < navbarCoord.bottom;
}

function isOutsideViewport(p) {
    return this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0;
}


function updateOnResize() {
    if (particlesArray.length === 0) particlesArray = []

    for (let i = 0; i < numberOfParticles; i++) {
        if (particlesArray[i] === null || isInsideNavbar(particlesArray[i]) || isOutsideViewport(particlesArray[i])) {
            let p = createParticleAttributes();
            particlesArray[i] = new Particle(p.x, p.y, p.directionX, p.directionY, p.size, p.colour);
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.pow(particlesArray[a].x - particlesArray[b].x, 2) + Math.pow(particlesArray[a].y - particlesArray[b].y, 2);
            // let distance = ((particlesArray[a].x - particlesArray[b].x)
            // * (particlesArray[a].x - particlesArray[b].x))
            // + ((particlesArray[a].y - particlesArray[b].y)
            // * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7) / 6) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = "rgba(255,255,255," + opacityValue + ")";
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke()
            }
        }
    }
}

window.addEventListener('resize',
    function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = (canvas.height / 80) * (canvas.width / 80);
        numberOfParticles = (canvas.height * canvas.width) / 6000;
        navbarCoord.top = navbar.getBoundingClientRect().top;
        navbarCoord.bottom = navbar.getBoundingClientRect().bottom;
        navbarCoord.left = navbar.getBoundingClientRect().left
        navbarCoord.right = navbar.getBoundingClientRect().right

        // updateOnResize();
        init();
    })

window.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    })

init();
animate();
