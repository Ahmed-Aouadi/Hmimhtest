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
leaf:'<path d="M19 4C10 4 5 9 5 16c0 2 1 3 3 3 7 0 11-5 11-15Z"></path><path d="M5 19c2-4 5-7 10-9"></path>',
bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"></path><path d="M10 21h4"></path>',
message:'<path d="M20 11a7 7 0 0 1-7 7H8l-4 3v-6a7 7 0 1 1 16-4Z"></path><path d="M8 11h.01M12 11h.01M16 11h.01"></path>'
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
function openCommunity(){const page=$("#communityPage"),home=$("#home");if(page){home.style.display="none";page.classList.add("show");window.scrollTo({top:0,behavior:"smooth"});renderUserPosts();renderCommentHub()}}
function closeCommunity(){const page=$("#communityPage"),home=$("#home");if(page){page.classList.remove("show");home.style.display="block";window.scrollTo({top:0,behavior:"smooth"})}}
function go(id){if(id==="feed"||id==="comments"){openCommunity();setTimeout(()=>{const el=$("#"+id);if(el)el.scrollIntoView({behavior:"smooth",block:"start"})},30);closeModal();return}if($("#communityPage")?.classList.contains("show"))closeCommunity();const el=$("#"+id);if(el){el.scrollIntoView({behavior:"smooth",block:"start"});closeModal()}}
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
});
$("#accountBtn").onclick=accountView;$("#profileBtn").onclick=accountView;$("#groupCustomizeBtn").onclick=groupView;$("#groupJoinBtn").onclick=()=>notify("تم إرسال طلب الانضمام إلى الفوج");$("#allFeaturesBtn").onclick=featuresView;$("#calendarBtn").onclick=()=>simpleView("تقويم الأنشطة","05 أكتوبر — رحلة الجبل\n10 أكتوبر — حملة التشجير\n15 أكتوبر — تدريب الملاحة");$("#badgesBtn").onclick=()=>go("badges");$("#skillsDetailsBtn").onclick=skillsView;$("#resetTasksBtn").onclick=()=>{localStorage.removeItem("doneTasks");loadTasks();notify("تمت إعادة تعيين مهام اليوم")};
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

