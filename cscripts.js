document.addEventListener('DOMContentLoaded', function () {
    // Function to center the popup box
    function centerPopupBox(popupBox) {
        popupBox.style.top = '50%';
        popupBox.style.left = '50%';
        popupBox.style.transform = 'translate(-50%, -50%)';
        popupBox.style.position = 'fixed';
    }

    // Language Change Functionality
    function changeLanguage(lang) {
        var messages = document.getElementsByClassName('language-message');
        for (var i = 0; i < messages.length; i++) {
            messages[i].style.display = 'none';
        }
        document.getElementById(lang).style.display = 'block';
    }

    // Add event listeners for language change
    document.querySelectorAll('.language-bar .language').forEach(languageSpan => {
        languageSpan.addEventListener('click', function () {
            changeLanguage(this.getAttribute('data-lang'));
        });
    });

    // Teacher Info Toggle
    const teacherInfo = document.querySelector('.teacher-info');
    const teacherInfoBox = document.querySelector('.teacher-info-box');

    teacherInfo.addEventListener('click', function () {
        teacherInfo.classList.toggle('active');
        teacherInfoBox.style.display = teacherInfo.classList.contains('active') ? 'block' : 'none';
    });

    teacherInfo.addEventListener('mouseenter', function () {
        if (!teacherInfo.classList.contains('active')) {
            teacherInfoBox.style.display = 'block';
        }
    });

    teacherInfo.addEventListener('mouseleave', function () {
        if (!teacherInfo.classList.contains('active')) {
            teacherInfoBox.style.display = 'none';
        }
    });

    // Hover Image on Theme Titles
    const hoverImage = new Image();
    hoverImage.src = 'Click Me.png';
    hoverImage.style.width = '70px';
    hoverImage.style.height = '70px';
    hoverImage.style.position = 'absolute';
    hoverImage.style.zIndex = '50';
    hoverImage.style.display = 'none';

    document.body.appendChild(hoverImage);
    document.querySelectorAll('#u8content-box .theme-title').forEach(title => {
        title.addEventListener('mouseenter', function (event) {
            let rect = event.target.getBoundingClientRect();
            hoverImage.style.top = `${rect.top + window.scrollY - hoverImage.offsetHeight - 50}px`;
            hoverImage.style.left = `${rect.left - -60}px`;
            hoverImage.style.display = 'block';
        });

        title.addEventListener('mouseleave', function () {
            hoverImage.style.display = 'none';
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('b2t');
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Subtheme Expandable/Retractable Sections
    document.querySelectorAll('.subtheme > h3').forEach(header => {
        header.addEventListener('click', function () {
            let content = this.nextElementSibling;
            if (content.classList.contains('theme-objectives')) {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
                this.classList.toggle('active');
            }
        });
    });

    // Pop-up Box Functionality
    const mainContent = document.querySelector('.main-content');

    // Draggable functionality
    function makeDraggable(popupBox) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        popupBox.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            popupBox.style.top = (popupBox.offsetTop - pos2) + "px";
            popupBox.style.left = (popupBox.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    document.querySelectorAll('.theme-title a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            let themeId = this.parentElement.id;
            let popupBoxId = 'popup-box-' + themeId;
            let popupBox = document.getElementById(popupBoxId);
            popupBox.style.display = 'block';
            centerPopupBox(popupBox);
            let blurButton = popupBox.querySelector('.blur-toggle-btn');
            mainContent.classList.add('blurred');
            blurButton.classList.add('active');
        });
    });

    document.querySelectorAll('.popup-box').forEach(popupBox => {
        makeDraggable(popupBox);
        popupBox.addEventListener('dblclick', function () {
            centerPopupBox(popupBox);
        });
    });

    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            let popupBox = this.closest('.popup-box');
    
            // Check if the popup box is currently in fullscreen
            if (document.fullscreenElement === popupBox) {
                console.log("Exiting fullscreen mode for popup box...");
                document.exitFullscreen().then(() => {
                    console.log("Exited fullscreen mode.");
                    // Additional logic after exiting fullscreen
                }).catch(err => {
                    console.error("Error trying to exit fullscreen mode:", err);
                });
            }
    
            // Hide the popup box
            popupBox.style.display = 'none';
            mainContent.classList.remove('blurred');
            popupBox.querySelector('.blur-toggle-btn').classList.remove('active');
            popupBox.querySelector('.maximize-btn').classList.remove('active');
        });
    });
    

// Maximize/minimize functionality
document.querySelectorAll('.maximize-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        let popupBox = this.closest('.popup-box');

        if (document.fullscreenElement === popupBox) {
            console.log("Exiting fullscreen mode for popup box...");
            document.exitFullscreen().then(() => {
                console.log("Exited fullscreen mode.");
                this.classList.remove('active');
                centerPopupBox(popupBox);
            }).catch(err => {
                console.error("Error trying to exit fullscreen mode:", err);
            });
        } else {
            console.log("Entering fullscreen mode for popup box...");
            popupBox.requestFullscreen().then(() => {
                console.log("Entered fullscreen mode.");
                this.classList.add('active');
            }).catch(err => {
                console.error("Error trying to enter fullscreen mode:", err);
            });
        }
    });
});

    // Blur toggle functionality
    document.querySelectorAll('.blur-toggle-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            mainContent.classList.toggle('blurred');
            this.classList.toggle('active');
        });
    });

    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const buttonContainerSmall = document.querySelector('.button-container-small');
    menuIcon.addEventListener('click', function() {
        buttonContainerSmall.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Find all h4 elements
    const h4s = document.querySelectorAll('h4');

    // Loop through all h4 elements to find the one with 'LATEST'
    h4s.forEach(function(h4) {
        if(h4.textContent.includes('LATEST')) {
            // Append a FontAwesome star icon to the title
            h4.innerHTML += ' <i class="fas fa-star"></i>'; // Adjust the class for different star styles
        }
    });
});
