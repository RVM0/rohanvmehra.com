// ── Email obfuscation ──────────────────────────────────────
(function() {
    const p = ['rohanvmehra', 'outlook', 'com'];
    document.getElementById('email-text').textContent = p[0] + '[at]' + p[1] + '[dot]' + p[2];
    document.getElementById('email-display').addEventListener('click', function() {
        window.location.href = 'mailto:' + p[0] + '@' + p[1] + '.' + p[2];
    });
})();

// ── Card border beam ────────────────────────────────────────
(function() {
    function initBeam(card) {
        const beam = document.createElement('span');
        beam.className = 'beam-el';
        card.appendChild(beam);

        function update() {
            const w = card.offsetWidth;
            const h = card.offsetHeight;
            const r = 4;
            beam.style.offsetPath = `path('M ${r} 0 L ${w-r} 0 Q ${w} 0 ${w} ${r} L ${w} ${h-r} Q ${w} ${h} ${w-r} ${h} L ${r} ${h} Q 0 ${h} 0 ${h-r} L 0 ${r} Q 0 0 ${r} 0 Z')`;
        }

        update();
        new ResizeObserver(update).observe(card);
    }

    document.querySelectorAll('.pub-card').forEach(initBeam);
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
