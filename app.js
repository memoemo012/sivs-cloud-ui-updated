
const express = require('express');
const path = require('path');
const session = require('express-session');
const { all, get, run } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const DEVICE_SHARED_KEY = 'front_camera_secret_123';

const translations = {
  ar: {
    siteName:'TriGuard', siteTag:'نظام تحقق متعدد العوامل', home:'الرئيسية', dashboard:'لوحة التحكم',
    chooseLogin:'اختر نوع تسجيل الدخول', user:'مستخدم', admin:'مسؤول', login:'تسجيل الدخول',
    userLogin:'تسجيل دخول المستخدم', adminLogin:'تسجيل دخول المسؤول', emailOrContact:'رقم الجوال أو البريد الإلكتروني',
    password:'كلمة المرور', remember:'تذكرني', secureLogin:'دخول آمن', openDashboard:'دخول لوحة التحكم',
    invalidCreds:'بيانات الدخول غير صحيحة', saveFailed:'تعذر حفظ البيانات', logout:'تسجيل الخروج', users:'المستخدمون', alerts:'التنبيهات',
    logs:'السجلات', devices:'الأجهزة', support:'الدعم الفني', settings:'الإعدادات', profile:'الملف الشخصي',
    notifications:'الإشعارات', accountActivity:'نشاط الحساب', myDevices:'أجهزتي', save:'حفظ', add:'إضافة',
    edit:'تعديل', delete:'حذف', details:'التفاصيل', status:'الحالة', active:'نشط', suspended:'موقوف',
    verified:'موثق', fullName:'الاسم الكامل', contact:'التواصل', role:'الدور', faceId:'Face ID', cmdId:'CMD ID',
    fingerId:'Fingerprint ID', userId:'ID الحساب', phone:'رقم الجوال', email:'البريد الإلكتروني', totalUsers:'المستخدمون', totalTickets:'طلبات الدعم',
    totalDevices:'الأجهزة', syncVersion:'إصدار التزامن', newAlerts:'تنبيهات جديدة', todayAttempts:'محاولات اليوم',
    successRate:'نسبة النجاح', recentEvents:'آخر الأحداث', viewAll:'عرض الكل', notificationsCenter:'الإشعارات',
    filterAll:'الكل', filterNew:'جديدة', filterInProgress:'تحت المعالجة', filterSolved:'تم الحل',
    accessLogs:'سجلات الدخول', search:'بحث', todayOnly:'اليوم فقط', failedOnly:'فاشلة فقط',
    devicesManagement:'إدارة الأجهزة', supportRequests:'طلبات الدعم الفني', supportSubtitle:'في هذه الصفحة يتم عرض جميع طلبات الدعم الفني التي يرسلها المستخدمون من التطبيق أو الموقع.',
    sender:'المرسل', message:'الرسالة', createdAt:'وقت الإرسال', updateStatus:'تحديث الحالة', reply:'الرد على المستخدم',
    send:'إرسال', subject:'العنوان', addUser:'إضافة مستخدم', createUser:'إنشاء مستخدم', usersMgmt:'إدارة المستخدمين',
    new:'جديد', inProgress:'قيد المعالجة', solved:'تم الحل', close:'إغلاق', back:'رجوع', allStored:'كل المستخدمين محفوظون',
    account:'الحساب', changePassword:'تغيير كلمة المرور', biometricLogin:'قفل التطبيق بالبصمة',
    notificationMethod:'طريقة التنبيه', sound:'صوت', vibration:'اهتزاز', silent:'صامت', pushNotifications:'Push تنبيهات',
    emailNotifications:'Email تنبيهات', importantOnly:'تنبيهات الحرجة فقط', technicalSupport:'التواصل مع الدعم الفني',
    supportSaved:'تم حفظ طلب الدعم بنجاح', updated:'تم التحديث بنجاح', deleted:'تم الحذف', language:'اللغة',
    english:'English', arabic:'العربية', triStyle:'تصميم وألوان مطابقين تقريبًا لملف TriGuard',
    systemOverview:'لوحة تحكم وموقع مستخدم مع حفظ دائم في قاعدة البيانات ومزامنة Bootstrap للـ ESP32.',
    adminReply:'رد الإدارة', open:'فتح', saveChanges:'حفظ التعديلات', userProfile:'الملف الشخصي',
    editData:'تعديل البيانات', cancel:'إلغاء', loginType:'اختر نوع تسجيل الدخول', supportDetail:'تفاصيل طلب الدعم',
    manage:'إدارة', adminSettings:'إعدادات المسؤول', adminProfile:'ملف المسؤول', location:'الموقع', type:'النوع',
    online:'متصل', offline:'غير متصل', deviceId:'معرف الجهاز', notes:'ملاحظات', adminPanel:'لوحة المسؤول',
    userPanel:'لوحة المستخدم', supportStateNew:'جديد', supportStateInProgress:'قيد المعالجة', supportStateSolved:'تم الحل',
    update:'تحديث', adminResponse:'استجابة المسؤول', sendSupport:'إرسال طلب دعم', accountState:'حالة الحساب',
    noTickets:'لا توجد طلبات دعم حالياً', noAlerts:'لا توجد إشعارات حالياً', noLogs:'لا توجد سجلات حالياً',
    noDevices:'لا توجد أجهزة حالياً', adminActions:'إجراءات الإدارة', adminSupport:'الدعم الفني',
    adminUsers:'المستخدمون', adminDevices:'الأجهزة', adminAlerts:'التنبيهات', adminLogs:'السجلات', savePrefs:'حفظ الإعدادات',
    prefsSaved:'تم حفظ الإعدادات', latestStatus:'آخر الحالة', triGuardLock:'TriGuard يعتمد على التحقق متعدد العوامل',
    issueDetails:'تفاصيل المشكلة', openSupport:'فتح الطلب', contactUser:'بيانات المستخدم', appearance:'المظهر العام',
    lightTheme:'فاتح', generalStatus:'الحالة العامة', biometricSettings:'إعدادات الأمان', adminTools:'اختصارات',
    addDevice:'إضافة جهاز', deviceName:'اسم الجهاز', adminHomeSubtitle:'مرحبًا، هذه لوحة التحكم الكاملة على نمط TriGuard',
    userHomeSubtitle:'معلومات حسابك الأساسية وخيارات الإشعارات والدعم', switchLanguage:'تغيير اللغة', esp32Health:'حالة ESP32 والوحدات', overallStatus:'الحالة العامة', moduleStatus:'حالة الوحدات', faceSensor:'بصمة الوجه', fingerSensor:'بصمة الإصبع', voiceSensor:'بصمة الصوت', controlUnit:'وحدة التحكم ESP32', healthy:'سليم', degraded:'بحاجة متابعة', lastSeen:'آخر اتصال', heartbeat:'Heartbeat', lastHeartbeat:'آخر Heartbeat', monitoredDevice:'الجهاز المراقب', monitoredDeviceData:'بيانات الجهاز المراقب', networkConnectionData:'بيانات الشبكة والاتصال', healthPageSubtitle:'تعرض هذه الصفحة حالة جهاز ESP32 والوحدات المرتبطة به مثل الوجه والبصمة والصوت وهل هي متصلة وتعمل بشكل جيد.', noHealthData:'لا توجد بيانات مراقبة حتى الآن. أرسل heartbeat من ESP32 أو استخدم أمر curl الاختباري.', component:'المكوّن', condition:'الحالة', websiteStatus:'حالة الموقع', onlineNow:'متصل الآن', offlineNow:'غير متصل الآن', goodWorking:'يعمل بشكل جيد', needsCheck:'يحتاج فحص', secondsUnit:'ثانية', minutesUnit:'دقيقة', hoursUnit:'ساعة', enableDevice:'تشغيل الجهاز', disableDevice:'إيقاف الجهاز', esp32Monitor:'مراقبة ESP32', supportTopic:'عنوان المشكلة (اختياري)', writeMessage:'اكتب رسالتك هنا...', sendNow:'إرسال الآن', cancelAction:'إلغاء', successfulLoginAlert:'تنبيه تسجيل دخول ناجح', abnormalAttemptAlert:'تنبيه محاولة غير طبيعية', verificationFailureAlert:'تنبيه فشل التحقق', onFailureOfVerification:'عند فشل Voice/Face/ECG', onAbnormalAttempt:'عند الاشتباه بمحاولة دخول', onSuccessfulLogin:'إشعار عند نجاح الدخول', currentMode:'الوضع الحالي', noNotificationsYet:'لا توجد إشعارات', noNotificationsBody:'لم يتم تسجيل أي إشعار مرتبط بحسابك حتى الآن.', notificationDetails:'التفاصيل', adminNotes:'ملاحظات المسؤول', openSupportDialog:'التواصل مع الدعم الفني', securitySettings:'إعدادات الأمان', logoutAccount:'تسجيل الخروج', userLanding:'الملف الشخصي', soundLabel:'صوت', vibrationLabel:'اهتزاز', silentLabel:'صامت', supportPageTitle:'الدعم الفني', issueType:'نوع المشكلة', issueDescription:'وصف المشكلة', issueLogin:'تسجيل الدخول', issueFace:'التعرّف على الوجه', issueFingerprint:'بصمة الإصبع', issueVoice:'بصمة الصوت', issueWebsite:'الموقع الإلكتروني', issueDevice:'الجهاز / العتاد', issueOther:'أخرى', issuePlaceholder:'اختر نوع المشكلة', autoSaveNotice:'يتم حفظ التغييرات تلقائيًا', supportIntro:'أرسل طلب الدعم من هذه الصفحة بدلًا من إعدادات الحساب.', saveChangesAuto:'يتم الحفظ تلقائيًا عند التغيير', pageNotFound:'الصفحة غير موجودة', resultSuccess:'نجاح', resultFailed:'فشل', severityHigh:'عالي', severityMedium:'متوسط', severityLow:'منخفض', commandWithoutFace:'أمر صوتي بدون وجه', unknownFace:'وجه غير معروف', suspendedAccount:'الحساب موقوف', fingerprintNotEnrolled:'البصمة غير مسجلة', fingerprintTimeout:'انتهت مهلة البصمة', fingerprintMismatch:'البصمة غير مطابقة', fingerReading:'جاري قراءة البصمة', fingerNotFound:'لم يتم العثور على البصمة', removeFinger:'ارفع الإصبع', removeFingerTimeout:'انتهت مهلة رفع الإصبع', sayCommand:'قل الأمر الصوتي', wrongCommand:'أمر صوتي خاطئ', voiceTimeout:'انتهت مهلة الصوت', verificationPassed:'تم اجتياز التحقق', scanning:'جاري الفحص', verifiedWord:'تم التحقق', healthDeviceTitle:'حالة الجهاز و ESP32', closeDialog:'إغلاق'
  },
  en: {
    siteName:'TriGuard', siteTag:'Multi-factor verification system', home:'Home', dashboard:'Dashboard',
    chooseLogin:'Choose login type', user:'User', admin:'Admin', login:'Login', userLogin:'User Login',
    adminLogin:'Admin Login', emailOrContact:'Phone or email', password:'Password', remember:'Remember me',
    secureLogin:'Secure Login', openDashboard:'Open Dashboard', invalidCreds:'Invalid login credentials', saveFailed:'Failed to save data',
    logout:'Logout', users:'Users', alerts:'Alerts', logs:'Logs', devices:'Devices', support:'Support',
    settings:'Settings', profile:'Profile', notifications:'Notifications', accountActivity:'Account Activity',
    myDevices:'My Devices', save:'Save', add:'Add', edit:'Edit', delete:'Delete', details:'Details', status:'Status',
    active:'Active', suspended:'Suspended', verified:'Verified', fullName:'Full Name', contact:'Contact', role:'Role',
    faceId:'Face ID', cmdId:'CMD ID', fingerId:'Fingerprint ID', userId:'Account ID', phone:'Phone Number', email:'Email', totalUsers:'Users',
    totalTickets:'Support Tickets', totalDevices:'Devices', syncVersion:'Sync Version', newAlerts:'New Alerts',
    todayAttempts:'Today Attempts', successRate:'Success Rate', recentEvents:'Recent Events', viewAll:'View All',
    notificationsCenter:'Notifications', filterAll:'All', filterNew:'New', filterInProgress:'In Progress', filterSolved:'Solved',
    accessLogs:'Access Logs', search:'Search', todayOnly:'Today only', failedOnly:'Failed only',
    devicesManagement:'Devices Management', supportRequests:'Support Requests', supportSubtitle:'This page shows all support requests sent by users from the app or website.',
    sender:'Sender', message:'Message', createdAt:'Created at', updateStatus:'Update Status', reply:'Reply to user',
    send:'Send', subject:'Subject', addUser:'Add User', createUser:'Create User', usersMgmt:'Users Management',
    new:'New', inProgress:'In Progress', solved:'Solved', close:'Close', back:'Back', allStored:'All users stored',
    account:'Account', changePassword:'Change Password', biometricLogin:'Enable biometric app lock',
    notificationMethod:'Notification method', sound:'Sound', vibration:'Vibration', silent:'Silent',
    pushNotifications:'Push notifications', emailNotifications:'Email notifications', importantOnly:'Important only',
    technicalSupport:'Contact technical support', supportSaved:'Support request saved successfully', updated:'Updated successfully',
    deleted:'Deleted', language:'Language', english:'English', arabic:'العربية', triStyle:'TriGuard-inspired design and colors',
    systemOverview:'Persistent web app with database storage and ESP32 bootstrap sync.', adminReply:'Admin reply',
    open:'Open', saveChanges:'Save changes', userProfile:'Profile', editData:'Edit Data', cancel:'Cancel',
    loginType:'Choose login type', supportDetail:'Support Ticket Detail', manage:'Manage', adminSettings:'Admin Settings',
    adminProfile:'Admin Profile', location:'Location', type:'Type', online:'Online', offline:'Offline', deviceId:'Device ID',
    notes:'Notes', adminPanel:'Admin Panel', userPanel:'User Panel', supportStateNew:'New', supportStateInProgress:'In Progress',
    supportStateSolved:'Solved', update:'Update', adminResponse:'Admin response', sendSupport:'Send Support', accountState:'Account status',
    noTickets:'No support tickets yet', noAlerts:'No alerts yet', noLogs:'No logs yet', noDevices:'No devices yet',
    adminActions:'Admin actions', adminSupport:'Support', adminUsers:'Users', adminDevices:'Devices', adminAlerts:'Alerts',
    adminLogs:'Logs', savePrefs:'Save settings', prefsSaved:'Settings saved', latestStatus:'Latest status',
    triGuardLock:'TriGuard relies on multi-factor verification', issueDetails:'Issue details', openSupport:'Open ticket',
    contactUser:'User details', appearance:'Appearance', lightTheme:'Light', generalStatus:'General status',
    biometricSettings:'Security settings', adminTools:'Quick actions', addDevice:'Add device', deviceName:'Device name',
    adminHomeSubtitle:'Welcome, this is the complete TriGuard-style admin panel', userHomeSubtitle:'Your account overview with notifications and support',
    switchLanguage:'Switch language', esp32Health:'ESP32 & Modules Status', overallStatus:'Overall Status', moduleStatus:'Modules Status', faceSensor:'Face sensor', fingerSensor:'Fingerprint sensor', voiceSensor:'Voice sensor', controlUnit:'ESP32 control unit', healthy:'Healthy', degraded:'Needs attention', lastSeen:'Last seen', heartbeat:'Heartbeat', monitoredDevice:'Monitored device', healthPageSubtitle:'This page shows the ESP32 device state and the linked face, fingerprint, and voice modules, including whether they are online and working correctly.', noHealthData:'No monitoring data yet. Send a heartbeat from ESP32 or use the curl test command.', component:'Component', condition:'Condition', websiteStatus:'Website status', onlineNow:'Online now', offlineNow:'Offline now', goodWorking:'Working correctly', needsCheck:'Needs check', esp32Monitor:'ESP32 Monitor', supportTopic:'Problem topic (optional)', writeMessage:'Write your message here...', sendNow:'Send now', cancelAction:'Cancel', successfulLoginAlert:'Successful login alert', abnormalAttemptAlert:'Abnormal attempt alert', verificationFailureAlert:'Verification failure alert', onFailureOfVerification:'When Voice/Face/ECG verification fails', onAbnormalAttempt:'When a suspicious login attempt is detected', onSuccessfulLogin:'Notify when login succeeds', currentMode:'Current mode', noNotificationsYet:'No notifications', noNotificationsBody:'No notifications linked to your account have been recorded yet.', notificationDetails:'Details', adminNotes:'Admin notes', openSupportDialog:'Contact technical support', securitySettings:'Security settings', logoutAccount:'Logout', userLanding:'Profile', soundLabel:'Sound', vibrationLabel:'Vibration', silentLabel:'Silent', supportPageTitle:'Technical support', issueType:'Issue type', issueDescription:'Issue description', issueLogin:'Login', issueFace:'Face recognition', issueFingerprint:'Fingerprint', issueVoice:'Voice recognition', issueWebsite:'Website', issueDevice:'Device / hardware', issueOther:'Other', issuePlaceholder:'Choose issue type', autoSaveNotice:'Changes are saved automatically', supportIntro:'Send your support request here instead of the settings page.', saveChangesAuto:'Changes save automatically when you update them', pageNotFound:'Page not found', resultSuccess:'Success', resultFailed:'Failed', severityHigh:'High', severityMedium:'Medium', severityLow:'Low', commandWithoutFace:'Command without face', unknownFace:'Unknown face', suspendedAccount:'Suspended account', fingerprintNotEnrolled:'Fingerprint not enrolled', fingerprintTimeout:'Fingerprint timeout', fingerprintMismatch:'Fingerprint mismatch', fingerReading:'Reading finger', fingerNotFound:'Finger not found', removeFinger:'Remove finger', removeFingerTimeout:'Remove finger timeout', sayCommand:'Say command', wrongCommand:'Wrong command', voiceTimeout:'Voice timeout', verificationPassed:'Biometric verification passed', scanning:'Scanning', verifiedWord:'Verified', healthDeviceTitle:'Device & ESP32 status', closeDialog:'Close'
  }
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'triguard-secret', resave: false, saveUninitialized: false }));

