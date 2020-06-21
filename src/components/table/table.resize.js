import {$} from '@core/dom';

export default function resizing(event, $root) {
    return new Promise( resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"')
        const type = $resizer.data.resize
        const coords = $parent.getCoords()
        const columnIndex = $parent.data.col
        const cells = $root.findAll(`.cell[data-col="${columnIndex}"]`)
        let delta
        let value

        document.onmousemove = e => {
            if ( type === 'col') {
                delta = e.pageX - coords.right
                value = coords.width + delta
                $resizer.css({right: -delta + 'px'})
            } else {
                delta = e.pageY - coords.bottom
                value = coords.height + delta
                $resizer.css({bottom: -delta + 'px'})
            }

            $resizer.addClass('resizing')
        }

        document.onmouseup = () => {
            document.onmouseup = null
            document.onmousemove = null
            if (type === 'col') {
                $resizer.css({right: 0})
                $parent.css({width: value + 'px'})
                cells.forEach( element => {
                    $(element).css({width: value + 'px'})
                })
            } else {
                $parent.css({height: value + 'px'})
                $resizer.css({bottom: 0})
            }

            $resizer.removeClass('resizing')
            resolve({value, id: type === 'col' ? $parent.data.col : ''})
        }
    })
}
