const eventDetail = document.getElementById("event-detail");
if (eventDetail) {
    getEventByID(eventID, 'detail');
}
async function getEventByID(eventID, type) {
    const response = await fetch("http://localhost:3000/event/" + eventID, {
        method: "get",
    });
    if (response.status === 200) {
        const event = await response.json();
        console.log(event);
        if(type === "detail")  {
            showEventDetail(event);
        }
        else if(type === "delete")  {
            document.getElementById("event_name").value = event.name;
            document.getElementById("event_date").value = event.date;
            document.getElementById("event_location").value = event.location;
        }
        else {
            document.getElementById("event_name").value = event.name;
            document.getElementById("event_date").value = event.date;
            document.getElementById("event_location").value = event.location;
            let link = document.createElement("a");
            link.href = 'event_detail.html?eventID='+event.ID;
            link.title = 'Terug';
            link.className = 'button';
            link.textContent = '< terug';
            document.getElementById("event-section").appendChild(link);
        }
    } else {
        console.log(await response.json());
    }
}
async function showEventDetail(event){
    let titel = document.createElement("legend");
    titel.textContent = event.name;
    document.getElementById("event-detail").appendChild(titel);

    let datum = document.createElement("p");
    datum.textContent = 'Datum : ' + event.date;
    document.getElementById("event-detail").appendChild(datum);

    let locatie = document.createElement("p");
    locatie.textContent = 'Locatie : ' + event.location;
    document.getElementById("event-detail").appendChild(locatie);

    let link = document.createElement("a");
    link.href = 'events.html';
    link.title = 'Terug naar de evenementen';
    link.className = 'button';
    link.textContent = '< terug naar de evenementen';
    document.getElementById("event-detail").appendChild(link);

    let artists_titel = document.createElement("legend");
    artists_titel.textContent = 'Artisten op het evenement ' + event.name;
    document.getElementById("event-artists").appendChild(artists_titel);
    getAllArtistsByEvents(event.ID);

    let config_titel = document.createElement("legend");
    config_titel.textContent = 'Beheer ' + event.name;
    document.getElementById("event-config").appendChild(config_titel);

    let link_edit = document.createElement("a");
    link_edit.href = 'event_edit.html?eventID=' + event.ID;
    link_edit.title = event.name + ' bewerken';
    link_edit.className = 'button';
    link_edit.textContent = event.name + ' bewerken';
    let p_edit = document.createElement("p");
    p_edit.appendChild(link_edit);
    document.getElementById("event-config").appendChild(p_edit);

    let link_delete = document.createElement("a");
    link_delete.href = 'event_delete.html?eventID=' + event.ID;
    link_delete.title = event.name + ' verwijderen';
    link_delete.className = 'button red';
    link_delete.textContent = event.name + ' verwijderen';
    let p_delete = document.createElement("p");
    p_delete.appendChild(link_delete);
    document.getElementById("event-config").appendChild(p_delete);
}
async function getAllArtistsByEvents(eventID){
    const response = await fetch("http://localhost:3000/lineup/event/" + eventID, {
        method: "get",
    });
    if (response.status === 200) {
        const artists = await response.json();
        if(artists.length === 0){
            document.getElementById("event-artists").style.display = 'none';
        }
        else {
            console.log(artists);
            let list = document.createElement("ul");
            for (let artist of artists) {
                console.log(artist.name);
                let item = document.createElement("li");

                let link = document.createElement("a");
                link.href = 'artist_detail.html?artistID=' + artist.ID;
                link.title = artist.name;
                link.textContent = artist.name;

                item.appendChild(link);
                list.appendChild(item);
            }
            document.getElementById("event-artists").appendChild(list);
        }
    } else {
        console.log(await response.json());
    }
}

const eventsSection = document.getElementById("events");
if (eventsSection) {
    if(zoek){
        searchEvent();
        document.getElementById("search-input").value = zoek;
    }
    else{
        getAllEvents();
    }
}
async function searchEvent() {
    console.log("we halen nu alle events op");
    const response = await fetch("http://localhost:3000/event/?name="+zoek, {
        method: "GET"
    });
    console.log(response);
    if (response.status === 200) {
        console.log("success!");
        const events = await response.json();
        for (let event of events) {
            showEvents(event);
        }
    }
    else {
        console.log(await response.json());
    }
}
async function showEvents(event) {
    let link = document.createElement("a");
    link.href = 'event_detail.html?eventID=' + event.ID;
    link.title = event.name;
    link.textContent = event.name;

    let item = document.createElement("li");
    item.appendChild(link);

    let list = document.createElement("ul");
    list.appendChild(item);
    eventsSection.appendChild(list);
}
async function getAllEvents() {
    console.log("we halen nu alle events op");
    const response = await fetch("http://localhost:3000/event/", {
        method: "GET"
    });
    console.log(response);
    if (response.status === 200) {
        console.log("success!");
        const events = await response.json();
        for (let event of events) {
            showEvents(event);
        }
    } else {
        console.log(await response.json());
    }
}

const addForm = document.getElementById("form-event-add");
if (addForm) {
    addForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = new FormData(event.target)
        console.log("formdata: ", data)
        if (data.has("event_name") && data.has("event_date") && data.has("event_location")) {
            addEvent(event.target, data.get("event_name"), data.get("event_date"), data.get("event_location"))
        }
    })
}
async function addEvent(form, name, date, location) {
    console.log('Ik heb een event: naam, date, location');
    const response = await fetch("http://localhost:3000/event/", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            date: date,
            location: location
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    if (response.status === 201) {
        console.log("succesfully created!")
        form.reset();
        alert('Evenement '+name+' toegevoegd');

    } else {
        console.log(await response.json());
    }

}

const deleteForm = document.getElementById("form-event-delete");
if (deleteForm) {
    getEventByID(eventID, 'delete');
    deleteForm.addEventListener("submit", function (event) {
        event.preventDefault();
        deleteEventByID(eventID)
    })
}
async function deleteEventByID(eventID) {
    console.log('verwijderd event met ID:' + eventID);
    const response = await fetch("http://localhost:3000/event/" + eventID, {
        method: "DELETE",
    });
    if (response.status === 200) {
        console.log("success!")
        document.getElementById("event-section").innerHTML='';
        let titel = document.createElement("legend");
        titel.textContent = 'Evenement is verwijderd';
        document.getElementById("event-section").appendChild(titel);

        let link = document.createElement("a");
        link.href = 'events.html';
        link.title = 'Terug';
        link.className = 'button';
        link.textContent = '< terug';
        document.getElementById("event-section").appendChild(link);

    } else {
        console.log(await response.json());
    }
}

const editForm = document.getElementById("form-event-edit");
if (editForm) {
    getEventByID(eventID, 'edit');
    editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = new FormData(event.target)
        console.log("formdata: ", data)
        editEvent(data.get("event_name"), data.get("event_date"), data.get("event_location"))
    })
}
async function editEvent(name, date, location) {
    console.log('Ik heb een event: naam, date, location');
    const response = await fetch("http://localhost:3000/event/" + eventID, {
        method: "PUT",
        body: JSON.stringify({
            name: name,
            date: date,
            location: location,
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