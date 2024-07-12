const artistDetail = document.getElementById("artist-detail");
if (artistDetail) {
    getArtistByID(artistID, 'detail');
}
async function getArtistByID(artistID, type) {
    const response = await fetch("http://localhost:3000/artist/" + artistID, {
        method: "get",
    });
    if (response.status === 200) {
        const artist = await response.json();
        console.log(artist);
        if(type === "detail")  {
            showArtistDetail(artist);
        }
        else if(type === "delete")  {
            document.getElementById("artist_name").value = artist.name;
            document.getElementById("artist_genre").value = artist.genre;
            document.getElementById("artist_bio").value = artist.biografy;
        }
        else {
            document.getElementById("artist_name").value = artist.name;
            document.getElementById("artist_genre").value = artist.genre;
            document.getElementById("artist_bio").value = artist.biografy;
            let link = document.createElement("a");
            link.href = 'artist_detail.html?artistID='+artist.ID;
            link.title = 'Terug';
            link.className = 'button';
            link.textContent = '< terug';
            document.getElementById("artist-section").appendChild(link);
        }
    } else {
        console.log(await response.json());
    }
}
async function showArtistDetail(artist){
    let titel = document.createElement("legend");
    titel.textContent = artist.name;
    console.log(artist.name);
    document.getElementById("artist-detail").appendChild(titel);

    let genre = document.createElement("p");
    genre.textContent = 'Genre : ' + artist.genre;
    document.getElementById("artist-detail").appendChild(genre);

    let bio = document.createElement("p");
    bio.textContent = artist.biografy;
    document.getElementById("artist-detail").appendChild(bio);

    let link = document.createElement("a");
    link.href = 'artists.html';
    link.title = 'Terug naar de artiesten';
    link.className = 'button';
    link.textContent = '< terug naar de artiesten';
    document.getElementById("artist-detail").appendChild(link);

    let artists_titel = document.createElement("legend");
    artists_titel.textContent = 'Evenementen met ' + artist.name;
    document.getElementById("artist-events").appendChild(artists_titel);
    getAllEventsByArtistID(artist.ID);


    let songs_titel = document.createElement("legend");
    songs_titel.textContent = 'Nummers van ' + artist.name;
    document.getElementById("artist-songs").appendChild(songs_titel);
    getAllSongsByArtistID(artist.ID);


    let config_titel = document.createElement("legend");
    config_titel.textContent = 'Beheer ' + artist.name;
    document.getElementById("artist-config").appendChild(config_titel);

    let link_edit = document.createElement("a");
    link_edit.href = 'artist_edit.html?artistID=' + artist.ID;
    link_edit.title = artist.name + ' bewerken';
    link_edit.className = 'button';
    link_edit.textContent = artist.name + ' bewerken';
    let p_edit = document.createElement("p");
    p_edit.appendChild(link_edit);
    document.getElementById("artist-config").appendChild(p_edit);

    let link_delete = document.createElement("a");
    link_delete.href = 'artist_delete.html?artistID=' + artist.ID;
    link_delete.title = artist.name + ' verwijderen';
    link_delete.className = 'button red';
    link_delete.textContent = artist.name + ' verwijderen';
    let p_delete = document.createElement("p");
    p_delete.appendChild(link_delete);
    document.getElementById("artist-config").appendChild(p_delete);

}
async function getAllSongsByArtistID(artistID){
    const response = await fetch("http://localhost:3000/song/artist/" + artistID, {
        method: "GET",
    });
    if (response.status === 200) {
        const songs = await response.json();
        if(songs.length === 0){
            document.getElementById("artist-songs").style.display = 'none';
        }
        else {
            console.log(songs);
            let list = document.createElement("ul");
            for (let song of songs) {
                console.log(song.title);
                let item = document.createElement("li");
                item.textContent = song.title+' ('+song.length+')';
                list.appendChild(item);
            }
            document.getElementById("artist-songs").appendChild(list);
        }
    } else {
        console.log(await response.json());
    }
}

