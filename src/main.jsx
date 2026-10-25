import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ShieldCheck, Trophy, CalendarDays, Images, Users, Phone, MessageCircle, Instagram, MapPin, LockKeyhole, Wifi, Signal, BatteryFull, Camera, Volume2, VolumeX, ChevronUp, ArrowRight, ArrowLeft, X, Home, Goal, Dumbbell, Star, Play, SkipForward, Music2} from 'lucide-react';
import './style.css';

// غيّر البيانات هنا فقط عند الحاجة.
const CONFIG = {
  whatsapp: '966566144141',
  instagram: '',
  maps: '',
  registrationUrl: '',
  price: '200 ريال / شهر',
  schedule: [
    {ar: 'السبت', en: 'Saturday'},
    {ar: 'الاثنين', en: 'Monday'},
    {ar: 'الأربعاء', en: 'Wednesday'},
  ],
};
const COPY = {
  ar: {
    intro:'هنا يبدأ الأبطال', start:'ابدأ التجربة مع الصوت', silent:'الدخول بدون صوت', skip:'تخطي المقدمة', sound:'الصوت',
    academy:'الأكاديمية', programs:'البرامج', schedule:'المواعيد', gallery:'الصور', register:'التسجيل', contact:'تواصل معنا',
    welcome:'مرحبًا بك في عالم فيوري', hint:'اسحب للأعلى أو اضغط لفتح القفل', tagline:'اصنع مستقبلك في الملعب',
    about:'بيئة رياضية لتطوير المهارات الأساسية والعمل الجماعي والانضباط والشغف بكرة القدم.',
    core:'المهارات الأساسية', coreDesc:'التحكم بالكرة، التمرير، التسديد والمراوغة.',
    fitness:'اللياقة والتطوير', fitnessDesc:'تمارين مناسبة للأعمار والقدرات البدنية.',
    team:'اللعب الجماعي', teamDesc:'مباريات تطبيقية، روح الفريق والانضباط.',
    age:'الفئات العمرية تحدد حسب أعمار اللاعبين المسجلين.', days:'أيام تدريب أسبوعيًا', minutes:'دقيقة لكل حصة',
    proposed:'الجدول قابل للتحديث، يرجى التأكد من الإدارة.', membership:'الاشتراك الشهري',
    galleryNote:'أضف صور الأكاديمية داخل مجلد public/gallery وعدّل المسارات في الكود.',
    join:'انضم إلى فيوري', joinDesc:'ابدأ رحلتك الكروية معنا.', registerNow:'ابدأ التسجيل',
    whatsapp:'واتساب', instagram:'إنستغرام', maps:'موقعنا على الخرائط', location:'جدة، المملكة العربية السعودية',
    missing:'الرابط غير مضاف بعد؛ عدّله في CONFIG.', home:'الشاشة الرئيسية', back:'رجوع', close:'إغلاق',
    foot:'أكاديمية فيوري لكرة القدم · تصميم قابل للتخصيص', stadium:'صوت الجماهير وصفارة البداية',
  },
  en: {
    intro:'Where champions begin', start:'Start with sound', silent:'Enter without sound', skip:'Skip intro', sound:'Sound',
    academy:'Academy', programs:'Programs', schedule:'Schedule', gallery:'Gallery', register:'Registration', contact:'Contact',
    welcome:'Welcome to the Fury world', hint:'Swipe up or tap to unlock', tagline:'Build your future on the pitch',
    about:'A football environment for core skills, teamwork, discipline and passion.',
    core:'Core skills', coreDesc:'Ball control, passing, shooting and dribbling.',
    fitness:'Fitness and development', fitnessDesc:'Age-appropriate fitness and physical development.',
    team:'Team play', teamDesc:'Practice matches, teamwork and discipline.',
    age:'Age groups are determined by registered players’ ages.', days:'Training days each week', minutes:'Minutes per session',
    proposed:'Schedule may change. Please confirm with management.', membership:'Monthly membership',
    galleryNote:'Add academy photos to public/gallery and update their paths in the code.',
    join:'Join Fury', joinDesc:'Start your football journey with us.', registerNow:'Register now',
    whatsapp:'WhatsApp', instagram:'Instagram', maps:'Find us on maps', location:'Jeddah, Saudi Arabia',
    missing:'Link not configured yet; update CONFIG.', home:'Home screen', back:'Back', close:'Close',
    foot:'Fury Football Academy · Customizable website', stadium:'Crowd sound and kickoff whistle',
  }
};
const APPS = [
  {id:'academy', Icon:ShieldCheck, color:'gold'}, {id:'programs', Icon:Trophy, color:'red'},
  {id:'schedule', Icon:CalendarDays, color:'white'}, {id:'gallery', Icon:Images, color:'purple'},
  {id:'register', Icon:Users, color:'teal'}, {id:'contact', Icon:Phone, color:'green'},
];

