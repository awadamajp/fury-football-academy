import React, {useEffect, useState, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowRight, ArrowLeft, Wifi, BatteryFull, Signal, Camera, LockKeyhole, Trophy, Users, CalendarDays, Images, Phone, MessageCircle, Info, X, ChevronLeft, ChevronUp, Instagram, MapPin, Clock, ShieldCheck, Star, Send, Dumbbell, Goal, Settings, Home, Volume2, VolumeX} from 'lucide-react';
import './style.css';
const CONFIG = {
  academy: 'أكاديمية فيوري',
  subtitle: 'FURY FOOTBALL ACADEMY',
  city: 'جدة، المملكة العربية السعودية',
  whatsapp: '966566144141', // مثال: 966566144141 (بدون +)
  instagram: '', // رابط الحساب
  maps: '', // رابط موقع الأكاديمية على الخرائط
  registrationUrl: '', // رابط نموذج التسجيل عند توفره
  schedule: [
    {day:'السبت', time:'5:00 – 7:00 مساءً'},
    {day:'الاثنين', time:'5:00 – 7:00 مساءً'},
    {day:'الأربعاء', time:'5:00 – 7:00 مساءً'},
  ],
  price: '200 ريال / شهر', // قيمة تجريبية قابلة للتعديل
  ageGroups: 'تُحدّد حسب أعمار اللاعبين المسجلين',
};
const EN = {
 'الأكاديمية':'Academy','البرامج':'Programs','المواعيد':'Schedule','الصور':'Gallery','التسجيل':'Registration','تواصل معنا':'Contact',
 'جدة، المملكة العربية السعودية':'Jeddah, Saudi Arabia','السبت':'Saturday','الاثنين':'Monday','الأربعاء':'Wednesday',
 '5:00 – 7:00 مساءً':'5:00 – 7:00 PM','200 ريال / شهر':'SAR 200 / month',
 'تُحدّد حسب أعمار اللاعبين المسجلين':'Determined by registered players’ ages',
 'اصنع مستقبلك في الملعب':'Build your future on the pitch',
 'بيئة رياضية لتطوير المهارات الأساسية والعمل الجماعي والانضباط والشغف بكرة القدم.':'A football environment focused on core skills, teamwork, discipline, and passion.',
 'أيام تدريب أسبوعيًا':'Training days per week','دقيقة لكل حصة':'Minutes per session',
 'التفاصيل النهائية قابلة للتحديث من إدارة الأكاديمية.':'Final details are subject to confirmation by academy management.',
 'برامجنا التدريبية':'Our training programs','المهارات الأساسية':'Core skills',
 'التحكم بالكرة، التمرير، التسديد والمراوغة.':'Ball control, passing, shooting, and dribbling.',
 'اللياقة والتطوير':'Fitness and development','تمارين مناسبة للمستوى العمري والقدرات البدنية.':'Age-appropriate exercises for different fitness levels.',
 'اللعب الجماعي':'Team play','مباريات تطبيقية وروح الفريق والانضباط.':'Practice matches, teamwork, and discipline.',
 'الفئات العمرية:':'Age groups:','مواعيد التدريب':'Training schedule',
 'الجدول المقترح — يُرجى التأكد من الإدارة قبل الحضور.':'Proposed schedule — please confirm with management before attending.',
 'الاشتراك الشهري':'Monthly membership','لحظات فيوري':'Fury moments',
 'مساحة صور الأكاديمية. أضف صورك الحقيقية لاحقًا في مجلد public/gallery.':'Academy gallery. Add your real photos later in public/gallery.',
 'التدريب':'Training','الإنجازات':'Achievements','المباريات':'Matches','اللاعبون':'Players',
 'انضم إلى فيوري':'Join Fury','ابدأ رحلتك الكروية معنا. للتسجيل، تواصل مع الإدارة أو افتح نموذج التسجيل عند إضافته.':'Start your football journey with us. Contact management or use the registration form when available.',
 'جاهز تدخل الملعب؟':'Ready to take the field?','الأماكن والرسوم تخضع لتأكيد الإدارة.':'Places and fees are subject to management confirmation.',
 'ابدأ التسجيل':'Register now','خلّينا على تواصل':'Get in touch','واتساب':'WhatsApp','إنستغرام':'Instagram','الخرائط':'Maps','موقعنا':'Our location',
 'تجربة رقمية تفاعلية لأكاديمية فيوري لكرة القدم':'An interactive digital experience for Fury Football Academy',
 'افتح الجوال واستكشف عالم فيوري':'Unlock the phone and explore Fury',
 'اسحب للأعلى أو اضغط لفتح القفل':'Swipe up or tap to unlock',
 'أهلًا بك في':'Welcome to','عالم فيوري':'Fury world','هنا يبدأ الأبطال':'Where champions begin',
 'العودة للرئيسية':'Back to home','إغلاق':'Close','العودة للشاشة الرئيسية':'Return to home screen',
 'تصميم تجريبي قابل للتخصيص':'Customizable demo design',
 'رابط':'Link','غير مضاف بعد — عدّله في ملف src/main.jsx':'not added yet — update src/main.jsx'
};
const tr = (text, lang) => lang === 'en' ? (EN[text] || text) : text;
const APPS = [
  {id:'about', label:'الأكاديمية', Icon:ShieldCheck, color:'linear-gradient(135deg,#e7b64d,#8d6114)'},
  {id:'programs', label:'البرامج', Icon:Trophy, color:'linear-gradient(135deg,#fe7b4d,#b83225)'},
  {id:'schedule', label:'المواعيد', Icon:CalendarDays, color:'linear-gradient(135deg,#fff,#d9e1ec)', dark:true},
  {id:'gallery', label:'الصور', Icon:Images, color:'linear-gradient(135deg,#e1a7fa,#6c54c5)'},
  {id:'register', label:'التسجيل', Icon:Users, color:'linear-gradient(135deg,#4bc4b5,#0d7979)'},
  {id:'contact', label:'تواصل معنا', Icon:Phone, color:'linear-gradient(135deg,#71d987,#138e47)'},
];
function App(){
 const [lang,setLang]=useState(()=>{try{return localStorage.getItem('fury-lang')||'ar'}catch{return 'ar'}});
 const [introPlaying,setIntroPlaying]=useState(true);
 const [soundOn,setSoundOn]=useState(false);
 const introAudio=useRef(null);
 const toggleSound=()=>{
   const audio=introAudio.current;
   if(!audio)return;
   if(soundOn){audio.pause();setSoundOn(false)}
   else {audio.currentTime=0;audio.play().then(()=>setSoundOn(true)).catch(()=>setSoundOn(false))}
 };
 const finishIntro=()=>{introAudio.current?.pause();setSoundOn(false);setIntroPlaying(false)};

 useEffect(()=>{try{localStorage.setItem('fury-lang',lang)}catch{}},[lang]);
 const t = value => tr(value,lang);
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';try{localStorage.setItem('fury-lang',lang)}catch{}},[lang]);
 const [unlocked,setUnlocked]=useState(false), [app,setApp]=useState(null), [now,setNow]=useState(new Date()), [toast,setToast]=useState('');
 const touchStart=useRef(null);
 useEffect(()=>{const id=setInterval(()=>setNow(new Date()),15000);return ()=>clearInterval(id)},[]);
 useEffect(()=>{if(!toast)return;const id=setTimeout(()=>setToast(''),3500);return ()=>clearTimeout(id)},[toast]);
 useEffect(()=>{const fn=e=>{if(e.key==='Escape')setApp(null);if(e.key==='Enter'&&!unlocked)setUnlocked(true)};window.addEventListener('keydown',fn);return()=>window.removeEventListener('keydown',fn)},[unlocked]);
 const time=now.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
 const date=now.toLocaleDateString(lang==='ar'?'ar-SA':'en-US',{weekday:'long',day:'numeric',month:'long'});
 const openLink=(url,kind)=>{if(url)window.open(url,'_blank','noopener,noreferrer');else setToast(lang==='ar'?`رابط ${kind} غير مضاف بعد — عدّله في ملف src/main.jsx`:`${t(kind)} link is not set — update src/main.jsx`)};
 const contact=()=>openLink(CONFIG.whatsapp?`https://wa.me/${CONFIG.whatsapp}`:'','واتساب');
 function Body(){switch(app){
<img ="/furysrc-logo.png" alt="Fury Academy" /> case 'programs':return <div className="content"><h2>{t('برامجنا التدريبية')} </h2>{[{icon:Goal,title:'المهارات الأساسية',desc:'التحكم بالكرة، التمرير، التسديد والمراوغة.'},{icon:Dumbbell,title:'اللياقة والتطوير',desc:'تمارين مناسبة للمستوى العمري والقدرات البدنية.'},{icon:Trophy,title:'اللعب الجماعي',desc:'مباريات تطبيقية وروح الفريق والانضباط.'}].map(({icon:Icon,title,desc})=><div className="feature" key={t(title)}><div className="featureIcon"><Icon size={25}/></div><div><b>{t(title)}</b><p>{t(desc)}</p></div></div>)}<p className="muted">الفئات العمرية: {t(CONFIG.ageGroups)}</p></div>;
 case 'schedule':return <div className="content"><h2>{t('مواعيد التدريب')} </h2><p className="muted">{t('الجدول المقترح — يُرجى التأكد من الإدارة قبل الحضور.')} </p>{CONFIG.schedule.map(x=><div className="scheduleRow" key={t(x.day)}><span><CalendarDays size={20}/> {t(x.day)}</span><b>{t(x.time)}</b></div>)}<div className="price"><span>{t('الاشتراك الشهري')} </span><strong>{t(CONFIG.price)}</strong></div></div>;
 case 'gallery':return <div className="content"><h2>{t('لحظات فيوري')} </h2><p className="muted">{t('مساحة صور الأكاديمية. أضف صورك الحقيقية لاحقًا في مجلد public/gallery.')} </p><div className="gallery"><div>⚽<small>{t('التدريب')} </small></div><div>🏆<small>{t('الإنجازات')} </small></div><div>🥅<small>{t('المباريات')} </small></div><div>👟<small>{t('اللاعبون')} </small></div></div></div>;
 case 'register':return <div className="content"><h2>{t('انضم إلى فيوري')} </h2><p>{t('ابدأ رحلتك الكروية معنا. للتسجيل، تواصل مع الإدارة أو افتح نموذج التسجيل عند إضافته.')} </p><div className="registerCard"><Users size={42}/><h3>{t('جاهز تدخل الملعب؟')} </h3><p>{t('الأماكن والرسوم تخضع لتأكيد الإدارة.')} </p><button className="primary" onClick={()=>CONFIG.registrationUrl?openLink(CONFIG.registrationUrl,'التسجيل'):contact()}>{t('ابدأ التسجيل')} <ArrowLeft size={18}/></button></div></div>;
 case 'contact':return <div className="content"><h2>{t('خلّينا على تواصل')} </h2><button className="contactRow" onClick={contact}><MessageCircle/>{t('واتساب')} {lang==='ar'?<ChevronLeft/>:<ArrowRight/>}</button><button className="contactRow" onClick={()=>openLink(CONFIG.instagram,'إنستغرام')}><Instagram/>{t('إنستغرام')} {lang==='ar'?<ChevronLeft/>:<ArrowRight/>}</button><button className="contactRow" onClick={()=>openLink(CONFIG.maps,'الخرائط')}><MapPin/>{t('موقعنا')} {lang==='ar'?<ChevronLeft/>:<ArrowRight/>}</button><p className="muted">{t(CONFIG.city)}</p></div>;
 default:return null;
 }}
 return <main className="site" dir={lang==='ar'?'rtl':'ltr'}><button className="languageSwitch" onClick={()=>setLang(v=>v==='ar'?'en':'ar')} aria-label={lang==='ar'?'Switch to English':'التبديل إلى العربية'}>{lang==='ar'?'English | EN':'العربية | AR'}</button>{introPlaying&&<div className="cinematicIntro" role="dialog" aria-label={lang==='ar'?'مقدمة أكاديمية فيوري':'Fury Academy introduction'} onAnimationEnd={e=>{if(e.target===e.currentTarget)finishIntro()}}><audio ref={introAudio} src="/fury-intro.wav" preload="none" onEnded={()=>setSoundOn(false)}/><div className="cinematicGlow"/><img src="/fury-football-academy/fury-logo.png"" className="cinematicLogo" alt="Fury Academy"/><div className="cinematicTitle">FURY FOOTBALL ACADEMY</div><div className="cinematicSubtitle">{lang==='ar'?'هنا يبدأ الأبطال':'Where champions begin'}</div><button className="soundIntro" type="button" onClick={toggleSound} aria-label={soundOn?(lang==='ar'?'كتم الصوت':'Mute sound'):(lang==='ar'?'تشغيل الصوت':'Play sound')}>{soundOn?<Volume2 size={17}/>:<VolumeX size={17}/>} {soundOn?(lang==='ar'?'كتم الصوت':'Mute'):(lang==='ar'?'تشغيل الصوت':'Play sound')}</button><button className="skipIntro" onClick={finishIntro}>{lang==='ar'?'تخطي المقدمة':'Skip intro'}</button></div>}<div className="ambient ambient1"/><div className="ambient ambient2"/><div className="intro"><img src="/fury-logo.png" className="introLogo" alt="Fury Academy"/><span className="eyebrow">WELCOME TO THE NEXT LEVEL</span><h1>FURY <em>ACADEMY</em></h1><p>{t('تجربة رقمية تفاعلية لأكاديمية فيوري لكرة القدم')} </p><span className="hint">{t('افتح الجوال واستكشف عالم فيوري')} </span></div><div className="phone" onTouchStart={e=>touchStart.current=e.touches[0].clientY} onTouchEnd={e=>{if(!unlocked&&touchStart.current!==null&&touchStart.current-e.changedTouches[0].clientY>50)setUnlocked(true)}}><div className="screen"><div className="wallpaper"/><div className="status"><span>{time}</span><div className="island"/><div className="indicators"><Signal size={15} fill="currentColor"/><Wifi size={16}/><BatteryFull size={22}/></div></div>{!unlocked?<div className="lockscreen" onClick={()=>setUnlocked(true)}><LockKeyhole size={21} className="lock"/><div className="bigtime">{time}</div><div className="date">{date}</div><div className="lockBrand"><div className="cinematicHalo" aria-hidden="true"/><img className="brandLogo lockLogo" src="/fury-football-academy/fury-logo.png"" alt="Fury Academy logo"/><h2>FURY ACADEMY</h2><p>RISE. TRAIN. CONQUER.</p></div><div className="unlock"><ChevronUp size={22}/>{t('اسحب للأعلى أو اضغط لفتح القفل')} </div><div className="lockActions"><span><Camera size={20}/></span><span><Volume2 size={20}/></span></div></div>:<><div className="homescreen"><div className="welcome"><span>{t('أهلًا بك في')} </span><h2>{t('عالم فيوري')} <Star size={19} fill="currentColor"/></h2><p>{t('هنا يبدأ الأبطال')} </p></div><div className="appgrid">{APPS.map(({id,label,Icon,color,dark})=><button className="appIcon" key={id} onClick={()=>setApp(id)}><span className={'tile '+(dark?'dark':'')} style={{background:color}}><Icon size={30} strokeWidth={1.9}/></span><span>{t(label)}</span></button>)}</div><div className="dock"><button onClick={()=>setApp('about')}><Home/></button><button onClick={()=>setApp('register')}><Users/></button><button onClick={()=>setApp('schedule')}><CalendarDays/></button><button onClick={()=>setApp('contact')}><Phone/></button></div></div>{app&&<div className="appwindow" key={app}><header><button aria-label={t('العودة للرئيسية')} onClick={()=>setApp(null)}>{lang==='ar'?<ArrowRight size={21}/>:<ArrowLeft size={21}/>}</button><strong>{t(APPS.find(x=>x.id===app)?.label)}</strong><button aria-label={t('إغلاق')} onClick={()=>setApp(null)}><X size={20}/></button></header><div className="appbody"><Body/></div></div>}</>}<button className="homebar" aria-label={t('العودة للشاشة الرئيسية')} onClick={()=>unlocked?setApp(null):setUnlocked(true)}/>{toast&&<div className="toast">{toast}</div>}</div><div className="sidebutton side1"/><div className="sidebutton side2"/></div><footer>© {now.getFullYear()} FURY ACADEMY · تصميم تجريبي قابل للتخصيص</footer></main>
}
createRoot(document.getElementById('root')).render(<App/>);
