const d = document,
    $home = d.querySelector(".musicart")
    $form = d.getElementById("song-search"),
    $loader = d.querySelector(".loader"),
    $error = d.querySelector(".error"),
    $main = d.querySelector("main"),
    $artist = d.querySelector(".artist"),
    $song = d.querySelector(".song");

let artist = null,
    song = null,
    $artistTemplate = "",
    $songTemplate = "",
    artistApi = "",
    songApi = "",
    artistData = [],
    songData = [];

if($form){
    $form.addEventListener("submit", e => {
        e.preventDefault();

        artist = e.target.artist.value.toLowerCase();
        song = e.target.song.value.toLowerCase();

        console.log(artist , song);

        allData();
    });
}

const allData = async () => {
    try {

        $loader.style.display = "flex";

        artistApi = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
        songApi = `https://api.lyrics.ovh/v1/${artist}/${song}`;

        let artistFetch = fetch(artistApi),
            songFetch = fetch(songApi),
            [artistRes, songRes] = await Promise.all([artistFetch, songFetch]);

        artistData = await artistRes.json(),
        songData = await songRes.json();

        console.log(artistData, songData);
        
        if (artistData.artists === null) {
            // $error.innerHTML = `<p>No existe el interprete <span>${artist}</span></p>`;
            $error.innerHTML = `<h2>No existe el interprete <mark>${artist}</mark></h2>`;
            console.log("if (artistData.artists === null)");
        } 
        else if(songData.error){
            //$error.innerHTML = `<h2>No existe la cancion <mark>${song}</mark></h2>`;
            console.log("else if(songData.error)");
        } else {
            /* ARTIST */
            //solo el primer resultado del arreglo
            let art = artistData.artists[0];
            $artistTemplate = `
            <div class="center">
            <h2 class="ff-anton artist-title">${art.strArtist.toUpperCase()}</h2>
            <p class="ff-fira genre">${art.strGenre}</p>
            </div>
            <figure>
            <img src="${art.strArtistThumb}" alt="Imagen de ${art.strArtist}" class="artist-img">
            </figure>
            <p class="space-letters ff-fira">${art.strBiographyEN}</p>
            `;
            /* SONG */
            $songTemplate = `
            <h2 class="ff-anton artist-title center">${song.toUpperCase()}</h2>
            <blockquote class="space-letters ff-fira">${songData.lyrics}</blockquote>
            `;
            $loader.style.display = "none";
            localStorage.setItem("artInfo", $artistTemplate);
            localStorage.setItem("sngInfo", $songTemplate);
            window.location = "/music-art.html";
        }
        $artist.innerHTML = localStorage.getItem("artInfo");
        $song.innerHTML = localStorage.getItem("sngInfo");
    } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrio un ERROR";
        // $error.innerHTML = `<p>ERROR ${err.status}: ${message}</p>`;
        $loader.style.display = "none";
        $error.innerHTML = `<p class="difference">Artist and Song doesn't match</p>`;
        // localStorage.clear();
    }
}

const showData = () => {
    $artist.innerHTML = localStorage.getItem("artInfo");
    $song.innerHTML = localStorage.getItem("sngInfo");
}

if($artist){
    d.addEventListener("DOMContentLoaded", e => showData());
}

$home.addEventListener("click", e => {
    e.preventDefault();
    d.location.href = "/index.html";
})