const $=s=>document.querySelector(s),$=s=>document.querySelectorAll(s);
const ICONS={
search:'<circle cx="11" cy="11" r="7"></circle><path d="m20 20-4-4"></path>',
moon:'<path d="M20 15.5A8.5 8.5 0 0 1 8.5 4 7 7 0 1 0 20 15.5Z"></path>',
sun:'<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path>',
compass:'<circle cx="12" cy="12" r="8"></circle><path d="m14.8 9.2-1.7 3.9-3.9 1.7 1.7-3.9 3.9-1.7Z"></path>',
leaf:'<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-6 10-16Z"></path><path d="M4 20c3-5 7-8 12-10"></path>',
'arrow-left':'<path d="M19 12H5"></path><path d="m12 19-7-7 7-7"></path>',
tent:'<path d="m3 20 9-16 9 16"></path><path d="M7 20h10"></path><path d="m12 4 3 16"></path>',
badge:'<path d="m12 3 2.5 2 3.2-.2.9 3.1 2.4 2.1-1.5 2.8.6 3.1-3 1.2-1.7 2.7-3-1-3 1-1.7-2.7-3-1.2.6-3.1L2.9 10l2.4-2.1.9-3.1 3.2.2L12 3Z"></path><path d="m9 12 2 2 4-4"></path>',
check:'<path d="m5 12 4 4L19 6"></path>',
book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z"></path><path d="M4 18h16"></path>',
users:'<path d="M16 20v-1.5A3.5 3.5 0 0 0 12.5 15h-5A3.5 3.5 0 0 0 4 18.5V20"></path><circle cx="10" cy="8" r="3"></circle><path d="M16 5.2a3 3 0 0 1 0 5.6M20 19v-1.2a3.4 3.4 0 0 0-2.5-3.3"></path>',
map:'<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"></path><path d="M9 3v15M15 6v15"></path>',
chart:'<path d="M4 19V5"></path><path d="M4 19h16"></path><path d="m7 15 3-4 3 2 5-7"></path>',
calendar:'<rect x="3" y="4" width="18" height="17" rx="3"></rect><path d="M16 2v4M8 2v4M3 9h18"></path>',
shield:'<path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"></path><path d="m9 12 2 2 4-4"></path>',
home:'<path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10M9 20v-6h6v6"></path>',
user:'<circle cx="12" cy="8" r="3.5"></circle><path d="M5 21a7 7 0 0 1 14 0"></path>'
};
function iconSvg(name){
  return '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'+(ICONS[name]||ICONS.compass)+'</svg>';
}
function mountIcons(){
  $('[data-icon]').forEach(el=>{
    const name=el.dataset.icon;
    el.innerHTML=iconSvg(name);
  });
}
const modal=$("#modal"),box=$("#modalBox"),toast=$("#toast");
let toastTimer;
let activeRole=localStorage.getItem("scoutRole")||"ولي";

