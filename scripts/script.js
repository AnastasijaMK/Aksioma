$(window).on('load', function () {

    if ($(document).width() > 1200) {

        //Подключение карусели
        $(".result__list--img").each(function () {
            if ($(this).find('img').length > 1) {
                $(this).brazzersCarousel();
                $(this).append('<div class="carousel--nav"></div>');
            }
        });

        //Проверка количества фото и создание такого же количества блоков для прокрутки
        $('.result__list--img').each(function(){
            $(this).find("img").each(function(){
              $(this).closest(".result__list--img").find('.carousel--nav').append('<div></div>')
            });
            $(this).closest(".result__list--img").find(".carousel--nav div:first-child").addClass('active');
        }); 

        //Настройка прокрутки блоков
        $(".result__list--img.brazzers-daddy").mousemove(function() { 
            var photoNumber = $(this).find('.tmb-wrap-table div.active').index();
            var photoNav = $(this).find('.carousel--nav div');
            $(this).find('.carousel--nav div').removeClass('active');
            photoNav[photoNumber].classList.add("active");
        });

        // Клик по навигации в слайдере
        $(".result__list--img.brazzers-daddy .carousel--nav div").on('click', function (e) {
            e.preventDefault();
            var navNumber = $(this).index();
            var photo = $(this).closest('.result__list--img').find('img');
            $(this).closest('.result__list--img').find('img').hide();
            photo[navNumber].style.display = 'block';
            $(this).closest('.carousel--nav').find('div').removeClass('active');
            $(this).addClass('active');
        });

    } else {

        $(".result__list--img").each(function () {
            if ($(this).find('img').length > 1) {

                $(this).slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    touchMove: true,
                    dots: true,
                    arrows: false,
                    cssEase: 'ease',
                    responsive: [
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                infinite: true,
                            }
                        }
                    ]
                });
            }
        });
    }
});


