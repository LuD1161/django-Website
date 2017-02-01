function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("nav").style.marginLeft = "250px";
    document.getElementById("userBody").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("nav").style.marginLeft = "0";
    document.getElementById("userBody").style.marginLeft = "0";
    document.body.style.backgroundColor = "white";
}

function sendReq(friend_1){
      var csrftoken = getCookie('csrftoken');
      var data = "friend_1="+friend_1;
      var xhr = $.ajax({
      type:'POST',
      headers: {'X-CSRFToken': csrftoken},
      url:'/myWebsite/frequest',
      data: data,
      complete: function(){
      },
      success: function(data){
      if(data == 'ok'){
          $("#friendModalTitle").text("Connection Request Sent");
          $("#myFriendModal").modal({
            keyboard: true,
            show:     true
          });
          setInterval(function(){
              $("#myFriendModal").modal("hide");
          }, 1200);
          $("button[value='"+friend_1+"'] span").text("Request Sent");
      }
      }
      });
}

function respond(link){
    var csrftoken = getCookie('csrftoken');
    var xhr = $.ajax({
    type:'POST',
    headers:{'X-CSRFToken': csrftoken},
    url: link,
    complete:function(){
    },
    success:function(data){
    console.log("respond : "+data)
    }
    });
}

