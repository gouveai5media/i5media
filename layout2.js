const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer=new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el)=>observer.observe(el));

const art=document.querySelector('[data-parallax-root]');
if(art&&!reduceMotion&&window.innerWidth>900){
  art.addEventListener('pointermove',(e)=>{
    const r=art.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    art.querySelectorAll('[data-depth]').forEach((el)=>{
      const depth=Number(el.dataset.depth||1);
      const tx=x*12*depth;
      const ty=y*12*depth;
      const rot=x*1.8*depth;
      if(el.classList.contains('visual-card')){
        el.style.transform=`translate3d(${tx}px,${ty}px,0) rotate(${2.5+rot}deg)`;
      }else{
        el.style.marginLeft=`${tx}px`;
        el.style.marginTop=`${ty}px`;
      }
    });
  });
  art.addEventListener('pointerleave',()=>{
    art.querySelectorAll('[data-depth]').forEach((el)=>{
      el.style.marginLeft='';
      el.style.marginTop='';
      if(el.classList.contains('visual-card'))el.style.transform='rotate(2.5deg)';
    });
  });
}

const counters=document.querySelectorAll('[data-counter]');
const counterObserver=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(!entry.isIntersecting)return;
    const el=entry.target;
    const target=Number(el.dataset.counter||0);
    const start=performance.now();
    const duration=1000;
    function tick(now){
      const p=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=Math.floor(target*eased);
      if(p<1)requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
},{threshold:.6});
counters.forEach((el)=>counterObserver.observe(el));

if(!reduceMotion){
  const cards=document.querySelectorAll('.performance-card,.project-card');
  cards.forEach((card)=>{
    card.addEventListener('pointermove',(e)=>{
      if(window.innerWidth<900)return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${-y*2.2}deg) rotateY(${x*2.2}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}
