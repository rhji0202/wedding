document.addEventListener("DOMContentLoaded", function () {
  // Initialize Lucide icons
  lucide.createIcons();

  // Background music functionality
  const bgMusic = document.getElementById("bgMusic");
  let musicStarted = false;

  // Function to start music on user interaction
  function startMusic() {
    if (bgMusic && !musicStarted) {
      bgMusic
        .play()
        .then(() => {
          // Only remove event listeners after successful playback
          musicStarted = true;
          document.removeEventListener("click", startMusic);
          document.removeEventListener("touchstart", startMusic);
        })
        .catch((error) => {
          console.log("Audio playback failed:", error);
          // Keep event listeners active for retry on subsequent interactions

          // Show visual feedback to user to click the music button
          const musicControl = document.querySelector(".music-control");
          if (musicControl) {
            musicControl.classList.add("needs-interaction");
            setTimeout(
              () => musicControl.classList.remove("needs-interaction"),
              3000
            );
          }
        });
    }
  }

  // Add event listeners for user interaction (direct interactions only)
  document.addEventListener("click", startMusic);
  document.addEventListener("touchstart", startMusic);

  // Music toggle function
  window.toggleMusic = function () {
    if (bgMusic) {
      if (bgMusic.paused) {
        bgMusic.play();
        document.querySelector(".music-control").classList.add("playing");
      } else {
        bgMusic.pause();
        document.querySelector(".music-control").classList.remove("playing");
      }
    }
  };

  // Page navigation variables
  let currentPage = 1;
  const totalPages = 9;
  let touchStartX = 0;
  let touchEndX = 0;

  // Initialize floating hearts animation
  initFloatingHearts();

  // Countdown timer functionality
  function updateCountdown() {
    const weddingDate = new Date("2025-10-26T14:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
  }

  // Update countdown immediately and every second
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Update anniversary message with remaining days
  function updateAnniversaryMessage() {
    const weddingDate = new Date("2025-10-26T14:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

    const anniversaryMessage = document.querySelector(".anniversary-message");
    if (anniversaryMessage) {
      anniversaryMessage.textContent = `지림호 ❤️ 이화자의 결혼식이 ${days}일 남았습니다.`;
    }
  }

  // Update anniversary message immediately and every minute
  updateAnniversaryMessage();
  setInterval(updateAnniversaryMessage, 60000);

  // Page navigation functions

  window.goToPage = function (pageNum) {
    if (pageNum >= 1 && pageNum <= totalPages) {
      currentPage = pageNum;
      scrollToPage(currentPage);
    }
  };

  function scrollToPage(pageNum) {
    const page = document.getElementById(`page${pageNum}`);
    if (page) {
      page.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Show all pages initially
  function initializePages() {
    for (let i = 1; i <= totalPages; i++) {
      const page = document.getElementById(`page${i}`);
      if (page) {
        page.classList.add("active");
      }
    }
  }

  // Call initializePages to show all pages
  initializePages();

  // Update currentPage based on scroll position
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    for (let i = 1; i <= totalPages; i++) {
      const page = document.getElementById(`page${i}`);
      if (page) {
        const pageTop = page.offsetTop;
        const pageBottom = pageTop + page.offsetHeight;

        if (scrollPosition >= pageTop && scrollPosition < pageBottom) {
          currentPage = i;
          break;
        }
      }
    }
  });

  // Floating hearts animation
  function initFloatingHearts() {
    const container = document.querySelector(".invitation-container");

    if (!container) return;

    function createFloatingHeart() {
      // Create a new heart element
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = '<i class="icon-heart"></i>';

      // Random position and animation properties
      const size = Math.random() * 15 + 10;
      const leftPos = Math.random() * 100;
      const delay = Math.random() * 2;
      const duration = Math.random() * 3 + 2;
      const opacity = Math.random() * 0.5 + 0.3;
      const rotation = Math.random() * 360;

      // Apply styles
      heart.style.left = `${leftPos}%`;
      heart.style.top = "100%";
      heart.style.fontSize = `${size}px`;
      heart.style.animationDuration = `${duration}s`;
      heart.style.animationDelay = `${delay}s`;
      heart.style.opacity = opacity;
      heart.style.transform = `rotate(${rotation}deg)`;

      // Add to container
      container.appendChild(heart);

      // Remove heart after animation completes
      setTimeout(() => {
        heart.remove();
      }, duration * 1000);
    }

    // Create hearts at intervals
    setInterval(createFloatingHeart, 600);
  }

  // Gallery functionality
  const galleryThumbs = document.querySelectorAll(".gallery-thumb");
  const galleryMainImage = document.querySelector(".gallery-main-image");

  // Set background images for gallery thumbnails
  const galleryImages = [
    "photo/DSC00835-compressed-compressed.jpg",
    "photo/DSC00840-compressed-compressed.jpg",
    "photo/DSC00854-compressed-compressed.jpg",
    "photo/DSC00873-compressed-compressed.jpg",
    "photo/DSC00879-compressed-compressed.jpg",
    "photo/DSC00904-compressed-compressed.jpg",
    "photo/DSC00908-compressed-compressed.jpg",
    "photo/DSC00920-compressed-compressed.jpg",
    "photo/DSC00933-compressed-compressed.jpg",
    "photo/DSC00945-compressed-compressed.jpg",
    "photo/DSC00948-compressed-compressed.jpg",
    "photo/DSC00952-compressed-compressed.jpg",
    "photo/DSC00959-compressed-compressed.jpg",
    "photo/DSC00961-compressed-compressed.jpg",
    "photo/DSC00979-compressed-compressed.jpg",
    "photo/DSC00989-compressed-compressed.jpg",
    "photo/DSC00990-compressed-compressed.jpg",
    "photo/DSC00997-compressed-compressed.jpg",
    "photo/DSC01036-compressed-compressed.jpg",
    "photo/DSC01048-compressed-compressed.jpg",
    "photo/DSC01052-compressed-compressed.jpg",
    "photo/DSC01068-compressed-compressed.jpg",
    "photo/DSC01070-compressed-compressed.jpg",
    "photo/DSC01081-compressed-compressed.jpg",
    "photo/DSC01087-compressed-compressed.jpg",
    "photo/DSC01091-compressed-compressed.jpg",
    "photo/DSC01098-compressed-compressed.jpg",
    "photo/DSC01105-compressed-compressed.jpg",
    "photo/DSC09395-compressed-compressed.jpg",
    "photo/DSC09422-compressed-compressed.jpg",
    "photo/DSC09433-compressed-compressed.jpg",
    "photo/DSC09437-compressed-compressed.jpg",
    "photo/DSC09439-compressed-compressed.jpg",
  ];

  // Set the first image as main image
  if (galleryMainImage && galleryImages.length > 0) {
    galleryMainImage.src = galleryImages[0];
  }

  // Set thumbnail backgrounds
  galleryThumbs.forEach((thumb, index) => {
    if (galleryImages[index]) {
      thumb.style.backgroundImage = `url(${galleryImages[index]})`;
      thumb.style.backgroundSize = "cover";
      thumb.style.backgroundPosition = "center";
    }

    thumb.addEventListener("click", () => {
      galleryThumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
      if (galleryMainImage && galleryImages[index]) {
        galleryMainImage.src = galleryImages[index];
      }
    });
  });

  // 주소 복사 기능
  const addressButton = document.querySelector(".address-button");
  const addressDetails = document.querySelector(".address-details");

  // Instagram 갤러리 기능
  const likeButton = document.querySelector(".like-btn");
  const likesCount = document.querySelector(".likes-count span:last-child");
  let currentLikes = 532;
  let isLiked = false;

  if (likeButton) {
    likeButton.addEventListener("click", function () {
      isLiked = !isLiked;

      if (isLiked) {
        currentLikes++;
        likeButton.classList.add("liked");
      } else {
        currentLikes--;
        likeButton.classList.remove("liked");
      }

      if (likesCount) {
        likesCount.textContent = `${currentLikes} Likes`;
      }
    });
  }

  if (addressButton && addressDetails) {
    addressButton.addEventListener("click", () => {
      const textToCopy = addressDetails.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = addressButton.textContent;
        addressButton.textContent = "복사되었습니다!";
        setTimeout(() => {
          addressButton.textContent = originalText;
        }, 2000);
      });
    });
  }

  // Swiper 갤러리 초기화
  let gallerySwiper = null;

  function initGallerySwiper() {
    gallerySwiper = new Swiper(".gallery-swiper", {
      // 옵션 설정
      direction: "horizontal",
      loop: true,
      speed: 500,
      spaceBetween: 0,
      slidesPerView: 1,
      centeredSlides: true,
      effect: "slide",

      // 네비게이션 화살표
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 페이지네이션
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },

      // 터치 제스처
      touchRatio: 1,
      simulateTouch: true,
      followFinger: true,

      // 이벤트
      on: {
        slideChange: function () {
          updateGalleryThumbs(this.realIndex);
        },
      },
    });
  }

  // 썸네일 업데이트 함수
  function updateGalleryThumbs(index) {
    galleryThumbs.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });
  }

  // 썸네일 클릭 이벤트
  galleryThumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      if (gallerySwiper) {
        gallerySwiper.slideToLoop(index);
      }
    });
  });

  // DOM 로드 후 Swiper 초기화
  if (document.querySelector(".gallery-swiper")) {
    initGallerySwiper();
  }
});
