// Details van een te behandelen aanvraag ophalen
function aanvraagBehandelen(selectorAanvraag) {
    $('#txaRedenAanvraagKeuren').val('');
    var mdwNaam = $(selectorAanvraag + ' > h3')[0].innerHTML;
    mdwNaam = mdwNaam.substring(98, mdwNaam.length - 82);
    var functieNaam = $(selectorAanvraag + ' .functieNaam')[0].innerHTML;
    var afdeling = $(selectorAanvraag + ' .afdeling')[0].innerHTML;

    var goedkeuringID = $(selectorAanvraag + ' .goedkeuringID')[0].innerHTML;
    var aanvraagID = $(selectorAanvraag + ' .aanvraagID')[0].innerHTML;
    var mdwIDAanvr = $(selectorAanvraag + ' .mdwID')[0].innerHTML;
    var functieID = $(selectorAanvraag + ' .functieID')[0].innerHTML;
    var afdID = $(selectorAanvraag + ' .afdID')[0].innerHTML;
    var startTijd = $(selectorAanvraag + ' .startTijd')[0].innerHTML.split('/');
    startTijd = startTijd[2] + startTijd[1] + startTijd[0];
    var eindTijd = $(selectorAanvraag + ' .eindTijd')[0].innerHTML.split('/');
    eindTijd = eindTijd[2] + eindTijd[1] + eindTijd[0];

    $('#dagenAanvraag')[0].innerHTML = '';
    $.ajax({
        headers: { 'Access-Control-Allow-Origin': "*" },
        url: url + 'api/VerlofBehandelen/getAanvraagDetail/?miMdwID=' + mdwID + '&goedkeuringID=' + goedkeuringID + '&aanvraagID=' + aanvraagID + '&mdwID=' + mdwIDAanvr + '&functieID=' + functieID + '&afdelingID=' + afdID + '&sStart=' + startTijd + '&sEind=' + eindTijd + '&sTaal=' + taal,
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            opvullenDagenAanvraag(data.dagen, data.reden, functieNaam, afdeling, mdwNaam);
            $('#loadingDivAanvragen').css('display', 'none');

            // Navigeren naar de lijst van opgehaalde dagen
            $('#aDetailsAanvraag').click();
        }
    });
}

