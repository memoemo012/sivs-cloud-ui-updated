# TriGuard full site package

## Run
```bash
npm install
npm run init-db
npm start
```

Open `http://localhost:3000`

## Default login
- Admin: `admin@system.local` / `admin123`
- User: `testuser@triguard.com` / `123456`
- User: `mohamed@example.com` / `123456`
- User: `youssef@example.com` / `123456`

## Included pages
- Arabic/English switch
- Login chooser
- User dashboard / notifications / profile / edit profile / activity / devices / settings / support
- Admin dashboard / alerts center / alert detail / logs / log detail / users management / devices management / device detail / support list / support detail / settings
- ESP32 bootstrap + users/devices/admin-profile + sync version + event endpoint


## اختبار صفحة حالة ESP32 والوحدات
بعد تشغيل الموقع افتح: `/admin/esp32-health`

لإرسال heartbeat تجريبي من VS Code Terminal:

```bash
curl -X POST http://localhost:3000/api/device/heartbeat \
  -H "Content-Type: application/json" \
  -H "x-device-key: front_camera_secret_123" \
  -d '{
    "deviceCode": "DV-03",
    "deviceName": "ESP32 Main Unit",
    "location": "Main Entrance",
    "esp32Ok": true,
    "faceOk": true,
    "fingerOk": true,
    "voiceOk": true,
    "ipAddress": "192.168.1.55",
    "wifiSsid": "OfficeWiFi"
  }'
```

ثم حدّث صفحة `/admin/esp32-health`.
