"use strict";

if (typeof(myeok) == "undefined") {
    var myeok = {};
}

if (typeof (myeok.domActions) == "undefined") {
    myeok.domActions = {};
}


    // Wijzigen van het weer te geven item in de saldi tabel
myeok.domActions.changePrestC = function() {
    this.initSaldiTable();

    var selectedPCode = $('#cboPrestatieC')[0].selectedIndex;
    $('#tblPCodes thead tr')[0].innerHTML = '<th></th><th>' + myeok.verlofSaldi[selectedPCode].omschrijving + '</th>';

    if (myeok.verlofSaldi[selectedPCode].SaldoAanvraag == "D") {
        $('#tblPCodes1')[0].innerHTML += '<td>' + parseFloat(('' + myeok.verlofSaldi[selectedPCode].beginsaldo).replace(',', '.')).toFixed(2).replace('.', ',') + '</td>';
        $('#tblPCodes2')[0].innerHTML += '<td>' + (Math.round(parseFloat(('' + myeok.verlofSaldi[selectedPCode].gebruikt).replace(',', '.')) * 100, 2) / 100).toFixed(2).replace('.', ',') + '</td>';
        $('#tblPCodes3')[0].innerHTML += '<td>' + (Math.round(parseFloat(('' + myeok.verlofSaldi[selectedPCode].aangevraagd).replace(',', '.')) * 100, 2) / 100).toFixed(2).replace('.', ',') + '</td>';
        $('#tblPCodes4')[0].innerHTML += '<td>' + (Math.round(parseFloat(('' + myeok.verlofSaldi[selectedPCode].beschikbaar).replace(',', '.')) * 100, 2) / 100).toFixed(2).replace('.', ',') + '</td>';
        $('#tblPCodes5').css('display', 'table-row');
    } else if (myeok.verlofSaldi[selectedPCode].SaldoAanvraag == "UM") {
        $('#tblPCodes1')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].beginsaldo + '</td>';
        $('#tblPCodes2')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].gebruikt + '</td>';
        $('#tblPCodes3')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].aangevraagd + '</td>';
        $('#tblPCodes4')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].beschikbaar + '</td>';
        $('#tblPCodes5').css('display', 'none');
    } else if (myeok.verlofSaldi[selectedPCode].SaldoAanvraag == "UD") {
        $('#tblPCodes1')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].beginsaldo + '</td>';
        $('#tblPCodes2')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].gebruikt + '</td>';
        $('#tblPCodes3')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].aangevraagd + '</td>';
        $('#tblPCodes4')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].beschikbaar + '</td>';
        $('#tblPCodes5').css('display', 'none');
    }
				
    $('#tblPCodes5')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].aantalUren + '</td>';
    $('#tblPCodes7')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].vandatum.split('T')[0].split('-')[2] + '/' + myeok.verlofSaldi[selectedPCode].vandatum.split('T')[0].split('-')[1] + '/' + myeok.verlofSaldi[selectedPCode].vandatum.split('T')[0].split('-')[0] + '</td>';
    $('#tblPCodes6')[0].innerHTML += '<td>' + myeok.verlofSaldi[selectedPCode].voordatum.split('T')[0].split('-')[2] + '/' + myeok.verlofSaldi[selectedPCode].voordatum.split('T')[0].split('-')[1] + '/' + myeok.verlofSaldi[selectedPCode].voordatum.split('T')[0].split('-')[0] + '</td>';
}

    // wijzigen van het weer te geven item in de historiek tabel
myeok.domActions.changeHistItem = function() {
	this.initHistTable();
    var selectedPCode = $('#cboHistItems')[0].selectedIndex;
    var datumStart = myeok.historiekItems[selectedPCode].start.split('T')[0];
    var datumEind = myeok.historiekItems[selectedPCode].einde.split('T')[0];

    $('#tblHist thead tr')[0].innerHTML = '<th></th><th>' + datumStart.split('-')[2] + '/' + datumStart.split('-')[0] + ' - ' + datumEind.split('-')[2] + '/' + datumEind.split('-')[1] + '/' + datumEind.split('-')[0] + '</th>';
    $('#tblHist1')[0].innerHTML += '<td>' + datumStart.split('-')[2] + '/' + datumStart.split('-')[1] + '/' + datumStart.split('-')[0] + '</td>';
    $('#tblHist2')[0].innerHTML += '<td>' + datumEind.split('-')[2] + '/' + datumEind.split('-')[1] + '/' + datumEind.split('-')[0] + '</td>';
    $('#tblHist3')[0].innerHTML += '<td>' + myeok.historiekItems[selectedPCode].aantaldagen / 1000 + '</td>';
    var aanvraagDatum = myeok.historiekItems[selectedPCode].datumaanvraag.split('T')[0];
    $('#tblHist4')[0].innerHTML += '<td>' + aanvraagDatum.split('-')[2] + '/' + aanvraagDatum.split('-')[1] + '/' + aanvraagDatum.split('-')[0] + '</td>';
    $('#tblHist5')[0].innerHTML += '<td>' + myeok.historiekItems[selectedPCode].status + '</td>';
    $('#tblHist6')[0].innerHTML += '<td>' + myeok.historiekItems[selectedPCode].naam2 + '</td>';
}

    // De huidige waardes in de saldi tabel weghalen