/* Account, publishing, moderation and threaded comments */
function getAccount(){
  return {
    name:localStorage.getItem("accountName")||"أحمد",
    username:localStorage.getItem("accountUsername")||"ahmed",
    role:localStorage.getItem("accountRole")||"كشاف",
    level:localStorage.getItem("accountLevel")||"04",
    avatar:localStorage.getItem("accountAvatar")||"",
    autoPublish:localStorage.getItem("publishMode")||"review",
    isAdmin:localStorage.getItem("isAdmin")==="1"||localStorage.getItem("accountRole")==="مسؤول"
  };
}
function syncAccount(){
  const a=getAccount(), letter=(a.name.trim()||"أ").charAt(0);
  ["accountBtn","profileAvatar"].forEach(id=>{const e=$( "#"+id);if(e){e.textContent="";if(a.avatar){e.style.backgroundImage="url('"+a.avatar+"')";e.style.backgroundSize="cover";e.style.backgroundPosition="center";}else{e.style.backgroundImage="";e.textContent=letter;}}});
  const n=$( "#profileName");if(n)n.textContent=a.name;
  const r=$( "#profileRole");if(r)r.textContent=a.role+" • مستوى "+a.level;
  const w=$( ".welcome-row h1");if(w)w.innerHTML="مرحبًا "+esc(a.name)+" <span>👋</span>";
}
function getSavedPostIds(){try{return JSON.parse(localStorage.getItem("savedPosts")||"[]")}catch(e){return[]}}
function setSavedPostIds(ids){localStorage.setItem("savedPosts",JSON.stringify(ids))}
function savedPostsView(){
  const ids=getSavedPostIds();
  const posts=readPosts().filter(p=>ids.includes(p.id));
  const demo=[{id:"demo1",authorName:"فوج الأمل",text:"غدًا موعد رحلتنا إلى الجبل."},{id:"demo2",authorName:"سارة",text:"أحسنتُم! تم فتح شارة جديدة لأعضاء الفوج."}].filter(p=>ids.includes(p.id));
  const list=[...demo,...posts];
  show('<h2>المنشورات المحفوظة</h2><p>كل المنشورات التي احتفظت بها للرجوع إليها لاحقًا.</p><div class="saved-posts-list">'+(list.length?list.map(p=>'<div class="saved-post-item"><div><b>'+esc(p.authorName)+'</b><small>'+esc((p.text||"منشور بصورة").slice(0,90))+'</small></div><button class="small-btn open-saved" data-saved-id="'+p.id+'">عرض</button><button class="danger-btn remove-saved" data-saved-id="'+p.id+'">إزالة</button></div>').join(""):'<div class="empty-state">لا توجد منشورات محفوظة بعد.</div>')+'</div>');
  $$(".remove-saved").forEach(b=>b.onclick=()=>{setSavedPostIds(getSavedPostIds().filter(id=>id!==b.dataset.savedId));savedPostsView();notify("تمت إزالة المنشور من المحفوظات")});
  $$(".open-saved").forEach(b=>b.onclick=()=>{openCommunity();setTimeout(()=>document.querySelector('[data-post-id="'+b.dataset.savedId+'"]')?.scrollIntoView({behavior:"smooth",block:"center"}),30);closeModal()});
}
function accountView(){
  const a=getAccount();
  show('<div class="account-head"><div class="account-avatar-lg" id="accountAvatarPreview">'+(a.avatar?'<img src="'+a.avatar+'" alt="">':esc((a.name||"أ").charAt(0)))+'</div><div><h2>حسابي</h2><p>@'+esc(a.username)+' • '+esc(a.role)+' • مستوى '+esc(a.level)+'</p></div></div><div class="feature-catalog account-menu"><button class="catalog-item" id="editProfileBtn"><b>الملف الشخصي</b><small>الصورة، الاسم واسم المستخدم</small></button><button class="catalog-item" id="myPostsBtn"><b>منشوراتي</b><small>تعديل وحذف المنشورات التي أنشأتها</small></button><button class="catalog-item" id="savedPostsBtn"><b>المنشورات المحفوظة</b><small>المنشورات التي حفظتها</small></button><button class="catalog-item" id="publishingBtn" style="display:none"><b>إعدادات النشر</b><small>تحت إدارة المسؤول</small></button>'+(a.isAdmin?'<button class="catalog-item admin-card" id="adminBtn"><b>لوحة إدارة المنشورات</b><small>مراجعة، إخفاء، تثبيت وحذف</small></button>':'')+'<button class="catalog-item" id="accountSettings2"><b>الإعدادات العامة</b><small>الإشعارات والخصوصية</small></button></div>');
  $("#editProfileBtn").onclick=editProfileView;$("#myPostsBtn").onclick=myPostsView;$("#savedPostsBtn").onclick=savedPostsView;if($("#publishingBtn"))$("#publishingBtn").onclick=()=>notify("إعدادات النشر متاحة للإدارة فقط");
  if($("#adminBtn"))$("#adminBtn").onclick=adminPostsView;$("#accountSettings2").onclick=settingsView;
}
function editProfileView(){
  const a=getAccount();
  show('<h2>تعديل الملف الشخصي</h2><p>هذه المعلومات تظهر بجانب منشوراتك.</p><label class="avatar-upload"><input id="avatarFile" type="file" accept="image/*"><span class="account-avatar-lg" id="editAvatarPreview">'+(a.avatar?'<img src="'+a.avatar+'" alt="">':esc(a.name.charAt(0)))+'</span><b>إضافة أو تغيير الصورة الشخصية</b><small>JPG أو PNG</small></label>'+
  '<div class="feature-catalog"><label class="field"><span>الاسم</span><input id="accountNameInput" value="'+esc(a.name)+'"></label><label class="field"><span>اسم المستخدم</span><input id="accountUsernameInput" value="'+esc(a.username)+'"></label><label class="field"><span>الصفة</span><input value="'+esc(a.role)+'" disabled></label><label class="field"><span>المستوى</span><input value="'+esc(a.level)+'" disabled></label></div><p class="profile-locked-note">الصفة والمستوى يتم تحديدهما من إدارة الفوج ولا يمكن لصاحب الحساب تعديلهما.</p><button class="wide-btn" id="saveProfile">حفظ الملف الشخصي</button>');
  let avatar=a.avatar;
  $("#avatarFile").onchange=e=>{const file=e.target.files[0];if(!file)return;const rd=new FileReader();rd.onload=()=>{avatar=rd.result;$("#editAvatarPreview").innerHTML='<img src="'+avatar+'" alt="">'};rd.readAsDataURL(file)};
  $("#saveProfile").onclick=()=>{localStorage.setItem("accountName",$("#accountNameInput").value.trim()||"أحمد");localStorage.setItem("accountUsername",$("#accountUsernameInput").value.trim().replace(/^@/,"")||"ahmed");if(avatar)localStorage.setItem("accountAvatar",avatar);syncAccount();closeModal();notify("تم تحديث حسابك")};
}
function publishingView(){
  const a=getAccount();
  if(!a.isAdmin){notify("إعدادات النشر متاحة للإدارة فقط");return}
  show('<h2>إعدادات النشر</h2><p>اختر كيف يتعامل الفوج مع المنشورات الجديدة.</p><div class="publish-modes"><label class="publish-mode"><input type="radio" name="pubMode" value="review"><span><b>مراجعة قبل النشر</b><small>المنشور يبقى قيد المراجعة حتى توافق الإدارة أو المسؤول.</small></span></label><label class="publish-mode"><input type="radio" name="pubMode" value="auto"><span><b>النشر التلقائي</b><small>يظهر المنشور مباشرة للأعضاء.</small></span></label></div><button class="wide-btn" id="savePublishMode">حفظ الإعداد</button>');
  document.querySelector('input[name="pubMode"][value="'+a.autoPublish+'"]').checked=true;
  $("#savePublishMode").onclick=()=>{localStorage.setItem("publishMode",document.querySelector('input[name="pubMode"]:checked').value);closeModal();notify("تم حفظ إعدادات النشر")};
}
function readPosts(){try{return JSON.parse(localStorage.getItem("scoutPosts")||"[]")}catch(e){return[]}}
function savePosts(p){localStorage.setItem("scoutPosts",JSON.stringify(p))}
function formatDate(ts){return new Intl.DateTimeFormat("ar-DZ",{day:"2-digit",month:"short",year:"numeric"}).format(new Date(ts))}
function renderUserPosts(){
  const wrap=$("#feed .posts");if(!wrap)return;
  $$(".user-post").forEach(e=>e.remove());
  const posts=readPosts().filter(p=>p.status==="published"||p.authorUsername===getAccount().username);
  posts.reverse().forEach(p=>wrap.prepend(postElement(p)));
  mountIcons();
}
function postElement(p){
  const a=getAccount(), own=p.authorUsername===a.username;
  const art=document.createElement("article");art.className="post user-post"+(p.pinned?" pinned-post":"");art.dataset.postId=p.id;
  const status=p.status!=="published"?'<span class="pending-label">قيد المراجعة</span>':(p.pinned?'<span class="pinned-label">مثبت</span>':"");
  const imgs=Array.isArray(p.images)&&p.images.length?p.images:(p.image?[p.image]:[]);
  const media=imgs.length?'<div class="post-gallery">'+imgs.map((im,i)=>'<div class="post-gallery-item"><img class="post-photo" src="'+im+'" alt="صورة المنشور '+(i+1)+'"></div>').join("")+'</div>':"";
  art.innerHTML='<div class="post-head"><span class="post-avatar">'+(p.avatar?'<img src="'+p.avatar+'" alt="">':esc(p.authorName.charAt(0)))+'</span><div><b>'+esc(p.authorName)+(p.role?' • '+esc(p.role):"")+'</b><small>'+formatDate(p.createdAt)+' • '+status+'</small></div><button class="more user-post-menu" data-post-menu="'+p.id+'" data-own="'+own+'" aria-label="خيارات">•••</button></div><p>'+esc(p.text||"").replace(/\n/g,"<br>")+'</p>'+media+'<div class="post-actions"><button data-action="like" data-icon="heart">'+(p.likes||0)+'</button><button data-action="comments" data-icon="comment">'+(p.comments||0)+'</button><button data-action="share" data-icon="share">مشاركة</button><button data-action="save" data-icon="badge">حفظ</button></div><div class="comments-preview"><b>التعليقات</b><button class="comment-link" data-comments="'+p.id+'">عرض التعليقات والرد</button></div>';
  const s=art.querySelector('[data-action="save"]');if(s&&getSavedPostIds().includes(p.id)){s.classList.add("active");const label=s.querySelector(".icon-label");if(label)label.textContent="محفوظ"}
  return art;
}
function createPostView(editId){
  const posts=readPosts(), old=editId?posts.find(p=>p.id===editId):null,a=getAccount();
  if(editId&&!old)return;
  show('<h2>'+(old?"تعديل المنشور":"منشور جديد")+'</h2><div class="post-author-preview"><span class="post-avatar">'+(a.avatar?'<img src="'+a.avatar+'" alt="">':esc(a.name.charAt(0)))+'</span><div><b>'+esc(a.name)+'</b><small>'+esc(a.role)+' • @'+esc(a.username)+'</small></div></div><label class="field"><span>نص المنشور</span><textarea id="postText" rows="6" placeholder="اكتب شيئًا مفيدًا لمجتمعك...">'+(old?esc(old.text):"")+'</textarea></label><label class="post-image-upload"><input id="postImageFile" type="file" accept="image/*" multiple><span>إضافة صور للمنشور</span><small id="postImageName">'+((old?.images?.length||old?.image)?((old?.images?.length||1)+" صور مختارة"):"اختياري — يمكنك اختيار عدة صور")+'</small></label><div id="postImagePreview" class="post-gallery draft-gallery"></div><button class="wide-btn" id="savePostBtn">'+(old?"حفظ التعديل":"نشر")+'</button>');
  let images=old?.images?.length?[...old.images]:(old?.image?[old.image]:[]);
  const preview=$("#postImagePreview");
  const renderDraftImages=()=>{
    preview.innerHTML=images.map((im,i)=>'<div class="post-gallery-item"><img class="post-photo draft-preview" src="'+im+'" alt="صورة '+(i+1)+'"><button type="button" class="remove-post-image" data-index="'+i+'" aria-label="حذف الصورة">×</button></div>').join("");
    preview.style.display=images.length?"grid":"none";
    $("#postImageName").textContent=images.length?(images.length+" صور مختارة"):"اختياري — يمكنك اختيار عدة صور";
    preview.querySelectorAll(".remove-post-image").forEach(btn=>btn.onclick=()=>{images.splice(Number(btn.dataset.index),1);renderDraftImages()});
  };
  renderDraftImages();
  const compressPostImage=(file,max=900,quality=0.58)=>new Promise((resolve,reject)=>{
    if(!file)return resolve("");
    const rd=new FileReader();
    rd.onload=()=>{
      const src=rd.result, img=new Image();
      img.onload=()=>{
        const naturalMax=Math.max(img.naturalWidth||img.width,img.naturalHeight||img.height);
        const scale=Math.min(1,max/naturalMax);
        const w=Math.max(1,Math.round((img.naturalWidth||img.width)*scale)),h=Math.max(1,Math.round((img.naturalHeight||img.height)*scale));
        const canvas=document.createElement("canvas");canvas.width=w;canvas.height=h;
        const ctx=canvas.getContext("2d");
        if(!ctx){reject(new Error("canvas"));return}
        ctx.drawImage(img,0,0,w,h);
        let out=canvas.toDataURL("image/jpeg",quality);
        if(out.length>420000){
          const s=Math.min(1,700/Math.max(w,h)),c2=document.createElement("canvas");
          c2.width=Math.max(1,Math.round(w*s));c2.height=Math.max(1,Math.round(h*s));
          c2.getContext("2d").drawImage(canvas,0,0,c2.width,c2.height);
          out=c2.toDataURL("image/jpeg",0.48);
        }
        resolve(out);
      };
      img.onerror=()=>reject(new Error("image"));
      img.src=src;
    };
    rd.onerror=reject;
    rd.readAsDataURL(file);
  });
  $("#postImageFile").onchange=e=>{
    const files=[...e.target.files];
    if(!files.length)return;
    const remaining=Math.max(0,8-images.length);
    if(files.length>remaining){notify("يمكن إضافة 8 صور كحد أقصى");e.target.value="";return}
    Promise.all(files.map(compressPostImage)).then(next=>{
      images=[...images,...next.filter(Boolean)];
      renderDraftImages();
      e.target.value="";
    }).catch(()=>notify("تعذر تجهيز إحدى الصور، حاول مرة أخرى"));
  };
  $("#savePostBtn").onclick=async()=>{
    const text=$("#postText").value.trim();if(!text&&!images.length){notify("اكتب نصًا أو أضف صورة");return}
    const mode=a.isAdmin?"auto":"review";
    try{
      if(old){
        old.text=text;old.images=images;old.image=images[0]||"";savePosts(posts);closeModal();renderUserPosts();notify("تم تعديل المنشور");return
      }
      const image=images[0]||"";
      const p={id:"p"+Date.now(),authorName:a.name,authorUsername:a.username,role:a.role,avatar:a.avatar,text,image,images:[...images],createdAt:Date.now(),status:mode==="auto"?"published":"pending",likes:0,comments:0,pinned:false};
      const candidate=[...posts,p];
      if(JSON.stringify(candidate).length>3600000){
        const reduced=await Promise.all(images.map(async src=>{
          const blob=await (await fetch(src)).blob();
          return compressPostImage(new File([blob],"post.jpg",{type:"image/jpeg"}),700,0.45);
        }));
        p.images=reduced.filter(Boolean);p.image=p.images[0]||"";
      }
      const finalPosts=[...posts,p];
      if(JSON.stringify(finalPosts).length>3900000)throw new Error("storage-budget");
      savePosts(finalPosts);closeModal();renderUserPosts();notify(p.status==="published"?"تم نشر المنشور":"تم إرسال المنشور للمراجعة");
    }catch(err){
      if(old){const idx=posts.findIndex(p=>p.id===old.id);if(idx>=0)posts[idx]=old}
      notify("تعذر حفظ المنشور. تم ضغط الصور تلقائيًا، حاول تقليل عدد الصور أو اختيار صور أصغر.");
    }
  };
}
function myPostsView(){
  const a=getAccount(),mine=readPosts().filter(p=>p.authorUsername===a.username);
  show('<h2>منشوراتي</h2><p>إدارة المنشورات التي نشرتها أو أرسلتها للمراجعة.</p><div class="my-posts-list">'+(mine.length?mine.reverse().map(p=>'<div class="my-post-item"><div><b>'+esc(p.text?.slice(0,70)||"منشور بصورة")+'</b><small>'+formatDate(p.createdAt)+' • '+(p.status==="published"?"منشور":"قيد المراجعة")+(p.pinned?" • مثبت":"")+'</small></div><button class="small-btn edit-my-post" data-edit-post="'+p.id+'">تعديل</button><button class="danger-btn delete-my-post" data-delete-post="'+p.id+'">حذف</button></div>').join(""):'<div class="empty-state">لم تنشر شيئًا بعد.</div>')+'</div>');
  $$(".edit-my-post").forEach(b=>b.onclick=()=>createPostView(b.dataset.editPost));
  $$(".delete-my-post").forEach(b=>b.onclick=()=>{const id=b.dataset.deletePost;savePosts(readPosts().filter(p=>p.id!==id));myPostsView();notify("تم حذف المنشور")});
}
function adminPostsView(){
  if(!getAccount().isAdmin){notify("هذه المساحة للمسؤول فقط");return}
  const all=readPosts();
  show('<h2>إدارة المنشورات</h2><p>مراجعة المنشورات والتحكم في ظهورها.</p><div class="admin-posts">'+(all.length?all.reverse().map(p=>'<div class="admin-post-item"><div><b>'+esc(p.authorName)+' • '+esc(p.role)+'</b><small>'+esc(p.text?.slice(0,90)||"منشور بصورة")+' • '+(p.status==="published"?"منشور":"قيد المراجعة")+(p.pinned?" • مثبت":"")+'</small></div><div class="admin-actions"><button data-admin="approve" data-id="'+p.id+'">نشر</button><button data-admin="hide" data-id="'+p.id+'">إخفاء</button><button data-admin="pin" data-id="'+p.id+'">'+(p.pinned?"إلغاء التثبيت":"تثبيت")+'</button><button class="danger-btn" data-admin="delete" data-id="'+p.id+'">حذف</button></div></div>').join(""):'<div class="empty-state">لا توجد منشورات للمراجعة.</div>')+'</div>');
  $$(".admin-actions button").forEach(b=>b.onclick=()=>{const id=b.dataset.id,action=b.dataset.admin,p=readPosts(),i=p.findIndex(x=>x.id===id);if(i<0)return;if(action==="approve"){p[i].status="published"}if(action==="hide"){p[i].status="hidden"}if(action==="pin"){p[i].pinned=!p[i].pinned;p[i].status="published"}if(action==="delete"){p.splice(i,1)}savePosts(p);adminPostsView();renderUserPosts();notify("تم تحديث المنشور")});
}

