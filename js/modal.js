const modal = document.querySelector('.modal');
const btnModal = document.querySelector('.btn-modal');
const closeModal = document.querySelector('.close-modal');
btnModal.addEventListener('click', function() {
    modal.style.display = 'block';
});
closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});
window.addEventListener('click', event => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});