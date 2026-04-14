// evento de zoom na imagem seguindo o mouse
const zoomContainers = document.querySelectorAll('.zoom-container');

zoomContainers.forEach((container) => {

    const imgZoom = container.querySelector('.zoom-img');

    container.addEventListener('mousemove', (event) => {
        const {left, top, width, height} = container.getBoundingClientRect();

        const x = event.clientX - left;
        const y = event.clientY - top;

        const percentX = (x / width) * 100;
        const percentY = (y / height) * 100;

        imgZoom.style.transformOrigin = `${percentX}% ${percentY}%`;
    });
});

// const linksInternos = document.querySelectorAll('a[href^="#"]')
// console.log(linksInternos);
//
// function clickLink(event){
//     event.preventDefault();
//     linksInternos.forEach((link) => {
//         link.classList.remove('ativo');
//     })
//     let clicado = event.currentTarget
//     clicado.classList.add('ativo')
// }
//
// linksInternos.forEach((link) => {
//     link.addEventListener('click', clickLink)
// })

// função pra iniciar a navegação por tabs
function initTabNav(){
    const tabMenu = document.querySelectorAll('.js-tabMenu li')
    const tabContent = document.querySelectorAll('.js-tabContent section')

    if(tabMenu.length && tabContent.length){
        tabContent[0].classList.add('ativo')

        function activeTab(index){
            tabContent.forEach((section) => {
                section.classList.remove('ativo');
            })
            tabContent[index].classList.add('ativo');
        }

        tabMenu.forEach((itemMenu, index) => {
            itemMenu.addEventListener('click', () => {
                activeTab(index);
            })
        })
    }
}
initTabNav()

function initAccordion(){
    const accordionNav = document.querySelectorAll('.js-accordion dt');
    const ativo = 'ativo'
    if(accordionNav.length){
        accordionNav[0].classList.add(ativo);
        accordionNav[0].nextElementSibling.classList.add(ativo);

        function activeAccordion(event){
            const clicado = event.currentTarget
            clicado.classList.toggle(ativo)
            clicado.nextElementSibling.classList.toggle(ativo)
        }
        accordionNav.forEach((item) => {
            item.addEventListener('click', activeAccordion)
        })
    }
}
initAccordion()

// modo escuro
function initDarkMode(){
    const btnDark = document.getElementById('btn-dark')
    const htmlElement = document.documentElement

    const temaSalvo = localStorage.getItem('theme')
    if(temaSalvo === 'dark'){
        htmlElement.classList.add('dark')
    }

    const toggleCircle = document.getElementById('toggle-circle')
    const icon = document.getElementById('icon')
    if(localStorage.getItem('theme') === 'dark'){
        htmlElement.classList.toggle('dark')
        toggleCircle.classList.add('translate-x-6')
        icon.src = 'img/fox-face-icon.svg'
    }

    btnDark.addEventListener('click', () => {
        htmlElement.classList.toggle('dark')
        const isDark = htmlElement.classList.contains('dark')
        toggleCircle.classList.toggle('translate-x-6')
        icon.src = isDark ? 'img/fox-face-icon.svg' : 'img/panda-face-color-icon.svg'
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    })
}
initDarkMode()

function initGallery(){
    const botaoFiltro = document.querySelectorAll('.btn-filtro')
    const itensGaleria = document.querySelectorAll('.item-animal')

    botaoFiltro.forEach(botao => {
        botao.addEventListener('click', (event) => {

            botaoFiltro.forEach((btn) => {
                btn.classList.remove('bg-[#E54]', 'text-[#faf6ed]')
                btn.classList.add('bg-[#FB5]', 'text-black')
            })
            const btnClicado = event.currentTarget
            btnClicado.classList.remove('bg-[#FB5]', 'text-black')
            btnClicado.classList.add('bg-[#E54]', 'text-[#faf6ed]')

            const filtroAtivo = btnClicado.getAttribute('data-filtro')
            itensGaleria.forEach((foto) => {
                const categoria = foto.getAttribute('data-categoria')

                if(filtroAtivo === 'todos' || filtroAtivo === categoria){
                    foto.classList.remove('hidden')
                }else{
                    foto.classList.add('hidden')
                }
            })
        })
    })
}
initGallery()

function initImgFull(){
    const itens = document.querySelectorAll('.item-animal')
    const big = document.getElementById('big')
    const bigImg = document.getElementById('big-img')

    itens.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img')
            big.classList.remove('hidden')
            big.classList.add('flex')
            bigImg.src = img.src

            bigImg.classList.add('scale-95', 'opacity-0')
            bigImg.classList.remove('scale-100', 'opacity-100')
            setTimeout(() => {
                bigImg.classList.remove('scale-95', 'opacity-0')
                bigImg.classList.add('scale-100', 'opacity-100')
            }, 10)
        })
    })

    big.addEventListener('click', () => {
        big.classList.add('hidden')
        big.classList.remove('flex')
    })
}

initImgFull()
// const transacao = [
//     {
//         descricao: 'taxa do pão',
//         valor: 'R$ 39',
//     },
//     {
//         descricao: 'taxa do mercado',
//         valor: 'R$ 129',
//     },
//     {
//         descricao: 'recebimento do cliente',
//         valor: 'R$ 99',
//     },
//     {
//         descricao: 'taxa do banco',
//         valor: 'R$ 129',
//     },
// ]
//
// let taxa = 0
// transacao.forEach((item) => {
//     const numeroLimpo = +item.valor.replace('R$ ', '')
//     if(item.descricao.slice(0,4) === 'taxa'){
//         taxa += numeroLimpo
//     }
// })
// console.log(taxa)
//
// const transportes = 'carro;avião;trem;bicicleta'
// console.log(transportes.split(';'))
//
// let html = `<ul>
//                         <li><span>Sobre</span></li>
//                         <li><span>Produtos</span></li>
//                         <li><span>Contato</span></li>
//                        </ul>`
//
// console.log(html.split('span').join('a'))
//
// const frase = 'eu sou corinthians'
// console.log(frase[frase.length-1])
//
// const transacao2 = ['taxa do banco', '    taxa do pão', '   taxa do mercado', 'depósito bancário', 'tarifa especial']
// let taxaTotal = 0
// transacao2.forEach((item) => {
//     if (typeof item === 'string') {
//         const itemFormatado = String(item.toLowerCase().trim());
//
//         if (itemFormatado.includes('taxa')) {
//             taxaTotal++;
//         }
//     }
// });
// console.log(taxaTotal)