myeok.domActions.initSaldiTable = function() {
    $('#tblPCodes thead tr')[0].innerHTML = $('#tblPCodes thead tr th:first-child')[0].outerHTML;
    $('#tblPCodes1')[0].innerHTML = $('#tblPCodes1 th')[0].outerHTML;
    $('#tblPCodes2')[0].innerHTML = $('#tblPCodes2 th')[0].outerHTML;
    $('#tblPCodes3')[0].innerHTML = $('#tblPCodes3 th')[0].outerHTML;
    $('#tblPCodes4')[0].innerHTML = $('#tblPCodes4 th')[0].outerHTML;
    $('#tblPCodes5')[0].innerHTML = $('#tblPCodes5 th')[0].outerHTML;
    $('#tblPCodes6')[0].innerHTML = $('#tblPCodes6 th')[0].outerHTML;
    $('#tblPCodes7')[0].innerHTML = $('#tblPCodes7 th')[0].outerHTML;
}

    // De huidige waardes in de historiek tabel weghalen
myeok.domActions.initHistTable = function() {
    $('#tblHist thead tr')[0].innerHTML = $('#tblHist thead tr th:first-child')[0].outerHTML;
    $('#tblHist1')[0].innerHTML = $('#tblHist1 th')[0].outerHTML;
    $('#tblHist2')[0].innerHTML = $('#tblHist2 th')[0].outerHTML;
    $('#tblHist3')[0].innerHTML = $('#tblHist3 th')[0].outerHTML;
    $('#tblHist4')[0].innerHTML = $('#tblHist4 th')[0].outerHTML;
    $('#tblHist5')[0].innerHTML = $('#tblHist5 th')[0].outerHTML;
    $('#tblHist6')[0].innerHTML = $('#tblHist6 th')[0].outerHTML;
}

    // Waardes uit de inputvelden van de datepicker verwijderen
    // er kan geen datum getypt worden, er moet gebruik gemaakt worden van de datepickers
myeok.domActions.clearVanDte = function() {
	$('#dteVan').val('');
    myeok.dteVanIngevuld = false;
}
    
myeok.domActions.clearTotDte = function() {
    $('#dteTot').val('');
    myeok.dteTotIngevuld = false;
}

myeok.domActions.styleDteOverview = function() {
    $('#dteVanPopup').css('display', 'none');
    $('#dteTotPopup').css('display', 'none');
    myeok.popupDte = '';
    myeok.popupActive = false;

    myeok.domActions.setDteStyle('#dteOverview');
    myeok.popupActive = true;
    myeok.popupDte = 'Overview';
    myeok.firstclick = true;
    myeok.domActions.kleurDisabledDagen(myeok.huidigeOverviewMaand, '#dteOverview', myeok.huidigOverviewJaar);
    myeok.dteTarget = null;
}

    // Tonen van de datum van datepicker
myeok.domActions.showDteVanPopup = function(target) {
    if ($('#dteTot').val() != '') {
        var arrEinddag = $('#dteTot').val().split('-');
        var einddag = new Date(arrEinddag[2], arrEinddag[1] - 1, arrEinddag[0]);
        $("#dteVanPopup").datepicker("option", "maxDate", einddag);
    } else {
        $("#dteVanPopup").datepicker("option", "maxDate", null);
    }

    var maand = $('#dteVanPopup .ui-datepicker-title span')[0].outerText;
    var jaar = $('#dteVanPopup .ui-datepicker-title span:nth-child(2)')[0].outerText;
    myeok.huidigeVanMaand = maandenHuidig.indexOf(maand) + 1;

    setDteStyle('#dteVanPopup');
    $('#dteVanPopup').css('display', 'inline');
    myeok.popupActive = true;
    myeok.popupDte = 'Van';

    myeok.domActions.kleurDisabledDagen(huidigeVanMaand, '#dteVanPopup', jaar);
    myeok.dteTarget = target;
}

    // Functie voor het voorzien van de opmaak van de datepickers
