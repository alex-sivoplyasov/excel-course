export function createToolbar() {
    const buttons = [
        {
            icon: 'format_align_left',
            active: true,
            value: {'textAlign': 'left'}
        },
        {
            icon: 'format_align_center',
            active: false,
            value: {'textAlign': 'center'}
        },
        {
            icon: 'format_align_right',
            active: false,
            value: {'textAlign': 'right'}
        },
        {
            icon: 'format_bold',
            active: false,
            value: {'fontWeight': 'bold'}
        },
        {
            icon: 'format_italic',
            active: false,
            value: {'fontStyle': 'italic'}
        },
        {
            icon: 'format_underline',
            active: false,
            value: {'textDecoration': 'underline'}
        }
    ]
    return buttons.map(toButton).join('')
}

export function toButton(button) {
    const json = JSON.stringify(button.value)
    const meta = `
        data-type="button"
        data-value='${json}'
    `
    return `
                <div class="button ${button.active ? 'active' : ''}" ${meta}>
                    <span class="material-icons" ${meta}>${button.icon}</span>
                </div>
            `
}
