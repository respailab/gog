document.addEventListener("DOMContentLoaded", function () {
  // Back to top button
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Fade in sections as they come into view with staggered animation
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add a small delay for smoother effect
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 100);
        observer.unobserve(entry.target);

        // Stagger animations for child elements
        const childElements = entry.target.querySelectorAll(
          ".result-set, .formula, h3"
        );
        childElements.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";

            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, 50);
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade-in");
    observer.observe(section);
  });

  // Add hover effect to BibTeX
  const bibtex = document.querySelector(".bibtex");
  if (bibtex) {
    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy Citation';
    bibtex.appendChild(copyButton);

    copyButton.addEventListener("click", async () => {
      const text = bibtex.querySelector("pre").textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy Citation';
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    });
  }

  // Add subtle hover effects to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.3)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });
});
