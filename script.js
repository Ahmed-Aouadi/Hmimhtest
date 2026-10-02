const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const modal=$("#modal"),box=$("#modalBox"),toast=$("#toast");
function show(html){box.innerHTML='<button class="close" id="close">×</button>'+html;modal.classList.add("show");$("#close").onclick=()=>modal.classList.remove("show")}
function notify(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)}
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};

$("#themeBtn").onclick=()=>{const d=!document.body.classList.contains("dark");document.body.classList.toggle("dark",d);localStorage.setItem("scoutTheme",d?"dark":"light");notify(d?"تم تفعيل الوضع الداكن":"تم تفعيل الوضع الفاتح")};
$("#startBtn").onclick=()=>go("discover");
$("#loginBtn").onclick=()=>show(loginView());
$("#accountBtn").onclick=()=>show(accountView());
$("#mobileAccount").onclick=()=>show(accountView());
$("#joinActivity").onclick=()=>{localStorage.setItem("activityJoined","1");notify("تم تسجيل مشاركتك في النشاط ✓");$("#joinActivity").textContent="تم التسجيل ✓";};
$("#challengeBtn").onclick=()=>show('<span class="eyebrow">تحدي الأسبوع</span><h2>تحدي الملاحة 🧭</h2><p>أكمل 5 مهام قصيرة حول الاتجاهات والخريطة والبوصلة لتحصل على 120 نقطة.</p><button class="primary" onclick="notify(\'بدأ التحدي بنجاح 🚀\');modal.classList.remove(\'show\')">ابدأ الآن</button>');
$("#calendarBtn").onclick=()=>calendarView();
$("#badgesBtn").onclick=()=>badgesView();
$("#communityBtn").onclick=()=>communityView();
$("#footerRoles").onclick=()=>rolesView();
$("#hamb").onclick=()=>show(menuView());
$("#rolesBtn").onclick=()=>rolesView();
$("#allFeaturesBtn").onclick=()=>featuresView();
function go(id){\n const el=document.querySelector("#"+id);\n if(!el){if(id==="skills")return skillsView();if(id==="tasks")return tasksView();return notify("القسم غير متاح حاليًا")}\n if(innerWidth<=650){location.hash=id;mobileFocus()}else el.scrollIntoView({behavior:"smooth",block:"start"});\n setActiveNav(id);\n}\nfunction setActiveNav(id){$(".nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));$(".mobile-nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id))}\n$("[data-open]").forEach(b=>b.onclick=()=>go(b.dataset.open));

function loginView(){return '<div class="login-grid"><div class="login-art"><span class="eyebrow dark">مرحبًا بك</span><h2>ادخل إلى عالمك الكشفي.</h2><p>حساب واحد، وتجربة مختلفة حسب نوعك وصلاحياتك.</p><div style="font-size:65px;margin-top:45px">🏕️ 🧭 🏅</div></div><div class="login-form"><h2>تسجيل الدخول</h2><p>يمكنك لاحقًا ربط هذه الواجهة بـ Supabase أو Firebase أو نظامك الخاص.</p><label class="field"><span>البريد الإلكتروني</span><input placeholder="name@example.com"></label><label class="field"><span>كلمة المرور</span><input type="password" placeholder="••••••••"></label><button class="primary" style="width:100%" onclick="notify(\'تم الدخول إلى الحساب التجريبي ✓\');modal.classList.remove(\'show\')">دخول</button><button class="ghost" style="width:100%;margin-top:8px" onclick="show(registerView())">إنشاء حساب جديد</button></div></div>'}
function registerView(){return '<h2>إنشاء حساب</h2><p>النوع هنا مجرد مثال. في النظام الحقيقي أنت من يحدد الأنواع من لوحة الإدارة.</p><div class="login-grid"><div><label class="field"><span>الاسم</span><input placeholder="الاسم الكامل"></label><label class="field"><span>البريد</span><input placeholder="name@example.com"></label><label class="field"><span>كلمة المرور</span><input type="password"></label></div><div><label class="field"><span>نوع الحساب</span><select><option>كشاف</option><option>ولي</option><option>قائد</option><option>دور مخصص</option></select></label><label class="field"><span>الهاتف</span><input placeholder="+213"></label><button class="primary" style="margin-top:20px" onclick="notify(\'تم إنشاء الحساب التجريبي ✓\');modal.classList.remove(\'show\')">إنشاء الحساب</button></div></div>'}
function accountView(){return '<span class="eyebrow">الحساب الحالي</span><h2>أحمد محمد 👋</h2><p>كشاف • المستوى 04 • 2,450 نقطة</p><div class="quick-grid" style="margin-top:20px"><button onclick="notify(\'فتح الملف الشخصي\')">👤<b>ملفي</b><small>المعلومات والإنجازات</small></button><button onclick="notify(\'الإشعارات جاهزة\')">🔔<b>الإشعارات</b><small>3 جديدة</small></button><button onclick="notify(\'الإعدادات جاهزة\')">⚙️<b>الإعدادات</b><small>التفضيلات والخصوصية</small></button><button onclick="rolesView()">🛡️<b>الصلاحيات</b><small>إدارة الأدوار</small></button></div>'}

