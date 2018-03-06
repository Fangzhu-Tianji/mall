var index = {
    init: function() {
        var _this = this;
        _this.bindData();
        _this.bindEvent();
    },
    bindData: function() {
        console.log(navigation)
        var navigationH = template('navigationT', navigation);
        document.getElementById('navigation').innerHTML = navigationH;
    },
    bindEvent: function() {
        $('.i_nav_banner .wrap_out').hover(function() {
            $(this).children('.box_out').show().siblings('.wrap_out').children('.box_out').hide();
        },function() {
            $('.i_nav_banner .box_out').hide();
        });
        jQuery(".focusBox").slide({ mainCell:".pic",effect:"leftLoop", autoPlay:false, delayTime:300});
        jQuery(".douban").slide({ mainCell:".bd ul", effect:"left", delayTime:800,vis:5,scroll:5,pnLoop:false,trigger:"click",easing:"easeOutCubic" });
    }
}
$(function() {
    index.init();
})