app.use(async (req, res, next) => {
  req.session.lang = req.session.lang || 'ar';
  const lang = req.session.lang;
  res.locals.lang = lang;
  res.locals.dir = lang === 'ar' ? 'rtl' : 'ltr';
  res.locals.t = (key) => translations[lang][key] || key;
  res.locals.session = req.session;
  res.locals.flash = req.session.flash || '';
  res.locals.mapStatus = (status) => mapStatus(status, lang);
  res.locals.mapSeverity = (severity) => mapSeverity(severity, lang);
  res.locals.mapResult = (result) => mapResult(result, lang);
  res.locals.rt = (value) => translateRuntimeText(value, lang);
  res.locals.supportIssueOptions = supportIssueOptions(lang);
  delete req.session.flash;
  res.locals.currentPath = req.path;
  next();
});

function mapStatus(status, lang) {
  const map = {
    NEW: lang === 'ar' ? 'جديد' : 'New',
    IN_PROGRESS: lang === 'ar' ? 'قيد المعالجة' : 'In Progress',
    SOLVED: lang === 'ar' ? 'تم الحل' : 'Solved',
    ACTIVE: lang === 'ar' ? 'نشط' : 'Active',
    SUSPENDED: lang === 'ar' ? 'موقوف' : 'Suspended'
  };
  return map[status] || status;
}