async function getAllEventsByArtistID(artistID){
    const response = await fetch("http://localhost:3000/lineup/artist/" + artistID, {
        method: "GET",
    });
    if (response.status === 200) {
        const events = await response.json();
        if(events.length === 0){
            document.getElementById("artist-events").style.display = 'none';
        }
        else {
            console.log(events);
            let list = document.createElement("ul");
            for (let event of events) {
                console.log(event.name);
                let item = document.createElement("li");

                let link = document.createElement("a");
                link.href = 'event_detail.html?eventID=' + event.ID;
                link.title = event.name;
                link.textContent = event.name;

                item.appendChild(link);
                list.appendChild(item);
            }
            document.getElementById("artist-events").appendChild(list);
        }
    } else {
        console.log(await response.json());
    }
}

const artistSection = document.getElementById("artists");
if (artistSection) {
    if(zoek){
        searchArtist();
        document.getElementById("search-input").value = zoek;
    }
    else{
        getAllArtists();
    }
}
async function searchArtist() {
    console.log("we halen nu alle artist op");
    const response = await fetch("http://localhost:3000/artist/?name="+zoek, {
        method: "GET"
    });
    console.log(response);
    if (response.status === 200) {
        console.log("success!");
        const artists = await response.json();
        for (let artist of artists) {
            showArtist(artist);
        }
    } else {
        console.log(await response.json());
    }
}
async function getAllArtists() {
    console.log("we halen nu alle artists op");
    const response = await fetch("http://localhost:3000/artist/", {
        method: "GET"
    });
    console.log(response);
    if (response.status === 200) {
        console.log("success!");
        const artists = await response.json();
        for (let artist of artists) {
            showArtist(artist);
        }

    } else {
        console.log(await response.json());
    }
}

async function showArtist(artist) {
    let link = document.createElement("a");
    link.href = 'artist_detail.html?artistID=' + artist.ID;
    link.title = artist.name;
    link.textContent = artist.name;
    let item = document.createElement("li");
    item.appendChild(link);
    let list = document.createElement("ul");
    list.appendChild(item);
    artistSection.appendChild(list);
}

const addForm = document.getElementById("form-artist-add");
if (addForm) {
    addForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = new FormData(event.target)
        console.log("formdata: ", data)
        if (data.has("artist_name") && data.has("artist_genre")) {
            addArtist(event.target, data.get("artist_name"), data.get("artist_genre"), data.get("artist_bio"))
        }
    })
}
async function addArtist(form,name, genre, bio) {
    console.log('Ik heb een artiest naam en genre');
    const response = await fetch("http://localhost:3000/artist/", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            genre: genre,
            bio: bio
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    if (response.status === 201) {
        console.log("succesfully created!")
        form.reset();
        alert('Artist '+name+' toegevoegd');
    } else {
        console.log(await response.json());
    }

}

const deleteForm = document.getElementById("form-artist-delete");
if (deleteForm) {
    getArtistByID(artistID,'delete');
    deleteForm.addEventListener("submit", function (event) {
        event.preventDefault();
        deleteArtistByID(artistID);
    })
}

async function deleteArtistByID(artistID) {
    console.log('verwijderd artist met ID:' + artistID);
    const response = await fetch("http://localhost:3000/artist/" + artistID, {
        method: "DELETE",
    });
    if (response.status === 200) {
        console.log("success!")
        document.getElementById("artist-section").innerHTML='';
        let titel = document.createElement("legend");
        titel.textContent = 'Artiest is verwijderd';
        document.getElementById("artist-section").appendChild(titel);

        let link = document.createElement("a");
        link.href = 'artists.html';
        link.title = 'Terug';
        link.className = 'button';
        link.textContent = '< terug';
        document.getElementById("artist-section").appendChild(link);

    } else {
        console.log(await response.json());
    }
}

const editForm = document.getElementById("form-artist-edit");
if (editForm) {
    console.log('Laad de gegevens in de inputs van de artiest');
    getArtistByID(artistID, 'edit');

    editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = new FormData(event.target)
        console.log("formdata: ", data)
        editArtist(data.get("artist_name"), data.get("artist_genre"), data.get("artist_bio"));
    })
}

async function editArtist(name, genre, bio) {
    console.log('Ik heb een artist: naam, genre, bio');
    const response = await fetch("http://localhost:3000/artist/" + artistID, {
        method: "PUT",
        body: JSON.stringify({
            name: name,
            genre: genre,
            biografy: bio,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    if (response.status === 204) {
        console.log("succesfully edited!");
    } else {
        console.log(await response.json());
    }
}