function show(html){
  box.innerHTML='<button class="close" id="close" aria-label="إغلاق">×</button>'+html;
  modal.classList.add("show");
  const close=$("#close"); if(close) close.onclick=closeModal;
}
function closeModal(){modal.classList.remove("show")}
function notify(t){
  clearTimeout(toastTimer); toast.textContent=t; toast.classList.add("show");
  toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
}
function setActiveNav(id){
  $$(".nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));
  $$(".mobile-nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));
}
const focusSections=["home","discover","activities","badges","community"];
function go(id){
  const el=$("#"+id);
  if(!el){
    if(id==="skills")return skillsView();
    if(id==="tasks")return tasksView();
    if(id==="roles")return rolesView();
    return notify("هذا القسم غير متاح حاليًا");
  }
  if(innerWidth<=650){
    if(location.hash!=="#"+id) location.hash=id;
    mobileFocus();
  }else{
    el.scrollIntoView({behavior:"smooth",block:"start"});
  }
  setActiveNav(id);
}
function mobileFocus(){
  const main=document.querySelector("main");
  if(innerWidth<=650){
    const wanted=(location.hash||"#home").slice(1);
    const target=focusSections.includes(wanted)?wanted:"home";
    main.classList.add("mobile-focus");
    focusSections.forEach(id=>{const el=$("#"+id);if(el)el.classList.toggle("mobile-current",id===target)});
    setActiveNav(target);
    window.scrollTo(0,0);
  }else{
    main.classList.remove("mobile-focus");
    focusSections.forEach(id=>{const el=$("#"+id);if(el)el.classList.remove("mobile-current")});
    const wanted=(location.hash||"#home").slice(1);
    if(focusSections.includes(wanted))setActiveNav(wanted);
  }
}
function syncTheme(){
  const dark=localStorage.getItem("scoutTheme")==="dark";
  document.body.classList.toggle("dark",dark);
  const b=$("#themeBtn");if(b)b.textContent=dark?"☀":"☾";
}
function activityJoin(){
  if(localStorage.getItem("activityJoined")==="1")return notify("أنت مسجل بالفعل في هذا النشاط ✓");
  localStorage.setItem("activityJoined","1");
  const b=$("#joinActivity");if(b){b.textContent="تم التسجيل ✓";b.classList.remove("primary");b.classList.add("ghost")}
  notify("تم تسجيل مشاركتك في النشاط ✓");
}
function challengeView(){
  show('<span class="eyebrow">تحدي الأسبوع</span><h2>تحدي الملاحة 🧭</h2><p>أكمل 5 مهام قصيرة حول الاتجاهات والخريطة والبوصلة لتحصل على 120 نقطة.</p><div class="feature-catalog"><div class="catalog-item"><b>01</b><small>تحديد الاتجاهات</small></div><div class="catalog-item"><b>02</b><small>قراءة الخريطة</small></div><div class="catalog-item"><b>03</b><small>استخدام البوصلة</small></div></div><button class="primary" id="startChallenge">ابدأ الآن</button>');
  $("#startChallenge").onclick=()=>{localStorage.setItem("challengeStarted","1");notify("تم بدء التحدي 🚀");closeModal()};
}
function calendarView(){
  show('<span class="eyebrow">الأنشطة</span><h2>التقويم الكامل 📅</h2><p>اختر نشاطًا لعرضه.</p><div class="feature-catalog"><button class="catalog-item" onclick="notify(\'تم اختيار رحلة الجبل\');closeModal()">05 أكتوبر — رحلة الجبل</button><button class="catalog-item" onclick="notify(\'تم اختيار حملة التشجير\');closeModal()">10 أكتوبر — حملة التشجير</button><button class="catalog-item" onclick="notify(\'تم اختيار تدريب الملاحة\');closeModal()">15 أكتوبر — تدريب الملاحة</button><button class="catalog-item" onclick="notify(\'تم اختيار ليلة السمر\');closeModal()">18 أكتوبر — ليلة السمر</button></div>');
}
function badgesView(){
  show('<span class="eyebrow">إنجازاتك</span><h2>معرض الشارات 🏅</h2><p>تابع الشارات المكتملة وقيد التقدم.</p><div class="feature-catalog"><article class="catalog-item"><b>🩹 الإسعافات الأولية</b><small>مكتملة · 100%</small></article><article class="catalog-item"><b>🔥 خبير المخيم</b><small>مكتملة · 100%</small></article><article class="catalog-item"><b>🧭 سيد الملاحة</b><small>قيد التقدم · 68%</small></article><article class="catalog-item"><b>🌳 حامي البيئة</b><small>قيد التقدم · 60%</small></article></div>');
}
function communityView(){
  show('<span class="eyebrow">مجتمع كشّاف</span><h2>مساحتك مع الفريق 🤝</h2><p>الفرق والرسائل والترتيب في مكان واحد.</p><div class="feature-catalog"><button class="catalog-item" onclick="notify(\'تم فتح الفرق\')"><b>👥 الفرق</b><small>إدارة ومتابعة فرقك</small></button><button class="catalog-item" onclick="notify(\'لا توجد رسائل جديدة\')"><b>💬 الرسائل</b><small>تواصل مع الفريق</small></button><button class="catalog-item" onclick="notify(\'تم فتح الترتيب\')"><b>🏆 الترتيب</b><small>نتائج التحديات</small></button></div>');
}
function skillsView(){
  show('<span class="eyebrow">التقدم</span><h2>مهاراتي 🧭</h2><div class="feature-catalog"><article class="catalog-item"><b>الملاحة</b><small>76% تقدم</small></article><article class="catalog-item"><b>الإسعافات الأولية</b><small>88% تقدم</small></article><article class="catalog-item"><b>التخييم</b><small>71% تقدم</small></article><article class="catalog-item"><b>القيادة والعمل الجماعي</b><small>64% تقدم</small></article></div>');
}
function tasksView(){
  show('<span class="eyebrow">اليوم</span><h2>مهامي ✓</h2><div class="feature-catalog"><button class="catalog-item" onclick="notify(\'تم إنجاز المهمة +20 نقطة\')"><b>○ مراجعة درس الإسعافات</b><small>+20 نقطة</small></button><button class="catalog-item" onclick="notify(\'تم إنجاز المهمة +20 نقطة\')"><b>○ إنجاز تحدي الملاحة</b><small>+20 نقطة</small></button><button class="catalog-item" onclick="notify(\'تم إنجاز المهمة +20 نقطة\')"><b>○ رفع صورة النشاط</b><small>+20 نقطة</small></button></div>');
}
function menuView(){
  show('<span class="eyebrow">التنقل</span><h2>استكشف كشّاف</h2><div class="feature-catalog"><button class="catalog-item" onclick="closeModal();go(\'home\')">⌂ الرئيسية</button><button class="catalog-item" onclick="closeModal();go(\'discover\')">✦ اكتشف</button><button class="catalog-item" onclick="closeModal();go(\'activities\')">◷ الأنشطة</button><button class="catalog-item" onclick="closeModal();go(\'badges\')">🏅 الشارات</button><button class="catalog-item" onclick="closeModal();go(\'community\')">♧ المجتمع</button></div>');
}
function searchView(){
  show('<span class="eyebrow">بحث سريع</span><h2>ابحث في كشّاف 🔎</h2><label class="field"><span>ابحث</span><input id="siteSearch" autofocus placeholder="نشاط، شارة، مهارة..."></label><div id="searchResults"><p>اكتب كلمة للبحث.</p></div>');
  $("#siteSearch").oninput=e=>{
    const q=e.target.value.trim().toLowerCase();
    const items=[["رحلة الجبل","activities"],["الشارات","badges"],["المهارات","skills"],["المهام","tasks"],["المجتمع","community"],["الأدوار","roles"]];
    const results=items.filter(x=>!q||x[0].toLowerCase().includes(q));
    $("#searchResults").innerHTML=results.map(x=>'<button class="catalog-item" style="width:100%;text-align:right;margin:4px 0" onclick="'+(x[1]==="roles"?"rolesView()":"closeModal();go(\'"+x[1]+"\')")+'"><b>'+x[0]+'</b></button>').join("")||"<p>لا توجد نتائج.</p>";
  };
}
function loginView(){
  show('<div class="login-grid"><div class="login-art"><span class="eyebrow dark">مرحبًا بك</span><h2>ادخل إلى عالمك الكشفي.</h2><p>حساب واحد، وتجربة مختلفة حسب نوعك وصلاحياتك.</p><div style="font-size:65px;margin-top:45px">🏕️ 🧭 🏅</div></div><div class="login-form"><h2>تسجيل الدخول</h2><p>هذه نسخة تجريبية؛ البيانات لا تُرسل إلى خادم.</p><label class="field"><span>البريد الإلكتروني</span><input type="email" placeholder="name@example.com"></label><label class="field"><span>كلمة المرور</span><input type="password" placeholder="••••••••"></label><button class="primary" id="doLogin" style="width:100%">دخول</button><button class="ghost" id="openRegister" style="width:100%;margin-top:8px">إنشاء حساب جديد</button></div></div>');
  $("#doLogin").onclick=()=>{localStorage.setItem("loggedIn","1");closeModal();notify("تم الدخول إلى الحساب التجريبي ✓");accountView()};
  $("#openRegister").onclick=registerView;
}
function registerView(){
  show('<h2>إنشاء حساب</h2><p>اختر نوع التجربة التي تريد استخدامها.</p><div class="login-grid"><div><label class="field"><span>الاسم</span><input id="regName" placeholder="الاسم الكامل"></label><label class="field"><span>البريد</span><input id="regEmail" type="email" placeholder="name@example.com"></label><label class="field"><span>كلمة المرور</span><input id="regPassword" type="password"></label></div><div><label class="field"><span>نوع الحساب</span><select id="regRole"><option>كشاف</option><option>ولي</option><option>قائد</option><option>مشرف</option><option>مدير</option><option>دور مخصص</option></select></label><label class="field"><span>الهاتف</span><input placeholder="+213"></label><button class="primary" id="doRegister" style="margin-top:20px;width:100%">إنشاء الحساب</button></div></div>');
  $("#doRegister").onclick=()=>{const n=$("#regName").value.trim()||"أحمد محمد";const role=$("#regRole").value;localStorage.setItem("loggedIn","1");localStorage.setItem("userName",n);localStorage.setItem("userRole",role);activeRole=role;closeModal();notify("تم إنشاء الحساب التجريبي ✓");accountView()};
}
function accountView(){
  const name=localStorage.getItem("userName")||"أحمد محمد",role=localStorage.getItem("userRole")||"كشاف";
  show('<span class="eyebrow">الحساب الحالي</span><h2>'+name+' 👋</h2><p>'+role+' • المستوى 04 • 2,450 نقطة</p><div class="quick-grid" style="margin-top:20px"><button id="profileBtn">👤<b>ملفي</b><small>المعلومات والإنجازات</small></button><button id="noticeBtn">🔔<b>الإشعارات</b><small>3 جديدة</small></button><button id="settingsBtn">⚙️<b>الإعدادات</b><small>التفضيلات والخصوصية</small></button><button id="permissionBtn">🛡️<b>الصلاحيات</b><small>إدارة الأدوار</small></button></div><button class="ghost" id="logoutBtn" style="width:100%;margin-top:12px">تسجيل الخروج</button>');
  $("#profileBtn").onclick=profileView;$("#noticeBtn").onclick=notificationsView;$("#settingsBtn").onclick=settingsView;$("#permissionBtn").onclick=rolesView;
  $("#logoutBtn").onclick=()=>{localStorage.removeItem("loggedIn");closeModal();notify("تم تسجيل الخروج")};
}
function profileView(){show('<span class="eyebrow">ملفي الشخصي</span><h2>رحلتي الكشفية</h2><div class="feature-catalog"><div class="catalog-item"><b>2,450</b><small>نقطة</small></div><div class="catalog-item"><b>14</b><small>شارة مكتملة</small></div><div class="catalog-item"><b>38</b><small>نشاطًا</small></div><div class="catalog-item"><b>76%</b><small>تقدم المهارات</small></div></div>')}
function notificationsView(){show('<span class="eyebrow">مركز التنبيهات</span><h2>الإشعارات 🔔</h2><div class="feature-catalog"><div class="catalog-item"><b>تم قبول تسجيلك</b><small>رحلة الجبل • منذ ساعة</small></div><div class="catalog-item"><b>شارة جديدة قريبة</b><small>أكملت 68% من سيد الملاحة</small></div><div class="catalog-item"><b>تذكير</b><small>تحدي الملاحة متاح اليوم</small></div></div><button class="ghost" onclick="notify(\'تم تعليم الإشعارات كمقروءة\');closeModal()">تعليم الكل كمقروء</button>')}
function settingsView(){show('<span class="eyebrow">الإعدادات</span><h2>تخصيص التجربة ⚙️</h2><div class="feature-catalog"><label class="catalog-item"><b>الوضع الداكن</b><input id="darkSetting" type="checkbox" '+(document.body.classList.contains("dark")?"checked":"")+'></label><label class="catalog-item"><b>الإشعارات</b><input type="checkbox" checked></label></div><button class="primary" id="saveSettings">حفظ الإعدادات</button>');$("#saveSettings").onclick=()=>{const d=$("#darkSetting").checked;document.body.classList.toggle("dark",d);localStorage.setItem("scoutTheme",d?"dark":"light");syncTheme();notify("تم حفظ الإعدادات ✓");closeModal()}}
const permissionGroups={"الرئيسية":["عرض لوحة التحكم","عرض الملف الشخصي","تعديل الملف الشخصي","تغيير الصورة"],"الكشافون":["عرض الكشافين","إنشاء كشاف","تعديل كشاف","تعليق حساب","حذف حساب"],"الأنشطة":["عرض الأنشطة","إنشاء نشاط","تعديل نشاط","حذف نشاط","التسجيل","إدارة الحضور","تقييم المشاركين"],"التعلم":["عرض الدروس","إنشاء درس","تعديل المحتوى","إنشاء اختبار","تصحيح اختبار"],"الشارات":["عرض الشارات","إنشاء شارة","منح شارة","سحب شارة","إدارة المتطلبات"],"المجتمع":["عرض الفرق","إنشاء فريق","إدارة المجموعات","إرسال إعلانات","إدارة التعليقات"],"المالية":["عرض المدفوعات","إدارة الاشتراكات","إصدار إيصال","تقارير مالية"],"الإدارة":["إدارة المستخدمين","إدارة الأدوار","إدارة الصلاحيات","سجل التدقيق","إعدادات المنصة"]};
function rolesView(){
  show('<div class="role-builder"><div><span class="eyebrow">نظام الصلاحيات</span><h2>الأدوار والوصول</h2><p>اختر الدور ثم عدّل الصلاحيات.</p><div class="role-menu">'+["كشاف","ولي","قائد","مشرف","مدير","دور مخصص"].map(x=>'<button class="'+(x===activeRole?"active":"")+'" data-role="'+x+'">'+x+'</button>').join("")+'</div></div><div><h2>صلاحيات: '+activeRole+'</h2><div class="permission-grid">'+Object.entries(permissionGroups).flatMap(([g,ps])=>ps.map(p=>'<label class="permission"><input type="checkbox" '+((activeRole==="مدير"||activeRole==="مشرف"||activeRole==="قائد"&&["الأنشطة","التعلم","الشارات"].includes(g))?"checked":"")+'><span>'+p+'<small style="display:block;color:var(--muted)">'+g+'</small></span></label>')).join("")+'</div><div class="role-actions"><button class="ghost" id="newRole">+ إنشاء دور</button><button class="primary" id="saveRole">حفظ الصلاحيات</button></div></div></div>');
  $$("[data-role]").forEach(b=>b.onclick=()=>{activeRole=b.dataset.role;localStorage.setItem("scoutRole",activeRole);rolesView()});
  $("#saveRole").onclick=()=>notify("تم حفظ صلاحيات دور "+activeRole+" ✓");
  $("#newRole").onclick=()=>{const n=prompt("اسم الدور الجديد");if(n){activeRole=n;localStorage.setItem("scoutRole",n);rolesView();notify("تم إنشاء الدور ✓")}};
}
function featuresView(){
  const groups=["الحسابات والهوية","الأنشطة والفعاليات","التعلم والأكاديمية","الشارات والإنجازات","الحضور والميدان","المجتمع والتواصل","المخيمات والرحلات","المكتبة والمحتوى","الإشعارات","التقارير والتحليلات","الإدارة والصلاحيات","الأمان والخصوصية","التخصيص والعلامة التجارية","المدفوعات","التكاملات وواجهات API"];
  show('<span class="eyebrow">Feature Engine</span><h2>مركز المزايا</h2><p>وحدات المنصة منظمة لتتوسع بدون تشتيت المستخدم.</p><div class="feature-catalog">'+groups.map(g=>'<button class="catalog-item" onclick="notify(\'فتح وحدة '+g+'\')"><b>'+g+'</b><small>بحث متقدم • تقويم • إشعارات • تقارير</small></button>').join("")+'</div>');
}
modal.onclick=e=>{if(e.target===modal)closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();searchView()}});
$("#themeBtn").onclick=()=>{const d=!document.body.classList.contains("dark");document.body.classList.toggle("dark",d);localStorage.setItem("scoutTheme",d?"dark":"light");syncTheme();notify(d?"تم تفعيل الوضع الداكن":"تم تفعيل الوضع الفاتح")};
$("#startBtn").onclick=()=>go("discover");
$("#loginBtn").onclick=loginView;
$("#accountBtn").onclick=accountView;
$("#mobileAccount").onclick=accountView;
$("#hamb").onclick=menuView;
$("#joinActivity").onclick=activityJoin;
$("#challengeBtn").onclick=challengeView;
$("#calendarBtn").onclick=calendarView;
$("#badgesBtn").onclick=badgesView;
$("#communityBtn").onclick=communityView;
$("#footerRoles").onclick=e=>{e.preventDefault();rolesView()};
$("#footerSettings").onclick=e=>{e.preventDefault();settingsView()};
$("#footerHelp").onclick=e=>{e.preventDefault();go("discover")};
$("#rolesBtn").onclick=rolesView;
$("#allFeaturesBtn").onclick=featuresView;
$("#searchBtn").onclick=searchView;
$("[data-open]").forEach(b=>{
  b.addEventListener("click",e=>{e.preventDefault();go(b.dataset.open)});
  b.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go(b.dataset.open)}});
});
$("a[href^='#']").forEach(a=>{
  const id=(a.getAttribute("href")||"").slice(1);
  if(!id)return;
  a.addEventListener("click",e=>{
    if(a.id==="footerRoles"||a.id==="accountBtn")return;
    e.preventDefault();go(id);
  });
});

$$(".nav a,.mobile-nav a").forEach(a=>a.addEventListener("click",()=>setTimeout(mobileFocus,0)));
window.addEventListener("hashchange",mobileFocus);
window.addEventListener("resize",mobileFocus);
syncTheme();
if(localStorage.getItem("activityJoined")==="1"){const b=$("#joinActivity");if(b){b.textContent="تم التسجيل ✓";b.classList.remove("primary");b.classList.add("ghost")}}
mobileFocus();