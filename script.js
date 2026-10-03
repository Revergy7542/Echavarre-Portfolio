const $=s=>document.querySelector(s);
const P=[
{t:"JobSync",c:"Website",e:"💼",g:["#f8f9f9","#15bc26"],d:"Real-time dashboard for open jobs.",l:"streamlines recruitment by automating applicant screening, ranking candidates based on qualifications, and helping HR officers identify suitable applicants efficiently",s:["React","Tailwind CSS","Supabase/PostgreSQL"]},
{t:"Vendor Data Management",c:"Automation",e:"📇",g:["#ebedf1","#0b08be"],d:"An Automation for data vendor entry",l:"Automation is a system that streamlines vendor information, document tracking, reconciliation, and data management using digital tools to improve accuracy and efficiency.",s:["Power Automate","Power Pages","Power Apps"]},
{t:"Restaurant Reservation",c:"Website",e:"🍽️",g:["#000000","#f94f00"],d:"Restaurant Reservation Website.",l:"Allows users to browse restaurants, check available schedules, select a date and time, and make or manage table reservations online.",s:["JavaScript","SQL","Python"]},];
// Edit this list with your own certificates
const CERTS = [
  { t: "Exploring Internet of Things", i: "Cisco Packet Tracer", d: "2024", e: "🌐"},
  { t: "Exploring Internet Networking", i: "Cisco Packet Tracer", d: "2024", e: "🖧", link: "" },
  { t: "HABI – Huddle, Analyze, Build, Innovate Workshop. A design thinking activity.", i: "National Innovation Day (FLIP 2025)", d: "Certificate of Presentation 2025", e: "🎓"},
  { t: "BINHI 2026: 5th Research Colloquium for Information Technology Education ", i: "Davao Del Norte State College", d: "Certificate of Presentation 2026", e: "🎓"}
];
$("#certs").innerHTML = CERTS.map(c => `
  <${c.link ? 'a href="' + c.link + '" target="_blank" rel="noopener"' : 'div'} class="cert">
    <div class="cert-ico">${c.e}</div>
    <div class="cert-body">
      <h3>${c.t}</h3>
      <p>${c.i} · ${c.d}</p>
      ${c.link ? '<span class="cert-link">View credential ↗</span>' : ''}
    </div>
  </${c.link ? 'a' : 'div'}>`).join("");
const SK=[["HTML5",100],["Data Entry & Encoding",100],["CSS3",88],["JavaScript",90],["Attention to Detail",95],["Fast Learner",100]];
// theme
const root=document.documentElement;
$("#theme").onclick=()=>{const dark=getComputedStyle(root).getPropertyValue("--bg").trim()==="#0e0f14";root.dataset.theme=dark?"light":"dark";try{localStorage.setItem("th",root.dataset.theme)}catch(e){}};
try{const t=localStorage.getItem("th");if(t)root.dataset.theme=t}catch(e){}
// typing
const words=["beautiful interfaces","AI-powered tools"];
let wi=0,ci=0,del=false;
(function tick(){const w=words[wi];ci+=del?-1:1;$("#type").textContent=w.slice(0,ci);
let d=del?35:75;if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=400}setTimeout(tick,d)})();
// skills
$("#skills").innerHTML=SK.map(([n,v])=>`<div class="sk"><div class="row"><span>${n}</span><span>${v}%</span></div><div class="bar"><i data-w="${v}"></i></div></div>`).join("");
// projects
const cats=["All",...new Set(P.map(p=>p.c))];
$("#filters").innerHTML=cats.map((c,i)=>`<button class="chip${i?"":" on"}" data-c="${c}">${c}</button>`).join("");
$("#grid").innerHTML=P.map((p,i)=>`<button class="card" data-i="${i}" data-c="${p.c}"><div class="thumb" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})">${p.e}</div><div class="in"><h3>${p.t}</h3><p>${p.d}</p><div class="tags">${p.s.map(x=>`<span>${x}</span>`).join("")}</div></div></button>`).join("");
$("#filters").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("on",x===b));
document.querySelectorAll(".card").forEach(c=>c.classList.toggle("hide",b.dataset.c!=="All"&&c.dataset.c!==b.dataset.c))};
const modal=$("#modal");
$("#grid").onclick=e=>{const c=e.target.closest(".card");if(!c)return;const p=P[c.dataset.i];
$("#box").innerHTML=`<div class="thumb" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})">${p.e}</div><div class="in"><h3 style="margin:0 0 8px;font-size:22px">${p.t}</h3><p style="color:var(--mute)">${p.l}</p><div class="tags">${p.s.map(x=>`<span>${x}</span>`).join("")}</div><div class="cta"><a class="btn pri" href="#contact" id="mc">Hire me for similar →</a><button class="btn sec" id="cl">Close</button></div></div>`;
modal.classList.add("open");$("#cl").onclick=$("#mc").onclick=()=>modal.classList.remove("open")};
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};
// toast
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("show");clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove("show"),2200)}
// copy
document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(b.dataset.copy);toast("Copied ✓")}catch(e){toast(b.dataset.copy)}});
// form -> mailto
$("#form").onsubmit=e=>{e.preventDefault();const s=encodeURIComponent("Portfolio inquiry from "+$("#fn").value);
const b=encodeURIComponent($("#fm").value+"\n\n— "+$("#fn").value+" ("+$("#fe").value+")");
location.href=`mailto:alex@example.com?subject=${s}&body=${b}`;toast("Opening your email app…")};
//resume download
$("#resume").onclick = () => { const a = document.createElement("a");a.href = "Echavarre_Resume_PFP.pdf";a.download = "Echavarre_Resume_PFP.pdf";
document.body.appendChild(a);a.click();a.remove();toast("Résumé downloaded ✓");};
// reveal, bars, counters, progress
const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");x.target.querySelectorAll("[data-w]").forEach(i=>i.style.width=i.dataset.w+"%")}}),{threshold:.15});
document.querySelectorAll(".rv").forEach(e=>io.observe(e));
document.querySelectorAll("[data-n]").forEach(el=>{const n=+el.dataset.n;let v=0;const s=setInterval(()=>{v+=Math.ceil(n/30);if(v>=n){v=n;clearInterval(s)}el.textContent=v+"+"},45)});
addEventListener("scroll",()=>{const h=document.documentElement;$("#prog").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+"%"});
// shortcuts
addEventListener("keydown",e=>{if(/INPUT|TEXTAREA/.test(e.target.tagName))return;
if(e.key==="Escape")modal.classList.remove("open");
if(e.key==="p"||e.key==="P")location.hash="#projects";if(e.key==="c"||e.key==="C")location.hash="#contact"});