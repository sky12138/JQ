/**
 * Created by 小奇 on 2016/10/23.
 */
$(function () {
    /*引入头部与底部*/
    $("#secondary_top").load("Home.html #top",function () {
        //显示与隐藏
        $("#city").hover(function () {
            $("#location").show();
        },function () {
            $("#location").hide();
        });
        /*跳转到登录页面*/
        $(".top_list_li_color").eq(0).click(function () {
            window.open('enter.html');
        });
        /*跳转到注册页面*/
        $(".top_list_li_color").eq(1).click(function () {
            window.open('register.html');
        });
    });
    $("#secondary_location").load("Home.html #location",function () {
        //显示与隐藏
        $("#location").hover(function () {
            $("#location").show();
        },function () {
            $("#location").hide();
        });
    });
    $("#secondary_Home").load("Home.html #Home",function () {
        $("#list li").mouseenter(function () {
            var index=$(this).index();
            $("#Home_slide").stop().animate({"left":350+(90*index)});
        });
        $("#home_search").focus(function () {
            $("#search_box").show();
        }).blur(function () {
            $("#search_box").hide();
        });
        $("#search_box_list li").mousedown(function () {
            $("#home_search").val($(this).html());
            $("#search_box").hide();
        });
        /*首页跳转*/
        $(".logo #list li:eq(0)").click(function () {
            window.open("Home.html","_self");
        });
        /*跳转到购物车页面*/
        $(".shopping_cart").click(function () {
            if($.cookie("goods_id")){
                var goods_id=$.cookie("goods_id");
                goods_id+="."+$.cookie("id_Name");
                $.cookie("goods_id",goods_id)
            }else {
                $.cookie("goods_id","."+$("#secondary_body").attr("body_Id"));
            }
            window.open("cart.html","_self");
        });
        /*购物车数组变化*/
        var quantity_commodity=0;
        if($.cookie("quantity_commodity")){
            $("#number_cart").html($.cookie("quantity_commodity"));
            quantity_commodity=$.cookie("quantity_commodity")
        }
    });
    $("#secondary_bottom").load("Home.html .bottom");
    $("#secondary_announcement").load("Home.html #Orchard_announcement",function () {
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
    });
    $("#secondary_QR").load("Home.html #phone_box",function () {
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
    });
    /*引入首页购物车*/
    $(".secondary_cartBox").load("Home.html #Home_cart_box",function () {
        $("#AddToCart,#secondary_TOPCart").click(function () {
            var quantity_commodity=0;
            var subtotal=0;
            if($.cookie("quantity_commodity")){
                quantity_commodity=parseInt($.cookie("quantity_commodity"));//数量
            }
            if ($.cookie("subtotal_number")){
                subtotal=parseFloat($.cookie("subtotal_number"));//总价
            }
            quantity_commodity+=parseInt($("#operationNumber").val());
            subtotal+=parseFloat($("#productrice_span").html())*parseInt($("#operationNumber").val());
            $.cookie("quantity_commodity",quantity_commodity,{expires:3});
            $("#commodity_number,#number_cart").html($.cookie("quantity_commodity"));
            $.cookie("subtotal_number",Math.round(subtotal*100)/100,{expires:3});
            $("#subtotal_number").html($.cookie("subtotal_number"));
            $(".big_boxBlack,#Home_cart_box").show();
        });
        $("#To_accounts").click(function () {
            if($.cookie("goods_id")){
                var goods_id=$.cookie("goods_id");
                goods_id+="."+$.cookie("id_Name");
                $.cookie("goods_id",goods_id,{expires:3})
            }else {
                $.cookie("goods_id","."+$("#secondary_body").attr("body_Id"),{expires:3});
            }
            if($.cookie("operationNumber")){
                cookie_on+=$.cookie("operationNumber")+"|";
                $.cookie("operationNumber",cookie_on+$("#secondary_body").attr("body_Id")+"."+secondary_number,{expires:3})
            }else {
                $.cookie("operationNumber","|"+$("#secondary_body").attr("body_Id")+"."+secondary_number,{expires:3})
            }
            window.open("cart.html","_self");
        })
    });

    /*图片遮罩层*/
    $(".show_imgLeft img").mouseenter(function () {
        clearInterval(time);
        var i=$(this).index();
        $("#leftImg_Masked").css("top",$(this).index()*140);
        $(".bigShow:eq("+i+")").css("opacity",1).siblings().css("opacity",0);
    }).mouseleave(function () {
        time=setInterval(function () {
            $("#leftImg_Masked").css("top",i*140);
            $(".bigShow:eq("+i+")").css("opacity",1).siblings().css("opacity",0);
            i++;
            if(i==3){
                i=0;
            }
        },3000);
    });
    /*大图自动轮播*/
    var i=0;
    var time=setInterval(function () {
        $("#leftImg_Masked").css("top",i*140);
        $(".bigShow:eq("+i+")").css("opacity",1).siblings().css("opacity",0);
        i++;
        if(i==3){
            i=0;
        }
    },3000);
    
    /*数量加减*/
    var secondary_number=1;
    var cookie_on="";
    //1.减
    $(".operation_").click(function () {
        if(secondary_number==0){
            secondary_number=0;
            $("#operationNumber").attr("value",secondary_number)
        }else {
            secondary_number--;
            $("#operationNumber").attr("value",secondary_number);
        }
    });
    //2.加
    $("._operation").click(function () {
        secondary_number++;
        $("#operationNumber").attr("value",secondary_number);
    });

    /*地址栏*/
    var secondary_firstCity="";
    var secondary_secondCity = "";
    $.get("json/tsconfigbd.json",function (data) {
        $.each(data,function (i,e) {//遍历省
            secondary_firstCity+="<li class="+'secondary_placeListLi'+">"+e.id+"</li>";
        });
        $("#cityShow").append(secondary_firstCity);
        //1.省级
        $(".secondary_placeListLi").click(function () {
            $(".secondary_secondList").html('');
            $("#secondary_firstCity").html($(this).html());
            var Provincial=$("#secondary_firstCity").html();
            console.log(Provincial);
            $.each(data,function (ii,ee) {
               if(ee.id==Provincial){
                   if(ee.city){
                       $("#cityShow").hide();
                       secondary_secondCity="";
                       $.each(ee.city,function (iii,eee) {
                           secondary_secondCity+="<li class="+'secondary_secondList_li'+">"+eee+"</li>";
                       });
                       $(".secondary_secondList").append(secondary_secondCity).show();
                       //2.获取二级城市
                       $("#secondary_secondCity").show();
                       $("#secondary_firstCity").css({
                           borderTop: "none",
                           borderLeft: "none",
                           borderRight: "none",
                           borderBottom: "2px solid green"
                       });
                       $(".secondaryAll_locationTop").css("width",152);
                       //点击获取
                       $(".secondary_secondList_li").click(function () {
                           $("#secondary_place").html($(this).html());
                           $("#secondaryAll_location").hide();
                       })
                   }else {
                       $("#secondary_place").html(Provincial);
                       $("#secondaryAll_location").hide();
                   }
               }
            })


        })
    });
    /*地址栏显示与隐藏*/
    //1.显示
    $("#dispatching").mouseenter(function () {
        $("#secondaryAll_location,#cityShow").show();
        $(".secondary_secondList,#secondary_secondCity").hide();
        $("#secondary_firstCity").css({
            borderTop: "2px solid green",
            borderLeft: "2px solid green",
            borderRight: "2px solid green",
            borderBottom: "none"
        });
        $(".secondaryAll_locationTop").css("width",226);
    });
    //2.隐藏
    $(".glyphicon-remove-circle").click(function () {
        $("#secondaryAll_location").hide()
    });

    /*吸顶菜单*/
    $(window).scroll(function (event) {
       var scrollTop=$(this).scrollTop();
        if(scrollTop>910){
            $("#secondary_box_Top").css({
                "position":"fixed",
                "z-index":3,
                "top":0,
                "left":0
            })
        }else {
            $("#secondary_box_Top").css({
                "position":" static",
                "top":0,
                "left":0
            })
        }
    });
    
    /*详情与评论切换*/
    $(".secondary_TOP:eq(0)").click(function () {
        $("#big_bigBox").show();
        $(this).addClass("secondary_TOP_active");
        $("#big_bigBox2").hide();
        $(".secondary_TOP:eq(1)").removeClass("secondary_TOP_active");
    });
    $(".secondary_TOP:eq(1)").click(function () {
        $("#big_bigBox2").show();
        $(this).addClass("secondary_TOP_active");
        $("#big_bigBox").hide();
        $(".secondary_TOP:eq(0)").removeClass("secondary_TOP_active");
    });

    /*用户评论*/
    function get(Id) {
        $.get(Id,function (data) {
            $.each(data,function (i,e) {
                var object=$(".buyer_comment:eq(0)").clone();
                $("#big_bigBox2").append(object);
                $.each(e,function (ii,obj) {
                    switch (ii){
                        case "id":
                            $(".user_Id:eq("+i+")").html(e[ii]);
                            break;
                        case "img":$(".user_img:eq("+i+")").css("background","url("+e[ii]+")");
                            break;
                        case "comment":$(".user_listComment:eq("+i+")").html("内容: &nbsp;"+e[ii]);
                            break;
                        case "img2":$(".user_listImg2:eq("+i+")").html("晒图: &nbsp;"+"<img src="+e[ii]+"/>").show();
                            break;
                        case "time":$(".user_listTime:eq("+i+")").html(e[ii]);
                    }
                });
            });
            /*点击用户评论的图变大*/
            $(".user_listImg2").click(function () {
                $(".big_boxBlack").show();
                $("#Home_cart_box").hide();
                $(".bigImg_box").html($(this).html())
            });
            $(".big_boxBlack,.bigImg_box").click(function () {
                $(".big_boxBlack").hide();
                $(".bigImg_box").html("")
            })
        })
    }
    function fn() {
        $(".buyer_comment:gt(0)").remove();
    }
    get("json/userComment.json");
    /*用户评论切换*/
    $(".checKboxs input").click(function () {
        var index=$(this).index();
        $(".user_listImg2").hide();
        switch (index){
            case 0:
                fn();
                get("json/userComment.json");
                break;
            case 1:
                fn();
                get("json/good.json");
                break;
            case 2:
                fn();
                get("json/up.json");
                break;
            case 3:
                fn();
                get("json/bad.json");
        }
    });

    /*动态获取对应二级页面的内容*/
    $.get("json/Goods.json",function (data) {
        var id_Name=$.cookie("id_Name");
        $.each(data,function (i,e) {
            if(e.id==id_Name){
                $("#productName,#body_topName").html(e.name);
                $("#productrice_span").html(e.price);
                $(".informationNumber").html(e.norms);
                $("#productAd").html(e.ad);
                $(".show_imgLeft img:eq(0)").attr("src",e.img1);
                $(".show_imgLeft img:eq(1)").attr("src",e.img2);
                $(".show_imgLeft img:eq(2)").attr("src",e.img3);
                $(".bigShow_box img:eq(0)").attr("src",e.bg_img1);
                $(".bigShow_box img:eq(1)").attr("src",e.bg_img2);
                $(".bigShow_box img:eq(2)").attr("src",e.bg_img3);
                $("#big_bigBox img:eq(0)").attr("src",e.bg1);
                $("#big_bigBox img:eq(1)").attr("src",e.bg2);
                $("#big_bigBox img:eq(2)").attr("src",e.bg3);
                $("#big_bigBox img:eq(3)").attr("src",e.bg4);
                $("#big_bigBox img:eq(4)").attr("src",e.bg5);
                $("#big_bigBox img:eq(5)").attr("src",e.bg6);
                $("#big_bigBox img:eq(6)").attr("src",e.bg7);
                $("#big_bigBox img:eq(7)").attr("src",e.bg8);
                $("#big_bigBox img:eq(8)").attr("src",e.bg9);


            }
        })
    });

    /*body_id*/
    if($.cookie("id_Name")){
        $("#secondary_body").attr("body_Id",$.cookie("id_Name"))
    }

    /*立即购买*/
    $("#PurchaseNow").click(function () {
        if($.cookie("goods_id")){
            var goods_id=$.cookie("goods_id");
            goods_id+="."+$.cookie("id_Name");
            $.cookie("goods_id",goods_id,{expires:3})
        }else {
            $.cookie("goods_id","."+$("#secondary_body").attr("body_Id"),{expires:3});
        }

        if($.cookie("operationNumber")){
            cookie_on+=$.cookie("operationNumber")+"|";
            $.cookie("operationNumber",cookie_on+$("#secondary_body").attr("body_Id")+"."+secondary_number,{expires:3})
        }else {
            $.cookie("operationNumber",$("#secondary_body").attr("body_Id")+"."+secondary_number,{expires:3})
        }
        window.open("cart.html","_self");
    })
});