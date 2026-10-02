const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

const themeBtn=$("#themeBtn");
const menu=$("#mobileMenu");
const overlay=$("#overlay");
const toast=$("#toast");

if(localStorage.getItem("kashaf-theme")==="dark"){
  document.body.classList.add("dark");
  themeBtn.textContent="☀";
}
themeBtn.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  const dark=document.body.classList.contains("dark");
  localStorage.setItem("kashaf-theme",dark?"dark":"light");
  themeBtn.textContent=dark?"☀":"☾";
});

const openMenu=()=>{menu.classList.add("open");overlay.classList.add("show")};
const closeMenu=()=>{menu.classList.remove("open");overlay.classList.remove("show")};
$("#menuBtn").addEventListener("click",openMenu);
$("#closeMenu").addEventListener("click",closeMenu);
overlay.addEventListener("click",closeMenu);
$$(".mobile-menu a").forEach(a=>a.addEventListener("click",closeMenu));

function showToast(message){
  toast.textContent=message;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2300);
}

const detailModal=$("#detailModal");
const detailContent=$("#detailContent");

$$(".join-btn").forEach(button=>{
  button.addEventListener("click",()=>{
    detailContent.innerHTML="<span class='kicker'>تفاصيل النشاط</span><h2>رحلة استكشافية إلى الجبل 🏕️</h2><p>نشاط ميداني يجمع بين المشي والملاحة والعمل الجماعي والتعرف على البيئة. الموعد 05 أكتوبر 2026 عند الساعة 08:00.</p><div class='camp-info' style='color:var(--muted)'><span>📍 نقطة التجمع الرئيسية</span><span>👥 32 مشاركًا</span><span>🎒 تجهيزات ميدانية</span></div><button class='btn btn-primary' id='modalJoin'>سجل مشاركتي</button>";
    detailModal.classList.add("show");
    $("#modalJoin").addEventListener("click",()=>{
      showToast("تم تسجيل مشاركتك بنجاح ✓");
      detailModal.classList.remove("show");
    });
  });
});

$(".camp-btn").addEventListener("click",()=>{
  detailContent.innerHTML="<span class='kicker'>برنامج المخيم</span><h2>المخيم الربيعي 2026 ⛺</h2><p>ثلاثة أيام من الأنشطة الكشفية والتدريب والرياضة والسمر. البرنامج التجريبي قابل للتعديل من لوحة القائد.</p><div class='dashboard-table'><div class='table-row'><span>08:00</span><span>التجمع والإفطار</span><span>اليوم الأول</span></div><div class='table-row'><span>10:00</span><span>تدريب كشفي</span><span>اليوم الأول</span></div><div class='table-row'><span>20:00</span><span>السمر الكشفي</span><span>كل ليلة</span></div></div>";
  detailModal.classList.add("show");
});

$$(".close-modal").forEach(button=>{
  button.addEventListener("click",()=>document.getElementById(button.dataset.close)?.classList.remove("show"));
});
$$(".modal,.search-modal").forEach(modal=>{
  modal.addEventListener("click",event=>{if(event.target===modal)modal.classList.remove("show")});
});

$("#searchBtn").addEventListener("click",()=>{
  $("#searchModal").classList.add("show");
  $("#searchInput").focus();
});

const searchable=[
 ["الملاحة","مهارة","🧭"],["الإسعافات الأولية","مهارة","🩹"],["التخييم والنار","مهارة","🔥"],
 ["العقد والحبال","مهارة","🪢"],["حامي البيئة","شارة","🌳"],["رحلة استكشافية إلى الجبل","نشاط","🏕️"],
 ["حملة نظافة وتشجير","نشاط","❤️"],["دليل الكشاف الميداني","مكتبة","📘"],["المخيم الربيعي 2026","مخيم","⛺"],
 ["انطلاق الموسم الكشفي الجديد","خبر","📰"]
];

