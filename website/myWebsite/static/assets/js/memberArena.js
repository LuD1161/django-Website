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

  $('body').on('click','ul.dropdown-menu.dropdown-cart',function(e){
    e.stopPropagation();
        var id = e.target.id;
        $("button\\#"+id).next().fadeToggle();
        console.log($("button\\#"+id).next());
  });


    //Notification Read
  $("#myDropdown").click(function(e){
    $("#"+this.id+" a i").css('color','');
  });


  $("#searchBar").submit(function(e){
        e.preventDefault();
        var csrftoken = getCookie('csrftoken');
        var q = $('#search_box').val();
        var data = "q="+encodeURIComponent(q);
        var xhr = $.ajax({
          type:'POST',
          url:'/myWebsite/findFriends',
          headers: {'X-CSRFToken': csrftoken},
          data: data,
          complete: function(){
          },
          success: function(data){
            var otherHtm = "";
            if(data === 'null' || data === ''){
                       $(".col-sm-8").html("<div class='searchRes'><h1>No User Found</h1></div>");
            }
            else{
              var obj = JSON.parse(data);
              $(".col-sm-8").html("");
              var arr = new Array();
              for (var i = 0; i < obj[1].length; i++) {
                arr.push(obj[1][i].f_id);
              }
              for (i =0; i< obj[0].length; i++) {
                if(obj[0][i].UserPic == null)
                  obj[0][i].UserPic = '../images/provideAnImage.jpg';
                otherHtm ="<div class='col-sm-3 col-lg-3 searchResults'>\
                <a href=/myWebsite/user/"+obj[0][i].id+"><div class='card hovercard'>\
                <div class='card-background'>\
                <img class='card-bkimg'\ alt="+obj[0][i].Username+" src=/static/assets/"+obj[0][i].UserPic+" />\
                 </div>\
                     <div class='useravatar'>\
                         <img src=/static/assets/"+obj[0][i].UserPic+" alt="+obj[0][i].Username+" />\
                     </div>\
                     <div class='card-info'>\
                  <span class='card-title'>"+obj[0][i].Username+"</span></div>\
                     </div></a>\
            <div class='well'> <div class='tab-content'>\
            <div class='tab-pane fade in active' id='tab1'>\
              <h3>About</h3><p id='userAbout' title='"+obj[0][i].About+"'>"+obj[0][i].About+"</p><p id='userMail' title='"+obj[0][i].UserMail+"'>"+obj[0][i].UserMail+"</p>\
            </div>\
          </div>\
          <div class='btn-pref btn-group btn-group-justified btn-group-lg' role='group' aria-label=''>\
          <div class='btn-group' role='group'>\
          <button type='button' class='btn btn-primary friend' name='friend_1'\ value='"+obj[0][i].id+"' onclick=sendReq('"+obj[0][i].id+"')><span aria-hidden='true'>";
          if ((jQuery.inArray(obj[0][i].id,arr))>-1) {
            otherHtm+="Request Sent</span></button></div></div></div>";
          }else{
            otherHtm+="<i class='glyphicon glyphicon-link'></i>Connect</span></button></div></div></div>";
          }
                     if(i % 4 == 0){
                       $(".col-sm-8").append("<div class='row"+Math.floor(i/4)+"'></div>");
                       $(".row"+i/4).append(otherHtm);
                     }
                     else{
                       $(".row"+Math.floor(i/4)).append(otherHtm);
                     }
              }
            }
            }
          });
      });

  getNotifs();
});

