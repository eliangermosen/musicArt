const d = document,
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

        artistApi = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
        songApi = `https://api.lyrics.ovh/v1/${artist}/${song}`;

        let artistFetch = fetch(artistApi),
            // songFetch = fetch(songApi),
            // [artistRes, songRes] = await Promise.all([artistFetch, songFetch]);
            [artistRes] = await Promise.all([artistFetch]);

        artistData = await artistRes.json(),
        // songData = await songRes.json();

        console.log(artistData, songData);

        // probando();
        
        if (artistData.artists === null) {
            //// $artistTemplate = `<h2>No existe el interprete <mark>${artist}</mark></h2>`;
            // $error.innerHTML = `<p>No existe el interprete <span>${artist}</span></p>`;
            $error.innerHTML = `<h2>No existe el interprete <mark>${artist}</mark></h2>`;
            console.log("if (artistData.artists === null)");
        } 
        else if(songData.error){
            //// $songTemplate = `<h2>No existe la cancion <mark>${song}</mark></h2>`;
            //$error.innerHTML = `<h2>No existe la cancion <mark>${song}</mark></h2>`;
            console.log("else if(songData.error)");
        } else {
            /* ARTIST */
            //solo el primer resultado del arreglo
            let art = artistData.artists[0];
            $artistTemplate = `
            <h2 class="ff-anton artist-title">${art.strArtist.toUpperCase()}</h2>
            <p class="ff-fira genre">${art.strGenre}</p>
            <img src="${art.strArtistThumb}" alt="Imagen de ${art.strArtist}" class="artist-img">
            <p class="biography ff-fira">${art.strBiographyEN}</p>
            `;
            /* SONG */
            /*$songTemplate = `
            <h2 class="song-title">${song.toUpperCase()}</h2>
            <blockquote class="song-lyrics">${songData.lyrics}</blockquote>
            `;*/
            console.log("else");
            localStorage.setItem("artInfo", $artistTemplate)
            console.log($artistTemplate);
            // probando();
            // console.log(location);
            window.location = "/music-art.html";
        }

        ////$loader.style.display = "none";
        console.log(localStorage.getItem("artInfo"));
        $artist.innerHTML = localStorage.getItem("artInfo");
        // $song.innerHTML = $songTemplate;
    } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrio un ERROR";
        //$error.innerHTML = `<p>ERROR ${err.status}: ${message}</p>`;
        // $loader.style.display = "none"
        // localStorage.clear();
    }
}

const probando = () => {
    $artist.innerHTML = localStorage.getItem("artInfo");
}

if($artist){
    d.addEventListener("DOMContentLoaded", e => probando());
}