function mapSeverity(severity, lang) {
  const map = {
    HIGH: lang === 'ar' ? 'عالي' : 'High',
    MEDIUM: lang === 'ar' ? 'متوسط' : 'Medium',
    LOW: lang === 'ar' ? 'منخفض' : 'Low'
  };
  return map[severity] || severity;
}

function mapResult(result, lang) {
  const map = {
    SUCCESS: lang === 'ar' ? 'نجاح' : 'Success',
    FAILED: lang === 'ar' ? 'فشل' : 'Failed'
  };
  return map[result] || result;
}

function translateRuntimeText(value, lang) {
  if (value === null || typeof value === 'undefined') return value;
  const text = String(value);
  const map = {
    'فشل تحقق / Verification Failed': lang === 'ar' ? 'فشل التحقق' : 'Verification failed',
    'Biometric verification passed': lang === 'ar' ? 'تم اجتياز التحقق' : 'Biometric verification passed',
    'Verified': lang === 'ar' ? 'تم التحقق' : 'Verified',
    'Scanning': lang === 'ar' ? 'جاري الفحص' : 'Scanning',
    'Command without face': lang === 'ar' ? 'أمر صوتي بدون وجه' : 'Command without face',
    'Unknown face': lang === 'ar' ? 'وجه غير معروف' : 'Unknown face',
    'Suspended account': lang === 'ar' ? 'الحساب موقوف' : 'Suspended account',
    'Suspended account attempted access': lang === 'ar' ? 'محاولة دخول من حساب موقوف' : 'Suspended account attempted access',
    'Fingerprint not enrolled': lang === 'ar' ? 'البصمة غير مسجلة' : 'Fingerprint not enrolled',
    'No fingerprint': lang === 'ar' ? 'لا توجد بصمة مسجلة' : 'No fingerprint',
    'Fingerprint timeout': lang === 'ar' ? 'انتهت مهلة البصمة' : 'Fingerprint timeout',
    'No fingerprint detected': lang === 'ar' ? 'لم يتم اكتشاف بصمة' : 'No fingerprint detected',
    'Fingerprint mismatch': lang === 'ar' ? 'البصمة غير مطابقة' : 'Fingerprint mismatch',
    'Finger not found': lang === 'ar' ? 'لم يتم العثور على البصمة' : 'Finger not found',
    'Reading finger': lang === 'ar' ? 'جاري قراءة البصمة' : 'Reading finger',
    'Remove finger': lang === 'ar' ? 'ارفع الإصبع' : 'Remove finger',
    'Finger not removed in time': lang === 'ar' ? 'لم يتم رفع الإصبع في الوقت المحدد' : 'Finger not removed in time',
    'Say command': lang === 'ar' ? 'قل الأمر الصوتي' : 'Say command',
    'Wrong command': lang === 'ar' ? 'أمر صوتي خاطئ' : 'Wrong command',
    'Voice timeout': lang === 'ar' ? 'انتهت مهلة الصوت' : 'Voice timeout',
    'Voice command timeout': lang === 'ar' ? 'انتهت مهلة الأمر الصوتي' : 'Voice command timeout',
    'Access denied': lang === 'ar' ? 'تم رفض الدخول' : 'Access denied',
    'No data': lang === 'ar' ? 'لا توجد بيانات' : 'No data'
  };
  return map[text] || text;
}

