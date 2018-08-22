/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var lUuid = "";
var model = "";
var devicePlatform = "";
var deviceID = "";
var deviceVersion = "";
var deviceManufacturer = "";
var isSim = "";
var serial = "";
var divMenuAfstand = "250px";
var divBottomMenuAfstand = "362px";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        console.log('Application Constructor');
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        lUuid = device.uuid;
        model = device.model;
        devicePlatform = device.platform;
        deviceID = device.uuid;
        deviceVersion = device.version;
        deviceManufacturer = device.manufacturer;
        isSim = device.isVirtual;
        serial = device.serial;
        console.log('Bind Event Listeners');
        console.log(device.cordova);
        console.log(lUuid);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log('deviceready Event Handler');
        console.log(device.model);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
        console.log('Update DOM on a Received Event');
    }
};

function optionExists ( needle, haystack )
{
    console.log('optionExists');
    var optionExists = false,
        optionsLength = haystack.length;

    while ( optionsLength-- )
    {
        if (haystack.options[optionsLength].value === needle)
        {
            optionExists = true;
            break;
        }
    }
    return optionExists;
}

var naamGebouw = {};
naamGebouw['PaS'] = 'pas';
naamGebouw['Coveliersgebouw'] = 'cov';
naamGebouw['Lozanagebouw'] = 'loz';
naamGebouw['Parkhuis'] = 'park';
naamGebouw['Provinciehuis'] = 'ph';

var dictGebouwen = {};
dictGebouwen['pas'] = [[-100,'Alle verdiepingen'], [0,'Gelijkvloers'],[1,'1ste verdieping'], [2,'2de verdieping'], [3,'3de verdieping'], [4,'4de verdieping'], [5,'5de verdieping']];
dictGebouwen['loz'] = [[-100,'Alle verdiepingen'], [0,'Gelijkvloers'],[1,'1ste verdieping'], [2,'2de verdieping'], [3,'3de verdieping'], [4,'4de verdieping'], [5,'5de verdieping']];
dictGebouwen['cov'] = [[-100, 'Alle verdiepingen'], [0,'Gelijkvloers'], [1,'1ste verdieping'], [2, '2de verdieping'], [3, '3de verdieping'],[4, '4de verdieping']];
dictGebouwen['park'] = [[-100, 'Alle verdiepingen'], [0,'Gelijkvloers'], [1,'1ste verdieping'], [2, '2de verdieping'], [3, '3de verdieping']];
dictGebouwen['ph'] = [[-100, 'Alle verdiepingen'], [-1, 'Congresverdieping -1'], [0,'Gelijkvloers'], [1,'1ste verdieping'], [2, '2de verdieping'], [3, '3de verdieping'], [4, '4de verdieping'], [5, '5de verdieping'], [6, '6de verdieping'], [7 ,'7de verdieping'], [8 ,'8ste verdieping'], [9,'9de verdieping'], [10 ,'10de verdieping'], [11 ,'11de verdieping'], [12 ,'12de verdieping'], [13 ,'13de verdieping'], [14 ,'14de verdieping']];
dictGebouwen['al'] = [[-100, 'Alle verdiepingen'], [-1, 'Congresverdieping -1'], [0,'Gelijkvloers'], [1,'1ste verdieping'], [2, '2de verdieping'], [3, '3de verdieping'], [4, '4de verdieping'], [5, '5de verdieping'], [6, '6de verdieping'], [7 ,'7de verdieping'], [8 ,'8ste verdieping'], [9,'9de verdieping'], [10 ,'10de verdieping'], [11 ,'11de verdieping'], [12 ,'12de verdieping'], [13 ,'13de verdieping'], [14 ,'14de verdieping']];
var geselecteerdeVerdieping = -100;

function VeranderVerdiepingLijst() {
    var gebouwLijst = document.getElementById("myListGebouwen");
    var verdiepingLijst = document.getElementById("myListVerdiepingen");
    var selGebouw = gebouwLijst.options[gebouwLijst.selectedIndex].value;
    geselecteerdeVerdieping = verdiepingLijst.options[verdiepingLijst.selectedIndex].value;
    while (verdiepingLijst.options.length) {
        verdiepingLijst.remove(0);
    }
    var gebouwen = dictGebouwen[selGebouw];
    if (gebouwen) {
        var i;
        for (i = 0; i < gebouwen.length; i++) {
            var verdieping = new Option(gebouwen[i][1], gebouwen[i][0]);
            verdiepingLijst.options.add(verdieping);
        }
    }
	if (optionExists(geselecteerdeVerdieping, document.getElementById("myListVerdiepingen"))){
		verdiepingLijst.value = geselecteerdeVerdieping;
	}
	else {
		verdiepingLijst.value = -100;
	};
    VergaderingenTonen();
} 

