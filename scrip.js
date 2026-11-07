const inputCep = document.getElementById('cep');
const btnBuscar = document.getElementById('btnBuscar');

btnBuscar.addEventListener('click', async function() {
    let cep = inputCep.value.replace(/\D/g, ''); 

    if (cep.length !== 8) {
        alert('CEP inválido! Digite 8 números.');
        return;
    }

    document.getElementById('rua').value = 'Carregando...';
    document.getElementById('bairro').value = 'Carregando...';
    document.getElementById('cidade').value = 'Carregando...';
    document.getElementById('estado').value = 'Carregando...';

    let url = `https://viacep.com.br/ws/${cep}/json/`;

    try {
        let resposta = await fetch(url);
        let dados = await resposta.json();

        if (dados.erro) {
            alert('CEP não encontrado!');
            limparCampos();
            return;
        }

        document.getElementById('rua').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = dados.localidade;
        document.getElementById('estado').value = dados.uf;

    } catch (erro) {
        alert('Ocorreu um erro ao buscar o CEP.');
        console.log(erro);
        limparCampos();
    }
});

function limparCampos() {
    document.getElementById('rua').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}