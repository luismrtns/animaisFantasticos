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
// galeria
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
// zoom imagens
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

//menu lateral mobile
function initMenuMobile(){
    const btn = document.getElementById('btnMenu')
    const menu = document.getElementById('navMenu')
    const overlay = document.getElementById('overlay')

    btn.addEventListener('click', () => {
        menu.classList.remove('translate-x-full')
        overlay.classList.remove('hidden')
    })

    overlay.addEventListener('click', () => {
        menu.classList.add('translate-x-full')
        overlay.classList.add('hidden')
    })
}
initMenuMobile()

function initCicloVida(){
    const animalImg = document.getElementById('animalEscolha')
    const texto = document.querySelector('.ciclo-animal p')

    const animais = document.querySelectorAll('[data-animal]')
    const fases = document.querySelectorAll('[data-fase]')

    let animalAtual = 'raposa'
    let faseAtual = 'filhote'

    const data = {
        raposa: {
            filhote: {
                img: 'img/raposaFilho.jpg',
                text: 'Filhotes de raposa são curiosos e passam boa parte do tempo explorando o ambiente ao redor. Dependem totalmente da mãe nos primeiros meses. Brincadeiras ajudam no desenvolvimento de habilidades de caça. Vivem escondidos em tocas para proteção. Aprendem rápido observando os adultos.'
            },
            adulto: {
                img: 'img/raposa.jpg',
                text: 'Raposas adultas são ágeis, inteligentes e excelentes caçadoras. Possuem hábitos geralmente solitários e noturnos. Alimentam-se de pequenos animais, frutas e insetos. São muito adaptáveis a diferentes ambientes. Usam astúcia para sobreviver.'
            }
        },
        macaco: {
            filhote: {
                img: 'img/macacoFilho.jpg',
                text: 'Filhotes de macaco vivem agarrados à mãe e aprendem por imitação. São muito brincalhões e sociáveis. Desenvolvem habilidades motoras ao interagir com o grupo. Dependem da proteção dos adultos. O aprendizado social é essencial nessa fase.'
            },
            adulto: {
                img: 'img/macaco.jpg',
                text: 'Macacos adultos vivem em grupos organizados e complexos. Possuem comunicação avançada e forte interação social. Alimentam-se de frutas, folhas e pequenos animais. Demonstram comportamentos cooperativos. Cada indivíduo tem um papel no grupo.'
            }
        },
        leao: {
            filhote: {
                img: 'img/leaoFilho.jpg',
                text: 'Filhotes de leão são ativos e passam muito tempo brincando entre si. Essas brincadeiras simulam situações de caça. Dependem das fêmeas do grupo para alimentação e proteção. Permanecem próximos da alcateia. Aprendem hierarquia desde cedo.'
            },
            adulto: {
                img: 'img/leao.jpg',
                text: 'Leões adultos vivem em grupos chamados alcateias. As fêmeas caçam enquanto os machos defendem o território. São predadores fortes e estratégicos. Trabalham em equipe para capturar presas. Demonstram comportamento social estruturado.'
            }
        },
        gato: {
            filhote: {
                img: 'img/gatoFilho.jpg',
                text: 'Gatinhos são extremamente curiosos e cheios de energia. Brincam constantemente para desenvolver coordenação e reflexos. Dependem da mãe nas primeiras semanas. Gostam de explorar pequenos espaços. Aprendem hábitos rapidamente.'
            },
            adulto: {
                img: 'img/gato.jpg',
                text: 'Gatos adultos são independentes e territoriais. Possuem excelente agilidade e instinto de caça. Costumam ser mais tranquilos, mas ainda brincalhões. Adaptam-se bem a ambientes domésticos. Demonstram comportamento seletivo com humanos.'
            }
        },
        cachorro: {
            filhote: {
                img: 'img/cachorroFilho.jpg',
                text: 'Filhotes de cachorro são sociáveis, brincalhões e cheios de energia. Estão em fase de aprendizado constante. Precisam de atenção, cuidado e treinamento básico. Criam vínculos fortes com humanos. Exploradores por natureza.'
            },
            adulto: {
                img: 'img/cachorro.jpg',
                text: 'Cães adultos são leais, protetores e companheiros. Desenvolvem personalidade conforme a criação. Podem ser treinados para diversas funções. Gostam de rotina e interação. Demonstram forte ligação emocional com seus donos.'
            }
        }
    }

    function atualizarImg(){
        const info = data[animalAtual][faseAtual]
        animalImg.classList.add('opacity-0', 'scale-95')
        texto.classList.add('opacity-0', 'translate-y-2')
        setTimeout(() => {
            animalImg.src = info.img
            texto.textContent = info.text

            animalImg.classList.remove('opacity-0', 'opacity-95')
            texto.classList.remove('opacity-0', 'translate-y-2')
        }, 250)
    }

    animais.forEach((animal) => {
        animal.addEventListener('click', () => {
            animais.forEach(a => {
                a.classList.remove('bg-[#111]', 'shadow-[3px_3px_0_rgba(0,0,0,1)]')
                a.classList.add('bg-[#222]')
            })
            animal.classList.remove('bg-[#222]')
            animal.classList.add('bg-[#111]', 'shadow-[3px_3px_0_rgba(0,0,0,1)]')

            animalAtual = animal.dataset.animal
            atualizarImg()
        })
    })

    fases.forEach(fase => {
        fase.addEventListener('click', () => {
            fases.forEach(f => {
                f.classList.remove('bg-[#E54]', 'text-[#faf6ed]', 'shadow-[3px_3px_0_rgba(0,0,0,1)]')
                f.classList.add('bg-[#FB5]', 'text-black')
            })
            fase.classList.remove('bg-[#FB5]', 'text-black')
            fase.classList.add('bg-[#E54]', 'text-[#faf6ed]', 'shadow-[3px_3px_0_rgba(0,0,0,1)]')
            faseAtual = fase.dataset.fase
            atualizarImg()
        })
    })

    animais[0].classList.remove('bg-[#222]')
    animais[0].classList.add('bg-[#111]', 'shadow-[3px_3px_0_rgba(0,0,0,1)]')
    fases[0].classList.add(
        'bg-[#E54]',
        'text-[#faf6ed]',
        'shadow-[3px_3px_0_rgba(0,0,0,1)]'
    )

    atualizarImg()
}
initCicloVida()
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