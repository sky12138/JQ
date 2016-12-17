/**
 * Created by 小奇 on 2016/10/24.
 */
$(function () {
    /*引入头部与底部*/
    $("#Cart_top").load("Home.html #top",function () {
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
    $("#Cart_location").load("Home.html #location",function () {
        //显示与隐藏
        $("#location").hover(function () {
            $("#location").show();
        },function () {
            $("#location").hide();
        });
    });
    $("#Cart_announcement").load("Home.html #Orchard_announcement",function () {
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
    $("#Cart_QR").load("Home.html #phone_box",function () {
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
    $("#Cart_bottom").load("Home.html .bottom");

    /*数量加减*/
    var cookie_on="";
    var cookie_pro_id="";
    $(".glyphicon-minus").click(function () {
        var val=$(this).siblings(".Number_change").val();
        if(val==0){
            val=0
        }else {
            val-=1;
        }
        $(this).siblings(".Number_change").val(val);

        var cName=$(this).parent().siblings(".Commodity_Name").find(".Name").html();
        $.get("json/carts.json",function (data) {
            $.each(data,function (i,e) {
                if(cName==e.name){
                    cookie_pro_id=e.id;
                    if($.cookie("operationNumber")){
                        cookie_on+=$.cookie("operationNumber")+"|";
                        $.cookie("operationNumber",cookie_on+cookie_pro_id+"."+val,{expires:3})
                    }else {
                        $.cookie("operationNumber",cookie_pro_id+"."+val,{expires:3})
                    }
                }
            })
        });


        /*总计*/
        var price =$(this).parent().siblings(".Commodity_Price").html();
        $(this).parent().siblings(".Commodity_total").html(parseInt(Math.ceil(val*price*100))/100);
        $(".cart-payBox em").html(ProductNum());
        $(".all-order span").html( gross_price())
    });
    //加
    $(".glyphicon-plus").click(function () {
        var val= parseInt($(this).siblings(".Number_change").val());
        val+=1;
        $(this).siblings(".Number_change").val(val);

        var cName=$(this).parent().siblings(".Commodity_Name").find(".Name").html();
        $.get("json/carts.json",function (data) {
            $.each(data,function (i,e) {
                if(cName==e.name){
                    cookie_pro_id=e.id;
                    if($.cookie("operationNumber")){
                        cookie_on+=$.cookie("operationNumber")+"|";
                        $.cookie("operationNumber",cookie_on+cookie_pro_id+"."+val,{expires:3})
                    }else {
                        $.cookie("operationNumber",cookie_pro_id+"."+val,{expires:3})
                    }
                }
            })
        });


        var price =$(this).parent().siblings(".Commodity_Price").html();
        $(this).parent().siblings(".Commodity_total").html(parseInt(Math.ceil(val*price*100))/100);
        $(".cart-payBox em").html(ProductNum());
        $(".all-order span").html( gross_price())
    });

    /*底部切换*/
    $(".box").click(function () {
        $(this).addClass("boxActive").siblings().removeClass("boxActive")
    });

    /*继续逛逛*/
    $("#keepMove").click(function () {
        window.open("Home.html","_self");
    });

    /*加载购物车中的商品*/
    var idStr=$.cookie("goods_id");//string
    var id_arr=idStr.split(".");//[1.2.1.3.2]商品种类
    /*删除数组中重复的元素*/
    function Arr(arr) {
        var arr2=[];
        for(var i=0;i<arr.length;i++){
            if(arr2.indexOf(arr[i])==-1){
                arr2.push(arr[i])
            }
        }
        return arr2
    }
    var idArr=Arr(id_arr);
    //获取商品信息
    $.get("json/carts.json",function (data) {
        for(var j=0;j<idArr.length;j++){
            $.each(data,function (i,e) {
                if(idArr[j]==e.id){
                    //创建商品类
                    var clone_box=$(".Cart_settlement:eq(0)").clone(true).css("display","block");
                    $("#Cart_body2").append(clone_box);
                    $(".Commodity_Name:eq("+j+")").find("img").attr("src",e.img1);
                    $(".Name:eq("+j+")").html(e.name);
                    $(".Commodity_Norms:eq("+j+")").html(e.norms);
                    $(".Commodity_Price:eq("+j+")").html(e.price);

                    var cookie_on=$.cookie("operationNumber");
                    console.log(cookie_on);
                    var cookie_arr1=cookie_on.split("|");//数组
                    $.each(cookie_arr1,function (index,ele) {
                       var cookie_arr2=ele.split(".");
                        if(cookie_arr2[0]==e.id){
                            $(".Commodity_total:eq("+j+")").siblings(".Commodity_Number").find("input").val(cookie_arr2[1]);
                        }
                    });


                    /*总计*/
                    var price =$(".Commodity_total:eq("+j+")").siblings(".Commodity_Price").html();
                    var val=$(".Commodity_total:eq("+j+")").siblings(".Commodity_Number").find("input").val();
                    $(".Commodity_total:eq("+j+")").html(parseInt(Math.ceil(val*price*100))/100);
                    /*商品数量*/
                    $(".cart-payBox em").html(ProductNum());
                    $(".all-order span").html( gross_price());
                }
            })
        }
    });

    /*历史纪录*/
    var History="";
    $.get("json/carts.json",function (data) {
        $.each(data,function (i,e) {
            for(var j=0;j<idArr.length;j++){
                if(idArr[j]==e.id){
                    History+="<li><img src='"+e.img1+"'/>"+e.name+"</li>"
                }
            }
        });
        $(".history_ul").append(History);
        /*移动*/
        var move=0;
        $(".bottom_history .glyphicon-chevron-left").click(function () {
            move--;
            $(".history_ul,.history_ul2").stop().animate({left:move*190})
        });
        $(".bottom_history .glyphicon-chevron-right").click(function () {
            move++;
            $(".history_ul,.history_ul2").stop().animate({left:move*200})
        });
        /*切换*/
        $(".box:eq(0)").click(function () {
            $(".history_ul").show();
            $(".history_ul2").hide()
        });
        $(".box:eq(1)").click(function () {
            $(".history_ul").hide();
            $(".history_ul2").show()
        })
    });

    /*商品数量和总共的价格*/
    function ProductNum() {
        var obj=$(".Commodity_Number .Number_change");
        var v=0;
        $.each(obj,function () {
            v+=parseInt($(this).val());
        });
        $.cookie("quantity_commodity",v-1);
        return v-1
    }
    function gross_price() {
        var obj=$(".Commodity_total");
        var v=0;
        var v2=0;
        $.each(obj,function () {
            v+=parseFloat($(this).html());
        });
        v2=Math.ceil((v-39.9)*100)/100;
        $.cookie("subtotal_number",v2);
        return v2
    }

    /*点击删除*/
    $(".Delete").click(function () {
        $(this).parents(".Cart_settlement").remove();
        $(".cart-payBox em").html(ProductNum());
        $(".all-order span").html( gross_price());
        var del_id=0;
        var name_del=$(this).parents(".Cart_settlement").find(".Name").html();
        $.get("json/carts.json",function (data) {
            $.each(data,function (i,e) {
                if(e.name==name_del){
                    del_id=e.id;
                    var index=idArr.indexOf(del_id.toString());//1
                    idArr.splice(index,1);
                    var string=idArr.join(".");
                    $.cookie("goods_id",string)
                }
            })
        });


    });


});