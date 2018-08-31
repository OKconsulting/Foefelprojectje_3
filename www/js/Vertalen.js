// Vertalen van de verschillende teksten in de applicatie
var btnConfirm = 'Bevestigen'

function vertaalTekst(taal) {
    vertaalTeksten(taal);

    $('.customDatepicker').datepicker("option", "dayNamesMin", dagenKortHuidig);
    $('.customDatepicker').datepicker("option", "dayNames", dagenHuidig);
    $('.customDatepicker').datepicker("option", "monthNames", maandenHuidig);
}

var msgGeenHistoriek = '';
var msgGeenSaldi = '';
var msgAlleVeldenInvullen = '';
var msgGeenAanvragen = '';
var msgGeenRedenAfkeuren = '';
var msgOnvoldoendeVerlof = '';
var msgVerschJaren = '';

var dynamicAantUur = '';
var dynamicDag = '';
var dynamicVoormiddag = '';
var dynamicNamiddag = '';
var dynamicVanaf = '';
var dynamicTot = '';
var dynamicAantDagen = '';
var dynamicDteAanvraag = '';
var dynamicBehandelen = '';
var dynamicPrestatieCode = "";
var dynamicMinBezetting = '';
var dynamicAantAanwezig = '';
var dynamicAantAangevraagd = '';
var dynamicBtnDagenBevestigen = '';
function vertaalTeksten(taal) {
     var xml = $.ajax({
         url: (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) ? (url + 'xml/TekstenClient.xml') : 'xml/TekstenClient.xml',
        async: false
    }).responseText;

    // Statische teksten wijzigen
     $(xml).find('Vertalingen').find('Vertaling').each(function () {
        if ($(this).attr('isButton') == 1)
            $('.' + $(this).attr('class')).parent().html($(this).find(taal).text());
        else
            $('.' + $(this).attr('class')).html($(this).find(taal).text());
    });

    // Tekst van meldingen wijzigen
    msgGeenHistoriek = $(xml).find('Vertalingen').find('Melding[class="GeenHistoriek"]').find(taal).text();
    if (msgGeenHistoriek == '')
        msgGeenHistoriek = 'Er is geen historiek beschikbaar.';
    msgGeenSaldi = $(xml).find('Vertalingen').find('Melding[class="GeenSaldi"]').find(taal).text();
    if (msgGeenSaldi == '')
        msgGeenSaldi = 'Er zijn geen saldi beschikbaar.';
    msgAlleVeldenInvullen = $(xml).find('Vertalingen').find('Melding[class="AlleVeldenInvullen"]').find(taal).text();
    if (msgAlleVeldenInvullen == '')
        msgAlleVeldenInvullen = 'Gelieve alle velden in te vullen.';
    msgGeenAanvragen = $(xml).find('Vertalingen').find('Melding[class="GeenAanvragen"]').find(taal).text();
    if (msgGeenAanvragen == '')
        msgGeenAanvragen = 'Je hebt, op dit moment, geen te behandelen aanvragen.';
    msgGeenRedenAfkeuren = $(xml).find('Vertalingen').find('Melding[class="GeenRedenAfkeuren"]').find(taal).text();
    if (msgGeenRedenAfkeuren == '')
        msgGeenRedenAfkeuren = 'Gelieve een reden voor afkeuren van het verlof te vermelden.';
    msgOnvoldoendeVerlof = $(xml).find('Vertalingen').find('Melding[class="OnvoldoendeVerlof"]').find(taal).text();
    if (msgOnvoldoendeVerlof == '')
        msgOnvoldoendeVerlof = 'Je beschikt niet over genoeg verlofuren om verlof aan te vragen voor deze periode.';
    msgVerschJaren = $(xml).find('Vertalingen').find('Melding[class="VerschJaren"]').find(taal).text();
    if (msgVerschJaren == '')
        msgVerschJaren = 'De periode die je selecteerde loopt over verschillende jaren. Gelieve de periode op te splitsen per jaar.';
    
    // Dynamische teksten wijzigen
    dynamicAantUur = $(xml).find('Vertalingen').find('DynamischeTekst[class="AantalUur"]').find(taal).text();
    if (dynamicAantUur == '')
        dynamicAantUur = 'Aantal uur';
    dynamicDagdeel = $(xml).find('Vertalingen').find('DynamischeTekst[class="Dagdeel"]').find(taal).text();
    if (dynamicDagdeel == '')
        dynamicDagdeel = 'Dagdeel';
    dynamicDag = $(xml).find('Vertalingen').find('DynamischeTekst[class="Dag"]').find(taal).text();
    if (dynamicDag == '')
        dynamicDag = 'dag';
    dynamicVoormiddag = $(xml).find('Vertalingen').find('DynamischeTekst[class="Voormiddag"]').find(taal).text();
    if (dynamicVoormiddag == '')
        dynamicVoormiddag = 'voormiddag';
    dynamicNamiddag = $(xml).find('Vertalingen').find('DynamischeTekst[class="Namiddag"]').find(taal).text();
    if (dynamicNamiddag == '')
        dynamicNamiddag = 'namiddag';
    dynamicVanaf = $(xml).find('Vertalingen').find('DynamischeTekst[class="Vanaf"]').find(taal).text();
    if (dynamicVanaf == '')
        dynamicVanaf = 'Vanaf';
    dynamicTot = $(xml).find('Vertalingen').find('DynamischeTekst[class="Tot"]').find(taal).text();
    if (dynamicTot == '')
        dynamicTot = 'Tot en met';
    dynamicAantDagen = $(xml).find('Vertalingen').find('DynamischeTekst[class="AantDagen"]').find(taal).text();
    if (dynamicAantDagen == '')
        dynamicAantDagen = 'Aantal dagen';
    dynamicDteAanvraag = $(xml).find('Vertalingen').find('DynamischeTekst[class="DteAanvraag"]').find(taal).text();
    if (dynamicDteAanvraag == '')
        dynamicDteAanvraag = 'Gevraagd op';
    dynamicBehandelen = $(xml).find('Vertalingen').find('DynamischeTekst[class="Behandelen"]').find(taal).text();
    if (dynamicBehandelen == '')
        dynamicBehandelen = 'Behandelen';
    dynamicPrestatieCode = $(xml).find('Vertalingen').find('DynamischeTekst[class="PrestatieCode"]').find(taal).text();
    if (dynamicPrestatieCode == '')
        dynamicPrestatieCode = 'Prestatiecode';
    dynamicMinBezetting = $(xml).find('Vertalingen').find('DynamischeTekst[class="MinBezetting"]').find(taal).text();
    if (dynamicMinBezetting == '')
        dynamicMinBezetting = 'Min. bezetting';
    dynamicAantAanwezig = $(xml).find('Vertalingen').find('DynamischeTekst[class="AantAanwezig"]').find(taal).text();
    if (dynamicAantAanwezig == '')
        dynamicAantAanwezig = 'Aantal aanwezig';
    dynamicAantAangevraagd = $(xml).find('Vertalingen').find('DynamischeTekst[class="AantAangevraagd"]').find(taal).text();
    if (dynamicAantAangevraagd == '')
        dynamicAantAangevraagd = 'Aantal aangevraagd';
    dynamicBtnDagenBevestigen = $(xml).find('Vertalingen').find('DynamischeTekst[class="btnDagenBevestigen"]').find(taal).text();
    if (dynamicBtnDagenBevestigen == '')
        dynamicBtnDagenBevestigen = 'Bevestigen';
}