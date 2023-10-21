/*
    Authors:
        Santiago Kiril Cenkov Stoyanov / 100472051@alumnos.uc3m.es
        Oscar Hontoria Herrador / 100471920@alumnos.uc3m.es
*/


// PATTERNS:
const ID_NUMBER_PATTERN = /^[0-9]{8}[A-Z]{1}$/;
const ID_NUMBER_LETTERS = {0:"T", 1:"R", 2:"W", 3:"A", 4:"G", 5:"M", 6:"Y",
                            7:"F", 8:"P", 9:"D", 10:"X", 11:"B", 12:"N", 13:"J",
                            14:"Z", 15:"S", 16:"Q", 17:"V", 18:"H", 19:"L", 20:"C",
                            21:"K", 22:"E"};

// NAME & FAMILY NAME PATTERNS:
const NAME_START_PATTERN = /^[A-Z]/;
const NAME_MIDDLE_PATTERN = /^[A-Z]([a-z]*|[\s-][A-Z])+/;
const NAME_END_PATTERN = /^[A-Z]([a-z]*|[\s-][A-Z])+$/;

// PHONE NUMBER PATTERNS:
const PHONE_NUMBER_PATTERN = /^[0-9]{9}$/;

// EMAIL PATTERNS:
const EMAIL_START_PATTERN = /^[a-zA-Z0-9._-]+/;
const EMAIL_AT_MIDDLE_PATTERN = /^[a-zA-Z0-9._-]+@/;
const EMAIL_DOMAIN_MIDDLE_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+/;
const EMAIL_TLD_MIDDLE_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\./;
const EMAIL_END_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


const forms = document.getElementsByTagName("form");


for (let i=0; i < forms.length; i++)
{
    forms[i].addEventListener("submit", function(event)
    {
        event.preventDefault();
        validateInputs(forms[i]);
    });
}


function validateInputs(form)
{
    const inputs = form.getElementsByTagName("input");
    validateIDNumber(inputs[0]);
    validateName(inputs[1]);
    validateFamilyName(inputs[2]);
    validatePhoneNumber(inputs[3]);
    validateEmail(inputs[4]);
}


function setError(input_element, message)
{
    const input_box = input_element.parentElement;
    const errorDisplay = input_box.querySelector(".input-error-box");

    errorDisplay.innerText = message;
    input_box.ClassList.add("error_message");
}


function validateIDNumber(id_number_element)
{
    const id_number = id_number_element.value;
    if (id_number === "")
    {
        setError(id_number_element, "ID Number required");
        return false;
    }
    if (id_number.length != 9)
    {
        setError(id_number_element, "ID Number must be 9 characters long");
        return false;
    }
    if (!id_number.match(ID_NUMBER_PATTERN))
    {
        setError(id_number_element, "ID Number must be 8 numbers and 1 uppercase letter");
        return false;
    }
    if (ID_NUMBER_LETTERS[Number(id_number.substr(0, 8)) % 23] != id_number.substr(-1, 1))
    {
        setError(id_number_element, "ID Number does not exist");
        return false;
    }
    return true;
}


function validateName(name_element)
{
    const name = name_element.value;
    if (name === "")
    {
        setError(name_element, "Name required");
        return false;
    }
    if (!name.match(NAME_START_PATTERN))
    {
        setError(name_element, "Name must begin with an uppercase letter");
        return false;
    }
    if (!name.match(NAME_MIDDLE_PATTERN))
    {
        setError(name_element, "Name must contain at least a letter, whitespace or '-'");
        return false;
    }
    if (!name.match(NAME_END_PATTERN))
    {
        setError(name_element, "Name must end on a letter");
        return false;
    }
    return true;
}


function validateFamilyName(family_name_element)
{
    const family_name = family_name_element.value;
    if (family_name === "")
    {
        setError(family_name_element, "Family Name required");
        return false;
    }
    if (!family_name.match(NAME_START_PATTERN))
    {
        setError(family_name_element, "Family Name must begin with an uppercase letter");
        return false;
    }
    if (!family_name.match(NAME_MIDDLE_PATTERN))
    {
        setError(family_name_element, "Family Name must contain at least a letter, whitespace or '-'");
        return false;
    }
    if (!family_name.match(NAME_END_PATTERN))
    {
        setError(family_name_element, "Family Name must end on a letter");
        return false;
    }
    return true;
}


function validatePhoneNumber(phone_number_element)
{
    const phone_number = phone_number_element.value;
    if (phone_number === "")
    {
        return true;
    }
    if (phone_number.length != 9)
    {
        setError(phone_number_element, "Phone Number must be 9 characters long");
        return false;
    }
    if (!phone_number.match(PHONE_NUMBER_PATTERN))
    {
        setError(phone_number_element, "Phone Number must contain only numbers");
        return false;
    }
    return true;
}


function validateEmail(email_element)
{
    const email = email_element.value;
    if (email === "")
    {
        setError(email_element, "Email required");
        return false;
    }
    if (!email.match(EMAIL_START_PATTERN))
    {
        setError(email_element, "Email must begin with at least a letter, number, '.', '-' or '_'");
        return false;
    }
    if (!email.match(EMAIL_AT_MIDDLE_PATTERN))
    {
        setError(email_element, "Email must contain '@'");
        return false;
    }
    if (!email.match(EMAIL_DOMAIN_MIDDLE_PATTERN))
    {
        setError(email_element, "Email's domain must contain at least a letter, number, '.' or '-'");
        return false;
    }
    if (!email.match(EMAIL_TLD_MIDDLE_PATTERN))
    {
        setError(email_element, "Email must contain a Top Level Domain");
        return false;
    }
    if (!email.match(EMAIL_END_PATTERN))
    {
        setError(email_element, "Email's Top Level Domain must contain 2 to 4 letters");
        return false;
    }
    return true;
}