// Details van een te behandelen aanvraag weergeven
function opvullenDagenAanvraag(dagen, reden, functieNaam, afdeling, mdwNaam) {
    $('#aanvrGoedkeuringID')[0].innerHTML = '';
    $('#aanvrAanvraagID')[0].innerHTML = '';
    $('#aanvrMdwID')[0].innerHTML = '';
    $('#aanvrMdwNaam')[0].innerHTML = mdwNaam;
    $('#aanvrFunc')[0].innerHTML = functieNaam;
    $('#aanvrAfd')[0].innerHTML = afdeling;

    // Opstellen van de collapsibles
    var content = '';
    $.each(dagen, function (key, dag) {
        var bCollapsed = (key == 0) ? false : true;
        var datumDag = dag.Datum.split('T')[0].split('-');
        content += '<div data-role="collapsible" data-inset="false" class="StandaloneCollapsible" data-collapsed="' + bCollapsed + '"><h3>';
        content += datumDag[2] + '/' + datumDag[1] + '/' + datumDag[0] + '</h3><p class="aanvraagInfo"><span class="vet">' + dynamicPrestatieCode + '</span><span>';
        content += dag.prestomschrijving + '</span></p><p class="aanvraagInfo"><span class="vet">' + dynamicAantUur + '</span><span>';
        content += dag.aantaluren + '</span></p><p class="aanvraagInfo"><span class="vet">' + dynamicMinBezetting + '</span><span>';
        content += dag.minBezetting + '</span></p><p class="aanvraagInfo"><span class="vet">' + dynamicAantAanwezig + '</span><span>';
        content += dag.aanwezig + '</span></p><p class="aanvraagInfo"><span class="vet">' + dynamicAantAangevraagd + '</span><span>';
        content += dag.aangevraagd + '</span></p>';

        if (reden != "") {
            $('#txtRedenAanvraagMdw')[0].innerHTML = reden;

            $('.lblRedenAanvraagMdw').css('display', 'inline');
            $('#txtRedenAanvraagMdw').css('display', 'block');
            //content += '<div class="multilineDetail"><p class="vet">' + dynamicRedenAanvrBeh + '</p><p>' + reden + '</p></div>';
        } else {
            $('.lblRedenAanvraagMdw').css('display', 'none');
            $('#txtRedenAanvraagMdw').css('display', 'none');
        }

        if (dag.conflictreden != "")
            content += '<div class="multilineDetail"><p class="vet">Conflict</p>' + dag.conflictreden + '</p></div>';
        content += '</div>';
    });
    $('#dagenAanvraag')[0].innerHTML = content;
}
// De jQuery controls die dynamisch toegevoegd werden aan de pagina initialiseren
var clickEventsBound = false;
$(document).on('pagebeforeshow', '#detailsAanvraag', function () {
    $('#dagenAanvraag div[data-role="collapsible"]').collapsible();

    if (!clickEventsBound) {
        // Goedkeuren van een aanvraag
        $('#btnGoedkeuren').click(function () {
            disableBijBehandeling();
            goedOfAfkeuren(true);
        });
        // Afkeuren van een aanvraag
        $('#btnAfkeuren').click(function () {
            disableBijBehandeling();
            goedOfAfkeuren(false);
        });
        clickEventsBound = true;
    }
});
// De jQuery controls die dynamisch toegevoegd werden aan de pagina initialiseren
$(document).on('pagebeforeshow', '#aanvragen', function () {
    $('#btnConfAanvrNo').button();
    $('#btnConfAanvrYes').button();

    if (geenTeBehandelenAanvragen)
        melding(msgGeenAanvragen, 5000, 'error');
    else
        $('#colSetAanvragen div[data-role="collapsible"]').collapsible();
    if (aanvragenLGHR == null) {
        try {
            $("#btnAllesGoedkeuren").button("disable");
        } catch (ex) { }
        $('#btnAllesGoedkeuren').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } else {
        try {
            $("#btnAllesGoedkeuren").button("enable");
        } catch (ex) { }
        $('#btnAllesGoedkeuren').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    }

    $('#btnAllesGoedkeuren').click(function () {
        if (window.innerHeight > window.innerWidth) {
            $('.confContent').css('width', '175px').css('margin', '-100px 0 0 -107px');
            $('#divConfAanvrYes').css('display', 'block').css('float', 'none');
            $('#divConfAanvrNo').css('display', 'block').css('float', 'none');
        } else {
            $('.confContent').css('width', '').css('margin', '');
            $('#divConfAanvrYes').css('display', '').css('float', '');
            $('#divConfAanvrNo').css('display', '').css('float', '');
        }
        $('#confirmBoxAanvr').css('display', 'inline-block');
    });
    $('#btnConfAanvrNo').click(function () {
        $('#confirmBoxAanvr').css('display', 'none');
    });
    $('.confBackg').click(function () {
        $(this).parent().css('display', 'none');
    });
    $('#btnConfAanvrYes').click(function () {
        $('#confirmBoxAanvr').css('display', 'none');
        inBatchGoedkeuren();
    });
});

// Alle te behandelen aanvragen ophalen voor de HRM|LG
var geenTeBehandelenAanvragen = false;
function getAanvragenLGHR() {
    try {
        $("#btnAllesGoedkeuren").button("disable");
    } catch (ex) { }
    $('#btnAllesGoedkeuren').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');

    $('#loadingDivAanvragen').css('display', 'inline');
    $('#colSetAanvragen')[0].innerHTML = '';
    $.ajax({
        headers: { 'Access-Control-Allow-Origin': "*" },
        url: url + 'api/VerlofBehandelen/getAanvragenVoorLGHR/?miMdwID=' + mdwID + '&sTaal=' + taal,
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            try {
                $("#btnAllesGoedkeuren").button("enable");
            } catch (ex) { }
            $('#btnAllesGoedkeuren').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
            if (data.indexOf('error@#@') != -1) {
                geenTeBehandelenAanvragen = true;
                aanvragenLGHR = null;
            }
            else {
                aanvragenLGHR = data;
                opvullenTeBehandelenAanvragen(data);
            }

            $('#loadingDivAanvragen').css('display', 'none');
            if ($.mobile.activePage.attr('id') == 'aanvragen')
                $('#colSetAanvragen div[data-role="collapsible"]').collapsible();

            if (aanvragenLGHR == null) {
                try {
                    $("#btnAllesGoedkeuren").button("disable");
                } catch (ex) { }
                $('#btnAllesGoedkeuren').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
            } else {
                try {
                    $("#btnAllesGoedkeuren").button("enable");
                } catch (ex) { }
                $('#btnAllesGoedkeuren').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
            }
        }
    });
}

