$(document).ready(function () {
    var navFlag = 0;
    //顶部导航控制按钮
    $(".ry-nav-btn").on("click",function () {
        if(navFlag == 0){
            $(".ry-nav-btn").addClass("active");
            $(".ry-nav-menu").addClass("active");
            $("body").css("overflow","hidden");
            navFlag = 1;
        }else {
            $(".ry-nav-btn").removeClass("active");
            $(".ry-nav-menu").removeClass("active");
            $("body").css("overflow","auto");
            navFlag = 0;
        }
    })
    //顶部导航控制菜单
    $(".ry-nav-menu li").on("click",function () {
        $(".ry-nav-btn").removeClass("active");
        $(".ry-nav-menu").removeClass("active");
        $("body").css("overflow","auto");
        navFlag = 0;
    });
    $(".ry-nav-menu").on("click",function () {
        $(".ry-nav-btn").removeClass("active");
        $(".ry-nav-menu").removeClass("active");
        $("body").css("overflow","auto");
        navFlag = 0;
    });

    //底部导航控制
    $(".list_dt").on("click",function () {
        $('.list_dt .list_dd').stop();
        $(this).siblings("dt").removeAttr("id");
        if($(this).attr("id")=="open"){
            $(this).removeAttr("id").siblings("dd").slideUp();
        }else{
            $(this).attr("id","open").next().slideDown().siblings("dd").slideUp();
        }
    });

    //首页
    //变美攻略部位展示控制
    $(".ry-hot-ot .ry-hot-d-1").on("click",function () {
        $(".ry-flow-qa-ot").show();
        $("body").css("overflow","hidden");
    })
    $(".ry-flow-qa-btn li").on("click",function () {
        var thisIndex = $(".ry-flow-qa-btn li").index(this);
        $(".ry-flow-qa-btn li").removeClass("active");
        $(".ry-flow-qa-btn li").eq(thisIndex).addClass("active");
        $(".ry-hot-ot .ry-hot-list").removeClass("active");
        $(".ry-hot-ot .ry-hot-list").eq(thisIndex).addClass("active");
    })
    $(".ry-flow-qa-box").on('click',function(ev){
        $('.ry-flow-qa-ot').css('display','none');
        $("body").css("overflow","auto");
        ev.stopPropagation();
    });
    // //招聘信息
    // $(".list_dt-zp").on("click",function () {
    //     $('.list_dt-zp .list_dd').stop();
    //     $(this).siblings("dt").removeAttr("id");
    //     if($(this).attr("id")=="open2"){
    //         $(this).removeAttr("id").siblings("dd").slideUp();
    //     }else{
    //         $(this).attr("id","open2").next().slideDown().siblings("dd").slideUp();
    //     }
    // });
})