//Não permitir que a página recarregue
window.addEventListener("beforeunload", function(e){
  e.preventDefault()
 })

//Resetando os valores dos forms ao recarregar a página
 window.addEventListener("beforeunload", function(){
    comentario.value = "";
    inputImagem.value = "";
 })

 let urlImage
 const campoImagem = document.getElementsByClassName("post-imagem")

//Fazer a caixa de texto aparecer ao clicar no botão
const addPost = document.getElementsByClassName("plus")[0];
const modal = document.getElementsByClassName("post-modal")[0];
addPost.addEventListener("click", abre);
function abre (){
    modal.style.display = "flex";
}

//Fazer a caixa de texto sumir ao clicar fora dela
modal.addEventListener('click', function(e) {
  if (e.target == this) fecha();
});
function fecha() {
  modal.style.display = 'none';
}

//Preview da imagem
const inputImagem = document.querySelector("#campo-foto");
inputImagem.addEventListener("change", carregaImagem)
const img = document.createElement('img');
const containerImagem = document.querySelector(".container-imagem");

function carregaImagem(e){
  urlImage = e.target.files[0].name;
  img.setAttribute("src", `${urlImage}`);
  img.classList.add("imagem-form");
  inputImagem.style.display = 'none';
  containerImagem.appendChild(img);
}

//Criando postagem
const comentario = document.getElementsByClassName("comentario-form")[0];
const btnPostar = document.getElementsByClassName("postar")[0];
const secaoPosts = document.querySelector(".secao-posts");

btnPostar.addEventListener("click", criarPost);

function criarPost(){
const post = document.createElement("article");
post.className = "post";
post.innerHTML = `<article class="post">
<div class="post-info">
  <div class="usuario-info">
    <div class="avatar"></div>
    <div class="nome-hora">
      <p class="nome">Joana da Silva Peixoto</p>
      <p class="hora">00 horas atrás</p>
    </div>
  </div>
  <p class="comentario">
  ${comentario.value}
  </p>
</div>
<img class="post-imagem" src="${urlImage}" alt="" />
<div class="post-interacoes">
  <div class="container-like">
    <img class="like-btn" src="like.svg" alt="like" />
    <p class="descricao-like">Curtir</p>
  </div>
  <div class="container-coment">
              <img class="coment-btn" src="comentario.svg" alt="like" />
              <p class="descricao-comentario">Comentários</p>
            </div>
          </div> `
    

    secaoPosts.appendChild(post);
    modal.style.display = 'none';

    //Resetando valores dos inputs:
    img.setAttribute("src", "");
    img.style.display='none'
    inputImagem.style.display = 'block';
    comentario.value = "";
    inputImagem.value = "";
    urlImage = '';
    
    //Evento de curtir
    eventoCurtir()
}

//Interação curtir
const btnCurtir = document.getElementsByClassName("like-btn");
const descricao = document.getElementsByClassName("descricao-like");
const campoLike = document.getElementsByClassName("container-like");

function eventoCurtir() {
  for (let i = 0; i < btnCurtir.length; i++) {
    btnCurtir[i].addEventListener("click", curtir);
  }
}
function curtir(btnCurtir) {
    
  var txtCurtir = Array.from(document.getElementsByClassName("descricao-like"))
  if (btnCurtir.target.classList.contains("curtido")) {
    btnCurtir.target.src = "like.svg";
  } else {
    btnCurtir.target.src = "like-solid.svg";
  }
  btnCurtir.target.classList.toggle("curtido");
    for (let i = 0; i < txtCurtir.length; i++)
        if ( txtCurtir[i].textContent == 'Curtir') {
            txtCurtir[i].textContent = 'Descurtir'
        } else if (txtCurtir[i].textContent == 'Descurtir') {
            txtCurtir[i].textContent = 'Curtir'
        }
}