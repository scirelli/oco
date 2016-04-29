$(document).ready(function(){
    var bigChart = $('#panel-chartjs-1'),
        bigHead  = $('.panel-heading', bigChart),
        bigHeadPadding  = parseInt(bigHead.css('padding-top')) + parseInt(bigHead.css('padding-bottom')),
        bigContent = $('.panel-body', bigChart),
        bigContentPadding = parseInt(bigContent.css('padding-top')) + parseInt(bigContent.css('padding-bottom')),
        bigFoot  = $('.panel-footer', bigChart),
        bigFootPadding  = parseInt(bigFoot.css('padding-top')) + parseInt(bigFoot.css('padding-bottom')),
        $window     = $(window),
        contentPadding = parseInt($('#content').css('padding-top')),
        bigContentHeight = $window.height() - bigHead.height() - bigHeadPadding - bigFoot.height() - bigFootPadding - contentPadding - bigContentPadding;

    bigContent.height(bigContentHeight);

    $('.panel-small').each(function(){
        var me = $(this),
            myMargin = parseInt(me.css('margin-bottom')),
            myBody = $('.panel-body', me),
            myHead = $('.panel-heading', me),
            myFeet = $('.panel-footer', me),
            myBodyPadding = parseInt(myBody.css('padding-top')) + parseInt(myBody.css('padding-bottom')),
            myFeetPadding = parseInt(myFeet.css('padding-top')) + parseInt(myFeet.css('padding-bottom')),
            myHeadPadding = parseInt(myHead.css('padding-top')) + parseInt(myHead.css('padding-bottom')); 
        
        myBody.height(($window.height()/2) - myBodyPadding - myFeetPadding - myHeadPadding - myMargin - contentPadding - myHead.height() - myFeet.height() - 1); 
    });

    $('.panel-body').each(function(){
        var body = $(this);
        
        $('iframe', body).each(function(){
            var iframe = $(this);
            iframe.height(body.height())
                  .width(body.width());
        });
    });
});