function getCommentThreads(){
  const demo=[{id:"demo1",author:"فوج الأمل",role:"قائد",text:"غدًا موعد رحلتنا إلى الجبل. لا تنسوا الماء، القبعة، والحضور في الموعد.",count:8,latest:"منذ 12 دقيقة"}];
  const posts=readPosts().filter(p=>p.status==="published").map(p=>({id:p.id,author:p.authorName,role:p.role,text:p.text||"منشور بصورة",count:p.comments||0,latest:"منشور جديد"}));
  return [...demo,...posts];
}
function renderCommentHub(){
  const box=$("#commentThreads");if(!box)return;
  const threads=getCommentThreads();
  box.innerHTML=threads.map(t=>'<button class="comment-thread" data-thread="'+t.id+'"><span class="thread-avatar">'+esc(t.author.charAt(0))+'</span><span class="thread-main"><b>'+esc(t.author)+' <small>'+esc(t.role||"")+'</small></b><p>'+esc(t.text.slice(0,105))+'</p><span>'+t.count+' تعليقات • '+esc(t.latest)+'</span></span><span class="thread-arrow">‹</span></button>').join("")||'<div class="empty-state">لا توجد نقاشات بعد.</div>';
}
function getPostComments(postId){
  const demoComments=postId==="demo1"?
    [{id:"c1",name:"محمد",role:"كشاف",text:"بالتوفيق للجميع، سأكون حاضرًا.",time:"منذ 12 دقيقة",replies:[{name:"فوج الأمل",role:"قائد",text:"بانتظاركم في الموعد."}]}]:[];
  let storedComments=[];
  try{storedComments=JSON.parse(localStorage.getItem("comments_"+postId)||"[]");if(!Array.isArray(storedComments))storedComments=[]}catch(e){storedComments=[]}
  return [...demoComments,...storedComments.filter(sc=>!demoComments.some(dc=>dc.id===sc.id))];
}
function openCommentsPage(postId){
  const section=$("#comments"),box=$("#commentThreads");
  if(!section||!box)return;
  const demoPost=postId==="demo1",post=readPosts().find(p=>p.id===postId);
  const title=demoPost?"فوج الأمل":(post?.authorName||"المنشور");
  const comments=getPostComments(postId);
  box.innerHTML='<div class="thread-detail"><button class="back-comments" id="backComments">← كل النقاشات</button><div class="thread-detail-head"><span class="thread-avatar">'+esc(title.charAt(0)||"م")+'</span><div><b>'+esc(title)+'</b><small>نقاش المنشور • '+comments.length+' تعليق</small></div></div><div class="thread-messages">'+(comments.length?comments.map(commentHtml).join(""):'<div class="empty-state">لا توجد تعليقات بعد. ابدأ النقاش.</div>')+'</div><div class="comment-composer"><input id="pageCommentInput" placeholder="اكتب تعليقًا..."><button class="wide-btn" id="pageSendComment">إرسال</button></div></div>';
  section.classList.add("comments-open");
  $("#backComments").onclick=()=>{section.classList.remove("comments-open");renderCommentHub()};
  $("#pageSendComment").onclick=()=>{const text=$("#pageCommentInput").value.trim();if(!text)return;const a=getAccount(),list=getPostComments(postId).filter(c=>!(demoPost&&c.id==="c1"));list.push({id:"c"+Date.now(),name:a.name,role:a.role,text,time:"الآن",replies:[]});localStorage.setItem("comments_"+postId,JSON.stringify(list));incrementPostComments(postId);openCommentsPage(postId);notify("تم نشر التعليق")};
  box.querySelectorAll(".reply-comment").forEach(b=>b.onclick=()=>commentComposerView(postId,b.dataset.commentId));
  box.querySelectorAll(".like-comment").forEach(b=>{const key="likedComment_"+postId+"_"+b.dataset.commentId;if(localStorage.getItem(key)==="1"){b.classList.add("active");b.textContent="♥ أعجبني"}b.onclick=()=>{const active=!b.classList.contains("active");b.classList.toggle("active",active);b.textContent=active?"♥ أعجبني":"♡ إعجاب";localStorage.setItem(key,active?"1":"0")}});
  requestAnimationFrame(()=>section.scrollIntoView({behavior:"smooth",block:"start"}));
}
function replyInlinePage(postId,commentId){
  const existing=$("#replyBox-"+commentId);if(existing){existing.remove();return}
  const btn=document.querySelector('[data-comment-id="'+commentId+'"]');if(!btn)return;
  const row=btn.closest(".comment-body");const box=document.createElement("div");box.className="inline-reply";box.id="replyBox-"+commentId;
  box.innerHTML='<input placeholder="اكتب ردك..."><button>رد</button>';row.appendChild(box);
  box.querySelector("button").onclick=()=>{const text=box.querySelector("input").value.trim();if(!text)return;const a=getAccount(),list=JSON.parse(localStorage.getItem("comments_"+postId)||"[]"),c=list.find(x=>x.id===commentId);if(!c)return;c.replies=c.replies||[];c.replies.push({name:a.name,role:a.role,text});localStorage.setItem("comments_"+postId,JSON.stringify(list));openCommentsPage(postId);notify("تم نشر الرد")};
}

function openImageViewer(src){
  if(!src)return;
  show('<div class="image-viewer"><div class="image-viewer-head"><b>عرض الصورة</b><button class="small-btn" id="closeImageViewer">إغلاق</button></div><div class="image-viewer-stage"><img id="viewerImage" src="'+esc(src)+'" alt="صورة مكبرة"></div><div class="image-viewer-actions"><a class="wide-btn image-download" id="downloadImage" href="'+esc(src)+'" download="kashaf-image.jpg">حفظ الصورة</a></div></div>');
  $("#closeImageViewer").onclick=closeModal;
  $("#downloadImage").onclick=()=>setTimeout(()=>notify("تم تجهيز حفظ الصورة"),80);
}
function commentsView(postId){
  box.dataset.postId=postId;
  const demo=postId==="demo1"?[{id:"c1",name:"محمد",role:"كشاف",text:"بالتوفيق للجميع، سأكون حاضرًا.",time:"منذ 12 دقيقة",replies:[{name:"فوج الأمل",role:"قائد",text:"بانتظاركم في الموعد."}]}]:[];
  let stored=[];try{stored=JSON.parse(localStorage.getItem("comments_"+postId)||"[]");if(!Array.isArray(stored))stored=[]}catch(e){stored=[]}
  const comments=[...demo,...stored.filter(sc=>!demo.some(dc=>dc.id===sc.id))];
  show('<div class="comments-head"><div><h2>التعليقات</h2><p>'+comments.length+' تعليق • مرتبة حسب الأحدث مع تجميع الردود.</p></div></div><div class="comments-list">'+(comments.length?comments.map(commentHtml).join(""):'<div class="empty-state">كن أول من يشارك رأيه.</div>')+'</div><div class="comment-composer"><input id="commentInput" placeholder="اكتب تعليقًا..."><button class="wide-btn" id="sendComment">إرسال</button></div>');
  $("#sendComment").onclick=()=>{const text=$("#commentInput").value.trim();if(!text)return;const a=getAccount(),list=JSON.parse(localStorage.getItem("comments_"+postId)||"[]");list.push({id:"c"+Date.now(),name:a.name,role:a.role,text,time:"الآن",replies:[]});localStorage.setItem("comments_"+postId,JSON.stringify(list));incrementPostComments(postId);commentsView(postId)};
  $(".reply-comment").forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();commentComposerView(postId,b.dataset.commentId)});
  $(".like-comment").forEach(b=>{const key="likedComment_"+postId+"_"+b.dataset.commentId;if(localStorage.getItem(key)==="1"){b.classList.add("active");b.textContent="♥ أعجبني"}b.onclick=e=>{e.preventDefault();e.stopPropagation();const active=!b.classList.contains("active");b.classList.toggle("active",active);b.textContent=active?"♥ أعجبني":"♡ إعجاب";localStorage.setItem(key,active?"1":"0")}});
}
function commentHtml(c){return '<div class="comment-item"><span class="mini-avatar">'+esc(c.name.charAt(0))+'</span><div class="comment-body"><div class="comment-bubble"><b>'+esc(c.name)+' <small>'+esc(c.role||"")+'</small></b><p>'+esc(c.text||"")+'</p>'+(c.image?'<img class="comment-photo" src="'+c.image+'" alt="صورة التعليق">':"")+'</div><div class="comment-tools"><time>'+esc(c.time||"")+'</time><button class="reply-comment" data-comment-id="'+esc(c.id)+'">رد</button><button class="like-comment" data-comment-id="'+esc(c.id)+'">♡ إعجاب</button></div>'+(c.replies?.length?'<div class="comment-replies">'+c.replies.map(r=>'<div class="reply-item"><span class="mini-avatar purple">'+esc(r.name.charAt(0))+'</span><div><b>'+esc(r.name)+' <small>'+esc(r.role||"")+'</small></b><p>'+esc(r.text||"")+'</p>'+(r.image?'<img class="comment-photo reply-photo" src="'+r.image+'" alt="صورة الرد">':"")+'</div></div>').join("")+'</div>':"")+'</div></div>'}
function replyView(postId,commentId){
  show('<h2>الرد على التعليق</h2><p>اكتب ردًا محترمًا وواضحًا.</p><label class="field"><textarea id="replyInput" rows="4" placeholder="اكتب ردك..."></textarea></label><button class="wide-btn" id="sendReply">إرسال الرد</button>');
  $("#sendReply").onclick=()=>{const text=$("#replyInput").value.trim();if(!text)return;const a=getAccount(),list=JSON.parse(localStorage.getItem("comments_"+postId)||"[]"),c=list.find(x=>x.id===commentId);if(!c)return;c.replies=c.replies||[];c.replies.push({name:a.name,role:a.role,text});localStorage.setItem("comments_"+postId,JSON.stringify(list));closeModal();notify("تم نشر الرد");setTimeout(()=>commentsView(postId),100)};
}
function incrementPostComments(id){
  const p=readPosts(),i=p.findIndex(x=>x.id===id);if(i>=0){p[i].comments=(p[i].comments||0)+1;savePosts(p)}
}
function commentComposerView(postId,commentId){
  show('<h2>'+(commentId?"الرد على التعليق":"إضافة تعليق")+'</h2><p>يمكنك إضافة نص أو صورة أو الاثنين معًا.</p><label class="field"><span>التعليق</span><textarea id="commentComposerText" rows="5" placeholder="اكتب تعليقك هنا..."></textarea></label><label class="post-image-upload"><input id="commentComposerFile" type="file" accept="image/*"><span>إضافة صورة</span><small id="commentComposerName">اختياري</small></label><img id="commentComposerPreview" class="post-photo draft-preview" style="display:none" alt=""><button class="wide-btn" id="commentComposerSend">'+(commentId?"إرسال الرد":"نشر التعليق")+'</button>');
  let image="";
  $("#commentComposerFile").onchange=e=>{const file=e.target.files[0];if(!file)return;const rd=new FileReader();rd.onload=()=>{image=rd.result;$("#commentComposerPreview").src=image;$("#commentComposerPreview").style.display="block";$("#commentComposerName").textContent=file.name};rd.readAsDataURL(file)};
  $("#commentComposerSend").onclick=()=>{const text=$("#commentComposerText").value.trim();if(!text&&!image){notify("اكتب تعليقًا أو أضف صورة");return}const a=getAccount(),list=JSON.parse(localStorage.getItem("comments_"+postId)||"[]");if(commentId){let cm=list.find(x=>x.id===commentId);if(!cm&&postId==="demo1"&&commentId==="c1"){cm={id:"c1",name:"محمد",role:"كشاف",text:"بالتوفيق للجميع، سأكون حاضرًا.",time:"منذ 12 دقيقة",replies:[]};list.push(cm)}if(!cm)return;cm.replies=cm.replies||[];cm.replies.push({name:a.name,role:a.role,text,image})}else{list.push({id:"c"+Date.now(),name:a.name,role:a.role,text,image,time:"الآن",replies:[]});incrementPostComments(postId)}localStorage.setItem("comments_"+postId,JSON.stringify(list));closeModal();notify(commentId?"تم نشر الرد":"تم نشر التعليق");setTimeout(()=>commentsView(postId),100)};
}
document.addEventListener("click",e=>{
  const image=e.target.closest(".post-photo,.comment-photo");if(image){e.preventDefault();openImageViewer(image.src);return}
  const thread=e.target.closest(".comment-thread");if(thread){commentsView(thread.dataset.thread);return}
  const refresh=e.target.closest("#refreshComments");if(refresh){renderCommentHub();notify("تم تحديث النقاشات");return}
  const create=e.target.closest("#createPostBtn,#createPostHint");if(create){createPostView();return}
  const comments=e.target.closest(".comment-link,[data-action='comments']");if(comments){const id=comments.dataset.comments||comments.closest(".post")?.dataset.postId;if(id){commentsView(id);}return}
  const menu=e.target.closest(".user-post-menu");if(menu){const id=menu.dataset.postMenu,own=menu.dataset.own==="true",a=getAccount();if(own)show('<h2>خيارات المنشور</h2><button class="catalog-item" id="editPostNow"><b>تعديل المنشور</b><small>تعديل النص أو الصورة</small></button><button class="catalog-item danger-item" id="deletePostNow"><b>حذف المنشور</b><small>حذف نهائي من حسابك</small></button>');else if(a.isAdmin)show('<h2>إدارة المنشور</h2><button class="catalog-item" id="pinPostNow"><b>تثبيت أو إلغاء التثبيت</b></button><button class="catalog-item" id="hidePostNow"><b>إخفاء المنشور</b></button><button class="catalog-item danger-item" id="deletePostNow"><b>حذف المنشور</b></button>');else return;
    const edit=$("#editPostNow"),del=$("#deletePostNow"),pin=$("#pinPostNow"),hide=$("#hidePostNow");if(edit)edit.onclick=()=>createPostView(id);if(del)del.onclick=()=>{savePosts(readPosts().filter(p=>p.id!==id));closeModal();renderUserPosts();notify("تم حذف المنشور")};if(pin)pin.onclick=()=>{const p=readPosts(),x=p.find(z=>z.id===id);if(x){x.pinned=!x.pinned;x.status="published";savePosts(p);closeModal();renderUserPosts();notify(x.pinned?"تم تثبيت المنشور":"تم إلغاء التثبيت")}};if(hide)hide.onclick=()=>{const p=readPosts(),x=p.find(z=>z.id===id);if(x){x.status="hidden";savePosts(p);closeModal();renderUserPosts();notify("تم إخفاء المنشور")}};return;
  }
  const social=e.target.closest(".post-actions button");if(social){const postId=social.closest(".post")?.dataset.postId;if(!postId)return;if(social.dataset.action==="save"){const ids=getSavedPostIds(),exists=ids.includes(postId);setSavedPostIds(exists?ids.filter(id=>id!==postId):[...ids,postId]);social.classList.toggle("active",!exists);const label=social.querySelector(".icon-label");if(label)label.textContent=exists?"حفظ":"محفوظ";notify(exists?"تمت إزالة المنشور من المحفوظات":"تم حفظ المنشور للرجوع إليه لاحقًا");return}if(social.dataset.action==="share"){const text=social.closest(".post")?.querySelector("p")?.textContent||"منشور من كشّاف";if(navigator.share){navigator.share({title:"منشور من كشّاف",text}).then(()=>notify("تمت المشاركة")).catch(()=>{})}else if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>notify("تم نسخ نص المنشور للمشاركة"))}else notify("يمكنك نسخ نص المنشور ومشاركته");return}if(social.dataset.action==="like"){social.classList.toggle("active");const label=social.querySelector(".icon-label");if(label&&/^\d+$/.test(label.textContent.trim()))label.textContent=String(Number(label.textContent.trim())+(social.classList.contains("active")?1:-1));return}}
});
$("#accountBtn").onclick=accountView;$("#profileBtn").onclick=accountView;$("#communityTopBtn").onclick=openCommunity;$("#backHomeFromCommunity").onclick=closeCommunity;$("#openCommentsHub").onclick=()=>{openCommunity();setTimeout(()=>$("#comments")?.scrollIntoView({behavior:"smooth"}),30)};
syncAccount();renderUserPosts();renderCommentHub();


