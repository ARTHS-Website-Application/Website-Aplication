// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');


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
                data: payload.data // Lưu trữ dữ liệu để sử dụng khi xử lý sự kiện click
            };
            // Hiển thị thông báo nếu không có thông báo nào đang được hiển thị
            self.registration.showNotification(notificationTitle, notificationOptions);
        });
    });
    
    // Người nghe sự kiện khi người dùng nhấn vào thông báo
    self.addEventListener('notificationclick', function (event) {
        console.log('Notification click Received.', event.notification.data);
        
        event.notification.close(); // Đóng thông báo
        
        // Sử dụng dữ liệu 'link' từ payload để mở URL
        if (event.notification.data && event.notification.data.link) {
            const link = event.notification.data.link;
            const urlToOpen = new URL(`/manage-order/${link}`, self.location.origin).href;
            console.log('Opening:', urlToOpen);
    
            event.waitUntil(
                clients.matchAll({type: 'window', includeUncontrolled: true}).then(windowClients => {
                    // Kiểm tra xem có tab nào đã mở URL này chưa
                    for (const client of windowClients) {
                        if (new URL(client.url).href === urlToOpen && 'focus' in client) {
                            console.log('Focusing on existing tab:', client.url);
                            return client.focus();
                        }
                    }
                    console.log('Opening new window for:', urlToOpen);
                    // Nếu không, mở một tab mới
                    return clients.openWindow(urlToOpen).then(windowClient => windowClient ? windowClient.focus() : null);
                })
            );
        }
    });