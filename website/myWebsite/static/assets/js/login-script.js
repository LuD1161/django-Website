$('document').ready(function(){
  //First Validate the form
  //Validation using jquery Validate
  $('#login-form').validate({
    rules:
    {
      password: {
        required: true,
        minlength: 8
      },
      user_email:{
        required: true,
        email: true
      },
    },
      messages:{
        password:{
          required: "Please enter your password",
          minlength: "Password should be atleast 8 characters"
        },
        user_email: "Please enter your email address",
      },
      submitHandler:  submitForm
  });

  $("#registration-form").validate({
    rules:
    {
      password: {
        required: true,
        minlength: 8
      },
      cpassword:{
        required: true,
        equalTo: "#password_id"
      },
      name: {
        required: true,
        minlength: 4,
        maxlength: 20
      },
      user_email: {
        required: true,
        email:    true
      },
      country: {
        required: true
      },
      gender: {
        required: true
      },
      dob:{
        required: true,
        dateISO: true
      }
    },
    messages:{
      password:{
        required: "Please enter your password"
      },
      cpassword:{
       required: "Please Retype your Password",
       equalTo: "Passwords do not Match !"
      },
      user_email: "Please enter your email address",
      dob: "Please enter your Date of Birth",
      name: "Please enter your Full Name",
      dob: "This field is required"
    },
    submitHandler: regFormSubmit

  });
  //Then serialize the form and send to server
  function submitForm(){
    var data = $("#login-form").serialize();
    $.ajax({
      type  : 'POST',
      url   : '/myWebsite/',
      data  : {
                email:$('#user_email').val();
                password:$('#password').val();
      },
      beforeSend  : function(){
        $("#error_login").fadeOut();
        $("#btn-login").html(
        '<span class="glyphicon glyphicon-transfer"></span>&nbsp; sending...');
      },
      success   : function(response){
        if(response == "ok"){
          //if correct then proceed to homepage
          $("#btn-login").html('<img src="{% static "assets/ajax-loader.svg" %}"/> &nbsp; Signing In ...');
        setTimeout(' window.location.href = "home.php"; ', 1000);
        }
        else{
          // If the login is wrong
          $("#error_login").fadeIn(1000, function(){
          $("#error_login").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+response+' !</div>');
           $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
           $("#error_login").fadeOut(3000);
         });
        }
      }
    });
    return false;
  }

  function regFormSubmit(){
    var data = $("#registration-form").serialize();
    console.log(data);
    $.ajax({
      type  : 'POST',
      url   : '../login/registration.php',
      data  : data,
      beforeSend  : function(){
        $("#error_reg").fadeOut();
        $("#btn-register").html(
        '<span class="glyphicon glyphicon-transfer"></span>&nbsp; sending...');
      },
      success   : function(response){
        if(response == "ok"){
          alert("Successfully Registered !!!");
          //if correct then proceed to homepage
          $("#btn-register").html('<img src="ajax-loader.svg" /> &nbsp; Going back to Signing page ...');
        setTimeout(' window.location.href = "login.php"; ',3000);
        }
        else if (response == "same"){
          $("#error_reg").fadeIn(1000,function(){
            $("#error_reg").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; User Already Registered ! </div>');
            var content = "<span class='glyphicon glyphicon-transfer'></span> &nbsp; Register";
            $("#btn-register").html(content);
            $("#error_reg").fadeOut(5500);
          });
        }
      }
    });
    return false;
  }
});