$(document).ready(function () {

    //Активация анимации
    wow = new WOW(
        {
            live: true,
            offset: 100,
        })
    wow.init();


    // Зафиксировать тело страницы и запретить прокрутку
    function fixBody() {
        document.body.setAttribute('data-scroll', document.documentElement.scrollTop);
        document.body.style.position = 'fixed';
    }


    // Разрешить прокрутку тела страницы
    function unfixBody() {
        document.body.style.position = '';
        document.documentElement.scrollTop = document.body.getAttribute('data-scroll');
        document.body.removeAttribute('data-scroll');
    }

    //Форма "Заказать звонок"
    $('.header__top--button, .footer__contacts button, .book-apartment').on('click', function () {
        $('.wrapper__shadow--popup').addClass('active');
        $('.popup__form').addClass('active');
        if ($(document).width() < 768) {
            setTimeout(()=>{
                fixBody();
            }, 400);
        }
        if ($(this).hasClass('book-apartment')) {
            $('.popup__form').find(".popup__form--title").text("Забронировать обьект");
            $('.popup__form').find(".request-a-call").text("Забронировать");
        } 
    });


    //Форма "Заказать звонок". Отправить
    const popupShadow = document.querySelector('.wrapper__shadow--popup');
    const sendRequestButton = document.querySelectorAll('.request-a-call');
    for(let i=0; i<sendRequestButton?.length; i++) {
        sendRequestButton[i].addEventListener('click',(e)=>{
            e.preventDefault();
            let sendRequestForm = sendRequestButton[i].closest('.popup__form');
            let sendRequestFields = sendRequestForm.querySelectorAll('input');
            let patternMail = /^([a-z0-9_-]+\.)?[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
            let readyToSend = true;
            for(let l=0; l<sendRequestFields?.length; l++) {
                if(sendRequestFields[l].hasAttribute('required')) {
                    if((sendRequestFields[l].getAttribute('type') === 'text' ||
                    sendRequestFields[l].getAttribute('type') === 'tel' ||
                    sendRequestFields[l].getAttribute('type') === 'email') && 
                    sendRequestFields[l].value.trim().length === 0) {
                        sendRequestFields[l].classList.add('field--warning');
                        readyToSend = false;
                    } else if(sendRequestFields[l].getAttribute('type') === 'checkbox' && 
                        !sendRequestFields[l].checked) {
                            sendRequestFields[l].classList.add('field--warning');
                            readyToSend = false;
                    } 
                } else if(sendRequestFields[l].getAttribute('type') === 'email' && 
                sendRequestFields[l].value.trim().length > 0 &&
                sendRequestFields[l].value.search(patternMail) !== 0) {
                    sendRequestFields[l].classList.add('field--warning');
                    readyToSend = false;
                }
            }
            if(readyToSend) {
                sendRequestForm.querySelector('.cancel').click();
                if(!popupShadow.classList.contains('active')) {
                    popupShadow.classList.add('active');
                }
                let popupSuccess = document.querySelector('.popup__form--send');
                popupSuccess.classList.add('active');
            }
        });
    }


    //Убираем подсветку выделенных полей по клику на них
    let reviewSentTimeout;
    const fieldInForm = document.querySelectorAll('input');
    for(let i=0; i<fieldInForm?.length; i++) {
        fieldInForm[i].addEventListener('click',()=>{
            if(fieldInForm[i].classList.contains('field--warning')) {
                fieldInForm[i].classList.remove('field--warning');
            }
            if(document.querySelector('.send-review') && document.querySelector('.send-review').innerText === 'Отправлено') {
                document.querySelector('.send-review').innerText = 'Отправить';
                clearTimeout(reviewSentTimeout);
            }
        });
    }
    const textareaInForm = document.querySelectorAll('textarea');
    for(let i=0; i<textareaInForm?.length; i++) {
        textareaInForm[i].addEventListener('click',()=>{
            if(textareaInForm[i].classList.contains('field--warning')) {
                textareaInForm[i].classList.remove('field--warning');
            }
            if(document.querySelector('.send-review') && document.querySelector('.send-review').innerText === 'Отправлено') {
                clearTimeout(reviewSentTimeout);
                document.querySelector('.send-review').innerText = 'Отправить';
            }
        });
    }


    //Форма "Заказать звонок". Отмена
    const sendRequestCancelButton = document.querySelectorAll('.popup__form .cancel');
    for(let i=0; i<sendRequestCancelButton?.length; i++) {
        sendRequestCancelButton[i].addEventListener('click',(e)=>{
            e.preventDefault();
            let sendRequestForm = sendRequestCancelButton[i].closest('.popup__form');
            clearPopupFields(sendRequestForm);
        });
    }


    // Определить открытое окно
    function identifyPopupOpened() {
        let popupOpened;
        if(document.querySelector('.popup__form.active')) {
            popupOpened = document.querySelector('.popup__form.active');
        } else if (document.querySelector('.popup__form--send.active')) {
            popupOpened = document.querySelector('.popup__form--send.active');
        } else if (document.querySelector('.popup__filter--inner.active')) {
            popupOpened = document.querySelector('.popup__filter--inner.active');
        }
        return popupOpened;
    }


    //Форма "Заказать звонок". Клик по затемнению
    popupShadow?.addEventListener('click',()=>{
        clearPopupFields(identifyPopupOpened());
    });


    // Закрытие всплывающих окон по клику на крестик
    const popupCloseButton = document.querySelectorAll('.popup__close');
    for(let i=0; i<popupCloseButton?.length; i++) {
        popupCloseButton[i].addEventListener('click',()=>{
            clearPopupFields(identifyPopupOpened());
        });
    }


    // Ваша заявка отправлена. Закрыть
    const popupSuccessCloseButton = document.querySelector('.popup__form--send button');
    popupSuccessCloseButton?.addEventListener('click',()=>{
        clearPopupFields(identifyPopupOpened());
    });


    // Закрытие всплывающих окон
    function clearPopupFields(popup) {
        if(popup.classList.contains('popup__form')) {
            let sendRequestFields = popup.querySelectorAll('input');
            for(let i=0; i<sendRequestFields?.length; i++) {
                if(sendRequestFields[i].getAttribute('type') !== 'checkbox') {
                    sendRequestFields[i].value = '';
                }
                if(sendRequestFields[i].classList.contains('field--warning')) {
                    sendRequestFields[i].classList.remove('field--warning');
                }
                popup.querySelector('.popup__form--title').innerText = 'Заказать звонок';
                popup.querySelector('.request-a-call').innerText = 'Заказать звонок';
               
            }
        } 
        if(popup.classList.contains('popup__filter--inner')){
            document.querySelector('.popup__filter--btn').style.left = '-100%';
        }
        popup.classList.remove('active');
        popupShadow.classList.remove('active');
        if(document.documentElement.clientWidth < 768) {
            unfixBody();
        }
    }


    //Форма "Отзывы и предложения". Отправить
    const sendReviewButton = document.querySelectorAll('.send-review');
    for(let i=0; i<sendReviewButton?.length; i++) {
        sendReviewButton[i].addEventListener('click',(e)=>{
            e.preventDefault();
            let sendReviewForm = sendReviewButton[i].closest('form');
            let sendReviewFields = sendReviewForm.querySelectorAll('input');
            let patternMail = /^([a-z0-9_-]+\.)?[a-z0-9_-]+@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i;
            let readyToSend = true;
            for(let l=0; l<sendReviewFields?.length; l++) {
                if(sendReviewFields[l].hasAttribute('required')) {
                    if((sendReviewFields[l].getAttribute('type') === 'text' ||
                    sendReviewFields[l].getAttribute('type') === 'tel' ||
                    sendReviewFields[l].getAttribute('type') === 'email') && 
                    sendReviewFields[l].value.trim().length === 0) {
                        sendReviewFields[l].classList.add('field--warning');
                        readyToSend = false;
                    } else if(sendReviewFields[l].getAttribute('type') === 'checkbox' && 
                        !sendReviewFields[l].checked) {
                            sendReviewFields[l].classList.add('field--warning');
                            readyToSend = false;
                    } 
                } else if(sendReviewFields[l].getAttribute('type') === 'email' && 
                sendReviewFields[l].value.trim().length > 0 &&
                sendReviewFields[l].value.search(patternMail) !== 0) {
                    sendReviewFields[l].classList.add('field--warning');
                    readyToSend = false;
                }
            }
            let sendReviewTextarea = sendReviewForm.querySelectorAll('textarea');
            for(let l=0; l<sendReviewTextarea?.length; l++) {
                if(sendReviewTextarea[l].hasAttribute('required') && 
                sendReviewTextarea[l].value.trim().length === 0) {
                    sendReviewTextarea[l].classList.add('field--warning');
                    readyToSend = false;
                }
            }
            if(readyToSend) {
                sendReviewButton[i].innerText = 'Отправлено';
                for(let l=0; l<sendReviewFields?.length; l++) {
                    sendReviewFields[l].classList.remove('field--warning');
                    if(sendReviewFields[l].getAttribute('type') !== 'checkbox') {
                        sendReviewFields[l].value = '';
                    }
                }
                for(let l=0; l<sendReviewTextarea?.length; l++) {
                    sendReviewTextarea[l].value = '';
                }
                reviewSentTimeout = setTimeout(()=>{
                    sendReviewButton[i].innerText = 'Отправить';
                }, 5000);
            } else {
                let firstWarningField = sendReviewForm.querySelector('.field--warning');
                let firstWarningFieldTop = firstWarningField.getBoundingClientRect().top;
                if(firstWarningFieldTop < 0) {
                    if(firstWarningField.getAttribute('type') === 'checkbox') {
                        firstWarningField.nextElementSibling.scrollIntoView({ behavior: "smooth", block: "start",});
                    } else if(firstWarningField.previousElementSibling.nodeName == 'LABEL') {
                        firstWarningField.previousElementSibling.scrollIntoView({ behavior: "smooth", block: "start",});
                    } 
                }
            }
        });
    }


    /* Маски */
    $("input[type='tel']").inputmask("+7(999)999-99-99", {
        oncomplete: function () {
        },
        onincomplete: function () {
            $(this).val("");
        },
        oncleared: function () {
            $(this).val("");
        },
    });


    //Меню
    $('.header__top--burger').on('click', function () {
        if ($('.popup__menu--inner').hasClass('active')) {
            $('.popup__menu--inner').removeClass('active');
            $(this).removeClass('active');
            setTimeout(()=>{
                unfixBody();
            }, 400);
        } else {
            $('.popup__menu--inner').addClass('active');
            $(this).addClass('active');
            fixBody();
        }
    });


    //Моб. фильтр. Применить
    $('.body__search--wrap .filter--apply').on('click', function (e) {
        if ($(window).width() < 1200) {
            e.preventDefault();
            $('.popup__filter--inner').addClass('active');
            setTimeout(()=>{
                fixBody();
            }, 400);
            $('.popup__filter--btn').css("left", "0");
        }
    });

    //Моб. фильтр. Сбросить
    $('.body__search--wrap .filter--clear').on('click', function (e) {
        e.preventDefault();
        if ($(window).width() > 1200) {
            $(this).closest('.body__search--wrap').find('.search--picker input').val('');
            $(this).closest('.body__search--wrap').find('.search-picker__list-container input').prop('checked', false);
        } else {
            $('.popup__filter--wrap').find('.search--picker input').val('');
            $('.popup__filter--wrap').find('.search-picker__list-container input').prop('checked', false);
        }
    });

    //Фильтр
    $('.header__search--inner .search-picker__button').on('click', function () {
        if (!$(this).closest('.search--picker').hasClass('active')) {
            if ($(this).closest('.header__search--inner').find('.object__type--housing').hasClass('active')) {
                $(this).closest('.header__search--inner').find('.search-picker__list-housing').show();
                $(this).closest('.header__search--inner').find('.search-picker__list-commercial').hide();
            } else if ($(this).closest('.header__search--inner').find('.object__type--commercial').hasClass('active')) {
                $(this).closest('.header__search--inner').find('.search-picker__list-housing').hide();
                $(this).closest('.header__search--inner').find('.search-picker__list-commercial').show();
            }

            setTimeout(() => {
                var searchInner = $(this).closest('.search--picker').find('.search-picker__list-container-wrap').height() + 40;
                $(this).closest('.search--picker').find('.search-picker__list-container').css('height', searchInner);
            }, 10);

            setTimeout(() => {
                $(this).closest('.search--picker').addClass('active');
            }, 20);
        } else {
           
            $(this).closest('.search--picker').find('.search-picker__list-container').css('height', 0);
            setTimeout(() => {
                $(this).closest('.search--picker').removeClass('active');
            }, 100);
        }
    });

    //Фильтр. Переключение типа объекта
    $('.header__search--inner .object__type').on('click', function () {
        if ($(this).hasClass('object__type--housing')) {
            if (!$(this).hasClass('active')) {

                $(this).closest('.object__search--picker-type').find('.object__type--commercial').removeClass('active');
                $(this).closest('.header__search--inner').find('.search-picker__list-housing').show();
                $(this).closest('.header__search--inner').find('.search-picker__list-commercial').hide();
                var searchInner = $(this).closest('.search--picker').find('.search-picker__list-container-wrap').height() + 40;
                $(this).closest('.search--picker').find('.search-picker__list-container').css('height', searchInner);
                $(this).addClass('active');

                $(this).closest('.search--picker').find('.search-picker__button').val('');
                $(this).closest('.search-picker__list-container').find('.search-picker__list-housing li').each(function () {
                    if ($(this).hasClass('active')) {
                        var inputHouse = $(this).closest('.search--picker').find('.search-picker__button').val();
                        var checkboxHouse = $(this).attr('title');
                        if (inputHouse.length < 1) {
                            $(this).closest('.search--picker').find('.search-picker__button').val(checkboxHouse);
                        } else {
                            $(this).closest('.search--picker').find('.search-picker__button').val(inputHouse + ', ' + checkboxHouse);
                        }
                    }
                });

            }
        } else {
            if (!$(this).hasClass('active')) {

                $(this).closest('.object__search--picker-type').find('.object__type--housing').removeClass('active');
                $(this).closest('.header__search--inner').find('.search-picker__list-commercial').show();
                $(this).closest('.header__search--inner').find('.search-picker__list-housing').hide();
                var searchInner = $(this).closest('.search--picker').find('.search-picker__list-container-wrap').height() + 40;
                $(this).closest('.search--picker').find('.search-picker__list-container').css('height', searchInner);
                $(this).addClass('active');

                $(this).closest('.search--picker').find('.search-picker__button').val('');
                $(this).closest('.search-picker__list-container').find('.search-picker__list-commercial li').each(function () {
                    if ($(this).hasClass('active')) {
                        var inputCommercial = $(this).closest('.search--picker').find('.search-picker__button').val();
                        var checkboxCommercial = $(this).attr('title');
                        if (inputCommercial.length < 1) {
                            $(this).closest('.search--picker').find('.search-picker__button').val(checkboxCommercial);
                        } else {
                            $(this).closest('.search--picker').find('.search-picker__button').val(inputCommercial + ', ' + checkboxCommercial);
                        }
                    }
                });
            }
        }
    });


    //Фильтр. Закрытие окон
    $(document).mouseup(function (e) {
        var modalObject = $(".object__search--picker");
        var modalFlat = $(".flat__search--picker");
        var modalArea = $(".area__search--picker");
        var modalPrice = $(".price__search--picker");
        var modalDistrict = $(".district__search--picker");
        var modalClass = $(".class__search--picker");

        if (!modalObject.is(e.target) && modalObject.has(e.target).length === 0 && modalObject.hasClass('active')) {
            $('.object__search--picker').find('.search-picker__list-container').css('height', '0');
            setTimeout(() => {
                $('.object__search--picker').removeClass('active');
            }, 100);
        }
        if (!modalFlat.is(e.target) && modalFlat.has(e.target).length === 0 && modalFlat.hasClass('active')) {
            $('.flat__search--picker').find('.search-picker__list-container').css('height', '0');
            setTimeout(() => {
                $('.flat__search--picker').removeClass('active');
            }, 100);
        }
        if (!modalArea.is(e.target) && modalArea.has(e.target).length === 0 && modalArea.hasClass('active')) {
            $('.area__search--picker').find('.search-picker__list-container').css('height', '0');
            setTimeout(() => {
                $('.area__search--picker').removeClass('active');
            }, 100);
        }
        if (!modalPrice.is(e.target) && modalPrice.has(e.target).length === 0 && modalPrice.hasClass('active')) {
            $('.price__search--picker').find('.search-picker__list-container').css('height', '0');
            setTimeout(() => {
                $('.price__search--picker').removeClass('active');
            }, 100);
        }
        if (!modalDistrict.is(e.target) && modalDistrict.has(e.target).length === 0 && modalDistrict.hasClass('active')) {
            $('.district__search--picker').find('.search-picker__list-container').css('height', '0');
            setTimeout(() => {
                $('.district__search--picker').removeClass('active');
            }, 100);
        }
        if (!modalClass.is(e.target) && modalClass.has(e.target).length === 0 && modalClass.hasClass('active')) {
            $('.class__search--picker').find('.search-picker__list-container').css('height', '0');
            setTimeout(() => {
                $('.class__search--picker').removeClass('active');
            }, 100);
        }
    });

    // Фильтр
    $('.header__search--inner .search-picker__status').on('click', function () {
        var inputValue = $(this).closest('.search--picker').find('.search-picker__button').val();
        var checkboxValue = $(this).attr('title');

        setTimeout(() => {

            if ($(this).hasClass('active')) {

                var inputValueArr = inputValue.split(', ');
                inputValueArr = $.grep(inputValueArr, function (inputValue) {
                    return inputValue != checkboxValue;
                });
                inputValue = inputValueArr.join(', ');
                $(this).closest('.search--picker').find('.search-picker__button').val(inputValue);
                setTimeout(() => {
                    $(this).removeClass('active');
                }, 10);


            } else {
                if (inputValue.length < 1) {
                    $(this).closest('.search--picker').find('.search-picker__button').val(checkboxValue);
                } else {
                    $(this).closest('.search--picker').find('.search-picker__button').val(inputValue + ', ' + checkboxValue);
                }
                setTimeout(() => {
                    $(this).addClass('active');
                }, 10);
            }

        }, 10);
    });

    // Фильтр. Цена и площадь
    $('.header__search--inner .filter__parameter input').on('input', function () {
        // Если в поле ввели любой символ, кроме цифры, убираем этот символ
        if(this.value.match(/[^0-9]/i)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }

        if(this.value == '0') {
            this.value = '';
        }

        let paramValueLeft = $(this).closest('.search-picker__list-container-wrap').find('.parameter-left input').val();
        let paramValueRight = $(this).closest('.search-picker__list-container-wrap').find('.parameter-right input').val();

        //Разделение на разряды числовых значений
        this.value = this.value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        
        //Вернуть число без деления на разряды
        paramValueLeft = paramValueLeft.replace(/ +/g, '');
        paramValueRight = paramValueRight.replace(/ +/g, '');


        if (paramValueLeft > 0 && paramValueLeft <= 999) {
            paramValueLeftTransform = paramValueLeft;
        } else {
            if (paramValueLeft > 999 && paramValueLeft <= 999999) {
                paramValueLeftTransform = paramValueLeft / 1000;
                if (paramValueLeft % 1000 == 0) {
                    paramValueLeftTransform = paramValueLeftTransform + ' тыс.';
                } else {
                    paramValueLeftTransform = paramValueLeftTransform.toFixed(1) + ' тыс.';
                }
            } else {
                paramValueLeftTransform = paramValueLeft / 1000000;
                paramValueLeftTransform = paramValueLeftTransform.toFixed(1) + ' млн.';
            }
        }

        if (paramValueRight > 0 && paramValueRight <= 999) {
            paramValueRightTransform = paramValueRight;
        } else {
            if (paramValueRight > 999 && paramValueRight <= 999999) {
                paramValueRightTransform = paramValueRight / 1000;
                if (paramValueRight % 1000 == 0) {
                    paramValueRightTransform = paramValueRightTransform + ' тыс.';
                } else {
                    paramValueRightTransform = paramValueRightTransform.toFixed(1) + ' тыс.';
                }
            } else {
                paramValueRightTransform = paramValueRight / 1000000;
                paramValueRightTransform = paramValueRightTransform.toFixed(1) + ' млн.';

            }
        }

        // Если ввод только значения "от"
        if ($(this).closest('.filter__parameter').hasClass('parameter-left') && paramValueRight.length < 1) {
            $(this).closest('.search--picker').find('.search-picker__button').val('от ' + paramValueLeftTransform);
        }

        // Если ввод только значения "до"
        if ($(this).closest('.filter__parameter').hasClass('parameter-right') && paramValueLeft.length < 1) {
            $(this).closest('.search--picker').find('.search-picker__button').val('до ' + paramValueRightTransform);
        }

        // Если ввод обоих значений
        if ($(this).closest('.filter__parameter').hasClass('parameter-right') && paramValueLeft.length > 1) {
            if (paramValueRight.length > 0) {
                $(this).closest('.search--picker').find('.search-picker__button').val(paramValueLeftTransform + ' - ' + paramValueRightTransform);
            } else {
                $(this).closest('.search--picker').find('.search-picker__button').val('от ' + paramValueLeftTransform);
            }
        }

        // Если ввод обоих значений
        if ($(this).closest('.filter__parameter').hasClass('parameter-left') && paramValueRight.length > 1) {
            if (paramValueLeft.length > 0) {
                $(this).closest('.search--picker').find('.search-picker__button').val(paramValueLeftTransform + ' - ' + paramValueRightTransform);
            } else {
                $(this).closest('.search--picker').find('.search-picker__button').val('до ' + paramValueRightTransform);
            }
        }

        // Если оба поля ввода пустые
        if (paramValueRight.length < 1 && paramValueLeft.length < 1) {
            $(this).closest('.search--picker').find('.search-picker__button').val('');
        }


    });

    // Фильтр. Кнопка "Сбросить" во всплывающих окнах
    $('.search--picker .clear').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.search-picker__list-container-wrap').find('li input').prop('checked', false);
        $(this).closest('.search--picker').find('.search-picker__button').val('');
        $(this).closest('.search-picker__list-container-wrap').find('.search-picker__status.active').removeClass('active');
        $(this).closest('.search--picker').removeClass('active');
        $(this).closest('.search--picker').find('.search-picker__list-container').css('height', '0');
    });

    // Фильтр. Кнопка "Сбросить"
    $('.popup__filter--wrap .filter--cancel').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.popup__filter--wrap').find('li input').prop('checked', false);
        $(this).closest('.popup__filter--wrap').find('.search-picker__button').val('');
        $(this).closest('.popup__filter--wrap').find('.filter__parameter input').val('');
        $(this).closest('.popup__filter--wrap').find('.search-picker__status.active').removeClass('active');
    });

    // Фильтр. Кнопка "Применить" во всплывающих окнах
    $('.search--picker .apply').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.search--picker').removeClass('active');
        $(this).closest('.search--picker').find('.search-picker__list-container').css('height', '0');
    });

    // Фильтр. Кнопка "Применить"
    $('.popup__filter--wrap .filter--apply').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.popup__filter--inner').removeClass('active');
        unfixBody();
        $('.popup__filter--btn').css("left", "-100%");
    });

    // Фильтр. Отображение блоков
    if ($(window).width() < 1200 && $(window).width() > 767) {
        if ($('.property--list').find('.filter__section--wrap').length > 0 && $('.property--list').find('.body__search--wrap').length < 1) {
            $('.property--list').find('.filter__section--wrap').css('margin-bottom','-19px');
        }
    }

    // Фильтр. Отображение блоков
    if ($(window).width() < 768) {
        if ($('.property--list').find('.filter__section--wrap').length > 0 && $('.property--list').find('.body__search--wrap').length < 1) {
            $('.property--list').find('.filter__section--wrap').css('margin-bottom','25px');
        }
    }

    // Детальная объекта. Основной слайдер
    $('.object__slider--for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        prevArrow: '.object__slider--arrow-back',
        nextArrow: '.object__slider--arrow-next',
        fade: true,
        infinite: true,
        asNavFor: '.object__slider--nav',
        responsive: [
            {
                breakpoint: 1200,
                settings: {}
            }
        ]
    });
    

    // Детальная объекта. Слайдер-навигация
    $('.object__slider--nav').slick({
        vertical: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.object__slider--for',
        dots: false,
        arrow: false,
        centerMode: true,
        focusOnSelect: true,
        accessibility: true,
        verticalSwiping: true,
        infinite: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerMode: false,
                    touchMove: true,
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    centerMode: false,
                    touchMove: true,
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
        ]
    });

    // Детальная квартиры. Основной слайдер
    $('.apartment__slider--for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      prevArrow: '.apartment__slider--arrow-back',
      nextArrow: '.apartment__slider--arrow-next',
      fade: true,
      infinite: true,
      asNavFor: '.apartment__slider--nav',
      responsive: [
          {
              breakpoint: 1200,
              settings: {
                dots: true,
                arrows: false
              }
          }
      ]
    });

    // Детальная квартиры. Слайдер-навигация
    $('.apartment__slider--nav').slick({
      vertical: true,
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.apartment__slider--for',
      dots: false,
      arrows: false,
      centerMode: true,
      focusOnSelect: true,
      accessibility: true,
      verticalSwiping: true,
      infinite: true,
    });

    //Детальная квартиры. Плавная прокрутка страницы к якорю
    var margTop = 60; // переменная для контроля докрутки
    $(".apartment__card--characteristics a").click(function() {
      $("html, body").animate({
         scrollTop: $($(this).attr("href")).offset().top-margTop+ "px" //
      }, {
         duration: 800,
         easing: "swing"
      });
      return false;
    });


    //Детальная квартиры. Если у товара только одно фото, то вертикального слайдера не будет
    if($('.apartment__slider--for').find('.slider--for-slide').length < 2) {
        $('.apartment__slider--vertical').hide();
        $('.apartment__card--left').css('justify-content', 'center');
    }

    $('#policy__box_phone').on('click', function () {
        $('#policy__box_phone').toggleClass('yes')
        let cheked = $('#policy__box_phone').hasClass('yes')

        if (cheked){
            $('#policy__box_phone').removeClass('custom-checkbox1')
        }else{
            $('#policy__box_phone').addClass('custom-checkbox1')
        }
    })
    $('#policy__box').on('click', function () {
        $('#policy__box').toggleClass('yes1')
        let cheked = $('#policy__box').hasClass('yes1')

        if (cheked){
            $('#policy__box').removeClass('custom-checkbox1')
        }else{
            $('#policy__box').addClass('custom-checkbox1')
        }
    })


    // Сортировка
    const sortButtons = document.querySelectorAll('.j-sort__type');
    if (sortButtons.length) {
        sortButtons.forEach((sortButton)=>{
            sortButton.addEventListener('click',()=>{
                if(sortButton.classList.contains('ascending')) {
                    sortButton.classList.remove('ascending');
                    sortButton.classList.add('descending')
                } else if(sortButton.classList.contains('descending')) {
                    sortButton.classList.remove('descending');
                } else {
                    sortButton.classList.add('ascending');
                }
            });
        });
    }

});
