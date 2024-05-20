// Adds a badge using path_CID
// Looks for <div id="badgeContainer"></div> in HTML

(function() {
    // Updated path_CID value
    var path_CID = 'bafkreidbqi42s3u2qgtcutiyct5ouuy66grhl4562aepl6mmqr6kt44ode';
    
    // Ensure the badgeContainer div exists
    var badgeContainer = document.getElementById('badgeContainer');
    if (!badgeContainer) {
        console.error('Badge container not found.');
        return;
    }

    // Define the URL for the badge content
    var contentUrl = 'https://liquicert.io/badge/embed?path_CID=' + encodeURIComponent(path_CID);

    // Fetch the badge content
    fetch(contentUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            // Insert the badge HTML content into the badgeContainer
            badgeContainer.innerHTML = html;

            // Execute any <script> tags found in the response
            var scripts = badgeContainer.querySelectorAll('script');
            scripts.forEach(script => {
                var newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript).parentNode.removeChild(newScript);
            });

            // Here you may call initiateInteractions if it's defined outside of this script
            // initiateInteractions();
        })
        .catch(error => {
            console.error('Failed to load badge content:', error);
        });
})();


// Add event listeners

function manualInitiateInteractions() {
    // Ensure elements are available in the DOM
    const badgeImage = document.getElementById('badgeImage');
    const previewDiv = document.getElementById('preview');

    if (!badgeImage || !previewDiv) {
        console.error("Badge image or preview div not found. Interactions can't be initiated.");
        return;
    }

    // Function to update the preview position
    function updatePreviewPosition(x, y) {
        previewDiv.style.left = `${x + 10}px`; // Offset from cursor
        previewDiv.style.top = `${y + 10}px`; // Offset from cursor
    }

    // Mouseover event to show the preview
    badgeImage.addEventListener('mouseover', (event) => {
        previewDiv.style.display = 'block'; // Show the preview div
        updatePreviewPosition(event.clientX, event.clientY); // Initial position update
    });

    // Mousemove event to move the preview with the mouse
    badgeImage.addEventListener('mousemove', (event) => {
        updatePreviewPosition(event.clientX, event.clientY); // Update position as mouse moves
    });

    // Mouseout event to hide the preview
    badgeImage.addEventListener('mouseout', () => {
        previewDiv.style.display = 'none'; // Hide the preview div
    });

    console.log("Event listeners for badge interactions have been manually initiated.");
}

// Execute the function to manually initiate interactions
manualInitiateInteractions();
