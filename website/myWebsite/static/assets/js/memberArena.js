$(document).ready(function(){

  $("#user-alert").fadeTo(2000, 500).slideUp(500, function(){
      $("#user-alert").slideUp(500);
  });

  $('#userPic').on('mouseover',function(event){
      $(this).find('.transbox').fadeIn(100);
    });

  $('#userPic').on('mouseout',function(event){
    $(this).find('.transbox').stop().fadeOut(200);
  });

  $('.dropdown-menu.dropdown-cart').click(function(e){
    e.stopPropagation();
      //if(e.target.id === "fOptions"){
        // alert('Hello');
        var id = e.target.id;
        console.log(id);
        $("#"+id).next().fadeToggle();
      //  e.stopPropagation();
      // }
  });


    //Notification Read
  $("#myDropdown").click(function(e){
    $("#"+this.id+" a i").css('color','');
  });
});

//    $("#searchBar").submit(function(e){
//        e.preventDefault();
//        var q = $('#search_box').val();
//        var data = "q="+encodeURIComponent(q);
//        var xhr = $.ajax({
//          type:'POST',
//          url:'../core/search.php',
//          data: data,
//          complete: function(){
//          //  console.log(this.url+" data == "+data);
//          },
//          success: function(data){
//          //  console.log("From Success "+data);
//            var otherHtm = "";
//            if(data === 'null' || data === ''){
//                       $(".col-sm-8").html("<div class='searchRes'><h1>No User Found</h1></div>");
//            }
//            else{
//              obj = JSON.parse(data);
//              $(".col-sm-8").html("");
//              var arr = new Array();
//              for (var i = 0; i < obj[1].length; i++) {
//                // console.log(obj[1][i].f_id);
//                arr.push(obj[1][i].f_id);
//              }
//              // console.log(arr);
//              for (i =0; i< obj[0].length; i++) {
//                if(obj[0][i].UserPic == null)
//                  obj[0][i].UserPic = '../images/provideAnImage.jpg';
//                otherHtm ="<div class='col-sm-3 col-lg-3 searchResults'>\
//                <a href=../login/profile.php?uid="+obj[0][i].id+"><div class='card hovercard'>\
//                <div class='card-background'>\
//                <img class='card-bkimg'\ alt="+obj[0][i].Username+" src="+obj[0][i].UserPic+" />\
//                 </div>\
//                     <div class='useravatar'>\
//                         <img src="+obj[0][i].UserPic+" alt="+obj[0][i].Username+" />\
//                     </div>\
//                     <div class='card-info'>\
//                  <span class='card-title'>"+obj[0][i].Username+"</span></div>\
//                     </div></a>\
//            <div class='well'> <div class='tab-content'>\
//            <div class='tab-pane fade in active' id='tab1'>\
//              <h3>About</h3><p id='userAbout' title='"+obj[0][i].About+"'>"+obj[0][i].About+"</p><p id='userMail' title='"+obj[0][i].UserMail+"'>"+obj[0][i].UserMail+"</p>\
//            </div>\
//          </div>\
//          <div class='btn-pref btn-group btn-group-justified btn-group-lg' role='group' aria-label=''>\
//          <div class='btn-group' role='group'>\
//          <button type='button' class='btn btn-primary friend' name='friend_1'\ value='"+obj[0][i].id+"' onclick=sendReq('"+obj[0][i].id+"')><span aria-hidden='true'>";
//          if ((jQuery.inArray(obj[0][i].id,arr))>-1) {
//            otherHtm+="Request Sent</span></button></div></div></div>";
//          }else{
//            otherHtm+="<i class='glyphicon\ glyphicon-link'></i>Connect</span></button></div></div></div>";
//          }
//                     if(i % 4 == 0){
//                       $(".col-sm-8").append("<div class='row"+Math.floor(i/4)+"'></div>");
//                       $(".row"+i/4).append(otherHtm);
//                     }
//                     else{
//                      //  console.log("i % 4 :   "+i % 4+" i/4 : "+i/4);
//                       $(".row"+Math.floor(i/4)).append(otherHtm);
//                     }
//              }
//            }
//            }
//          });
//      });
//
//  getProfilePic();
//  getNotifs();
//});

//function getNotifs(){
//  var uid = getCookie('user_id');
//  var data = "u="+uid;
//  var xhr = $.ajax({
//    type: 'POST',
//    url:'../core/getNotifs.php',
//    data:data,
//    success:function(response){
//      // console.log(response);
//      if (response != 'no' ) {
//        $('.glyphicon-globe').css('color','red');
//        obj = JSON.parse(response);
//        var htm = "";
//        for (var i = 0; i < obj.length; i++) {
//          htm += '<li>\
//  <span class="item">\
//    <a href=../login/profile.php?uid='+obj[i].from_f+' style="word-wrap:break-word;white-space:nowrap;"><span class="item-left">\
//        <img src="'+obj[i].from_user_pic+'" alt="'+obj[i].from_user+'" style="height:30px;width:20px;"/>\
//        <span class="item-info">\
//            <span>'+obj[i].from_user+'</span>\
//        </span>\
//    </span></a>\
//    <span class="item-right btn-group">\
//    <button type = "button" class="btn btn-primary btn-xs">Accept</button>\
//<button type="button" id="fOptions'+i+'" class="btn btn-primary btn-xs" >\
//  <span class="caret"></span>\
//  <span class="sr-only">Toggle Dropdown</span>\
//</button>\
//<ul class="dropdown-menu" id="friendOptionsDropdown'+i+'" >\
//  <li><a href=../core/connect.php?decline='+obj[i].from_f+'>Decline</a></li>\
//  <li><a href=../core/connect.php?hide='+obj[i].from_f+'>Hide</a></li>\
//  <li class = "divider"></li>\
//  <li><a href=../core/connect.php?block='+obj[i].from_f+'>Block</a></li>\
//</ul>\
//    </span>\
//    </span>\
//</li>';
//        }
//        $('.dropdown-menu').html("<h4 class='text-center'>Friend Requests</h4><hr />"+htm+"<hr />");
//      }
//    }
//  });
//}
//
//function getCookie(cname) {
//    var name = cname + "=";
//    var ca = document.cookie.split(';');
//    for(var i = 0; i <ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') {
//            c = c.substring(1);
//        }
//        if (c.indexOf(name) == 0) {
//            return c.substring(name.length, c.length);
//        }
//    }
//    return "";
//}
