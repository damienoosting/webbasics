function getAllEventsByArtists(ID){
    console.log('Laad alle events waar de artist is met ID '+ID);
    console.log("http://localhost:3000/lineup/artist/"+ID+"/");

    let eventlist = document.createElement("ul");

    fetch("http://localhost:3000/lineup/artist/"+ID+"/")
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        for(let event of data){
            console.log(event.name);
            let eventItem = document.createElement("li");

            let link = document.createElement("a");
            link.href = 'event_detail.html?eventID='+event.ID;
            link.title = event.name;
            link.textContent = event.name;
            
            let naam = document.createElement("p");
            naam.appendChild(link);

            let datum = document.createElement("p");
            datum.textContent = 'Datum : '+event.date;
            let locatie = document.createElement("p");
            locatie.textContent = 'Locatie : '+event.location;
            
            eventItem.appendChild(naam);
            eventItem.appendChild(datum);
            eventItem.appendChild(locatie);

            eventlist.appendChild(eventItem);
         
        }
    })
    document.getElementById("artist-events").appendChild(eventlist);
}

