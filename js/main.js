/*============================================================================================
    # Wrapper Overlay
============================================================================================*/
document.getElementById("toggle-content").addEventListener("click", function () {
    var wrapper = document.querySelector(".wrapper");
    var card = document.querySelector(".card");

    wrapper.classList.add("hidden");

    wrapper.addEventListener("transitionend", function () {
        wrapper.style.display = "none";
        card.style.display = "block";
    }, { once: true });

    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.play();
});

/** =====================================================
 *  Timer Countdown
  ======================================================= */
function setupCountdown(campaignSelector, startTimeMillis, endTimeMillis) {
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;

    function calculateRemaining() {
        var now = new Date().getTime();
        return now >= startTimeMillis && now < endTimeMillis ? endTimeMillis - now : 0;
    }

    var didRefresh = false;
    var previousGap = calculateRemaining();

    function countdown() {
        var gap = calculateRemaining();
        var shouldRefresh = previousGap > day && gap <= day || previousGap > 0 && gap === 0;

        previousGap = gap;

        var textDay = Math.floor(gap / day);
        var textHour = Math.floor((gap % day) / hour);
        var textMinute = Math.floor((gap % hour) / minute);
        var textSecond = Math.floor((gap % minute) / second);

        if (document.querySelector(campaignSelector + ' .timer')) {
            document.querySelector(campaignSelector + ' .day').innerText = textDay;
            document.querySelector(campaignSelector + ' .hour').innerText = textHour;
            document.querySelector(campaignSelector + ' .minute').innerText = textMinute;
            document.querySelector(campaignSelector + ' .second').innerText = textSecond;
        }

        if (shouldRefresh && !didRefresh) {
            didRefresh = true;
            setTimeout(function () {
                window.location.reload();
            }, 30000 + Math.random() * 90000);
        }
    }

    countdown();
    setInterval(countdown, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
    var now = Date.now();
    var endTime = new Date("2025-05-10T00:00:00").getTime();
    setupCountdown(".campaign-0", now, endTime);
});

/** =====================================================
 *  Add to Calendar
  ======================================================= */
const event = {
    title: "Jemputan Kenduri Kahwin Haris & Dannea",
    startDate: "20250510T033000Z",
    endDate: "20250510T090000Z",
    location: "No1, km20 jalan ipoh-rawang,taman rekreasi templer, 48000 Rawang, Selangor",
    description: "Kami menjemput tuan/puan hadir ke majlis perkahwinan anakanda kami.",
};

function generateGoogleCalendarLink(event) {
    const { title, startDate, endDate, location, description } = event;
    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
        text: title,
        dates: `${startDate}/${endDate}`,
        details: description,
        location: location,
    });
    return `${baseUrl}&${params.toString()}`;
}

function generateICS(event) {
    const { title, startDate, endDate, location, description } = event;
    return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${startDate}\nDTEND:${endDate}\nLOCATION:${location}\nDESCRIPTION:${description}\nEND:VEVENT\nEND:VCALENDAR`.trim();
}

function downloadICS(filename, content) {
    const blob = new Blob([content], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function addGoogleCalendar() {
    const googleLink = generateGoogleCalendarLink(event);
    window.open(googleLink, "_blank");
}

function addAppleCalendar() {
    const icsContent = generateICS(event);
    downloadICS("event.ics", icsContent);
}

/** =====================================================
 *  Location for Google and Waze
  ======================================================= */
function openGoogleMaps() {
    const latitude = 4.226058186123785;
    const longitude = 101.22905188341969;
    const googleMapsUrl = `https://maps.app.goo.gl/AX7ZCthqgnfv7yYz6`;
    window.open(googleMapsUrl, "_blank");
}

function openWaze() {
    const latitude = 4.226058186123785;
    const longitude = 101.22905188341969;
    const wazeUrl = `https://waze.com/ul/hw2868z01s`;
    window.open(wazeUrl, "_blank");
}

/** =====================================================
    Contact
  ======================================================= */
function openWhatsApp(phoneNumber) {
    const message = "https://kad-kahwin-eight.vercel.app/\n\nHello, maaf menggangu. Saya ingin bertanyakan sesuatu berkenaan majlis perkahwinan ini.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
}

function makePhoneCall(phoneNumber) {
    const callUrl = `tel:${phoneNumber}`;
    window.location.href = callUrl;
}

