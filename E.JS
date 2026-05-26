function draw() {
    ctx.fillStyle = '#030014';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // A. Draw Stars
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    // B. Draw Bunting Flags
    const flagSpacing = canvas.width / 14;
    const flagHeight = 35;
    
    for (let i = 0; i < 6; i++) {
        ctx.fillStyle = FLAG_COLORS[i % FLAG_COLORS.length];
        ctx.beginPath();
        ctx.moveTo(i * flagSpacing, 15);
        ctx.lineTo((i + 1) * flagSpacing, 15);
        ctx.lineTo(i * flagSpacing + flagSpacing / 2, 15 + flagHeight);
        ctx.closePath();
        ctx.fill();
    }
    for (let i = 0; i < 6; i++) {
        ctx.fillStyle = FLAG_COLORS[i % FLAG_COLORS.length];
        ctx.beginPath();
        ctx.moveTo(canvas.width - (i * flagSpacing), 15);
        ctx.lineTo(canvas.width - ((i + 1) * flagSpacing), 15);
        ctx.lineTo(canvas.width - (i * flagSpacing + flagSpacing / 2), 15 + flagHeight);
        ctx.closePath();
        ctx.fill();
    }

    // C. Draw Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 42px "Comic Sans MS", sans-serif';
    ctx.fillText("Eid-UL-Adha", canvas.width / 2, canvas.height * 0.22);
    ctx.fillText("Mubarak", canvas.width / 2, canvas.height * 0.32);

    // D. Bounce Logic
    sheepYOffset += bounceSpeed * direction;
    if (Math.abs(sheepYOffset) > 12) direction *= -1;

    // --- CRITICAL POSITIONING OVERHAUL ---
    const sheepX = canvas.width / 2; 
    const sheepY = canvas.height * 0.55 + sheepYOffset;

    // E. Draw Sheep Legs (Shifted coordinates downwards and structured directly below the body frame)
    ctx.fillStyle = '#646464';
    const legW = 12, legH = 75; // Enhanced dimensional variables
    const legYStart = sheepY + 35; // Pushed deep past the overlapping fluff radius

    ctx.fillRect(sheepX - 40, legYStart, legW, legH);
    ctx.fillRect(sheepX - 15, legYStart, legW, legH);
    ctx.fillRect(sheepX + 10, legYStart, legW, legH);
    ctx.fillRect(sheepX + 35, legYStart, legW, legH);

    // Draw Wool Body (Centered accurately around sheepX)
    ctx.fillStyle = '#f0f0f0';
    const bodyRadius = 45;
    const circles = [[0, 0], [-35, -10], [35, -10], [-45, 15], [45, 15], [-25, 35], [25, 35], [0, 25]];
    circles.forEach(pos => {
        ctx.beginPath();
        ctx.arc(sheepX + pos[0], sheepY + pos[1], bodyRadius, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw Head
    const headX = sheepX + 35;
    const headY = sheepY + 5;
    const headRadius = 32;

    // Ears
    ctx.fillStyle = '#ffb6c1';
    ctx.beginPath(); ctx.ellipse(headX - 10, headY - 25, 18, 12, -Math.PI/6, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(headX + 25, headY - 25, 18, 12, Math.PI/6, 0, Math.PI * 2); ctx.fill();

    // Face Base
    ctx.fillStyle = '#ffdab9';
    ctx.beginPath();
    ctx.arc(headX, headY, headRadius, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = '#000000';
    ctx.beginPath(); ctx.arc(headX - 10, headY - 5, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(headX + 10, headY - 5, 4, 0, Math.PI * 2); ctx.fill();

    // Cheeks
    ctx.fillStyle = '#ffb6c1';
    ctx.beginPath(); ctx.arc(headX - 18, headY + 8, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(headX + 18, headY + 8, 5, 0, Math.PI * 2); ctx.fill();

    // Smile
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(headX, headY + 5, 8, 0, Math.PI);
    ctx.stroke();

    // F. POV Footer Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Arial';
    ctx.fillText("Pov: Eid-UL-Adha Mubarak from Ashar Ijaz 🐑🤍", canvas.width / 2, canvas.height - 90);

    requestAnimationFrame(draw);
}