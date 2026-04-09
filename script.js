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