/* full social network layer */
const SOCIAL_PEOPLE=[{id:"p-mohamed",name:"محمد",username:"mohamed",role:"كشاف",bio:"مهتم بالمغامرات والتخييم والرحلات.",followers:128},{id:"p-sara",name:"سارة",username:"sara",role:"قائدة",bio:"أشارك تجارب التدريب والأنشطة الكشفية.",followers:342},{id:"p-yassine",name:"ياسين",username:"yassine",role:"كشاف",bio:"ملاحة، تصوير، وخدمة المجتمع.",followers:216},{id:"p-nour",name:"نور",username:"nour",role:"كشافة",bio:"أحب العمل الجماعي وحماية الطبيعة.",followers:189}];
function socialStore(k,f){try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(f))}catch(e){return f}}function socialSave(k,v){localStorage.setItem(k,JSON.stringify(v))}
function getFollowing(){return socialStore("followingPeople",[])}function setFollowing(v){socialSave("followingPeople",v)}
function notificationsSocialView(){const items=socialStore("socialNotifications",[{id:"n1",type:"like",name:"سارة",text:"أعجبت بمنشورك",time:"منذ 5 دقائق",read:false},{id:"n2",type:"comment",name:"محمد",text:"رد على منشورك",time:"منذ 18 دقيقة",read:false},{id:"n3",type:"follow",name:"نور",text:"بدأت بمتابعتك",time:"منذ ساعة",read:true}]);show('<div class="social-modal-head"><div><span class="muted-label">مركز التنبيهات</span><h2>الإشعارات</h2></div><button class="small-btn" id="markSocialRead">تحديد الكل كمقروء</button></div><div class="social-notifications">'+items.map(n=>'<button class="social-notification '+(n.read?"read":"unread")+'"><span class="notif-icon" data-icon="'+(n.type==="like"?"heart":n.type==="comment"?"comment":"users")+'"></span><span><b>'+esc(n.name)+'</b> <small>'+esc(n.text)+'</small><time>'+esc(n.time)+'</time></span></button>').join("")+'</div>');$("#markSocialRead").onclick=()=>{items.forEach(x=>x.read=true);socialSave("socialNotifications",items);notificationsSocialView();notify("تم تحديد الإشعارات كمقروءة")}}
function renderSuggestedPeople(){const box=$("#suggestedPeople");if(!box)return;const following=getFollowing();box.innerHTML=SOCIAL_PEOPLE.slice(0,3).map(p=>'<div class="suggest-person"><button class="suggest-avatar" data-profile="'+p.id+'">'+esc(p.name.charAt(0))+'</button><button class="suggest-main" data-profile="'+p.id+'"><b>'+esc(p.name)+'</b><small>'+esc(p.role)+' • '+p.followers+' متابع</small></button><button class="follow-btn '+(following.includes(p.id)?"following":"")+'" data-follow="'+p.id+'">'+(following.includes(p.id)?"متابَع":"متابعة")+'</button></div>').join("");$$("[data-follow]").forEach(b=>b.onclick=e=>{e.stopPropagation();const ids=getFollowing(),has=ids.includes(b.dataset.follow);setFollowing(has?ids.filter(x=>x!==b.dataset.follow):[...ids,b.dataset.follow]);renderSuggestedPeople();notify(has?"تم إلغاء المتابعة":"تمت المتابعة")});$$("[data-profile]").forEach(b=>b.onclick=()=>{const p=SOCIAL_PEOPLE.find(x=>x.id===b.dataset.profile);if(p)socialProfileView(p)})}
function renderTrending(){const box=$("#trendingTags");if(!box)return;const tags=["#رحلة_الجبل","#كشافة_الجزائر","#التخييم","#الإسعافات_الأولية","#خدمة_المجتمع"];box.innerHTML=tags.map((t,i)=>'<button class="trend-tag" data-tag="'+esc(t)+'"><b>'+t+'</b><small>'+(142-i*17)+' منشورًا</small></button>').join("")}
function socialProfileView(p){const following=getFollowing().includes(p.id);show('<div class="social-profile"><div class="social-cover"></div><div class="social-profile-main"><span class="profile-avatar-xl">'+esc(p.name.charAt(0))+'</span><div class="social-profile-info"><h2>'+esc(p.name)+'</h2><p>@'+esc(p.username)+' • '+esc(p.role)+'</p><span>'+esc(p.bio)+'</span></div><button class="follow-btn big '+(following?"following":"")+'" id="profileFollow">'+(following?"متابَع":"متابعة")+'</button></div><div class="profile-stats"><div><b>'+p.followers+'</b><small>متابع</small></div><div><b>86</b><small>منشور</small></div><div><b>14</b><small>شارة</small></div></div><div class="profile-tabs"><button class="active">المنشورات</button><button>الصور</button><button>الإنجازات</button></div><div class="profile-preview-grid"><div></div><div></div><div></div></div></div>');$("#profileFollow").onclick=()=>{const a=getFollowing(),has=a.includes(p.id);setFollowing(has?a.filter(x=>x!==p.id):[...a,p.id]);socialProfileView(p);notify(has?"تم إلغاء المتابعة":"تمت المتابعة")}}
function messagesView(){const chats=socialStore("socialChats",[{id:"c1",name:"سارة",role:"قائدة",last:"هل جهزت حقيبة الرحلة؟",time:"10:42"},{id:"c2",name:"محمد",role:"كشاف",last:"أراك غدًا في نقطة التجمع.",time:"09:18"},{id:"c3",name:"فوج الأمل",role:"فوج",last:"تم تحديث موعد النشاط.",time:"أمس"}]);show('<div class="chat-head"><div><span class="muted-label">التواصل</span><h2>الرسائل</h2></div><button class="small-btn" id="newChat">رسالة جديدة</button></div><div id="chatItems">'+chats.map(c=>'<button class="chat-item" data-chat="'+c.id+'"><span class="mini-avatar">'+esc(c.name.charAt(0))+'</span><span><b>'+esc(c.name)+'</b><small>'+esc(c.last)+'</small></span><time>'+esc(c.time)+'</time></button>').join("")+'</div>');$$(".chat-item").forEach(b=>b.onclick=()=>openChat(b.dataset.chat));$("#newChat").onclick=()=>{show('<h2>محادثة جديدة</h2><p>اختر شخصًا من مجتمعك.</p><div class="feature-catalog">'+SOCIAL_PEOPLE.map(p=>'<button class="catalog-item new-chat-person" data-person="'+p.id+'"><b>'+esc(p.name)+'</b><small>'+esc(p.role)+' • @'+esc(p.username)+'</small></button>').join("")+'</div>');$$(".new-chat-person").forEach(b=>b.onclick=()=>{const p=SOCIAL_PEOPLE.find(x=>x.id===b.dataset.person);openChat("new-"+p.id,p)})}}
function openChat(id,person){const chats=socialStore("socialChats",[]),c=person?{name:person.name,role:person.role,last:"ابدأ المحادثة",time:"الآن"}:chats.find(x=>x.id===id)||{name:"المحادثة",role:"",last:"",time:""};const key="chatMessages_"+id,msgs=socialStore(key,person?[]:[{from:"them",text:c.last,time:c.time}]);show('<div class="chat-window"><div class="chat-window-head"><button class="small-btn" id="backMessages">الرسائل</button><div><b>'+esc(c.name)+'</b><small>'+esc(c.role)+'</small></div><span class="mini-avatar">'+esc(c.name.charAt(0))+'</span></div><div class="chat-messages">'+msgs.map(m=>'<div class="chat-bubble '+(m.from==="me"?"mine":"")+'">'+esc(m.text)+'<time>'+esc(m.time||"الآن")+'</time></div>').join("")+'</div><div class="chat-compose"><input id="chatInput" placeholder="اكتب رسالة..."><button class="wide-btn" id="chatSend">إرسال</button></div></div>');$("#backMessages").onclick=messagesView;$("#chatSend").onclick=()=>{const input=$("#chatInput"),text=input.value.trim();if(!text)return;const arr=socialStore(key,[]);arr.push({from:"me",text,time:new Date().toLocaleTimeString("ar-DZ",{hour:"2-digit",minute:"2-digit"})});socialSave(key,arr);openChat(id,person)}}
function storiesView(){const stories=socialStore("socialStories",[{id:"s1",name:"سارة",text:"تجهيزات رحلة الغد",time:"منذ 20د"},{id:"s2",name:"محمد",text:"من التدريب اليوم",time:"منذ ساعة"},{id:"s3",name:"نور",text:"حملة التشجير",time:"منذ ساعتين"}]);show('<div class="social-modal-head"><div><span class="muted-label">قصص المجتمع</span><h2>القصص</h2></div><button class="small-btn" id="addStory">قصتي</button></div><div class="story-view-grid">'+stories.map(s=>'<button class="story-view-card" data-story="'+s.id+'"><span>'+esc(s.name.charAt(0))+'</span><b>'+esc(s.name)+'</b><small>'+esc(s.text)+'</small><time>'+esc(s.time)+'</time></button>').join("")+'</div>');$$("[data-story]").forEach(b=>b.onclick=()=>{const s=stories.find(x=>x.id===b.dataset.story);if(s)show('<div class="story-reader"><div class="story-reader-top"><b>'+esc(s.name)+'</b><button class="small-btn" id="storyClose">إغلاق</button></div><div class="story-reader-body"><span>'+esc(s.name.charAt(0))+'</span><h2>'+esc(s.text)+'</h2><p>قصة من مجتمع كشّاف.</p></div></div>');$("#storyClose")?.addEventListener("click",storiesView)});$("#addStory").onclick=()=>show('<h2>إضافة قصة</h2><p>شارك تحديثًا قصيرًا مع مجتمعك.</p><label class="field"><span>النص</span><textarea id="storyText" rows="4" placeholder="ماذا يحدث معك؟"></textarea></label><button class="wide-btn" id="publishStory">نشر القصة</button>');$("#publishStory").onclick=()=>{const text=$("#storyText").value.trim();if(!text){notify("اكتب شيئًا للقصة");return}const a=getAccount(),arr=socialStore("socialStories",[]);arr.unshift({id:"story"+Date.now(),name:a.name,text,time:"الآن"});socialSave("socialStories",arr);storiesView();notify("تم نشر قصتك")}}
function renderStories(){const box=$("#storiesStrip");if(!box)return;const stories=socialStore("socialStories",[{id:"s1",name:"سارة",text:"تجهيزات الرحلة",time:"20د"},{id:"s2",name:"محمد",text:"من التدريب",time:"1س"},{id:"s3",name:"نور",text:"حملة التشجير",time:"2س"}]);box.innerHTML='<button class="story-card own" id="storyAdd"><span class="story-ring">+</span><b>قصتك</b><small>أضف تحديثًا</small></button>'+stories.slice(0,5).map(s=>'<button class="story-card" data-story-open="'+s.id+'"><span class="story-ring">'+esc(s.name.charAt(0))+'</span><b>'+esc(s.name)+'</b><small>'+esc(s.time)+'</small></button>').join("");$("#storyAdd").onclick=storiesView;$$("[data-story-open]").forEach(b=>b.onclick=storiesView)}
function setFeedFilter(filter){$$("[data-feed-filter]").forEach(b=>b.classList.toggle("active",b.dataset.feedFilter===filter));$$(".post").forEach(p=>{let show=true;if(filter==="saved")show=getSavedPostIds().includes(p.dataset.postId);if(filter==="media")show=!!p.querySelector("img,.post-image,.post-gallery");if(filter==="following"){const names=getFollowing().map(id=>SOCIAL_PEOPLE.find(x=>x.id===id)?.name).filter(Boolean);show=names.includes(p.querySelector(".post-head b")?.textContent||"")}p.style.display=show?"":"none"})}
function reactionsView(post){const reactions=[["like","إعجاب","♡"],["love","أحببته","♥"],["support","دعم","+"],["wow","مذهل","!"],["celebrate","احتفال","★"]];show('<h2>تفاعل مع المنشور</h2><p>اختر التفاعل المناسب.</p><div class="reaction-grid">'+reactions.map(r=>'<button class="reaction-choice" data-reaction-choice="'+r[0]+'"><strong>'+r[2]+'</strong><span>'+r[1]+'</span></button>').join("")+'</div>');$$("[data-reaction-choice]").forEach(b=>b.onclick=()=>{localStorage.setItem("reaction_"+post,b.dataset.reactionChoice);closeModal();notify("تم تسجيل تفاعلك")})}
function socialSearchView(initial){show('<span class="muted-label">استكشاف</span><h2>ابحث في كشّاف</h2><label class="field"><span>بحث عن أشخاص أو منشورات أو وسم</span><input id="socialSearchInput" value="'+esc(initial||"")+'" autofocus placeholder="مثال: رحلة الجبل أو سارة أو #التخييم"></label><div class="search-chips"><button data-query="#التخييم">#التخييم</button><button data-query="سارة">سارة</button><button data-query="رحلة الجبل">رحلة الجبل</button></div><div id="socialSearchResults"></div>');const run=()=>{const q=$("#socialSearchInput").value.trim().toLowerCase(),people=SOCIAL_PEOPLE.filter(p=>!q||p.name.toLowerCase().includes(q)||p.username.includes(q)),tags=["#رحلة_الجبل","#التخييم","#كشافة_الجزائر","#خدمة_المجتمع"].filter(t=>!q||t.toLowerCase().includes(q));$("#socialSearchResults").innerHTML=(people.length?'<h3 class="search-section-title">الأشخاص</h3>'+people.map(p=>'<button class="search-person" data-profile="'+p.id+'"><span>'+p.name.charAt(0)+'</span><b>'+esc(p.name)+'</b><small>@'+esc(p.username)+' • '+esc(p.role)+'</small></button>').join(""):"")+(tags.length?'<h3 class="search-section-title">الوسوم</h3>'+tags.map(t=>'<button class="trend-tag" data-tag="'+esc(t)+'"><b>'+t+'</b><small>استكشف المنشورات</small></button>').join(""):"")+(!people.length&&!tags.length?'<div class="empty-state">لا توجد نتائج مطابقة.</div>':"");$$('#socialSearchResults [data-profile]').forEach(b=>b.onclick=()=>{const p=SOCIAL_PEOPLE.find(x=>x.id===b.dataset.profile);if(p)socialProfileView(p)})};$("#socialSearchInput").oninput=run;$$("[data-query]").forEach(b=>b.onclick=()=>{$("#socialSearchInput").value=b.dataset.query;run()});run()}
function postMenuView(postId){const own=postId.startsWith("p");show('<h2>خيارات المنشور</h2><div class="feature-catalog">'+(own?'<button class="catalog-item" id="menuEdit"><b>تعديل المنشور</b><small>تعديل النص والصور</small></button><button class="catalog-item danger-item" id="menuDelete"><b>حذف المنشور</b><small>إزالة المنشور من حسابك</small></button>':'<button class="catalog-item" id="menuReport"><b>الإبلاغ عن المنشور</b><small>إرسال البلاغ للمراجعة</small></button><button class="catalog-item" id="menuNotInterested"><b>لست مهتمًا</b><small>تقليل ظهور محتوى مشابه</small></button>')+'<button class="catalog-item" id="menuCopy"><b>نسخ رابط المنشور</b><small>مشاركة الرابط مع الآخرين</small></button></div>');if($("#menuEdit"))$("#menuEdit").onclick=()=>createPostView(postId);if($("#menuDelete"))$("#menuDelete").onclick=()=>{savePosts(readPosts().filter(x=>x.id!==postId));closeModal();renderUserPosts();notify("تم حذف المنشور")};if($("#menuReport"))$("#menuReport").onclick=()=>{closeModal();notify("تم إرسال البلاغ للمراجعة")};if($("#menuNotInterested"))$("#menuNotInterested").onclick=()=>{closeModal();notify("سيتم تقليل هذا النوع من المنشورات")};if($("#menuCopy"))$("#menuCopy").onclick=()=>{if(navigator.clipboard)navigator.clipboard.writeText(location.href.split("#")[0]+"#post-"+postId);closeModal();notify("تم نسخ رابط المنشور")}}
document.addEventListener("click",e=>{const react=e.target.closest('[data-action="react"]');if(react){const id=react.closest(".post")?.dataset.postId;if(id)reactionsView(id);return}const more=e.target.closest(".post .more");if(more){const id=more.closest(".post")?.dataset.postId;if(id)postMenuView(id);return}const filter=e.target.closest("[data-feed-filter]");if(filter){setFeedFilter(filter.dataset.feedFilter);return}const trend=e.target.closest("[data-tag]");if(trend){socialSearchView(trend.dataset.tag);return}});
$("#notificationsBtn").onclick=notificationsSocialView;$("#messagesBtn").onclick=messagesView;$("#searchBtn").onclick=()=>socialSearchView("");$$(".social-tabs [data-feed-filter]").forEach(b=>b.onclick=()=>setFeedFilter(b.dataset.feedFilter));renderStories();renderSuggestedPeople();renderTrending();


