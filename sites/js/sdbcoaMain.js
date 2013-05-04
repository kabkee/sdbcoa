var app = {
    prevSrvStatus: '',
    srvStatus: '',

    getPrevStatus: function(){
        return this.prevSrvStatus;
    },
    getStatus: function(){
        return this.srvStatus;
    },
    setPrevStatus: function(status){
        this.prevSrvStatus = status;
    },
    setStatus: function(status){
        this.srvStatus = status;
    }
};
var appConnect = {

    GetStatus: function(){
        var result;
        $.get('/status', function(data){
            if(data.status != "on"){
                result = true;
            }else if(data.status != "off"){
                result = false;
            }
            return result;
        });
    }
};
var appAlert ={

//    잠시 서버가 중단 되었습니다. 장기간 지속될 경우, 담당자에게 연락하세요. alert-error
//    서버가 다시 살아났습니다~ :) alert-success
};

$(document).ready(function() {
    var $window = $(window);
    var $alert = $('.alert');
    var $divAlert = $('#divAlert');
    function showAlertFnc(statusOn){
        if(statusOn == false){
            var $divAlert_span = $('#divAlert_span');
            $divAlert_span.css({"marginLeft": 20+"px", "top": $divAlert.height() + "px"})
                .text("잠시 서버가 중단 되었습니다. 장기간 지속될 경우, 담당자에게 연락하세요.");
            $divAlert.addClass("alert-error").show("fast");
        }else{
            $divAlert.hide();
        }
    }

    $window.scroll(function() {
        var position = $window.scrollTop();
        $divAlert.css({"top": ( $divAlert.height()) + "px"});
    });

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
    function showMenu(MenuNameWannaShow){
        MenuNameWannaShow.show("fast");
        for(var i=0; i<menuBtnList.length; i++){
            if(MenuNameWannaShow != menuBtnList[i]){
                menuBtnList[i].hide("fast");
            }
        }
    }
    showAlertFnc(appConnect.GetStatus());
//    showAlertFnc(false);

    //Gen Hide - rolling loading image
    $Gen.hide();
    //loginContainer Hide
    $loginContainer.hide();
    //alert Hide
//    $alert.hide();
    // first show menu is $lotRequest
    showMenu($lotRequest);

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


    var $inputCatNo = $('#inputCatNo');
    var $inputLotNo = $('#inputLotNo');
    var $inputMFGDate = $('#inputMFGDate');
    var $inputExpDate = $('#inputExpDate');

    // Lot MNG Search click.
    var $btnSearchLot = $('#btnSearchLot');
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
    var $btnStore = $('#btnStore');
    var $previewDiv = $('#previewDiv');
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
//    setInterval(function(){
//        app.setPrevStatus(app.getStatus());
//
//        $.get('/status', function(data){
//            if(data.status != "on"){
//                $srvOffAlert.show();
//                app.srvStatus = data.status;
//                setTimeout(function(){
//                    $srvOffAlert.hide();
//                },3000);
//            }else{
//                if(app.prevSrvStatus == "off"){
//                    $srvBackAlert.show();
//                    setTimeout(function(){
//                        $srvBackAlert.hide();
//                    },3000);
//                }
//                app.srvStatus = data.status;
//            }
//        });
//    },5000);


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
