// Datos estáticos del clima (estos valores deben coincidir con el HTML)
const temperature = 15; // °C
const windSpeed = 8; // km/h

/**
 * Calcula el factor de sensación térmica (wind chill)
 * Fórmula métrica para temperaturas en Celsius y velocidad del viento en km/h
 * @param {number} temp - Temperatura en grados Celsius
 * @param {number} speed - Velocidad del viento en km/h
 * @returns {number} - Sensación térmica calculada
 */
function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

/**
 * Determina si las condiciones son válidas para calcular wind chill
 * @param {number} temp - Temperatura en grados Celsius
 * @param {number} speed - Velocidad del viento en km/h
 * @returns {boolean} - true si las condiciones son válidas
 */
function isValidWindChillConditions(temp, speed) {
    return temp <= 10 && speed > 4.8;
}

/**
 * Muestra la sensación térmica en el elemento correspondiente
 */
function displayWindChill() {
    const windchillElement = document.getElementById('windchill');
    
    if (isValidWindChillConditions(temperature, windSpeed)) {
        const windchill = calculateWindChill(temperature, windSpeed);
        windchillElement.textContent = `${windchill.toFixed(1)}°C`;
    } else {
        windchillElement.textContent = 'N/A';
    }
}

/**
 * Muestra el año actual en el footer
 */
function displayCurrentYear() {
    const yearElement = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
}

/**
 * Muestra la fecha de última modificación del documento
 */
function displayLastModified() {
    const lastModifiedElement = document.getElementById('lastmodified');
    const lastModified = document.lastModified;
    lastModifiedElement.textContent = lastModified;
}

// Ejecutar funciones cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    displayWindChill();
    displayCurrentYear();
    displayLastModified();
});