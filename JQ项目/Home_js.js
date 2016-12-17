/**
 * Created by 小奇 on 2016/10/18.
 */
$(function () {
    /*轮播图*/
    var leg=1922;
    var length=$(".show_list li").length;
    var ul_leg=length*leg;
    var i=0;
    $(".show_list").css("width",ul_leg);
    var time=setInterval(function () {
        i++;
        if(i==length){
            $(".show_list").animate({"left":0});
            i=0;
        }
        $(".show_list02 li").eq(i).addClass("active").siblings().removeClass("active");
        $(".show_list").animate({"left":-leg*i})
    },3000);
    $(".show_list02 li").click(function () {
        clearInterval(time);
        var index=$(this).index();
        i=index;
        $(".show_list02 li").eq(i).addClass("active").siblings().removeClass("active");
        $(".show_list").animate({"left":-leg*index});
        time=setInterval(function () {
            i++;
            if(i==length){
                $(".show_list").animate({"left":0});
                i=0;
            }
            $(".show_list02 li").eq(i).addClass("active").siblings().removeClass("active");
            $(".show_list").animate({"left":-leg*i})
        },3000);
    });

    /*地址栏*/
    //1.获取城市数据
    $.get("json/tsconfig.json",function (data) {
        var province="";
        $.each(data,function (i,e) {//遍历省份
            var s_city="";
            if(e.city){
                $.each(e.city,function (ii,ee) {//遍历城市
                    s_city+="<li class="+"second_list_li"+">"+ee+"</li>"
                });
            }
            province+="<li class="+"first_list_li"+">"+e.id+"<ul class="+"second_list"+">"+s_city+"</ul></li>";
        });
        $("#location").append("<ul class="+"first_list"+">"+province+"</ul>");
        //城市显示与隐藏
        $(".first_list .first_list_li").toggle(function () {
            $(".area").text($(this).find("a").text());
            $(this).children(".second_list").show().end().siblings().children(".second_list").hide();
            $(this).find("span").removeClass("glyphicon glyphicon-chevron-right").addClass("glyphicon glyphicon-chevron-down");
            //点击获取二级城市
            $(".second_list_li").click(function () {
                $(".area").text($(this).text());
                $(this).parent().hide();
            })
        },function () {
            $(this).children(".second_list").hide();
            $(this).find("span").removeClass("glyphicon glyphicon-chevron-down").addClass("glyphicon glyphicon-chevron-right")
        })
    });
    //2.显示与隐藏
    $("#city").hover(function () {
        $("#location").show();
    },function () {
        $("#location").hide();
    });
    $("#location").hover(function () {
        $("#location").show();
    },function () {
        $("#location").hide();
    });

    /*果园公告*/
    $("#li_notice").hover(function () {
        $(this).css("background","white");
        $("#Orchard_announcement").show();
    },function () {
        $(this).css("background","#eeeeee");
        $("#Orchard_announcement").hide();
    });
    $("#Orchard_announcement").hover(function () {
        $("#Orchard_announcement").show();
    },function () {
        $("#Orchard_announcement").hide();
    });

    /*手机果园*/
    $("#phone_li").hover(function () {

        $(this).css("background","white");
        $("#phone_box").show();
    },function () {
        $(this).css("background","#eeeeee");
        $("#phone_box").hide();
    });
    $("#phone_box").hover(function () {
        $("#phone_box").show();
    },function () {
        $("#phone_box").hide();
    });

    /*导航栏滑动条*/
    $("#list li").mouseenter(function () {
        var index=$(this).index();
        $("#Home_slide").stop().animate({"left":350+(90*index)});
    });

    /*搜索框*/
    $("#home_search").focus(function () {
        $("#search_box").show();
    }).blur(function () {
        $("#search_box").hide();
    });
    $("#search_box_list li").mousedown(function () {
        $("#home_search").val($(this).html());
        $("#search_box").hide();
    });

    /*放大镜效果*/
    $(".show_goods").mouseenter(function () {
        $(this).find("img").stop().animate({"margin-left":-20,
            "margin-top":-20,
            "margin-right":-20,
            "margin-bottom":-20,
            "width":310,
            "height":310
        })
    }).mouseleave(function () {
        $(this).find("img").stop().animate({"margin-left":0,
            "margin-top":0,
            "margin-right":0,
            "margin-bottom":0,
            "width":270,
            "height":270
        })
    }).click(function () {/*点击商品跳到对应的二级页面*/
       $.cookie("id_Name",$(this).attr("idName"));
        window.open("secondary.html","_self")
    });

    /*购物车*/
    var quantity_commodity=0;
    var subtotal=0;
    var idStr="";
    if($.cookie("goods_id")){
        idStr+=$.cookie("goods_id");
    }
    if($.cookie("quantity_commodity")){
        $("#number_cart,#commodity_number").html($.cookie("quantity_commodity"));
        quantity_commodity=$.cookie("quantity_commodity")
    }
    if ($.cookie("subtotal_number")){
        $("#subtotal_number").html($.cookie("subtotal_number"));
        subtotal=parseFloat($.cookie("subtotal_number"));
    }
    $(".cart_logo").click(function () {
        //获取商品id
        var cart_id=$(this).attr("id");
        idStr+="."+cart_id;
        $.cookie("goods_id",idStr,{expires:3});
        //计算价格
        $.get("json/Goods_details.json",function (data) {
            $.each(data,function (idenx,ele) {
                if(ele.id==cart_id){
                    subtotal+=ele.commodity.price;
                    $.cookie("subtotal_number",Math.round(subtotal*100)/100,{expires:3});
                    $("#subtotal_number").html(Math.round(subtotal*100)/100);
                }
            })
        });
        //计算数量
        quantity_commodity++;
        $.cookie("quantity_commodity",quantity_commodity,{expires:3});
        $("#number_cart,#commodity_number").html($.cookie("quantity_commodity"));
        $(this).stop().animate({"background-position-x":-513,
            "background-position-y":-291},function () {
            $("#shade").show();
            $("#Home_cart_box").show();
        })
    });
    //1.购物车的操作
    $(".glyphicon-remove,#To_shopping").click(function () {
        $("#shade").hide();
        $("#Home_cart_box").hide();
        $(".cart_logo").stop().animate({"background-position-x":-517,"background-position-y":-243})
    });

    /*滚动条返回顶部*/
    $("#to_top").click(function () {
        $("body").animate({scrollTop:0})
    });

    /*跳转到登录页面*/
    $(".top_list_li_color").eq(0).click(function () {
        window.open('enter.html');
    });
    /*跳转到注册页面*/
    $(".top_list_li_color").eq(1).click(function () {
        window.open('register.html');
    });
    /*跳转到购物车页面*/
    $(".shopping_cart,#To_accounts").click(function () {
       window.open("cart.html","_self");
    });

    /*用户*/
    if($.cookie("user_name")){
        var user_str=$.cookie("user_name");
        var user_arr=user_str.split("|");
        var arr_leg=user_arr.length;
        var welcome=user_arr[arr_leg-1];
        $("#top_list li:first").html("您好，"+welcome);
        if($.cookie("enter_userName")){
            welcome=$.cookie("enter_userName");
            $("#top_list li:first").html("您好，"+welcome)
        }
    }
});