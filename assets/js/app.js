(function(){
  document.querySelectorAll('.shot.mos').forEach(function(s){
    var c=+s.dataset.cols||10,r=+s.dataset.rows||6;
    var g=document.createElement('div');g.className='grid';
    g.style.gridTemplateColumns='repeat('+c+',1fr)';g.style.gridTemplateRows='repeat('+r+',1fr)';
    var cells=[],order=[];
    for(var i=0;i<c*r;i++){var b=document.createElement('b');cells.push(b);g.appendChild(b);order.push(i)}
    order.sort(function(){return Math.random()-.5});
    order.forEach(function(idx,pos){cells[idx].style.transitionDelay=(pos*(700/(c*r))+80)+'ms'});
    s.appendChild(g);
  });

  var caps=[
    ['Green Fest',{sq:'Edicioni i 16-të, nën temën REFLEKTO',en:'The sixteenth edition, under the theme REFLEKTO'}],
    ['Visit Trepça',{sq:'Brenda minierës me vizitorë nga Zvicra',en:'Inside the mine with visitors from Switzerland'}],
    ['MitroRun',{sq:'Tri distanca nëpër qendër të qytetit',en:'Three distances through the centre of the city'}],
    ['7 Arte',{sq:'Marrëveshje me Komunën për mbrojtjen e mjedisit',en:'Environmental agreement with the Municipality'}]
  ];
  var slides=[].slice.call(document.querySelectorAll('#slider .slide'));
  var dw=document.getElementById('sDots'),cap=document.getElementById('sCap'),cur=0,timer;
  slides.forEach(function(s,i){var b=document.createElement('button');if(i===0)b.className='on';b.onclick=function(){go(i);rest()};dw.appendChild(b)});
  function go(i){
    cur=(i+slides.length)%slides.length;
    slides.forEach(function(s,n){s.classList.toggle('on',n===cur)});
    [].slice.call(dw.children).forEach(function(b,n){b.classList.toggle('on',n===cur)});
    var l=document.documentElement.lang==='en'?'en':'sq';
    cap.innerHTML='<small>'+caps[cur][0]+'</small><span data-sq="'+caps[cur][1].sq+'" data-en="'+caps[cur][1].en+'">'+caps[cur][1][l]+'</span>';
  }
  function rest(){clearInterval(timer);timer=setInterval(function(){go(cur+1)},5200)}
  document.getElementById('sNext').onclick=function(){go(cur+1);rest()};
  document.getElementById('sPrev').onclick=function(){go(cur-1);rest()};
  go(0);rest();

  function countUp(){
    document.querySelectorAll('#stats b[data-cnt]').forEach(function(el){
      if(el.dataset.done)return;el.dataset.done=1;
      var t=+el.dataset.cnt,raw=el.hasAttribute('data-raw');
      var st=raw?Math.max(t-45,0):0,n=st,steps=40,inc=(t-st)/steps,i=0;
      var iv=setInterval(function(){i++;n+=inc;el.textContent=i>=steps?t:Math.round(n);if(i>=steps)clearInterval(iv)},25);
    });
  }

  var lb=document.getElementById('lb'),lbI=document.getElementById('lbI'),lbC=document.getElementById('lbC'),grp=[],gi=0;
  function paint(){lbI.src=grp[gi];lbC.textContent=(gi+1)+' / '+grp.length}
  function openLb(l,i){grp=l;gi=i;lb.classList.add('on');paint();document.body.style.overflow='hidden'}
  function closeLb(){lb.classList.remove('on');document.body.style.overflow=''}
  document.getElementById('lbX').onclick=closeLb;
  document.getElementById('lbN').onclick=function(e){e.stopPropagation();gi=(gi+1)%grp.length;paint()};
  document.getElementById('lbP').onclick=function(e){e.stopPropagation();gi=(gi-1+grp.length)%grp.length;paint()};
  lb.onclick=function(e){if(e.target===lb||e.target.className==='fr')closeLb()};
  document.querySelectorAll('.gal').forEach(function(g){
    var imgs=[].slice.call(g.querySelectorAll('img')).map(function(i){return i.getAttribute('src')});
    g.querySelectorAll('.gi').forEach(function(t,i){t.onclick=function(){openLb(imgs,i)}});
  });

  function wireFilter(bid,lid){
    var bar=document.getElementById(bid);if(!bar)return;
    bar.addEventListener('click',function(e){
      var b=e.target.closest('button');if(!b)return;
      [].slice.call(bar.children).forEach(function(x){x.classList.remove('on')});
      b.classList.add('on');
      var f=b.dataset.f;
      document.querySelectorAll('#'+lid+' .ni').forEach(function(n){n.classList.toggle('hide',f!=='all'&&n.dataset.k!==f)});
    });
  }
  wireFilter('hf','hn');wireFilter('nf','nn');

  var IDX=[
    ['Green Fest','#/greenfest','Projekt'],['Visit Trepça','#/trepca','Projekt'],['MitroRun','#/mitrorun','Projekt'],
    ['7Arte Academy','#/academy','Projekt'],['Graphic Design','#/ac-gd','Trajnim'],['Filmmaking','#/ac-film','Trajnim'],
    ['3D Animation','#/ac-3d','Trajnim'],['Arkitekturë e qëndrueshme','#/ac-arch','Trajnim'],
    ['Rreth nesh','#/about','Faqe'],['Historia','#/history','Faqe'],['Stafi','#/staff','Faqe'],['Informata','#/info','Faqe'],
    ['Kontakt','#/contact','Faqe'],['Lajme','#/news','Faqe'],['Publikime','#/publications','Faqe'],
    ['Raporte vjetore','#/reports-annual','Publikim'],['Raporte projektesh','#/reports-project','Publikim'],
    ['Hulumtime','#/research','Publikim'],['Kujtesa e Trepçës','#/research','Libër'],
    ['Punë','#/jobs','Faqe'],['Shërbime','#/services','Faqe'],['Hapësira me qira','#/services','Shërbim'],
    ['Na mbështet','#/support','Faqe'],['FAQ','#/faq','Faqe'],
    ['Sfidat e zhvillimit kulturor','#/culture','Projekt'],['Arkivi i projekteve','#/past','Projekt'],
    ['Kinemaja e Hapur','#/greenfest','Program'],['Panairi i Artizanateve','#/greenfest','Program'],
    ['Green Talks','#/greenfest','Program'],['INside Trepça','#/trepca','Turë'],['OUTside Trepça','#/trepca','Turë'],['Purple Tour','#/trepca','Turë']
  ];
  var sr=document.getElementById('srch'),si=document.getElementById('sInput'),res=document.getElementById('sRes');
  function openS(){sr.classList.add('on');si.value='';res.innerHTML='';setTimeout(function(){si.focus()},50);document.body.style.overflow='hidden'}
  function closeS(){sr.classList.remove('on');document.body.style.overflow=''}
  document.getElementById('openSrch').onclick=openS;
  document.getElementById('closeSrch').onclick=closeS;
  si.addEventListener('input',function(){
    var q=si.value.trim().toLowerCase();
    if(!q){res.innerHTML='';return}
    var hits=IDX.filter(function(r){return r[0].toLowerCase().indexOf(q)>-1}).slice(0,10);
    res.innerHTML=hits.length?hits.map(function(r){return '<a href="'+r[1]+'"><b>'+r[0]+'</b><i>'+r[2]+'</i></a>'}).join(''):'<a><b>—</b><i>0</i></a>';
    res.querySelectorAll('a').forEach(function(a){a.onclick=closeS});
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){closeS();closeLb()}
    if(!lb.classList.contains('on'))return;
    if(e.key==='ArrowRight'){gi=(gi+1)%grp.length;paint()}
    if(e.key==='ArrowLeft'){gi=(gi-1+grp.length)%grp.length;paint()}
  });

  document.querySelectorAll('.dd>button').forEach(function(b){
    b.onclick=function(e){
      e.preventDefault();
      var p=b.parentNode,was=p.classList.contains('open');
      document.querySelectorAll('.dd').forEach(function(d){d.classList.remove('open')});
      if(!was)p.classList.add('open');
    };
  });
  document.addEventListener('click',function(e){
    if(!e.target.closest('.dd'))document.querySelectorAll('.dd').forEach(function(d){d.classList.remove('open')});
  });

  var THEME={greenfest:['t-gf','sn-gf','Green Fest'],trepca:['t-vt','sn-vt','Visit Trepça'],mitrorun:['t-mr','sn-mr','MitroRun'],academy:['t-ac','sn-ac','7Arte Academy'],'ac-gd':['t-ac','sn-ac','7Arte Academy'],'ac-film':['t-ac','sn-ac','7Arte Academy'],'ac-3d':['t-ac','sn-ac','7Arte Academy'],'ac-arch':['t-ac','sn-ac','7Arte Academy']};
  var pages=['home','about','history','staff','info','contact','news','greenfest','trepca','mitrorun','culture','past','academy','ac-gd','ac-film','ac-3d','ac-arch','publications','reports-annual','reports-project','research','jobs','services','support','faq'];
  function route(){
    var h=(location.hash||'#/').replace('#/','')||'home';
    if(h.charAt(0)==='#')h='home';
    if(pages.indexOf(h)<0){ if(document.getElementById(h)){document.getElementById(h).scrollIntoView();return} h='home'; }
    pages.forEach(function(p){var el=document.getElementById('p-'+p);if(el)el.classList.toggle('live',p===h)});
    document.body.className='';
    document.querySelectorAll('.subnav').forEach(function(s){s.classList.remove('live')});
    var xm=document.getElementById('xmark');
    if(THEME[h]){
      document.body.classList.add('proj',THEME[h][0]);
      document.getElementById(THEME[h][1]).classList.add('live');
      xm.style.display='block';document.getElementById('xmarkName').textContent=THEME[h][2];
    } else { xm.style.display='none'; }
    document.querySelectorAll('.menu>a').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#/'+h)});
    document.querySelectorAll('.dd').forEach(function(d){
      d.classList.remove('open');
      var any=[].slice.call(d.querySelectorAll('a')).some(function(a){return a.getAttribute('href')==='#/'+h});
      d.classList.toggle('on',any);
    });
    document.getElementById('menu').classList.remove('open');
    window.scrollTo(0,0);
    document.querySelectorAll('.shot').forEach(function(s){s.classList.remove('seen')});
    setTimeout(watch,60);
  }
  var io;
  function watch(){
    if(io)io.disconnect();
    io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('seen');if(e.target.id==='stats')countUp()}});
    },{threshold:.05,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.page.live .obs, .page.live .shot, #stats').forEach(function(el){io.observe(el)});
  }
  window.addEventListener('hashchange',route);

  function setLang(l){
    document.documentElement.lang=l;
    document.querySelectorAll('[data-'+l+']').forEach(function(el){var v=el.getAttribute('data-'+l);if(v!==null)el.textContent=v});
    document.querySelectorAll('[data-'+l+'-ph]').forEach(function(el){el.setAttribute('placeholder',el.getAttribute('data-'+l+'-ph'))});
    document.getElementById('bSQ').classList.toggle('on',l==='sq');
    document.getElementById('bEN').classList.toggle('on',l==='en');
    si.setAttribute('placeholder',l==='en'?'Search 7arte.org…':'Kërko në 7arte.org…');
  }
  document.getElementById('bSQ').onclick=function(){setLang('sq')};
  document.getElementById('bEN').onclick=function(){setLang('en')};
  document.getElementById('burg').onclick=function(){document.getElementById('menu').classList.toggle('open')};

  var prog=document.getElementById('prog'),topB=document.getElementById('top');
  window.addEventListener('scroll',function(){
    var hh=document.documentElement.scrollHeight-window.innerHeight;
    prog.style.width=(hh>0?(window.scrollY/hh)*100:0)+'%';
    topB.classList.toggle('on',window.scrollY>600);
  },{passive:true});
  topB.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};

  route();watch();countUp();
})();
