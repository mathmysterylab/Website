/* ===================================
   MATH MYSTERY LAB - Main JavaScript
=================================== */

/* ──────────────────────────────────────
   1. MOBILE MENU & NAV
────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));
  }

  // Active nav link highlight
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(l => {
    if (l.getAttribute('href') === page) l.classList.add('active');
  });

  /* ──────────────────────────────────────
     2. LEVEL TABS
  ────────────────────────────────────── */
  document.querySelectorAll('.level-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.level-panel').forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const target = document.getElementById('panel-' + this.dataset.level);
      if (target) target.classList.add('active');
    });
  });

  /* ──────────────────────────────────────
     3. SUBSCRIBE FORM
  ────────────────────────────────────── */
  const subForm = document.getElementById('subscribeForm');
  if (subForm) {
    subForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name  = subForm.querySelector('[name="name"]').value.trim();
      const email = subForm.querySelector('[name="email"]').value.trim();
      if (!name || !email) { alert('Please fill in your name and email!'); return; }
      alert('🎉 Thanks for subscribing, ' + name + '!');
      subForm.reset();
    });
  }

  /* ──────────────────────────────────────
     4. CONTACT FORM
  ────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      const action = contactForm.getAttribute('action') || '';
      if (action.includes('YOUR_FORM_ID')) {
        e.preventDefault();
        alert('Setup Formspree to send real messages! See README.md.');
        contactForm.reset();
      }
    });
  }

  /* ──────────────────────────────────────
     5. FADE-IN ANIMATIONS
  ────────────────────────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.topic-card,.game-card,.lesson-card,.value-card,.rec-card')
    .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

  /* ──────────────────────────────────────
     6. INIT GAMES
  ────────────────────────────────────── */
  initGames();
});