// المؤثرات مصنوعة داخل المتصفح. ملف crowd.mp3 اختياري للصوت الواقعي للجماهير.
function useFuryAudio(){
  const context = useRef(null);
  const enabled = useRef(false);
  const crowd = useRef(null);
  const getContext = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!context.current) context.current = new AudioContextClass();
    if (context.current.state === 'suspended') context.current.resume().catch(()=>{});
    return context.current;
  };
  const tone = (frequency=440, duration=.12, type='sine', volume=.07, endFrequency=null, delay=0) => {
    if (!enabled.current) return;
    const ctx = getContext(); if(!ctx) return;
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency,start);
    if(endFrequency) osc.frequency.exponentialRampToValueAtTime(Math.max(1,endFrequency),start+duration);
    gain.gain.setValueAtTime(.0001,start);
    gain.gain.exponentialRampToValueAtTime(volume,start+.012);
    gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start); osc.stop(start+duration+.02);
  };
  const play = (name) => {
    if (!enabled.current) return;
    if(name==='tap') tone(710,.075,'sine',.045,480);
    if(name==='unlock'){tone(390,.14,'sine',.07,600);tone(750,.22,'sine',.065,1080,.12);}
    if(name==='whistle'){
      tone(2050,.62,'sine',.10,2350,.02);
      tone(2200,.48,'sine',.055,2000,.15);
    }
    if(name==='intro'){
      tone(110,.7,'sawtooth',.065,80);
      tone(165,.75,'triangle',.055,220,.28);
      tone(330,.8,'sine',.07,660,.65);
      setTimeout(()=>{if(enabled.current)play('whistle')},1000);
    }
  };
  const startCrowd = (base) => {
    if (!enabled.current || crowd.current) return;
    const audio = new Audio(`${base}crowd.mp3`);
    audio.loop = true; audio.volume = .27;
    audio.play().then(()=>{crowd.current=audio}).catch(()=>{});
  };
  const stopCrowd = () => {if(crowd.current){crowd.current.pause();crowd.current.currentTime=0;crowd.current=null;}};
  const enable = () => {enabled.current=true;getContext();};
  const disable = () => {enabled.current=false;stopCrowd();};
  useEffect(()=>()=>{stopCrowd();context.current?.close().catch(()=>{});},[]);
  return {enable,disable,play,startCrowd,stopCrowd};
}

