const render = (days, hours, minutes, seconds) => {
    let dHTML = document.querySelector('#days');
    let hHTML = document.querySelector('#hours');
    let mHTML = document.querySelector('#minutes');
    let sHTML = document.querySelector('#seconds');

    renderDays = "";
    if (days < 10) {renderDays = `0${days}`;}
    else {renderDays = days;}

    renderHours = "";
    if (hours < 10) {renderHours = `0${hours}`;}
    else {renderHours = hours;}

    renderMinutes = "";
    if (minutes < 10) {renderMinutes = `0${minutes}`}
    else {renderMinutes = minutes;}

    renderSeconds = "";
    if (seconds < 10) {renderSeconds = `0${seconds}`}
    else {renderSeconds = seconds;}

    dHTML.innerHTML = renderDays;
    hHTML.innerHTML = renderHours;
    mHTML.innerHTML = renderMinutes;
    sHTML.innerHTML = renderSeconds;
}

function timeForEvent() {
    let now = Date.now();
    // Pattern of Date object 'December 17, 1995 03:24:00'
    let date_event = new Date ('November 7, 2024 10:00:00').valueOf();
    let remaining_time = date_event - now;
    return remaining_time;
}

interval = setInterval(() => {
    let remaining_time = timeForEvent();
    console.log(remaining_time)
    let d = Math.floor(remaining_time / (1000 * 60 * 60 * 24));
    let h = Math.floor(remaining_time % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    let m = Math.floor((remaining_time % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((remaining_time % (1000 * 60)) / (1000));

    render(d, h, m, s);

    // if (s == 0) {
    //     s = 59;
    //     if (m == 0) {
    //         m = 59; 
    //         if(h == 0) {
    //             h = 59;
    //             if (d == 0){
    //                 d = 0;
    //             }
    //             else {
    //                 d -= 1;
    //             }
    //         }
    //         else {
    //             h -= 1
    //         }
    //     }
    //     else {
    //         m -= 1
    //     }
    // }
    // else {
    //     s -= 1;
    // }
    // if (d == 0 && h == 0 && m == 0 && s == 0) {
    //     clearInterval(interval);
    // }
}, 1000);

const form = document.querySelector('#formulario-inscricao');
const nome = document.querySelector('#nome');
const email = document.querySelector('#email');
const telefone = document.querySelector('#telefone');
const botaoInscricao = document.querySelector('#botao-inscricao');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    validateInputs();
});

function sendEmail (nomeTo, emailTo) {
    (function () {
        emailjs.init("EB-ziwQ01prP2hdjZ");
    })();

    var params = {
        email: emailTo,
        nome: nomeTo
    }

    var serviceID = "service_ityh2wr";
    var templateID = "template_40uj405";

    emailjs.send(serviceID, templateID, params)
    .then ( res => {
      alert("Email send!")  
    })
    .catch();
}
const setError = (element, text) => {
    const controleCampos = element.parentElement;
    const mostrarErro = controleCampos.querySelector('.error');
    mostrarErro.innerHTML = text;
}

const setSuccess = element => {
    const controleCampos = element.parentElement;
    const mostrarErro = controleCampos.querySelector('.error');
    mostrarErro.innerHTML = '';
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const isValidTelefone = telefone => {
    const re = /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
    return re.test(String(telefone).toLowerCase());
}

const validateInputs = () => {
    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const telefoneValue = telefone.value.trim();
    let isAllValid = true;
    
    if (nomeValue == '' || nomeValue == null) {
        isAllValid = false;
        setError(nome, 'Informe seu nome!');
    }
    else {
        setSuccess(nome);
    }

    if (emailValue == '' || emailValue == null) {
        isAllValid = false;
        setError(email, 'Informe seu email!');
    }
    else if (!isValidEmail(emailValue)) {
        isAllValid = false;
        setError(email, 'Email inválido!');
    }
    else {
        setSuccess(email);
    }

    if (telefoneValue == '' || telefoneValue == null) {
        isAllValid = false;
        setError(telefone, 'Informe seu telefone!')
    }
    else if (!isValidTelefone(telefoneValue)) {
        isAllValid = false;
        setError(telefone, 'Telefone inválido!');
    }
    else {
        setSuccess(telefone);
    }
    
    if (isAllValid == true) {
        sendEmail(nomeValue, emailValue);
    }

}