/* social expansion v2 */
function getProfilePrivacy(username){
  return socialStore("profilePrivacy_"+username,{bio:true,photos:true,posts:true,badges:true,followers:true});
}
function setProfilePrivacy(username,v){socialSave("profilePrivacy_"+username,v)}
function getPersonPosts(p){
  const ownPosts=readPosts().filter(x=>x.status==="published"&&(x.authorUsername===p.username||x.authorName===p.name));
  const samples={
    mohamed:[{id:"sp-m1",text:"تجربة جديدة في الملاحة اليوم. البوصلة والخريطة تصنعان الفرق!",images:[],createdAt:Date.now()-3600000}],
    sara:[{id:"sp-s1",text:"تذكير: تدريب الإسعافات الأولية هذا الأسبوع.",images:[],createdAt:Date.now()-7200000}],
    yassine:[{id:"sp-y1",text:"لقطة من تدريب الملاحة في الطبيعة.",images:[],createdAt:Date.now()-10800000}],
    nour:[{id:"sp-n1",text:"معًا نحافظ على الطبيعة ونخدم مجتمعنا.",images:[],createdAt:Date.now()-14400000}]
  };
  return [...ownPosts,...(samples[p.username]||[])]
}
function socialProfileView(p){
  const a=getAccount(), isMe=p.id==="me"||p.username===a.username;
  const privacy=getProfilePrivacy(p.username);
  const following=getFollowing().includes(p.id);
  const posts=getPersonPosts(p);
  const imagePosts=posts.filter(x=>(x.images&&x.images.length)||(x.image));
  const avatar=p.avatar||"";
  const profileAvatar=avatar?'<img src="'+esc(avatar)+'" alt="">':esc((p.name||"أ").charAt(0));
  const controls=isMe?'<div class="profile-control-row"><button class="small-btn" id="profilePrivacyBtn">إعدادات الخصوصية</button><button class="small-btn" id="profileEditBtn">تعديل الملف</button></div>':'';
  const bio=privacy.bio?'<p class="profile-bio">'+esc(p.bio||"لا توجد نبذة بعد.")+'</p>':'<p class="profile-locked-note">النبذة مخفية.</p>';
  const stats='<div class="profile-stats"><div><b>'+ (privacy.followers?(p.followers||0):"—") +'</b><small>متابع</small></div><div><b>'+ (privacy.posts?posts.length:"—") +'</b><small>منشور</small></div><div><b>'+ (privacy.badges?"14":"—") +'</b><small>شارات</small></div></div>';
  const postsHtml=privacy.posts?posts.map(x=>'<article class="profile-post-mini"><div><b>'+esc(p.name)+'</b><small>'+formatDate(x.createdAt)+'</small></div><p>'+esc(x.text||"منشور بصورة").replace(/\n/g,"<br>")+'</p>'+(x.images?.length?'<div class="profile-mini-gallery">'+x.images.slice(0,3).map(im=>'<img src="'+esc(im)+'" alt="">').join("")+'</div>':"")+'</article>').join(""):'<div class="empty-state">صاحب الحساب أخفى منشوراته.</div>';
  const photosHtml=privacy.photos?(imagePosts.length?imagePosts.map(x=>(x.images||[x.image]).filter(Boolean).map(im=>'<img src="'+esc(im)+'" alt="صورة من منشورات '+esc(p.name)+'">').join("")).join(""):'<div class="empty-state">لا توجد صور منشورة.</div>'):'<div class="empty-state">الصور مخفية.</div>';
  show('<div class="social-profile"><div class="social-cover"></div><div class="social-profile-main"><span class="profile-avatar-xl">'+profileAvatar+'</span><div class="social-profile-info"><h2>'+esc(p.name)+'</h2><p>@'+esc(p.username)+' • '+esc(p.role||"عضو")+'</p>'+bio+'</div>'+(!isMe?'<button class="follow-btn big '+(following?"following":"")+'" id="profileFollow">'+(following?"متابَع":"متابعة")+'</button>':"")+'</div>'+controls+stats+'<div class="profile-tabs"><button class="active" data-profile-tab="posts">المنشورات</button><button data-profile-tab="photos">الصور</button><button data-profile-tab="badges">الإنجازات</button></div><div id="profileTabContent" class="profile-tab-content">'+postsHtml+'</div></div>');
  if($("#profileFollow"))$("#profileFollow").onclick=()=>{const ids=getFollowing(),has=ids.includes(p.id);setFollowing(has?ids.filter(x=>x!==p.id):[...ids,p.id]);socialProfileView(p);notify(has?"تم إلغاء المتابعة":"تمت المتابعة")};
  if($("#profilePrivacyBtn"))$("#profilePrivacyBtn").onclick=()=>profilePrivacyView(p);
  if($("#profileEditBtn"))$("#profileEditBtn").onclick=editProfileView;
  $$(".profile-tabs [data-profile-tab]").forEach(b=>b.onclick=()=>{ $$(".profile-tabs [data-profile-tab]").forEach(x=>x.classList.toggle("active",x===b)); const c=$("#profileTabContent"); if(!c)return; if(b.dataset.profileTab==="posts")c.innerHTML=postsHtml; else if(b.dataset.profileTab==="photos")c.innerHTML=photosHtml; else c.innerHTML=privacy.badges?'<div class="profile-badges"><div>★ سيد الملاحة</div><div>✓ الإسعافات الأولية</div><div>◆ حامي البيئة</div></div>':'<div class="empty-state">الإنجازات مخفية.</div>'; });
}
function profilePrivacyView(p){
  const current=getProfilePrivacy(p.username);
  const row=(key,label,desc)=>'<label class="privacy-option"><input type="checkbox" data-privacy="'+key+'" '+(current[key]?"checked":"")+'><span><b>'+label+'</b><small>'+desc+'</small></span></label>';
  show('<h2>خصوصية الملف الشخصي</h2><p>اختر ما يظهر للآخرين في حسابك.</p><div class="privacy-list">'+
    row("bio","النبذة","إظهار أو إخفاء معلوماتك التعريفية.")+
    row("photos","الصور","إظهار أو إخفاء معرض صورك.")+
    row("posts","المنشورات","إظهار أو إخفاء منشوراتك.")+
    row("badges","الإنجازات","إظهار أو إخفاء الشارات والإنجازات.")+
    row("followers","المتابعون","إظهار أو إخفاء عدد المتابعين.")+
    '</div><button class="wide-btn" id="savePrivacy">حفظ الخصوصية</button>');
  $("#savePrivacy").onclick=()=>{const v={};$$("[data-privacy]").forEach(x=>v[x.dataset.privacy]=x.checked);setProfilePrivacy(p.username,v);closeModal();socialProfileView(p);notify("تم حفظ خصوصية حسابك")};
}
function openGalleryViewer(images,index=0){
  images=images.filter(Boolean);if(!images.length)return;
  let i=Math.max(0,Math.min(index,images.length-1));
  const render=()=>{show('<div class="image-viewer"><div class="image-viewer-head"><b>صور المنشور <small>'+((i+1)+' / '+images.length)+'</small></b><button class="small-btn" id="closeImageViewer">إغلاق</button></div><div class="image-viewer-stage"><button class="gallery-nav gallery-prev" id="galleryPrev" '+(i===0?"disabled":"")+' aria-label="الصورة السابقة">‹</button><img id="viewerImage" src="'+esc(images[i])+'" alt="صورة المنشور '+(i+1)+'"><button class="gallery-nav gallery-next" id="galleryNext" '+(i===images.length-1?"disabled":"")+' aria-label="الصورة التالية">›</button></div><div class="image-viewer-actions"><a class="wide-btn image-download" href="'+esc(images[i])+'" download="kashaf-image-'+(i+1)+'.jpg">حفظ الصورة</a></div></div>');$("#closeImageViewer").onclick=closeModal;$("#galleryPrev").onclick=()=>{if(i>0){i--;render()}};$("#galleryNext").onclick=()=>{if(i<images.length-1){i++;render()}}};
  render();
}
function getSearchPosts(){
  const demo=[
    {id:"demo1",authorName:"فوج الأمل",authorUsername:"al-amal",role:"قائد",text:"غدًا موعد رحلتنا إلى الجبل."},
    {id:"demo2",authorName:"سارة",authorUsername:"sara",role:"قائدة",text:"تم فتح شارة جديدة لأعضاء الفوج."}
  ];
  return [...demo,...readPosts().filter(p=>p.status==="published")];
}
function socialSearchView(initial){
  show('<span class="muted-label">استكشاف</span><h2>البحث في كشّاف</h2><label class="field"><span>حساب، اسم مستخدم، منشور أو وسم</span><input id="socialSearchInput" value="'+esc(initial||"")+'" autofocus placeholder="ابحث باسم شخص أو كلمة من منشور"></label><div class="search-chips"><button data-query="#التخييم">#التخييم</button><button data-query="سارة">سارة</button><button data-query="رحلة الجبل">رحلة الجبل</button></div><div id="socialSearchResults"></div>');
  const run=()=>{
    const q=($("#socialSearchInput").value||"").trim().toLowerCase();
    const people=SOCIAL_PEOPLE.filter(p=>!q||p.name.toLowerCase().includes(q)||p.username.toLowerCase().includes(q)||p.role.toLowerCase().includes(q));
    const posts=getSearchPosts().filter(p=>!q||[p.text,p.authorName,p.authorUsername,p.role].filter(Boolean).some(v=>String(v).toLowerCase().includes(q)));
    const tags=["#رحلة_الجبل","#التخييم","#كشافة_الجزائر","#خدمة_المجتمع"].filter(t=>!q||t.toLowerCase().includes(q));
    let html="";
    if(people.length)html+='<h3 class="search-section-title">الحسابات</h3>'+people.map(p=>'<button class="search-person" data-profile="'+p.id+'"><span>'+esc(p.name.charAt(0))+'</span><b>'+esc(p.name)+'</b><small>@'+esc(p.username)+' • '+esc(p.role)+'</small></button>').join("");
    if(posts.length)html+='<h3 class="search-section-title">المنشورات</h3>'+posts.slice(0,12).map(p=>'<button class="search-post-result" data-search-post="'+p.id+'"><b>'+esc(p.authorName)+'</b><small>'+esc((p.text||"منشور بصورة").slice(0,120))+'</small></button>').join("");
    if(tags.length)html+='<h3 class="search-section-title">الوسوم</h3>'+tags.map(t=>'<button class="trend-tag" data-tag="'+esc(t)+'"><b>'+t+'</b><small>استكشف المنشورات المرتبطة</small></button>').join("");
    $("#socialSearchResults").innerHTML=html||'<div class="empty-state">لا توجد نتائج مطابقة.</div>';
    $$("#socialSearchResults [data-profile]").forEach(b=>b.onclick=()=>{const p=SOCIAL_PEOPLE.find(x=>x.id===b.dataset.profile);if(p)socialProfileView(p)});
    $$("#socialSearchResults [data-search-post]").forEach(b=>b.onclick=()=>{const id=b.dataset.searchPost;closeModal();openCommunity();setTimeout(()=>document.querySelector('[data-post-id="'+id+'"]')?.scrollIntoView({behavior:"smooth",block:"center"}),100)});
  };
  $("#socialSearchInput").oninput=run;
  $$("[data-query]").forEach(b=>b.onclick=()=>{$("#socialSearchInput").value=b.dataset.query;run()});
  run();
}
function postMenuView(postId){
  const posts=readPosts(), p=posts.find(x=>x.id===postId), own=!!p&&p.authorUsername===getAccount().username;
  const actions=own?
    '<button class="catalog-item" id="menuEdit"><b>تعديل المنشور</b><small>تغيير النص أو الصور</small></button><button class="catalog-item" id="menuPrivacy"><b>خصوصية المنشور</b><small>إظهار أو إخفاء هذا المنشور</small></button><button class="catalog-item" id="menuCopy"><b>نسخ رابط المنشور</b><small>مشاركة الرابط</small></button><button class="catalog-item danger-item" id="menuDelete"><b>حذف المنشور</b><small>إزالة المنشور نهائيًا</small></button>':
    '<button class="catalog-item" id="menuSaveAlt"><b>حفظ المنشور</b><small>الرجوع إليه لاحقًا</small></button><button class="catalog-item" id="menuNotInterested"><b>لست مهتمًا</b><small>إخفاء محتوى مشابه من الخلاصة</small></button><button class="catalog-item" id="menuReport"><b>الإبلاغ عن المنشور</b><small>إرسال البلاغ للمراجعة</small></button><button class="catalog-item" id="menuCopy"><b>نسخ رابط المنشور</b><small>مشاركة الرابط</small></button>';
  show('<h2>خيارات المنشور</h2><div class="feature-catalog">'+actions+'</div>');
  if($("#menuEdit"))$("#menuEdit").onclick=()=>createPostView(postId);
  if($("#menuDelete"))$("#menuDelete").onclick=()=>{savePosts(posts.filter(x=>x.id!==postId));closeModal();renderUserPosts();notify("تم حذف المنشور")};
  if($("#menuPrivacy"))$("#menuPrivacy").onclick=()=>{if(p){p.status=p.status==="hidden"?"published":"hidden";savePosts(posts);closeModal();renderUserPosts();notify(p.status==="hidden"?"تم إخفاء المنشور":"تم إظهار المنشور")}};
  if($("#menuSaveAlt"))$("#menuSaveAlt").onclick=()=>{const ids=getSavedPostIds();if(!ids.includes(postId))setSavedPostIds([...ids,postId]);closeModal();notify("تم حفظ المنشور")};
  if($("#menuNotInterested"))$("#menuNotInterested").onclick=()=>{socialSave("hiddenPosts",[...new Set([...socialStore("hiddenPosts",[]),postId])]);closeModal();renderUserPosts();notify("تم إخفاء المنشور من خلاصتك")};
  if($("#menuReport"))$("#menuReport").onclick=()=>{closeModal();notify("تم إرسال البلاغ للمراجعة")};
  if($("#menuCopy"))$("#menuCopy").onclick=()=>{navigator.clipboard?.writeText(location.href.split("#")[0]+"#post-"+postId);closeModal();notify("تم نسخ رابط المنشور")};
}

