// Light Rays Effect
function initLightRays() {
    const canvas = document.getElementById('lightRays');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let rays = [];
    const numRays = 30;
    let mouseX = null;
    let mouseY = null;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initRays();
    }

    function initRays() {
        rays = [];
        for (let i = 0; i < numRays; i++) {
            rays.push({
                angle: (Math.PI / 2.5) * (i / numRays) + Math.PI / 4, // Spread from top center
                length: height * 2,
                opacity: 0.03 + Math.random() * 0.05,
                speed: 0.0002 + Math.random() * 0.0003,
                offset: Math.random() * Math.PI * 2,
                width: 40 + Math.random() * 80
            });
        }
    }

    function draw(time) {
        ctx.clearRect(0, 0, width, height);

        // Origin point (top center)
        const originX = width / 2;
        const originY = 0;

        rays.forEach((ray, index) => {
            const oscillation = Math.sin(time * ray.speed + ray.offset) * 0.05;
            const currentAngle = ray.angle + oscillation;

            // Calculate end point
            const endX = originX + Math.cos(currentAngle) * ray.length;
            const endY = originY + Math.sin(currentAngle) * ray.length;

            // Create gradient for the ray
            const gradient = ctx.createLinearGradient(originX, originY, endX, endY);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${ray.opacity})`);
            gradient.addColorStop(0.3, `rgba(255, 255, 255, ${ray.opacity * 0.5})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            // Draw ray
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(originX, originY);

            // Create a cone shape for the ray
            const perpX = -Math.sin(currentAngle);
            const perpY = Math.cos(currentAngle);

            ctx.lineTo(endX + perpX * ray.width, endY + perpY * ray.width);
            ctx.lineTo(endX - perpX * ray.width, endY - perpY * ray.width);
            ctx.closePath();

            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    // Mouse tracking for subtle interaction
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightRays);
} else {
    initLightRays();
}
