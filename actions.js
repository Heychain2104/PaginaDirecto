function sendAction(action){
    addChatMessage(`¡Acción enviada: ${action}!`);

    if(action === 'Shake'){
        shakeScreen();
    } else if(action === 'TNT'){
        explodeParticles();
    } else if(action === 'Confeti'){
        spawnConfetti();
    }
}

// Shake
function shakeScreen(){
    const body = document.body;
    let i = 0;
    const interval = setInterval(() => {
        const x = (Math.random()-0.5)*20;
        const y = (Math.random()-0.5)*20;
        body.style.transform = `translate(${x}px, ${y}px)`;
        i++;
        if(i>10){
            clearInterval(interval);
            body.style.transform = 'translate(0,0)';
        }
    }, 50);
}

// TNT
function explodeParticles(){
    for(let i=0; i<30; i++){
        const particle = {
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*5+2,
            dx: (Math.random()-0.5)*10,
            dy: (Math.random()-0.5)*10,
            color: `hsl(${Math.random()*360}, 100%, 50%)`,
            life: 20
        };
        particles.push(particle);
    }
}

// Confeti
function spawnConfetti(){
    for(let i=0; i<50; i++){
        const particle = {
            x: Math.random()*canvas.width,
            y: -10,
            r: Math.random()*5+2,
            dx: (Math.random()-0.5)*5,
            dy: Math.random()*5+2,
            color: `hsl(${Math.random()*360}, 100%, 50%)`,
            life: 100
        };
        particles.push(particle);
    }
}
