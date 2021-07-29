const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
        ctx.fillStyle = "#8C55323";
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // collusion detection
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy) * 2;
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        // move particles  and draw
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = []
    let numberOfParticles = (canvas.height * canvas.width) / 6000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2)
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2)
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let colour = "#8C5523";
        particlesArray.push(new Particle(x, y, directionX, directionY, size, colour));
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
            if (distance < (canvas.width / 7) * (canvas.height / 7) / 3) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = "rgba(140,82,31,"+ opacityValue +")";
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
    })

window.addEventListener('mouseout',
    function() {
        mouse.x = undefined;
        mouse.y = undefined;
    })
init();
animate();