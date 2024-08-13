document.addEventListener("DOMContentLoaded", function() {
    var toggleMenu = document.getElementById("toggle-menu");
    var nav = document.querySelector("nav");

    toggleMenu.addEventListener("click", function() {
      nav.classList.toggle("show-menu");
    });

    // Afficher/masquer l'icône de menu en fonction de la largeur de l'écran
    function toggleMenuIcon() {
      if (window.innerWidth <= 768) {
        toggleMenu.style.display = "block";
      } else {
        toggleMenu.style.display = "none";
      }
    }

    window.addEventListener("resize", toggleMenuIcon);
    toggleMenuIcon();
  });