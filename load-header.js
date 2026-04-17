async function loadHeader() {
    try {
        const isSubPage = window.location.pathname.includes('/reach-out/') || window.location.pathname.includes('/projects/');
        const basePath = isSubPage ? '../' : './';

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = basePath + 'sidebar.css';
        document.head.appendChild(link);

        const response = await fetch(basePath + 'header.html');
        const headerHTML = await response.text();

        document.body.insertAdjacentHTML('afterbegin', headerHTML);

        document.dispatchEvent(new CustomEvent('headerLoaded'));

        initSidebar();
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

function initSidebar() {
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const closeBtn = document.querySelector('.sidebar-close');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    sidebarLinks.forEach(link => link.addEventListener('click', closeSidebar));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
