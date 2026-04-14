# ESP32 Notes for this phase

No mandatory ESP32 code change is required for the website-first test phase if your current ESP32 sketch already does all of the following:

- calls `GET /api/device/bootstrap`
- sends header `x-device-key: front_camera_secret_123`
- parses users with:
  - `name`
  - `contact`
  - `status`
  - `faceId`
  - `cmdId`
- stores synced users locally

The new website already exposes a compatible bootstrap response.

Recommended test:
1. Add a new user from `/admin/users`
2. Call `/api/device/bootstrap`
3. Confirm the new user appears in the JSON response
4. Then test your ESP32 sync against that endpoint
