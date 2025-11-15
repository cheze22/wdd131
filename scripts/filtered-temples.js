// Array de templos
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/salt-lake-temple-37762.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Temple-2160936.jpg"
  },
  {
    templeName: "Provo City Center",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85084,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-1572517-wallpaper.jpg"
  }
];

// Función para crear las tarjetas de templos
function createTempleCard(temple) {
  const figure = document.createElement('figure');
  figure.className = 'temple-card';
  
  figure.innerHTML = `
    <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
    <figcaption class="temple-info">
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
    </figcaption>
  `;
  
  return figure;
}

// Función para mostrar los templos
function displayTemples(templeArray) {
  const container = document.getElementById('temple-cards');
  container.innerHTML = '';
  
  templeArray.forEach(temple => {
    const card = createTempleCard(temple);
    container.appendChild(card);
  });
}

// Funciones de filtrado
function filterOld() {
  const filtered = temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year < 1900;
  });
  displayTemples(filtered);
  updateTitle('Old Temples');
}

function filterNew() {
  const filtered = temples.filter(temple => {
    const year = parseInt(temple.dedicated.split(',')[0]);
    return year > 2000;
  });
  displayTemples(filtered);
  updateTitle('New Temples');
}

function filterLarge() {
  const filtered = temples.filter(temple => temple.area > 90000);
  displayTemples(filtered);
  updateTitle('Large Temples');
}

function filterSmall() {
  const filtered = temples.filter(temple => temple.area < 10000);
  displayTemples(filtered);
  updateTitle('Small Temples');
}

function showAll() {
  displayTemples(temples);
  updateTitle('All Temples');
}

// Función para actualizar el título
function updateTitle(title) {
  document.getElementById('filter-title').textContent = title;
}

// Función para actualizar la clase activa en el menú
function setActiveLink(linkId) {
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');
  });
  document.getElementById(linkId).classList.add('active');
}

// Event listeners para navegación y filtrado
document.getElementById('home').addEventListener('click', (e) => {
  e.preventDefault();
  showAll();
  setActiveLink('home');
  // Close mobile menu
  if (window.innerWidth < 768) {
    menu.classList.remove('open');
    hamburger.textContent = "☰";
  }
});

document.getElementById('old').addEventListener('click', (e) => {
  e.preventDefault();
  filterOld();
  setActiveLink('old');
  // Close mobile menu
  if (window.innerWidth < 768) {
    menu.classList.remove('open');
    hamburger.textContent = "☰";
  }
});

document.getElementById('new').addEventListener('click', (e) => {
  e.preventDefault();
  filterNew();
  setActiveLink('new');
  // Close mobile menu
  if (window.innerWidth < 768) {
    menu.classList.remove('open');
    hamburger.textContent = "☰";
  }
});

document.getElementById('large').addEventListener('click', (e) => {
  e.preventDefault();
  filterLarge();
  setActiveLink('large');
  // Close mobile menu
  if (window.innerWidth < 768) {
    menu.classList.remove('open');
    hamburger.textContent = "☰";
  }
});

document.getElementById('small').addEventListener('click', (e) => {
  e.preventDefault();
  filterSmall();
  setActiveLink('small');
  // Close mobile menu
  if (window.innerWidth < 768) {
    menu.classList.remove('open');
    hamburger.textContent = "☰";
  }
});

// HAMBURGER MENU TOGGLE
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    // Toggle the 'open' class
    menu.classList.toggle("open");
    
    // Change hamburger icon to X when open
    if (menu.classList.contains("open")) {
        hamburger.textContent = "✕";
        hamburger.setAttribute("aria-label", "Close Menu");
    } else {
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "Toggle Menu");
    }
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove("open");
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-label", "Toggle Menu");
    }
});

// FOOTER DYNAMIC YEAR AND LAST MODIFIED
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;

// Mostrar todos los templos al cargar la página
showAll();