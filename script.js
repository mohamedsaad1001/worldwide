// مثال على كود جافاسكريبت بسيط للتحقق من صحة رقم الجوال وإظهار رسالة تنبيه
// الكود مأخوذ من ملف js (2).pdf (محتوى تعليمي)
document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    var phoneInput = document.getElementById('phone');
    var requiredFields = [
        document.getElementById('name'),
        phoneInput,
        document.getElementById('email'),
        document.getElementById('service'),
        document.getElementById('date'),
        document.getElementById('time')
    ];
    form.addEventListener('submit', function(e) {
        var phoneValue = phoneInput.value.trim();
        var phonePattern = /^09\d{8}$/;
        if (!phonePattern.test(phoneValue)) {
            alert('يرجى إدخال رقم جوال صحيح يبدأ بـ 09 ومكون من 10 أرقام');
            phoneInput.focus();
            e.preventDefault();
            return;
        }
        for (var i = 0; i < requiredFields.length; i++) {
            if (!requiredFields[i].value.trim()) {
                alert('يرجى تعبئة جميع الحقول المطلوبة');
                requiredFields[i].focus();
                e.preventDefault();
                return;
            }
        }
        alert('تم تأكيد حجز الموعد بنجاح!');
    });
});

// فلترة الكروت حسب الفئة (للصفحة الرئيسية)
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.category-filters button');
  const cards = document.querySelectorAll('.profile-card');
  if (filterButtons.length && cards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.getAttribute('data-filter');
        cards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-role') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});

// بيانات تجريبية للمهنيين
const professionals = [
  {name: 'محمد علي', role: 'مدرب', specialty: '', city: 'الرياض', img: 'img/sport.jpg', desc: 'مدرب لياقة بخبرة 5 سنوات.'},
  {name: 'سارة يوسف', role: 'أستاذ', specialty: 'رياضيات', city: 'جدة', img: 'img/teacher1.jpg', desc: 'معلمة رياضيات بخبرة 10 سنوات.'},
  {name: 'د. أحمد سالم', role: 'طبيب', specialty: 'جراحة', city: 'الدمام', img: 'img/doctor1.jpg', desc: 'طبيب جراحة أطفال.'},
  {name: 'د. منى فهد', role: 'طبيب', specialty: 'باطنية', city: 'الرياض', img: 'img/doctor2.jpg', desc: 'أخصائية باطنية.'},
  {name: 'خالد منصور', role: 'عامل', specialty: '', city: 'مكة', img: 'img/worker1.jpg', desc: 'عامل صيانة كهربائية.'},
  {name: 'أ. ليلى حسن', role: 'أستاذ', specialty: 'لغة عربية', city: 'الرياض', img: 'img/teacher2.jpg', desc: 'أستاذة لغة عربية.'},
  {name: 'سامي الحرفي', role: 'حرفي', specialty: '', city: 'جدة', img: 'img/worker2.jpg', desc: 'نجار محترف.'},
];

const specialties = {
  'طبيب': ['الكل', 'جراحة', 'باطنية', 'أسنان', 'أطفال'],
  'أستاذ': ['الكل', 'رياضيات', 'لغة عربية', 'علوم', 'إنجليزي']
};

document.addEventListener('DOMContentLoaded', function() {
  const professionSelect = document.getElementById('professionSelect');
  const specialtyWrapper = document.getElementById('specialtyWrapper');
  const specialtySelect = document.getElementById('specialtySelect');
  const cardsGrid = document.getElementById('cardsGrid');

  function encodeQuery(obj) {
    return Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
  }

  function renderCards(role, specialty) {
    let filtered = professionals;
    if (role && role !== 'all') {
      filtered = filtered.filter(p => p.role === role);
      if (specialty && specialty !== 'all' && specialties[role]) {
        filtered = filtered.filter(p => p.specialty === specialty);
      }
      // إذا كان التخصص "الكل"، اعرض كل من له نفس الدور بغض النظر عن قيمة specialty
    }
    cardsGrid.innerHTML = '';
    if (!filtered.length) {
      cardsGrid.innerHTML = '<div style="text-align:center;color:#888;padding:40px 0;">لا يوجد مهنيين مطابقين للبحث.</div>';
      return;
    }
    filtered.forEach(p => {
      const card = document.createElement('div');
      card.className = 'profile-card';
      const query = encodeQuery({proName: p.name, service: p.role, specialty: p.specialty});
      card.innerHTML = `
        <img src="${p.img}" alt="صورة ${p.role}">
        <div class="profile-info">
          <h3>${p.name}</h3>
          <span class="role">${p.role}${p.specialty ? ' - ' + p.specialty : ''}</span>
          <p>${p.desc}</p>
          <span class="city">${p.city}</span>
          <button onclick=\"location.href='booking.html?${query}'\">احجز الآن</button>
        </div>
      `;
      cardsGrid.appendChild(card);
    });
  }

  // تحديث التخصصات عند تغيير نوع المهني
  professionSelect.addEventListener('change', function() {
    const val = this.value;
    if (specialties[val]) {
      specialtyWrapper.style.display = '';
      specialtySelect.innerHTML = specialties[val].map(s => `<option value="${s === 'الكل' ? 'all' : s}">${s}</option>`).join('');
    } else {
      specialtyWrapper.style.display = 'none';
    }
    renderCards(val, 'all');
  });

  // عند تغيير التخصص
  specialtySelect.addEventListener('change', function() {
    renderCards(professionSelect.value, this.value);
  });

  // عند تحميل الصفحة: عرض الكل
  renderCards('all', 'all');
});


       