/* reliable threaded comments */
function commentsView(postId){
  const comments=getPostComments(postId);
  show('<div class="comments-head"><div><h2>التعليقات</h2><p>'+comments.length+' تعليق • الردود مرتبة أسفل كل تعليق.</p></div><button class="small-btn" id="closeCommentsModal">إغلاق</button></div><div class="comments-list">'+(comments.length?comments.map(commentHtml).join(""):'<div class="empty-state">كن أول من يشارك رأيه.</div>')+'</div><div class="comment-composer"><input id="commentInput" placeholder="اكتب تعليقًا..."><button class="wide-btn" id="sendComment">إرسال</button></div>');
  $("#closeCommentsModal").onclick=closeModal;
  $("#sendComment").onclick=()=>{const text=$("#commentInput").value.trim();if(!text)return;const a=getAccount(),list=getPostComments(postId).filter(c=>!(postId==="demo1"&&c.id==="c1"));list.push({id:"c"+Date.now(),name:a.name,role:a.role,text,time:"الآن",replies:[]});localStorage.setItem("comments_"+postId,JSON.stringify(list));incrementPostComments(postId);commentsView(postId);notify("تم نشر التعليق")};
  $$(".reply-comment").forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();commentComposerView(postId,b.dataset.commentId)});
  $$(".like-comment").forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();const key="likedComment_"+postId+"_"+b.dataset.commentId,active=!b.classList.contains("active");b.classList.toggle("active",active);b.textContent=active?"♥ أعجبني":"♡ إعجاب";localStorage.setItem(key,active?"1":"0")});
}
function renderUserPosts(){
  const wrap=$("#feed .posts");if(!wrap)return;
  $$(".user-post").forEach(e=>e.remove());
  const hidden=new Set(socialStore("hiddenPosts",[]));
  const posts=readPosts().filter(p=>(p.status==="published"||p.authorUsername===getAccount().username)&&!hidden.has(p.id));
  posts.reverse().forEach(p=>wrap.prepend(postElement(p)));
  mountIcons();
}

