// Operador lógico que retorna com dados salvos, ou string vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()
const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
// Declare um array de nome itens:
const itens = JSON.parse(localStorage.getItem("itens")) || []

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach((elemento) => {
    criaElemento(elemento)
})

// Refatoração do addEventListener para receber as funções extras da função criaElemento
// Evento de interação com o usuário que recebe os dados passados utilizando inputs do projeto base:
form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    // 2) Crie variáveis para acessar os valores enviados:
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    //  Const para conferir elemento nome no array itens 
    const existe = itens.find(elemento => elemento.nome === nome.value)

    //    Transforme a variável já criada, itemAtual, em um objeto object que receba os valores de nome e quantidade, e transforme os valores estes valores em string:
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    // Condicional para conferir se o elemento 
    if (existe){
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

//Refatoração da condicional if else, atualizando um id para cada item
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0; 
        // Refatoração do código para que após o envio de itens, o formulário fique vazio:
        criaElemento(itemAtual)

        //    Insira a variável itemAtual nesse array itens, utilizando o método push:
        itens.push(itemAtual)
    }

    
    localStorage.setItem('itens', JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""

})

// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 
// Função que recebe esses os dados de item e quantidade, e retorne adicionando-os na lista ul, estilizados com a tag strong.
function criaElemento(item){
   const novoItem = document.createElement('li')
   novoItem.classList.add('item')

   const numeroItem = document.createElement('strong')
   numeroItem.innerHTML = item.quantidade
   numeroItem.dataset.id = item.id

   novoItem.appendChild(numeroItem)
   novoItem.innerHTML += item.nome

   novoItem.appendChild(botaoDeleta(item.id))

   lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

//Função para criar botão com evento de click nos itens, e retornar os itens clicados
function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = "X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

//Função para deletar os itens enviados da função botaoDeleta no array de itens e no navegador
function deletaElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem('itens', JSON.stringify(itens))
}

