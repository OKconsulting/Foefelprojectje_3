"use strict";

var dataSource = {

    getVersionInfo: function() {
        return this.createAjaxReq(url + 'api/User/getVersionInfo/?apiVersion=' + myeok.APIVersion, "GET");
    },

    /**
     * @desc Gets the saldi for the employee.
     * @param {*} mdwID The employee id.
     * @param {*} year The year.
     * @param {*} language The language.
     */
    getSaldi: function (mdwID, year, language) {
        return this.createAjaxReq(url + 'api/Medewerker/GetVerlofSaldo/?mwId=' + mdwID + '&jaar=' + year + '&taal=' + language, 'GET');
    },


    getHistory: function (mdwID, jaar, taal) {
        return this.createAjaxReq(url + 'api/Medewerker/GetHistoriek/?mwId=' + mdwID + '&jaar=' + jaar + '&status=1,2,3,4' + '&taal=' + taal, 'GET');
    },


    getColors: function (mdwID, year, taal) {
        return this.createAjaxReq(url + 'api/Medewerker/GetRPTKleuren/?mdwId=' + mdwID + '&iJaar=' + year + '&sTaal=' + taal, 'GET');
    },


    getNationalHolidays: function (mdwID, year, taal) {
        return this.createAjaxReq(url + 'api/Medewerker/GetFeestdagen/?mwId=' + mdwID + '&jaar=' + year + '&sTaal=' + taal, 'GET');
    },

    getDays: function (mdwID, startDay, endDay, taal) {
        return this.createAjaxReq(url + 'api/VerlofAanvragen/GetRequestedDagen/?mwId=' + mdwID + '&startdag=' + startDay + '&einddag=' + endDay + '&sTaal=' + taal, 'GET');
    },


    confirmHolidays: function (data) {
        return this.createAjaxReq(url + 'api/VerlofAanvragen/VerlofBevestigen/', 'POST', data);
    },


    getHolidayDetail: function (mdwID, approvalID, requestID, mdwIDAanvr, functieID, afdID, startTijd, eindTijd, taal) {
        return this.createAjaxReq(url + 'api/VerlofBehandelen/getAanvraagDetail/?miMdwID=' + mdwID + '&goedkeuringID=' + approvalID + '&aanvraagID=' + requestID + '&mdwID=' + mdwIDAanvr + '&functieID=' + functieID + '&afdelingID=' + afdID + '&sStart=' + startTijd + '&sEind=' + eindTijd + '&sTaal=' + taal, 'GET');
    },

    getRequestsForLGHR: function (mdwID, taal) {
        return this.createAjaxReq(url + 'api/VerlofBehandelen/getAanvragenVoorLGHR/?miMdwID=' + mdwID + '&sTaal=' + taal, 'GET');
    },

    changeApproval: function (mdwID, approvalID, requestID, reden, mdwIDAanvr, start, end, taal, approved) {
        return this.createAjaxReq(url + 'api/VerlofBehandelen/behandelingVerwerker/?miMdwID=' + mdwID + '&goedkeuringID=' + approvalID + '&aanvraagID=' + requestID + '&reden=' + reden + '&mdwID=' + mdwIDAanvr + '&sStart=' + start + '&sEind=' + end + '&sTaal=' + taal + '&goedgekeurd=' + approved, 'POST');
    },

    approveInBatch: function (mdwID, taal, requests) {
        return this.createAjaxReq(url + 'api/VerlofBehandelen/batchGoedkeuren/?miMdwID=' + mdwID + '&sTaal=' + taal, 'POST', requests);
    },

    getTranslations: function () {
        return $.ajax({
            url: (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) ? (url + 'xml/TekstenClient.xml') : 'xml/TekstenClient.xml'
        });
    },

    /*
    * @desc Login a user via username and password.
    */
    login: function(username, password, redirectTo) {
        console.log('login');
        var user = {
            UserName: username,
            Paswoord: password,
            MedewerkerID: 0, 
            Role: ''
        };

       return $.ajax({
            url: url + 'api/user/Login?apiVersion=' + myeok.APIVersion,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(user),
            success: function (data, status, xhr) {
                // Store username and password in localstorage, TODO: support token
                localStorage.setItem("myUser", username);
                localStorage.setItem("myKey", password);

                // Get the proxy header value
                var cookiesStr = xhr.getResponseHeader('set-cookie-proxy');
                if (cookiesStr) {
                    // Process the cookies
                    var parsedCookies = [];
                    var cookies = cookiesStr.split(",");
                    cookies.forEach(function (cookie) {
                        var parsedCookie = {
                            data: {}
                        };

                        cookie.split(";").map(function (keyvalues, i) {
                            var keyvalue = keyvalues.split('=');
                            if (i == 0) {
                                parsedCookie.Name = keyvalue[0];
                            }

                            parsedCookie.data[keyvalue[0]] = keyvalue[1];
                        });

                        parsedCookies.push(parsedCookie);
                    });

                    // Store the cookies in local storage.
                    parsedCookies.forEach(function (cookie) {
                        localStorage.setItem(cookie.Name, JSON.stringify(cookie.data));
                    });
                }

                // Store user related data, TODO: delete mdwID, server should figure that out for itself.
                window.localStorage.setItem("miRol", data.split('@#@')[1])
                window.localStorage.setItem("mdwID", data.split('@#@')[0]);
                if (redirectTo) {
                    window.location.href = redirectTo;
                }
            }
        });
    },

    /*
    * @desc Create a new ajax request.
    */
    createAjaxReq: function (reqUrl, type, data, dontRetry) {
        var self = this;
        var auth = localStorage.getItem("FedAuth");
        var value = JSON.parse(auth);
        if (value) {
            document.cookie = "FedAuth=" + value.FedAuth + ";";
        }

        var request = $.ajax({
            url: reqUrl,
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            type: type,
            contentType: 'application/json; charset=utf-8',
            data: typeof(data) == "undefined" ? null : JSON.stringify(data)
        });

        request.success(function (data) {
            if (data && data.indexOf("<html>") > -1) {
                return self.handleError(data, !dontRetry, reqUrl, type, data);
            }
        })

        request.error(function (data) { self.handleError(data, !dontRetry, reqUrl, type, data); });

        return request;
    },

    handleError: function (resp, retry) {
        console.log("Error occured: ");
        console.log(resp);

        var user = localStorage.getItem("myUser");
        var pass = localStorage.getItem("myKey");
        if (user && pass) {
            return dataSource.login(user, pass).done(function (data) {
                if (retry) {
                    window.location.href = "Home.html#home";
                }
            });
        }
        
    }
}