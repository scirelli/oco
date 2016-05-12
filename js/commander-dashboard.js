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
            myFeetPadding = 0;//parseInt(myFeet.css('padding-top')) + parseInt(myFeet.css('padding-bottom')),
            myHeadPadding = parseInt(myHead.css('padding-top')) + parseInt(myHead.css('padding-bottom')); 
        
        myBody.height(($window.height()/2) - myBodyPadding - myFeetPadding - myHeadPadding - myMargin - contentPadding - myHead.height() - myFeet.height() - 1); 
    });

    $('.panel-tall').each(function(){
        var me = $(this),
            myMargin = parseInt(me.css('margin-bottom')),
            myBody = $('.panel-body', me),
            myHead = $('.panel-heading', me),
            myFeet = $('.panel-footer', me),
            myBodyPadding = parseInt(myBody.css('padding-top')) + parseInt(myBody.css('padding-bottom')),
            myFeetPadding = 0;//parseInt(myFeet.css('padding-top')) + parseInt(myFeet.css('padding-bottom')),
            myHeadPadding = parseInt(myHead.css('padding-top')) + parseInt(myHead.css('padding-bottom')),
            bfh = myBodyPadding + myFeetPadding + myHeadPadding + myHead.height(),
            cellMargin = 10; 
        
        myBody.height((($window.height()/2) - myBodyPadding - myFeetPadding - myHeadPadding - myMargin - contentPadding - myHead.height() - myFeet.height() - 1)*2 + bfh + cellMargin); 
    });
    
    $('a.panel_info').click(function(e){
        e.preventDefault();
        var panel = $(this).closest('div.panel'),
            flipBox = $('.box-flip', panel);
        flipBox.toggleClass('flip');
        return false;
    });
    
    function resizeFrames(){
        $('.panel-body').each(function(){
            var body = $(this);
            
            $('iframe, .box2, .box1', body).each(function(){
                var iframe = $(this);
                iframe.height(body.height())
                      .width(body.width());
            });
        });
    }
    resizeFrames();

    $(window).resize(function(e){
        resizeFrames();
    });

    $('#middle div.panel ul.options>li>a.panel_fullscreen').bind("click", function(e) {
        e.preventDefault();
        var panel = $(this).closest('div.panel'),
            panelHead = $('.panel-heading', panel),
            panelBody = $('.panel-body', panel),
            iframe = $('iframe', panelBody);


        if(panel.hasClass('fullscreen')) {
            iframe.height(panelBody.height()-panelHead.height() - parseInt(panelHead.css('padding'))*2).width(panelBody.width())
        } else {
            iframe.height(panelBody.height()).width(panelBody.width())
        }
    });

    $('#timeMenu li a').click(function(e){
        var anchor           = $(this),
            selectedTime     = anchor.attr('href').replace('#', ''),
            currentTimeFrame = $('#currentTimeFrame'),
            kabanaFrames     = $('iframe[data-kabana]');

        currentTimeFrame.text(anchor.text());

        kabanaFrames.each(function(index, item){
            var url = item.src,
                newURL = url.replace(new RegExp('time:\\(from:now-(?:.{2}),'), 'time:(from:now-' + selectedTime + ',');
            item.src = newURL;
        });
    });
    
    (function(){
        var timeoutId = null,
            inputField = $('#search');

        inputField.on('keypress change blur', function(e){
            window.clearTimeout(timeoutId);
            timeoutId = setTimeout(function(){
                var kabanaFrames = $('iframe[data-kabana]');

                //Really bad way to do this.
                kabanaFrames.each(function(index, item){
                    var regex  = /query_string:\(analyze_wildcard:!t,query:'(?:.*)'\)/,
                        query = window.encodeURI(inputField.val()) || '*',
                        replaceWith = 'query_string:(analyze_wildcard:!t,query:\'' + query + '\')',
                        url = item.src,
                        newURL = url.replace(regex, replaceWith);
                    item.src = newURL;
                });
            }, 500);
        });
    })();
});
