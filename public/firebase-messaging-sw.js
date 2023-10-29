// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

try {
    console.log("Initializing Firebase in Service Worker");

    // eslint-disable-next-line no-undef
    firebase.initializeApp({
        apiKey: "AIzaSyDnkqYy8kwHUnQTyBRD5b9BuhdF5pUFPPw",
        authDomain: "arths-45678.firebaseapp.com",
        projectId: "arths-45678",
        storageBucket: "arths-45678.appspot.com",
        messagingSenderId: "935863172768",
        appId: "1:935863172768:web:5335c8bddd461aaf5fd3c5",
        measurementId: "G-D66DNWP5M0"
    });
    // eslint-disable-next-line no-undef
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
        console.log("Received background message", payload);
        self.registration.getNotifications().then((notifications) => {
            const notificationTitle = payload.notification.title;
            const notificationOptions = {
                body: payload.notification.body,
                icon: '/assets/icons/icon-72x72.png',
                renotify: false,
                timestamp: Date.now()
            };

            // Kiểm tra xem có thông báo nào đang được hiển thị hay không
            if (notifications.some(notification => notification.title === notificationTitle && notification.body === notificationOptions.body)) {
                return;
            }

            // Hiển thị thông báo nếu không có thông báo nào đang được hiển thị
            self.registration.showNotification(notificationTitle, notificationOptions);
        });
    });
} catch (error) {
    console.error("Lỗi")
}