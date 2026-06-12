/* =============================================
   JULIEN INVEST — Simulateur + Graphique
   Intérêts Composés — Réutilisable
   ============================================= */
function initSimulator(prefix, canvasId) {
  const p = prefix || '';
  let chartInstance = null;
  function formatEur(n) {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency', currency: 'EUR', maximumFractionDigits: 0
    }).format(Math.round(n));
  }
  function formatK(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.', ',') + ' M€';
    if (n >= 1000)    return Math.round(n / 1000) + ' k€';
    return Math.round(n) + ' €';
  }
  function buildYearlyData(initial, monthly, rate, years) {
    const r = rate / 100 / 12;
    const data = [];
    for (let y = 1; y <= years; y++) {
      const months = y * 12;
      const futureInitial = initial * Math.pow(1 + r, months);
      const futureMonthly = r > 0
        ? monthly * ((Math.pow(1 + r, months) - 1) / r)
        : monthly * months;
      const total    = futureInitial + futureMonthly;
      const invested = initial + monthly * months;
      const gains    = Math.max(0, total - invested);
      data.push({ year: y, invested: Math.round(invested), gains: Math.round(gains), total: Math.round(total) });
    }
    return data;
  }
  function renderChart(data, cId) {
    const canvas = document.getElementById(cId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const labels    = data.map(d => 'An ' + d.year);
    const invested  = data.map(d => d.invested);
    const gains     = data.map(d => d.gains);
    if (chartInstance) {
      chartInstance.data.labels              = labels;
      chartInstance.data.datasets[0].data   = invested;
      chartInstance.data.datasets[1].data   = gains;
      chartInstance.update('active');
      return;
    }
    function createChart() {
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Versements',
              data: invested,
              backgroundColor: 'rgba(200, 180, 232, 0.85)',
              borderColor: 'rgba(200, 180, 232, 1)',
              borderWidth: 0,
              borderRadius: { topLeft: 0, topRight: 0, bottomLeft: 3, bottomRight: 3 },
              stack: 'stack'
            },
            {
              label: 'Intérêts générés',
              data: gains,
              backgroundColor: 'rgba(160, 231, 197, 0.9)',
              borderColor: 'rgba(160, 231, 197, 1)',
              borderWidth: 0,
              borderRadius: { topLeft: 3, topRight: 3, bottomLeft: 0, bottomRight: 0 },
              stack: 'stack'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 300, easing: 'easeOutQuart' },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              position: 'top',
              align: 'start',
              labels: {
                font: { family: "'Syne', sans-serif", size: 13, weight: '600' },
                color: '#4A4A6A',
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20
              }
            },
            tooltip: {
              backgroundColor: '#1A1A4E',
              titleFont: { family: "'Syne', sans-serif", size: 13, weight: '700' },
              bodyFont: { family: "'DM Sans', sans-serif", size: 13 },
              padding: 14,
              cornerRadius: 10,
              callbacks: {
                title: (items) => 'Après ' + items[0].label.replace('An ', '') + ' an' + (parseInt(items[0].label.replace('An ', '')) > 1 ? 's' : ''),
                label: (item) => ' ' + item.dataset.label + ' : ' + formatEur(item.raw),
                footer: (items) => {
                  const total = items.reduce((s, i) => s + i.raw, 0);
                  return 'Capital total : ' + formatEur(total);
                }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              grid: { display: false },
              border: { display: false },
              ticks: {
                font: { family: "'DM Sans', sans-serif", size: 11 },
                color: '#8888AA',
                maxTicksLimit: 10,
                maxRotation: 0
              }
            },
            y: {
              stacked: true,
              grid: { color: 'rgba(200,200,220,0.25)', drawBorder: false },
              border: { display: false, dash: [4, 4] },
              ticks: {
                font: { family: "'DM Sans', sans-serif", size: 11 },
                color: '#8888AA',
                callback: (val) => formatK(val)
              }
            }
          }
        }
      });
    }
    if (typeof Chart !== 'undefined') {
      createChart();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
      script.onload = createChart;
      document.head.appendChild(script);
    }
  }
  function calc() {
    const elInitial = document.getElementById(p + 'sl-initial');
    const elMonthly = document.getElementById(p + 'sl-monthly');
    const elRate    = document.getElementById(p + 'sl-rate');
    const elYears   = document.getElementById(p + 'sl-years');
    if (!elInitial) return;
    const initial = parseFloat(elInitial.value);
    const monthly = parseFloat(elMonthly.value);
    const rate    = parseFloat(elRate.value);
    const years   = parseInt(elYears.value);
    const r       = rate / 100 / 12;
    const months  = years * 12;
    const futureInitial = initial * Math.pow(1 + r, months);
    const futureMonthly = r > 0
      ? monthly * ((Math.pow(1 + r, months) - 1) / r)
      : monthly * months;
    const total    = futureInitial + futureMonthly;
    const invested = initial + monthly * months;
    const gains    = Math.max(0, total - invested);
    const mult     = invested > 0 ? (total / invested) : 0;
    const pctGains = total > 0 ? (gains / total) * 100 : 0;
    const setTxt = (id, val) => { const el = document.getElementById(p + id); if (el) el.textContent = val; };
    const setW   = (id, w)   => { const el = document.getElementById(p + id); if (el) el.style.width = w + '%'; };
    setTxt('val-initial', formatEur(initial));
    setTxt('val-monthly', formatEur(monthly));
    setTxt('val-rate',    rate.toFixed(1) + ' %');
    setTxt('val-years',   years + (years > 1 ? ' ans' : ' an'));
    setTxt('res-total',    formatEur(total));
    setTxt('res-invested', formatEur(invested));
    setTxt('res-gains',    formatEur(gains));
    setTxt('res-mult',     'x' + mult.toFixed(1));
    setW('bar-gains',    pctGains);
    setW('bar-invested', 100 - pctGains);
    // Phrase récapitulative (page calculateur uniquement)
    const recap = document.getElementById(p + 'recap-sentence');
    if (recap) {
      recap.innerHTML = `Si tu investis sur <strong>${years} an${years > 1 ? 's' : ''}</strong>, mensuellement <strong>${formatEur(monthly)}</strong> à <strong>${rate.toFixed(1)}%</strong>, tu obtiens un <strong>capital final de ${formatEur(total)}</strong>. Celui-ci se compose de <strong>${formatEur(invested)} de versements</strong> et de <strong>${formatEur(gains)} d'intérêts</strong>.`;
    }
    // Graphique
    if (canvasId) {
      const data = buildYearlyData(initial, monthly, rate, years);
      renderChart(data, canvasId);
    }
  }
  ['sl-initial','sl-monthly','sl-rate','sl-years'].forEach(id => {
    const el = document.getElementById(p + id);
    if (el) { el.addEventListener('input', calc); }
  });
  calc();
}
// Auto-init page homepage (pas de préfixe, canvas 'chart-main')
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('sl-initial')) {
    initSimulator('', 'chart-main');
  }
});

