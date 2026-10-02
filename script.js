const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const modal=$("#modal"),box=$("#modalBox"),toast=$("#toast");
function show(html){box.innerHTML='<button class="close" id="close">×</button>'+html;modal.classList.add("show");$("#close").onclick=()=>modal.classList.remove("show")}
function notify(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200)}
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("show")};

$("#themeBtn").onclick=()=>{document.body.classList.toggle("dark");notify("تم تبديل المظهر")};
$("#startBtn").onclick=()=>document.querySelector("#discover").scrollIntoView({behavior:"smooth"});
$("#loginBtn").onclick=()=>show(loginView());
$("#accountBtn").onclick=()=>show(accountView());
$("#mobileAccount").onclick=()=>show(accountView());
$("#joinActivity").onclick=()=>notify("تم تسجيل مشاركتك في النشاط ✓");
$("#challengeBtn").onclick=()=>show('<span class="eyebrow">تحدي الأسبوع</span><h2>تحدي الملاحة 🧭</h2><p>أكمل 5 مهام قصيرة حول الاتجاهات والخريطة والبوصلة لتحصل على 120 نقطة.</p><button class="primary" onclick="notify(\'بدأ التحدي بنجاح 🚀\');modal.classList.remove(\'show\')">ابدأ الآن</button>');
$("#calendarBtn").onclick=()=>notify("التقويم الكامل جاهز للربط بالأنشطة الحقيقية");
$("#badgesBtn").onclick=()=>notify("تم فتح معرض الشارات");
$("#communityBtn").onclick=()=>notify("مساحة المجتمع جاهزة للتفعيل");
$("#footerRoles").onclick=()=>rolesView();
$("#rolesBtn").onclick=()=>rolesView();
$("#allFeaturesBtn").onclick=()=>featuresView();
$$("[data-open]").forEach(b=>b.onclick=()=>document.querySelector("#"+b.dataset.open)?.scrollIntoView({behavior:"smooth"}));

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
$$(".nav a").forEach(a=>a.onclick=()=>{$$(".nav a").forEach(x=>x.classList.remove("active"));a.classList.add("active")});
$$(".mobile-nav a").forEach(a=>a.onclick=()=>{$$(".mobile-nav a").forEach(x=>x.classList.remove("active"));a.classList.add("active")});
$("#searchBtn").onclick=()=>show('<h2>بحث شامل 🔎</h2><label class="field"><span>ابحث في المنصة</span><input id="search" autofocus placeholder="نشاط، كشاف، شارة، درس..."></label><p>البحث يمكن أن يشمل المستخدمين والمحتوى والأنشطة والملفات.</p>');

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
mobileFocus();
