const closeNotificationButton = document.getElementById('close-notification');
const notification = document.querySelector('.notification');

const closeNotification = () => {
    notification.style.bottom = '-50px';

    setTimeout( ()=> {
        notification.style.display = 'none';
    }, 200);
};
closeNotificationButton.addEventListener('click', closeNotification);

setTimeout( ()=> {
    if (notification.style.display != 'none') {
        closeNotification();
    };
}, 7000);