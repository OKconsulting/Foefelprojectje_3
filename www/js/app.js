"use strict";

if (typeof(myeok) == "undefined") {
    var myeok = {};
}

myeok.APIVersion = '3';

// Arrays met de verschillende maanden/dagen in de beschikbare talen
myeok.dagenKortNl = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"];
myeok.dagenKortFr = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
myeok.dagenKortEn = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
myeok.dagenKortHuidig = myeok.dagenKortNl;
myeok.dagenNl = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"];
myeok.dagenFr = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
myeok.dagenEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
myeok.dagenHuidig = myeok.dagenNl;
myeok.maandenNl = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
myeok.maandenFr = ["Janvier", "Fëvrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
myeok.maandenEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
myeok.maandenHuidig = myeok.maandenNl;


myeok.huidigeVanMaand = new Date().getMonth() + 1;
myeok.huidigVanJaar = new Date().getFullYear();
myeok.huidigeTotMaand = new Date().getMonth() + 1;
myeok.huidigTotJaar = new Date().getFullYear();
myeok.huidigeOverviewMaand = new Date().getMonth() + 1;
myeok.huidigOverviewJaar = new Date().getFullYear();
myeok.uitTeSchakelenDagen = null;
myeok.weekendWerk = true;
myeok.loadingFeest = false;
myeok.dteDisabled = false;
myeok.appStartup = true;
myeok.histPageInit = false;
myeok.loadingHist = true;
myeok.loadingSaldi = true;

myeok.timeout;
myeok.popupActive = false;
myeok.popupDte = '';
myeok.dteTarget = null;
myeok.initialPageHeight = 0;
myeok.pageHeightSet = false;
myeok.firstclick = false;
myeok.dteVanIngevuld = false;
myeok.dteTotIngevuld = false;
myeok.reloadDtes = false; // veriabele wordt gebruikt in jquery-ui-1.10.5.custom.js
myeok.clickEventsBound = false;
myeok.geenTeBehandelenAanvragen = false;
myeok.aanvraagInBehandeling = 0;
myeok.aanvragenLGHR = null;


myeok.initApp = function () {
    $("#Toon-kalender").bind({
        popupafterclose: function (event, ui) {
            myeok.pageHeightSet = false;
            $('#verlofAanv').css('height', myeok.initialPageHeight);
            myeok.initialPageHeight = 0;
        }
    });

    $('#colSetDetailAanvraag.ui-collapsible.ui-collapsible-collapsed').attr('data-collapsed', false).removeClass("ui-collapsible-collapsed").find('.ui-collapsible-content').removeClass('ui-collapsible-content-collapsed');
    $('#loadingDivDetailsDagen').css('display', 'none');
    this.verlofSaldi = null;
    this.historiekItems;

    // Dropdown om het selecteren van een jaar voorzien van jaartallen
    var iJaar = new Date().getFullYear();
    for (var i = 0; i <= 1; i++) {
        var option = document.createElement("option");
        option.text = iJaar + i;
        option.value = iJaar + i;
        $('#cboJaar')[0].add(option);
    }

    // Verschillende data uit de 'cookies' halen
    this.mdwID = window.localStorage.getItem("mdwID");
    this.miRol = window.localStorage.getItem("miRol");
    this.jaar = $('#cboJaar')[0][$('#cboJaar')[0].selectedIndex].value;
    this.taal = window.localStorage.getItem("TaalKeuze");
    if (!this.taal) {
        window.localStorage.setItem("TaalKeuze", 'nl');
        this.taal = 'nl';
    }

    window.onclick = function (e) {
        if (e.target.id.indexOf('dte') != -1) {
            $('#dteVanPopup').css('display', 'none');
            $('#dteTotPopup').css('display', 'none');
            $('#' + e.target.id + 'Popup').css('display', 'inline');
        } else {
            if (this.popupActive) {
                if (e.target.className.indexOf('ui-datepicker') == -1 && !this.firstclick) {
                    $('#dteVanPopup').css('display', 'none');
                    $('#dteTotPopup').css('display', 'none');
                    this.popupActive = false;
                    this.popupDte = '';
                }
                this.firstclick = false;
            }

            if (this.popupActive) {
                // Er werd geklikt op een pijltje om de volgende/vorige maand te selecteren in een datepicker
                // Huidige maand variabele updaten en de verschillende feest-/verlofdagen kleuren in de datepicker
                if (this.popupDte == "Van") {
                    if (e.target.className.indexOf('ui-datepicker-prev') != -1) {
                        this.huidigeVanMaand -= 1;

                        if (this.huidigeVanMaand < 1) {
                            this.huidigeVanMaand = 12;
                            this.huidigVanJaar -= 1;
                        }

                        this.domActions.kleurDisabledDagen(this.huidigeVanMaand, '#dteVanPopup', this.huidigVanJaar);
                    }

                    if (e.target.className.indexOf('ui-datepicker-next') != -1) {
                        this.huidigeVanMaand += 1;

                        if (this.huidigeVanMaand > 12) {
                            this.huidigeVanMaand = 1;
                            this.huidigVanJaar += 1;
                        }

                        this.domActions.kleurDisabledDagen(this.huidigeVanMaand, '#dteVanPopup', this.huidigVanJaar);
                    }
                } else if (this.popupDte == 'Tot') {
                    if (e.target.className.indexOf('ui-datepicker-prev') != -1) {
                        this.huidigeTotMaand -= 1;

                        if (this.huidigeTotMaand < 1) {
                            this.huidigeTotMaand = 12;
                            this.huidigTotJaar -= 1;
                        }

                        this.domActions.kleurDisabledDagen(this.huidigeTotMaand, '#dteTotPopup', this.huidigTotJaar);
                    }
                    if (e.target.className.indexOf('ui-datepicker-next') != -1) {
                        this.huidigeTotMaand += 1;

                        if (this.huidigeTotMaand > 12) {
                            this.huidigeTotMaand = 1;
                            this.huidigTotJaar += 1;
                        }

                        this.domActions.kleurDisabledDagen(this.huidigeTotMaand, '#dteTotPopup', this.huidigTotJaar);
                    }
                } else if (this.popupDte == 'Overview') {
                    if (!this.pageHeightSet) {
                        this.pageHeightSet = true;
                        this.initialPageHeight = $('#verlofAanv').css('height');
                        $('#verlofAanv').css('height', document.getElementById('Toon-kalender-popup').offsetHeight + 'px');
                    }

                    if (e.target.className.indexOf('ui-datepicker-prev') != -1) {
                        this.huidigeOverviewMaand -= 1;

                        if (this.huidigeOverviewMaand > 12) {
                            this.huidigeOverviewMaand = 1;
                            this.huidigOverviewJaar -= 1;
                        }

                        this.domActions.kleurDisabledDagen(this.huidigeOverviewMaand, '#dteOverview', this.huidigOverviewJaar);
                    }
                    if (e.target.className.indexOf('ui-datepicker-next') != -1) {
                        this.huidigeOverviewMaand += 1;

                        if (this.huidigeOverviewMaand > 12) {
                            this.huidigeOverviewMaand = 1;
                            this.huidigOverviewJaar += 1;
                        }

                        this.domActions.kleurDisabledDagen(this.huidigeOverviewMaand, '#dteOverview', this.huidigOverviewJaar);
                    }
                }
            }
        }
    }

    // Code die uitgevoegd wordt bij het laden van de #DetailsDagen pagina
    $(document).on('pagebeforeshow', '#DetailsDagen', function () {
        $('#colSet select').selectmenu();
        $('#colSet .collapAantUur').textinput();
        $("#btnDagenBevestigen").button();

        $('#btnDagenBevestigen').click(function (event) {
            event.preventDefault();
            myeok.domActions.disableBijVerlofaanvraag();
            myeok.domActions.dagenBevestigen();
        });

        for (i = 0; i < $('select.collapSelDagen').length; i++) {
            var selectedIndex = $($('select.collapSelDagen')[i])[0].selectedIndex;
            if (myeok.verlofSaldi[selectedIndex].aanvragenInDagen) {
                $('#collapTxt' + i).css('display', 'none');
                $('#collapDag' + i).parent().css('display', 'block');
            } else {
                $('#collapTxt' + i).css('display', 'inline');
                $('#collapDag' + i).parent().css('display', 'none');
            }
        }

        $('.collapSelDagen').change(function () {
            var index = this.id.substr(9, this.id.length - 9);
            if (myeok.verlofSaldi[this.selectedIndex].aanvragenInDagen) {
                $('#collapTxt' + index).css('display', 'none');
                $('#collapDag' + index).parent().css('display', 'block');
            } else {
                $('#collapTxt' + index).css('display', 'inline');
                $('#collapDag' + index).parent().css('display', 'none');
            }
        });

        $(".collapAantUur").bind("paste", function (e) {
            e.preventDefault();
        });

        $('#colSet div[data-role="collapsible"]').collapsible();

        //if (navigator.userAgent.match(/(IEMobile)/)) {
        $('.collapAantUur').keyup(function (e) {
            var selector = '#' + this.id;
            var timeValue = '';
            if (e.keyCode == 8)
                timeValue = $(selector).val();
            else
                timeValue = $(selector).val().substr(0, $(selector).val().length - 1);
            if (timeValue.length != 5 || e.keyCode == 8) {
                var keyPressed = e.keyCode - 48;
                if ((keyPressed > -1 && keyPressed < 10) || e.keyCode == 8) {
                    if (e.keyCode == 8) {
                        if (timeValue.length == 2) {
                            timeValue = timeValue.substr(0, timeValue.length - 1);
                        }
                    }
                    else {
                        timeValue = timeValue + keyPressed;
                        if (timeValue.length == 4 && keyPressed > 5) {
                            timeValue = timeValue.substr(0, timeValue.length - 1);
                        }
                        if (timeValue.length == 2) {
                            timeValue = timeValue + ':';
                        }
                    }
                }
            }
            $(selector).val(timeValue)
        });
    });


    // Code die uitgevoegd wordt bij het laden van de #home pagina
    $(document).on('pagebeforeshow', '#home', function () {
        if (myeok.appStartup) {
            $("#home_panel").panel("open");
            myeok.appStartup = false;
            myeok.vertaalTekst(myeok.taal);
            // Click event voor het ophalen van de dagen waarvoor effectief verlof voor aangevraagd kan worden
            $("#btnDetailDagen").click(function (event) {
                $("#btnDagenBevestigen").button("enable");
                event.preventDefault();
                myeok.domActions.haalDagenOp()
            });
        }

        // Als de ingelogde medewerkers HRM|LG is worden de te behandelen aanvragen opgehaald
        if (myeok.miRol != null && (myeok.miRol.indexOf('myHRM') != -1 || myeok.miRol.indexOf('myLG') != -1 || myeok.miRol.indexOf('myHR') != -1)) {
            myeok.domActions.getAanvragenLGHR();
        } else {
            $('li.menuBehandelen').css('display', 'none');
        }

        if (myeok.loadingSaldi) {
            $('#cboJaar').selectmenu("disable");
            $('#cboPrestatieC').selectmenu("disable");
        }

        $("#cboPrestatieC").selectmenu("refresh", true);
    });


    // Code die uitgevoegd wordt bij het laden van de #historiek pagina
    $(document).on('pagebeforeshow', '#historiek', function () {
        if (myeok.loadingHist) {
            $('#cboHistItems').selectmenu("disable");
        }
        if ($('#loadingDivHist')[0].style.display == 'none' && !myeok.historiekItems) {
            melding(myeok.msgGeenHistoriek, 5000, 'warning');
            $('#cboHistItems').selectmenu("disable");
        }

        $("#cboHistItems").selectmenu("refresh", true);
        myeok.histPageInit = true;
    });


    // Code die uitgevoegd wordt bij het laden van de #Opties pagina
    $(document).on('pagebeforeshow', '#Opties', function () {
        switch (myeok.taal) {
            case 'nl':
                $("input[type='radio']:first").attr("checked", "checked");
                break;
            case 'fr':
                $("input[type='radio']:eq(1)").attr("checked", "checked");
                break;
            case 'en':
                $("input[type='radio']:last").attr("checked", "checked");
                break;
        }
        $("input[type='radio']").checkboxradio().checkboxradio("refresh");

        var deviceWidth = document.documentElement.clientWidth - 16;
        $('#opPageFooter').css('width', deviceWidth);
        $('#opPageFooter').css('text-align', 'center');
        $('#opPageFooter').css('position', 'absolute');
        $('#opPageFooter').css('bottom', '0');
        $('#opPageFooter').css('margin-bottom', '20px');
    });


    // Code die uitgevoegd wordt bij het laden van de #verlofAanv pagina
    $(document).on('pagebeforeshow', '#verlofAanv', function () {
        if (myeok.loadingFeest) {
            $('#dteVan').textinput("option", "disabled", true);
            $('#dteTot').textinput("option", "disabled", true);
        }
        $('#txaRedenVal').val('');
        $('#dteVan').val('');
        $('#dteTot').val('');
        myeok.dteTotIngevuld = false;
        myeok.dteVanIngevuld = false;
        $("#btnDetailDagen").button();
        $("#btnDetailDagen").button("disable");
        $('#btnDetailDagen').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
        myeok.dteDisabled = true;
    });

    $(document).on('pagebeforeshow', '#About', function () {
        var deviceWidth = document.documentElement.clientWidth - 16;
        $('#abPageFooter').css('width', deviceWidth);
    });


    $(window).on("orientationchange", function (event) {
        if (event.orientation == 'landscape') {
            $('.confContent').css('width', '').css('margin', '');
            $('#divConfAanvrYes').css('display', '').css('float', '');
            $('#divConfAanvrNo').css('display', '').css('float', '');
        } else {
            $('.confContent').css('width', '175px').css('margin', '-100px 0 0 -107px');
            $('#divConfAanvrYes').css('display', 'block').css('float', 'none');
            $('#divConfAanvrNo').css('display', 'block').css('float', 'none');
        }
    });

    if (navigator.userAgent.match(/(IEMobile)/)) {
        $(document).on('click', '#aOpenHomePanel', function () {
            $("#home_panel").panel("open");
        });
        $(document).on('click', '#aOpenVerlofPanel', function () {
            $("#verlof_panel").panel("open");
        });
        $(document).on('click', '#aOpenDetailsPanel', function () {
            $("#details_panel").panel("open");
        });
        $(document).on('click', '#aOpenHistoriekPanel', function () {
            $("#historiek_panel").panel("open");
        });
        $(document).on('click', '#aOpenAanvragenPanel', function () {
            $("#aanvragen_panel").panel("open");
        });
        $(document).on('click', '#aOpenDetailsAanvraagPanel', function () {
            $("#detailsAanvraag_panel").panel("open");
        });
        $(document).on('click', '#aOpenOptiesPanel', function () {
            $("#opties_panel").panel("open");
        });
        $(document).on('click', '#aOpenAboutPanel', function () {
            $("#about_panel").panel("open");
        });
    }

    // Datepickers initialiseren
    $('.customDatepicker').datepicker({
        firstDay: 1,
        dateFormat: "dd-mm-yy",
        dayNamesMin: myeok.dagenKortHuidig,
        dayNames: myeok.dagenHuidig,
        monthNames: myeok.maandenHuidig,
        minDate: new Date(myeok.jaar, 0, 1),
        //beforeShowDay: $.datepicker.noWeekends,
        onSelect: function (dateText, e) {
            if (myeok.dteTarget != null) {
                $('#' + myeok.dteTarget).val(dateText);
                $('#dteTotPopup').css('display', 'none');
                $('#dteVanPopup').css('display', 'none');
                popupActive = false;

                // Bij het selecteren van een datum nagaan naar welke input het geschreven moet worden
                if (myeok.dteTarget == 'dteVan')
                    myeok.dteVanIngevuld = true;
                else if (myeok.dteTarget == "dteTot")
                    myeok.dteTotIngevuld = true;
                if (myeok.dteVanIngevuld && myeok.dteTotIngevuld) {
                    $("#btnDetailDagen").button("enable");
                    $('#btnDetailDagen').parent().css('color', '').css('background-color', '').css('cursor', 'pointer');
                }
                else {
                    $("#btnDetailDagen").button("disable");
                    $('#btnDetailDagen').parent().css('color', '#aaa').css('background-color', '#ddd').css('cursor', 'default');
                }
            }
        }
    });

    $(document).on('pagebeforeshow', '#detailsAanvraag', function () {
        $('#dagenAanvraag div[data-role="collapsible"]').collapsible();

        if (!myeok.clickEventsBound) {
            // Goedkeuren van een aanvraag
            $('#btnGoedkeuren').click(function () {
                myeok.domActions.disableBijBehandeling();
                myeok.domActions.goedOfAfkeuren(true);
            });
            // Afkeuren van een aanvraag
            $('#btnAfkeuren').click(function () {
                myeok.domActions.disableBijBehandeling();
                myeok.domActions.goedOfAfkeuren(false);
            });
            myeok.clickEventsBound = true;
        }
    });

    // De jQuery controls die dynamisch toegevoegd werden aan de pagina initialiseren
    $(document).on('pagebeforeshow', '#aanvragen', function () {
        $('#btnConfAanvrNo').button();
        $('#btnConfAanvrYes').button();

        if (myeok.geenTeBehandelenAanvragen)
            myeok.domActions.melding(msgGeenAanvragen, 5000, 'error');
        else
            $('#colSetAanvragen div[data-role="collapsible"]').collapsible();
        if (myeok.aanvragenLGHR == null) {
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
            myeok.domActions.inBatchGoedkeuren();
        });
    });

    myeok.domActions.getSaldi();
    myeok.domActions.getHistoriek();
    myeok.domActions.opvullenRPTKleuren();
    myeok.domActions.ophalenFeestdagen();
    myeok.domActions.setDteStyle('.customDatepicker');
}
