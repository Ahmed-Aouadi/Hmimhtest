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
  show('<div class="account-head"><div class="account-avatar-lg" id="accountAvatarPreview">'+(a.avatar?'<img src="'+a.avatar+'" alt="">':esc((a.name||"أ").charAt(0)))+'</div><div><h2>حسابي</h2><p>@'+esc(a.username)+' • '+esc(a.role)+' • مستوى '+esc(a.level)+'</p></div></div><div class="feature-catalog account-menu"><button class="catalog-item" id="editProfileBtn"><b>الملف الشخصي</b><small>الصورة، الاسم واسم المستخدم</small></button><button class="catalog-item" id="myPostsBtn"><b>منشوراتي</b><small>تعديل وحذف المنشورات التي أنشأتها</small></button><button class="catalog-item" id="savedPostsBtn"><b>المنشورات المحفوظة</b><small>المنشورات التي حفظتها</small></button><button class="catalog-item" id="publishingBtn"><b>إعدادات النشر</b><small>موافقة الإدارة أو النشر التلقائي</small></button>'+(a.isAdmin?'<button class="catalog-item admin-card" id="adminBtn"><b>لوحة إدارة المنشورات</b><small>مراجعة، إخفاء، تثبيت وحذف</small></button>':'')+'<button class="catalog-item" id="accountSettings2"><b>الإعدادات العامة</b><small>الإشعارات والخصوصية</small></button></div>');
  $("#editProfileBtn").onclick=editProfileView;$("#myPostsBtn").onclick=myPostsView;$("#savedPostsBtn").onclick=savedPostsView;$("#publishingBtn").onclick=publishingView;
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
  art.innerHTML='<div class="post-head"><span class="post-avatar">'+(p.avatar?'<img src="'+p.avatar+'" alt="">':esc(p.authorName.charAt(0)))+'</span><div><b>'+esc(p.authorName)+(p.role?' • '+esc(p.role):"")+'</b><small>'+formatDate(p.createdAt)+' • '+status+'</small></div><button class="more user-post-menu" data-post-menu="'+p.id+'" data-own="'+own+'" aria-label="خيارات">•••</button></div><p>'+esc(p.text||"").replace(/\n/g,"<br>")+'</p>'+(p.image?'<img class="post-photo" src="'+p.image+'" alt="صورة المنشور">':"")+'<div class="post-actions"><button data-action="like" data-icon="heart">'+(p.likes||0)+'</button><button data-action="comments" data-icon="comment">'+(p.comments||0)+'</button><button data-action="share" data-icon="share">مشاركة</button><button data-action="save" data-icon="badge">حفظ</button></div><div class="comments-preview"><b>التعليقات</b><button class="comment-link" data-comments="'+p.id+'">عرض التعليقات والرد</button></div>';
  if(getSavedPostIds().includes(p.id)){const s=art.querySelector('[data-action="save"]');if(s)s.classList.add("active")}
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
  $("#postImageFile").onchange=e=>{
    const files=[...e.target.files];
    if(!files.length)return;
    Promise.all(files.map(file=>new Promise(resolve=>{const rd=new FileReader();rd.onload=()=>resolve(rd.result);rd.readAsDataURL(file)}))).then(next=>{images=[...images,...next];renderDraftImages();e.target.value=""});
  };
  $("#savePostBtn").onclick=()=>{
    const text=$("#postText").value.trim();if(!text&&!images.length){notify("اكتب نصًا أو أضف صورة");return}
    const mode=a.isAdmin?"auto":(localStorage.getItem("publishMode")||"review");
    if(old){old.text=text;old.images=images;delete old.image;savePosts(posts);closeModal();renderUserPosts();notify("تم تعديل المنشور");return}
    const image=images[0]||"";
    const p={id:"p"+Date.now(),authorName:a.name,authorUsername:a.username,role:a.role,avatar:a.avatar,text,image,images,createdAt:Date.now(),status:mode==="auto"?"published":"pending",likes:0,comments:0,pinned:false};
    posts.push(p);savePosts(posts);closeModal();renderUserPosts();notify(p.status==="published"?"تم نشر المنشور":"تم إرسال المنشور للمراجعة");
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

function commentsView(postId){
  const demo=postId==="demo1"?[{id:"c1",name:"محمد",role:"كشاف",text:"بالتوفيق للجميع، سأكون حاضرًا.",time:"منذ 12 دقيقة",replies:[{name:"فوج الأمل",role:"قائد",text:"بانتظاركم في الموعد."}]}]:[];
  const stored=JSON.parse(localStorage.getItem("comments_"+postId)||"[]"),comments=[...demo,...stored];
  show('<div class="comments-head"><div><h2>التعليقات</h2><p>'+comments.length+' تعليق • مرتبة حسب الأحدث مع تجميع الردود.</p></div></div><div class="comments-list">'+(comments.length?comments.map(commentHtml).join(""):'<div class="empty-state">كن أول من يشارك رأيه.</div>')+'</div><div class="comment-composer"><input id="commentInput" placeholder="اكتب تعليقًا..."><button class="wide-btn" id="sendComment">إرسال</button></div>');
  $("#sendComment").onclick=()=>{const text=$("#commentInput").value.trim();if(!text)return;const a=getAccount(),list=JSON.parse(localStorage.getItem("comments_"+postId)||"[]");list.push({id:"c"+Date.now(),name:a.name,role:a.role,text,time:"الآن",replies:[]});localStorage.setItem("comments_"+postId,JSON.stringify(list));incrementPostComments(postId);commentsView(postId)};
  $(".reply-comment").forEach(b=>b.onclick=()=>commentComposerView(postId,b.dataset.commentId));
  $(".like-comment").forEach(b=>{const key="likedComment_"+postId+"_"+b.dataset.commentId;if(localStorage.getItem(key)==="1"){b.classList.add("active");b.textContent="♥ أعجبني"}b.onclick=()=>{const active=!b.classList.contains("active");b.classList.toggle("active",active);b.textContent=active?"♥ أعجبني":"♡ إعجاب";localStorage.setItem(key,active?"1":"0")}});
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
  $("#commentComposerSend").onclick=()=>{const text=$("#commentComposerText").value.trim();if(!text&&!image){notify("اكتب تعليقًا أو أضف صورة");return}const a=getAccount(),list=JSON.parse(localStorage.getItem("comments_"+postId)||"[]");if(commentId){let cm=list.find(x=>x.id===commentId);if(!cm&&postId==="demo1"&&commentId==="c1"){cm={id:"c1",name:"محمد",role:"كشاف",text:"بالتوفيق للجميع، سأكون حاضرًا.",time:"منذ 12 دقيقة",replies:[]};list.push(cm)}if(!cm)return;cm.replies=cm.replies||[];cm.replies.push({name:a.name,role:a.role,text,image})}else{list.push({id:"c"+Date.now(),name:a.name,role:a.role,text,image,time:"الآن",replies:[]});incrementPostComments(postId)}localStorage.setItem("comments_"+postId,JSON.stringify(list));closeModal();notify(commentId?"تم نشر الرد":"تم نشر التعليق");openCommunity();setTimeout(()=>openCommentsPage(postId),30)};
}
document.addEventListener("click",e=>{
  const thread=e.target.closest(".comment-thread");if(thread){openCommentsPage(thread.dataset.thread);document.querySelector("#comments")?.scrollIntoView({behavior:"smooth"});return}
  const refresh=e.target.closest("#refreshComments");if(refresh){renderCommentHub();notify("تم تحديث النقاشات");return}
  const create=e.target.closest("#createPostBtn,#createPostHint");if(create){createPostView();return}
  const comments=e.target.closest(".comment-link,[data-action='comments']");if(comments){const id=comments.dataset.comments||comments.closest(".post")?.dataset.postId;if(id){openCommentsPage(id);document.querySelector("#comments")?.scrollIntoView({behavior:"smooth"});}return}
  const menu=e.target.closest(".user-post-menu");if(menu){const id=menu.dataset.postMenu,own=menu.dataset.own==="true",a=getAccount();if(own)show('<h2>خيارات المنشور</h2><button class="catalog-item" id="editPostNow"><b>تعديل المنشور</b><small>تعديل النص أو الصورة</small></button><button class="catalog-item danger-item" id="deletePostNow"><b>حذف المنشور</b><small>حذف نهائي من حسابك</small></button>');else if(a.isAdmin)show('<h2>إدارة المنشور</h2><button class="catalog-item" id="pinPostNow"><b>تثبيت أو إلغاء التثبيت</b></button><button class="catalog-item" id="hidePostNow"><b>إخفاء المنشور</b></button><button class="catalog-item danger-item" id="deletePostNow"><b>حذف المنشور</b></button>');else return;
    const edit=$("#editPostNow"),del=$("#deletePostNow"),pin=$("#pinPostNow"),hide=$("#hidePostNow");if(edit)edit.onclick=()=>createPostView(id);if(del)del.onclick=()=>{savePosts(readPosts().filter(p=>p.id!==id));closeModal();renderUserPosts();notify("تم حذف المنشور")};if(pin)pin.onclick=()=>{const p=readPosts(),x=p.find(z=>z.id===id);if(x){x.pinned=!x.pinned;x.status="published";savePosts(p);closeModal();renderUserPosts();notify(x.pinned?"تم تثبيت المنشور":"تم إلغاء التثبيت")}};if(hide)hide.onclick=()=>{const p=readPosts(),x=p.find(z=>z.id===id);if(x){x.status="hidden";savePosts(p);closeModal();renderUserPosts();notify("تم إخفاء المنشور")}};return;
  }
  const social=e.target.closest(".post-actions button");if(social){const postId=social.closest(".post")?.dataset.postId;if(!postId)return;if(social.dataset.action==="save"){const ids=getSavedPostIds(),exists=ids.includes(postId);setSavedPostIds(exists?ids.filter(id=>id!==postId):[...ids,postId]);social.classList.toggle("active",!exists);notify(exists?"تمت إزالة المنشور من المحفوظات":"تم حفظ المنشور");return}if(social.dataset.action==="share"){const text=social.closest(".post")?.querySelector("p")?.textContent||"منشور من كشّاف";if(navigator.share){navigator.share({title:"منشور من كشّاف",text}).then(()=>notify("تمت المشاركة")).catch(()=>{})}else if(navigator.clipboard){navigator.clipboard.writeText(text).then(()=>notify("تم نسخ نص المنشور للمشاركة"))}else notify("يمكنك نسخ نص المنشور ومشاركته");return}if(social.dataset.action==="like"){social.classList.toggle("active");const label=social.querySelector(".icon-label");if(label&&/^\d+$/.test(label.textContent.trim()))label.textContent=String(Number(label.textContent.trim())+(social.classList.contains("active")?1:-1));return}}
});
$("#accountBtn").onclick=accountView;$("#profileBtn").onclick=accountView;$("#communityTopBtn").onclick=openCommunity;$("#backHomeFromCommunity").onclick=closeCommunity;$("#openCommentsHub").onclick=()=>{openCommunity();setTimeout(()=>$("#comments")?.scrollIntoView({behavior:"smooth"}),30)};
syncAccount();renderUserPosts();renderCommentHub();