function supportIssueOptions(lang) {
  return [
    { value: 'login', label: lang === 'ar' ? 'تسجيل الدخول' : 'Login' },
    { value: 'face', label: lang === 'ar' ? 'التعرّف على الوجه' : 'Face recognition' },
    { value: 'fingerprint', label: lang === 'ar' ? 'بصمة الإصبع' : 'Fingerprint' },
    { value: 'voice', label: lang === 'ar' ? 'بصمة الصوت' : 'Voice recognition' },
    { value: 'website', label: lang === 'ar' ? 'الموقع الإلكتروني' : 'Website' },
    { value: 'device', label: lang === 'ar' ? 'الجهاز / العتاد' : 'Device / hardware' },
    { value: 'other', label: lang === 'ar' ? 'أخرى' : 'Other' }
  ];
}

function requireAdmin(req, res, next) { if (req.session.role !== 'admin') return res.redirect('/login/admin'); next(); }
function requireUser(req, res, next) { if (req.session.role !== 'user') return res.redirect('/login/user'); next(); }
function adminUsersError(req, res, message, error) {
  console.error('Admin users save error:', error);
  req.session.flash = message || (res.locals.t ? res.locals.t('invalidCreds') : 'Save failed');
  return res.redirect('/admin/users');
}
function cleanText(value) {
  return String(value ?? '').trim();
}
function preferredContact(contact, phone, email, fallback='') {
  return cleanText(contact) || cleanText(phone) || cleanText(email) || cleanText(fallback);
}
function parsePositiveInt(value, fallback = null) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : fallback;
}
async function touchSyncVersion() { await run(`UPDATE sync_state SET version=?, updated_at=CURRENT_TIMESTAMP WHERE id=1`, [`v-${Date.now()}`]); }
async function nextFaceId() { const row = await get('SELECT MAX(face_id) as maxFace FROM users'); return (row?.maxFace || 0) + 1; }

