/*
    Authors:
        Santiago Kiril Cenkov Stoyanov / 100472051@alumnos.uc3m.es
        Oscar Hontoria Herrador / 100471920@alumnos.uc3m.es
*/


let timeout_ids = {"slide_drinks": 0};


//showSlide("slide_text_drinks");
showSlide("slide_drinks");
//showSlide("slide_text_meals");
//showSlide("slide_meals");


function showSlide(slide_class, slide_index=0)
{
    let slides = document.getElementsByClassName(slide_class);
    for (let i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }

    slides[slide_index].style.display = "block";
    slide_index = (slide_index + 1) % slides.length
    timeout_ids[slide_class] = setTimeout(showSlide, 1000, slide_class, slide_index);
}


function stopSliding(slide_class)
{
    clearTimeout(timeout_ids[slide_class]);
}


function resumeSliding(slide_class, slide_index)
{
    showSlide(slide_class, slide_index);
}


function gotoSlide(slide_class, slide_index)
{
    showSlide(slide_class, slide_index);
}