var $window = $(window);
var $alert = $('.alert');
var $divAlert = $('#divAlert');

var $loginContainer = $('#loginContainer');
var $mngContainer = $('#mngContainer');
var $main = $('#main');
var $dataMng = $('#dataMng');
var $coaMng = $('#coaMng');
var $Gen = $('#Gen');
var $lotResult = $('#lotResult');
var $lotRequest = $('#lotRequest');
var $aboutUs = $('#aboutUs');

var $aHome = $('#aHome');
var $aDataMng = $('#aDataMng');
var $aCoaMng = $('#aCoaMng');
var $aLotRequest = $('#aLotRequest');
var $aAboutUs = $('#aAboutUs');

var menuBtnList = [$main, $dataMng, $coaMng, $lotRequest, $aboutUs];

var $inputCatNo = $('#inputCatNo');
var $inputLotNo = $('#inputLotNo');
var $inputMFGDate = $('#inputMFGDate');
var $inputExpDate = $('#inputExpDate');

// Lot MNG Search click.
var $btnSearchLot = $('#btnSearchLot');

var $btnStore = $('#btnStore');
var $previewDiv = $('#previewDiv');
var $lotRequestQueNew = $('#lotRequestQueNew');
var $lotRequestQue = $('#lotRequestQue');

var $BtnLotRequestSaveWT = $('#BtnLotRequestSaveWT');
var $BtnLotRequestEditWT = $('#BtnLotRequestEditWT');
var $BtnLotRequestSaveDN = $('#BtnLotRequestSaveDN');
var $BtnLotRequestEditDN = $('#BtnLotRequestEditDN');
var $lotRequestQueAddLot = $('#lotRequestQueAddLot');
var $lotRequestQueAddExp = $('#lotRequestQueAddExp');
var $lotRequestQueAddMfg = $('#lotRequestQueAddMfg');

var app = {
    srvStatus: false,
    reLive : false,
    getStatus: function(){
        return this.srvStatus;
    },
    setStatus: function(status){
        this.srvStatus = status;
    },
    getReLive: function(){
        return this.srvStatus;
    },
    setReLive: function(status){
        this.srvStatus = status;
    }
};
var appConnect = {
    GetLotRequest: function(){

    },
    GetStatus: function(){
        var result;
        $.get('/status', function(data){
            if(data.status == true){
                if(app.getStatus()==false){
                    app.setReLive(true);
                }else{
                    app.setReLive(false);
                }
                result = true;
            }else if(data.status == false){
                result = false;
            }
            app.setStatus(data.status);
            return result;
        });
    }
};

var testLotRequest = [ { lot : "c01234567", expDate: "2013-10-01", mfgDate: "2011-01-01", new: false},
    { lot : "c01234568", expDate: "2013-10-02", mfgDate: "2011-01-02", new: false},
    { lot : "c01234569", expDate: "2013-10-03", mfgDate: "2011-01-03", new: true},
    { lot : "c01234570", expDate: "2013-10-04", mfgDate: "2011-01-04", new: false},
    { lot : "c01234571", expDate: "2013-10-05", mfgDate: "2011-01-05", new: true} ];

function makeListOfLotRequest(data){
    if(data){
        var listItemNew = "<ul class ='selectable'>";
        var listItem = "<ul class ='selectable'>";
        for(var i=0; i<data.length; i++){
            var eachItem = data[i];
            var tempItem = "<li class='ui-widget-content'>"+
                "<input type='text' disabled value="+ eachItem.lot + ">" +
                "<input type='date' disabled value="+ eachItem.expDate + ">" +
                "<input type='date' disabled value="+ eachItem.mfgDate + ">" +
                "</li>";

            if(eachItem.new == true){
                listItemNew += tempItem;
            }else{
                listItem += tempItem;
            }
        }
        listItemNew += "</ul>";
        listItem += "</ul>";

        $lotRequestQueNew.html(listItemNew);
        $lotRequestQue.html(listItem);
        $('.selectable').selectable();
    }else{
        $lotRequestQueNew.html("<h1>자료가 없습니다.</h1>");
        $lotRequestQue.html("<h1>자료가 없습니다.</h1>");
    }
}