myeok.domActions.setDteStyle = function(selector) {
	$(selector).addClass('ui-shadow');
    $(selector + ' > div > div').removeClass('ui-corner-all');
    $(selector + ' > div > div').addClass('ui-body-a ui-corner-top');
    $(selector + ' > div > div > a:nth-child(1)').removeClass('ui-link').addClass('ui-btn ui-btn-icon-notext ui-btn-inline ui-icon-arrow-l ui-shadow');
    $(selector + ' > div > div > a:nth-child(2)').removeClass('ui-link').addClass('ui-btn ui-btn-icon-notext ui-btn-inline ui-icon-arrow-r ui-shadow');
    $(selector + ' table').addClass('mobile-enhanced');
    $(selector + ' table thead th').addClass('ui-bar-a');
    $(selector + ' table tbody td').addClass('ui-body-a');

    $(".ui-datepicker-prev").click(function () {
        myeok.domActions.setDteStyle(selector);
    });

    $(".ui-datepicker-next").click(function () {
        myeok.domActions.setDteStyle(selector);
    });
}

    // Een andere taal selecteren
myeok.domActions.changeLang = function() {
	if ($('#rdbNl')[0].checked == true) {
		window.localStorage.removeItem("TaalKeuze");
		window.localStorage.setItem("TaalKeuze", 'nl');
	} else if ($('#rdbFr')[0].checked == true) {
        window.localStorage.removeItem("TaalKeuze");
        window.localStorage.setItem("TaalKeuze", 'fr');
    } else if ($('#rdbEn')[0].checked == true) {
        window.localStorage.removeItem("TaalKeuze");
        window.localStorage.setItem("TaalKeuze", 'en');
    }

    myeok.taal = window.localStorage.getItem("TaalKeuze");
    myeok.vertaalTekst(myeok.taal);
    myeok.domActions.reloadSaldi();
    myeok.domActions.reloadHist();
    myeok.domActions.opvullenRPTKleuren();
    myeok.domActions.ophalenFeestdagen();
    if (myeok.miRol && (myeok.miRol.indexOf('myHRM') != -1 || myeok.miRol.indexOf('myLG') != -1 || myeok.mirol.indexOf('myHR') != -1)) {
        myeok.domActions.getAanvragenLGHR();
    }
}

    // Herladen van de saldi
myeok.domActions.reloadSaldi = function() {
	$('#cboJaar').selectmenu();
    $('#cboJaar').selectmenu("disable");
    // Saldo van het vorige jaar verwijderen
    myeok.domActions.initSaldiTable();
    // Nieuwe saldo ophalen
    myeok.jaar = $('#cboJaar')[0][$('#cboJaar')[0].selectedIndex].value;
    myeok.taal = window.localStorage.getItem("TaalKeuze");
    myeok.domActions.getSaldi();
}

    // Herladen van de historiek van de gebruiker
myeok.domActions.reloadHist = function() {
    if (myeok.histPageInit) {
		$('#cboHistItems').selectmenu();
        $('#cboHistItems').selectmenu("disable");
    }

    myeok.domActions.initHistTable();
    myeok.jaar = $('#cboJaar')[0][$('#cboJaar')[0].selectedIndex].value;
    myeok.taal = window.localStorage.getItem("TaalKeuze");
    myeok.domActions.getHistoriek();
}

myeok.domActions.getSaldi = function() {
    myeok.loadingSaldi = true;
    $('#loadingDivSaldi').css('display', 'inline');
    $("#cboPrestatieC").selectmenu();
    $("#cboPrestatieC").selectmenu("disable");
				
    dataSource.getSaldi(myeok.mdwID, myeok.jaar, myeok.taal)
        .done(function(data) {
            var revealCbo = true;
            if (data.length == 0) {
                revealCbo = false;
                if ($.mobile.activePage.attr('id') == 'home') {
                    myeok.domActions.melding(myeok.msgGeenSaldi, 5000, 'warning');
                    $('#cboPrestatieC')[0].innerHTML = '';
                    $("#cboPrestatieC").selectmenu();
                }
            } else {
                myeok.verlofSaldi = data;
                myeok.verlofSaldi.sort(myeok.domActions.sorteerSaldi);

                // Select voor het selecteren van een item om weer te geven leeg maken en opnieuw opvullen
                $('#cboPrestatieC')[0].innerHTML = '';
                $.each(myeok.verlofSaldi, function (key, pcode) {
                    var option = document.createElement("option");
                    option.text = pcode.omschrijving;
                    option.value = pcode.prestatiecodeID;
                    $('#cboPrestatieC')[0].add(option);
                });

                if ($.mobile.activePage.attr("id") == 'home') {
                    $("#cboPrestatieC").selectmenu("refresh", true);
                }

                myeok.domActions.changePrestC();
            }

            $('#loadingDivSaldi').css('display', 'none');
            $('#cboJaar').selectmenu("enable");
            if (revealCbo) {
                $('#cboPrestatieC').selectmenu();
                $('#cboPrestatieC').selectmenu("enable");
            }

            myeok.loadingSaldi = false;
        });
}

