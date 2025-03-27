const express = require('express');
const webPush = require('web-push');
const fs = require('fs');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/aa', (req, res) => {

    // VAPIDキーの読み込み
    const vapidKeys = JSON.parse(fs.readFileSync('./vapid.json.key', 'utf8'));
    // Push Subscriptionの読み込み
    const subscription = JSON.parse(fs.readFileSync('./push-subscription.json.key', 'utf8'));

    // VAPID設定
    webPush.setVapidDetails(
        vapidKeys['mailto'],
        vapidKeys['public-key'],
        vapidKeys['private-key']
    );

    // 通知内容
    const notification = {
        title: 'テスト通知',
        body: 'これはテスト通知です'
    };

    // 通知送信
    webPush.sendNotification(subscription, JSON.stringify(notification))
        .then(() => {
            console.log('通知を送信しました');
        })
        .catch(err => {
            console.error('通知の送信に失敗しました:', err);
        });
    console.log('push ok!');
    res.send('push ok!');
});

app.get('/wakapushsub', (req, res) => {

    // VAPIDキーの読み込み
    const vapidKeys = JSON.parse(fs.readFileSync('./vapid-waka.json.key', 'utf8'));
    // Push Subscriptionの読み込み
    const subscription = JSON.parse(fs.readFileSync('./push-subscription-waka.json.key', 'utf8'));

    // VAPID設定
    webPush.setVapidDetails(
        vapidKeys['mailto'],
        vapidKeys['public-key'],
        vapidKeys['private-key']
    );

    // 通知内容
    const notification = {
        title: 'わかメール',
        body: 'メールが届きました'
    };

    // 通知送信
    webPush.sendNotification(subscription, JSON.stringify(notification))
        .then(() => {
            console.log('通知を送信しました');
        })
        .catch(err => {
            console.error('通知の送信に失敗しました:', err);
        });
    console.log('push ok!');
    res.send('push ok!');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});

