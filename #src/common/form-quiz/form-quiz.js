let formQuiz = document.querySelector('.form-quiz');
if(formQuiz) {
    let dataSlider = new Swiper(formQuiz.querySelector('.swiper-container'), {
        effect: 'fade',
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoHeight: true,
        speed: 800,
        watchOverflow: true,
        touchRatio: 0,
        pagination: {
        	el: formQuiz.querySelector('.swiper-pagination'),
            type: "progressbar",
        	clickable: true,
        },
    });

    // form buttons handler ===
    let formButtons = formQuiz.querySelectorAll('button[data-slide-to]');
    if(formButtons.length) {
        formButtons.forEach(button => {
            button.addEventListener('click', () => {
                let value = button.dataset.slideTo;
                if(value === 'next') {
                    dataSlider.slideNext();
                } else {
                    dataSlider.slideTo(value)
                }
            })
        })
    }
    // and form buttons handler ===
}