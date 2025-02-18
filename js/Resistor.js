class Resistor {
    constructor(faixasCores = [], valor = null) {
        this.faixasCores = faixasCores;
        this.valor = {
            valor: valor,
            tolerancia: 5,
            prefixo: '',
            unidade: 'Ω'
        };
        this.valoresPadrao = valoresResistor;
        this.ordemPrefixo = ['', 'k', 'M', 'G', 'T'];
        this.prefixoPows = [1, 1e3, 1e6, 1e9, 1e12];
    }


    calculaValor() {
        if (this.faixasCores.length < 3) {
            return null;
        }


        if (this.faixasCores.length === 4) {
            const valoresFaixas = this.pegaValoresCor(this.faixasCores);
            let valores = this.calculaValor4Faixas(...valoresFaixas);

            
            let prefixo = '';


            if (valores[0] >= 1e12) {
                valores[0] /= 1e12;
                prefixo = 'T';
            }
            else if (valores[0] >= 1e9) {
                valores[0] /= 1e9;
                prefixo = 'G';
            }
            else if (valores[0] >= 1e6) {
                valores[0] /= 1e6;
                prefixo = 'M';
            }
            else if (valores[0] >= 1e3) {
                valores[0] /= 1e3;
                prefixo = 'k';
            }

            this.valor = {
                valor: valores[0],
                tolerancia: valores[1],
                prefixo: prefixo,
                unidade: 'Ω'
            };

            return this.valor;
        }

        return null;
    }

    pegaValoresCor(faixasCores) {
        return faixasCores.map((cor, i) => {
            let identificador = ['faixa', 'faixa', 'multiplicador', 'tolerancia'][i] || 'faixa';
            return this.valoresPadrao[cor][identificador];
        });
    }

    calculaValor4Faixas(primeiraFaixa, segundaFaixa, multiplicador, tolerancia) {
        const valor = parseInt(`${primeiraFaixa}${segundaFaixa}`) * multiplicador;
        return [valor, tolerancia];
    }

    updateFaixaCor(faixasCores) {
        this.faixasCores = faixasCores;
        return this.calculaValor(); 
    }

     getValor() {
        return (this.calculaValor());
    }


    updatePrefixo(prefixo) {
        this.valor.prefixo = prefixo;

        return this.valor;
    }


    updateValor(valor) {
        this.valor.valor = valor;
    }

    getFaixas() {


        let toleranciaFaixa = Object.keys(this.valoresPadrao).find(cor => this.valoresPadrao[cor].tolerancia === this.valor.tolerancia);
        
        if (this.valor.valor === '') {
            return [null, null, null, toleranciaFaixa];
        }

        let valorTotal = this.valor.valor;
        let prefixo = this.valor.prefixo;

        if (prefixo !== '') {
            const ordemPrefixo = this.ordemPrefixo;
            const prefixoPows = this.prefixoPows;
            const prefixoIndex = ordemPrefixo.indexOf(prefixo);
            valorTotal *= prefixoPows[prefixoIndex];
        }

        const stringValor = valorTotal.toString();

        let primeiroNumerador = parseInt(stringValor[0]);
        let segundoNumerador = parseInt(stringValor[1]);

        var multiplicador = null;
        if (parseInt(stringValor.slice(2)) === 0){
            multiplicador = stringValor.length - 2;
        }

        console.log(multiplicador)

        let primeiraFaixa = Object.keys(this.valoresPadrao).find(cor => this.valoresPadrao[cor].faixa === primeiroNumerador);
        let segundaFaixa = Object.keys(this.valoresPadrao).find(cor => this.valoresPadrao[cor].faixa === segundoNumerador);
        
        let multiplicadorFaixa = null;
        if (multiplicador){
            multiplicadorFaixa = Object.keys(this.valoresPadrao).find(cor => this.valoresPadrao[cor].multiplicador === Math.pow(10, multiplicador));

        }
        return [primeiraFaixa, segundaFaixa, multiplicadorFaixa, toleranciaFaixa];
        
    }

    updateTolerancia(tolerancia) {
        this.valor.tolerancia = tolerancia;
    }
}



const valoresResistor = {
    "preto":{
        "faixa": 0,
        "multiplicador": 1
    },
    "marrom":{
        "faixa": 1,
        "multiplicador": 10,
        "tolerancia": 1,
        "coeficiente": 100
    },
    "vermelho":{
        "faixa": 2,
        "multiplicador": 100,
        "tolerancia": 2,
        "coeficiente": 50
    },
    "laranja":{
        "faixa": 3,
        "multiplicador": 1000,
        "coeficiente": 15
    },
    "amarelo":{
        "faixa": 4,
        "multiplicador": 10000,
        "coeficiente": 25
    },
    "verde":{
        "faixa": 5,
        "multiplicador": 100000,
        "tolerancia": 0.5
    },
    "azul":{
        "faixa": 6,
        "multiplicador": 1000000,
        "tolerancia": 0.25
    },
    "violeta":{
        "faixa": 7,
        "multiplicador": 10000000,
        "tolerancia": 0.1
    },
    "cinza":{
        "faixa": 8
    },
    "branco":{
        "faixa": 9
    },
    "dourado":{
        "multiplicador": 0.1,
        "tolerancia": 5
    },
    "prata":{
        "multiplicador": 0.01,
        "tolerancia": 10
    }
}