/* account profile shortcut */
function accountView(){
  const a=getAccount();
  show('<div class="account-head"><div class="account-avatar-lg" id="accountAvatarPreview">'+(a.avatar?'<img src="'+a.avatar+'" alt="">':esc((a.name||"أ").charAt(0)))+'</div><div><h2>حسابي</h2><p>@'+esc(a.username)+' • '+esc(a.role)+' • مستوى '+esc(a.level)+'</p></div></div><div class="feature-catalog account-menu"><button class="catalog-item" id="viewMyProfile"><b>عرض ملفي</b><small>المنشورات، الصور والإنجازات</small></button><button class="catalog-item" id="editProfileBtn"><b>تعديل الملف الشخصي</b><small>الصورة، الاسم واسم المستخدم</small></button><button class="catalog-item" id="myPostsBtn"><b>منشوراتي</b><small>تعديل وحذف منشوراتك</small></button><button class="catalog-item" id="savedPostsBtn"><b>المنشورات المحفوظة</b><small>ما حفظته للعودة إليه</small></button><button class="catalog-item" id="accountSettings2"><b>الإعدادات والخصوصية</b><small>الخصوصية والإشعارات</small></button></div>');
  $("#viewMyProfile").onclick=()=>socialProfileView({id:"me",name:a.name,username:a.username,role:a.role,bio:localStorage.getItem("accountBio")||"كشاف في مجتمع كشّاف.",followers:Number(localStorage.getItem("accountFollowers")||0),avatar:a.avatar});
  $("#editProfileBtn").onclick=editProfileView;$("#myPostsBtn").onclick=myPostsView;$("#savedPostsBtn").onclick=savedPostsView;$("#accountSettings2").onclick=settingsView;
}

/* media navigation and profile discovery */
document.addEventListener("click",e=>{
  const photo=e.target.closest(".post-gallery .post-photo");
  if(photo){e.preventDefault();const gallery=[...photo.closest(".post-gallery").querySelectorAll(".post-photo")].map(x=>x.src);openGalleryViewer(gallery,Math.max(0,[...photo.closest(".post-gallery").querySelectorAll(".post-photo")].indexOf(photo)));return}
  const profile=e.target.closest(".post-head b");
  if(profile){const post=profile.closest(".post"),name=profile.textContent.split(" • ")[0].trim(),p=SOCIAL_PEOPLE.find(x=>x.name===name);if(p){socialProfileView(p);return}}
});

