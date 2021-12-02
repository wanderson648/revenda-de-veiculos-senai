
// salva dados no storage e busca os dados
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_carro')) ?? [];
const setLocalStorage = (dbCarro) => localStorage.setItem('db_carro', JSON.stringify(dbCarro));


// CRUD - READ
const readCarro = ()=> getLocalStorage();


// CRUD - CREATE
const createCarro = function(carro) {
  const dbCarro = getLocalStorage();
  dbCarro.push(carro);
  setLocalStorage(dbCarro); 
}


// faz a busca pelos carros
const pesquisarCarro = function() {
  clearTable();
  const dbCarro = readCarro();

  const pesquisa = {
    marca: document.querySelector('#pesquisar').value,
    modelo: document.querySelector('#pesquisar').value,
    limite: document.querySelector('#limite').value
  };
  

  dbCarro.filter((carro) => {
    return pesquisa.modelo === carro.modelo || pesquisa.marca === carro.marca ||
     pesquisa.limite >= carro.valor;
  }).map((carro, index) => {
   const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <tr>
        <td>${index+1}</td>
        <td>${carro.modelo}</td>
        <td>${carro.marca}</td>
        <td>${carro.ano}</td>
        <td>${carro.valor}</td>
      </tr>
    `;
    document.querySelector('.table > #listaCarros').appendChild(newRow);
  })
} 



//limpa os campos do input
const clearCampos = function() {
  const campos = document.querySelectorAll('.form-control');
  campos.forEach(campo => campo.value = '');
}

// salvar novos valor para o objeto carro
const salvarCarro = function() {
  let modelo = document.querySelector('#marca').value;
  let marca = document.querySelector('#modelo').value;
  let ano = document.querySelector('#ano').value;
  let valor = document.querySelector('#valor').value; 
  
  // verifica se os campos foram preenchidos
  if(modelo === '' || marca === '' || ano === '' || valor === '') {
    alert('preecha todos campos');
  } 
  else {
    // cria um objeto carro
    const carro = {
      modelo,
      marca,
      ano,
      valor
    }
    createCarro(carro); 
    updateTable()
    clearCampos();
  }
}

// limpar tabela e atualizar
const clearTable = function() {
  const rows = document.querySelectorAll('.table > #listaCarros tr');
  rows.forEach(row => row.parentNode.removeChild(row));
}


// função para criar tabela na aplicação
const updateTable = function() {
  const dbCarro = readCarro();
  clearTable();

  dbCarro.forEach((carro, index)=> {
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
      <tr>
        <td>${index+1}</td>
        <td>${carro.modelo}</td>
        <td>${carro.marca}</td>
        <td>${carro.ano}</td>
        <td>${carro.valor}</td>
      </tr>
    `;

    document.querySelector('.table > #listaCarros').appendChild(newRow);
  });
}


updateTable();
document.querySelector('#salvar').addEventListener('click', salvarCarro);
document.querySelector('#buscar').addEventListener('click', pesquisarCarro);
