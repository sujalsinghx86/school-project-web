let engineChoice = "chromium"
let firstName = ""
let lastName = ""
let email = ""
const SPEED = 30;

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function typeInto(element, text) {
    for (const char of text) {
        element.innerHTML += char
        await sleep(SPEED)
    }
}

function getTextAndMakeVisible(element) {
    let text = element.innerText
    element.innerText = ""
    element.style.display = "block"
    return text
}

async function initTypedElement(element) {
    let text = getTextAndMakeVisible(element)
    return await typeInto(element, text)
}

async function typeOut(element) {
    for (const char of element.innerHTML) {
        let text = element.innerText
        element.innerHTML = text.substring(0, text.length - 1)
        await sleep(SPEED)
    }
}

async function animate() {
    let t = document.getElementsByClassName("typed-text")
    let l = document.getElementsByClassName("form1-input")

    await initTypedElement(t[0])
    await sleep(1000)
    await initTypedElement(t[1])
    await sleep(2000)
    await typeOut(t[1])
    await typeOut(t[0])
    await sleep(1000)
    await initTypedElement(t[2])
    await sleep(500)
    t[2].style.animation = "3s ease fadeOut"
    await sleep(3000)
    t[2].style.display = "none";

    await initTypedElement(t[3])
    l[0].style.display = "block"
    l[1].style.display = "block"
    l[1].style.animationDelay = "1s";
    l[2].style.display = "block"
    l[2].style.animationDelay = "1.5s";
    l[3].style.display = "block"
    l[3].style.animationDelay = "2s";
    l[3].style.display = "block"
    l[3].style.animationDelay = "2.5s";
}

animate()


async function UpdateExistence(user_exists) {
    if (!user_exists) {
        await sleep(10)
        let t = document.getElementsByClassName("typed-text")
        let r = document.getElementsByClassName("form2-input")
        await initTypedElement(t[4])

        r[0].style.display = "block"
        r[1].style.animationDelay = "0.5s"
        r[1].style.display = "block"
        r[2].style.minWidth = "30%"
        r[2].style.animationDelay = "1s"
        r[2].style.display = "block"
        await sleep(1000)
        await initTypedElement(t[5])
        create_user(firstName, lastName, email, engineChoice);
    } else {
        await form2_submit();
    }
}

async function form1_submit() {
    let inputs = document.getElementsByClassName("form1-input")
    firstName = inputs[0].value
    lastName = inputs[1].value
    email = inputs[2].value
    inputs[0].style.display = "none";
    inputs[1].style.display = "none";
    inputs[2].style.display = "none";
    inputs[3].style.display = "none";
    document.getElementsByClassName("typed-text")[3].style.display = "none"

    update_user_existence(firstName, lastName, email);
}


async function form2_submit() {
    console.log(firstName, lastName, email, engineChoice)

    let body = document.getElementsByTagName("body")[0]

    body.innerHTML = "\
        <div class='overlay'></div>\
        <div class='main-container'>\
            <h1 class='typed-text extra-bold white'>Ok let's get started!</h1>\
        </div>"
    let h1 = document.getElementsByTagName("h1")[0]
    await initTypedElement(h1)
    await sleep(2000)
    h1.style.animation = "3s ease fadeOut"
    body.style.opacity = "0"
    await sleep(5000)

    // PYTHON FUNCTIONS HERE
    close_browser();
}


function radio_click(button) {
    let id = button.id
    if (id === "chromium") {
        engineChoice = "chromium"
        document.getElementById("skylon").className = "choice unchecked form2-input"
    } else if (id === "skylon") {
        engineChoice = "skylon"
        document.getElementById("chromium").className = "choice unchecked form2-input"
    }
    document.getElementById(id).className = "choice checked form2-input"
}