myeok.domActions.getHistoriek = function() {
    myeok.loadingHist = true;
    $('#loadingDivHist').css('display', 'inline');

    dataSource.getHistory(myeok.mdwID, myeok.jaar, myeok.taal)
        .done(function (data) {
            if (data.length == 0) {
                if ($.mobile.activePage.attr('id') == 'historiek') {
                    melding(msgGeenHistoriek, 5000, 'warning');
                }
            }
            else {
                myeok.historiekItems = data;

                // Select voor het selecteren van een item om weer te geven leeg maken en opnieuw opvullen
                $('#cboHistItems')[0].innerHTML = '';
                $.each(myeok.historiekItems, function (key, histItem) {
                    var datumStart = histItem.start.split('T')[0];
                    var datumEind = histItem.einde.split('T')[0];

                    var option = document.createElement("option");
                    option.text = datumStart.split('-')[2] + '/' + datumStart.split('-')[1] + '/' + datumStart.split('-')[0] + ' - ' + datumEind.split('-')[2] + '/' + datumEind.split('-')[1] + '/' + datumEind.split('-')[0];
                    $('#cboHistItems')[0].add(option);
                });

                if ($.mobile.activePage.attr("id") == 'historiek') {
                    $("#cboHistItems").selectmenu("refresh", true);
                }

                myeok.domActions.changeHistItem();
            }

            $('#loadingDivHist').css('display', 'none');
            if (myeok.histPageInit) {
                $('#cboHistItems').selectmenu();
                $('#cboHistItems').selectmenu("enable");
            }

            myeok.loadingHist = false;
    });
}


    // Ophalen van de verschillende prestatiecodes en bijhorend kleurtje op in de legende weer te geven
myeok.domActions.opvullenRPTKleuren = function() {
    dataSource.getColors(myeok.mdwID, new Date().getFullYear(), myeok.taal).done(function(data) { 
        var legende = '';
        $.each(data, function (key, prestatiecode) {
            legende += '<div><div class="kleur" style="background-color:' + prestatiecode.kleur + ';"></div><p>' + prestatiecode.omschrijving + '</p></div>';
        });
        $('#Legende > div')[0].innerHTML = legende;
    });
}

    // Functie voor het kleuren van de verschillende feest-/verlofdagen
