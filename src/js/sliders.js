!(function () {
		// warehouse sliders
		const bp = {
				tablet: 768,
				notebook: 992,
		}

		const warehouseSwiperSmall = new Swiper('.js-warehouse-swiper-small', {
				slidesPerView: 5.2,
				breakpoints: {
						[bp.tablet]: {
								slidesPerView: 7,
						},
				},
		})

		const warehouseSwiperBig = new Swiper('.js-warehouse-swiper-big', {
				effect: 'fade',
				speed: 1000,
				navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
				},
				thumbs: {
						swiper: warehouseSwiperSmall,
				},
		})

		//	thanks letters slider
		const thanksLettersSwiper = new Swiper('.js-thanks-letter-slider', {
				slidesPerView: 1.2,
				loop: true,
				zoom: {
						maxRatio: 1.8,
						minRatio: 1,
				},
				breakpoints: {
						[bp.tablet]: {
								slidesPerView: 2.8,
						},
						[bp.notebook]: {
								slidesPerView: 3,
						},
				},
				navigation: {
						nextEl: '.js-thanks-letters__btn-right',
						prevEl: '.js-thanks-letters__btn-left',
				},
		})
}())
