var ano = document.getElementById('idade')
var res = document.querySelector('div#resultado')
var data = new Date()
var anoatual = data.getFullYear()
var imagem = document.getElementById('imagem')
var sexo = document.getElementsByName('sexo')



function verificar(){
    var nasc = Number(ano.value)
    var  idade = anoatual - nasc
    var genero =''
    
    if(sexo[0].checked){
        genero ='Masculino'
        if(idade <=14){
        imagem.src= 'imagens/crianca_m.png'
        res.innerHTML =`Você é uma Criança de ${idade} Anos do sexo ${genero}`
    }else if(idade <=24){
        genero ='Masculino'
        imagem.src= 'imagens/jovem.png'
     res.innerHTML =`Você é um Jovem de ${idade} Anos do sexo ${genero}`
    }else if(idade <=64){
        genero ='Masculino'
        imagem.src= 'imagens/adulto_m.png'
     res.innerHTML =`Você é um Adulto de ${idade} Anos do sexo ${genero}`
    }else{
        genero ='imagens/Masculino'
        imagem.src= 'idoso_m.png'
     res.innerHTML =`Você é um Idoso de ${idade} Anos do sexo ${genero}`
    }
}else {
    genero='Feminino'
    if(idade <=14){
        imagem.src= 'imagens/crianca_f.png'
        res.innerHTML =`Você é uma Criança de ${idade} Anos do sexo ${genero}`
    }else if(idade <=24){
        genero='Feminino'
        imagem.src= 'imagens/jovem_f.png'
     res.innerHTML =`Você é uma Jovem de ${idade} Anos do sexo ${genero}`
    }else if(idade <=64){
        genero='Feminino'
        imagem.src= 'imagens/adulto_f.png'
     res.innerHTML =`Você é uma Adulta de ${idade} Anos do sexo ${genero}`
    }else{
        genero='Feminino'
        imagem.src= 'imagens/idoso_f.png'
     res.innerHTML =`Você é uma Idosa de ${idade} Anos do sexo ${genero} `
    }

}
}