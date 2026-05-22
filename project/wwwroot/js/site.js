// ===== Simple client-side data store using localStorage =====
const DB_KEYS = { USERS:'ims_users', SESSION:'ims_session', POLICIES:'ims_policies', PAYMENTS:'ims_payments', LOANS:'ims_loans' };

function getDB(k){ return JSON.parse(localStorage.getItem(k) || '[]'); }
function setDB(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
function currentUser(){ return JSON.parse(localStorage.getItem(DB_KEYS.SESSION) || 'null'); }
function logout(){ localStorage.removeItem(DB_KEYS.SESSION); location.href='index.html'; }

// Seed demo admin
(function seed(){
  const users = getDB(DB_KEYS.USERS);
  if(!users.find(u=>u.email==='admin@ims.com')){
    users.push({name:'Admin', email:'admin@ims.com', password:'admin123', role:'admin'});
    setDB(DB_KEYS.USERS, users);
  }
})();






// ===== Auth =====
function registerUser(e){
  e.preventDefault();
  const f = e.target;
  const users = getDB(DB_KEYS.USERS);
  if(users.find(u=>u.email===f.email.value)){ alert('Email already registered'); return; }
  const u = {name:f.name.value, email:f.email.value, phone:f.phone.value, password:f.password.value, role:'user'};
  users.push(u); setDB(DB_KEYS.USERS, users);
  localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(u));
  alert('Registration successful!'); location.href='dashboard.html';
}
function loginUser(e){
  e.preventDefault();
  const f = e.target;
  const user = getDB(DB_KEYS.USERS).find(u=>u.email===f.email.value && u.password===f.password.value);
  if(!user){ alert('Invalid credentials'); return; }
  localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(user));
  location.href = user.role==='admin' ? 'admin.html' : 'dashboard.html';
}
function requireAuth(adminOnly=false){
  const u = currentUser();
  if(!u){ location.href='login.html'; return null; }
  if(adminOnly && u.role!=='admin'){ location.href='dashboard.html'; return null; }
  return u;
}

// ===== Premium Calculator =====
// Premium based on selected term plan, type, sum assured, age
const RATES = {
  life:    {base:0.012, termFactor:{10:1.0, 15:0.9, 20:0.85, 25:0.8, 30:0.78}},
  medical: {base:0.025, termFactor:{1:1.0, 3:0.95, 5:0.9, 10:0.85}},
  motor:   {base:0.030, termFactor:{1:1.0, 3:0.92, 5:0.88}},
  home:    {base:0.008, termFactor:{5:1.0, 10:0.95, 15:0.9, 20:0.85, 30:0.8}}
};
function calcPremium(type, sum, term, age){
  const r = RATES[type]; if(!r) return 0;
  const tf = r.termFactor[term] || 1;
  const ageFactor = 1 + Math.max(0,(age-25))*0.01;
  const annual = sum * r.base * tf * ageFactor;
  return {annual: Math.round(annual), monthly: Math.round(annual/12), term, type, sum, age};
}

// ===== Policy operations =====
function buyPolicy(type, sum, term, age, premium){
  const u = requireAuth(); if(!u) return;
  const policies = getDB(DB_KEYS.POLICIES);
  const id = 'POL' + Date.now().toString().slice(-7);
  policies.push({id, user:u.email, type, sum, term, age, premium, status:'Pending Payment', createdAt:new Date().toISOString()});
  setDB(DB_KEYS.POLICIES, policies);
  alert('Policy created: '+id+'. Proceed to payment.');
  location.href='dashboard.html';
}
function payPolicy(id){
  const policies = getDB(DB_KEYS.POLICIES);
  const p = policies.find(x=>x.id===id); if(!p) return;
  p.status='Active'; p.paidOn=new Date().toISOString();
  setDB(DB_KEYS.POLICIES, policies);
  const pays = getDB(DB_KEYS.PAYMENTS);
  pays.push({txn:'TXN'+Date.now(), policyId:id, amount:p.premium.annual, date:new Date().toISOString(), user:p.user});
  setDB(DB_KEYS.PAYMENTS, pays);
  alert('Payment successful!'); location.reload();
}
function updatePolicy(id){
  const newSum = prompt('Enter new sum assured:');
  if(!newSum) return;
  const policies = getDB(DB_KEYS.POLICIES);
  const p = policies.find(x=>x.id===id); if(!p) return;
  p.sum = Number(newSum);
  p.premium = calcPremium(p.type, p.sum, p.term, p.age);
  setDB(DB_KEYS.POLICIES, policies);
  alert('Policy updated'); location.reload();
}
function deletePolicy(id){
  if(!confirm('Cancel this policy?')) return;
  setDB(DB_KEYS.POLICIES, getDB(DB_KEYS.POLICIES).filter(x=>x.id!==id));
  location.reload();
}

// ===== Loan =====
function applyLoan(e){
  e.preventDefault();
  const u = requireAuth(); if(!u) return;
  const f = e.target;
  const loans = getDB(DB_KEYS.LOANS);
  loans.push({id:'LN'+Date.now().toString().slice(-6), user:u.email, amount:Number(f.amount.value),
    purpose:f.purpose.value, tenure:Number(f.tenure.value), status:'Under Review', date:new Date().toISOString()});
  setDB(DB_KEYS.LOANS, loans);
  alert('Loan application submitted!'); location.href='dashboard.html';
}
