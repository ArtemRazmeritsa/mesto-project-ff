(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,r,o){var c=t.name,p=t.link,a=e.cloneNode(!0),u=a.querySelector(".card__image"),i=a.querySelector(".card__delete-button"),d=a.querySelector(".card__title"),s=a.querySelector(".card__like-button");return u.src=p,u.alt=c,d.textContent=c,i.addEventListener("click",n),s.addEventListener("click",r),u.addEventListener("click",(function(){return o(c,p)})),a}function n(e){e.target.closest(".card").remove()}function r(e){var t=e.target;t.classList.contains("card__like-button_is-active")?t.classList.remove("card__like-button_is-active"):t.classList.add("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",p)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",p)}function p(e){var t=document.querySelector(".popup_is-opened");"Escape"===e.key&&c(t)}var a=document.querySelector(".profile__edit-button"),u=document.querySelector(".popup_type_edit"),i=document.querySelector(".profile__title"),d=document.querySelector(".profile__description"),s=document.querySelector(".profile__add-button"),l=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_image"),m=_.querySelector(".popup__image"),v=_.querySelector(".popup__caption"),y=document.forms["edit-profile"],f=y.querySelector(".popup__input_type_name"),k=y.querySelector(".popup__input_type_description"),q=document.forms["new-place"],S=q.querySelector(".popup__input_type_card-name"),L=q.querySelector(".popup__input_type_url"),g=document.querySelector(".places__list"),h=document.querySelectorAll(".popup");function E(e,t){m.alt=e,m.src=t,v.textContent=e,o(_)}a.addEventListener("click",(function(){f.value=i.textContent,k.value=d.textContent,o(u)})),y.addEventListener("submit",(function(e){e.preventDefault();var t=f.value,n=k.value;i.textContent=t,d.textContent=n,c(u)})),s.addEventListener("click",(function(){return o(l)})),q.addEventListener("submit",(function(e){e.preventDefault();var o=t({name:S.value,link:L.value},n,r,E);g.prepend(o),c(l),S.value="",L.value=""})),h.forEach((function(e){e.addEventListener("click",(function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close"))&&c(e)}))})),function(e,o){[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var c=t(e,n,r,o);g.appendChild(c)}))}(0,E)})();