(function () {
		const form = document.querySelector('.js-feedback-form')

		const modal = document.querySelector('.js-feedback-modal')
		const resultTitle = modal.querySelector('.js-feedback-result')
		const resultDescription = modal.querySelector('.js-feedback-description')
		const successImage = modal.querySelector('.modal-img')

		form.addEventListener('submit', (e) => {
				e.preventDefault()

				const condition = form.name.value === ''
						|| form.email.value === ''
						|| form.message.value === ''
						|| !form.checkIAgree.checked

				if (condition) {
						resultTitle.textContent = 'Что-то не так...'
						resultDescription.textContent = 'Проверьте, отмечена ли галочка?'
						successImage.classList.add('_hidden')
				} else {
						resultTitle.textContent = 'Готово!'
						resultDescription.textContent = 'Данные успешно отправлены'
						successImage.classList.remove('_hidden')

						form.name.value = ''
						form.email.value = ''
						form.message.value = ''
						form.checkIAgree.checked = false
				}

				modal.classList.remove('modal__hidden')
		})
}())