app.get('/lang/:lang', (req, res) => { req.session.lang = req.params.lang === 'en' ? 'en' : 'ar'; res.redirect(req.get('referer') || '/'); });

app.get('/', async (req, res) => {
  const counts = {
    users: (await get('SELECT COUNT(*) c FROM users')).c,
    support: (await get('SELECT COUNT(*) c FROM support_tickets')).c,
    devices: (await get('SELECT COUNT(*) c FROM devices')).c,
    sync: (await get('SELECT version FROM sync_state WHERE id=1')).version
  };
  res.render('landing', { counts });
});

app.get('/login/admin', (req,res)=>res.render('login',{role:'admin'}));
app.get('/login/user', (req,res)=>res.render('login',{role:'user'}));
app.post('/login/admin', async (req,res)=>{
  const admin = await get('SELECT * FROM admins WHERE email=? AND password=?',[req.body.contact, req.body.password]);
  if(!admin){ req.session.flash = res.locals.t('invalidCreds'); return res.redirect('/login/admin'); }
  req.session.role='admin'; req.session.admin=admin; res.redirect('/admin/dashboard');
});
app.post('/login/user', async (req,res)=>{
  const user = await get('SELECT * FROM users WHERE contact=? AND password=?',[req.body.contact, req.body.password]);
  if(!user){ req.session.flash = res.locals.t('invalidCreds'); return res.redirect('/login/user'); }
  req.session.role='user'; req.session.user=user; res.redirect('/user/profile');
});
app.get('/logout',(req,res)=>req.session.destroy(()=>res.redirect('/')));

