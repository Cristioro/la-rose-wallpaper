// song
// 🎵 Song info & cover
let mediaThumbnail = document.getElementById('mediaThumbnail');
let songTitle = document.getElementById('songTitle');
let songArtist = document.getElementById('songArtist');

let lastTitle = "";
let lastArtist = "";
let lastThumbnail = "";
let resetTimer = null;

function wallpaperMediaPropertiesListener(event) {
    songTitle.textContent = event.title || '';
    songArtist.textContent = event.artist || '';

    lastTitle = event.title || '';
    lastArtist = event.artist || '';

    checkForNoMedia();
}

function wallpaperMediaThumbnailListener(event) {
    if (event.thumbnail && event.thumbnail.trim() !== '') {
        mediaThumbnail.src = event.thumbnail;
        lastThumbnail = event.thumbnail;
    } else {
        lastThumbnail = '';
        resetThumbnail();
    }

    checkForNoMedia();
}

function resetThumbnail() {
    mediaThumbnail.style.opacity = 0;
    setTimeout(() => {
        mediaThumbnail.src = 'assets/No_cover.jpg';
        mediaThumbnail.style.opacity = 1;
    }, 300);
}

function checkForNoMedia() {
    // Limpiar cualquier timer previo
    if (resetTimer) clearTimeout(resetTimer);

    // Esperar un poco por si hay actualización próxima
    resetTimer = setTimeout(() => {
        // Si no hay datos de canción o thumbnail
        const noSong =
            (!lastTitle || lastTitle.trim() === '') &&
            (!lastArtist || lastArtist.trim() === '');
        const noThumb =
            !lastThumbnail || lastThumbnail.trim() === '';

        if (noSong || noThumb) {
            resetThumbnail();
        }
    }, 1000); // espera 1 segundo
}

// Registrar listeners
window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);


// settings

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

        // 🎨 Color de fondo
        if (properties.background_color) {
            let color = properties.background_color.value.split(' ').map(c => Math.ceil(c * 255));
            let cssColor = `rgb(${color.join(',')})`;
            document.documentElement.style.setProperty('--background-color', cssColor);
        }

        if (properties.title_color) {
            let color = properties.title_color.value.split(' ').map(c => Math.ceil(c * 255));
            let cssColor = `rgb(${color.join(',')})`;
            document.documentElement.style.setProperty('--title-color', cssColor);
        }

        // ✍️ Color del texto (y títulos)
        if (properties.text_color) {
            let color = properties.text_color.value.split(' ').map(c => Math.ceil(c * 255));
            let cssColor = `rgb(${color.join(',')})`;
            document.documentElement.style.setProperty('--text-color', cssColor);
        }

        if (properties.border_color) {
            let color = properties.border_color.value.split(' ').map(c => Math.ceil(c * 255));
            let cssColor = `rgb(${color.join(',')})`;
            document.documentElement.style.setProperty('--border-color', cssColor);
        }

        // 🌫️ Opacidad del grano
        if (properties.grain_opacity) {
            let opacity = properties.grain_opacity.value;
            document.documentElement.style.setProperty('--ruido-opacity', opacity);
        }

        // 🖼️ Imagen 1
        if (properties.img1_file) {
            const filePath = properties.img1_file.value;
            const img = document.getElementById('img1');
            if (filePath) {
                img.src = 'file:///' + filePath;
            } else {
                img.src = 'assets/Alphonse.jpg';
            }
        }

        // 🖼️ Imagen 2
        if (properties.img2_file) {
            const filePath = properties.img2_file.value;
            const img = document.getElementById('img2');
            if (filePath) {
                img.src = 'file:///' + filePath;
            } else {
                img.src = 'assets/Champenois.jpg';
            }
        }

        // 🖼️ Imagen 3
        if (properties.img3_file) {
            const filePath = properties.img3_file.value;
            const img = document.getElementById('img3');
            if (filePath) {
                img.src = 'file:///' + filePath;
            } else {
                img.src = 'assets/flower.jpg';
            }
        }

        // 🖼️ Imagen 4
        if (properties.img4_file) {
            const filePath = properties.img4_file.value;
            const img = document.getElementById('img4');
            if (filePath) {
                img.src = 'file:///' + filePath;
            } else {
                img.src = 'assets/La_dame.jpg';
            }
        }

        //title
        if (properties.title) {
            const value = properties.title.value;
            document.getElementById('title').textContent = value || '';
        }

        // 📝 Títulos y textos container
        for (let i = 1; i <= 4; i++) {
            const titleKey = `title${i}_text`;
            const textKey = `text${i}_content`;

            // Cambiar título
            if (properties[titleKey]) {
                const value = properties[titleKey].value;
                const titleElement = document.getElementById(`title${i}`);
                if (titleElement) {
                    titleElement.textContent = value || '';
                }
            }

            // Cambiar texto
            if (properties[textKey]) {
                const value = properties[textKey].value;
                const textElement = document.getElementById(`text${i}`);
                if (textElement) {
                    textElement.textContent = value || '';
                }
            }
        }

    }
};