var aanvraagInBehandeling = 0;
var aanvragenLGHR = null;
// De lijst met te behandelen aanvragen voor de HRM|LG weergeven
function opvullenTeBehandelenAanvragen(aanvragen) {
    // opvullen van de lijst met te behandelen aanvragen
    var content = '';
    $.each(aanvragen, function (key, aanvraag) {
        var datumAanvraag = aanvraag.datumaanvraag.split('T')[0].split('-');
        datumAanvraag = datumAanvraag[2] + '/' + datumAanvraag[1] + '/' + datumAanvraag[0];
        var datumStart = aanvraag.start.split('T')[0].split('-');
        datumStart = datumStart[2] + '/' + datumStart[1] + '/' + datumStart[0];
        var datumEind = aanvraag.einde.split('T')[0].split('-');
        datumEind = datumEind[2] + '/' + datumEind[1] + '/' + datumEind[0];

        content += '<div data-role="collapsible" data-theme="a" id="aanvraag' + (key + 1) + '" data-collapsed="true"><h3>';
        content += aanvraag.mdwNaam + ' ' + aanvraag.mdwVnaam + '</h3><p class="aanvraagInfo"><span class="vet">' + dynamicVanaf + '</span><span class="startTijd">';
        content += datumStart + '</span></p><p class="aanvraagInfo"><span class="vet">' + dynamicTot + '</span><span class="eindTijd">';
        content += datumEind + '</span></p><p class="aanvraagInfo"><span class="vet">' + dynamicAantDagen + '</span><span>';
        content += aanvraag.aantaldagen + '</span></p><p class="aanvraagInfo"><span class="vet">' + dynamicDteAanvraag + '</span><span>';
        content += datumAanvraag + '</span></p><div style="display: none;"><span class="functieID">';
        content += aanvraag.FunctieID + '</span><span class="afdID">';
        content += aanvraag.AfdelingID + '</span><span class="mdwID">';
        content += aanvraag.mdwID + '</span><span class="functieNaam">';
        content += aanvraag.Functienaam + '</span><span class="afdeling">';
        content += aanvraag.Afdeling + '</span><span class="aanvraagID">';
        content += aanvraag.vakantieaanvraagID + '</span><span class="goedkeuringID">';
        content += aanvraag.VakantiegoedkeuringID + '</span></div>';
        content += '<div class="ui-btn ui-input-btn ui-corner-all ui-shadow ui-btn-a"><input data-theme="b" id="btnAanvraag' + (key + 1) + '" class="btnBehandelen" type="submit" value="' + dynamicBehandelen + '" />' + dynamicBehandelen + '</div></div>'
    });
    $('#colSetAanvragen')[0].innerHTML = content;


    $('#colSetAanvragen input[type="submit"]').click(function () {
        $('#loadingDivAanvragen').css('display', 'inline');
        aanvraagInBehandeling = this.id.substring(11, this.id.length);
        var selectorAanvraag = '#aanvraag' + aanvraagInBehandeling;
        aanvraagBehandelen(selectorAanvraag);
    });
}
function goedOfAfkeuren(goedgekeurd) {
    if (aanvraagInBehandeling != 0) {
        var reden = $('#txaRedenAanvraagKeuren')[0].value;
        if (reden == null || reden == undefined)
            reden = "";
        if (!goedgekeurd && $('#txaRedenAanvraagKeuren')[0].value.length < 2) {
            melding(msgGeenRedenAfkeuren, 5000, 'error');

            enableBijBehandeling();
            return;
        }

        $('#loadingDivDetailAanvraag').css('display', 'inline');
        var goedkeuringID = $('#aanvraag' + aanvraagInBehandeling + ' .goedkeuringID')[0].innerHTML;
        var aanvraagID = $('#aanvraag' + aanvraagInBehandeling + ' .aanvraagID')[0].innerHTML;

        var mdwIDAanvr = $('#aanvraag' + aanvraagInBehandeling + ' .mdwID')[0].innerHTML;
        var startTijd = $('#dagenAanvraag div[data-role="collapsible"]:first-child h3 a')[0].innerHTML.substring(0, 10).split('/');
        startTijd = startTijd[2] + startTijd[1] + startTijd[0];
        var eindTijd = $('#dagenAanvraag div[data-role="collapsible"]:last-child h3 a')[0].innerHTML.substring(0, 10).split('/');
        eindTijd = eindTijd[2] + eindTijd[1] + eindTijd[0];

        $.ajax({
            headers: { 'Access-Control-Allow-Origin': "*" },
            url: url + 'api/VerlofBehandelen/behandelingVerwerker/?miMdwID=' + mdwID + '&goedkeuringID=' + goedkeuringID + '&aanvraagID=' + aanvraagID + '&reden=' + reden + '&mdwID=' + mdwIDAanvr + '&sStart=' + startTijd + '&sEind=' + eindTijd + '&sTaal=' + taal + '&goedgekeurd=' + goedgekeurd,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                getAanvragenLGHR();
                aanvraagInBehandeling = 0;
                $('#loadingDivDetailAanvraag').css('display', 'none');
                if (geenTeBehandelenAanvragen)
                    $('#aHome').click();
                else
                    $('#aAanvragen').click();
                melding(data.split('@#@')[1], 10000, data.split('@#@')[0]);

                enableBijBehandeling();
            }
        });
    }
}
function inBatchGoedkeuren() {
    disableBijBehandeling();

    $('#loadingDivAanvragen').css('display', 'inline');
    var aanvraagIDs = [];
    var goedkeuringIDs = [];
    var mdwIDs = [];
    var startTijden = [];
    var eindTijden = [];

    var aanvragenBatch = [];
    for (aanvraagInBehandeling = 1; aanvraagInBehandeling <= aanvragenLGHR.length; aanvraagInBehandeling++) {
        var startTijd = $('#aanvraag' + aanvraagInBehandeling + ' .startTijd')[0].innerHTML.substring(0, 10).split('/');
        var eindTijd = $('#aanvraag' + aanvraagInBehandeling + ' .eindTijd')[0].innerHTML.substring(0, 10).split('/');
        var aanvraagBatch = {
            aanvraagID: $('#aanvraag' + aanvraagInBehandeling + ' .aanvraagID')[0].innerHTML,
            goedkeuringID: $('#aanvraag' + aanvraagInBehandeling + ' .goedkeuringID')[0].innerHTML,
            mdwID: $('#aanvraag' + aanvraagInBehandeling + ' .mdwID')[0].innerHTML,
            startTijd: startTijd[2] + startTijd[1] + startTijd[0],
            eindTijd: eindTijd[2] + eindTijd[1] + eindTijd[0]
        }
        aanvragenBatch.push(aanvraagBatch);
    }
    aanvragenLGHR = null;

    $.ajax({
        headers: { 'Access-Control-Allow-Origin': "*" },
        url: url + 'api/VerlofBehandelen/batchGoedkeuren/?miMdwID=' + mdwID + '&sTaal=' + taal,
        cache: false,
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(aanvragenBatch),
        success: function (data) {
            getAanvragenLGHR();
            aanvraagInBehandeling = 0;
            $('#aHome').click();
            melding(data.split('@#@')[1], 10000, data.split('@#@')[0]);

            enableBijBehandeling();
        }
    });
}
function disableBijBehandeling() {
    try {
        // Afkeuren
        $('#btnAfkeuren').button("disable");
        $('#btnAfkeuren').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
    try {
        // Goedkeuren
        $('#btnGoedkeuren').button("disable");
        $('#btnGoedkeuren').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
    try {
        // Verlof aanvragen
        $('#btnDetailDagen').button("disable");
        $('#btnDetailDagen').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
    try {
        // Behandelen
        $('.btnBehandelen').button("disable");
        $('.btnBehandelen').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
    try {
        // Alles goedkeuren
        $("#btnAllesGoedkeuren").button("disable");
        $('#btnAllesGoedkeuren').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
    try {
        // ConfirmBox alles goedkeuren (Nee)
        $('#btnConfAanvrNo').button('disable');
        $('#btnConfAanvrNo').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
    try {
        // ConfirmBox alles goedkeuren (Ja)
        $('#btnConfAanvrYes').button('disable');
        $('#btnConfAanvrYes').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
}
function enableBijBehandeling() {
    try {
        // Afkeuren
        $('#btnAfkeuren').button("enable");
        $('#btnAfkeuren').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
    try {
        // Goedkeuren
        $('#btnGoedkeuren').button("enable");
        $('#btnGoedkeuren').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
    try {
        // Verlof aanvragen
        $('#btnDetailDagen').button("enable");
        $('#btnDetailDagen').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
    try {
        // Behandelen
        $('.btnBehandelen').button("enable");
        $('.btnBehandelen').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
    try {
        // Alles goedkeuren
        $("#btnAllesGoedkeuren").button("enable");
        $('#btnAllesGoedkeuren').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
    try {
        // ConfirmBox alles goedkeuren (Nee)
        $('#btnConfAanvrNo').button('enable');
        $('#btnConfAanvrNo').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
    try {
        // ConfirmBox alles goedkeuren (Ja)
        $('#btnConfAanvrYes').button('enable');
        $('#btnConfAanvrYes').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
}

$('#txaRedenAanvraagKeuren').focus(function () {
    $('#btnBehandelAndereAanvr').css('margin-bottom', '300px');
});
$('#txaRedenAanvraagKeuren').blur(function () {
    $('#btnBehandelAndereAanvr').css('margin-bottom', '0px');
});