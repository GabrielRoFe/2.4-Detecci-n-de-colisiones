const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    draw(context) {
        context.beginPath();

        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "20px Arial";
        context.fillText(this.text, this.posX, this.posY);

        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        if ((this.posX + this.radius) > window_width || (this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.posY - this.radius) < 0 || (this.posY + this.radius) > window_height) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }
}

function getDistance(posX1, posY1, posX2, posY2) {
    return Math.sqrt(Math.pow((posX2 - posX1), 2) + Math.pow((posY2 - posY1), 2));
}

let circles = [
    new Circle(100, 100, 50, "blue", "1", 4),
    new Circle(250, 150, 20, "blue", "2", 4),
    new Circle(300, 400, 70, "blue", "3", 5),
    new Circle(500, 500, 90, "blue", "4", 7),
    new Circle(390, 150, 40, "blue", "5", 9),
    new Circle(180, 200, 50, "blue", "6", 11),
    new Circle(400, 300, 70, "blue", "7", 13),
    new Circle(222, 340, 100, "blue", "8", 15),
    new Circle(340, 410, 64, "blue", "9", 17),
    new Circle(450, 310, 87, "blue", "10", 19)
];

function updateCircles() {
    requestAnimationFrame(updateCircles);
    ctx.clearRect(0, 0, window_width, window_height);
    circles.forEach(circle => circle.update(ctx));
    checkCollisions();
}

function checkCollisions() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].color = "blue"; // Restablecer todos los círculos a azul antes de verificar las colisiones
        
        for (let j = 0; j < circles.length; j++) {
            if (i !== j) {
                if (getDistance(circles[i].posX, circles[i].posY, circles[j].posX, circles[j].posY) < (circles[i].radius + circles[j].radius)) {
                    circles[i].color = "red";
                    circles[j].color = "red";

                    // Calcular la nueva dirección para el primer círculo
                    const dx = circles[i].posX - circles[j].posX;
                    const dy = circles[i].posY - circles[j].posY;
                    const angle = Math.atan2(dy, dx);

                    circles[i].dx = Math.cos(angle) * circles[i].speed;
                    circles[i].dy = Math.sin(angle) * circles[i].speed;

                    // Calcular la nueva dirección para el segundo círculo
                    circles[j].dx = -Math.cos(angle) * circles[j].speed;
                    circles[j].dy = -Math.sin(angle) * circles[j].speed;
                }
            }
        }
    }
}

updateCircles();
