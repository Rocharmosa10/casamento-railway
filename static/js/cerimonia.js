const slides = document.querySelectorAll(".slide");
    let index = 0;

    document.getElementById("next").addEventListener("click", () => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    });

    document.getElementById("prev").addEventListener("click", () => {
        slides[index].classList.remove("active");
        index = (index - 1 + slides.length) % slides.length;
        slides[index].classList.add("active");
    });
