const people=[
{name:"ليونيل ميسي",birth:"24 يونيو 1987",country:"الأرجنتين",emoji:"⚽",category:"رياضة",role:"لاعب كرة قدم"},
{name:"كريستيانو رونالدو",birth:"5 فبراير 1985",country:"البرتغال",emoji:"⚽",category:"رياضة",role:"لاعب كرة قدم"},
{name:"تايلور سويفت",birth:"13 ديسمبر 1989",country:"الولايات المتحدة",emoji:"🎤",category:"فن",role:"مغنية وكاتبة أغاني"},
{name:"جيمس كاميرون",birth:"16 أغسطس 1954",country:"كندا",emoji:"🎬",category:"فن",role:"مخرج وكاتب"},
{name:"ألبرت أينشتاين",birth:"14 مارس 1879",country:"ألمانيا",emoji:"🧠",category:"علوم",role:"عالم فيزياء"},
{name:"ماري كوري",birth:"7 نوفمبر 1867",country:"بولندا",emoji:"🔬",category:"علوم",role:"عالمة فيزياء وكيمياء"},
{name:"إيلون ماسك",birth:"28 يونيو 1971",country:"جنوب أفريقيا",emoji:"🚀",category:"علوم",role:"رائد أعمال ومهندس"},
{name:"مستر بيست",birth:"7 مايو 1998",country:"الولايات المتحدة",emoji:"📹",category:"ترفيه",role:"صانع محتوى"},
{name:"ذا روك",birth:"2 مايو 1972",country:"الولايات المتحدة",emoji:"🎭",category:"ترفيه",role:"ممثل ومصارع سابق"},
{name:"كيانو ريفز",birth:"2 سبتمبر 1964",country:"كندا",emoji:"🎬",category:"فن",role:"ممثل"},
{name:"ستيف جوبز",birth:"24 فبراير 1955",country:"الولايات المتحدة",emoji:"💻",category:"علوم",role:"رائد أعمال"},
{name:"بيونسيه",birth:"4 سبتمبر 1981",country:"الولايات المتحدة",emoji:"🎤",category:"فن",role:"مغنية ومؤدية"}
];
let active="all";
const grid=document.getElementById("grid"), search=document.getElementById("search"), count=document.getElementById("count"), empty=document.getElementById("empty");
function age(birth){const [d,m,y]=birth.match(/\d+/g).map(Number);const now=new Date();let a=now.getFullYear()-y;if(now.getMonth()+1<m||(now.getMonth()+1===m&&now.getDate()<d))a--;return a}
function render(){const q=search.value.trim().toLowerCase();const list=people.filter(p=>(active==="all"||p.category===active)&&(!q||(p.name+" "+p.country+" "+p.role).toLowerCase().includes(q)));count.textContent=list.length+" شخصية";empty.style.display=list.length?"none":"block";grid.innerHTML=list.map(p=>`<article class="person"><div class="photo"><span class="category">${p.category}</span>${p.emoji}</div><div class="info"><h3>${p.name}</h3><span class="role">${p.role}</span><div class="facts"><div class="fact"><small>تاريخ الميلاد</small><b>${p.birth}</b></div><div class="fact"><small>العمر</small><b>${age(p.birth)} سنة</b></div><div class="fact"><small>الدولة</small><b>${p.country}</b></div><div class="fact"><small>المجال</small><b>${p.category}</b></div></div></div></article>`).join("")}
document.getElementById("filters").addEventListener("click",e=>{if(e.target.tagName!=="BUTTON")return;document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active"));e.target.classList.add("active");active=e.target.dataset.filter;render()});
search.addEventListener("input",render);
document.getElementById("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("dark");document.getElementById("themeBtn").textContent=document.body.classList.contains("dark")?"☀":"☾"});
render();