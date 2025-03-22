// (1) Service Worker登録
document.getElementById('btn').addEventListener('click', function () {
    navigator.serviceWorker.register('/sw.js')
        .then(async (registration) => {
            console.log('Service Worker registered:', registration);

            // (2) VAPIDの公開鍵をBase64からUint8Arrayに変換する関数
            function urlBase64ToUint8Array(base64String) {
                const padding = '='.repeat((4 - base64String.length % 4) % 4);
                const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);
                for (let i = 0; i < rawData.length; ++i) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            }

            // (3) 公開鍵（VAPID公開鍵）を設定
            const vapidPublicKey = 'BHoxdwt6WH-CfrVchNCcuLT9458Bf8--gHOTDtM4FhC4zD-fuypDOFojNlLMVqwFXam6CNG2Dtt1k9saD__MyFo'; // ここを実際の公開鍵に置き換える
            const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

            await navigator.serviceWorker.ready;
            // (4) Push Subscriptionの取得
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey
            });
            const subscriptionJSON = JSON.stringify(subscription);

            var url = "/pushsub";
            var postparam =
            {
                "method": "POST",
                headers: {"Content-Type": "application/json"},
                "body": subscriptionJSON
            };
            fetch(url, postparam);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
});