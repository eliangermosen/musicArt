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
    artistData = null,
    songData = null;

// localStorage.setItem("arti", artist)
// localStorage.setItem("son", song)

if($form){
    $form.addEventListener("submit", e => {
        //siempre que queramos ejecutar programacion asincrona debemos tener un prevent default
        e.preventDefault();
    
        artist = e.target.artist.value.toLowerCase();
        song = e.target.song.value.toLowerCase();
        /*localStorage.setItem("arti", e.target.artist.value.toLowerCase());
        localStorage.setItem("son", e.target.song.value.toLowerCase());*/

        // window.location = "/music-art.html";
    
        console.log(artist , song);
        // console.log(localStorage.getItem("arti"));
        // console.log(localStorage.getItem("son"));

        // window.location = "/music-art.html";
    
        allData();
    });
}

// const allData = async (artist,song) =>{
//     try {
        
//     } catch (err) {
//         console.log(err);
//         let message = err.statusText || "Ocurrio un ERROR";
//         $error.innerHTML = `<p>ERROR ${err.status}: ${message}</p>`;
//         //este $loader.style.display = "none"
//     }
// };

const allData = async () => {
    // console.log(art, sng);
    console.log(artist , song);

    /*console.log(localStorage.getItem("arti"));
    console.log(localStorage.getItem("son"));
    let art = localStorage.getItem("arti"),
        sng = localStorage.getItem("son");*/
    
    // window.location = "/music-art.html";
    try {
        //este $loader.style.display = "block";

        //con el e.target. si los elemento del formulario tienen 
        //atributo name puedo acceder a ese nombre
        // let artist = e.target.artist.value.toLowerCase(),
        //     song = e.target.song.value.toLowerCase(),
        // let $artistTemplate = "",
        //     $songTemplate = "",
        //     artistApi = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`,
        //     songApi = `https://api.lyrics.ovh/v1/${artist}/${song}`,
        //     artistFetch = fetch(artistApi),
        //     songFetch = fetch(songApi),
        //     //destructuracion
        //     [artistRes, songRes] = await Promise.all([artistFetch, songFetch]),
        //     artistData = await artistRes.json(),
        //     songData = await songRes.json();

            // localstorage
            // localStorage.setItem("art", artistData);
            // localStorage.setItem("sng", songData);
        
        // console.log(artistData, songData);
        //window.location = await "/music-art.html";
        
        // console.log(artistRes, songRes);

        artistApi = `https://theaudiodb.com/api/v1/json/2/search.php?s=${artist}`;
        songApi = `https://api.lyrics.ovh/v1/${artist}/${song}`;
        
        let artistFetch = fetch(artistApi),
            songFetch = fetch(songApi),
            //destructuracion
            [artistRes, songRes] = await Promise.all([artistFetch, songFetch]);
        
        artistData = await artistRes.json(),
        songData = await songRes.json();

        console.log(artistData, songData);
        // window.location = "/music-art.html";

    } catch (err) {
        console.log(err);
        let message = err.statusText || "Ocurrio un ERROR";
        $error.innerHTML = `<p>ERROR ${err.status}: ${message}</p>`;
        //este $loader.style.display = "none"
    }
}

const dataList = () => {
    console.log("list");
    console.log(artistData, songData);
    // if (artistData.artists === null) {
    //     $artistTemplate = `<h2>No existe el interprete <mark>${artist}</mark></h2>`;
    // } else {
    //     //solo el primer resultado del arreglo
    //     let artist = artistData.artists[0];
    //     $artistTemplate = `
    //     <h2>${artist.strArtist}</h2>
    //     <img src="${artist.strArtistThumb}" alt="Imagen de ${artist.strArtist}">
    //     <p>${artist.intBornYear} - ${(artist.intDiedYear || "Presente")}</p>
    //     <p>${artist.strCountry} - ${artist.strCountryCode}</p>
    //     <p>${artist.strGenre} - ${artist.strStyle}</p>
    //     <a href="http://${artist.strWebsite}" target="_blank">Sitio Web</a>
    //         <p>${artist.strBiographyEN}</p>
    //         `;
    // }
            
    // if (songData.error) {
    //     $songTemplate = `<h2>No existe la cancion <mark>${song}</mark></h2>`;
    // } else {
    //     $songTemplate = `
    //     <h2>${song.toUpperCase()}</h2>
    //     <blockquote>${songData.lyrics}</blockquote>
    //     `;
    // }

        // if($artist){
            //este $loader.style.display = "none";
    // $artist.innerHTML = $artistTemplate;
    // $song.innerHTML = $songTemplate;
    // console.log($artist, $song);
            // console.log(localStorage.getItem("sng"));
        // }
}

// if($artist){
//     d.addEventListener("DOMContentLoaded", e => allData(localStorage.getItem("arti"),localStorage.getItem("son")));
// }
if($artist){
    d.addEventListener("DOMContentLoaded", e => allData());
}