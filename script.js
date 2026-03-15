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
     3. FADE-IN ANIMATIONS
  ────────────────────────────────────── */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });

  document.querySelectorAll('.topic-card, .topic-card-new, .game-card, .lesson-card, .value-card, .rec-card')
    .forEach(el => { el.classList.add('fade-in'); observer.observe(el); });

  /* ──────────────────────────────────────
     4. INIT GAMES
  ────────────────────────────────────── */
  initGames();
});

/* ══════════════════════════════════════
   GAME DATA BANK
══════════════════════════════════════ */
const GAME_DATA = {

  /* ── ARITHMETIC ───────────────────── */
  arithmetic: {
    beginner: {
      quiz: [
        { q:"What is 3 + 4?",           opts:["5","6","7","8"],         ans:"7"  },
        { q:"What is 9 - 3?",           opts:["4","5","6","7"],         ans:"6"  },
        { q:"What is 2 × 5?",           opts:["8","9","10","11"],       ans:"10" },
        { q:"What is 8 ÷ 2?",           opts:["2","3","4","5"],         ans:"4"  },
        { q:"What is 6 + 7?",           opts:["11","12","13","14"],     ans:"13" },
        { q:"What is 15 - 8?",          opts:["5","6","7","8"],         ans:"7"  },
        { q:"What is 4 × 3?",           opts:["10","11","12","13"],     ans:"12" },
        { q:"What is 10 ÷ 5?",          opts:["1","2","3","4"],         ans:"2"  },
      ],
      fillin: [
        { q:"5 + ___ = 9",   ans:"4" },
        { q:"___ + 3 = 8",   ans:"5" },
        { q:"10 - ___ = 6",  ans:"4" },
        { q:"2 × ___ = 6",   ans:"3" },
        { q:"12 ÷ ___ = 4",  ans:"3" },
        { q:"7 + ___ = 15",  ans:"8" },
        { q:"___ - 4 = 5",   ans:"9" },
      ],
      drag: [{ instruction:"Match each sum to its answer", pairs:[["3+3","6"],["2+5","7"],["4+4","8"],["5+5","10"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    elementary: {
      quiz: [
        { q:"What is 23 + 45?",        opts:["56","67","68","78"],     ans:"68" },
        { q:"What is 72 - 38?",        opts:["24","34","44","54"],     ans:"34" },
        { q:"What is 6 × 7?",          opts:["36","40","42","48"],     ans:"42" },
        { q:"What is 56 ÷ 8?",         opts:["5","6","7","8"],         ans:"7"  },
        { q:"What is 15% of 100?",     opts:["10","15","20","25"],     ans:"15" },
        { q:"What is 9 × 8?",          opts:["63","72","81","56"],     ans:"72" },
        { q:"What is 132 ÷ 11?",       opts:["10","11","12","13"],     ans:"12" },
        { q:"What is 25% of 80?",      opts:["15","20","25","30"],     ans:"20" },
      ],
      fillin: [
        { q:"25 + ___ = 60",  ans:"35" },
        { q:"___ × 9 = 63",   ans:"7"  },
        { q:"100 - ___ = 37", ans:"63" },
        { q:"81 ÷ ___ = 9",   ans:"9"  },
        { q:"50% of 60 = ___",ans:"30" },
      ],
      drag: [{ instruction:"Match multiplication to answer", pairs:[["6×6","36"],["7×8","56"],["9×4","36"],["5×9","45"]] }],
      timed: { ops:["+","-","×"], range:[1,20], seconds:30 }
    },
    intermediate: {
      quiz: [
        { q:"What is 3/4 + 1/4?",         opts:["1/2","1","3/8","4/4"],  ans:"1"  },
        { q:"What is 15% of 200?",         opts:["20","25","30","35"],    ans:"30" },
        { q:"What is 2³?",                 opts:["4","6","8","10"],       ans:"8"  },
        { q:"What is √144?",               opts:["11","12","13","14"],    ans:"12" },
        { q:"What is the LCM of 4 and 6?", opts:["8","10","12","16"],     ans:"12" },
        { q:"What is 2/5 of 50?",          opts:["10","15","20","25"],    ans:"20" },
        { q:"What is 3² + 4²?",            opts:["14","25","49","7"],     ans:"25" },
      ],
      fillin: [
        { q:"2/3 of 90 = ___",  ans:"60" },
        { q:"___ % of 50 = 25", ans:"50" },
        { q:"√___ = 7",         ans:"49" },
        { q:"3/5 of 100 = ___", ans:"60" },
      ],
      drag: [{ instruction:"Match fraction to decimal", pairs:[["1/2","0.5"],["1/4","0.25"],["3/4","0.75"],["1/5","0.2"]] }],
      timed: { ops:["+","-","×","÷"], range:[1,50], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"What is 2⁸?",                 opts:["128","256","512","1024"], ans:"256"  },
        { q:"GCD of 36 and 48?",           opts:["6","8","10","12"],        ans:"12"   },
        { q:"Express 0.375 as a fraction", opts:["1/4","3/8","2/5","5/8"], ans:"3/8"  },
        { q:"What is 7! (factorial)?",     opts:["2520","5040","720","840"],ans:"5040" },
        { q:"What is log₁₀(1000)?",        opts:["2","3","4","10"],         ans:"3"    },
        { q:"What is √(2²+3²)?",           opts:["√5","√13","5","13"],      ans:"√13"  },
      ],
      fillin: [
        { q:"5! = ___",        ans:"120" },
        { q:"log₂(64) = ___",  ans:"6"   },
        { q:"GCD(60,90) = ___",ans:"30"  },
        { q:"2¹⁰ = ___",       ans:"1024"},
      ],
      drag: [{ instruction:"Match power to value", pairs:[["3⁴","81"],["2⁵","32"],["10³","1000"],["4³","64"]] }],
      timed: { ops:["+","-","×","÷"], range:[1,100], seconds:30 }
    },
    university: {
      quiz: [
        { q:"Which series converges?",           opts:["Σ 1/n","Σ 1/n²","Σ n","Σ 2ⁿ"],    ans:"Σ 1/n²" },
        { q:"Sum of Σ(1/2)ⁿ for n=1→∞?",        opts:["1","2","1/2","∞"],                 ans:"1"      },
        { q:"17 mod 5 = ?",                      opts:["1","2","3","4"],                   ans:"2"      },
        { q:"What is ⌊π⌋?",                      opts:["2","3","4","π"],                   ans:"3"      },
        { q:"Euler's number e ≈ ?",              opts:["2.718","3.141","1.618","1.414"],   ans:"2.718"  },
        { q:"What is ⌈2.3⌉?",                    opts:["2","3","4","2.3"],                 ans:"3"      },
      ],
      fillin: [
        { q:"17 mod 5 = ___", ans:"2" },
        { q:"⌈2.3⌉ = ___",    ans:"3" },
        { q:"0! = ___",       ans:"1" },
        { q:"⌊4.9⌋ = ___",    ans:"4" },
      ],
      drag: [{ instruction:"Match notation to meaning", pairs:[["⌊x⌋","floor"],["⌈x⌉","ceiling"],["x!","factorial"],["Σ","summation"]] }],
      timed: { ops:["+","-","×","÷"], range:[1,200], seconds:30 }
    }
  },

  /* ── ALGEBRA ──────────────────────── */
  algebra: {
    beginner: {
      quiz: [
        { q:"If x + 3 = 7, x = ?",    opts:["2","3","4","5"],            ans:"4"  },
        { q:"If 2x = 10, x = ?",      opts:["3","4","5","6"],            ans:"5"  },
        { q:"3x when x = 4 is?",      opts:["7","10","12","15"],         ans:"12" },
        { q:"If x - 5 = 3, x = ?",    opts:["6","7","8","9"],            ans:"8"  },
        { q:"Simplify: 2x + 3x",      opts:["5x","6x","5","6"],          ans:"5x" },
        { q:"If x/2 = 6, x = ?",      opts:["3","6","10","12"],          ans:"12" },
        { q:"4x when x = 3 is?",      opts:["7","10","12","16"],         ans:"12" },
      ],
      fillin: [
        { q:"x + 4 = 9  → x = ___", ans:"5"  },
        { q:"3x = 15    → x = ___", ans:"5"  },
        { q:"x - 7 = 2  → x = ___", ans:"9"  },
        { q:"x/4 = 3   → x = ___",  ans:"12" },
      ],
      drag: [{ instruction:"Solve and match to answer", pairs:[["x+2=5","3"],["2x=8","4"],["x-1=6","7"],["x/3=4","12"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    elementary: {
      quiz: [
        { q:"Solve: 3x - 2 = 10",        opts:["2","3","4","5"],                         ans:"4"       },
        { q:"Expand: 2(x + 3)",           opts:["2x+3","2x+6","x+6","x+3"],              ans:"2x+6"    },
        { q:"If y = 2x and x=5, y = ?",  opts:["5","8","10","12"],                       ans:"10"      },
        { q:"Factorise: 6x + 9",          opts:["3(2x+3)","2(3x+9)","3(x+3)","6(x+3)"], ans:"3(2x+3)" },
        { q:"Solve: x/4 = 3",             opts:["3","7","12","15"],                       ans:"12"      },
        { q:"Simplify: 5x - 2x + x",     opts:["3x","4x","5x","6x"],                    ans:"4x"      },
      ],
      fillin: [
        { q:"2x + 5 = 13 → x = ___", ans:"4" },
        { q:"x² = 25     → x = ___", ans:"5" },
        { q:"3(x+2) = 15 → x = ___", ans:"3" },
      ],
      drag: [{ instruction:"Match term to simplification", pairs:[["3x+2x","5x"],["4y-y","3y"],["2a×3","6a"],["x²+x²","2x²"]] }],
      timed: { ops:["+","-","×"], range:[1,20], seconds:30 }
    },
    intermediate: {
      quiz: [
        { q:"Solve: x² - 5x + 6 = 0",     opts:["x=1,6","x=2,3","x=3,4","x=-2,-3"],  ans:"x=2,3"   },
        { q:"What is the gradient of y=3x+2?", opts:["2","3","5","1"],                 ans:"3"       },
        { q:"Solve: 2x + 3y = 12, x=3",   opts:["y=1","y=2","y=3","y=4"],             ans:"y=2"     },
        { q:"Expand: (x+3)(x-2)",          opts:["x²+x-6","x²-x-6","x²+x+6","x²+5x-6"], ans:"x²+x-6" },
        { q:"If f(x)=2x+1, find f(4)",     opts:["7","8","9","10"],                    ans:"9"       },
      ],
      fillin: [
        { q:"y = mx + c: gradient is ___", ans:"m"  },
        { q:"(x+2)² = x² + 4x + ___",     ans:"4"  },
        { q:"Solve x² = 36: x = ___",      ans:"6"  },
      ],
      drag: [{ instruction:"Match equation to solution", pairs:[["x+5=12","7"],["3x=18","6"],["x²=49","7"],["2x-4=10","7"]] }],
      timed: { ops:["+","-","×"], range:[1,30], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"Solve: x² - 4 = 0",           opts:["x=±1","x=±2","x=±4","x=4"],           ans:"x=±2"   },
        { q:"What is the discriminant of ax²+bx+c?", opts:["b²-4ac","b²+4ac","2b-4ac","b-4ac"], ans:"b²-4ac" },
        { q:"Logs: log₂(8) = ?",            opts:["2","3","4","8"],                       ans:"3"      },
        { q:"Solve: eˣ = e³",               opts:["x=1","x=2","x=3","x=e"],               ans:"x=3"    },
        { q:"What is the vertex of y=x²-4x+3?", opts:["(2,-1)","(1,0)","(4,3)","(2,1)"], ans:"(2,-1)" },
      ],
      fillin: [
        { q:"log₁₀(100) = ___",    ans:"2"  },
        { q:"log_a(a) = ___",      ans:"1"  },
        { q:"Sum of roots: x²-5x+6, sum = ___", ans:"5" },
      ],
      drag: [{ instruction:"Match function to type", pairs:[["y=2x+1","linear"],["y=x²","quadratic"],["y=2ˣ","exponential"],["y=1/x","reciprocal"]] }],
      timed: { ops:["+","-","×","÷"], range:[1,50], seconds:30 }
    },
    university: {
      quiz: [
        { q:"What is a vector space?",       opts:["set with + and ×","set of numbers","matrix set","group of vectors"], ans:"set with + and ×" },
        { q:"Eigenvalue satisfies:",         opts:["Av=λv","Av=v","λv=0","Av=0"],                                       ans:"Av=λv"           },
        { q:"det([[1,2],[3,4]]) = ?",        opts:["-2","-3","2","10"],                                                  ans:"-2"              },
        { q:"What is a bijective function?", opts:["one-to-one only","onto only","both one-to-one and onto","neither"],  ans:"both one-to-one and onto" },
      ],
      fillin: [
        { q:"Identity matrix diagonal values = ___", ans:"1" },
        { q:"det(I) = ___",                          ans:"1" },
      ],
      drag: [{ instruction:"Match term to definition", pairs:[["injective","one-to-one"],["surjective","onto"],["bijective","both"],["domain","input set"]] }],
      timed: { ops:["+","-","×"], range:[1,100], seconds:30 }
    }
  },

  /* ── GEOMETRY ─────────────────────── */
  geometry: {
    beginner: {
      quiz: [
        { q:"Sides of a triangle?",           opts:["2","3","4","5"],                                        ans:"3"             },
        { q:"Perimeter of square, side=4?",   opts:["8","12","16","20"],                                     ans:"16"            },
        { q:"Degrees in a right angle?",      opts:["45","60","90","180"],                                   ans:"90"            },
        { q:"Area of rectangle 3×5?",         opts:["8","12","15","16"],                                     ans:"15"            },
        { q:"A circle's boundary is called?", opts:["diameter","radius","perimeter","circumference"],        ans:"circumference" },
        { q:"How many sides does a hexagon have?", opts:["4","5","6","7"],                                   ans:"6"             },
      ],
      fillin: [
        { q:"Perimeter of square, side=6: ___", ans:"24"  },
        { q:"Area of rectangle 4×7 = ___",      ans:"28"  },
        { q:"Angles in a triangle add to ___ °",ans:"180" },
        { q:"A square has ___ sides",           ans:"4"   },
      ],
      drag: [{ instruction:"Match shape to number of sides", pairs:[["Triangle","3"],["Square","4"],["Pentagon","5"],["Hexagon","6"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    elementary: {
      quiz: [
        { q:"Area of triangle base=6, height=4?", opts:["10","12","14","24"],               ans:"12"   },
        { q:"Circumference of circle, r=7 (π≈3.14)?", opts:["21.98","43.96","22","44"],    ans:"43.96"},
        { q:"What is a right angle?",              opts:["45°","60°","90°","180°"],          ans:"90°"  },
        { q:"Sum of angles in a quadrilateral?",   opts:["180°","270°","360°","540°"],       ans:"360°" },
        { q:"Perimeter of rectangle 5×3?",         opts:["8","15","16","18"],               ans:"16"   },
      ],
      fillin: [
        { q:"Area of circle r=5 (π≈3.14) = ___", ans:"78.5" },
        { q:"Area of triangle b=8 h=5 = ___",    ans:"20"   },
        { q:"Perimeter of rectangle 6×4 = ___",  ans:"20"   },
      ],
      drag: [{ instruction:"Match formula to shape", pairs:[["πr²","circle area"],["b×h÷2","triangle area"],["l×w","rectangle area"],["4s","square perimeter"]] }],
      timed: { ops:["+","×"], range:[1,20], seconds:30 }
    },
    intermediate: {
      quiz: [
        { q:"Pythagoras: a=3, b=4, c = ?",       opts:["5","6","7","8"],             ans:"5"    },
        { q:"Area of trapezium, a=5,b=7,h=4?",   opts:["20","24","28","48"],         ans:"24"   },
        { q:"Volume of cuboid 2×3×4?",            opts:["9","18","24","48"],          ans:"24"   },
        { q:"Interior angle sum of pentagon?",    opts:["360°","450°","540°","720°"], ans:"540°" },
        { q:"Diagonal of square side=5?",         opts:["5","5√2","10","25"],         ans:"5√2"  },
      ],
      fillin: [
        { q:"Pythagoras: 5²+12² = ___²", ans:"13"  },
        { q:"Surface area cube side=3 = ___", ans:"54" },
      ],
      drag: [{ instruction:"Match 3D shape to volume formula", pairs:[["Cube","s³"],["Cylinder","πr²h"],["Cone","⅓πr²h"],["Sphere","⁴⁄₃πr³"]] }],
      timed: { ops:["+","×"], range:[1,30], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"sin²x + cos²x = ?",              opts:["0","1","2","sin2x"],           ans:"1"     },
        { q:"Area of sector angle=90°, r=4?", opts:["4π","8π","12π","16π"],         ans:"4π"    },
        { q:"What is the equation of a circle centre (0,0) radius r?", opts:["x+y=r","x²+y²=r","x²+y²=r²","x²-y²=r²"], ans:"x²+y²=r²" },
        { q:"Angle in a semicircle is?",       opts:["45°","60°","90°","180°"],      ans:"90°"   },
      ],
      fillin: [
        { q:"Arc length = rθ, r=5 θ=2 → ___", ans:"10"   },
        { q:"Area of sector = ½r²θ, r=4 θ=π/2 → ___", ans:"4π" },
      ],
      drag: [{ instruction:"Match theorem to description", pairs:[["Pythagoras","a²+b²=c²"],["Thales","angle in semicircle=90°"],["Sine rule","a/sinA=b/sinB"],["Cosine rule","c²=a²+b²-2ab cosC"]] }],
      timed: { ops:["+","×"], range:[1,50], seconds:30 }
    },
    university: {
      quiz: [
        { q:"What is a manifold?",              opts:["flat plane","locally Euclidean space","any curved surface","a polygon"], ans:"locally Euclidean space" },
        { q:"Gaussian curvature of a sphere?",  opts:["0","negative","positive","undefined"],                                  ans:"positive"               },
        { q:"What is a geodesic?",              opts:["shortest path on surface","longest path","straight line only","a circle"], ans:"shortest path on surface" },
      ],
      fillin: [
        { q:"Euler characteristic of sphere = ___", ans:"2" },
        { q:"Sum of angles in spherical triangle > ___ °", ans:"180" },
      ],
      drag: [{ instruction:"Match geometry type to property", pairs:[["Euclidean","flat, parallel lines never meet"],["Spherical","positive curvature"],["Hyperbolic","negative curvature"],["Projective","no parallel lines"]] }],
      timed: { ops:["+","×"], range:[1,30], seconds:30 }
    }
  },

  /* ── STATISTICS ───────────────────── */
  statistics: {
    beginner: {
      quiz: [
        { q:"Mean of 2, 4, 6?",              opts:["3","4","5","6"],       ans:"4" },
        { q:"Median of 1,3,5,7,9?",          opts:["3","4","5","6"],       ans:"5" },
        { q:"Mode of 2,3,3,4,5?",            opts:["2","3","4","5"],       ans:"3" },
        { q:"Range of 2,8,4,1?",             opts:["5","6","7","8"],       ans:"7" },
        { q:"Which chart shows parts of a whole?", opts:["bar chart","line graph","pie chart","scatter plot"], ans:"pie chart" },
        { q:"Mean of 10, 20, 30?",           opts:["15","20","25","30"],   ans:"20" },
      ],
      fillin: [
        { q:"Mean of 10,20,30 = ___",      ans:"20" },
        { q:"Median of 3,5,7,9,11 = ___",  ans:"7"  },
        { q:"Range of 5,15 = ___",         ans:"10" },
        { q:"Mode of 1,2,2,3,4 = ___",     ans:"2"  },
      ],
      drag: [{ instruction:"Match term to definition", pairs:[["Mean","average"],["Median","middle value"],["Mode","most frequent"],["Range","max minus min"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    elementary: {
      quiz: [
        { q:"Mean of 5,10,15,20?",           opts:["10","12","12.5","15"],   ans:"12.5" },
        { q:"Median of 3,5,8,12?",           opts:["5","6","6.5","8"],       ans:"6.5"  },
        { q:"Which shows trend over time?",  opts:["bar chart","line graph","pie chart","tally chart"], ans:"line graph" },
        { q:"What is an outlier?",           opts:["most common value","middle value","value far from others","the mean"], ans:"value far from others" },
      ],
      fillin: [
        { q:"Mean of 4,8,12,16 = ___", ans:"10" },
        { q:"Median of 2,4,6,8 = ___", ans:"5"  },
      ],
      drag: [{ instruction:"Match chart to best use", pairs:[["Bar chart","comparing categories"],["Line graph","showing trends"],["Pie chart","parts of a whole"],["Scatter plot","correlation"]] }],
      timed: { ops:["+","-"], range:[1,20], seconds:30 }
    },
    intermediate: {
      quiz: [
        { q:"IQR = Q3 - Q1. If Q1=10, Q3=25, IQR=?", opts:["10","15","20","35"], ans:"15" },
        { q:"Standard deviation measures?",           opts:["average","spread","middle","frequency"],  ans:"spread" },
        { q:"Correlation coefficient range?",         opts:["0 to 1","-1 to 0","-1 to 1","0 to 100"], ans:"-1 to 1" },
        { q:"Positive correlation means?",            opts:["both increase","both decrease","one increases, one decreases","no relationship"], ans:"both increase" },
      ],
      fillin: [
        { q:"IQR = Q3 - Q1. Q1=5, Q3=20, IQR = ___", ans:"15" },
        { q:"Strong correlation is close to ___",      ans:"1"  },
      ],
      drag: [{ instruction:"Match correlation to description", pairs:[["r=0.9","strong positive"],["r=-0.9","strong negative"],["r=0","no correlation"],["r=0.4","weak positive"]] }],
      timed: { ops:["+","-"], range:[1,30], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"What is a normal distribution?",       opts:["skewed left","bell-shaped symmetric","uniform","bimodal"],                   ans:"bell-shaped symmetric" },
        { q:"In a normal distribution, mean=median=?", opts:["range","mode","variance","IQR"],                                          ans:"mode"                  },
        { q:"Hypothesis test: p < 0.05 means?",     opts:["accept null","reject null","inconclusive","not significant"],               ans:"reject null"            },
        { q:"What does r² (R-squared) measure?",    opts:["correlation","goodness of fit","variance","standard deviation"],            ans:"goodness of fit"        },
      ],
      fillin: [
        { q:"z = (x - μ) / σ is the ___ formula", ans:"z-score"    },
        { q:"95% confidence interval uses z = ___", ans:"1.96"     },
      ],
      drag: [{ instruction:"Match term to meaning", pairs:[["μ","population mean"],["σ","standard deviation"],["n","sample size"],["H₀","null hypothesis"]] }],
      timed: { ops:["+","-","×"], range:[1,50], seconds:30 }
    },
    university: {
      quiz: [
        { q:"Central Limit Theorem states sample means are?", opts:["uniform","normally distributed","always equal","skewed"],                        ans:"normally distributed" },
        { q:"Type I error is?",                               opts:["false negative","false positive","correct rejection","correct acceptance"],       ans:"false positive"       },
        { q:"Chi-squared test is used for?",                  opts:["means","variances","categorical data","correlation"],                             ans:"categorical data"     },
        { q:"ANOVA tests differences in?",                    opts:["proportions","means of 2 groups","means of 3+ groups","variances"],               ans:"means of 3+ groups"   },
      ],
      fillin: [
        { q:"P(Type I error) = significance level = ___", ans:"α" },
        { q:"Degrees of freedom for t-test = n - ___",   ans:"1" },
      ],
      drag: [{ instruction:"Match test to use case", pairs:[["t-test","compare 2 means"],["ANOVA","compare 3+ means"],["chi-squared","categorical data"],["z-test","large samples"]] }],
      timed: { ops:["+","-"], range:[1,100], seconds:30 }
    }
  },

  /* ── PROBABILITY ──────────────────── */
  probability: {
    beginner: {
      quiz: [
        { q:"A coin flip — probability of heads?",     opts:["1/4","1/3","1/2","1"],                              ans:"1/2"        },
        { q:"P(impossible event) = ?",                 opts:["0","0.5","1","2"],                                  ans:"0"          },
        { q:"P(certain event) = ?",                    opts:["0","0.5","1","2"],                                  ans:"1"          },
        { q:"Roll a die — how many outcomes?",         opts:["4","5","6","7"],                                    ans:"6"          },
        { q:"P(rolling a 3 on a fair die) = ?",        opts:["1/3","1/4","1/6","1/2"],                            ans:"1/6"        },
        { q:"Which word means 'very unlikely'?",       opts:["certain","probable","unlikely","impossible"],       ans:"unlikely"   },
      ],
      fillin: [
        { q:"P(head on coin) = ___",          ans:"1/2" },
        { q:"P(impossible) = ___",            ans:"0"   },
        { q:"P(certain) = ___",               ans:"1"   },
        { q:"Outcomes on a die: ___",         ans:"6"   },
      ],
      drag: [{ instruction:"Match event to likelihood", pairs:[["Sun rising tomorrow","certain"],["Rolling 7 on a die","impossible"],["Flipping heads","equally likely"],["It raining next year","likely"]] }],
      timed: { ops:["+","-"], range:[1,6], seconds:30 }
    },
    elementary: {
      quiz: [
        { q:"Bag has 3 red, 2 blue balls. P(red) = ?",  opts:["1/5","2/5","3/5","4/5"],                           ans:"3/5"  },
        { q:"P(not red) if P(red)=0.4 is?",             opts:["0.4","0.5","0.6","0.7"],                           ans:"0.6"  },
        { q:"P(A or B) if mutually exclusive, P(A)=0.3, P(B)=0.4?", opts:["0.1","0.3","0.7","1.2"],              ans:"0.7"  },
        { q:"Experimental probability uses?",           opts:["theory","formulas","actual results","guessing"],   ans:"actual results" },
        { q:"Bag has 10 balls: 4 green, rest red. P(green) = ?", opts:["2/5","3/5","4/10","both 2/5 and 4/10"],  ans:"both 2/5 and 4/10" },
      ],
      fillin: [
        { q:"P(not A) = 1 - ___",       ans:"P(A)" },
        { q:"3 red out of 12 total: P(red) = ___", ans:"1/4" },
        { q:"P(A)+P(not A) = ___",      ans:"1"    },
      ],
      drag: [{ instruction:"Match probability value to description", pairs:[["0","impossible"],["0.5","equally likely"],["1","certain"],["0.9","very likely"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    intermediate: {
      quiz: [
        { q:"P(A and B) if independent, P(A)=0.5, P(B)=0.4?",  opts:["0.1","0.2","0.9","1.0"],                  ans:"0.2"  },
        { q:"P(A or B) = P(A)+P(B)-P(A∩B). P(A)=0.3,P(B)=0.5,P(A∩B)=0.1?", opts:["0.7","0.8","0.9","1.0"],    ans:"0.7"  },
        { q:"Two dice: P(both show 6)?",                        opts:["1/6","1/12","1/36","1/3"],                 ans:"1/36" },
        { q:"A tree diagram helps find?",                       opts:["one event","combined event probabilities","averages","medians"], ans:"combined event probabilities" },
        { q:"P(A|B) means?",                                    opts:["P(A) × P(B)","P(A given B)","P(B given A)","P(A) + P(B)"],    ans:"P(A given B)" },
      ],
      fillin: [
        { q:"P(A∩B) = P(A) × P(B) when events are ___", ans:"independent" },
        { q:"P(A∪B) = P(A)+P(B) when events are ___",   ans:"mutually exclusive" },
        { q:"Two coins: P(both heads) = ___",            ans:"1/4" },
      ],
      drag: [{ instruction:"Match rule to formula", pairs:[["Complement","P(A')=1-P(A)"],["Multiplication","P(A∩B)=P(A)×P(B)"],["Addition","P(A∪B)=P(A)+P(B)-P(A∩B)"],["Conditional","P(A|B)=P(A∩B)/P(B)"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"Bayes' theorem: P(A|B) = ?",               opts:["P(B|A)P(A)/P(B)","P(A)P(B)","P(A)+P(B)","P(B)/P(A)"], ans:"P(B|A)P(A)/P(B)" },
        { q:"⁵P₂ (permutations) = ?",                   opts:["10","15","20","25"],                                   ans:"20"              },
        { q:"⁵C₂ (combinations) = ?",                   opts:["5","10","15","20"],                                    ans:"10"              },
        { q:"How many ways to arrange 4 items?",        opts:["4","8","16","24"],                                     ans:"24"              },
        { q:"Lottery: choose 6 from 49. Uses?",         opts:["permutations","combinations","both","neither"],        ans:"combinations"    },
      ],
      fillin: [
        { q:"nPr = n! / (n-r)!. ⁴P₂ = ___", ans:"12"   },
        { q:"nCr = n! / r!(n-r)!. ⁴C₂ = ___", ans:"6"  },
        { q:"3! = ___",                        ans:"6"   },
      ],
      drag: [{ instruction:"Match to permutation or combination", pairs:[["Order matters","permutation"],["Order doesn't matter","combination"],["PIN code","permutation"],["Choosing a team","combination"]] }],
      timed: { ops:["+","×"], range:[1,10], seconds:30 }
    },
    university: {
      quiz: [
        { q:"E(X) for discrete X means?",              opts:["variance","standard deviation","expected value","median"],                  ans:"expected value"    },
        { q:"X~B(10, 0.5): what is E(X)?",            opts:["2","4","5","10"],                                                           ans:"5"                 },
        { q:"Normal distribution is symmetric about?", opts:["mode only","median only","mean only","mean=median=mode"],                  ans:"mean=median=mode"  },
        { q:"P(Z < 0) for standard normal = ?",        opts:["0","0.25","0.5","1"],                                                      ans:"0.5"               },
        { q:"Var(X) = E(X²) - ?",                      opts:["E(X)","[E(X)]²","E(X)²","2E(X)"],                                         ans:"[E(X)]²"           },
      ],
      fillin: [
        { q:"E(aX+b) = aE(X) + ___", ans:"b"      },
        { q:"Var(aX) = a² × ___",    ans:"Var(X)" },
        { q:"For X~N(μ,σ²): z = (x-μ)/___", ans:"σ" },
      ],
      drag: [{ instruction:"Match distribution to parameter", pairs:[["Binomial","n and p"],["Normal","μ and σ²"],["Poisson","λ"],["Uniform","a and b"]] }],
      timed: { ops:["+","×"], range:[1,20], seconds:30 }
    }
  },

  /* ── TRIGONOMETRY ─────────────────── */
  trigonometry: {
    beginner: {
      quiz: [
        { q:"What does SOH stand for?",         opts:["sin=opp/hyp","sin=adj/hyp","sin=opp/adj","sin=hyp/opp"],  ans:"sin=opp/hyp" },
        { q:"What does CAH stand for?",         opts:["cos=opp/hyp","cos=adj/hyp","cos=opp/adj","cos=hyp/adj"],  ans:"cos=adj/hyp" },
        { q:"What does TOA stand for?",         opts:["tan=opp/adj","tan=adj/opp","tan=opp/hyp","tan=hyp/opp"],  ans:"tan=opp/adj" },
        { q:"In a right triangle, the longest side is?", opts:["adjacent","opposite","hypotenuse","base"],       ans:"hypotenuse"  },
        { q:"Trigonometry deals with?",         opts:["circles only","triangles and angles","squares","graphs"], ans:"triangles and angles" },
      ],
      fillin: [
        { q:"sin = opposite / ___",  ans:"hypotenuse" },
        { q:"cos = ___ / hypotenuse",ans:"adjacent"   },
        { q:"tan = opposite / ___",  ans:"adjacent"   },
      ],
      drag: [{ instruction:"Match ratio to trig function", pairs:[["opp/hyp","sin"],["adj/hyp","cos"],["opp/adj","tan"],["hyp/opp","cosec"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    intermediate: {
      quiz: [
        { q:"sin(90°) = ?",          opts:["0","0.5","1","-1"],         ans:"1"   },
        { q:"cos(0°) = ?",           opts:["0","0.5","1","-1"],         ans:"1"   },
        { q:"tan(45°) = ?",          opts:["0","0.5","1","√2"],         ans:"1"   },
        { q:"sin²x + cos²x = ?",     opts:["0","1","2","sin2x"],        ans:"1"   },
        { q:"sin(30°) = ?",          opts:["1/4","1/3","1/2","√3/2"],  ans:"1/2" },
        { q:"cos(60°) = ?",          opts:["√3/2","1/2","1","0"],       ans:"1/2" },
        { q:"tan(0°) = ?",           opts:["0","1","undefined","-1"],   ans:"0"   },
      ],
      fillin: [
        { q:"sin(0°) = ___",   ans:"0"   },
        { q:"cos(90°) = ___",  ans:"0"   },
        { q:"tan(0°) = ___",   ans:"0"   },
        { q:"sin(60°) = ___",  ans:"√3/2"},
      ],
      drag: [{ instruction:"Match angle to sin value", pairs:[["0°","0"],["30°","0.5"],["90°","1"],["180°","0"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"sin(2x) = ?",             opts:["2sinx","2sinxcosx","sin²x+cos²x","2cos²x-1"],         ans:"2sinxcosx"    },
        { q:"Sine rule: a/sinA = ?",   opts:["b/sinA","b/sinB","sinB/b","a/sinB"],                  ans:"b/sinB"       },
        { q:"Cosine rule: c² = ?",     opts:["a²+b²","a²+b²-2abcosC","a²-b²+2abcosC","a+b-c"],     ans:"a²+b²-2abcosC"},
        { q:"cos(2x) = ?",             opts:["2cosx","cos²x-sin²x","2cos²x","1-sin²x"],             ans:"cos²x-sin²x"  },
        { q:"tan(x) = sin(x)/cos(x), so tan(90°) = ?", opts:["0","1","undefined","-1"],             ans:"undefined"    },
      ],
      fillin: [
        { q:"cos²x + sin²x = ___",     ans:"1"             },
        { q:"sin(A+B) = sinAcosB + ___",ans:"cosAsinB"     },
        { q:"Amplitude of y=3sin(x) = ___", ans:"3"        },
      ],
      drag: [{ instruction:"Match identity to formula", pairs:[["Pythagorean","sin²x+cos²x=1"],["Double angle sin","sin2x=2sinxcosx"],["Double angle cos","cos2x=cos²x-sin²x"],["Quotient","tanx=sinx/cosx"]] }],
      timed: { ops:["+","-","×"], range:[1,20], seconds:30 }
    },
    university: {
      quiz: [
        { q:"What is the period of sin(x)?",   opts:["π","2π","π/2","4π"],              ans:"2π"        },
        { q:"Inverse sin is written as?",      opts:["sin⁻¹","1/sin","arcsin","both sin⁻¹ and arcsin"], ans:"both sin⁻¹ and arcsin" },
        { q:"Euler's formula: eⁱˣ = ?",        opts:["cosx+isinx","cosx-isinx","sinx+icosx","ixcosx"],  ans:"cosx+isinx" },
        { q:"What is a radian?",               opts:["half a degree","π degrees","angle subtended by arc=radius","360/π"], ans:"angle subtended by arc=radius" },
      ],
      fillin: [
        { q:"180° = ___ radians",    ans:"π"   },
        { q:"360° = ___ radians",    ans:"2π"  },
        { q:"90° = ___ radians",     ans:"π/2" },
      ],
      drag: [{ instruction:"Match degrees to radians", pairs:[["30°","π/6"],["45°","π/4"],["60°","π/3"],["90°","π/2"]] }],
      timed: { ops:["+","×"], range:[1,10], seconds:30 }
    }
  },

  /* ── CALCULUS ─────────────────────── */
  calculus: {
    intermediate: {
      quiz: [
        { q:"What does a derivative measure?",     opts:["area","rate of change","total","average"],     ans:"rate of change" },
        { q:"What is the gradient of a tangent?",  opts:["area under curve","derivative","integral","limit"], ans:"derivative" },
        { q:"As x→∞, 1/x approaches?",            opts:["∞","1","0","-1"],                              ans:"0"             },
      ],
      fillin: [
        { q:"The derivative of a constant is ___", ans:"0" },
        { q:"dy/dx means the ___ of y with respect to x", ans:"derivative" },
      ],
      drag: [{ instruction:"Match notation to meaning", pairs:[["dy/dx","derivative"],["∫f(x)dx","integral"],["lim","limit"],["Δx","change in x"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"Derivative of x³?",            opts:["x²","3x","3x²","x³"],             ans:"3x²"  },
        { q:"Derivative of sin(x)?",        opts:["cos x","-cos x","sin x","-sin x"],ans:"cos x"},
        { q:"∫ x dx = ?",                   opts:["x","x²","x²/2+C","2x+C"],         ans:"x²/2+C"},
        { q:"Derivative of eˣ?",            opts:["eˣ","xe^(x-1)","e^(x+1)","1"],   ans:"eˣ"   },
        { q:"Derivative of ln(x)?",         opts:["1/x","ln x","x","e^x"],           ans:"1/x"  },
      ],
      fillin: [
        { q:"d/dx(x⁴) = ___",   ans:"4x³"  },
        { q:"∫ cos x dx = ___",  ans:"sin x+C" },
        { q:"d/dx(x²) = ___",    ans:"2x"   },
      ],
      drag: [{ instruction:"Match function to derivative", pairs:[["x²","2x"],["x³","3x²"],["sin x","cos x"],["eˣ","eˣ"]] }],
      timed: { ops:["+","-","×"], range:[1,20], seconds:30 }
    },
    university: {
      quiz: [
        { q:"Derivative of x²?",             opts:["x","2x","x²","2"],              ans:"2x"   },
        { q:"Integral of 2x dx?",            opts:["x","x²","x²+C","2x²+C"],       ans:"x²+C" },
        { q:"What is d/dx(sin x)?",          opts:["cos x","-cos x","sin x","-sin x"], ans:"cos x" },
        { q:"Limit of 1/x as x→∞?",         opts:["0","1","∞","undefined"],        ans:"0"    },
        { q:"∫₀¹ x dx = ?",                  opts:["0","1/4","1/2","1"],            ans:"1/2"  },
        { q:"Chain rule: d/dx[f(g(x))] = ?", opts:["f'(x)g'(x)","f'(g(x))g'(x)","f(g'(x))","f'(x)+g'(x)"], ans:"f'(g(x))g'(x)" },
      ],
      fillin: [
        { q:"d/dx(x³) = ___",  ans:"3x²" },
        { q:"∫ 1 dx = ___",    ans:"x+C" },
        { q:"d/dx(cos x) = ___", ans:"-sin x" },
      ],
      drag: [{ instruction:"Match function to its derivative", pairs:[["x²","2x"],["x³","3x²"],["sin x","cos x"],["eˣ","eˣ"]] }],
      timed: { ops:["+","-","×"], range:[1,20], seconds:30 }
    }
  },

  /* ── NUMBER THEORY ────────────────── */
  "number-theory": {
    beginner: {
      quiz: [
        { q:"Is 2 a prime number?",         opts:["Yes","No"],                          ans:"Yes"  },
        { q:"How many factors does 6 have?", opts:["2","3","4","5"],                    ans:"4"    },
        { q:"Which is NOT prime?",          opts:["2","3","4","5"],                     ans:"4"    },
        { q:"What is a factor of 12?",      opts:["5","7","4","11"],                    ans:"4"    },
        { q:"Smallest prime number?",       opts:["0","1","2","3"],                     ans:"2"    },
      ],
      fillin: [
        { q:"Factors of 6: 1, 2, 3, ___", ans:"6" },
        { q:"Smallest prime = ___",       ans:"2" },
        { q:"Is 9 prime? ___",            ans:"No"},
      ],
      drag: [{ instruction:"Sort into prime or not prime", pairs:[["2","Prime"],["4","Not Prime"],["7","Prime"],["9","Not Prime"]] }],
      timed: { ops:["+","-"], range:[1,10], seconds:30 }
    },
    elementary: {
      quiz: [
        { q:"LCM of 3 and 4?",              opts:["6","8","12","16"],                   ans:"12"  },
        { q:"GCD of 8 and 12?",             opts:["2","3","4","6"],                     ans:"4"   },
        { q:"Which are factors of 24?",     opts:["5 and 7","6 and 8","9 and 3","11 and 2"], ans:"6 and 8" },
        { q:"Prime factorisation of 12?",   opts:["2×6","3×4","2²×3","2×2×3 and 2²×3 are same"], ans:"2²×3" },
      ],
      fillin: [
        { q:"LCM(4,6) = ___",  ans:"12" },
        { q:"GCD(12,18) = ___", ans:"6"  },
        { q:"12 = 2² × ___",    ans:"3"  },
      ],
      drag: [{ instruction:"Match to prime or composite", pairs:[["11","Prime"],["12","Composite"],["13","Prime"],["15","Composite"]] }],
      timed: { ops:["+","×"], range:[1,20], seconds:30 }
    },
    intermediate: {
      quiz: [
        { q:"Is 17 prime?",              opts:["Yes","No"],                              ans:"Yes"        },
        { q:"GCD of 12 and 18?",         opts:["3","4","6","9"],                         ans:"6"          },
        { q:"LCM of 4 and 6?",           opts:["8","10","12","16"],                      ans:"12"         },
        { q:"What type is √2?",          opts:["rational","irrational","integer","prime"],ans:"irrational" },
        { q:"What is 5 mod 3?",          opts:["0","1","2","3"],                         ans:"2"          },
        { q:"Which of these is irrational?", opts:["1/3","√4","√3","0.25"],             ans:"√3"         },
      ],
      fillin: [
        { q:"LCM(3,4) = ___",      ans:"12" },
        { q:"GCD(20,30) = ___",    ans:"10" },
        { q:"Next prime after 7: ___", ans:"11" },
        { q:"17 mod 5 = ___",      ans:"2"  },
      ],
      drag: [{ instruction:"Is it prime? Match to Yes or No", pairs:[["17","Prime"],["15","Not Prime"],["23","Prime"],["21","Not Prime"]] }],
      timed: { ops:["+","-","×"], range:[1,30], seconds:30 }
    },
    advanced: {
      quiz: [
        { q:"Fermat's little theorem: aᵖ ≡ ? (mod p) for prime p", opts:["0","a","1","p"],          ans:"a"  },
        { q:"Euler's totient φ(p) for prime p = ?",                 opts:["p","p-1","p+1","p/2"],    ans:"p-1"},
        { q:"What is a Mersenne prime?",   opts:["2p-1 form","2p+1 form","p² form","p! form"],       ans:"2p-1 form" },
        { q:"Goldbach conjecture states every even number >2 is?", opts:["prime","sum of 2 primes","divisible by 4","a perfect square"], ans:"sum of 2 primes" },
      ],
      fillin: [
        { q:"φ(7) = ___",           ans:"6"  },
        { q:"φ(1) = ___",           ans:"1"  },
        { q:"7 mod 3 = ___",        ans:"1"  },
      ],
      drag: [{ instruction:"Match theorem to description", pairs:[["Fermat's little","aᵖ≡a mod p"],["Euler's totient","counts coprimes"],["Fundamental theorem","unique prime factorisation"],["Wilson's theorem","(p-1)!≡-1 mod p"]] }],
      timed: { ops:["+","×"], range:[1,50], seconds:30 }
    },
    university: {
      quiz: [
        { q:"RSA encryption relies on difficulty of?",  opts:["adding primes","factoring large numbers","finding GCD","modular addition"],  ans:"factoring large numbers" },
        { q:"Quadratic residue a mod p: a is QR if?",  opts:["a=p","a²≡1","x²≡a has solution","a is prime"],                              ans:"x²≡a has solution"      },
        { q:"What is the Riemann Hypothesis about?",   opts:["prime gaps","zeros of zeta function","sum of primes","twin primes"],          ans:"zeros of zeta function"  },
        { q:"Chinese Remainder Theorem solves?",       opts:["quadratics","simultaneous modular equations","prime factorisation","limits"], ans:"simultaneous modular equations" },
      ],
      fillin: [
        { q:"Number of primes up to N is approximately ___", ans:"N/ln(N)" },
        { q:"Zeta function: ζ(s) = Σ 1/nˢ is called the ___ function", ans:"Riemann" },
      ],
      drag: [{ instruction:"Match cryptography term to meaning", pairs:[["Public key","known to everyone"],["Private key","kept secret"],["Modulus","n=p×q"],["RSA","public key encryption"]] }],
      timed: { ops:["+","×"], range:[1,100], seconds:30 }
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
  if      (gameType === 'quiz')   html = buildQuiz(data.quiz,    topic, level);
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
      const q  = window._quiz.questions[window._quiz.current];
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
  const stars  = pct>=90?'⭐⭐⭐':pct>=60?'⭐⭐':'⭐';
  const msg    = pct>=90?"🎉 Amazing! You're a Math Star!":pct>=60?"👍 Great work! Keep it up!":"💪 Keep practising — you'll get there!";
  return `
    <div class="result-box">
      <div class="result-stars">${stars}</div>
      <div class="result-score">${pct}%</div>
      <div style="font-size:.95rem;color:var(--text-mid);margin-bottom:12px;">Score: ${score} / ${total}</div>
      <div class="result-msg">${msg}</div>
      <div class="result-btns">
        <button class="btn btn-purple" onclick="closeModal()">Done ✓</button>
      </div>
    </div>`;
}
