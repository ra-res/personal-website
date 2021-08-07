import './style.css'

const canvas = document.getElementById("canvas1");
canvas.style.backgroundColor = "black";
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

let connection = [
    [],
    [1, 1],
    [10, 10],
    [20, 5],
    [15, 3, 3, 3],
    [20, 3, 3, 3, 3, 3, 3, 3],
    [12, 3, 3]
]

const themes = {
    dark: {
        particle: {r: 255, b:255, g:255},
        background: "#000000"
    },
    light: {
        particle: {r:0, b:0, g:0},
        background: "#FFFFFF"
    },
    orange: {
        particle: {r:0, b:0, g:0},
        background: "#b3864d"
    }
}

let config = {
    moving: true,
    particleSize: 1,
    connectionType: connection[0],
    theme: themes.dark,
}

let particleSizeInput = document.getElementById("particleSize");
particleSizeInput.min = 1
particleSizeInput.max = 7
particleSizeInput.value= config.particleSize
particleSizeInput.addEventListener("input", function () {
   config.particleSize = parseInt(this.value);
   init();
})

let connectionSizeInput = document.getElementById("connectionSize");
connectionSizeInput.min = 0;
connectionSizeInput.max = connection.length-1;
connectionSizeInput.value = 0;
connectionSizeInput.addEventListener("input", function () {
    config.connectionType = connection[parseInt(this.value)];
    init();
})

let movement = document.getElementById("movement");
movement.addEventListener("input", function() {
    config.moving = movement.checked;
})

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

document.getElementById("preset-1").addEventListener("click", function() {
    setTheme("dark");
});
document.getElementById("preset-2").addEventListener("click", function() {
    setTheme("light");
});
document.getElementById("preset-3").addEventListener("click", function() {
    setTheme("orange");
});
document.getElementById("preset-4").addEventListener("click", function() {
    setTheme("dark");
});
document.getElementById("preset-5").addEventListener("click", function() {
    setTheme("dark");
});
document.getElementById("preset-6").addEventListener("click", function() {
    setTheme("dark");
});

function setTheme(id) {
    config.theme = themes[id]
    canvas.style.backgroundColor = config.theme.background;
}

// particle
class Particle {
    constructor(x, y, directionX, directionY, size, colour) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.colour = colour;
        this.opacity = Math.random();
    }
    //draw method
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.colour;
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
        this.colour = getConnectionColour(config.theme.particle, this.opacity);
        this.draw();
    }
}

function createParticleAttributes() {
    let size,
        x,
        y,
        directionX,
        directionY,
        colour = getConnectionColour(config.theme.particle, Math.random);
    while (true) {
        size = (Math.random() * config.particleSize) + 1;
        x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        directionX = Math.random() - 0.5;
        directionY = Math.random() - 0.5;

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

    if (config.moving){
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }
    connect();
}

function getConnectionColour(rgb, opacity) {
    return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + opacity + ")";
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = Math.pow(particlesArray[a].x - particlesArray[b].x, 2) + Math.pow(particlesArray[a].y - particlesArray[b].y, 2);
            if (distance < (canvas.width / 7) * (canvas.height / 7))  {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = getConnectionColour(config.theme.particle, opacityValue);
                ctx.beginPath();
                ctx.setLineDash(config.connectionType);
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
