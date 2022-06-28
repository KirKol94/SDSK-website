!(function () {
		const modal = document.querySelector('.js-modal')
		const overlay = modal.querySelector('.js-modal-overlay')
		const content = overlay.querySelector('.js-modal-content')
		const close = content.querySelectorAll('.js-modal-close-trigger')

		overlay.addEventListener('click', () => {
				modal.classList.add('modal__hidden')
		})

		content.addEventListener('click', (e) => {
				e.stopPropagation()
		})

		close.forEach((btn) => {
				btn.addEventListener('click', (e) => {
						e.preventDefault()
						modal.classList.add('modal__hidden')
				})
		})
}())
