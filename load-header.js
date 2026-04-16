// Load header from external file
async function loadHeader() {
    try {
        const headerPath = window.location.pathname.includes('/reach-out/') 
            ? '../header.html' 
            : './header.html';
        
        const response = await fetch(headerPath);
        const headerHTML = await response.text();
        
        // Insert header at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Dispatch custom event to notify that header is loaded
        document.dispatchEvent(new CustomEvent('headerLoaded'));
    } catch (error) {
        console.error('Error loading header:', error);
    }
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}