/** =====================================================
 *  Animation
  ======================================================= */
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 10;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", reveal);

/** =====================================================
 *  Background Animation
  ======================================================= */
const petalContainer = document.querySelector('.petal-container');
const maxPetals = 70;
const petalInterval = 100;

function createPetal() {
    if (petalContainer.childElementCount < maxPetals) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        const startY = Math.random() * 100;
        const duration = 4 + Math.random() * 2;
        const petalSize = 5 + Math.random() * 10;
        const petalOpacity = 0.3 + Math.random() * 0.5;
        petal.style.top = `${startY}%`;
        petal.style.width = `${petalSize}px`;
        petal.style.height = `${petalSize}px`;
        petal.style.opacity = petalOpacity;
        petal.style.animationDuration = `${duration}s`;
        const translateX = 300 + Math.random() * 120;
        const translateY = 300 + Math.random() * 120;
        petal.style.setProperty('--translate-x', `${translateX}px`);
        petal.style.setProperty('--translate-y', `${translateY}px`);
        petalContainer.appendChild(petal);
        setTimeout(() => {
            petalContainer.removeChild(petal);
        }, duration * 1000);
    }
}
setInterval(createPetal, petalInterval);

/** =====================================================
 *  Toggle Menu
  ======================================================= */
const toggleButtons = {
    'calendar-btn': 'calendar-menu',
    'location-btn': 'location-menu',
    'music-btn': 'music-menu',
    'contact-btn': 'contact-menu'
};

function toggleMenu(menuId, event) {
    event.stopPropagation();
    const menu = document.getElementById(menuId);
    if (menu.classList.contains('open')) {
        menu.classList.remove('open');
    } else {
        closeAllMenus();
        menu.classList.add('open');
    }
}

function closeAllMenus() {
    for (const menuId of Object.values(toggleButtons)) {
        const menu = document.getElementById(menuId);
        if (menu && menu.classList.contains('open')) {
            menu.classList.remove('open');
        }
    }
}

for (const [buttonId, menuId] of Object.entries(toggleButtons)) {
    const button = document.getElementById(buttonId);
    const menu = document.getElementById(menuId);

    if (button && menu) {
        button.addEventListener('click', (event) => toggleMenu(menuId, event));
        menu.addEventListener('click', (event) => event.stopPropagation());
    }
}

document.addEventListener('click', () => closeAllMenus());

/** =====================================================
 *  carousel
  ======================================================= */
  const carousel = document.getElementById('carousel');
  const items = document.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let autoSlideInterval;

  function autoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      setPositionByIndex();
    }, 7000);
  }

  function setPositionByIndex() {
    currentTranslate = currentIndex * -carousel.offsetWidth;
    prevTranslate = currentTranslate;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(${currentTranslate}px)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  // Touch and drag events
  items.forEach((item, index) => {
    const touchStart = (e) => {
      isDragging = true;
      startPos = getPositionX(e);
      cancelAnimationFrame(animationID);
      clearInterval(autoSlideInterval);
    };

    const touchMove = (e) => {
      if (!isDragging) return;
      const currentPosition = getPositionX(e);
      currentTranslate = prevTranslate + currentPosition - startPos;
      carousel.style.transform = `translateX(${currentTranslate}px)`;
    };

    const touchEnd = () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;
      
        if (movedBy < -50 && currentIndex < items.length - 1) currentIndex += 1;
        if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;
      
        setPositionByIndex();
        autoSlide(); // Restart timer here
      };
      
      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          currentIndex = parseInt(dot.dataset.index);
          setPositionByIndex();
          autoSlide(); // Restart timer here too
        });
      });

    item.addEventListener('touchstart', touchStart);
    item.addEventListener('touchmove', touchMove);
    item.addEventListener('touchend', touchEnd);

    item.addEventListener('mousedown', touchStart);
    item.addEventListener('mousemove', touchMove);
    item.addEventListener('mouseup', touchEnd);
    item.addEventListener('mouseleave', () => { if (isDragging) touchEnd(); });
  });

  function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
  }

  // Dot click events
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = parseInt(dot.dataset.index);
      setPositionByIndex();
      clearInterval(autoSlideInterval);
      autoSlide();
    });
  });

  function autoSlide() {
    clearInterval(autoSlideInterval); // Clear any existing interval
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      setPositionByIndex();
    }, 5000);
  }

  