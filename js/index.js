$(function() {
    var switchs = 0;
    $('.fp-controlArrow').remove();
    $('.i_nav').hover(
        function(){
            $('.i_nav').addClass('hover');
        }, function(){
            if(!($('.i_nav').hasClass('click'))) {
                $('.i_nav').removeClass('hover');
            }
        }
    )
    $('.i_nav .wrap_icon').on('click', function(){
        if(switchs == 0) {
            $('.i_nav').removeClass('hover');
            $('.i_nav').addClass('click');
            $('.i_nav .menu_wrap').slideDown();
            switchs = 1;
        }
        else {
            $('.i_nav').removeClass('click');
            $('.i_nav').addClass('hover');
            $('.i_nav .menu_wrap').slideUp();
            switchs = 0;
        }
    });
    $('.i_next').on('click', function(){
        $.fn.fullpage.moveSectionDown();
    });
    $('.i_top').on('click', function(){
        $.fn.fullpage.moveSectionUp();
    });
    setInterval(function(){
        $.fn.fullpage.moveSlideRight();
    }, 5000);
});
// fullpage配置
$('#fullpage').fullpage({
    verticalCentered: false,
    navigation: false,
    scrollingSpeed: 1000,
    slidesNavigation: true,
    anchors: ['page1', 'page2', 'page3', 'page4'],
    afterLoad: function (anchorLink, index) {
        if (index == 1) {
            console.log('in' + 111)
        }
        else if (index == 2) {
            console.log('in' + 222)
        }
        else if (index == 3) {
            console.log('in' + 333)
        }
        else if (index == 4) {
            console.log('in' + 444)
        }
    },
    onLeave: function (index, nextIndex, direction) {
        if (index == 1) {
            console.log('out' + 111)
        }
        else if (index == 2) {
            console.log('out' + 222)
        }
        else if (index == 3) {
            console.log('out' + 333)
        }
        // if (index == 3 && nextIndex == 4) {
        //     $('.i_next').fadeOut();
        //     $('.i_top').fadeIn();
        // }
        // else {
        //     $('.i_top').fadeOut();
        //     $('.i_next').fadeIn();
        // }
    },
    afterSlideLoad: function (index, nextIndex, direction) {
        console.log('afterSlideLoad   ' + index);
        console.log('afterSlideLoad   ' + nextIndex);
        console.log('afterSlideLoad   ' + direction);
    }
});