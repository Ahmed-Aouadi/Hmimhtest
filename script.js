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
function mountIcons(){
  document.querySelectorAll("[data-icon]").forEach(el=>{
    const n=el.dataset.icon;
    if(el.dataset.mounted==="1")return;
    const text=el.textContent.trim();
    el.innerHTML=icon(n)+(text?'<span class="icon-label">'+text+'</span>':'');
    el.dataset.mounted="1";
  });
}
const modal=$("#modal"),box=$("#modalBox"),toast=$("#toast");
function show(html){box.innerHTML=html;modal.classList.add("show");mountIcons()}
function closeModal(){modal.classList.remove("show")}
function notify(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(window.__toast);window.__toast=setTimeout(()=>toast.classList.remove("show"),2200)}
function go(id){const el=$("#"+id);if(el){el.scrollIntoView({behavior:"smooth",block:"start"});closeModal()}}
function activityJoin(){
  localStorage.setItem("activityJoined","1");
  const b=$("#joinActivity");if(b)b.textContent="تم التسجيل ✓";
  notify("تم تسجيل مشاركتك في رحلة الجبل");
}
function getGroupData(){return{
name:localStorage.getItem("groupName")||"فوج الأمل",
location:localStorage.getItem("groupLocation")||"ورقلة • الجزائر",
leader:localStorage.getItem("groupLeader")||"أحمد محمد",
meeting:localStorage.getItem("groupMeeting")||"السبت • 15:00",
members:localStorage.getItem("groupMembers")||"48 عضوًا",
bio:localStorage.getItem("groupBio")||"فوج شبابي يجمع بين التعلم والخدمة والمغامرة والعمل الجماعي في بيئة كشفية منظمة.",
activities:localStorage.getItem("groupActivities")||"12",
badges:localStorage.getItem("groupBadges")||"86"}}
function syncGroup(){
  const g=getGroupData();
  Object.entries({groupName:g.name,groupLocation:g.location,groupLeader:g.leader,groupMeeting:g.meeting,groupMembers:g.members,groupBio:g.bio,groupActivities:g.activities,groupBadges:g.badges}).forEach(([id,v])=>{const e=$("#"+id);if(e)e.textContent=v});
  const a=$("#groupAvatar");if(a)a.textContent=g.name.trim().charAt(0);
}
function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function groupView(){
  const g=getGroupData();
  show('<h2>تخصيص معلومات الفوج</h2><p>عدّل المعلومات التي تظهر لأعضاء الفوج والزوار.</p><div class="feature-catalog"><label class="field"><span>اسم الفوج</span><input id="gn" value="'+esc(g.name)+'"></label><label class="field"><span>الموقع</span><input id="gl" value="'+esc(g.location)+'"></label><label class="field"><span>القائد</span><input id="gle" value="'+esc(g.leader)+'"></label><label class="field"><span>موعد الاجتماع</span><input id="gm" value="'+esc(g.meeting)+'"></label><label class="field"><span>عدد الأعضاء</span><input id="gme" value="'+esc(g.members)+'"></label><label class="field"><span>الأنشطة</span><input id="ga" value="'+esc(g.activities)+'"></label><label class="field"><span>الشارات</span><input id="gb" value="'+esc(g.badges)+'"></label><label class="field" style="grid-column:1/-1"><span>نبذة الفوج</span><textarea id="gbio" rows="4">'+esc(g.bio)+'</textarea></label></div><button class="wide-btn" id="saveGroup">حفظ التعديلات</button>');
  $("#saveGroup").onclick=()=>{const m={groupName:"gn",groupLocation:"gl",groupLeader:"gle",groupMeeting:"gm",groupMembers:"gme",groupActivities:"ga",groupBadges:"gb",groupBio:"gbio"};Object.entries(m).forEach(([k,id])=>localStorage.setItem(k,$("#"+id).value.trim()));syncGroup();closeModal();notify("تم تحديث معلومات الفوج")}
}
function notificationsView(){
  show('<h2>الإشعارات</h2><p>آخر ما يخص أنشطتك وفوجك.</p><div class="notice-list"><div class="notice"><span data-icon="calendar"></span><div><b>رحلة الجبل غدًا</b><small>08:00 • نقطة التجمع — لا تنس حقيبة الماء.</small></div></div><div class="notice"><span data-icon="badge"></span><div><b>شارة جديدة متاحة</b><small>أكمل تحدي الإسعافات الأولية للحصول على 100 نقطة.</small></div></div><div class="notice"><span data-icon="users"></span><div><b>نشاط جديد في الفوج</b><small>ياسين سجّل في حملة التشجير.</small></div></div></div><button class="wide-btn" id="readNotifications">تحديد الكل كمقروء</button>');
  $("#readNotifications").onclick=()=>{notify("تم تحديد الإشعارات كمقروءة");closeModal()}
}
function settingsView(){
  const saved=localStorage.getItem("compactMode")==="1";
  show('<h2>الإعدادات</h2><p>تحكم في تجربة استخدام كشّاف.</p><div class="setting-row"><span>وضع العرض المكثف</span><button class="toggle '+(saved?"on":"")+'" id="compactToggle"><i></i></button></div><div class="setting-row"><span>تذكير بالأنشطة</span><button class="toggle on" id="reminderToggle"><i></i></button></div><div class="setting-row"><span>إشعارات المجتمع</span><button class="toggle on" id="communityToggle"><i></i></button></div>');
  $("#compactToggle").onclick=e=>{e.currentTarget.classList.toggle("on");localStorage.setItem("compactMode",e.currentTarget.classList.contains("on")?"1":"0");notify("تم حفظ الإعداد")};
  $("#reminderToggle").onclick=e=>{e.currentTarget.classList.toggle("on");notify("تم تحديث تفضيل التذكيرات")};
  $("#communityToggle").onclick=e=>{e.currentTarget.classList.toggle("on");notify("تم تحديث تفضيل المجتمع")};
}
function accountView(){
  show('<h2>حساب أحمد</h2><p>كشاف • المستوى 04 • 2,450 نقطة</p><div class="feature-catalog"><button class="catalog-item" id="accountGroup"><b>الفوج</b><small>معلومات ومتابعة الفوج</small></button><button class="catalog-item" id="accountBadges"><b>الإنجازات</b><small>14 شارة مكتملة</small></button><button class="catalog-item" id="accountNotifications"><b>الإشعارات</b><small>3 جديدة</small></button><button class="catalog-item" id="accountSettings"><b>الإعدادات</b><small>التفضيلات والخصوصية</small></button></div>');
  $("#accountGroup").onclick=()=>go("group");$("#accountBadges").onclick=()=>go("badges");$("#accountNotifications").onclick=notificationsView;$("#accountSettings").onclick=settingsView;
}
function featuresView(){
  show('<h2>كل المزايا</h2><p>اختر المساحة التي تريد الوصول إليها.</p><div class="feature-catalog"><button class="catalog-item" id="fActivities"><b>الأنشطة</b><small>التقويم والتسجيل والحضور</small></button><button class="catalog-item" id="fFeed"><b>المجتمع</b><small>المنشورات والتفاعل</small></button><button class="catalog-item" id="fGroup"><b>الفوج</b><small>المعلومات والأعضاء</small></button><button class="catalog-item" id="fBadges"><b>الشارات</b><small>الإنجازات والتقدم</small></button><button class="catalog-item" id="fSkills"><b>المهارات</b><small>خطة تطوير مهاراتك</small></button><button class="catalog-item" id="fTasks"><b>المهام</b><small>تحديات يومية ونقاط</small></button></div>');
  [["fActivities","activities"],["fFeed","feed"],["fGroup","group"],["fBadges","badges"],["fSkills","skills"],["fTasks","tasks"]].forEach(([id,target])=>$("#"+id).onclick=()=>go(target));
}
function simpleView(title,text){show('<h2>'+title+'</h2><p>'+text.replace(/\n/g,"<br>")+'</p><button class="wide-btn" onclick="closeModal()">حسنًا</button>')}
function activityDetails(type){
  const data={
    cleanup:["حملة نظافة وتشجير","10 أكتوبر • 09:30","مبادرة لخدمة الحي وزراعة الأشجار. احضر قفازات، ماءً وملابس مناسبة."],
    navigation:["تدريب الملاحة","15 أكتوبر • 16:00","تدريب عملي على الخريطة والبوصلة وتحديد الاتجاهات مع تحديات ميدانية قصيرة."]
  }[type];
  if(!data)return;
  show('<h2>'+data[0]+'</h2><p><b>'+data[1]+'</b></p><p>'+data[2]+'</p><div class="modal-actions"><button class="wide-btn" id="detailJoin">سجّل مشاركتي</button><button class="small-btn" id="detailClose">إغلاق</button></div>');
  $("#detailJoin").onclick=()=>{notify("تم تسجيل اهتمامك بالنشاط");closeModal()};
  $("#detailClose").onclick=closeModal;
}
function skillsView(){show('<h2>خطة تطوير المهارات</h2><p>ركز هذا الأسبوع على المهارات الأقل تقدمًا.</p><div class="notice-list"><div class="notice"><span data-icon="compass"></span><div><b>الملاحة — 76%</b><small>أكمل تحدي قراءة خريطة واحد للوصول إلى 80%.</small></div></div><div class="notice"><span data-icon="camp"></span><div><b>التخييم — 64%</b><small>شارك في نشاط تجهيز مخيم للحصول على تقدم إضافي.</small></div></div></div><button class="wide-btn" onclick="go(\'tasks\')">عرض المهام المرتبطة</button>')}
function loadTasks(){const done=JSON.parse(localStorage.getItem("doneTasks")||"[]");$$(".task-row").forEach(row=>row.classList.toggle("done",done.includes(row.dataset.task)))}
function toggleTask(row){
  const done=JSON.parse(localStorage.getItem("doneTasks")||"[]"),id=row.dataset.task;
  const next=done.includes(id)?done.filter(x=>x!==id):[...done,id];
  localStorage.setItem("doneTasks",JSON.stringify(next));row.classList.toggle("done",next.includes(id));notify(next.includes(id)?"أحسنت! تمت إضافة نقاط المهمة":"تم إلغاء إكمال المهمة");
}
modal.onclick=e=>{if(e.target===modal)closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
document.addEventListener("click",e=>{
  const trigger=e.target.closest("[data-open]");
  if(trigger){e.preventDefault();go(trigger.dataset.open);return}
  const hash=e.target.closest("a[href^='#']");
  if(hash){const id=hash.getAttribute("href").slice(1);if(id){e.preventDefault();go(id);return}}
  const task=e.target.closest(".task-check");if(task){toggleTask(task.closest(".task-row"));return}
  const detail=e.target.closest(".activity-detail");if(detail){activityDetails(detail.dataset.activity);return}
  const social=e.target.closest(".post-actions button");if(social){
    social.classList.toggle("active");
    const label=social.querySelector(".icon-label");
    if(label && /^\d+$/.test(label.textContent.trim()))label.textContent=String(Number(label.textContent.trim())+(social.classList.contains("active")?1:-1));
    if(social.classList.contains("active")&&social.dataset.icon==="share")notify("تم تجهيز المنشور للمشاركة");
    return;
  }
});
$("#accountBtn").onclick=accountView;$("#profileBtn").onclick=accountView;$("#groupCustomizeBtn").onclick=groupView;$("#groupJoinBtn").onclick=()=>notify("تم إرسال طلب الانضمام إلى الفوج");$("#allFeaturesBtn").onclick=featuresView;$("#communityBtn").onclick=()=>go("feed");$("#calendarBtn").onclick=()=>simpleView("تقويم الأنشطة","05 أكتوبر — رحلة الجبل\n10 أكتوبر — حملة التشجير\n15 أكتوبر — تدريب الملاحة");$("#badgesBtn").onclick=()=>go("badges");$("#skillsDetailsBtn").onclick=skillsView;$("#resetTasksBtn").onclick=()=>{localStorage.removeItem("doneTasks");loadTasks();notify("تمت إعادة تعيين مهام اليوم")};
$("#searchBtn").onclick=()=>show('<h2>بحث في كشّاف</h2><label class="field"><span>ابحث</span><input id="searchInput" autofocus placeholder="نشاط، شارة، فوج..."></label><div id="searchResults"></div>');
$("#groupQuick").onclick=()=>go("group");

function runSearch(q){
  const term=q.trim().toLowerCase();
  const items=[["رحلة استكشافية إلى الجبل","نشاط","activities"],["حملة نظافة وتشجير","نشاط","activities"],["تدريب الملاحة","نشاط","activities"],["سيد الملاحة","شارة","badges"],["الإسعافات الأولية","شارة","badges"],["فوج الأمل","فوج","group"],["الملاحة","مهارة","skills"],["حامي البيئة","شارة","badges"]];
  const found=items.filter(x=>!term||x[0].toLowerCase().includes(term)||x[1].toLowerCase().includes(term));
  const box=$("#searchResults");if(!box)return;
  box.innerHTML=found.length?found.map(x=>'<button class="catalog-item search-result" data-target="'+x[2]+'"><b>'+x[0]+'</b><small>'+x[1]+'</small></button>').join(""):'<p>لا توجد نتائج مطابقة.</p>';
  box.querySelectorAll(".search-result").forEach(b=>b.onclick=()=>go(b.dataset.target));
}
document.addEventListener("input",e=>{if(e.target.id==="searchInput")runSearch(e.target.value)});

mountIcons();syncGroup();loadTasks();
if(localStorage.getItem("activityJoined")==="1"){const b=$("#joinActivity");if(b)b.textContent="تم التسجيل ✓"}
