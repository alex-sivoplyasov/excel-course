console.log('Настейка мурлейка');
const header = document.querySelector('.excel__header');
header.addEventListener('click', (e) => {
    if ( e.target.classList.contains('material-icons')) {
        e.target.parentElement.classList.toggle('active')
    }
})
