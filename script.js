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
        mediaThumbnail.src = 'assets/images/No_cover.webp';
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


// settings

// 🌟 Datos del modo Custom (7)
let customData = {
    title: 'La Rose',
    items: [
        { title: 'Alphonse', text: 'En su cabello florece el amanecer. Los susurros del viento despiertan los colores del alma, y cada trazo dorado anuncia el renacer de la belleza. Ella no mira: contempla el mundo desde la calma eterna.', image: 'assets/images/default1.jpg' },
        { title: 'Champenois', text: 'La ciudad vibra en su pecho como un acorde de luz. Entre flores y perfume, guarda la dulzura del instante. No hay reloj que mida su encanto, solo el aire tibio de una tarde sin fin.', image: 'assets/images/default2.jpg' },
        { title: 'The Flower', text: 'En su mirada habita el verano. Las flores se inclinan ante su canto silencioso, y el tiempo se detiene para admirar la perfección. Es la musa que respira entre pétalos y sueños.', image: 'assets/images/default3.jpg' },
        { title: 'La Dame', text: 'Vestida de calma, camina entre luces moribundas. Su paso es un suspiro que disuelve la tarde, un adiós que florece en los labios del silencio. Allí donde pasa, la nostalgia florece.', image: 'assets/images/default4.jpg' }
    ]
};

// 📦 Última plantilla seleccionada
let currentTemplate = '1';

window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

        // === 🎨 COLORES Y ESTILO ===
        if (properties.background_color) {
            const color = properties.background_color.value.split(' ').map(c => Math.ceil(c * 255));
            document.documentElement.style.setProperty('--background-color', `rgb(${color.join(',')})`);
        }

        if (properties.title_color) {
            const color = properties.title_color.value.split(' ').map(c => Math.ceil(c * 255));
            document.documentElement.style.setProperty('--title-color', `rgb(${color.join(',')})`);
        }

        if (properties.text_color) {
            const color = properties.text_color.value.split(' ').map(c => Math.ceil(c * 255));
            document.documentElement.style.setProperty('--text-color', `rgb(${color.join(',')})`);
        }

        if (properties.border_color) {
            const color = properties.border_color.value.split(' ').map(c => Math.ceil(c * 255));
            document.documentElement.style.setProperty('--border-color', `rgb(${color.join(',')})`);
        }

        if (properties.justify_text) {
            const shouldJustify = properties.justify_text.value;
            for (let i = 1; i <= 4; i++) {
                const textElement = document.getElementById(`text${i}`);
                if (!textElement) continue;
                textElement.classList.toggle('justify', shouldJustify);
                textElement.classList.toggle('center', !shouldJustify);
            }
        }

        if (properties.grain_opacity) {
            document.documentElement.style.setProperty('--ruido-opacity', properties.grain_opacity.value);
        }

        // === 🎧 MEDIA INTEGRATION ===
        if (properties.cover_select && properties.cover_select.value === '1' && properties.cover_file) {
            const filePath = properties.cover_file.value;
            document.getElementById('mediaThumbnail').src = filePath
                ? 'file:///' + filePath
                : 'assets/images/No_cover.webp';
        } else if (properties.cover_select && properties.cover_select.value === '0') {
            window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
            window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);
        }

        // === 📋 PLANTILLAS ===
        if (properties.plantillas) {
            currentTemplate = properties.plantillas.value;
        }

        // === 🧩 MODO CUSTOM (7) ===
        if (currentTemplate === '7') {
            // Título principal
            if (properties.title) customData.title = properties.title.value || '';

            // Iterar los 4 elementos
            for (let i = 1; i <= 4; i++) {
                const titleKey = `title${i}_text`;
                const textKey = `text${i}_content`;
                const imgKey = `img${i}_file`;

                if (properties[titleKey])
                    customData.items[i - 1].title = properties[titleKey].value || '';

                if (properties[textKey])
                    customData.items[i - 1].text = properties[textKey].value || '';

                if (properties[imgKey]) {
                    const filePath = properties[imgKey].value;
                    customData.items[i - 1].image = filePath
                        ? 'file:///' + filePath
                        : `assets/images/default${i}.jpg`;
                }
            }

            // 🔁 Actualizar la vista siempre que haya cambios
            document.getElementById('title').textContent = customData.title;
            for (let i = 1; i <= 4; i++) {
                document.getElementById(`title${i}`).textContent = customData.items[i - 1].title;
                document.getElementById(`text${i}`).textContent = customData.items[i - 1].text;
                document.getElementById(`img${i}`).src = customData.items[i - 1].image;
            }
        }

        // === 🏛️ PLANTILLAS PREDEFINIDAS ===
        else {
            const template = templates[currentTemplate];
            if (template) {
                document.getElementById('title').textContent = template.mainTitle;
                for (let i = 0; i < template.items.length; i++) {
                    const item = template.items[i];
                    document.getElementById(`title${i + 1}`).textContent = item.title;
                    document.getElementById(`text${i + 1}`).textContent = item.text;
                    document.getElementById(`img${i + 1}`).src = item.image;
                }
            }
        }
    }
};




