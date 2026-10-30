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
    ['Green Fest','#/greenfest','Projekt'],['Visit Trepça','#/trepca','Projekt'],
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
  /* Search dialog (button or Cmd/Ctrl+K): projects and popular pages first,
     live results while typing; arrows move, Enter opens, Esc closes. */
  var COL={Projekt:'#C4186F',Trajnim:'#1560C4',Faqe:'#45454F',Publikim:'#6A45B8','Libër':'#6A45B8',Shërbim:'#45454F',Program:'#8CC63F','Turë':'#6A45B8'};
  var COLP={'Green Fest':'#8CC63F','Visit Trepça':'#6A45B8','7Arte Academy':'#1560C4'};
  var sr=document.getElementById('srch'),si=document.getElementById('sInput'),res=document.getElementById('sRes'),
      start=document.getElementById('sStart'),count=document.getElementById('sCount'),active=-1;
  function opt(r){
    var a=document.createElement('a'),t=document.createElement('span'),c=document.createElement('span'),b=document.createElement('b'),sm=document.createElement('small');
    a.className='sx-o';a.setAttribute('role','option');a.href=r[1];
    t.className='sx-t';t.style.setProperty('--dot',COLP[r[0]]||COL[r[2]]||'#C4186F');t.textContent=r[0].charAt(0);
    c.className='sx-c';b.textContent=r[0];sm.textContent=r[2];c.appendChild(b);c.appendChild(sm);
    a.appendChild(t);a.appendChild(c);return a;
  }
  ['Rreth nesh','Lajme','Shërbime','Kontakt','Na mbështet'].forEach(function(n){
    var r=IDX.filter(function(x){return x[0]===n})[0]; if(r)document.getElementById('sPopular').appendChild(opt(r));
  });
  function opts(){return [].slice.call((res.hidden?start:res).querySelectorAll('[role=option]'))}
  function mark(i){
    var o=opts();active=o.length?Math.max(-1,Math.min(i,o.length-1)):-1;
    o.forEach(function(x,n){x.setAttribute('aria-selected',n===active?'true':'false')});
    if(active>=0)o[active].scrollIntoView({block:'nearest'});
  }
  function openS(){if(sr.open)return;sr.showModal();document.documentElement.classList.add('sx-on');si.value='';res.hidden=true;start.hidden=false;count.textContent='';mark(-1);si.focus()}
  function closeS(){if(sr.open)sr.close()}
  sr.addEventListener('close',function(){document.documentElement.classList.remove('sx-on')});
  sr.addEventListener('click',function(e){if(e.target===sr)closeS();if(e.target.closest('a'))closeS()});
  document.getElementById('openSrch').onclick=openS;
  document.getElementById('closeSrch').onclick=closeS;
  si.addEventListener('input',function(){
    var q=si.value.trim().toLowerCase();
    if(q.length<1){res.hidden=true;start.hidden=false;count.textContent='';mark(-1);return}
    var hits=IDX.filter(function(r){return r[0].toLowerCase().indexOf(q)>-1}).slice(0,8);
    res.textContent='';
    if(!hits.length){
      var en=document.documentElement.lang==='en';
      res.innerHTML='<div class="sx-none"><p></p><p></p></div>';
      res.querySelector('p').textContent=(en?'Nothing for “':'Asgjë për “')+si.value.trim()+'”';
      res.querySelectorAll('p')[1].textContent=en?'Try a project, a page or a tour.':'Provo një projekt, një faqe ose një turë.';
    }
    hits.forEach(function(r){res.appendChild(opt(r))});
    start.hidden=true;res.hidden=false;
    count.textContent=hits.length?hits.length+(document.documentElement.lang==='en'?' results':' rezultate'):'';
    mark(hits.length?0:-1);
  });
  si.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'){e.preventDefault();mark(active+1)}
    if(e.key==='ArrowUp'){e.preventDefault();mark(active-1)}
    if(e.key==='Enter'&&active>=0){e.preventDefault();var o=opts()[active];closeS();location.hash=o.getAttribute('href')}
  });
  document.addEventListener('keydown',function(e){
    if((e.key==='k'||e.key==='K')&&(e.metaKey||e.ctrlKey)){e.preventDefault();openS()}
    if(e.key==='Escape')closeLb();
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
  var hover=window.matchMedia('(hover: hover) and (min-width: 1181px)');
  document.querySelectorAll('.dd').forEach(function(d){
    d.addEventListener('mouseenter',function(){if(hover.matches)document.querySelectorAll('.dd').forEach(function(x){if(x!==d)x.classList.remove('open')})});
    d.addEventListener('mouseleave',function(){if(hover.matches)d.classList.remove('open')});
  });

  var THEME={greenfest:['t-gf','sn-gf','Green Fest'],trepca:['t-vt','sn-vt','Visit Trepça'],academy:['t-ac','sn-ac','7Arte Academy'],'ac-gd':['t-ac','sn-ac','7Arte Academy'],'ac-film':['t-ac','sn-ac','7Arte Academy'],'ac-3d':['t-ac','sn-ac','7Arte Academy'],'ac-arch':['t-ac','sn-ac','7Arte Academy']};
  var SUB={about:'sn-ab'};
  var ALIAS={history:'historia',staff:'stafi',info:'informata'};
  var pages=['home','about','contact','news','greenfest','trepca','culture','past','academy','ac-gd','ac-film','ac-3d','ac-arch','publications','reports-annual','reports-project','research','jobs','services','support','faq'];
  function route(){
    var raw=location.hash||'#/';
    // A plain #anchor is a section of the page on screen.
    if(raw.indexOf('#/')!==0){var t=document.getElementById(raw.slice(1));if(t){t.scrollIntoView();return}raw='#/'}
    var h=raw.replace('#/','')||'home',to=null;
    if(ALIAS[h]){to=ALIAS[h];h='about'}
    if(pages.indexOf(h)<0)h='home';
    pages.forEach(function(p){var el=document.getElementById('p-'+p);if(el)el.classList.toggle('live',p===h)});
    document.body.className='';
    document.querySelectorAll('.subnav').forEach(function(s){s.classList.remove('live')});
    var xm=document.getElementById('xmark');
    if(THEME[h]){
      document.body.classList.add('proj',THEME[h][0]);
      document.getElementById(THEME[h][1]).classList.add('live');
      xm.style.display='block';document.getElementById('xmarkName').textContent=THEME[h][2];
    } else { xm.style.display='none'; }
    if(SUB[h]){document.body.classList.add('proj');document.getElementById(SUB[h]).classList.add('live')}
    var cur=to?Object.keys(ALIAS).filter(function(k){return ALIAS[k]===to})[0]:h;
    document.querySelectorAll('.menu>a').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#/'+h)});
    document.querySelectorAll('.dd').forEach(function(d){
      d.classList.remove('open');
      var any=[].slice.call(d.querySelectorAll('a')).some(function(a){var x=a.getAttribute('href');return x==='#/'+h||x==='#/'+cur});
      d.classList.toggle('on',any);
    });
    document.getElementById('menu').classList.remove('open');
    document.querySelectorAll('.shot').forEach(function(s){s.classList.remove('seen','now')});
    if(to){setTimeout(function(){var t=document.getElementById(to);if(t)t.scrollIntoView()},30)} else window.scrollTo(0,0);
    setTimeout(watch,60);
  }
  var io;
  function watch(){
    if(io)io.disconnect();
    io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('seen');if(e.target.id==='stats')countUp()}});
    },{threshold:.05,rootMargin:'0px 0px -40px 0px'});
    var fold=window.innerHeight;
    document.querySelectorAll('.page.live .obs, .page.live .shot, #stats').forEach(function(el){
      var r=el.getBoundingClientRect();
      if(el.id!=='stats'&&r.top<fold&&r.bottom>0)el.classList.add('seen','now');
      else io.observe(el);
    });
  }
  window.addEventListener('hashchange',route);

  function setLang(l){
    document.documentElement.lang=l;
    document.querySelectorAll('[data-'+l+']').forEach(function(el){var v=el.getAttribute('data-'+l);if(v!==null)el.textContent=v});
    document.querySelectorAll('[data-'+l+'-ph]').forEach(function(el){el.setAttribute('placeholder',el.getAttribute('data-'+l+'-ph'))});
    document.getElementById('bSQ').classList.toggle('on',l==='sq');
    document.getElementById('bEN').classList.toggle('on',l==='en');
    document.querySelectorAll('[data-'+l+'-al]').forEach(function(el){el.setAttribute('aria-label',el.getAttribute('data-'+l+'-al'))});
  }
  document.getElementById('bSQ').onclick=function(){setLang('sq')};
  document.getElementById('bEN').onclick=function(){setLang('en')};
  document.getElementById('burg').onclick=function(){document.getElementById('menu').classList.toggle('open')};

  var prog=document.getElementById('prog'),topB=document.getElementById('top');
  var root=document.documentElement;
  function onScroll(){
    var y=window.scrollY,hh=root.scrollHeight-window.innerHeight;
    prog.style.width=(hh>0?(y/hh)*100:0)+'%';
    topB.classList.toggle('on',y>600);
    // The header slims past 80px and grows back near the top.
    if(y>80)root.classList.add('scrolled');else if(y<20)root.classList.remove('scrolled');
    var line=window.innerHeight*.35,on=null,links=[].slice.call(document.querySelectorAll('.subnav.live .lks a[href^="#"]:not([href^="#/"])'));
    links.forEach(function(a){var t=document.getElementById(a.getAttribute('href').slice(1));if(t&&t.getBoundingClientRect().top<=line)on=a});
    links.forEach(function(a){a.classList.toggle('on',a===on)});
  }
  window.addEventListener('scroll',function(){requestAnimationFrame(onScroll)},{passive:true});
  // Section links scroll within the page instead of changing the route.
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]');if(!a)return;
    var href=a.getAttribute('href');if(href.indexOf('#/')===0||href==='#')return;
    var t=document.getElementById(href.slice(1));if(!t)return;
    e.preventDefault();t.scrollIntoView({behavior:'smooth'});
  });
  topB.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};

  route();watch();countUp();onScroll();
})();