myeok.domActions.kleurDisabledDagen = function(huidigeMaand, dtpId, huidigjaar) {
    // Alle feest-/verlofdagen overlopen en op de datepicker kleuren indien nodig
    if (myeok.uitTeSchakelenDagen && myeok.uitTeSchakelenDagen.length) {
        $.each(myeok.uitTeSchakelenDagen, function (key, value) {
            // Als de dag plaatsvindt in de huidig weergegeven maand --> dag kleuren
            var datumUitschakelen = value.datum;
            if (value.altDatum != '' && value.altDatum != null)
                datumUitschakelen = value.altDatum;

            if (parseInt(datumUitschakelen.split('-')[1]) == huidigeMaand && parseInt(datumUitschakelen.split('-')[2]) == huidigjaar) {
                var datumMaand = new Date(huidigjaar, huidigeMaand - 1, parseInt(datumUitschakelen.split('-')[0]));

                // Bepalen in welke week van de maand de dag plaatsvindt
                var weekInMaand = Math.ceil(Math.abs(datumMaand.getDay() - parseInt(datumUitschakelen.split('-')[0])) / 7);
                var weekcheck = datumMaand.getDay() - parseInt(datumUitschakelen.split('-')[0]);
                if (weekcheck <= 0)
                    weekInMaand += 1;
                // Bepalen de hoeveelste dag van de week de dag plaatsvindt
                var dagInWeek = datumMaand.getDay();

                // De dag inkleuren in de datepicker
                var selector = dtpId + ' tbody tr:nth-child(' + weekInMaand + ') td:nth-child(' + dagInWeek + ')';
                if (value.dagDeel == 'dag')
                    $(selector).css('background-color', value.kleur);
                else if (value.dagDeel == 'vm') {
                    var defaultValue = '';

                    if ($(selector)[0].style.background != '') {
                        var prevKleur = $(selector)[0].style.background.substr($(selector)[0].style.background.indexOf('rgb'), $(selector)[0].style.background.length - $(selector)[0].style.background.indexOf('rgb')).split(')')[0] + ')';
                        defaultValue = 'linear-gradient(' + value.kleur + ' 50%, ' + prevKleur + ' 50%)';

                        $(selector).css('background', defaultValue);
                        $(selector).css('background', '-o-' + defaultValue);
                        $(selector).css('background', '-moz-' + defaultValue);
                        $(selector).css('background', '-webkit-' + defaultValue);
                    }
                    else {
                        defaultValue = 'linear-gradient(' + value.kleur + ' 50%, white 50%)';

                        $(selector).css('background', defaultValue);
                        $(selector).css('background', '-o-' + defaultValue);
                        $(selector).css('background', '-moz-' + defaultValue);
                        $(selector).css('background', '-webkit-' + defaultValue);
                    }
                }
                else if (value.dagDeel == 'nm') {
                    var defaultValue = '';
                    if ($(selector)[0].style.background != '') {
                        var prevKleur = $(selector)[0].style.background.substr($(selector)[0].style.background.indexOf('rgb'), $(selector)[0].style.background.length - $(selector)[0].style.background.indexOf('rgb')).split(')')[0] + ')';
                        defaultValue = 'linear-gradient(' + prevKleur + ' 50%, ' + value.kleur + ' 50%)';

                        $(selector).css('background', defaultValue);
                        $(selector).css('background', '-o-' + defaultValue);
                        $(selector).css('background', '-moz-' + defaultValue);
                        $(selector).css('background', '-webkit-' + defaultValue);
                    }
                    else {
                        defaultValue = 'linear-gradient(white 50%, ' + value.kleur + ' 50%)';
                        $(selector).css('background', defaultValue);
                        $(selector).css('background', '-o-' + defaultValue);
                        $(selector).css('background', '-moz-' + defaultValue);
                        $(selector).css('background', '-webkit-' + defaultValue);
                    }
                }
            }
        });
    }

    // Als er in het weekend niet gewerkt wordt dan worden de weekends in ge grijs gekleurd
	if (!myeok.weekendWerk) {
        for (var i = 1; i <= $(dtpId + ' tbody tr').length; i++) {
            var selector = dtpId + ' tbody tr:nth-child(' + i + ') td:nth-child(6)';
            if ($(selector).children().length > 0)
                $(selector).css('background-color', '#B0B0B0');
            selector = dtpId + ' tbody tr:nth-child(' + i + ') td:nth-child(7)';
            if ($(selector).children().length > 0)
                $(selector).css('background-color', '#B0B0B0');
        }
    }
}

    // Ophalen van alle feest-/verlofdagen
myeok.domActions.ophalenFeestdagen = function() {
	myeok.loadingFeest = true;

    dataSource.getNationalHolidays(myeok.mdwID, new Date().getFullYear(), myeok.taal).done(function(data) {
        // De opgehaalde dagen in een array opslaan
        // Deze lijst wordt pas overlopen/toegepast bij het weergeven/navigeren in een datepicker
        myeok.loadingFeest = false;
        myeok.uitTeSchakelenDagen = data;
        if (myeok.dteDisabled) {
            $('#dteVan').textinput("option", "disabled", false);
            $('#dteTot').textinput("option", "disabled", false);
            myeok.dteDisabled = false;
        }

        if (data.length != 0) {
            myeok.weekendWerk = data[0].werkWeekend;
        }
    });
}

    // De dagen ophalen waarvoor effectief verlof voor aangevraagd kan worden
    // aan de hand van de periode die door de gebruiker werd opgegeven