/* =============================================
   JULIEN INVEST — Calculateur Liberté Financière
   ============================================= */
function initFireCalculator() {
  let fireChart = null;
  function formatEur(n) {
    if (n >= 1000000) return (n/1000000).toFixed(2).replace('.',',') + ' M€';
    if (n >= 1000)    return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(Math.round(n)) + ' €';
    return Math.round(n) + ' €';
  }
  function formatEurFull(n) {
    return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(Math.round(n));
  }
  function calcFire() {
    const ageNow      = parseInt(document.getElementById('fire-age-now')?.value || 27);
    const ageTarget   = parseInt(document.getElementById('fire-age-target')?.value || 50);
    const capitalNow  = parseFloat(document.getElementById('fire-capital-now')?.value || 0);
    const rente       = parseFloat(document.getElementById('fire-rente')?.value || 2000);
    const rate        = parseFloat(document.getElementById('fire-rate')?.value || 7) / 100;
    const tax         = parseFloat(document.getElementById('fire-tax')?.value || 18.6) / 100;
    const setTxt  = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
    const yearsLeft   = Math.max(0, ageTarget - ageNow);
    const rateNet     = rate * (1 - tax);
    const renteAnnNet = rente * 12;
    const swr         = Math.min(rateNet, 0.04);
    const capitalFire = renteAnnNet / swr;
    // PMT — épargne mensuelle nécessaire
    const r = rate / 12;
    const n = yearsLeft * 12;
    let monthlyNeeded = 0;
    if (n > 0) {
      if (r > 0) {
        const fvCapitalNow = capitalNow * Math.pow(1 + r, n);
        const remaining    = Math.max(0, capitalFire - fvCapitalNow);
        monthlyNeeded = remaining > 0 ? remaining * r / (Math.pow(1 + r, n) - 1) : 0;
      } else {
        monthlyNeeded = Math.max(0, (capitalFire - capitalNow) / n);
      }
    }
    // Statut
    let status = '';
    if (yearsLeft <= 0)           status = 'Âge cible déjà atteint';
    else if (monthlyNeeded > 10000) status = 'Objectif très ambitieux';
    else if (monthlyNeeded > 5000)  status = 'Objectif exigeant mais possible';
    else if (monthlyNeeded > 2000)  status = 'Objectif réaliste avec discipline';
    else                            status = 'Objectif atteignable';
    // Labels sliders
    setTxt('fire-val-age-now',     ageNow + ' ans');
    setTxt('fire-val-age-target',  ageTarget + ' ans');
    setTxt('fire-val-capital-now', formatEurFull(capitalNow));
    setTxt('fire-val-rente',       formatEurFull(rente));
    setTxt('fire-val-rate',        (rate*100).toFixed(1) + ' %');
    setTxt('fire-val-tax',         (tax*100).toFixed(1) + ' %');
    // Résultats
    setTxt('fire-res-capital',    formatEur(capitalFire));
    setTxt('fire-res-status',     status);
    setTxt('fire-res-years',      yearsLeft + ' ans');
    setTxt('fire-res-rente-net',  formatEurFull(rente) + '/mois');
    setTxt('fire-res-rate-net',   (rateNet*100).toFixed(2) + ' %');
    setTxt('fire-res-monthly',    monthlyNeeded > 0 ? formatEurFull(monthlyNeeded) + '/mois' : '0 € (déjà atteint)');
    setTxt('fire-res-swr',        (swr*100).toFixed(1) + ' %');
    setHtml('fire-recap-sentence',
      `Pour toucher <strong>${formatEurFull(rente)}/mois</strong> à partir de <strong>${ageTarget} ans</strong>, tu dois accumuler environ <strong>${formatEur(capitalFire)}</strong>. Avec ${yearsLeft} ans devant toi, il te faut épargner environ <strong>${formatEurFull(monthlyNeeded)}/mois</strong> à ${(rate*100).toFixed(0)}%/an.`
    );
    // Graphique
    const years = [];
    const capitalData = [];
    const targetLine  = [];
    let cap = capitalNow;
    for (let y = 0; y <= yearsLeft; y++) {
      years.push(ageNow + y);
      capitalData.push(Math.round(cap));
      targetLine.push(Math.round(capitalFire));
      for (let m = 0; m < 12; m++) {
        cap = cap * (1 + rate/12) + monthlyNeeded;
      }
    }
    renderFireChart(years, capitalData, targetLine);
  }
  function renderFireChart(labels, capitalData, targetData) {
    const canvas = document.getElementById('chart-fire');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (fireChart) {
      fireChart.data.labels = labels;
      fireChart.data.datasets[0].data = capitalData;
      fireChart.data.datasets[1].data = targetData;
      fireChart.update('active');
      return;
    }
    function create() {
      fireChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Ton capital projeté',
              data: capitalData,
              borderColor: 'rgba(200,180,232,1)',
              backgroundColor: 'rgba(200,180,232,0.15)',
              fill: true,
              tension: 0.4,
              borderWidth: 2.5,
              pointRadius: 0,
              pointHoverRadius: 5,
            },
            {
              label: 'Capital cible FIRE',
              data: targetData,
              borderColor: 'rgba(160,231,197,0.9)',
              backgroundColor: 'transparent',
              borderDash: [8, 4],
              borderWidth: 2,
              pointRadius: 0,
              fill: false,
              tension: 0,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 300 },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              position: 'top',
              align: 'start',
              labels: {
                font: { family: "'Syne', sans-serif", size: 12, weight: '600' },
                color: '#4A4A6A',
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 16
              }
            },
            tooltip: {
              backgroundColor: '#1A1A4E',
              titleFont: { family: "'Syne', sans-serif", size: 12, weight: '700' },
              bodyFont: { family: "'DM Sans', sans-serif", size: 13 },
              padding: 12,
              cornerRadius: 10,
              callbacks: {
                title: items => 'À ' + items[0].label + ' ans',
                label: item => ' ' + item.dataset.label + ' : ' + new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(item.raw)
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { font: { family: "'DM Sans', sans-serif", size: 11 }, color: '#8888AA' }
            },
            y: {
              grid: { color: 'rgba(200,200,220,0.25)' },
              border: { display: false },
              ticks: {
                font: { family: "'DM Sans', sans-serif", size: 11 },
                color: '#8888AA',
                callback: v => v >= 1000000 ? (v/1000000).toFixed(1)+'M€' : v >= 1000 ? Math.round(v/1000)+'k€' : v+'€'
              }
            }
          }
        }
      });
    }
    if (typeof Chart !== 'undefined') {
      create();
    } else {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js';
      s.onload = create;
      document.head.appendChild(s);
    }
  }
  ['fire-age-now','fire-age-target','fire-capital-now','fire-rente','fire-rate','fire-tax'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', calcFire);
  });
  calcFire();
}
// Auto-init FIRE si présent sur la page
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('fire-age-now')) initFireCalculator();
});