function VerdiepingPlusMin(plus) {
    var verdiepingLijst = document.getElementById("myListVerdiepingen");
	var huidigeVerdieping = document.getElementById("myListVerdiepingen").selectedIndex;
	var nieuweVerdieping = huidigeVerdieping + plus;
	if (nieuweVerdieping>=0){
		if (nieuweVerdieping == verdiepingLijst.length){
			verdiepingLijst.selectedIndex = 0;
		}
		else {
			verdiepingLijst.selectedIndex = nieuweVerdieping;
		}
	}
	else {
		verdiepingLijst.selectedIndex = verdiepingLijst.length-1;
	};
    VergaderingenTonen();
}

function toggle_sidebar(div,richting,afstand){
	var sidebar = document.getElementById(div);
	if(richting == "left"){
        if(sidebar.style.left == "0px")
        {
            sidebar.style.left = afstand;
        }
        else
        {
            sidebar.style.left = "0px";
        };
    }
	else if(richting == "up"){
        if(sidebar.style.bottom == "0px")
        {
            sidebar.style.bottom = afstand;
        }
        else
        {
            sidebar.style.bottom = "0px";
        };
    }
    else if(richting == "right"){
        if(sidebar.style.right == "0px")
        {
            sidebar.style.right = afstand;
        }
        else
        {
            sidebar.style.right = "0px";
        };
    };
};

window.addEventListener('mouseup', function(event){
    var bottomMenu = document.getElementById('divBottomMenu');
    var divMenu = document.getElementById('divMenu');
    if (event.target != bottomMenu && event.target.parentNode != bottomMenu && event.target.parentNode.parentNode != bottomMenu && event.target.parentNode.parentNode.parentNode != bottomMenu){
        bottomMenu.style.right = '-300px';
    };
    if (event.target != divMenu && event.target.parentNode != divMenu && event.target.parentNode.parentNode != divMenu){
        divMenu.style.left = '-270px';
    };
});

function gebouwGewijzigd(){
	VeranderVerdiepingLijst();
};

var maanden = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];
var dagen = ["zondag","maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag"];
var nu = new Date();

function datumVergaderingen(datum){
    myRequire('http://server/ultresanonvar.php');
    if (datum == 'vandaag'){
        var d = nu;
    }
    else if (datum == ''){
        var d = nu;
    }
    else {
        var d = new Date(datum);
        nu = d;
/*        nuBegin = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate());
        nuEind = new Date(nu.getFullYear(), nu.getMonth(), nu.getDate()+1);*/
    }
    nieuw = new Date(d.getFullYear(), d.getMonth(), d.getDate()+3, d.getHours(), d.getMinutes(), d.getSeconds());
    d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate()+1, d.getHours(), d.getMinutes(), d.getSeconds());
    d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate()+2, d.getHours(), d.getMinutes(), d.getSeconds());
    d3 = new Date(d.getFullYear(), d.getMonth(), d.getDate()+3, d.getHours(), d.getMinutes(), d.getSeconds());
    document.getElementById("titelvergaderingen").innerHTML = '<option value = "0">' + d.getDate() + ' ' + maanden[d.getMonth()] + ' ' + d.getFullYear() + '</option>' + '<option value = "1">' + d1.getDate() + ' ' + maanden[d1.getMonth()] + ' ' + d1.getFullYear() + '</option>' + '<option value = "2">' + d2.getDate() + ' ' + maanden[d2.getMonth()] + ' ' + d2.getFullYear() + '</option>' + '<option value = "3">' + d3.getDate() + ' ' + maanden[d3.getMonth()] + ' ' + d3.getFullYear() + '</option>';
    verwerkVergaderingen();
}

function nextweek(){
    console.log('nextweek');
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    return nextweek;
}

function diff_minutes(dt2, dt1){
    var diff = (dt2.getTime() - dt1.getTime());
    diff = diff / 1000;
    diff = diff / 60;
    return Math.abs(Math.round(diff));
}

/*var jsonVergaderingenString = "";*/
/*var jsonVergaderingen = {};*/
var downloadTijd = new Date(2018, 6, 28, 14, 25, 0);
/*console.log('downloadTijd: ' + downloadTijd);*/
var vergaderingenSortLijst = [];
var vergaderingenHTML = "";
var lengteLijstVergaderingen = 0;
var Voorbij = nu - Date.parse(Einde);
var Begonnen = Date.parse(Start) - nu;
var Bezig = "";
var chkBezig = "";

