/*
    Authors:
        Santiago Kiril Cenkov Stoyanov / 100472051@alumnos.uc3m.es
        Oscar Hontoria Herrador / 100471920@alumnos.uc3m.es
*/


let timeout_ids = {"slide_drinks": 0, "slide_meals": 0};


//showSlide("slide_text_drinks");
showSlide("slide_drinks");
//showSlide("slide_text_meals");
//showSlide("slide_meals");


function showSlide(slide_class, slide_index=0)
{
    const slides = document.getElementsByClassName(slide_class);
    for (let i = 0; i < slides.length; i++)
    {
        slides[i].style.display = "none";
    }

    slides[slide_index].style.display = "block";
    slide_index = (slide_index + 1) % slides.length;
    timeout_ids[slide_class] = setTimeout(showSlide, 1000, slide_class, slide_index);
}


function stopSliding(slide_class)
{
    clearTimeout(timeout_ids[slide_class]);
}


function gotoSlide(slide_class, slide_index)
{
    stopSliding(slide_class);
    showSlide(slide_class, slide_index);
}


function toggleNavSections()
{
    const nav = document.getElementsByTagName("nav")[0];
    const nav_sections = nav.getElementsByClassName("nav_section");
    const nav_menu = document.getElementsByClassName("nav_menu")[0];
    const nav_btn = nav_menu.getElementsByClassName("menu-btn")[0];
    const close_btn = nav_menu.getElementsByClassName("close-btn")[0];

    if (!nav.classList.contains("dnone"))
    {
        nav.classList.add("dnone");
        nav_btn.classList.remove("dnone");
        close_btn.classList.add("dnone");
    }
    else
    {
        nav.classList.remove("dnone");
        nav_btn.classList.add("dnone");
        close_btn.classList.remove("dnone");
    }
    for (let i=0; i < nav_sections.length; i++)
    {
        if (!nav_sections[i].classList.contains("dnone"))
        {
            nav_sections[i].classList.add("dnone");
        }
        else
        {
            nav_sections[i].classList.remove("dnone");
        }
    }
}