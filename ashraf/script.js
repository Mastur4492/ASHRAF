    // Confetti effect only
    const confettiBtn = document.getElementById('confettiBtn');
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let confettiParticles = [];
    const card = document.querySelector('.card');
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    function randomColor() {
      const colors = ['#6366f1', '#f59e42', '#f43f5e', '#10b981', '#fbbf24', '#3b82f6'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    function createConfetti() {
      for (let i = 0; i < 120; i++) {
        confettiParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          r: Math.random() * 7 + 4,
          d: Math.random() * 100 + 10,
          color: randomColor(),
          tilt: Math.random() * 10 - 10,
          tiltAngle: 0,
          tiltAngleIncremental: (Math.random() * 0.07) + .05
        });
      }
    }
    function drawConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + (p.r / 3), p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.d / 10);
        ctx.stroke();
      });
      updateConfetti();
    }
    function updateConfetti() {
      for (let i = 0; i < confettiParticles.length; i++) {
        let p = confettiParticles[i];
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(0.01 * p.d);
        p.tiltAngle += p.tiltAngleIncremental;
        p.tilt = Math.sin(p.tiltAngle) * 15;
        if (p.y > canvas.height) {
          confettiParticles[i] = {
            x: Math.random() * canvas.width,
            y: -10,
            r: p.r,
            d: p.d,
            color: p.color,
            tilt: p.tilt,
            tiltAngle: p.tiltAngle,
            tiltAngleIncremental: p.tiltAngleIncremental
          };
        }
      }
    }
    let confettiActive = false;
    function startConfetti() {
      if (confettiActive) return;
      confettiActive = true;
      createConfetti();
      // Add pulse animation to card and button
      card.classList.add('pulse');
      confettiBtn.classList.add('pulse');
      setTimeout(() => {
        card.classList.remove('pulse');
        confettiBtn.classList.remove('pulse');
      }, 500);
      let duration = 3000;
      let start = Date.now();
      function animate() {
        drawConfetti();
        if (Date.now() - start < duration) {
          requestAnimationFrame(animate);
        } else {
          confettiParticles = [];
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          confettiActive = false;
        }
      }
      animate();
    }
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    function showPopup() {
      popupOverlay.classList.add('active');
    }
    function hidePopup() {
      popupOverlay.classList.remove('active');
    }
    confettiBtn.addEventListener('click', () => {
      startConfetti();
      showPopup();
    });
    popupClose.addEventListener('click', hidePopup);
    popupOverlay.addEventListener('click', function(e) {
      if (e.target === popupOverlay) hidePopup();
    });
