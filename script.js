// --- Three.js Interactive Particle Canvas ---
const container = document.getElementById('canvas-container');

// Only run the Three.js code if the canvas container actually exists on the page
if (container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); 
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700; 
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 12; 
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05, 
        color: 0x274CBB, 
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesMesh.rotation.z = -Math.PI / 4; 
    scene.add(particlesMesh);
    camera.position.z = 3.5;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.0003; 
        particlesMesh.rotation.x += 0.0002;
        particlesMesh.rotation.y += mouseX * 0.02;
        particlesMesh.rotation.x += mouseY * 0.02;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- Smooth Scrolling ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// --- SCROLL REVEAL ANIMATION ---
// Uses IntersectionObserver for highly optimized scroll performance
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15, // Triggers when 15% of the section is visible
    rootMargin: "0px 0px -50px 0px" // Slightly delays the trigger until it passes the bottom lip of the screen
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Stops observing once animated to save performance
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// --- Mobile Menu Toggle ---
const menuToggle = document.querySelector('#mobile-menu');
const navCollapse = document.querySelector('.nav-collapse'); // Updated target

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        navCollapse.classList.toggle('active'); // Updated target
    });
}

// Close mobile menu automatically when a link is clicked
document.querySelectorAll('.nav-collapse a').forEach(link => {
    link.addEventListener('click', () => {
        if(menuToggle && menuToggle.classList.contains('is-active')) {
            menuToggle.classList.remove('is-active');
            navCollapse.classList.remove('active'); // Updated target
        }
    });
});


// --- AUTO-HIDING SCROLLBAR LOGIC ---
let scrollTimeout;

window.addEventListener('scroll', () => {
    // Reveal the scrollbar
    document.documentElement.classList.add('is-scrolling');
    
    // Clear the existing timeout if the user is still scrolling
    clearTimeout(scrollTimeout);
    
    // Hide the scrollbar 1 second (1000ms) after scrolling stops
    scrollTimeout = setTimeout(() => {
        document.documentElement.classList.remove('is-scrolling');
    }, 1000);
});
