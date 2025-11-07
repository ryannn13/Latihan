document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const modeToggle = document.getElementById('mode-toggle');
    const html = document.documentElement;
    const modeText = document.getElementById('current-mode');

    // Fungsi untuk menerapkan mode (Dark/Light)
    function applyMode(mode) {
        if (mode === 'light') {
            html.classList.add('light-mode');
            modeToggle.innerHTML = '&#9728;'; // Ikon Matahari untuk Light Mode
            modeToggle.title = 'Switch to Dark Mode';
            modeText.textContent = 'Light Mode';
        } else {
            html.classList.remove('light-mode');
            modeToggle.innerHTML = '&#9789;'; // Ikon Bulan untuk Dark Mode
            modeToggle.title = 'Switch to Light Mode';
            modeText.textContent = 'Dark Mode';
        }
        // Simpan preferensi mode di Local Storage
        localStorage.setItem('theme', mode);
    }

    // Inisialisasi: Periksa Preferensi Pengguna/Penyimpanan Lokal
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Terapkan mode:优先使用 Local Storage, kemudian preferensi sistem, default ke 'dark'
    if (savedTheme) {
        applyMode(savedTheme);
    } else if (prefersDark) {
        applyMode('dark');
    } else {
        applyMode('dark'); 
    }

    // Event Listener untuk Tombol Toggle
    modeToggle.addEventListener('click', function() {
        const currentMode = html.classList.contains('light-mode') ? 'light' : 'dark';
        const newMode = currentMode === 'dark' ? 'light' : 'dark';
        applyMode(newMode);
    });

    // Fungsionalitas Navigasi Mobile (Hamburger Menu)
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Smooth Scrolling dan Menutup Menu
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Tutup menu jika terbuka (untuk mobile)
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Lakukan smooth scroll
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
