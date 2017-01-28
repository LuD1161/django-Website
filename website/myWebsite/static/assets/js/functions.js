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

//function sendReq(friend_1){
//    //   console.log(friend_1);
//      var data = "friend_1="+friend_1;
//      var xhr = $.ajax({
//      type:'POST',
//      url:'../core/connect.php',
//      data: data,
//      complete: function(){
//      //  console.log(this.url+" data == "+data);
//      },
//      success: function(data){
//          console.log(data);
//      if(data == 'ok'){
//          $("#friendModalTitle").text("Connection Request Sent");
//          $("#myFriendModal").modal({
//            keyboard: true,
//            show:     true
//          });
//          setInterval(function(){
//              $("#myFriendModal").modal("hide");
//          }, 1200);
//          $("button[value='"+friend_1+"'] span").text("Request Sent");
//      }
//      }
//      });
//}
