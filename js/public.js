$(function() {
    $('.head .wrap_father').hover(function() {
        var _this = $(this);
        if(!(_this.find('.link_father').html() == '首页')) {
            $('.head .box_bg').stop().fadeIn();
            _this.children('.sub').stop().fadeIn();
            // $('.head .box_bg').stop().fadeIn(function() {
            //     _this.children('.sub').stop().fadeIn();
            // });
        }
    }, function() {
        $(this).children('.sub').stop().fadeOut();
        $('.head .box_bg').stop().fadeOut();
        // $(this).children('.sub').stop().fadeOut(function() {
        //     $('.head .box_bg').stop().fadeOut();
        // });
    })
})