function showAlertFnc(statusOn){
    if(statusOn == false){
        var $divAlert_span = $('#divAlert_span');
        $divAlert_span.css({"marginLeft": 20+"px", "top": $divAlert.height() + "px"})
            .text("잠시 서버가 중단 되었습니다. 장기간 지속될 경우, 담당자에게 연락하세요.");
        $divAlert.addClass("alert-error").show("fast");
    }else{
        // WHAT IF RE-LIVE IS TRUE;
        if(app.getReLive() == true){
            $divAlert_span.css({"marginLeft": 20+"px", "top": $divAlert.height() + "px"})
                .text("서버가 다시 살아났습니다~  :) 이힛.");
            $divAlert.addClass("alert-info").show("fast");
        }
        setTimeout(function(){
            $divAlert.hide();
        },3000);
    }
}
function showMenu(MenuNameWannaShow){
    MenuNameWannaShow.show("fast");
    for(var i=0; i<menuBtnList.length; i++){
        if(MenuNameWannaShow != menuBtnList[i]){
            menuBtnList[i].hide("fast");
        }
    }
}
function firstLoading(){

    showAlertFnc(appConnect.GetStatus());
//    showAlertFnc(false);

    //Gen Hide - rolling loading image
    $Gen.hide();

    //loginContainer Hide
    $loginContainer.hide();
    $alert.hide();

    // first show menu is $lotRequest
    showMenu($lotRequest);

    makeListOfLotRequest(testLotRequest);
}
function addLotRequestNew(){
    if( $lotRequestQueAddLot.val() && $lotRequestQueAddLot.val() && $lotRequestQueAddLot.val() ){
        testLotRequest.push( {lot : $lotRequestQueAddLot.val(), expDate: $lotRequestQueAddExp.val(),
            mfgDate: $lotRequestQueAddMfg.val(), new: true } );
    }
    makeListOfLotRequest(testLotRequest);
}

$(document).ready(function() {

    firstLoading();

    // Clicking Menu, change screen
    $aHome.click( function(){
        showMenu($main);
    });
    $aDataMng.click( function(){
        showMenu($dataMng);
    });
    $aCoaMng.click( function(){
        showMenu($coaMng);
    });
    $aLotRequest.click( function(){
        showMenu($lotRequest);
    });
    $aAboutUs.click( function(){
        showMenu($aboutUs);
    });

    $BtnLotRequestSaveWT.on('click',function(e){
        console.log('123');
//        console.log(e.parent('li').index());
    });
    $BtnLotRequestSave.on('click',function(e){

    });
    BtnLotRequestEditADD.on('click', function(e){
        addLotRequestNew();
        console.log("new lotrequest added")
    });



    $btnSearchLot.on('click', function(e){
        $Gen.show();
        $.post('/lots/search',{catNo: $inputCatNo.val(), lotNo: $inputLotNo.val(), mfgDate: $inputMFGDate.val()
            , expDate: $inputExpDate.val() }, function(data){
                $lotResult.append(data+'<br>');
                console.log('Success searching Lots information');
            }, 'json').done(function(){
                $Gen.hide();
            });
        e.preventDefault();
    });

    $btnStore.on('click', function(e){
        $Gen.show();
        $.post('/lots/search',{catNo: $inputCatNo.val(), lotNo: $inputLotNo.val(), mfgDate: $inputMFGDate.val()
            , expDate: $inputExpDate.val() }, function(data){
            $previewDiv.append(data+'<br>');
            console.log('Success searching Lots information');
        }, 'json').done(function(){
                $Gen.hide();
            });
        e.preventDefault();
    });


    $window.scroll(function() {
//        var position = $window.scrollTop();
        $divAlert.css({"top": ( $divAlert.height()) + "px"});
    });
});









//    var pdf = new jsPDF();


//    pdf.text(20, 20, 'Hello world!');
//    pdf.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
//    pdf.addPage();
//    pdf.text(20, 20, 'Do you like that?');
//    var pdfSource = $('#previewDiv').get(0);
//    var specialElementHandlers = {
//        // element with id of "bypass" - jQuery style selector
//        '#bypassme': function(element, renderer){
//            // true = "handled elsewhere, bypass text extraction"
//            return true
//        }
//    };
//
//    pdf.fromHTML(
//        pdfSource // HTML string or DOM elem ref.
//        , 0.5 // x coord
//        , 0.5 // y coord
//        , {
//            'width':7.5 // max width of content on PDF
//            , 'elementHandlers': specialElementHandlers
//        }
//    );

//        pdf.save('Test.pdf');

//        pdf.output('dataurlnewwindow');

//    var string = pdf.output('datauristring');
//
//    $('#previewIframe').attr('src', string);