/* social v3: profiles, blocking, smoother stories, persistent avatar */
function getBlockedPeople(){return socialStore("blockedPeople",[])}
function setBlockedPeople(v){socialSave("blockedPeople",[...new Set(v)])}
function isBlocked(id){return getBlockedPeople().includes(id)}
function personById(id){return SOCIAL_PEOPLE.find(p=>p.id===id)}
function compressAvatar(file){
  return new Promise((resolve,reject)=>{
    const rd=new FileReader();rd.onload=()=>{
      const img=new Image();img.onload=()=>{
        const max=420,scale=Math.min(1,max/Math.max(img.naturalWidth||img.width,img.naturalHeight||img.height));
        const c=document.createElement("canvas");c.width=Math.max(1,Math.round((img.naturalWidth||img.width)*scale));c.height=Math.max(1,Math.round((img.naturalHeight||img.height)*scale));
        c.getContext("2d").drawImage(img,0,0,c.width,c.height);resolve(c.toDataURL("image/jpeg",.78));
      };img.onerror=()=>resolve(rd.result);img.src=rd.result;
    };rd.onerror=reject;rd.readAsDataURL(file);
  });
}
function renderProfileAction(p){
  const blocked=isBlocked(p.id), following=getFollowing().includes(p.id);
  return '<div class="profile-action-row"><button class="follow-btn big '+(following?"following":"")+'" id="profileFollow">'+(following?"متابَع":"متابعة")+'</button><button class="small-btn '+(blocked?"blocked":"")+'" id="profileBlock">'+(blocked?"إلغاء الحظر":"حظر")+'</button><button class="small-btn" id="profileMessage">رسالة</button></div>';
}
function socialProfileView(p){
  const a=getAccount(), isMe=p.id==="me"||p.username===a.username;
  if(!isMe && isBlocked(p.id)){show('<div class="blocked-profile"><div class="blocked-icon">×</div><h2>هذا الحساب محظور</h2><p>لن تظهر منشورات هذا الشخص أو معلوماته لك ما دام الحظر مفعّلًا.</p><button class="wide-btn" id="unblockProfile">إلغاء الحظر</button></div>');$("#unblockProfile").onclick=()=>{setBlockedPeople(getBlockedPeople().filter(x=>x!==p.id));socialProfileView(p);renderUserPosts();renderStories();};return}
  const privacy=getProfilePrivacy(p.username),following=getFollowing().includes(p.id),posts=getPersonPosts(p).filter(x=>!isBlocked(p.id));
  const imagePosts=posts.filter(x=>(x.images&&x.images.length)||(x.image)),avatar=p.avatar||"";
  const profileAvatar=avatar?'<img src="'+esc(avatar)+'" alt="">':esc((p.name||"أ").charAt(0));
  const controls=isMe?'<div class="profile-control-row"><button class="small-btn" id="profilePrivacyBtn">إعدادات الخصوصية</button><button class="small-btn" id="profileEditBtn">تعديل الملف</button></div>':renderProfileAction(p);
  const bio=privacy.bio?'<p class="profile-bio">'+esc(p.bio||"لا توجد نبذة بعد.")+'</p>':'<p class="profile-locked-note">النبذة مخفية.</p>';
  const stats='<div class="profile-stats"><div><b>'+ (privacy.followers?(p.followers||0):"—") +'</b><small>متابع</small></div><div><b>'+ (privacy.posts?posts.length:"—") +'</b><small>منشور</small></div><div><b>'+ (privacy.badges?"14":"—") +'</b><small>شارات</small></div></div>';
  const postsHtml=privacy.posts?posts.map(x=>'<article class="profile-post-mini"><div><b>'+esc(p.name)+'</b><small>'+formatDate(x.createdAt)+'</small></div><p>'+esc(x.text||"منشور بصورة").replace(/\n/g,"<br>")+'</p>'+(x.images?.length?'<div class="profile-mini-gallery">'+x.images.slice(0,3).map(im=>'<img src="'+esc(im)+'" alt="">').join("")+'</div>':"")+'</article>').join(""):'<div class="empty-state">صاحب الحساب أخفى منشوراته.</div>';
  const photosHtml=privacy.photos?(imagePosts.length?'<div class="profile-photo-grid">'+imagePosts.flatMap(x=>(x.images||[x.image]).filter(Boolean)).map(im=>'<img src="'+esc(im)+'" alt="صورة من '+esc(p.name)+'">').join("")+'</div>':'<div class="empty-state">لا توجد صور منشورة.</div>'):'<div class="empty-state">الصور مخفية.</div>';
  show('<div class="social-profile"><div class="social-cover"></div><div class="social-profile-main"><span class="profile-avatar-xl">'+profileAvatar+'</span><div class="social-profile-info"><h2>'+esc(p.name)+'</h2><p>@'+esc(p.username)+' • '+esc(p.role||"عضو")+'</p>'+bio+'</div></div>'+controls+stats+'<div class="profile-tabs"><button class="active" data-profile-tab="posts">المنشورات</button><button data-profile-tab="photos">الصور</button><button data-profile-tab="badges">الإنجازات</button></div><div id="profileTabContent" class="profile-tab-content">'+postsHtml+'</div></div>');
  if($("#profileFollow"))$("#profileFollow").onclick=()=>{const ids=getFollowing(),has=ids.includes(p.id);setFollowing(has?ids.filter(x=>x!==p.id):[...ids,p.id]);socialProfileView(p);notify(has?"تم إلغاء المتابعة":"تمت المتابعة")};
  if($("#profileBlock"))$("#profileBlock").onclick=()=>{const b=isBlocked(p.id);setBlockedPeople(b?getBlockedPeople().filter(x=>x!==p.id):[...getBlockedPeople(),p.id]);closeModal();renderUserPosts();renderStories();notify(b?"تم إلغاء الحظر":"تم حظر الحساب")};
  if($("#profileMessage"))$("#profileMessage").onclick=()=>openChat("person_"+p.id,p);
  if($("#profilePrivacyBtn"))$("#profilePrivacyBtn").onclick=()=>profilePrivacyView(p);
  if($("#profileEditBtn"))$("#profileEditBtn").onclick=editProfileView;
  $$(".profile-tabs [data-profile-tab]").forEach(b=>b.onclick=()=>{$$(".profile-tabs [data-profile-tab]").forEach(x=>x.classList.toggle("active",x===b));const c=$("#profileTabContent");if(!c)return;if(b.dataset.profileTab==="posts")c.innerHTML=postsHtml;else if(b.dataset.profileTab==="photos")c.innerHTML=photosHtml;else c.innerHTML=privacy.badges?'<div class="profile-badges"><div>★ سيد الملاحة</div><div>✓ الإسعافات الأولية</div><div>◆ حامي البيئة</div></div>':'<div class="empty-state">الإنجازات مخفية.</div>'});
}
function renderStories(){
  const box=$("#storiesStrip");if(!box)return;
  const blocked=new Set(getBlockedPeople());
  const stories=socialStore("socialStories",[
    {id:"s1",name:"سارة",username:"sara",text:"تجهيزات رحلة الغد",time:"20د",createdAt:Date.now()-1200000},
    {id:"s2",name:"محمد",username:"mohamed",text:"من التدريب اليوم",time:"1س",createdAt:Date.now()-3600000},
    {id:"s3",name:"نور",username:"nour",text:"حملة التشجير",time:"2س",createdAt:Date.now()-7200000}
  ]).filter(s=>!s.personId||!blocked.has(s.personId)&&!blocked.has(SOCIAL_PEOPLE.find(p=>p.username===s.username)?.id));
  box.innerHTML='<button class="story-card own" id="storyAdd"><span class="story-ring">+</span><b>قصتك</b><small>أضف تحديثًا</small></button>'+stories.slice(0,12).map(s=>'<button class="story-card" data-story-open="'+s.id+'"><span class="story-ring">'+esc((s.name||"أ").charAt(0))+'</span><b>'+esc(s.name)+'</b><small>'+esc(s.time||"الآن")+'</small></button>').join("");
  $("#storyAdd").onclick=()=>storyComposerView();
  $$("#storiesStrip [data-story-open]").forEach(b=>b.onclick=()=>storyReaderView(stories,b.dataset.storyOpen));
}
function storyComposerView(){
  show('<div class="story-composer"><div class="social-modal-head"><div><span class="muted-label">مشاركة</span><h2>إضافة قصة</h2></div><button class="small-btn" id="storyCancel">إلغاء</button></div><label class="story-upload"><input id="storyImageFile" type="file" accept="image/*"><span>إضافة صورة للقصة</span><small>اختياري</small></label><label class="field"><span>النص</span><textarea id="storyText" rows="4" placeholder="ماذا تريد أن تشارك؟"></textarea></label><button class="wide-btn" id="publishStory">نشر القصة</button></div>');
  let image="";
  $("#storyCancel").onclick=storiesView;
  $("#storyImageFile").onchange=e=>{const f=e.target.files[0];if(f)compressAvatar(f).then(x=>{image=x;notify("تم تجهيز صورة القصة")})};
  $("#publishStory").onclick=()=>{const text=$("#storyText").value.trim();if(!text&&!image){notify("أضف نصًا أو صورة");return}const a=getAccount(),arr=socialStore("socialStories",[]);arr.unshift({id:"story"+Date.now(),name:a.name,username:a.username,text:text||"صورة جديدة",image,time:"الآن",createdAt:Date.now(),personId:"me"});socialSave("socialStories",arr);renderStories();storiesView();notify("تم نشر قصتك")};
}
function storyReaderView(stories,id){
  let i=Math.max(0,stories.findIndex(x=>x.id===id));if(i<0)i=0;
  const draw=()=>{const s=stories[i],avatar=s.image?'<img class="story-reader-image" src="'+esc(s.image)+'" alt="">':'<span class="story-reader-avatar">'+esc((s.name||"أ").charAt(0))+'</span>';show('<div class="story-reader"><div class="story-progress">'+stories.map((_,n)=>'<i class="'+(n<=i?"seen":"")+'"></i>').join("")+'</div><div class="story-reader-top"><b>'+esc(s.name)+'</b><div><button class="small-btn" id="storyPrev">‹</button><button class="small-btn" id="storyNext">›</button><button class="small-btn" id="storyClose">إغلاق</button></div></div><div class="story-reader-body">'+avatar+'<h2>'+esc(s.text||"")+'</h2><p>'+esc(s.time||"الآن")+'</p></div></div>');$("#storyClose").onclick=storiesView;$("#storyPrev").onclick=()=>{if(i>0){i--;draw()}};$("#storyNext").onclick=()=>{if(i<stories.length-1){i++;draw()}}};
  draw();
}
function storiesView(){const stories=socialStore("socialStories",[]);show('<div class="social-modal-head"><div><span class="muted-label">قصص المجتمع</span><h2>القصص</h2></div><button class="small-btn" id="addStory">قصتي</button></div><div class="story-view-grid">'+stories.slice(0,12).map(s=>'<button class="story-view-card" data-story="'+s.id+'"><span>'+esc((s.name||"أ").charAt(0))+'</span><b>'+esc(s.name)+'</b><small>'+esc(s.text||"صورة")+'</small><time>'+esc(s.time||"الآن")+'</time></button>').join("")+'</div>');$("#addStory").onclick=storyComposerView;$$("[data-story]").forEach(b=>b.onclick=()=>storyReaderView(stories,b.dataset.story))}
function renderUserPosts(){
  const wrap=$("#feed .posts");if(!wrap)return;
  $$(".user-post").forEach(e=>e.remove());
  const hidden=new Set(socialStore("hiddenPosts",[])),blocked=new Set(getBlockedPeople());
  const posts=readPosts().filter(p=>(p.status==="published"||p.authorUsername===getAccount().username)&&!hidden.has(p.id)&&!blocked.has(SOCIAL_PEOPLE.find(x=>x.username===p.authorUsername)?.id));
  posts.reverse().forEach(p=>wrap.prepend(postElement(p)));mountIcons();
}
function editProfileView(){
  const a=getAccount();
  show('<h2>تعديل الملف الشخصي</h2><p>الصورة يتم ضغطها تلقائيًا حتى تحفظ بشكل موثوق في المتصفح.</p><label class="avatar-upload"><input id="avatarFile" type="file" accept="image/*"><span class="account-avatar-lg" id="editAvatarPreview">'+(a.avatar?'<img src="'+esc(a.avatar)+'" alt="">':esc(a.name.charAt(0)))+'</span><b>إضافة أو تغيير الصورة الشخصية</b><small>JPG أو PNG • حجم محسن للحفظ</small></label><div class="feature-catalog"><label class="field"><span>الاسم</span><input id="accountNameInput" value="'+esc(a.name)+'"></label><label class="field"><span>اسم المستخدم</span><input id="accountUsernameInput" value="'+esc(a.username)+'"></label><label class="field"><span>النبذة</span><textarea id="accountBioInput" rows="3">'+esc(localStorage.getItem("accountBio")||"")+'</textarea></label></div><button class="wide-btn" id="saveProfile">حفظ الملف الشخصي</button>');
  let avatar=a.avatar;
  $("#avatarFile").onchange=e=>{const file=e.target.files[0];if(!file)return;compressAvatar(file).then(v=>{avatar=v;$("#editAvatarPreview").innerHTML='<img src="'+esc(v)+'" alt="">';notify("تم ضغط الصورة وتجهيزها للحفظ")}).catch(()=>notify("تعذر قراءة الصورة"))};
  $("#saveProfile").onclick=()=>{try{localStorage.setItem("accountName",$("#accountNameInput").value.trim()||"أحمد");localStorage.setItem("accountUsername",$("#accountUsernameInput").value.trim().replace(/^@/,"")||"ahmed");localStorage.setItem("accountBio",$("#accountBioInput").value.trim());if(avatar)localStorage.setItem("accountAvatar",avatar);syncAccount();closeModal();renderUserPosts();renderStories();notify("تم حفظ الملف الشخصي")}catch(e){notify("تعذر حفظ الصورة. جرّب صورة أصغر.")}};
}
/* reliable profile entry points */
document.addEventListener("click",e=>{
  const el=e.target.closest("[data-profile]");
  if(el){
    const p=personById(el.dataset.profile);
    if(p){e.preventDefault();e.stopPropagation();socialProfileView(p);return}
  }
  const head=e.target.closest(".post-head");
  if(head && !e.target.closest(".user-post-menu")){
    const post=head.closest(".post"), name=(head.querySelector("b")?.textContent||"").split(" • ")[0].trim();
    const p=SOCIAL_PEOPLE.find(x=>x.name===name);
    if(p){e.preventDefault();e.stopPropagation();socialProfileView(p);return}
  }
});
