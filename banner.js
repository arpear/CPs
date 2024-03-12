document.addEventListener('DOMContentLoaded', function() {
    // Correct approach to find the h4 element containing "LATEST"
    const h4s = document.querySelectorAll('h4');
    let latestVideoTitle = null;
    h4s.forEach(function(h4) {
        if (h4.textContent.includes('LATEST')) {
            latestVideoTitle = h4; // Save the latest video title element
            // Append a FontAwesome star icon to the title
            h4.innerHTML += ' <i class="fas fa-star"></i>'; // Adjust the class for different star styles
        }
    });

    const banner = document.getElementById('latestVideoBanner');
    const closeButton = document.getElementById('closeBanner');

    // Ensure the banner and close button are present
    if (banner && closeButton && latestVideoTitle) {
        // Scroll to the latest video when the banner text is clicked
        banner.addEventListener('click', function() {
            latestVideoTitle.scrollIntoView({ behavior: 'smooth' });
        });

        // Close the banner when the close button is clicked
        closeButton.addEventListener('click', function() {
            banner.style.display = 'none';
        });
    } else {
        console.log('Banner, close button, or latest video title element is missing.');
    }
});
