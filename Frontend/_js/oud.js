function getAllEvents() {
    console.log('Start getAllEvents');
    let callUrl = "http://localhost:3000/event";
    if (zoek) {
        callUrl = "http://localhost:3000/event/?name=" + zoek;
        // document.getElementById('search').setAttribute('value','zoek');
    }
    fetch(callUrl)
        .then(response => response.json())
        .then(data => {
                console.log('Laad alle evenementen');
                console.log(data);

                for (let event of data) {
                    if (eventID == null) {
                        showEvent(event);
                    } else {
                        if (event.ID == eventID) {
                            showEventDetails(event);
                        }
                    }
                }
            }
        )
}
function showEvent(event) {
    console.log('Toon evenement');
    console.log(event);

    let link = document.createElement("a");
    link.href = 'event_detail.html?eventID=' + event.ID;
    link.title = event.name;
    link.textContent = event.name;

    let listitem = document.createElement("li");
    listitem.appendChild(link);
    document.getElementById("events-list").appendChild(listitem);
}
function showEventDetails(eventinfo) {
    console.log('Toon evenement informatie. Het evenement is al gefilterd door de URLSearchParams (de get op de url met event ID)');
    console.log(eventinfo);

    let titel = document.createElement("legend");
    titel.textContent = eventinfo.name;
    let datum = document.createElement("p");
    datum.textContent = 'Datum : ' + eventinfo.date;
    let locatie = document.createElement("p");
    locatie.textContent = 'Locatie : ' + eventinfo.location;
    let link = document.createElement("a");
    link.href = 'events.html';
    link.title = 'Terug naar de evenementen';
    link.className = 'button';
    link.textContent = '< terug naar de evenementen';

    document.getElementById("event-detail").appendChild(titel);
    document.getElementById("event-detail").appendChild(datum);
    document.getElementById("event-detail").appendChild(locatie);
    document.getElementById("event-detail").appendChild(link);

    let artists_titel = document.createElement("legend");
    artists_titel.textContent = 'Artisten op het evenement ' + eventinfo.name;
    document.getElementById("event-artists").appendChild(artists_titel);
    getAllArtistsByEvents(eventinfo.ID);

    let config_titel = document.createElement("legend");
    config_titel.textContent = 'Beheer ' + eventinfo.name;
    document.getElementById("event-config").appendChild(config_titel);

    let link_edit = document.createElement("a");
    link_edit.href = 'event_edit.html?eventID=' + eventinfo.ID;
    link_edit.title = eventinfo.name + ' bewerken';
    link_edit.className = 'button';
    link_edit.textContent = eventinfo.name + ' bewerken';
    let p_edit = document.createElement("p");
    p_edit.appendChild(link_edit);
    document.getElementById("event-config").appendChild(p_edit);

    let link_delete = document.createElement("a");
    link_delete.href = 'event_delete.html?eventID=' + eventinfo.ID;
    link_delete.title = eventinfo.name + ' verwijderen';
    link_delete.className = 'button red';
    link_delete.textContent = eventinfo.name + ' verwijderen';
    let p_delete = document.createElement("p");
    p_delete.appendChild(link_delete);
    document.getElementById("event-config").appendChild(p_delete);

}

