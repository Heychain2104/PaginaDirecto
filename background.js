const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for(let i=0; i<50; i++){
    particles.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*5+2,
        dx: Math.random()*2-1,
        dy: Math.random()*2-1
    });
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let j=particles.length-1; j>=0; j--){
        let p = particles[j];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = p.color || 'rgba(255,255,255,0.7)';
        ctx.fill();
        p.x += p.dx || 0;
        p.y += p.dy || 0;
        if(p.life !== undefined){
            p.life--;
            if(p.life <= 0) particles.splice(j,1);
        } else {
            if(p.x<0||p.x>canvas.width) p.dx*=-1;
            if(p.y<0||p.y>canvas.height) p.dy*=-1;
        }
    }
    requestAnimationFrame(animate);
}
animate();