myeok.domActions.haalDagenOp = function() {
	$('#loadingDivDetailsDagen').css('display', 'inline');
    // gegevens voorsturen naar de API

    if ($('#dteVan').val().substr(6, 4) == $('#dteTot').val().substr(6, 4)) {
        dataSource.getDays(myeok.mdwID, $('#dteVan').val(), $('#dteTot').val(), myeok.taal).done(function (data) {
            // Als er een fout plaatsvond deze weergeven aan de gebruiker
            if (typeof data == 'string')
                melding(data, 5000, 'error');
            else {
                myeok.DagenVoorVerlofAanvraag = data;
                $("#colSet")[0].innerHTML = '';
                var content = '';

                myeok.loadingSaldi = true;
                $('#loadingDivSaldi').css('display', 'inline');
                $("#cboPrestatieC").selectmenu();
                $("#cboPrestatieC").selectmenu("disable");

                var teSelecterenIndex = $('#cboJaar')[0].selectedIndex;
                $.each($('#cboJaar')[0], function (key, val) {
                    if (val.value == $('#dteVan').val().substr(6, 4)) {
                        teSelecterenIndex = key;
                    }
                });

                $('#cboJaar')[0].selectedIndex = teSelecterenIndex;
                myeok.jaar = $('#cboJaar')[0][$('#cboJaar')[0].selectedIndex].value;
                dataSource.getSaldi(myeok.mdwID, myeok.jaar, myeok.taal).done(function (data) {
                    var revealCbo = true;
                    if (data.length == 0) {
                        revealCbo = false;
                        if ($.mobile.activePage.attr('id') == 'home') {
                            melding(msgGeenSaldi, 5000, 'warning');
                            $('#cboPrestatieC')[0].innerHTML = '';
                            $("#cboPrestatieC").selectmenu();
                        }
                    } else {
                        myeok.verlofSaldi = data;
                        myeok.verlofSaldi.sort(sorteerSaldi);

                        // Select voor het selecteren van een item om weer te geven leeg maken en opnieuw opvullen
                        $('#cboPrestatieC')[0].innerHTML = '';
                        $.each(myeok.verlofSaldi, function (key, pcode) {
                            var option = document.createElement("option");
                            option.text = pcode.omschrijving;
                            option.value = pcode.prestatiecodeID;
                            $('#cboPrestatieC')[0].add(option);
                        });
                        if ($.mobile.activePage.attr("id") == 'home')
                            $("#cboPrestatieC").selectmenu("refresh", true);
                        myeok.domActions.changePrestC();
                    }
                    $('#loadingDivSaldi').css('display', 'none');
                    $('#cboJaar').selectmenu("enable");
                    if (revealCbo) {
                        $('#cboPrestatieC').selectmenu();
                        $('#cboPrestatieC').selectmenu("enable");
                    }

                    myeok.loadingSaldi = false;

                    // Een lijst van alle opgehaalde dagen weergeven op de #DetailsDagen pagina
                    for (i = 0; i < myeok.DagenVoorVerlofAanvraag.length; i++) {
                        var dag = new Date(myeok.DagenVoorVerlofAanvraag[i].dag.split('T')[0].split('-')[0], myeok.DagenVoorVerlofAanvraag[i].dag.split('T')[0].split('-')[1] - 1, myeok.DagenVoorVerlofAanvraag[i].dag.split('T')[0].split('-')[2]);
                        var dagNaam = dagenHuidig[dag.getDay()];
                        var dagNummer = dag.getDate();
                        var maandNaam = maandenHuidig[dag.getMonth()];
                        var datumJaar = dag.getFullYear();

                        // Toevoegen van de datum aan de header van de collapsible
                        content += "<div data-role='collapsible' data-theme='a' id='collap" + i + "' data-collapsed='true'><h3>" + dagNaam + " " + dagNummer + " " + maandNaam + " " + datumJaar + "</h3><select id='collapSel" + i + "' class='collapSelDagen'>";

                        // Alle prestatieCodes toevoegen aan de select in de collapsible
                        var dagenOver = false;
                        var teSelecterenIndex = 0;
                        for (y = 0; y < myeok.verlofSaldi.length; y++) {
                            if (myeok.verlofSaldi[y].prestatiecodeID == myeok.DagenVoorVerlofAanvraag[i].prestatiecodeID) {
                                if (myeok.verlofSaldi[y].aantalDagen > 0) {
                                    dagenOver = true;
                                    teSelecterenIndex = y;
                                }
                            }
                        }
                        if (!dagenOver) {
                            var iTeller = 0;
                            while (myeok.verlofSaldi[iTeller].aantalDagen <= 0) {
                                if (iTeller + 1 < myeok.verlofSaldi.length) {
                                    iTeller += 1;
                                }
                                else {
                                    break;
                                }
                            }
                            if (iTeller < myeok.verlofSaldi.length && myeok.verlofSaldi[iTeller].aantalDagen > 0) {
                                teSelecterenIndex = iTeller;
                            }
                        }

                        myeok.verlofSaldi[teSelecterenIndex].aantalDagen -= 1;
                        for (y = 0; y < myeok.verlofSaldi.length; y++) {
                            var aantBeschikbaar = parseFloat(('' + myeok.verlofSaldi[y].beschikbaar).replace(',', '.'));
                            if (myeok.verlofSaldi[y].isRecup) {
                                aantBeschikbaar += parseFloat(('' + myeok.verlofSaldi[y].urenInNegatief).replace(',', '.'));
                            }
                            if (aantBeschikbaar > 0) {
                                if (y == teSelecterenIndex) {
                                    content += '<option value="' + myeok.verlofSaldi[y].prestatiecodeID + '" selected>' + myeok.verlofSaldi[y].omschrijving + '</option>';
                                } else {
                                    content += '<option value="' + myeok.verlofSaldi[y].prestatiecodeID + '">' + myeok.verlofSaldi[y].omschrijving + '</option>';
                                }
                            }
                        }

                        // Bepalen welke controls weergegeven moeten worden in de collapsible
                        // verlofInUren --> NumericalUpDown
                        // verlofInDagen --> Select

                        var aantalUur = myeok.DagenVoorVerlofAanvraag[i].aantaluur.split(':')[0];
                        if (aantalUur.length == 1) {
                            aantalUur = '0' + aantalUur;
                        }
                        aantalUur = aantalUur + ':' + myeok.DagenVoorVerlofAanvraag[i].aantaluur.split(':')[1];

                        if (!myeok.verlofSaldi[teSelecterenIndex].aanvragenInDagen) {
                            content += "</select><label>" + dynamicAantUur;

                            if (navigator.userAgent.match(/(IEMobile)/))
                                content += "</label><input class='collapAantUur' id='collapTxt" + i + "' type='number' value='" + aantalUur + "' />";
                            else
                                content += "</label><input class='collapAantUur' id='collapTxt" + i + "' type='time' value='" + aantalUur + "' />";
                            content += "<select style='display:none' id='collapDag" + i + "'>";
                        }
                        else {
                            content += "</select><label>" + dynamicDagdeel;

                            if (navigator.userAgent.match(/(IEMobile)/))
                                content += "</label><input style='display:none' class='collapAantUur' id='collapTxt" + i + "' type='number' value='" + aantalUur + "' />";
                            else
                                content += "</label><input style='display:none' class='collapAantUur' id='collapTxt" + i + "' type='time' value='" + aantalUur + "' />";
                            content += "<select id='collapDag" + i + "'>";
                        }
                        content += "<option value='D100'>" + dynamicDag + "</option>";
                        content += "<option value='V50'>" + dynamicVoormiddag + "</option>";
                        content += "<option value='N50'>" + dynamicNamiddag + "</option>";
                        content += "</select></div>";
                    }
                    // Een button btnDagenBevestigen toevoegen
                    //content += "<div class='ui-btn ui-input-btn ui-corner-all ui-shadow ui-btn-a'>";
                    //content += "<input data-theme='b' id='btnDagenBevestigen' type='submit' value='" + dynamicBtnDagenBevestigen + "' />" + dynamicBtnDagenBevestigen + "</input></div>";
                    content += "<input data-theme='a' id='btnDagenBevestigen' type='submit' value='" + myeok.dynamicBtnDagenBevestigen + "' />";
                    $("#colSet")[0].innerHTML = content;

                    for (i = 0; i < myeok.DagenVoorVerlofAanvraag.length; i++) {
                        switch (myeok.DagenVoorVerlofAanvraag[i].dagID) {
                            case 'D100':
                                $('#collapDag' + i)[0].selectedIndex = 0;
                                break;
                            case 'V50':
                                $('#collapDag' + i)[0].selectedIndex = 1;
                                break;
                            case 'N50':
                                $('#collapDag' + i)[0].selectedIndex = 2;
                                break;
                            default:
                                $('#collapDag' + i)[0].selectedIndex = 0;
                                break;
                        }
                    }

                    if ($('select.collapSelDagen')[0].length > 0) {
                        // Navigeren naar de lijst van opgehaalde dagen
                        $('#aDetailsDagen').click();
                    } else {
                        melding(msgOnvoldoendeVerlof, 5000, 'error');
                    }
                });
            }
            $('#loadingDivDetailsDagen').css('display', 'none');
        });
    } else {
        melding(msgVerschJaren, 5000, 'error');
        $('#loadingDivDetailsDagen').css('display', 'none');
    }
}

    // Sorteren van saldi op basis van belang
