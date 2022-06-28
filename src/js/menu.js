!(function () {
		const burger = document.querySelector('.js-menu-burger')
		const menu = document.querySelector('.js-menu')
		const layout = menu.querySelector('.js-menu-layout')
		const content = layout.querySelector('.js-menu-content')

		burger.addEventListener('click', () => {
				menu.classList.toggle('menu-hidden')
		})
		layout.addEventListener('click', () => {
				menu.classList.add('menu-hidden')
		})
		content.addEventListener('click', (e) => {
				e.stopPropagation()
		})
}())
