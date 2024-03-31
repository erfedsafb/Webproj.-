function sendotp()
{
    const email=document.getElementById('email');
    const otpverify=document.getElementsByClassName('otpverify')[0];
  
    console.log("Email value:", email.value);
    console.log("OTP Verify:", otpverify);

    let otp_val=Math.floor(Math.random()*10000);
    let emailbody=`<h2>Your OTP is </h2>${otp_val}`;
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "f219063@cfd.nu.edu.pk",
      Password : "80E63DC13CA96EAFB91E25D2B0CB693BB75D",
      To : email.value,
      From : "hm1152278@gmail.com",
      Subject : "Email OTP",
      Body : emailbody,
  }).then(

      message => {
        if(message === "OK"){
          alert("OTP sent to your email " + email.value);
          otpverify.style.display="flex";
          const otp_inp=document.getElementById('otp_inp');
          const otp_btn=document.getElementById('otp_btn');

          otp_btn.addEventListener('click',()=>{
            if(otp_inp.value==otp_val){
              alert("Your Eamil Address Verified")
            }
            else{
              alert("Invalid occur")
            }
           
          })
        }
        else{
          alert("error")
        }
      }
    );
}