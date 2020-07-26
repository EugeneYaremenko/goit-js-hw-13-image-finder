import loadMoreBtnHandler from '../search-img';

const galleryItemsEndRef = document.querySelector('.js-btn');

const options = {
  rootMargin: '300px',
};

const onEntry = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadMoreBtnHandler();
    }
  });
};

const io = new IntersectionObserver(onEntry, options);

io.observe(galleryItemsEndRef);