const permissionGroups={
"الرئيسية":["عرض لوحة التحكم","عرض الملف الشخصي","تعديل الملف الشخصي","تغيير الصورة"],
"الكشافون":["عرض الكشافين","إنشاء كشاف","تعديل كشاف","تعليق حساب","حذف حساب"],
"الأنشطة":["عرض الأنشطة","إنشاء نشاط","تعديل نشاط","حذف نشاط","التسجيل","إدارة الحضور","تقييم المشاركين"],
"التعلم":["عرض الدروس","إنشاء درس","تعديل المحتوى","إنشاء اختبار","تصحيح اختبار"],
"الشارات":["عرض الشارات","إنشاء شارة","منح شارة","سحب شارة","إدارة المتطلبات"],
"المجتمع":["عرض الفرق","إنشاء فريق","إدارة المجموعات","إرسال إعلانات","إدارة التعليقات"],
"المالية":["عرض المدفوعات","إدارة الاشتراكات","إصدار إيصال","تقارير مالية"],
"الإدارة":["إدارة المستخدمين","إدارة الأدوار","إدارة الصلاحيات","سجل التدقيق","إعدادات المنصة"]
};
let activeRole="ولي";
function rolesView(){show('<div class="role-builder"><div><span class="eyebrow">نظام الصلاحيات</span><h2>الأدوار والوصول</h2><p>أنشئ عددًا غير محدود من أنواع الحسابات.</p><div class="role-menu">'+["كشاف","ولي","قائد","مشرف","مدير","دور مخصص"].map(x=>'<button class="'+(x===activeRole?"active":"")+'" data-role="'+x+'">'+x+'</button>').join("")+'</div></div><div><h2>صلاحيات: '+activeRole+'</h2><p>فعّل أو عطّل ما يستطيع هذا الدور الوصول إليه. هذه الواجهة تمثل نظام RBAC قابلًا للتوسع.</p><div class="permission-grid">'+Object.entries(permissionGroups).flatMap(([g,ps])=>ps.map(p=>'<label class="permission"><input type="checkbox" '+((activeRole==="مدير"||activeRole==="قائد"&&["الأنشطة","التعلم","الشارات"].includes(g))?"checked":"")+'><span>'+p+'<small style="display:block;color:var(--muted)">'+g+'</small></span></label>')).join("")+'</div><div class="role-actions"><button class="ghost" id="newRole">+ إنشاء دور جديد</button><button class="primary" id="saveRole">حفظ الصلاحيات</button></div></div></div>');
$$("[data-role]").forEach(b=>b.onclick=()=>{activeRole=b.dataset.role;rolesView()});
$("#saveRole").onclick=()=>notify("تم حفظ صلاحيات دور "+activeRole+" ✓");
$("#newRole").onclick=()=>show('<h2>إنشاء نوع حساب جديد</h2><p>مثال: أمين مكتبة، مسؤول إعلام، مسؤول مخيم، مدرب إسعافات...</p><label class="field"><span>اسم الدور</span><input id="newRoleName" placeholder="مثال: مسؤول الإعلام"></label><button class="primary" id="createRole">إنشاء الدور</button>');
$("#createRole").onclick=()=>{const n=$("#newRoleName").value||"دور جديد";notify("تم إنشاء "+n+" ويمكنك الآن تحديد صلاحياته");rolesView()}}
function featuresView(){const groups=["الحسابات والهوية","الأنشطة والفعاليات","التعلم والأكاديمية","الشارات والإنجازات","الحضور والميدان","المجتمع والتواصل","المخيمات والرحلات","المكتبة والمحتوى","الإشعارات","التقارير والتحليلات","الإدارة والصلاحيات","الأمان والخصوصية","التخصيص والعلامة التجارية","المدفوعات","التكاملات وواجهات API"];const names=["تسجيل دخول","دعوات","موافقات","بحث متقدم","تقويم","حضور QR","نقاط","مستويات","شارات","تحديات","اختبارات","فيديو","ملفات","تعليقات","رسائل","فرق","ترتيب","إشعارات","تقارير","سجل تدقيق","أدوار مخصصة","صلاحيات دقيقة","تصدير","نسخ احتياطي","إعدادات","API","Webhooks","قوالب","متجر","اشتراكات"];show('<span class="eyebrow">Feature Engine</span><h2>مركز المزايا</h2><p>البنية مصممة لتتوسع إلى مئات أو آلاف الوحدات دون تغيير تجربة المستخدم.</p><div class="feature-catalog">'+groups.map((g,i)=>'<div class="catalog-item"><b>'+g+'</b><small>'+names.slice((i*2)%names.length,((i*2)%names.length)+3).join(" • ")+' • + المزيد</small></div>').join("")+'</div><div style="margin-top:20px;padding:15px;background:#eef7f0;border-radius:15px;font-size:11px"><b>المبدأ:</b> كل ميزة يمكن ربطها بصلاحية، ودور، وقسم، وإشعار، وسجل تدقيق.</div>')}
$(".nav a").forEach(a=>a.onclick=()=>setActiveNav(a.getAttribute("href").slice(1)));
$(".mobile-nav a").forEach(a=>a.onclick=()=>{const id=a.getAttribute("href").slice(1);setActiveNav(id);if(innerWidth<=650)mobileFocus()});
$("#searchBtn").onclick=()=>searchView();