function verwerkVergaderingen(){
    var today = new Date();
    var verschil = diff_minutes(today, downloadTijd);
    console.log('verschil: ' + verschil);
    var StartString = "";
    var EindeString = "";
    
    if (verschil > 15 ){
        console.log('groter');
    }
    else {
        console.log('kleiner');
    };


    var jsonVergaderingen = JSON.parse(jsonVergaderingenString);
    for (var i = 0; i < jsonVergaderingen.length; i++) {
        var Gebouw = jsonVergaderingen[i]["properties"][0]["value"];
        Gebouw = String(Gebouw);
        Gebouw = Gebouw.replace(" (achter)","");
        var Verdieping = jsonVergaderingen[i]["properties"][1]["value"];
        var Zaal = jsonVergaderingen[i]["properties"][2]["value"];
        Zaal = String(Zaal);
        Zaal = Zaal.replace(" (vergaderzaal PaS)","");
        Zaal = Zaal.replace(" (Vergaderzaal PaS)","");
        Zaal = Zaal.replace(" (vergaderzaal Coveliers)","");
        Zaal = Zaal.replace(" (Vergaderzaal Coveliers)","");
        Zaal = Zaal.replace("Zaal ","");
        Zaal = Zaal.replace(" (opleiding)","");
        var Start = jsonVergaderingen[i]["properties"][3]["value"];
        var Einde = jsonVergaderingen[i]["properties"][4]["value"];
        var Omschrijving = jsonVergaderingen[i]["properties"][5]["value"].slice(0, 10) + '...';
        var Context = jsonVergaderingen[i]["properties"][6]["value"];
        /*var Voorbij = nu - Date.parse(Einde);
        var Begonnen = Date.parse(Start) - nu;
        var Bezig = "";
        var chkBezig = "";*/
        if(Context == '67108864' || Context == '536870912'){
            Context = '1';
        }
        else if(Context == '268435456'){
            Context = '2';
        }
        else if(Context == '1073741824'){
            Context = '3';
        };
        /*if(Begonnen > 0){
            Bezig = 'green';
            chkBezig = '1';
        }
        else{
            if(Voorbij > 0){
                Bezig = 'grey';
                chkBezig = '0';
            }
            else{
                Bezig = 'red';
                chkBezig = '1';
            }
        }*/
        checkVoorbij(Start,Einde);
        StartString = Datums(datumsvergelijken(Start,Einde),Start,'start');
        EindeString = Datums(datumsvergelijken(Start,Einde),Einde,'einde');
        vergaderingenSortLijst[i] = [Gebouw, Verdieping, Zaal, StartString, EindeString, Omschrijving, Context, Bezig, Start, chkBezig, Einde];
        
        lengteLijstVergaderingen = i;
    };
    vergaderingenSortLijst.sort(function(a,b) {
        return a[8]<b[8] ? -1 : a[8]>b[8] ? 1 : 0;
    });
    VergaderingenTonen();
};

function VergaderingenTonen(){
    document.getElementById("lijstvergaderingen").innerHTML = "";
    vergaderingenHTML = "";
    for (var j = 0; j <= lengteLijstVergaderingen ; j++) {
        checkVoorbij(vergaderingenSortLijst[j][8],vergaderingenSortLijst[j][10]);
        vergaderingenSortLijst[j][7] = Bezig;
        vergaderingenSortLijst[j][9] = chkBezig;
        if (vergaderingZichtbaar(vergaderingenSortLijst[j][0],vergaderingenSortLijst[j][1],vergaderingenSortLijst[j][9],vergaderingenSortLijst[j][6],vergaderingenSortLijst[j][8],vergaderingenSortLijst[j][10])){
            vergaderingenHTML =  vergaderingenHTML + '<li style="border-left-color:' + vergaderingenSortLijst[j][7] + ';">Zaal ' +vergaderingenSortLijst[j][2] + ', verdieping ' + vergaderingenSortLijst[j][1] + ' ' + vergaderingenSortLijst[j][0] + '<br /><strong>' + vergaderingenSortLijst[j][5] + '</strong><br /><i>' + vergaderingenSortLijst[j][3] + ' ' + vergaderingenSortLijst[j][4] + '</i></li>';
        }
        document.getElementById("lijstvergaderingen").innerHTML = vergaderingenHTML;
    };
    if(vergaderingenHTML == ''){
        document.getElementById("lijstvergaderingen").innerHTML = '<li><i>Geen reserveringen te tonen</i></li>';
    };

};

function datumsvergelijken(datum1,datum2){
    var datumeen = Date.parse(datum1);
    var datumtwee = Date.parse(datum2);
    var d1 = new Date(datumeen);
    var n1 = new Date(d1.getUTCFullYear(),d1.getUTCMonth(),d1.getUTCDate());
    var d2 = new Date(datumtwee);
    var n2 = new Date(d2.getUTCFullYear(),d2.getUTCMonth(),d2.getUTCDate());
    if (n1.toString() === n2.toString()){
        return 'uur';
    }
    else {
        return 'dag';
    }
};