$("#searchInput").addEventListener("input",event=>{
  const query=event.target.value.trim().toLowerCase();
  const box=$("#searchResults");
  if(!query){box.innerHTML="<p style='color:var(--muted);font-size:12px'>ابدأ بكتابة كلمة للبحث...</p>";return}
  const results=searchable.filter(item=>item[0].toLowerCase().includes(query));
  box.innerHTML=results.length
    ?results.map(item=>"<div class='result'><b>"+item[2]+" "+item[0]+"</b><small>"+item[1]+"</small></div>").join("")
    :"<p style='color:var(--muted);font-size:12px'>لا توجد نتائج مطابقة.</p>";
});

$("#profileBtn").addEventListener("click",()=>{
  detailContent.innerHTML="<span class='kicker'>ملف الكشاف</span><h2>أحمد محمد 👋</h2><p>كشاف متقدم — المستوى الرابع</p><div class='dash-stats'><div><b>2,450</b><span>نقطة</span></div><div><b>14</b><span>شارة</span></div><div><b>42</b><span>نشاطًا</span></div><div><b>82%</b><span>التقدم</span></div></div><h3>آخر الإنجازات</h3><p>🏅 شارة الملاحة • 🩹 شارة الإسعافات • 🏕️ شارك في 8 مخيمات</p>";
  detailModal.classList.add("show");
});

$("#leaderBtn").addEventListener("click",()=>$("#leaderModal").classList.add("show"));
$("#addActivityBtn").addEventListener("click",()=>showToast("واجهة إضافة النشاط جاهزة للربط بقاعدة البيانات"));
$("#tourBtn").addEventListener("click",()=>{
  $("#skills").scrollIntoView({behavior:"smooth"});
  showToast("أهلًا بك في رحلتك الكشفية 🧭");
});

$$(".badge-card").forEach(card=>card.addEventListener("click",()=>{
  showToast(card.classList.contains("earned")?"هذه الشارة مكتملة ✓":"أكمل المهام المطلوبة لفتح الشارة 🔒");
}));

$$(".gallery-item").forEach(item=>item.addEventListener("click",()=>showToast("معرض الصور جاهز لإضافة صور الأنشطة")));
$$(".library-grid article").forEach(item=>item.addEventListener("click",()=>showToast("هذا ملف تجريبي ويمكن ربطه بملف PDF حقيقي")));

const links=$$(".desktop-nav a");
const sections=["home","activities","skills","badges","camps","library"];
window.addEventListener("scroll",()=>{
  let current="home";
  sections.forEach(id=>{
    const section=$("#"+id);
    if(section && scrollY>=section.offsetTop-140)current=id;
  });
  links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
});
/* Mobile app-like section navigation */
const mobileSectionIds=["home","activities","skills","badges","camps","library"];
const mobileNav=$$(".bottom-nav a");

function setMobileSection(id){
  if(!mobileSectionIds.includes(id)) id="home";
  if(window.innerWidth<=650){
    document.querySelector("main").classList.add("mobile-sections");
    document.querySelector("main").classList.toggle("mobile-home",id==="home");
    $$("#"+id).forEach(el=>el.classList.add("mobile-active"));
    mobileSectionIds.filter(x=>x!==id).forEach(x=>{
      const el=$("#"+x);
      if(el) el.classList.remove("mobile-active");
    });
    mobileNav.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+id));
    window.scrollTo({top:0,behavior:"smooth"});
  }else{
    document.querySelector("main").classList.remove("mobile-sections","mobile-home");
    mobileSectionIds.forEach(x=>{
      const el=$("#"+x);
      if(el) el.classList.remove("mobile-active");
    });
  }
}

function syncMobileSection(){
  const id=(location.hash||"#home").slice(1);
  setMobileSection(mobileSectionIds.includes(id)?id:"home");
}
mobileNav.forEach(a=>a.addEventListener("click",e=>{
  if(window.innerWidth<=650){
    e.preventDefault();
    const id=a.getAttribute("href").slice(1);
    history.pushState(null,"","#"+id);
    setMobileSection(id);
  }
}));
window.addEventListener("hashchange",syncMobileSection);
window.addEventListener("resize",syncMobileSection);
syncMobileSection();
