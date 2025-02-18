const faixaElements = document.querySelectorAll('.faixa');
const seletorClass = document.querySelectorAll('.seletor');

let resistorOptionCores = document.getElementById('wrapper-resistor-cor');
let resistorOptionValor = document.getElementById('wrapper-resistor-valor');

let faixasCores = [];

faixaElements.forEach(element => {
    faixasCores.push(element.classList[1]);
});
let resistor = new Resistor(faixasCores);

let resistorValores = new Resistor([],1000)

function handleMenuOption(element) {
    const menuOptions = document.querySelectorAll('.menu-option');

    menuOptions.forEach(option => {
        if (option !== element) {
            option.classList.remove('active');
        }
        else {
            element.classList.toggle('active');
        }
    });

    if (element.id !== 'menu-option-cor') {
        resistorOptionCores.style.display = 'none';
        resistorOptionValor.style.display = 'flex';
    }
    else {
        resistorOptionCores.style.display = 'flex';
        resistorOptionValor.style.display = 'none';
    }
}


function removeActiveClass(elements, keepElement) {
    elements.forEach(element => {
        if (element !== keepElement){
            element.classList.remove('active');
        }
        else {
            element.classList.toggle('active');
        }
    });
}


function handleClickFaixa(element) {
    removeActiveClass(faixaElements, element);
}


function changeFaixaColor(element, faixaClass, colorName) {
    element.classList.replace(element.classList[1], faixaClass);
    element.firstElementChild.textContent = colorName;
    resistor.updateFaixaCor([...faixaElements].map(element => element.classList[1]))
    updateValueText();

}

function updateValueText() {
    let valor = resistor.getValor()
    document.getElementById('texto-valor').textContent = `${valor.valor} ${valor.prefixo}Ω`;
    document.getElementById('texto-tolerancia').textContent = "± " + valor.tolerancia + "%";
}



function handleChangePrefixo(prefixo) {
    resistorValores.updatePrefixo(prefixo)
    let faixas = resistorValores.getFaixas()   
    updateFaixasResistor(faixas);
}

document.addEventListener('click', (event) => {
    if (![...faixaElements].some(element => element.contains(event.target))) {
        removeActiveClass(faixaElements, null);
    }
});

seletorClass.forEach(element => {
    element.addEventListener('click', () => {
        changeFaixaColor(element.offsetParent.parentElement, element.classList[1], element.textContent);
    });
});


updateValueText();


function updateFaixasResistor(faixas) {
    let faixasElement = document.querySelectorAll('.res-valor');
    console.log(faixas)
    faixasElement.forEach((element, i) => {
        let faixa = faixas[i];
        if (faixa === null){
            faixa = 'sem-cor';
        }
        element.classList.replace(element.classList[2], faixa);
        element.firstElementChild.textContent = faixa.charAt(0).toUpperCase() + faixa.slice(1)
    });
}

function handleInputValorResistor(valor){
    resistorValores.updateValor(valor);
    let faixas = resistorValores.getFaixas()   
    updateFaixasResistor(faixas);
}

function handleChangeTolerancia(tolerancia) {
    resistorValores.updateTolerancia(Number(tolerancia))
    let faixas = resistorValores.getFaixas();
    updateFaixasResistor(faixas);
}

let faixas = resistorValores.getFaixas();
updateFaixasResistor(faixas);