/* ══════════════════════════════════════
   GAME DATA BANK
══════════════════════════════════════ */
const GAME_DATA = {
  arithmetic: {
    beginner: {
      quiz: [
        { q:"What is 3 + 4?",          opts:["5","6","7","8"],           ans:"7"  },
        { q:"What is 9 - 3?",          opts:["4","5","6","7"],           ans:"6"  },
        { q:"What is 2 × 5?",          opts:["8","9","10","11"],         ans:"10" },
        { q:"What is 8 ÷ 2?",          opts:["2","3","4","5"],           ans:"4"  },
        { q:"What is 6 + 7?",          opts:["11","12","13","14"],       ans:"13" },
      ],
      fillin: [
        { q:"5 + ___ = 9",   ans:"4" },
        { q:"___ + 3 = 8",   ans:"5" },
        { q:"10 - ___ = 6",  ans:"4" },
        { q:"2 × ___ = 6",   ans:"3" },
        { q:"12 ÷ ___ = 4",  ans:"3" },
      ],
      drag: [{ instruction:"Match each sum to its answer", pairs:[["3+3","6"],["2+5","7"],["4+4","8"],["5+5","10"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    elementary: {
      quiz: [
        { q:"What is 23 + 45?",       opts:["56","67","68","78"],   ans:"68" },
        { q:"What is 72 - 38?",       opts:["24","34","44","54"],   ans:"34" },
        { q:"What is 6 × 7?",         opts:["36","40","42","48"],   ans:"42" },
        { q:"What is 56 ÷ 8?",        opts:["5","6","7","8"],       ans:"7"  },
        { q:"What is 15% of 100?",    opts:["10","15","20","25"],   ans:"15" },
      ],
      fillin: [
        { q:"25 + ___ = 60",  ans:"35" },
        { q:"___ × 9 = 63",   ans:"7"  },
        { q:"100 - ___ = 37", ans:"63" },
        { q:"81 ÷ ___ = 9",   ans:"9"  },
      ],
      drag: [{ instruction:"Match multiplication to answer", pairs:[["6×6","36"],["7×8","56"],["9×4","36"],["5×9","45"]] }],
      timed: { ops:["+","-","×"], range:[1,20], seconds:30 }
    },
    intermediate: {
      quiz: [
        { q:"What is 3/4 + 1/4?",          opts:["1/2","1","3/8","4/4"],  ans:"1"  },
        { q:"What is 15% of 200?",          opts:["20","25","30","35"],    ans:"30" },
        { q:"What is 2³?",                  opts:["4","6","8","10"],       ans:"8"  },
        { q:"What is √144?",                opts:["11","12","13","14"],    ans:"12" },
        { q:"What is the LCM of 4 and 6?",  opts:["8","10","12","16"],    ans:"12" },
      ],
      fillin: [
        { q:"2/3 of 90 = ___",  ans:"60" },
        { q:"___ % of 50 = 25", ans:"50" },
        { q:"√___ = 7",         ans:"49" },
      ],
      drag: [{ instruction:"Match fraction to decimal", pairs:[["1/2","0.5"],["1/4","0.25"],["3/4","0.75"],["1/5","0.2"]] }],
      timed: { ops:["+","-","×","÷"], range:[1,50], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"What is 2⁸?",                  opts:["128","256","512","1024"], ans:"256"  },
        { q:"GCD of 36 and 48?",            opts:["6","8","10","12"],        ans:"12"   },
        { q:"Express 0.375 as a fraction",  opts:["1/4","3/8","2/5","5/8"], ans:"3/8"  },
        { q:"What is 7! (factorial)?",      opts:["2520","5040","720","720"],ans:"5040" },
        { q:"What is log₁₀(1000)?",         opts:["2","3","4","10"],         ans:"3"    },
      ],
      fillin: [
        { q:"5! = ___",       ans:"120" },
        { q:"log₂(64) = ___", ans:"6"   },
        { q:"GCD(60,90)= ___",ans:"30"  },
      ],
      drag: [{ instruction:"Match power to value", pairs:[["3⁴","81"],["2⁵","32"],["10³","1000"],["4³","64"]] }],
      timed: { ops:["+","-","×","÷"], range:[1,100], seconds:30 }
    },
    university: {
      quiz: [
        { q:"Which series converges?",                  opts:["Σ 1/n","Σ 1/n²","Σ n","Σ 2ⁿ"],        ans:"Σ 1/n²" },
        { q:"Sum of Σ(1/2)ⁿ for n=1→∞?",               opts:["1","2","1/2","∞"],                     ans:"1"      },
        { q:"17 mod 5 = ?",                             opts:["1","2","3","4"],                       ans:"2"      },
        { q:"What is ⌊π⌋ ?",                            opts:["2","3","4","π"],                       ans:"3"      },
        { q:"Euler's number e ≈ ?",                     opts:["2.718","3.141","1.618","1.414"],       ans:"2.718"  },
      ],
      fillin: [
        { q:"17 mod 5 = ___", ans:"2" },
        { q:"⌈2.3⌉ = ___",    ans:"3" },
        { q:"0! = ___",        ans:"1" },
      ],
      drag: [{ instruction:"Match notation to meaning", pairs:[["⌊x⌋","floor"],["⌈x⌉","ceiling"],["x!","factorial"],["Σ","summation"]] }],
      timed: { ops:["+","-","×","÷"], range:[1,200], seconds:30 }
    }
  },
  algebra: {
    beginner: {
      quiz: [
        { q:"If x + 3 = 7, x = ?",   opts:["2","3","4","5"],   ans:"4"  },
        { q:"If 2x = 10, x = ?",      opts:["3","4","5","6"],   ans:"5"  },
        { q:"3x when x = 4 is?",      opts:["7","10","12","15"],ans:"12" },
        { q:"If x - 5 = 3, x = ?",    opts:["6","7","8","9"],   ans:"8"  },
        { q:"Simplify: 2x + 3x",      opts:["5x","6x","5","6"], ans:"5x" },
      ],
      fillin:[
        { q:"x + 4 = 9  → x = ___", ans:"5" },
        { q:"3x = 15    → x = ___", ans:"5" },
        { q:"x - 7 = 2  → x = ___", ans:"9" },
      ],
      drag:[{ instruction:"Solve and match to answer", pairs:[["x+2=5","3"],["2x=8","4"],["x-1=6","7"],["x/3=4","12"]] }],
      timed:{ ops:["+","-"], range:[1,10], seconds:30 }
    },
    elementary: {
      quiz: [
        { q:"Solve: 3x - 2 = 10",        opts:["2","3","4","5"],       ans:"4"  },
        { q:"Expand: 2(x + 3)",           opts:["2x+3","2x+6","x+6","x+3"], ans:"2x+6" },
        { q:"If y = 2x and x=5, y = ?",   opts:["5","8","10","12"],     ans:"10" },
        { q:"Factorise: 6x + 9",          opts:["3(2x+3)","2(3x+9)","3(x+3)","6(x+3)"], ans:"3(2x+3)" },
        { q:"Solve: x/4 = 3",             opts:["3","7","12","15"],     ans:"12" },
      ],
      fillin:[
        { q:"2x + 5 = 13 → x = ___", ans:"4"  },
        { q:"x² = 25     → x = ___", ans:"5"  },
      ],
      drag:[{ instruction:"Match term to simplification", pairs:[["3x+2x","5x"],["4y-y","3y"],["2a×3","6a"],["x²+x²","2x²"]] }],
      timed:{ ops:["+","-","×"], range:[1,20], seconds:30 }
    }
  },
  geometry: {
    beginner: {
      quiz: [
        { q:"Sides of a triangle?",              opts:["2","3","4","5"],              ans:"3"             },
        { q:"Perimeter of square, side=4?",      opts:["8","12","16","20"],           ans:"16"            },
        { q:"Degrees in a right angle?",         opts:["45","60","90","180"],         ans:"90"            },
        { q:"Area of rectangle 3×5?",            opts:["8","12","15","16"],           ans:"15"            },
        { q:"A circle's boundary is called?",    opts:["diameter","radius","perimeter","circumference"],  ans:"circumference" },
      ],
      fillin:[
        { q:"Perimeter of square, side=6: ___", ans:"24"  },
        { q:"Area of rectangle 4×7 = ___",      ans:"28"  },
        { q:"Angles in a triangle add to ___ °",ans:"180" },
      ],
      drag:[{ instruction:"Match shape to number of sides", pairs:[["Triangle","3"],["Square","4"],["Pentagon","5"],["Hexagon","6"]] }],
      timed:{ ops:["+","-"], range:[1,10], seconds:30 }
    }
  },
  statistics: {
    beginner: {
      quiz: [
        { q:"Mean of 2, 4, 6?",              opts:["3","4","5","6"],                           ans:"4"          },
        { q:"Median of 1,3,5,7,9?",          opts:["3","4","5","6"],                           ans:"5"          },
        { q:"Mode of 2,3,3,4,5?",            opts:["2","3","4","5"],                           ans:"3"          },
        { q:"Range of 2,8,4,1?",             opts:["5","6","7","8"],                           ans:"7"          },
        { q:"Probability of 0 means?",       opts:["certain","likely","unlikely","impossible"], ans:"impossible" },
      ],
      fillin:[
        { q:"Mean of 10,20,30 = ___",     ans:"20" },
        { q:"Median of 3,5,7,9,11 = ___", ans:"7"  },
        { q:"Range of 5,15 = ___",        ans:"10" },
      ],
      drag:[{ instruction:"Match term to definition", pairs:[["Mean","average"],["Median","middle value"],["Mode","most frequent"],["Range","max minus min"]] }],
      timed:{ ops:["+","-"], range:[1,10], seconds:30 }
    }
  },
  calculus: {
    university: {
      quiz: [
        { q:"Derivative of x²?",             opts:["x","2x","x²","2"],          ans:"2x"  },
        { q:"Integral of 2x dx?",            opts:["x","x²","x²+C","2x²+C"],   ans:"x²+C"},
        { q:"What is d/dx(sin x)?",          opts:["cos x","-cos x","sin x","-sin x"], ans:"cos x" },
        { q:"Limit of 1/x as x→∞?",          opts:["0","1","∞","undefined"],    ans:"0"   },
        { q:"What does ∫₀¹ x dx equal?",     opts:["0","1/4","1/2","1"],        ans:"1/2" },
      ],
      fillin:[
        { q:"d/dx(x³) = ___",  ans:"3x²" },
        { q:"∫ 1 dx = ___",    ans:"x+C" },
      ],
      drag:[{ instruction:"Match function to its derivative", pairs:[["x²","2x"],["x³","3x²"],["sin x","cos x"],["eˣ","eˣ"]] }],
      timed:{ ops:["+","-","×"], range:[1,20], seconds:30 }
    }
  },
  trigonometry: {
    intermediate: {
      quiz: [
        { q:"sin(90°) = ?",          opts:["0","0.5","1","-1"],          ans:"1"     },
        { q:"cos(0°) = ?",           opts:["0","0.5","1","-1"],          ans:"1"     },
        { q:"tan(45°) = ?",          opts:["0","0.5","1","√2"],          ans:"1"     },
        { q:"sin²x + cos²x = ?",     opts:["0","1","2","sin 2x"],        ans:"1"     },
        { q:"sin(30°) = ?",          opts:["1/4","1/3","1/2","√3/2"],   ans:"1/2"   },
      ],
      fillin:[
        { q:"sin(0°) = ___",   ans:"0" },
        { q:"cos(90°) = ___",  ans:"0" },
        { q:"tan(0°) = ___",   ans:"0" },
      ],
      drag:[{ instruction:"Match angle to sin value", pairs:[["0°","0"],["30°","0.5"],["90°","1"],["180°","0"]] }],
      timed:{ ops:["+","-"], range:[1,10], seconds:30 }
    }
  },
  number: {
    intermediate: {
      quiz: [
        { q:"Is 17 prime?",              opts:["Yes","No"],                      ans:"Yes"  },
        { q:"GCD of 12 and 18?",         opts:["3","4","6","9"],                 ans:"6"    },
        { q:"LCM of 4 and 6?",           opts:["8","10","12","16"],              ans:"12"   },
        { q:"What type is √2?",          opts:["rational","irrational","integer","prime"], ans:"irrational" },
        { q:"What is 5 mod 3?",          opts:["0","1","2","3"],                 ans:"2"    },
      ],
      fillin:[
        { q:"LCM(3,4) = ___",     ans:"12" },
        { q:"GCD(20,30) = ___",   ans:"10" },
        { q:"Next prime after 7: ___", ans:"11" },
      ],
      drag:[{ instruction:"Is it prime? Match to Yes or No", pairs:[["17","Prime"],["15","Not Prime"],["23","Prime"],["21","Not Prime"]] }],
      timed:{ ops:["+","-","×"], range:[1,30], seconds:30 }
    }
  }
};

/* ══════════════════════════════════════
   GAME ENGINE
══════════════════════════════════════ */
function initGames() {
  document.querySelectorAll('[data-game]').forEach(btn => {
    btn.addEventListener('click', function () {
      openGame(this.dataset.topic || 'arithmetic', this.dataset.level || 'beginner', this.dataset.game);
    });
  });
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-close')) closeModal();
  });
}

function openGame(topic, level, gameType) {
  const topicData = GAME_DATA[topic] || GAME_DATA.arithmetic;
  const data      = topicData[level] || topicData[Object.keys(topicData)[0]];
  let html = '';
  if      (gameType === 'quiz')   html = buildQuiz(data.quiz,   topic, level);
  else if (gameType === 'fillin') html = buildFillin(data.fillin, topic, level);
  else if (gameType === 'drag')   html = buildDrag(data.drag[0],  topic, level);
  else if (gameType === 'timed')  html = buildTimed(data.timed,   topic, level);
  else { alert('This game is coming soon! 🎮'); return; }
  showModal(html);
}

function showModal(html) {
  let overlay = document.getElementById('gameModal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'gameModal';
    overlay.className = 'modal-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `<div class="modal-box"><button class="modal-close" aria-label="Close">✕</button>${html}</div>`;
  overlay.classList.add('open');
  initModalGame(overlay);
}

function closeModal() {
  const overlay = document.getElementById('gameModal');
  if (overlay) { overlay.classList.remove('open'); stopTimer(); }
}

/* ── QUIZ ── */
function buildQuiz(qs, topic, level) {
  window._quiz = { questions:qs, topic, level, current:0, score:0 };
  return renderQuizQ();
}
function renderQuizQ() {
  const {questions,current,score,topic,level} = window._quiz;
  if (current >= questions.length) return renderResults(score, questions.length, 'quiz');
  const q    = questions[current];
  const opts = q.opts.map(o => `<button class="quiz-option" data-opt="${o}">${o}</button>`).join('');
  return `
    <div class="modal-title">🧠 Quiz</div>
    <div class="modal-subtitle">${topic} · ${level}</div>
    <div class="quiz-progress">Question ${current+1} of ${questions.length} &nbsp;·&nbsp; Score: ${score}</div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options">${opts}</div>
    <div class="quiz-feedback" id="qfeedback" style="display:none"></div>`;
}

/* ── FILL-IN ── */
function buildFillin(qs, topic, level) {
  window._fillin = { questions:qs, topic, level, current:0, score:0 };
  return renderFillinQ();
}
function renderFillinQ() {
  const {questions,current,score,topic,level} = window._fillin;
  if (current >= questions.length) return renderResults(score, questions.length, 'fillin');
  const q = questions[current];
  return `
    <div class="modal-title">✏️ Fill in the Blank</div>
    <div class="modal-subtitle">${topic} · ${level}</div>
    <div class="quiz-progress">Question ${current+1} of ${questions.length} &nbsp;·&nbsp; Score: ${score}</div>
    <div class="fillin-question" style="margin:16px 0 12px;font-size:1.3rem;font-weight:800;">${q.q}</div>
    <input class="fillin-input" id="fillinInput" type="text" placeholder="Type your answer..." autocomplete="off" />
    <div class="quiz-feedback" id="qfeedback" style="display:none;margin-top:12px;"></div>
    <div style="text-align:center;margin-top:16px;">
      <button class="btn btn-purple" id="fillinSubmit">Check ✓</button>
    </div>`;
}

/* ── DRAG & DROP ── */
function buildDrag(dragData, topic, level) {
  if (!dragData) return '<div class="modal-title">Coming Soon!</div>';
  const shuffledLeft  = [...dragData.pairs].sort(()=>Math.random()-.5);
  const shuffledRight = [...dragData.pairs].sort(()=>Math.random()-.5);
  const items = shuffledLeft.map((p,i)=>`<div class="drag-item" draggable="true" data-id="${i}" data-val="${p[1]}">${p[0]}</div>`).join('');
  const zones = shuffledRight.map((p,i)=>`<div class="drop-zone" data-answer="${p[1]}" id="zone-${i}"><span class="zone-label">→ ${p[1]}</span></div>`).join('');
  return `
    <div class="modal-title">🎯 Match It!</div>
    <div class="modal-subtitle">${dragData.instruction}</div>
    <p style="font-size:.82rem;color:var(--text-mid);margin-bottom:12px;">Drag each item to its matching box.</p>
    <div class="drag-pool" id="dragPool">${items}</div>
    <div class="drop-zones">${zones}</div>
    <div style="text-align:center;margin-top:18px;">
      <button class="btn btn-purple" id="dragCheck">Check Answers ✓</button>
    </div>
    <div class="quiz-feedback" id="qfeedback" style="display:none;margin-top:12px;"></div>`;
}

/* ── TIMED ── */
let _timerInterval = null;
function stopTimer() { if (_timerInterval) { clearInterval(_timerInterval); _timerInterval = null; } }

function buildTimed(config, topic, level) {
  window._timed = { config, topic, level, score:0, total:0, seconds:config.seconds, current:null };
  return renderTimedGame();
}
function renderTimedGame() {
  const q = generateTimedQ();
  window._timed.current = q;
  return `
    <div class="modal-title">⚡ Speed Round!</div>
    <div class="modal-subtitle">Answer as many as you can in ${window._timed.config.seconds} seconds!</div>
    <div class="timer-display" id="timerDisplay">${window._timed.config.seconds}</div>
    <div class="timer-bar"><div class="timer-fill" id="timerFill" style="width:100%"></div></div>
    <div class="score-display" id="timedScore">Score: 0 &nbsp;|&nbsp; Answered: 0</div>
    <div class="quiz-question" id="timedQ" style="text-align:center;font-size:2rem;margin-bottom:12px;">${q.q}</div>
    <input class="fillin-input" id="timedInput" type="number" placeholder="Answer..." autocomplete="off" />
    <div class="quiz-feedback" id="qfeedback" style="display:none;margin-top:10px;"></div>`;
}
function generateTimedQ() {
  const {ops=['+'], range=[1,10]} = window._timed.config;
  const [min,max] = range;
  const op = ops[Math.floor(Math.random()*ops.length)];
  let a = Math.floor(Math.random()*(max-min+1))+min;
  let b = Math.floor(Math.random()*(max-min+1))+min;
  let ans;
  if      (op==='+') ans = a+b;
  else if (op==='-') { if(a<b)[a,b]=[b,a]; ans=a-b; }
  else if (op==='×') ans = a*b;
  else if (op==='÷') { ans=a; a=a*b; }
  return { q:`${a} ${op} ${b} = ?`, ans:String(ans) };
}

/* ── MODAL INTERACTIONS ── */
function initModalGame(overlay) {

  /* QUIZ options */
  overlay.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.disabled) return;
      overlay.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
      const correct = window._quiz.questions[window._quiz.current-1] || window._quiz.questions[window._quiz.current];
      const answerKey = window._quiz.questions[window._quiz.current]?.ans || window._quiz.questions[window._quiz.current-1]?.ans;
      // simpler direct approach:
      const q = window._quiz.questions[window._quiz.current];
      if (!q) return;
      const fb = overlay.querySelector('#qfeedback');
      if (this.dataset.opt === q.ans) {
        this.classList.add('correct');
        window._quiz.score++;
        if(fb){fb.textContent='✅ Correct!';fb.className='quiz-feedback correct';fb.style.display='block';}
      } else {
        this.classList.add('wrong');
        if(fb){fb.textContent=`❌ Answer: ${q.ans}`;fb.className='quiz-feedback wrong';fb.style.display='block';}
        overlay.querySelectorAll('.quiz-option').forEach(b=>{ if(b.dataset.opt===q.ans) b.classList.add('correct'); });
      }
      window._quiz.current++;
      setTimeout(() => {
        overlay.querySelector('.modal-box').innerHTML = '<button class="modal-close" aria-label="Close">✕</button>' + renderQuizQ();
        initModalGame(overlay);
      }, 1300);
    });
  });

  /* FILL-IN */
  const fillinBtn   = overlay.querySelector('#fillinSubmit');
  const fillinInput = overlay.querySelector('#fillinInput');
  if (fillinBtn && fillinInput) {
    fillinInput.focus();
    const checkFillin = () => {
      const val = fillinInput.value.trim();
      if (!val) return;
      const q  = window._fillin.questions[window._fillin.current];
      if (!q) return;
      const fb = overlay.querySelector('#qfeedback');
      if (val.toLowerCase() === q.ans.toLowerCase()) {
        window._fillin.score++;
        if(fb){fb.textContent='✅ Correct!';fb.className='quiz-feedback correct';fb.style.display='block';}
      } else {
        if(fb){fb.textContent=`❌ Answer: ${q.ans}`;fb.className='quiz-feedback wrong';fb.style.display='block';}
      }
      fillinBtn.disabled = true;
      window._fillin.current++;
      setTimeout(() => {
        overlay.querySelector('.modal-box').innerHTML = '<button class="modal-close" aria-label="Close">✕</button>' + renderFillinQ();
        initModalGame(overlay);
      }, 1300);
    };
    fillinBtn.addEventListener('click', checkFillin);
    fillinInput.addEventListener('keydown', e => { if(e.key==='Enter') checkFillin(); });
  }

  /* DRAG & DROP */
  let dragging = null;
  overlay.querySelectorAll('.drag-item').forEach(item => {
    item.addEventListener('dragstart', () => { dragging=item; setTimeout(()=>item.style.opacity='.4',0); });
    item.addEventListener('dragend',   () => { item.style.opacity='1'; dragging=null; });
  });
  overlay.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('drag-over');
      if (!dragging) return;
      // Return previous item to pool if zone occupied
      const prev = zone.querySelector('.drag-item');
      if (prev) document.getElementById('dragPool').appendChild(prev);
      zone.appendChild(dragging);
      zone.classList.add('has-item');
    });
  });
  const dragCheck = overlay.querySelector('#dragCheck');
  if (dragCheck) {
    dragCheck.addEventListener('click', () => {
      let correct=0, total=0;
      overlay.querySelectorAll('.drop-zone').forEach(zone => {
        const item = zone.querySelector('.drag-item');
        if (item) {
          total++;
          if (item.dataset.val === zone.dataset.answer) { correct++; zone.style.borderColor='var(--accent-green)'; }
          else zone.style.borderColor='#e53935';
        }
      });
      const fb = overlay.querySelector('#qfeedback');
      if(fb){
        fb.textContent = correct===total ? `🎉 Perfect! All ${total} matched!` : `${correct} of ${total} correct!`;
        fb.className   = 'quiz-feedback '+(correct===total?'correct':'wrong');
        fb.style.display='block';
      }
    });
  }

  /* TIMED */
  const timedInput = overlay.querySelector('#timedInput');
  if (timedInput && !_timerInterval) {
    timedInput.focus();
    const totalSecs = window._timed.config.seconds;
    let remaining   = totalSecs;
    const timerDisp = overlay.querySelector('#timerDisplay');
    const timerFill = overlay.querySelector('#timerFill');

    _timerInterval = setInterval(() => {
      remaining--;
      if(timerDisp) timerDisp.textContent = remaining;
      if(timerFill) {
        timerFill.style.width = (remaining/totalSecs*100)+'%';
        timerFill.classList.remove('warning','danger');
        if(remaining<=5)       timerFill.classList.add('danger');
        else if(remaining<=15) timerFill.classList.add('warning');
      }
      if (remaining <= 0) {
        stopTimer();
        overlay.querySelector('.modal-box').innerHTML = '<button class="modal-close" aria-label="Close">✕</button>'
          + renderResults(window._timed.score, Math.max(window._timed.total,1), 'timed');
        initModalGame(overlay);
      }
    }, 1000);

    const checkTimed = () => {
      const val = timedInput.value.trim();
      if (!val) return;
      const fb = overlay.querySelector('#qfeedback');
      window._timed.total++;
      if (val === window._timed.current.ans) {
        window._timed.score++;
        if(fb){fb.textContent='✅';fb.className='quiz-feedback correct';fb.style.display='block';}
      } else {
        if(fb){fb.textContent=`❌ ${window._timed.current.ans}`;fb.className='quiz-feedback wrong';fb.style.display='block';}
      }
      timedInput.value='';
      const nq = generateTimedQ();
      window._timed.current = nq;
      const qEl = overlay.querySelector('#timedQ');
      if(qEl) qEl.textContent = nq.q;
      const sc = overlay.querySelector('#timedScore');
      if(sc) sc.textContent = `Score: ${window._timed.score} | Answered: ${window._timed.total}`;
      setTimeout(()=>{ if(fb) fb.style.display='none'; }, 500);
    };
    timedInput.addEventListener('keydown', e=>{ if(e.key==='Enter') checkTimed(); });
  }
}

/* ── RESULTS ── */
function renderResults(score, total, gameType) {
  stopTimer();
  const pct   = Math.round((score/total)*100);
  const stars = pct>=90?'⭐⭐⭐':pct>=60?'⭐⭐':'⭐';
  const msg   = pct>=90?"🎉 Amazing! You're a Math Star!":pct>=60?"👍 Great work! Keep it up!":"💪 Keep practising — you'll get there!";
  return `
    <div class="result-box">
      <div class="result-stars">${stars}</div>
      <div class="result-score">${pct}%</div>
      <div style="font-size:.95rem;color:var(--text-mid);margin:6px 0 12px;">Score: ${score} / ${total}</div>
      <div class="result-msg">${msg}</div>
      <div class="result-btns">
        <button class="btn btn-purple" onclick="closeModal()">Done ✓</button>
      </div>
    </div>`;
}