function Datums(lengte,datum,positie){
    var string = "";
    datum = Date.parse(datum);
    var d11 = new Date(datum);
    var dag = dagen[d11.getDay()] + ' ' + d11.getDate() + '/' + (d11.getMonth()+1);
    var uur1 = d11.getHours() + ':' + ('0' + d11.getMinutes()).slice(-2, 3);
    if (datum != ''){
        if (lengte == 'dag'){
            if (positie == 'start'){
                string = 'van ' + dag + ' ' + uur1 + ' u.';
            }
            else if (positie == 'einde'){
                string = 'tot ' + dag + ' ' + uur1 + ' u.';
            }
        }
        else if (lengte == 'uur'){
            if (positie == 'start'){
                string = dag + ' van ' + uur1 + ' u.';
            }
            else if (positie == 'einde'){
                string = 'tot ' + uur1 + ' u.';
            }
        };
        return string;
    }
    else {
        return ''
    };
};

function vergaderingZichtbaar(rGebouw,rVerdieping,rAfgelopen,rTypeZaal,rStart,rEinde){
    var kBegin = new Date(nu.getFullYear(),nu.getMonth(),nu.getDate()*1 + document.getElementById('titelvergaderingen').value*1);
    var kEind = new Date(nu.getFullYear(),nu.getMonth(),nu.getDate()*1 + document.getElementById('titelvergaderingen').value*1+1);
    rStart = Date.parse(rStart);
    rEinde = Date.parse(rEinde);
    var kGebouw = document.getElementById('myListGebouwen').value;
    var kVerdieping = document.getElementById('myListVerdiepingen').value;
    var kAfgelopen = document.getElementById('chkAfgelopen').checked;
    var kVergader = document.getElementById('chkVergader').checked;
    var kOverleg = document.getElementById('chkOverleg').checked;
    var kLes = document.getElementById('chkLes').checked;
    var kProject = document.getElementById('chkProject').checked;
    var kTypeZaal = '';
    if (rVerdieping != null){
        if(rStart > kEind){
            return false;
        };
        if(rEinde < kBegin){
            return false;
        };
        if (kGebouw != 'al'){
            if (kGebouw != naamGebouw[rGebouw]){
                return false;
            };
        };
        if (kVerdieping != '-100'){
            if (kVerdieping != rVerdieping){
                return false;
            }
        };
        if (rAfgelopen == '0'){
            if (kAfgelopen != true){
                return false;
            };
        };
        if(kVergader == true && rTypeZaal == '1'){
            return true;
        }
        else if(kLes == true && rTypeZaal == '2'){
            return true;
        }
        else if(kOverleg == true && rTypeZaal == '3'){
            return true;
        }
        else if(kProject == true && rTypeZaal == '4'){
            return true;
        }
        else{
            return false;
        };
    }
}

function checkboxes(){
    /*console.log('Afgelopen: ' + document.getElementById("chkAfgelopen").checked);
    console.log('Vergaderzalen: ' + document.getElementById("chkVergader").checked);
    console.log('Overleglokalen: ' + document.getElementById("chkOverleg").checked);
    console.log('Leslokalen: ' + document.getElementById("chkLes").checked);
    console.log('Projectlokalen: ' + document.getElementById("chkProject").checked);*/
    VergaderingenTonen();
};

function checkVoorbij(Start,Einde){
    Begonnen = Date.parse(Start) - new Date();
    Voorbij = new Date() - Date.parse(Einde);
    if(Begonnen > 0){
        Bezig = 'green';
        chkBezig = '1';
    }
    else{
        if(Voorbij > 0){
            Bezig = 'grey';
            chkBezig = '0';
        }
        else{
            Bezig = 'red';
            chkBezig = '1';
        }
    }
};

function infoToestel(){
    console.log(lUuid);
    console.log('model: ' + model + ', platform: ' + devicePlatform + ', uuid: ' + deviceID + ', versie: ' + deviceVersion +', manufacturer: ' + deviceManufacturer + ', virtueel: ' + isSim + ', serienummer: '+ serial);
};

function myRequire( url ) {
    var ajax = new XMLHttpRequest();
    ajax.open( 'GET', url, false ); // <-- the 'false' makes it synchronous
    ajax.onreadystatechange = function () {
        var script = ajax.response || ajax.responseText;
        if (ajax.readyState === 4) {
            switch( ajax.status) {
                case 200:
                    eval.apply( window, [script] );
                    console.log("script loaded: ", url);
                    break;
                default:
                    console.log("ERROR: script not loaded: ", url);
            }
        }
    };
    ajax.send(null);
}