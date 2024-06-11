document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project a');

    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            project.style.backgroundColor = '#ff6347';
        });

        project.addEventListener('mouseleave', function() {
            project.style.backgroundColor = '#333';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const projects = document.querySelectorAll('.project');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    projects.forEach(project => {
        observer.observe(project);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const navLinks = document.getElementById('nav-links');

    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('change');
        navLinks.classList.toggle('show');
    });

    document.querySelectorAll('.nav-links ul li a').forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('change');
            navLinks.classList.remove('show');
        });
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});