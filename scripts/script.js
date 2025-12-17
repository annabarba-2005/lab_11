// Начальные данные
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Челябинская область',
        link: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Иваново',
        link: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Камчатка',
        link: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Холмогорский район',
        link: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        name: 'Байкал',
        link: 'https://images.unsplash.com/photo-1528181304800-259b08848526?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];

// Элементы DOM
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const closeEditPopupButton = editPopup.querySelector('.popup__close-button');
const editForm = editPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const descriptionInput = editForm.querySelector('.popup__input_type_description');
const elementsContainer = document.querySelector('.elements');

// Функции
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEscape);
}

function closePopupByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup(editPopup);
}

function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    const cardImage = cardElement.querySelector('.element__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const likeButton = cardElement.querySelector('.element__like-button');
    
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('element__like-button_active');
    });
    
    return cardElement;
}

function renderCards() {
    initialCards.forEach(cardData => {
        const cardElement = createCard(cardData);
        elementsContainer.append(cardElement);
    });
}

// Обработчики событий
editButton.addEventListener('click', function() {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(editPopup);
});

closeEditPopupButton.addEventListener('click', function() {
    closePopup(editPopup);
});

editForm.addEventListener('submit', handleEditFormSubmit);

// Закрытие попапа по клику на оверлей
editPopup.addEventListener('click', function(evt) {
    if (evt.target === editPopup) {
        closePopup(editPopup);
    }
});

// Инициализация
renderCards();

// Добавляем шаблон карточки в HTML
const templateScript = document.createElement('script');
templateScript.type = 'text/html';
templateScript.id = 'card-template';
templateScript.innerHTML = `
<article class="element">
    <img src="" alt="" class="element__image">
    <div class="element__info">
        <h2 class="element__title"></h2>
        <button type="button" class="element__like-button" aria-label="Поставить лайк"></button>
    </div>
</article>
`;
document.body.appendChild(templateScript);
