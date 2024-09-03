(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("html").classList.add("webp");
      } else {
         document.querySelector("html").classList.add("no-webp");
      }
   });
})();
gsap.registerPlugin(ScrollTrigger);
const body = document.body;
document.addEventListener("DOMContentLoaded", () => {
   aboutPage();
});
function aboutPage() {
   if (!document.querySelector(".about-hero")) return;
   function heroAnimation() {
      const hero = document.querySelector(".about-hero");
      setTimeout(() => {
         hero.classList.add("load");
      }, 100);
   }

   function secondAnim() {
      gsap.to(".about-second__bg", {
         scrollTrigger: {
            trigger: ".about-second__bg",
            start: "top 80%", // when the top of the trigger hits the top of the viewport
            end: "top 0%", // end after scrolling 500px beyond the start
            scrub: 1.5,
            // markers: true,
         },
         opacity: 1,
      });
      const spans = document.querySelectorAll(".about-second__text span");
      spans.forEach((span) => {
         gsap.to(span, {
            scrollTrigger: {
               trigger: span, // элемент, который должен запускать анимацию
               start: "top 70%", // когда верх элемента достигает 80% высоты экрана
               end: "bottom 30%", // когда низ элемента достигает 20% высоты экрана
               // markers: true, // включить маркеры для визуальной отладки
               scrub: 1.5,
            },
            opacity: 1,
            duration: 1,
         });
      });
   }
   function circleAnim() {
      const spans = document.querySelectorAll(".about-circle span");
      const contents = document.querySelectorAll(".about-circle__content");
      const fill = document.querySelector(".about-circle .fill");
      const circle = document.querySelector(".about-circle .border");
      const length = fill.getTotalLength();
      fill.style.strokeDasharray = length;
      fill.style.strokeDashoffset = length;

      circle.style.width = fill.getBoundingClientRect().width + 0 + "px";
      circle.style.height = fill.getBoundingClientRect().width + 0 + "px";

      gsap.to(fill, {
         scrollTrigger: {
            trigger: fill, // элемент, который должен запускать анимацию
            start: "top 50%", // когда верх элемента достигает 80% высоты экрана
            end: "bottom -80%", // когда низ элемента достигает 20% высоты экрана
            // markers: true, // включить маркеры для визуальной отладки
            scrub: 1.5,
         },
         strokeDashoffset: 0, // Уменьшаем смещение до 0, чтобы показать линию полностью
         duration: 2, // Продолжительность анимации
         ease: "power1.inOut", // Тип анимации для плавного эффекта
         onUpdate: function () {
            // Проверяем прогресс анимации
            const progress = this.progress();
            console.log(progress);
            if (progress < 0.35 && !spans[0].classList.contains("active")) {
               spans[0].classList.add("active");
            }
            if (progress >= 0.35 && !spans[1].classList.contains("active")) {
               spans[1].classList.add("active");
            }
            if (progress >= 0.5 && !spans[2].classList.contains("active")) {
               spans[2].classList.add("active");
            }
            if (progress >= 0.65 && !spans[3].classList.contains("active")) {
               spans[3].classList.add("active");
            }
            if (progress == 0) {
               spans[0].classList.remove("active");
            }
            if (progress < 0.35) {
               spans[1].classList.remove("active");
            }
            if (progress < 0.5) {
               spans[2].classList.remove("active");
            }
            if (progress < 0.65) {
               spans[3].classList.remove("active");
            }

            if (progress >= 0 && progress < 35) {
               contents[0].classList.add("active");
               contents[1].classList.remove("active");
               contents[2].classList.remove("active");
               contents[3].classList.remove("active");
            }
            if (progress >= 0.35 && progress < 0.5) {
               contents[1].classList.add("active");
               contents[0].classList.remove("active");
               contents[2].classList.remove("active");
               contents[3].classList.remove("active");
            }
            if (progress >= 0.5 && progress < 0.65) {
               contents[2].classList.add("active");
               contents[0].classList.remove("active");
               contents[1].classList.remove("active");
               contents[3].classList.remove("active");
            }
            if (progress >= 0.65) {
               contents[3].classList.add("active");
               contents[1].classList.remove("active");
               contents[2].classList.remove("active");
               contents[0].classList.remove("active");
            }
         },
      });
   }
   secondAnim();
   heroAnimation();
   circleAnim();
}