function App(){
  const [lang,setLang] = useState(()=>{try{return localStorage.getItem('fury-lang')||'ar'}catch{return 'ar'}});
  const [intro,setIntro] = useState(true);
  const [soundOn,setSoundOn] = useState(false);
  const [unlocked,setUnlocked] = useState(false);
  const [active,setActive] = useState(null);
  const [now,setNow] = useState(new Date());
  const [toast,setToast] = useState('');
  const audio = useFuryAudio();
  const touchStart = useRef(null);
  const t = COPY[lang];
  const logo = `${import.meta.env.BASE_URL}fury-logo.png`;
  const base = import.meta.env.BASE_URL;
  const clock = now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
  const date = now.toLocaleDateString(lang==='ar'?'ar-SA':'en-US',{weekday:'long',day:'numeric',month:'long'});
  useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';try{localStorage.setItem('fury-lang',lang)}catch{}},[lang]);
  useEffect(()=>{const id=setInterval(()=>setNow(new Date()),15000);return()=>clearInterval(id)},[]);
  useEffect(()=>{if(!toast)return;const id=setTimeout(()=>setToast(''),3000);return()=>clearTimeout(id)},[toast]);
  useEffect(()=>{const handle=e=>{if(e.key==='Escape')setActive(null);if(e.key==='Enter'&&!intro&&!unlocked)setUnlocked(true)};window.addEventListener('keydown',handle);return()=>window.removeEventListener('keydown',handle)},[intro,unlocked]);
  const begin = (withSound) => {
    if(withSound){audio.enable();audio.play('intro');audio.startCrowd(base);setSoundOn(true)}
    setIntro(false);
  };
  const toggleSound = () => {if(soundOn){audio.disable();setSoundOn(false)}else{audio.enable();audio.play('tap');setSoundOn(true)}};
  const unlock = () => {if(!unlocked){audio.play('unlock');setUnlocked(true)}};
  const openApp = id => {audio.play('tap');setActive(id)};
  const closeApp = () => {audio.play('tap');setActive(null)};
  const openLink = (url) => {audio.play('tap');if(url)window.open(url,'_blank','noopener,noreferrer');else setToast(t.missing)};
  const whatsapp = () => openLink(CONFIG.whatsapp?`https://wa.me/${CONFIG.whatsapp}`:'');
  const pages = {
    academy:<><div className="pageHero"><img src={logo} alt="Fury logo"/><h2>FURY ACADEMY</h2><p>{t.tagline}</p></div><p>{t.about}</p><div className="stats"><div><strong>3</strong><span>{t.days}</span></div><div><strong>120</strong><span>{t.minutes}</span></div></div></>,
    programs:<><h2>{t.programs}</h2>{[[Goal,t.core,t.coreDesc],[Dumbbell,t.fitness,t.fitnessDesc],[Trophy,t.team,t.teamDesc]].map(([Icon,title,desc])=><div className="feature" key={title}><Icon/><div><strong>{title}</strong><p>{desc}</p></div></div>)}<p className="muted">{t.age}</p></>,
    schedule:<><h2>{t.schedule}</h2><p className="muted">{t.proposed}</p>{CONFIG.schedule.map(day=><div className="scheduleRow" key={day.en}><span>{day[lang]}</span><b>{lang==='ar'?'5:00 – 7:00 مساءً':'5:00 – 7:00 PM'}</b></div>)}<div className="price"><span>{t.membership}</span><strong>{lang==='ar'?CONFIG.price:'SAR 200 / month'}</strong></div></>,
    gallery:<><h2>{t.gallery}</h2><p>{t.galleryNote}</p><div className="Array.from({ length: 12 }, (_, i) => `${import.meta.env.BASE_URL}gallery/photo${i + 1}.jpg`)">{['⚽','🏆','🥅','👟']..map((src,i)=><div key={i}><img src={src} alt={`FURY Academy ${i+1}`} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'12px'}} /></div>)}</div></>,
    register:<><h2>{t.join}</h2><p>{t.joinDesc}</p><div className="registerCard"><Users size={48}/><h3>{t.tagline}</h3><button className="primary" onClick={()=>CONFIG.registrationUrl?openLink(CONFIG.registrationUrl):whatsapp()}>{t.registerNow}</button></div></>,
    contact:<><h2>{t.contact}</h2><button className="contactRow" onClick={whatsapp}><MessageCircle/>{t.whatsapp}</button><button className="contactRow" onClick={()=>openLink(CONFIG.instagram)}><Instagram/>{t.instagram}</button><button className="contactRow" onClick={()=>openLink(CONFIG.maps)}><MapPin/>{t.maps}</button><p className="muted">{t.location}</p></>,
  };
  return <main className="site" dir={lang==='ar'?'rtl':'ltr'}>
    <div className="ambient one"/><div className="ambient two"/>
    <div className="topControls"><button className="languageSwitch" onClick={()=>setLang(v=>v==='ar'?'en':'ar')}>{lang==='ar'?'English | EN':'العربية | AR'}</button><button className="soundToggle" onClick={toggleSound} aria-label={t.sound}>{soundOn?<Volume2 size={18}/>:<VolumeX size={18}/>}</button></div>
    {intro&&<div className="cinematicIntro" role="dialog" aria-modal="true" aria-label="Fury intro"><div className="spotlight left"/><div className="spotlight right"/><div className="smoke smoke1"/><div className="smoke smoke2"/><div className="smoke smoke3"/><div className="introCenter"><div className="logoHalo"/><img className="cinematicLogo" src={logo} alt="Fury Academy"/><h1>FURY <span>ACADEMY</span></h1><p>{t.intro}</p><small>{t.stadium}</small><div className="introButtons"><button className="primary" onClick={()=>begin(true)}><Play size={17}/>{t.start}</button><button className="secondary" onClick={()=>begin(false)}><VolumeX size={17}/>{t.silent}</button></div><button className="skip" onClick={()=>begin(false)}>{t.skip}<SkipForward size={15}/></button></div></div>}
    <section className="brandPanel"><img src={logo} className="brandLogo" alt="Fury Academy"/><div className="eyebrow">WELCOME TO THE NEXT LEVEL</div><h1>FURY <em>ACADEMY</em></h1><p>{t.tagline}</p><span className="hint">{t.welcome}</span></section>
    <div className="phone"><div className="screen" onTouchStart={e=>touchStart.current=e.touches[0].clientY} onTouchEnd={e=>{if(touchStart.current!==null&&touchStart.current-e.changedTouches[0].clientY>45)unlock();touchStart.current=null}}><div className="wallpaper"/><div className="status"><span>{clock}</span><div className="island"/><div className="indicators"><Signal size={14}/><Wifi size={15}/><BatteryFull size={20}/></div></div>
    {!unlocked?<div className="lockscreen" onClick={unlock} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter')unlock()}}><LockKeyhole size={20}/><div className="bigtime">{clock}</div><div className="date">{date}</div><div className="lockBrand"><div className="lockGlow"/><img src={logo} alt="Fury Academy logo"/><h2>FURY ACADEMY</h2><p>RISE. TRAIN. CONQUER.</p></div><div className="unlock"><ChevronUp size={22}/>{t.hint}</div><div className="lockActions"><Camera size={20}/><Volume2 size={20}/></div></div>:<><div className="homescreen"><div className="welcome"><span>{t.welcome}</span><h2>FURY ACADEMY <Star size={17}/></h2><p>{t.intro}</p></div><div className="appgrid">{APPS.map(({id,Icon,color})=><button className="appIcon" key={id} onClick={()=>openApp(id)}><span className={`tile ${color}`}><Icon size={29}/></span><span>{t[id]}</span></button>)}</div><div className="dock"><button onClick={()=>openApp('academy')}><Home/></button><button onClick={()=>openApp('register')}><Users/></button><button onClick={()=>openApp('schedule')}><CalendarDays/></button><button onClick={()=>openApp('contact')}><Phone/></button></div></div>{active&&<div className="appwindow" key={active}><header><button onClick={closeApp} aria-label={t.back}>{lang==='ar'?<ArrowRight/>:<ArrowLeft/>}</button><strong>{t[active]}</strong><button onClick={closeApp} aria-label={t.close}><X/></button></header><div className="appbody">{pages[active]}</div></div>}</>}
    <button className="homebar" onClick={()=>unlocked?closeApp():unlock()} aria-label={t.home}/>{toast&&<div className="toast">{toast}</div>}</div><div className="sidebutton side1"/><div className="sidebutton side2"/></div>
    <footer>© {now.getFullYear()} {t.foot}</footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App/>);