myeok.domActions.sorteerSaldi = function(a, b) {
	if (a.belang == 0)
		a.belang = 999999999;
	if (b.belang == 0)
		b.belang = 999999999;
	if (a.belang < b.belang)
		return -1;
	if (a.belang > b.belang)
		return 1;
	return 0;
},

    // Het bevestigen van de aanvraag
myeok.domActions.dagenBevestigen = function() {
	$('#loadingDivDetailD').css('display', 'inline');
    var UurLeegOfNr = false;
    // Lijst van alle aan te vragen dagen overlopen,
    // Controlleren of alles ingevuld is en de data opslaan in een object
    $.each(myeok.DagenVoorVerlofAanvraag, function (key, value) {
        var itemIndex = key + 1;
        var selector = '#colSet > div:nth-child(' + itemIndex + ')';

        var selectedPCodeIndex = $(selector + ' div.ui-select select')[0].selectedIndex;
        var pCodeId = $(selector + ' div.ui-select select')[0][selectedPCodeIndex].value;
        if (myeok.verlofSaldi[selectedPCodeIndex].aanvragenInDagen) {
            var aantaluur = $(selector + ' div div.ui-select')[1].children[0].children[1][$(selector + ' div div.ui-select')[1].children[0].children[1].selectedIndex].value;

            value["prestatiecodeID"] = pCodeId;
            value["aantaluur"] = aantaluur;
            value["dagID"] = aantaluur;
        }else{
            var aantaluur = $(selector + ' div div.ui-input-text input')[0].value;

            if (aantaluur == '' || aantaluur.length != 5)
                UurLeegOfNr = true;
            value["prestatiecodeID"] = pCodeId;
            value["aantaluur"] = aantaluur;
            var uren = aantaluur.split(':');
            for (i = 0; i < uren.length; i++) {
                if (isNaN(uren[i]))
                    UurLeegOfNr = true;
            }
        }
    });

    // Als niet alles ingevuld werd een melding aan de gebruiker tonen
    if (UurLeegOfNr) {
        $('#loadingDivDetailD').css('display', 'none');
        melding(msgAlleVeldenInvullen, 5000, 'error');
        enableBijVerlofaanvraag();
    } else {
        var gegevens = {
            startDag: $('#dteVan').val(),
            eindDag: $('#dteTot').val(),
            mwid: mdwID, jaar: jaar,
            sTekst: $('#txaRedenVal').val(),
            sTaal: taal,
            jaar: jaar,
            lijstDagen: DagenVoorVerlofAanvraag
        };
        // Gegevens doorsturen naar de API

        dataSource.confirmHolidays(gegevens).done(function (data) {
            $('#loadingDivDetailD').css('display', 'none');
            // Een melding geven indien er een probleem was bij het opslaan van de aanvraag
            if (typeof data == 'string') {
                $('#txaRedenVal').val(data);
                if (data.split('@#@').length == 2)
                    melding(data.split('@#@')[1], 10000, data.split('@#@')[0]);
                else
                    melding(data, 10000, 'error');
            }

            // Formuliertje leeg maken
            if (typeof data != 'string') {
                $('#dteVan').val('');
                $('#dteTot').val('');
                $('#txaRedenVal').val('');
            }

            myeok.domActions.enableBijVerlofaanvraag();

            // Saldi, historiek en feest-/verlofdagen opnieuw ophalen
            $('#aHome').click();
            myeok.domActions.reloadSaldi();
            myeok.domActions.reloadHist();
            myeok.domActions.ophalenFeestdagen();
        });
    }
}

    // Een melding aan de gebruiker meegeven
    // Bericht = tekst in de melding
    // fadeDelay = tijd dat het bericht zichtbaar is
    // status = wat voor soort melding is het? error (rood), warning (geel), success (groen)