const focusSections=["home","discover","activities","badges","community"];
function mobileFocus(){
 if(innerWidth<=650){
  const id=(location.hash||"#home").slice(1);
  const target=focusSections.includes(id)?id:"home";
  document.querySelector("main").classList.add("mobile-focus");
  focusSections.forEach(x=>{const el=$("#"+x);if(el)el.classList.toggle("mobile-current",x===target)});
  $$(".mobile-nav a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+target));
  window.scrollTo(0,0);
 }else{
  document.querySelector("main").classList.remove("mobile-focus");
  focusSections.forEach(x=>{const el=$("#"+x);if(el)el.classList.remove("mobile-current")});
 }
}
window.addEventListener("hashchange",mobileFocus);
window.addEventListener("resize",mobileFocus);
if(localStorage.getItem("scoutTheme")==="dark")document.body.classList.add("dark");mobileFocus();

function calendarView(){show('<span class="eyebrow">الأنشطة</span><h2>التقويم الكامل 📅</h2><p>اختر نشاطًا لعرض التفاصيل.</p><div class="feature-catalog"><button class="catalog-item" onclick="notify('تم اختيار رحلة الجبل');closeModal()">05 أكتوبر — رحلة الجبل</button><button class="catalog-item" onclick="notify('تم اختيار حملة التشجير');closeModal()">10 أكتوبر — حملة التشجير</button><button class="catalog-item" onclick="notify('تم اختيار تدريب الملاحة');closeModal()">15 أكتوبر — تدريب الملاحة</button><button class="catalog-item" onclick="notify('تم اختيار ليلة السمر');closeModal()">18 أكتوبر — ليلة السمر</button></div>')}
function badgesView(){show('<span class="eyebrow">إنجازاتك</span><h2>معرض الشارات 🏅</h2><p>تابع الشارات المكتملة وقيد التقدم.</p><div class="feature-catalog"><article class="catalog-item"><b>🩹 الإسعافات الأولية</b><small>مكتملة · 100%</small></article><article class="catalog-item"><b>🔥 خبير المخيم</b><small>مكتملة · 100%</small></article><article class="catalog-item"><b>🧭 سيد الملاحة</b><small>قيد التقدم · 68%</small></article><article class="catalog-item"><b>🌳 حامي البيئة</b><small>قيد التقدم · 60%</small></article></div>')}
function communityView(){show('<span class="eyebrow">مجتمع كشّاف</span><h2>مساحتك مع الفريق 🤝</h2><p>الفرق والرسائل والترتيب في مكان واحد.</p><div class="feature-catalog"><button class="catalog-item" onclick="notify('تم فتح الفرق')"><b>👥 الفرق</b><small>إدارة ومتابعة فرقك</small></button><button class="catalog-item" onclick="notify('لا توجد رسائل جديدة')"><b>💬 الرسائل</b><small>تواصل مع الفريق</small></button><button class="catalog-item" onclick="notify('تم فتح الترتيب')"><b>🏆 الترتيب</b><small>نتائج التحديات</small></button></div>')}
function skillsView(){show('<span class="eyebrow">التقدم</span><h2>مهاراتي 🧭</h2><div class="feature-catalog"><article class="catalog-item"><b>الملاحة</b><small>76% تقدم</small></article><article class="catalog-item"><b>الإسعافات الأولية</b><small>88% تقدم</small></article><article class="catalog-item"><b>التخييم</b><small>71% تقدم</small></article><article class="catalog-item"><b>القيادة والعمل الجماعي</b><small>64% تقدم</small></article></div>')}
function tasksView(){show('<span class="eyebrow">اليوم</span><h2>مهامي ✓</h2><div class="feature-catalog"><button class="catalog-item" onclick="notify('تم إنجاز المهمة +20 نقطة')"><b>○ مراجعة درس الإسعافات</b><small>+20 نقطة</small></button><button class="catalog-item" onclick="notify('تم إنجاز المهمة +20 نقطة')"><b>○ إنجاز تحدي الملاحة</b><small>+20 نقطة</small></button><button class="catalog-item" onclick="notify('تم إنجاز المهمة +20 نقطة')"><b>○ رفع صورة النشاط</b><small>+20 نقطة</small></button></div>')}
function menuView(){show('<span class="eyebrow">التنقل</span><h2>استكشف كشّاف</h2><div class="feature-catalog"><button class="catalog-item" onclick="closeModal();go('home')">⌂ الرئيسية</button><button class="catalog-item" onclick="closeModal();go('discover')">✦ اكتشف</button><button class="catalog-item" onclick="closeModal();go('activities')">◷ الأنشطة</button><button class="catalog-item" onclick="closeModal();go('badges')">🏅 الشارات</button><button class="catalog-item" onclick="closeModal();go('community')">♧ المجتمع</button></div>')}
function searchView(){show('<span class="eyebrow">بحث سريع</span><h2>ابحث في كشّاف 🔎</h2><label class="field"><span>ابحث</span><input id="siteSearch" autofocus placeholder="نشاط، شارة، مهارة..."></label><div id="searchResults"><p>اكتب كلمة للبحث.</p></div>');$("#siteSearch").oninput=e=>{const q=e.target.value.trim();const items=[["رحلة الجبل","activities"],["الشارات","badges"],["المهارات","skills"],["المهام","tasks"],["المجتمع","community"],["الأدوار","roles"]].filter(x=>!q||x[0].includes(q));$("#searchResults").innerHTML=items.map(x=>'<button class="catalog-item" style="width:100%;text-align:right;margin:4px 0" onclick="'+(x[1]==="roles"?"rolesView()":"closeModal();go('"+x[1]+"')")+'"><b>'+x[0]+'</b></button>').join("")||"<p>لا توجد نتائج.</p>"}}
