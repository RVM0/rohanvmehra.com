// ── Email obfuscation ──────────────────────────────────────
(function() {
    const p = ['rohanvmehra', 'outlook', 'com'];
    document.getElementById('email-text').textContent = p[0] + '[at]' + p[1] + '[dot]' + p[2];
    document.getElementById('email-display').addEventListener('click', function() {
        window.location.href = 'mailto:' + p[0] + '@' + p[1] + '.' + p[2];
    });
})();

// ── Cursor glow ────────────────────────────────────────────
(function() {
    const glow = document.getElementById('cursor-glow');
    const dot  = document.getElementById('cursor-dot');
    let mx = -999, my = -999;

    document.addEventListener('mousemove', function(e) {
        mx = e.clientX; my = e.clientY;
        glow.style.left = mx + 'px';
        glow.style.top  = my + 'px';
        dot.style.left  = mx + 'px';
        dot.style.top   = my + 'px';
    });

    document.addEventListener('mouseleave', function() {
        glow.style.opacity = '0';
        dot.style.opacity  = '0';
    });
    document.addEventListener('mouseenter', function() {
        glow.style.opacity = '1';
        dot.style.opacity  = '1';
    });
})();

// ── Sticky monogram ────────────────────────────────────────
(function() {
    const monogram = document.getElementById('monogram');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            monogram.style.opacity = '1';
        } else {
            monogram.style.opacity = '0';
        }
    });
})();

// ── Matrix rain ────────────────────────────────────────────
(function() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx    = canvas.getContext('2d');
    const chars  = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const FONT_SIZE = 13;
    let cols, drops;

    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
        cols  = Math.floor(canvas.width / FONT_SIZE);
        drops = Array.from({ length: cols }, () => Math.random() * -100);
    }

    function draw() {
        ctx.fillStyle = 'rgba(0,0,0,0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = FONT_SIZE + 'px "Share Tech Mono", monospace';

        for (let i = 0; i < drops.length; i++) {
            const ch = chars[Math.floor(Math.random() * chars.length)];
            const y  = drops[i] * FONT_SIZE;
            if (Math.random() > 0.5) {
                ctx.fillStyle = '#ffffff';
            } else {
                const grey = Math.floor(160 + Math.random() * 95);
                ctx.fillStyle = `rgb(${grey},${grey},${grey})`;
            }
            ctx.fillText(ch, i * FONT_SIZE, y);
            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += 0.5;
        }
    }

    resize();
    window.addEventListener('resize', resize);
    setInterval(draw, 40);
})();