myeok.domActions.melding = function(bericht, fadeDelay, status) {
	switch (status) {
		case "error":
        $('.melding').css('background-color', '#ff5757');
        break;
		case "warning":
        $('.melding').css('background-color', '#ffdd57');
        break;
		case "success":
        $('.melding').css('background-color', '#57dd57');
        break;
    }
    $('.melding').text(bericht);
    $('.melding').fadeIn();
    window.clearTimeout(this.timeout);
    this.timeout = setTimeout(function () { $('.melding').fadeOut(); }, fadeDelay);
}

    
    // Melding verbergen wanneer er op geklikt wordt
myeok.domActions.hideMelding = function() {
    clearTimeout(timeout);
    $('.melding').fadeOut();
},

    // De gebruiker logt uit
myeok.domActions.logout = function() {
    window.localStorage.removeItem("mdwID");
    window.localStorage.removeItem("miRol");
    window.location.href = "index.html#login";
};

myeok.domActions.disableBijVerlofaanvraag = function() {
	try {
        // Verlof aanvragen
		$('#btnDetailDagen').button("disable");
        $('#btnDetailDagen').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
    try {
        // Verlof bevestigen
        $('#btnDagenBevestigen').button("disable");
        $('#btnDagenBevestigen').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
    try {
        // Behandelen
        $('input[value="Behandelen"]').button("disable");
        $('input[value="Behandelen"]').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
    } catch (ex) { }
}

myeok.domActions.enableBijVerlofaanvraag = function () {
    try {
        // Verlof aanvragen
        $('#btnDetailDagen').button("enable");
        $('#btnDetailDagen').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
    try {
        // Verlof bevestigen
        $('#btnDagenBevestigen').button("enable");
        $('#btnDagenBevestigen').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
    try {
        // Behandelen
        $('input[value="Behandelen"]').button("enable");
        $('input[value="Behandelen"]').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
    } catch (ex) { }
}