function getNotifs(){
  var csrftoken = getCookie('csrftoken');
  var xhr = $.ajax({
    type: 'POST',
    url:'/myWebsite/notifications',
    headers: {'X-CSRFToken': csrftoken},
    success:function(response){
//    console.log(response);
      if (response != 'no' ) {
        $('.glyphicon-globe').css('color','red');
        var obj = JSON.parse(response);
//        console.log("obj[0] : "+obj[0].length+"obj[1] : "+ obj[1].length);
        var htm = "";
        for (var i = 0; i < obj[0].length; i++) {
          htm += '<li>\
              <span class="item">\
                <a href=/myWebsite/user/'+obj[0][i].from_f+' style="word-wrap:break-word;white-space:nowrap;"><span class="item-left">\
                    <img src=/static/images/'+obj[0][i].from_user_pic+' alt='+obj[0][i].from_user+' style="height:30px;width:20px;"/>\
                    <span class="item-info">\
                        <span>'+obj[0][i].from_user+'</span>\
                    </span>\
                </span></a>\
                <span class="item-right btn-group">\
                <button type = "button" class="btn btn-primary btn-xs" onclick="respond(\'/myWebsite/connect/accept='+obj[0][i].from_f+'\')">Accept</button>\
            <button type="button" id="fOptions'+i+'" class="btn btn-primary btn-xs" >\
              <span class="caret"></span>\
              <span class="sr-only">Toggle Dropdown</span>\
            </button>\
            <ul class="dropdown-menu" id="friendOptionsDropdown'+i+'" >\
              <li><a onclick="respond(\'/myWebsite/connect/decline='+obj[0][i].from_f+'\')"\
              href="javascript:void(0);">Decline</a></li>\
              <li><a onclick="respond(\'/myWebsite/connect/hide='+obj[0][i].from_f+'\')"\
               href="javascript:void(0);">Hide</a></li>\
              <li class = "divider"></li>\
              <li><a onclick="respond(\'/myWebsite/connect/block='+obj[0][i].from_f+'\')"\
              href="javascript:void(0);">Block</a></li>\
            </ul>\
                </span>\
                </span>\
            </li>';
        }
        htm +="<h4 class='text-center'>Messages</h4><hr />";
        for (var i = 0; i < obj[1].length; i++) {
                  htm += '<li>\
          <span class="item">\
            <a href=/myWebsite/user/'+obj[1][i].from_f+' style="word-wrap:break-word;white-space:nowrap;"><span class="item-left">\
                <img src=/static/images/'+obj[1][i].from_user_pic+' alt='+obj[1][i].from_user+' style="height:30px;width:20px;"/>\
                <span class="item-info">\
                    <span>'+obj[1][i].from_user+'</span>\
                </span>\
            </span></a>\
            <span class="item-right btn-group">\
            <button type="button" class="close" onclick="dismiss.call(this, event,'+obj[1][i].message_id+')" title="Mark As Read">&times;</button>\
            </span>\
            <br><p>'+obj[1][i].message+'</p>\
        </li>';
        }

        $('.dropdown-menu').html("<h4 class='text-center'>Friend Requests</h4><hr />"+htm+"<hr />");
      }
    }
  });
}

function dismiss(e,id){
    var csrftoken = getCookie('csrftoken');
    var xhr = $.ajax({
    type:'POST',
    headers:{'X-CSRFToken': csrftoken},
    data:"dismiss="+id,
    url: '/myWebsite/messages',
    complete:function(){
    },
    success:function(data){
    if(data == 'ok'){
    console.log(e.target);
    $(e.target).parent().parent().remove();
    }
    }
    });
}

//function uploadPhoto(){
//    $('#uploadUserPic').submit(function(e)){
//    e.preventDefault();
//    var fileselect = document.getElementById('myFile');
//    var file = fileselect.files;
//    var formData = new FormData();
//    formData.append(name, file, file.name);
//    var csrftoken = getCookie('csrftoken');
//    var xhr = $.ajax({
//          type:'POST',
//          url:'/myWebsite/uploadUserPic',
//          headers: {'X-CSRFToken': csrftoken},
//          data: formData,
//          complete: function(){
//          },
//          success: function(data){
//          if data == 'ok':
//          $('.modal-content').html('<p>File Uploaded Successfully</p>')
//          }
//    }
//}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
