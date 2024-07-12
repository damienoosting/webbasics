var artistID = null;
var eventID = null;
var zoek = null;

const searchParams = new URLSearchParams(window.location.search);
for (const param of searchParams) {
    eventID = searchParams.get('eventID');
    if(eventID){
        console.log('Set eventID : '+eventID);
    }
    artistID = searchParams.get('artistID');
    if(artistID){
        console.log('Set artistID : '+artistID);
    }
    zoek = searchParams.get('search');
    if(zoek){
        console.log('We zoeken naar : '+zoek);
    }
}