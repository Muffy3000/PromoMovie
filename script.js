document.addEventListener('DOMContentLoaded', function() {
    // Get all audio elements and play buttons
    const audioPlayers = document.querySelectorAll('.custom-audio-player');
    
    audioPlayers.forEach(player => {
        const audioId = player.querySelector('audio').id;
        const audio = document.getElementById(audioId);
        const playBtn = player.querySelector('.play-btn');
        const progressBar = player.querySelector('.progress-bar');
        const playIcon = playBtn.querySelector('.play-icon');
        const pauseIcon = playBtn.querySelector('.pause-icon');
        
        // Play/Pause functionality
        playBtn.addEventListener('click', function() {
            if (audio.paused) {
                // Pause all other audio elements first
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio && !a.paused) {
                        a.pause();
                        // Reset other play buttons
                        const otherBtn = document.querySelector(`[data-audio-id="${a.id}"]`);
                        otherBtn.querySelector('.play-icon').style.display = 'block';
                        otherBtn.querySelector('.pause-icon').style.display = 'none';
                    }
                });
                
                // Play this audio
                audio.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                // Pause this audio
                audio.pause();
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });
        
        // Update progress bar as audio plays
        audio.addEventListener('timeupdate', function() {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = progress + '%';
        });
        
        // Reset when audio ends
        audio.addEventListener('ended', function() {
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
            progressBar.style.width = '0%';
        });
        
        // Click on progress bar to seek
        player.querySelector('.progress-container').addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audio.currentTime = pos * audio.duration;
        });
        
        // Preload metadata for duration
        audio.addEventListener('loadedmetadata', function() {
            // Audio metadata loaded and duration is available
            console.log(`${audioId} duration:`, audio.duration);
        });
        
        // Error handling
        audio.addEventListener('error', function() {
            console.error(`Error loading audio: ${audioId}`);
            playBtn.disabled = true;
            playBtn.style.backgroundColor = '#666';
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
