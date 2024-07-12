document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const mensaje = document.getElementById("mensaje");
  
    emailjs.init("3mQ1JMIxTMsHApGdo"); //USER_ID
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      if (!nombre.value.trim()) {
        alert("Por favor, ingrese su nombre.");
        nombre.focus();
        return;
      }
  
      if (!validateEmail(email.value)) {
        alert("Por favor, ingrese un correo electrónico válido.");
        email.focus();
        return;
      }
  
      if (!mensaje.value.trim()) {
        alert("Por favor, ingrese su mensaje.");
        mensaje.focus();
        return;
      }
  
      emailjs.send("service_e6hyd6p", "template_jsajt77", { //SERVICE_ID y TEMPLATE_ID
        from_name: nombre.value,
        from_email: email.value,
        message: mensaje.value,
      })
      .then(function (response) {
        alert("Correo enviado exitosamente!");
        form.reset();
      }, function (error) {
        alert("Hubo un error al enviar el correo. Inténtelo nuevamente.");
      });
    });
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  });