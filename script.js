const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const ICONS={
search:'<circle cx="11" cy="11" r="6"></circle><path d="m16 16 5 5"></path>',
compass:'<circle cx="12" cy="12" r="9"></circle><path d="m15 9-2 4-4 2 2-4 4-2Z"></path>',
chevron:'<path d="m9 18 6-6-6-6"></path>',
trend:'<path d="M4 16 9 11l3 3 7-8"></path><path d="M14 6h5v5"></path>',
clock:'<circle cx="12" cy="12" r="8"></circle><path d="M12 7v5l3 2"></path>',
pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle>',
calendar:'<rect x="4" y="5" width="16" height="15" rx="2"></rect><path d="M8 3v4m8-4v4M4 10h16"></path>',
badge:'<path d="m12 3 2 3 3 .5-2 2.3.4 3.2-3.4-1.5-3.4 1.5.4-3.2-2-2.3 3-.5 2-3Z"></path><path d="m9 15-1 6 4-2 4 2-1-6"></path>',
check:'<circle cx="12" cy="12" r="9"></circle><path d="m8 12 3 3 5-6"></path>',
users:'<circle cx="9" cy="8" r="3"></circle><path d="M3 20a6 6 0 0 1 12 0M16 11a3 3 0 0 1 0 6"></path>',
heart:'<path d="M20 8.5C20 14 12 19 12 19S4 14 4 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 2.5Z"></path>',
comment:'<path d="M20 11a7 7 0 0 1-7 7H8l-4 3v-6a7 7 0 1 1 16-4Z"></path>',
share:'<path d="m14 5 5 7-5 7V15c-5 0-8 1-10 3 1-5 4-8 10-8V5Z"></path>',
more:'<circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle>',
mountain:'<path d="m3 20 7-12 4 6 2-3 5 9H3Z"></path>',
shield:'<path d="M12 3 19 6v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z"></path>',
camp:'<path d="m3 20 9-15 9 15"></path><path d="M8 20h8M12 5v15"></path>',
leaf:'<path d="M19 4C10 4 5 9 5 16c0 2 1 3 3 3 7 0 11-5 11-15Z"></path><path d="M5 19c2-4 5-7 10-9"></path>'
};
function icon(name){return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[name]||ICONS.compass)+'</svg>'}
function mountIcons(){document.querySelectorAll("[data-icon]").forEach(el=>{const n=el.dataset.icon;el.innerHTML=icon(n)})}
const modal=$("#modal"),box=$("#modalBox"),toast=$("#toast");
function show(html){box.innerHTML=html;modal.classList.add("show");mountIcons()}
function closeModal(){modal.classList.remove("show")}
function notify(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove("show"),2200)}
function go(id){const el=$("#"+id);if(el){el.scrollIntoView({behavior:"smooth",block:"start"});closeModal()}}
function activityJoin(){localStorage.setItem("activityJoined","1");const b=$("#joinActivity");if(b)b.textContent="تم التسجيل ✓";notify("تم تسجيل مشاركتك في النشاط")}
function getGroupData(){return{name:localStorage.getItem("groupName")||"فوج الأمل",location:localStorage.getItem("groupLocation")||"ورقلة • الجزائر",leader:localStorage.getItem("groupLeader")||"أحمد محمد",meeting:localStorage.getItem("groupMeeting")||"السبت • 15:00",members:localStorage.getItem("groupMembers")||"48 عضوًا",bio:localStorage.getItem("groupBio")||"فوج شبابي يجمع بين التعلم والخدمة والمغامرة والعمل الجماعي في بيئة كشفية منظمة.",activities:localStorage.getItem("groupActivities")||"12",badges:localStorage.getItem("groupBadges")||"86"}}
function syncGroup(){const g=getGroupData();Object.entries({groupName:g.name,groupLocation:g.location,groupLeader:g.leader,groupMeeting:g.meeting,groupMembers:g.members,groupBio:g.bio,groupActivities:g.activities,groupBadges:g.badges}).forEach(([id,v])=>{const e=$("#"+id);if(e)e.textContent=v});const a=$("#groupAvatar");if(a)a.textContent=g.name.trim().charAt(0)}
function groupView(){const g=getGroupData();show('<h2>تخصيص معلومات الفوج</h2><p>عدّل المعلومات التي تظهر لأعضاء الفوج والزوار.</p><div class="feature-catalog"><label class="field"><span>اسم الفوج</span><input id="gn" value="'+g.name+'"></label><label class="field"><span>الموقع</span><input id="gl" value="'+g.location+'"></label><label class="field"><span>القائد</span><input id="gle" value="'+g.leader+'"></label><label class="field"><span>موعد الاجتماع</span><input id="gm" value="'+g.meeting+'"></label><label class="field"><span>عدد الأعضاء</span><input id="gme" value="'+g.members+'"></label><label class="field"><span>الأنشطة</span><input id="ga" value="'+g.activities+'"></label><label class="field"><span>الشارات</span><input id="gb" value="'+g.badges+'"></label><label class="field" style="grid-column:1/-1"><span>نبذة الفوج</span><textarea id="gbio" rows="4">'+g.bio+'</textarea></label></div><button class="wide-btn" id="saveGroup">حفظ التعديلات</button>');$("#saveGroup").onclick=()=>{const m={groupName:"gn",groupLocation:"gl",groupLeader:"gle",groupMeeting:"gm",groupMembers:"gme",groupActivities:"ga",groupBadges:"gb",groupBio:"gbio"};Object.entries(m).forEach(([k,id])=>localStorage.setItem(k,$("#"+id).value.trim()));syncGroup();closeModal();notify("تم تحديث معلومات الفوج")}
}
function accountView(){show('<h2>حساب أحمد</h2><p>كشاف • المستوى 04 • 2,450 نقطة</p><div class="feature-catalog"><button class="catalog-item" onclick="go(\'group\')"><b>الفوج</b><small>معلومات ومتابعة الفوج</small></button><button class="catalog-item" onclick="go(\'badges\')"><b>الإنجازات</b><small>14 شارة مكتملة</small></button><button class="catalog-item"><b>الإشعارات</b><small>3 جديدة</small></button><button class="catalog-item"><b>الإعدادات</b><small>التفضيلات والخصوصية</small></button></div>')}
function featuresView(){show('<h2>كل المزايا</h2><p>اختر المساحة التي تريد الوصول إليها.</p><div class="feature-catalog"><button class="catalog-item" onclick="go(\'activities\')"><b>الأنشطة</b><small>التقويم والتسجيل والحضور</small></button><button class="catalog-item" onclick="go(\'feed\')"><b>المجتمع</b><small>المنشورات والتفاعل</small></button><button class="catalog-item" onclick="go(\'group\')"><b>الفوج</b><small>المعلومات والأعضاء</small></button><button class="catalog-item" onclick="go(\'badges\')"><b>الشارات</b><small>الإنجازات والتقدم</small></button></div>')}
function simpleView(title,text){show('<h2>'+title+'</h2><p>'+text+'</p><button class="wide-btn" onclick="closeModal()">حسنًا</button>')}
modal.onclick=e=>{if(e.target===modal)closeModal()};document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
$("#accountBtn").onclick=accountView;$("#profileBtn").onclick=accountView;$("#groupCustomizeBtn").onclick=groupView;$("#groupJoinBtn").onclick=()=>notify("تم إرسال طلب الانضمام إلى الفوج");$("#allFeaturesBtn").onclick=featuresView;$("#communityBtn").onclick=()=>go("feed");$("#calendarBtn").onclick=()=>simpleView("تقويم الأنشطة","05 أكتوبر — رحلة الجبل\n10 أكتوبر — حملة التشجير\n15 أكتوبر — تدريب الملاحة");$("#badgesBtn").onclick=()=>go("badges");$("#searchBtn").onclick=()=>show('<h2>بحث في كشّاف</h2><label class="field"><span>ابحث</span><input autofocus placeholder="نشاط، شارة، فوج..."></label>');
$("#groupQuick").onclick=()=>go("group");
$$("[data-open]").forEach(b=>b.onclick=()=>go(b.dataset.open));
mountIcons();syncGroup();if(localStorage.getItem("activityJoined")==="1"){const b=$("#joinActivity");if(b)b.textContent="تم التسجيل ✓"}
