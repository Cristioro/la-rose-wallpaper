// song
let mediaThumbnail = null;
let songTitle = null;
let songArtist = null;

function wallpaperMediaPropertiesListener(event) {
    // Update title and artist labels
    songTitle.textContent = event.title;
    songArtist.textContent = event.artist;
}

function wallpaperMediaThumbnailListener(event) {
    // Update album cover art
    mediaThumbnail.src = event.thumbnail;
}

mediaThumbnail = document.getElementById('mediaThumbnail');
songTitle = document.getElementById('songTitle');
songArtist = document.getElementById('songArtist');

window.wallpaperRegisterMediaPropertiesListener(wallpaperMediaPropertiesListener);
window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);
