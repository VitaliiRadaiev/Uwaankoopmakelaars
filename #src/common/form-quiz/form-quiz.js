function fromButtonsHandler(buttons, dataSlider) {
    if (buttons.length) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                let value = button.dataset.slideTo;
                if (value === 'next') {
                    dataSlider.slideNext();
                } else if (value === 'prev') {
                    dataSlider.slidePrev();
                } else if (value === 'disabled') {
                    return;
                } else {
                    dataSlider.slideTo(value)
                }
            })
        })
    }
}
function showElAfterChangeInput(elements, callback) {
    if (elements.length) {
        elements.forEach(input => {
            let el = document.querySelector(input.dataset.showEl);
            if (el) {
                input.addEventListener('change', () => {
                    if (input.checked) {
                        el.style.display = 'block';

                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                })
            }

        })
    }
}
function hideElAfterChangeInput(elements, callback) {
    if (elements.length) {
        elements.forEach(input => {
            let el = document.querySelector(input.dataset.hideEl);
            if (el) {
                input.addEventListener('change', () => {
                    if (input.checked) {
                        el.style.display = 'none';

                        if (typeof callback === 'function') {
                            callback();
                        }
                    }
                })
            }
        })
    }
}



let popupWrapper = document.querySelector('.popup-wrapper');
if (popupWrapper) {
    document.body.append(popupWrapper);
}

let formQuiz = document.querySelector('.form-quiz');
if (formQuiz) {
    let sliderStart = formQuiz.querySelector('.slider-start.swiper-container');
    let dataSliderStart;
    if (sliderStart) {
        dataSliderStart = new Swiper(sliderStart, {
            effect: 'fade',
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: true,
            speed: 300,
            watchOverflow: true,
            touchRatio: 0,
            pagination: {
                el: formQuiz.querySelector('.slider-start.swiper-container > .swiper-pagination'),
                type: "progressbar",
                clickable: true,
            },
        });

        let firstSlideButton = sliderStart.querySelector('.form-quiz__item.first button[data-slide-to]');
        if (firstSlideButton) {
            fromButtonsHandler([firstSlideButton], dataSliderStart);
        }

        let firstSlideButtonPrev = sliderStart.querySelectorAll('button[data-slide-to].first-slider');
        if (firstSlideButtonPrev.length) {
            fromButtonsHandler(firstSlideButtonPrev, dataSliderStart);
        }
    }

    let stepSliders = formQuiz.querySelectorAll('.swiper-container.swiper-slide');
    if (stepSliders.length) {
        stepSliders.forEach(slider => {
            let dataSlider = new Swiper(slider, {
                effect: 'fade',
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                // initialSlide: 2, // delet
                spaceBetween: 0,
                autoHeight: true,
                speed: 300,
                watchOverflow: true,
                touchRatio: 0,
                pagination: {
                    el: slider.querySelector('.swiper-pagination'),
                    type: "progressbar",
                    clickable: true,
                },
            });

            const updateSliders = () => {
                let id = setInterval(() => {
                    dataSliderStart.update();
                    dataSlider.update();
                }, 20);
                setTimeout(() => {
                    clearInterval(id);
                }, 800)
            }

            let inputShowElAll = slider.querySelectorAll('input[data-show-el]');
            showElAfterChangeInput(inputShowElAll, updateSliders);

            let inputHideElAll = slider.querySelectorAll('input[data-hide-el]');
            hideElAfterChangeInput(inputHideElAll, updateSliders);

            let buttons = slider.querySelectorAll('button[data-slide-to]:not(.first-slider)');
            if (buttons.length) {
                fromButtonsHandler(buttons, dataSlider);
                buttons.forEach(button => {
                    button.addEventListener('click', updateSliders);
                })
            }

            let dateInput = slider.querySelector('input.date-input');
            let finalText = document.querySelector('.final-text');
            if (dateInput) {
                let picker = datepicker(dateInput, {
                    formatter: (input, date, instance) => {
                        const value = date.toLocaleDateString();
                        input.value = value;
                    },
                    alwaysShow: true,
                    minDate: new Date(),
                    onSelect: (instance, date) => {
                        finalText.innerText = `Dankuwel. Wij zien u graag de ${dateInput.value}. Tot dan!`;
                    }
                });
            }
        })
    }
}

let inputChangeNextSlide = document.querySelectorAll('input[data-change-next-slide]');
if (inputChangeNextSlide.length) {
    inputChangeNextSlide.forEach(input => {
        let value = input.dataset.changeNextSlide;
        let button = input.closest('.form-quiz__item').querySelector('button[data-slide-to]:not(.prev)');
        input.addEventListener('change', () => {
            if (input.checked) {
                button.dataset.slideTo = value;
                button.removeAttribute('disabled');
            }
        })
    })
}

let inputSetNextSlideValue = document.querySelectorAll('input[data-set-next-slide-value-by-id]');
if (inputSetNextSlideValue.length) {
    inputSetNextSlideValue.forEach(input => {
        const [id, value] = input.dataset.setNextSlideValueById.split(',').map(i => i.trim());
        const button = document.querySelector(id);
        if (button) {
            input.addEventListener('change', () => {
                if (input.checked) {
                    button.dataset.slideTo = value;
                }
            })
        }
    })
}

let inputChangeButtonType = document.querySelectorAll('input[data-change-button-type]');
if (inputChangeButtonType.length) {
    inputChangeButtonType.forEach(input => {
        const [id, value] = input.dataset.changeButtonType.split(',').map(i => i.trim());
        const button = document.querySelector(id);
        if (button) {
            input.addEventListener('change', () => {
                if (input.checked) {
                    button.setAttribute('type', value);
                }
            })
        }
    })
}


let setValueInputHidden = document.querySelectorAll('.form-quiz input[type="radio"]');
if(setValueInputHidden.length) {
    setValueInputHidden.forEach(input => {
        let inputHidden = document.querySelector(`input[type="hidden"][name="${input.name}"]`);
        if(inputHidden) {
            input.name = input.name + '_not-use';
            input.addEventListener('change', () => {
                if (input.checked) {
                    inputHidden.value = input.value;
                }
            })
        }
    })
}
