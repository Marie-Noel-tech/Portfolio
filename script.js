document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. CONTACT FORM
    ===================================================== */

    const contactForm = document.getElementById("contact-form");
    const sendButton = document.getElementById("send-button");
    const formStatus = document.getElementById("form-status");

    if (contactForm && sendButton && formStatus) {

        contactForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            sendButton.disabled = true;
            sendButton.textContent = "Sending...";

            formStatus.textContent = "";
            formStatus.className = "";
            formStatus.style.display = "none";

            const formData = new FormData(contactForm);

            try {

                const response = await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",
                        body: formData
                    }
                );

                const result = await response.json();

                if (result.success) {

                    formStatus.textContent =
                        "Thank you! Your message has been sent successfully.";

                    formStatus.className = "success";

                    contactForm.reset();

                    sendButton.textContent = "Message Sent";

                } else {

                    formStatus.textContent =
                        "Sorry, your message could not be sent. Please try again.";

                    formStatus.className = "error";

                    sendButton.textContent = "Send Message";
                }

            } catch (error) {

                console.error("Form error:", error);

                formStatus.textContent =
                    "Something went wrong. Please check your internet connection and try again.";

                formStatus.className = "error";

                sendButton.textContent = "Send Message";
            }

            sendButton.disabled = false;

        });

    }


    /* =====================================================
       2. MOBILE HAMBURGER MENU
    ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {

                menuToggle.textContent = "✕";

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            } else {

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });


        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });

    }


    /* =====================================================
       3. ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section");
    const navigationLinks = document.querySelectorAll("nav ul li a");


    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navigationLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       4. SCROLL REVEAL ANIMATION
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".about-content > h2, " +
        ".about-sub-content, " +
        ".skills-type, " +
        ".Project-type, " +
        ".category-of-experience, " +
        ".level-of-education, " +
        ".Certifications, " +
        ".contact-detail, " +
        ".Contact-me-directly, " +
        ".footer-container"
    );


    /*
       If the browser does not support
       IntersectionObserver, keep everything visible.
    */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach(function (element) {

            element.classList.add("show");

        });

    } else {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        revealElements.forEach(function (element) {

            element.classList.add("scroll-reveal");

            revealObserver.observe(element);

        });

    }

});