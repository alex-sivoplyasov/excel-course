const table = document.querySelector('.excel__table')
// const selectedCell = table.querySelector('.cell.selected')

table.addEventListener('click', (e) => {
    if (e.target.classList.contains('cell')) {
        const selectedCell = table.querySelector('.cell.selected')
        selectedCell.classList.remove('selected')
        e.target.classList.add('selected')
    }
})