// Admin
app.get('/admin/dashboard', requireAdmin, async (req,res)=>{
  const stats = {
    users:(await get('SELECT COUNT(*) c FROM users')).c,
    tickets:(await get('SELECT COUNT(*) c FROM support_tickets')).c,
    devices:(await get('SELECT COUNT(*) c FROM devices')).c,
    alerts:(await get("SELECT COUNT(*) c FROM alerts WHERE status='NEW'")).c,
    attempts:(await get("SELECT COUNT(*) c FROM access_logs WHERE date(created_at)=date('now')")).c,
    successRate: (await get(`SELECT ROUND(COALESCE(100.0*SUM(CASE WHEN result='SUCCESS' THEN 1 ELSE 0 END)/NULLIF(COUNT(*),0),0),1) as rate FROM access_logs`)).rate,
    sync:(await get('SELECT version FROM sync_state WHERE id=1')).version
  };
  const recentAlerts = await all('SELECT * FROM alerts ORDER BY id DESC LIMIT 4');
  const recentLogs = await all('SELECT * FROM access_logs ORDER BY id DESC LIMIT 5');
  res.render('admin-dashboard', { stats, recentAlerts, recentLogs });
});
app.get('/admin/users', requireAdmin, async (req,res)=>{ const users=await all('SELECT * FROM users ORDER BY COALESCE(finger_id, face_id, id), id'); res.render('admin-users',{users}); });
app.post('/admin/users/add', requireAdmin, async (req,res)=>{
  try {
    const fullName = cleanText(req.body.full_name);
    const email = cleanText(req.body.email);
    const phone = cleanText(req.body.phone);
    const contact = preferredContact(req.body.contact, phone, email);
    const password = cleanText(req.body.password) || '123456';
    if (!fullName) {
      req.session.flash = res.locals.t('fullName') + ' ' + res.locals.t('details');
      return res.redirect('/admin/users');
    }
    const fingerId = parsePositiveInt(req.body.finger_id, await nextFaceId());
    const faceId = fingerId;
    const cmdId = faceId + 4;
    const uid = 'EMP-' + String(1000 + faceId);
    const result = await run(`INSERT INTO users(full_name,contact,email,phone,password,status,face_id,cmd_id,finger_id,user_code,notification_mode,push_enabled,email_enabled,important_only,biometric_enabled,updated_at)
               VALUES(?,?,?,?,?,'ACTIVE',?,?,?,?,'sound',1,0,0,0,CURRENT_TIMESTAMP)`,
               [fullName, contact, email, phone, password, faceId, cmdId, fingerId, uid]);
    if (!result || !result.id) throw new Error('Insert user returned no id');
    await touchSyncVersion();
    req.session.flash = res.locals.t('updated');
    res.redirect('/admin/users');
  } catch (error) {
    return adminUsersError(req, res, 'Failed to create user', error);
  }
});
app.post('/admin/users/:id/update', requireAdmin, async (req,res)=>{
  try {
    const userId = parsePositiveInt(req.params.id);
    const current = await get('SELECT * FROM users WHERE id=?',[userId]);
    if (!current) {
      req.session.flash = res.locals.t('details');
      return res.redirect('/admin/users');
    }
    const fullName = cleanText(req.body.full_name) || current.full_name;
    const email = cleanText(req.body.email) || cleanText(current.email);
    const phone = cleanText(req.body.phone) || cleanText(current.phone);
    const contact = preferredContact(req.body.contact, phone, email, current.contact);
    const password = cleanText(req.body.password) || current.password;
    const status = ['ACTIVE','SUSPENDED'].includes(req.body.status) ? req.body.status : (current.status || 'ACTIVE');
    const fingerId = parsePositiveInt(req.body.finger_id, current.finger_id || current.face_id || 1);
    const faceId = fingerId;
    const cmdId = faceId + 4;
    const result = await run(`UPDATE users SET full_name=?, contact=?, email=?, phone=?, password=?, status=?, finger_id=?, face_id=?, cmd_id=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
      [fullName, contact, email, phone, password, status, fingerId, faceId, cmdId, userId]);
    if (!result || result.changes < 0) throw new Error('Update user failed');
    await touchSyncVersion();
    req.session.flash = res.locals.t('updated');
    res.redirect('/admin/users');
  } catch (error) {
    return adminUsersError(req, res, 'Failed to update user', error);
  }
});
app.post('/admin/users/:id/delete', requireAdmin, async (req,res)=>{
  try {
    const userId = parsePositiveInt(req.params.id);
    const result = await run('DELETE FROM users WHERE id=?',[userId]);
    if (!result || result.changes < 1) throw new Error('Delete user failed');
    await touchSyncVersion();
    req.session.flash=res.locals.t('deleted');
    res.redirect('/admin/users');
  } catch (error) {
    return adminUsersError(req, res, 'Failed to delete user', error);
  }
});

app.get('/admin/alerts', requireAdmin, async (req,res)=>{
  let where=''; const params=[];
  if(req.query.status && ['NEW','IN_PROGRESS','SOLVED'].includes(req.query.status)){ where='WHERE status=?'; params.push(req.query.status); }
  const alerts = await all(`SELECT * FROM alerts ${where} ORDER BY id DESC`, params);
  res.render('admin-alerts',{alerts});
});
app.get('/admin/alerts/:id', requireAdmin, async (req,res)=>{
  const alert = await get('SELECT * FROM alerts WHERE id=?',[req.params.id]);
  if(!alert) return res.status(404).render('404');
  res.render('admin-alert-detail',{alert});
});
app.post('/admin/alerts/:id', requireAdmin, async (req,res)=>{
  await run('UPDATE alerts SET status=?, admin_notes=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',[req.body.status, req.body.admin_notes||'', req.params.id]);
  req.session.flash=res.locals.t('updated'); res.redirect('/admin/alerts/'+req.params.id);
});

app.get('/admin/logs', requireAdmin, async (req,res)=>{
  const q=(req.query.q||'').trim();
  const filters=[]; const params=[];
  if(q){ filters.push('(user_name LIKE ? OR device_name LIKE ? OR attempt_code LIKE ?)'); params.push(`%${q}%`,`%${q}%`,`%${q}%`); }
  if(req.query.today==='1'){ filters.push("date(created_at)=date('now')"); }
  if(req.query.failed==='1'){ filters.push("result='FAILED'"); }
  const where = filters.length ? 'WHERE ' + filters.join(' AND ') : '';
  const logs = await all(`SELECT * FROM access_logs ${where} ORDER BY id DESC`, params);
  res.render('admin-logs',{logs,q, today:req.query.today==='1', failed:req.query.failed==='1'});
});
app.get('/admin/logs/:id', requireAdmin, async (req,res)=>{
  const log = await get('SELECT * FROM access_logs WHERE id=?',[req.params.id]); if(!log) return res.status(404).render('404'); res.render('admin-log-detail',{log});
});

app.get('/admin/devices', requireAdmin, async (req,res)=>{ const devices = await all('SELECT * FROM devices ORDER BY id'); const health = await get(`SELECT dh.*, d.name AS device_name, d.location AS device_location FROM device_health dh LEFT JOIN devices d ON d.id=dh.device_id WHERE dh.id=1`); res.render('admin-devices',{devices, health}); });
app.get('/admin/devices/:id', requireAdmin, async (req,res)=>{ const device=await get('SELECT * FROM devices WHERE id=?',[req.params.id]); if(!device) return res.status(404).render('404'); res.render('admin-device-detail',{device}); });
app.post('/admin/devices/add', requireAdmin, async (req,res)=>{
  const {name,type,location}=req.body; const code='DV-'+String(Math.floor(Math.random()*900)+100);
  await run(`INSERT INTO devices(device_code,name,type,location,is_active,is_online,last_seen,updated_at) VALUES(?,?,?,?,1,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,[code,name,type,location]);
  await touchSyncVersion(); req.session.flash=res.locals.t('updated'); res.redirect('/admin/devices');
});
app.post('/admin/devices/:id/toggle', requireAdmin, async (req,res)=>{ const d=await get('SELECT * FROM devices WHERE id=?',[req.params.id]); await run('UPDATE devices SET is_active=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',[d.is_active?0:1, req.params.id]); await touchSyncVersion(); res.redirect('/admin/devices/'+req.params.id); });


app.get('/admin/esp32-health', requireAdmin, async (req,res)=>{
  const healthRow = await get(`
    SELECT
      dh.*,
      d.name AS device_name,
      d.location AS device_location,
      d.type AS device_type
    FROM device_health dh
    LEFT JOIN devices d ON d.id = dh.device_id
    WHERE dh.id=?
  `,[1]);

  let health = null;
  if (healthRow) {
    const lastHeartbeat = new Date(healthRow.last_heartbeat);
    const now = new Date();
    const diffMs = now - lastHeartbeat;
    const onlineNow = diffMs <= 90 * 1000;
    health = {
      ...healthRow,
      onlineNow,
      overallHealthy: onlineNow && Number(healthRow.esp32_ok) === 1 && Number(healthRow.face_ok) === 1 && Number(healthRow.finger_ok) === 1 && Number(healthRow.voice_ok) === 1
    };
  }

  res.render('admin-esp32-health',{health});
});

app.get('/admin/support', requireAdmin, async (req,res)=>{ const tickets=await all('SELECT * FROM support_tickets ORDER BY id DESC'); res.render('admin-support-list',{tickets}); });
app.get('/admin/support/:id', requireAdmin, async (req,res)=>{ const ticket=await get('SELECT * FROM support_tickets WHERE id=?',[req.params.id]); if(!ticket) return res.status(404).render('404'); res.render('admin-support-detail',{ticket}); });
app.post('/admin/support/:id', requireAdmin, async (req,res)=>{ await run(`UPDATE support_tickets SET status=?, admin_reply=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,[req.body.status, req.body.admin_reply||'', req.params.id]); req.session.flash=res.locals.t('updated'); res.redirect('/admin/support/'+req.params.id); });
app.get('/admin/settings', requireAdmin, async (req,res)=>{ const admin = await get('SELECT * FROM admins WHERE id=1'); res.render('admin-settings',{admin}); });
app.post('/admin/settings', requireAdmin, async (req,res)=>{
  const current=await get('SELECT * FROM admins WHERE id=1');
  await run(`UPDATE admins SET
    full_name=?,
    email=?,
    biometric_enabled=?,
    notification_mode=?,
    push_enabled=?,
    email_enabled=?,
    important_only=?,
    password=?,
    updated_at=CURRENT_TIMESTAMP
    WHERE id=1`,[
      req.body.full_name || current.full_name,
      req.body.email || current.email,
      req.body.biometric_enabled ? 1 : 0,
      req.body.notification_mode || 'sound',
      req.body.push_enabled ? 1 : 0,
      req.body.email_enabled ? 1 : 0,
      req.body.important_only ? 1 : 0,
      req.body.password || current.password
    ]);
  await touchSyncVersion();
  req.session.admin = await get('SELECT * FROM admins WHERE id=1');
  req.session.flash=res.locals.t('prefsSaved');
  res.redirect('/admin/settings');
});

// User

app.post('/admin/change-password', requireAdmin, async (req,res)=>{
  const admin = await get('SELECT * FROM admins WHERE id=1');
  const current = (req.body.current_password || '').trim();
  const next = (req.body.new_password || '').trim();
  const confirm = (req.body.confirm_password || '').trim();
  if (!admin || current !== admin.password || !next || next.length < 4 || next !== confirm) {
    req.session.flash = res.locals.lang === 'ar' ? 'تعذر تغيير كلمة المرور، تأكد من البيانات.' : 'Could not change password. Check your input.';
    return res.redirect('/admin/settings');
  }
  await run('UPDATE admins SET password=?, updated_at=CURRENT_TIMESTAMP WHERE id=1',[next]);
  req.session.admin = await get('SELECT * FROM admins WHERE id=1');
  req.session.flash = res.locals.lang === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully';
  res.redirect('/admin/settings');
});
app.get('/user/dashboard', requireUser, async (req,res)=>{
  const user = await get('SELECT * FROM users WHERE id=?',[req.session.user.id]);
  const alerts = await all('SELECT * FROM alerts WHERE user_id=? ORDER BY id DESC LIMIT 3',[user.id]);
  const tickets = await all('SELECT * FROM support_tickets WHERE user_id=? ORDER BY id DESC LIMIT 3',[user.id]);
  res.render('user-dashboard',{user, alerts, tickets});
});
app.get('/user/notifications', requireUser, async (req,res)=>{ const alerts=await all('SELECT * FROM alerts WHERE user_id=? ORDER BY id DESC',[req.session.user.id]); res.render('user-notifications',{alerts}); });
app.get('/user/activity', requireUser, async (req,res)=>{ const logs=await all('SELECT * FROM access_logs WHERE user_id=? ORDER BY id DESC',[req.session.user.id]); res.render('user-activity',{logs}); });
app.get('/user/profile', requireUser, async (req,res)=>{ const user=await get('SELECT * FROM users WHERE id=?',[req.session.user.id]); res.render('user-profile',{user, editing:false}); });
app.get('/user/profile/edit', requireUser, async (req,res)=>{ const user=await get('SELECT * FROM users WHERE id=?',[req.session.user.id]); res.render('user-profile',{user, editing:true}); });
app.post('/user/profile', requireUser, async (req,res)=>{
  const current = await get('SELECT * FROM users WHERE id=?',[req.session.user.id]);
  await run(`UPDATE users SET full_name=?, contact=?, email=?, phone=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,[req.body.full_name, req.body.contact || req.body.phone || req.body.email, req.body.email || '', req.body.phone || '', req.session.user.id]);
  req.session.user = await get('SELECT * FROM users WHERE id=?',[req.session.user.id]);
  req.session.flash=res.locals.t('updated'); res.redirect('/user/profile');
});
app.get('/user/devices', requireUser, async (req,res)=>{ const devices=await all('SELECT * FROM devices ORDER BY id'); res.render('user-devices',{devices}); });
app.get('/user/settings', requireUser, async (req,res)=>{ const user=await get('SELECT * FROM users WHERE id=?',[req.session.user.id]); res.render('user-settings',{user}); });
app.get('/user/support', requireUser, async (req,res)=>{ const user=await get('SELECT * FROM users WHERE id=?',[req.session.user.id]); res.render('user-support',{user, issueOptions: supportIssueOptions(res.locals.lang)}); });
app.post('/user/settings', requireUser, async (req,res)=>{
  const u=req.session.user;
  const current = await get('SELECT * FROM users WHERE id=?',[u.id]);
  await run(`UPDATE users SET password=?, biometric_enabled=?, notification_mode=?, push_enabled=?, email_enabled=?, important_only=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`,
    [req.body.password || current.password, req.body.biometric_enabled?1:0, req.body.notification_mode || 'sound', req.body.push_enabled?1:0, req.body.email_enabled?1:0, req.body.important_only?1:0, u.id]);
  req.session.user = await get('SELECT * FROM users WHERE id=?',[u.id]);
  req.session.flash=res.locals.t('prefsSaved');
  res.redirect('/user/settings');
});

app.post('/user/change-password', requireUser, async (req,res)=>{
  const user = await get('SELECT * FROM users WHERE id=?',[req.session.user.id]);
  const current = (req.body.current_password || '').trim();
  const next = (req.body.new_password || '').trim();
  const confirm = (req.body.confirm_password || '').trim();
  if (!user || current !== user.password || !next || next.length < 4 || next !== confirm) {
    req.session.flash = res.locals.lang === 'ar' ? 'تعذر تغيير كلمة المرور، تأكد من البيانات.' : 'Could not change password. Check your input.';
    return res.redirect('/user/settings');
  }
  await run('UPDATE users SET password=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',[next, user.id]);
  req.session.user = await get('SELECT * FROM users WHERE id=?',[user.id]);
  req.session.flash = res.locals.lang === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully';
  res.redirect('/user/settings');
});
app.post('/user/support', requireUser, async (req,res)=>{
  const user = await get('SELECT * FROM users WHERE id=?',[req.session.user.id]);
  const issueType = cleanText(req.body.issue_type || req.body.subject || 'other').toLowerCase();
  const issueLabels = Object.fromEntries(supportIssueOptions(res.locals.lang).map(item => [item.value, item.label]));
  const issueLabel = issueLabels[issueType] || (res.locals.lang === 'ar' ? 'أخرى' : 'Other');
  await run(`INSERT INTO support_tickets(user_id,requester_name,requester_contact,subject,message,issue_type,status,created_at,updated_at) VALUES(?,?,?,?,?,?,'NEW',CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,
  [user.id, user.full_name, user.contact, issueLabel, req.body.message, issueType]);
  req.session.flash=res.locals.t('supportSaved'); res.redirect('/user/support');
});

// Device API
function requireDeviceKey(req,res,next){ if(req.header('x-device-key') !== DEVICE_SHARED_KEY) return res.status(401).json({success:false,message:'Unauthorized'}); next(); }
app.get('/api/device/sync/version', requireDeviceKey, async (req,res)=>{ res.json(await get('SELECT version, updated_at FROM sync_state WHERE id=1')); });
app.get('/api/device/users', requireDeviceKey, async (req,res)=>{
  const users = await all(`SELECT full_name as name, contact, status, face_id as faceId, cmd_id as cmdId, finger_id as fingerId FROM users ORDER BY face_id`);
  res.json({ users });
});
app.get('/api/device/devices', requireDeviceKey, async (req,res)=>{
  const devices = await all(`SELECT name, type, location, is_active as isActive, is_online as isOnline, device_code FROM devices ORDER BY id`);
  res.json({ devices });
});
app.get('/api/device/admin-profile', requireDeviceKey, async (req,res)=>{
  const admin = await get('SELECT full_name as fullName, email as contact FROM admins WHERE id=1'); res.json({ admin });
});
app.get('/api/device/bootstrap', requireDeviceKey, async (req,res)=>{
  const version = await get('SELECT version FROM sync_state WHERE id=1');
  const admin = await get('SELECT full_name as fullName, email as contact FROM admins WHERE id=1');
  const users = await all(`SELECT full_name as name, contact, status, face_id as faceId, cmd_id as cmdId, finger_id as fingerId FROM users ORDER BY face_id`);
  const devices = await all(`SELECT name, type, location, is_active as isActive, is_online as isOnline, device_code FROM devices ORDER BY id`);
  res.json({ syncVersion: version.version, admin, users, devices });
});
app.post('/api/device/heartbeat', requireDeviceKey, async (req,res)=>{
  const { deviceCode, deviceName, location, esp32Ok, faceOk, fingerOk, voiceOk, ipAddress, wifiSsid } = req.body;
  let device = null;
  if (deviceCode) device = await get('SELECT * FROM devices WHERE device_code=?',[deviceCode]);
  if (!device && deviceName) device = await get('SELECT * FROM devices WHERE name=?',[deviceName]);
  if (!device) {
    const code = deviceCode || ('DV-' + String(Date.now()).slice(-4));
    await run(`INSERT INTO devices(device_code,name,type,location,is_active,is_online,last_seen,updated_at) VALUES(?,?,?,?,1,1,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`, [code, deviceName || 'ESP32 Main Unit', 'ESP32 Control Unit', location || 'Main Gate']);
    device = await get('SELECT * FROM devices WHERE device_code=?',[code]);
  } else {
    await run(`UPDATE devices SET is_online=1, last_seen=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP WHERE id=?`, [device.id]);
  }

  await run(`INSERT INTO device_health(id, device_id, device_code, esp32_ok, face_ok, finger_ok, voice_ok, ip_address, wifi_ssid, last_heartbeat, updated_at)
             VALUES(1, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
             ON CONFLICT(id) DO UPDATE SET
               device_id=excluded.device_id, device_code=excluded.device_code,
               esp32_ok=excluded.esp32_ok, face_ok=excluded.face_ok, finger_ok=excluded.finger_ok, voice_ok=excluded.voice_ok,
               ip_address=excluded.ip_address, wifi_ssid=excluded.wifi_ssid, last_heartbeat=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP`,
             [device.id, device.device_code, esp32Ok ? 1 : 0, faceOk ? 1 : 0, fingerOk ? 1 : 0, voiceOk ? 1 : 0, ipAddress || '', wifiSsid || '']);

  res.json({ success:true, deviceCode: device.device_code });
});
app.post('/api/device/event', requireDeviceKey, async (req,res)=>{
  const { faceId, cmdId, deviceName, deviceType, result, reason } = req.body;
  const user = await get('SELECT * FROM users WHERE face_id=?',[faceId]);
  const device = await get('SELECT * FROM devices WHERE name=?',[deviceName]);
  const attemptCode = 'AT-' + String(Date.now()).slice(-4);
  await run(`INSERT INTO access_logs(user_id,user_name,device_name,attempt_code,result,reason,face_id,cmd_id,voice_ok,face_ok,created_at)
             VALUES(?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
             [user?.id || null, user?.full_name || `Face ${faceId}`, deviceName || 'ESP32', attemptCode, result || 'FAILED', reason || '', faceId || 0, cmdId || 0, result==='SUCCESS'?1:0, user?1:0]);
  if(result !== 'SUCCESS') {
    await run(`INSERT INTO alerts(user_id,title,subtitle,severity,status,device_name,user_name,details,created_at,updated_at)
               VALUES(?,?,?,?,? ,?,?,?,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)`,
               [user?.id || null, 'فشل تحقق / Verification Failed', `${deviceName || 'Front Camera'} - ${reason || 'Access denied'}`, 'HIGH', 'NEW', deviceName || 'Front Camera', user?.full_name || `Face ${faceId}`, reason || '']);
  }
  res.json({ success:true });
});

app.use((req,res)=> res.status(404).render('404'));
app.listen(PORT, ()=> console.log(`TriGuard running on http://localhost:${PORT}`));
