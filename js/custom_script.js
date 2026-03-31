/* Daxos Capital - Custom Scripts
   Adapted from theme's custom_script.js + typing animation */

(function() {
    'use strict';

    // ========================================
    // HAMBURGER MENU - Sidebar Toggle
    // ========================================
    document.addEventListener("DOMContentLoaded", function() {

        function toggleSidebar() {
            var navButton = document.querySelector(".daxos-menu .nav-button");
            if (navButton) {
                navButton.classList.toggle("active");
            }
            document.body.classList.toggle("nav-active");
        }

        var navBtn = document.querySelector(".daxos-menu .nav-button");
        if (navBtn) {
            navBtn.addEventListener("click", function() {
                toggleSidebar();
            });
        }

        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 27 && document.body.classList.contains("nav-active")) {
                toggleSidebar();
            }
        });

        // ========================================
        // STICKY HEADER
        // ========================================
        var header = document.getElementById("page-header");
        if (header) {
            window.addEventListener("scroll", function() {
                if (window.scrollY > 100) {
                    header.classList.add("sticky");
                } else {
                    header.classList.remove("sticky");
                }
            });
        }

        // ========================================
        // TYPING ANIMATION (from ultimate_fancytext)
        // ========================================
        var typedMain = document.querySelector(".typed-main");
        if (typedMain) {
            var strings = [
                "banking.",
                "lending.",
                "payments.",
                "e-commerce.",
                "data.",
                "gaming.",
                "and beyond."
            ];

            var stringIndex = 0;
            var charIndex = 0;
            var isDeleting = false;
            var typeSpeed = 35;
            var backSpeed = 0; // strings_backspeed="0" means no deleting, move to next

            function typeWriter() {
                var current = strings[stringIndex];

                if (!isDeleting) {
                    // Typing forward
                    typedMain.textContent = current.substring(0, charIndex + 1);
                    charIndex++;

                    if (charIndex === current.length) {
                        // Finished typing current string
                        if (backSpeed === 0) {
                            // No backspacing - pause then clear and move to next
                            setTimeout(function() {
                                typedMain.textContent = "";
                                charIndex = 0;
                                stringIndex = (stringIndex + 1) % strings.length;
                                setTimeout(typeWriter, 200);
                            }, 1500);
                            return;
                        } else {
                            isDeleting = true;
                            setTimeout(typeWriter, 1500);
                            return;
                        }
                    }
                } else {
                    // Deleting
                    typedMain.textContent = current.substring(0, charIndex - 1);
                    charIndex--;

                    if (charIndex === 0) {
                        isDeleting = false;
                        stringIndex = (stringIndex + 1) % strings.length;
                        setTimeout(typeWriter, 200);
                        return;
                    }
                }

                var speed = isDeleting ? backSpeed : typeSpeed;
                setTimeout(typeWriter, speed);
            }

            // Start the typing animation
            setTimeout(typeWriter, 500);
        }

        // ========================================
        // PRELOADER
        // ========================================
        var preloader = document.querySelector('.preloader');
        if (preloader) {
            if (!sessionStorage.getItem('doNotShow')) {
                sessionStorage.setItem('doNotShow', 'true');
                var preloaderArray = [
                    '<div class="text">D</div>',
                    '<div class="text">Da</div>',
                    '<div class="text">Dax</div>',
                    '<div class="text">Daxo</div>',
                    '<div class="text">Daxos</div>',
                    '<div class="zoom-in">X</div>'
                ];
                preloaderArray.forEach(function(item, index) {
                    setTimeout(function() {
                        preloader.innerHTML = item;
                    }, index * 180);
                });
                var arrayLength = preloaderArray.length;
                setTimeout(function() {
                    preloader.remove();
                }, arrayLength * 180 + 180);
            } else {
                preloader.style.visibility = 'hidden';
                preloader.style.display = 'none';
            }
        }

    });

})();
