$(document).ready(function() {
    var $loginContainer = $('#loginContainer');
    var $mngContainer = $('#mngContainer');
    var $main = $('#main');
    var $dataMng = $('#dataMng');
    var $coaMng = $('#coaMng');
    var $Gen = $('#Gen');
    var $lotResult = $('#lotResult');

    //Gen Hide
    $Gen.hide();
    //loginContainer Hide
    $loginContainer.hide();

    var $aHome = $('#aHome');
    var $aDataMng = $('#aDataMng');
    var $aCoaMng = $('#aCoaMng');

//    $main.show();
    $main.hide();
    $dataMng.show();
//    $dataMng.hide();
//    $coaMng.show();
    $coaMng.hide();

    $aHome.click( function(e){
        $main.show("fast");
        $dataMng.hide("fast");
        $coaMng.hide("fast");
        e.preventDefault();
    });
    $aDataMng.click( function(e){
        $main.hide("fast");
        $dataMng.show("fast");
        $coaMng.hide("fast");
        e.preventDefault();
    });
    $aCoaMng.click( function(e){
        $main.hide("fast");
        $dataMng.hide("fast");
        $coaMng.show("fast");
        e.preventDefault();
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




//
//    inputMFGDate
//
//
//    btnAddLot
//
//    $.getJSON('/hi', function(data){
//        $('body').append( data );
//    });



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
