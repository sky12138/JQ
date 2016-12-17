/**
 * Created by 小奇 on 2016/10/20.
 */
$(function () {
    /*引入头部与底部*/
    $("#register_top").load("Home.html #top",function () {
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
    $("#register_location").load("Home.html #location",function () {
        //显示与隐藏
        $("#location").hover(function () {
            $("#location").show();
        },function () {
            $("#location").hide();
        });
    });
    $("#register_bottom").load("Home.html .bottom");
    $("#register_announcement").load("Home.html #Orchard_announcement",function () {
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
    $("#register_QR").load("Home.html #phone_box",function () {
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

    /*跳转到首页*/
    $("#register_logo img").click(function () {
        window.open('Home.html',"_self");//返回主页
    });
    /*跳转的登录页面*/
    $("#vip_move,#register_vipEnter").click(function () {
        window.open('enter.html',"_self");
    });
    /*跳转的注册页面*/
    $("#enter_vip_move,#enter_vipEnter,#fist_enter_vip_move").click(function () {
        window.open('register.html',"_self");
    });
    /*注册验证*/
    var ipt1,ipt2,ipt3,ipt4;
    //1.手机号
    $("#information_name").blur(function () {
        var name_val=$(this).val();
        var name_rule=/\D/g;
        var name_leg=name_val.length;
        if(name_rule.test(name_val)||name_leg<11||name_leg>11){
            $(".register_reminder:eq(0)").html("手机号不合法").show()
        }else {
            ipt1=true;
            if($.cookie("user_name")){
                var history_name=$.cookie("user_name");
                var hn_arr=history_name.split("|");
                $.each(hn_arr,function (i,e) {
                    if(e==name_val){
                        $(".register_reminder:eq(0)").html("该手机号已注册").show();
                        ipt1=false;
                    }
                })
            }
        }
    }).focus(function () {
        $(".register_reminder:eq(0)").hide()
    });
    //2.密码
    $("#information_key1").blur(function () {
        var key1_val=$(this).val();
        var key1_rule=/[^0-9a-zA-Z_]/g;
        var key1_leg=key1_val.length;
        if(key1_rule.test(key1_val)||key1_leg<6||key1_leg>20){
            $(".register_reminder:eq(1)").html("密码不合法").show()
        }else {
            ipt2=true
        }
    }).focus(function () {
        $(".register_reminder:eq(1)").hide()
    });
    //3.确认密码
    $("#information_key2").blur(function () {
        var key1_val=$("#information_key1").val();
        var key2_val=$(this).val();
        if(key1_val!=key2_val){
            $(".register_reminder:eq(2)").html("两次密码不符").show()
        }else {
            ipt3=true
        }
    }).focus(function () {
        $(".register_reminder:eq(2)").hide()
    });
    //4.验证码
    function code() {
        var number="";
        for (var i = 0; i < 4; i++) {
            var a = parseInt(Math.random() * 10);
            if (a % 2 == 0) {
                number += a;
            } else {
                number += String.fromCharCode(parseInt(Math.random() * 26 + 65))
            }
        }
        $(".show_code").html(number);
    }
    code();
    $(".glyphicon-repeat").click(function () {
        code()
    });
    $("#information_code").blur(function () {
        var code_val=$(this).val();
        if(code_val!=$(".show_code").html()){
            $(".register_reminder:eq(3)").html("验证码输入不正确").show()
        }else {
            ipt4=true
        }
    }).focus(function () {
        $(".register_reminder:eq(3)").hide()
    });
    //注册
    $("#finish").click(function () {
       if(ipt1&&ipt2&&ipt3&&ipt4){
           $(".glyphicon-ok").show();
           var user_name=$.cookie("user_name");
           user_name+="|"+$("#information_name").val();
           $.cookie("user_name",user_name,{expires:3});
           window.open("Home.html","_self");
       }else {
           $(".register_reminder:eq(0)").html("手机号不合法").show();
           $(".register_reminder:eq(1)").html("密码不合法").show();
           $(".register_reminder:eq(3)").html("验证码输入不正确").show()
       }

    });

    /*------------------登入界面-------------------------------*/
    //1.快捷登录
    $("#fist_move").click(function () {
        $("#information").hide();
        $("#fist_move_box").show();
    });
    //登入
    $("#enter_finish").click(function () {
       var enter_name=$("#enter_name").val();
        var history_name=$.cookie("user_name");
        var hn_arr=history_name.split("|");
        $.each(hn_arr,function (i,e) {
            if(e==enter_name){
               $.cookie("enter_userName",enter_name,{expires:3});
               $("#bcz").hide();
               window.open("Home.html","_self")
            }
        });
        if(hn_arr.indexOf(enter_name)==-1){
            $("#bcz").show();
        }
    });

    //2.显示最近的号码
    $("#enter_name,#information_name").focus(function () {
        var user_str=$.cookie("user_name");
        var user_arr=user_str.split("|");
        user_arr.shift();
        $("#recently_number").html("");
        var recent="";
        $.each(user_arr,function (i,e) {
            recent+="<li>"+e+"</li>"
        });
        $("#recently_number").show().append("<ul id="+'recently_list'+">"+recent+"</ul>");
        //点击获取最近的号码
        $("#recently_list li").mousedown(function () {
            $("#enter_name").val($(this).html())
        })
    }).blur(function () {
        $("#recently_number").hide()
    })

});
