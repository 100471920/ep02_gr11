let EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


function verifyEmail(email)
{
    if (EMAIL_PATTERN.test(email))
    {
        document.getElementById("mensaje").innerHTML = "Correo válido";
    }
    else
    {
        document.getElementById("mensaje").innerHTML = "Correo no válido";
    }
}