// These are intentionally public browser credentials. The database policy only
// permits new enquiries; it does not allow visitors to read, edit or delete them.
const SUPABASE_URL = 'https://bbcmzzjicuhlmulvcpgu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_L_vYdel_8bykJQv49TNiLA_1JGaf0CC';

const services = [
  { id: 'S001', name: 'Website Design & Development', description: 'Business websites, landing pages and responsive WordPress websites', price: '₹11,999', duration: '5–10 Days', category: 'Web Development' },
  { id: 'S002', name: 'SEO', description: 'On-page SEO, keyword research, technical SEO and monthly optimization', price: '₹7,999/month', duration: 'Monthly', category: 'SEO' },
  { id: 'S003', name: 'Social Media Marketing', description: 'Instagram/Facebook content planning, posting and engagement strategy', price: '₹8,999/month', duration: 'Monthly', category: 'Social Media' },
  { id: 'S004', name: 'Google Ads', description: 'Search and display advertising campaign setup, optimization and reporting', price: '₹9,999/month', duration: 'Monthly', category: 'Paid Advertising' },
  { id: 'S005', name: 'Meta Ads', description: 'Facebook and Instagram ad campaign setup, targeting and optimization', price: '₹8,999/month', duration: 'Monthly', category: 'Paid Advertising' },
  { id: 'S006', name: 'Content Marketing', description: 'Website blogs, social media captions and marketing content', price: '₹5,999', duration: '3–7 Days', category: 'Content' },
  { id: 'S007', name: 'Graphic Design', description: 'Social media creatives, banners, promotional posts and ad designs', price: '₹3,999', duration: '2–5 Days', category: 'Design' },
  { id: 'S008', name: 'Email Marketing', description: 'Email campaigns, newsletters and basic automation setup', price: '₹6,999/month', duration: 'Monthly', category: 'Email Marketing' },
  { id: 'S009', name: 'Branding', description: 'Logo, brand identity, color palette and basic brand guidelines', price: '₹9,999', duration: '5–7 Days', category: 'Branding' },
  { id: 'S010', name: 'E-commerce Marketing', description: 'Marketing support for online stores, product promotion and conversion optimization', price: '₹14,999/month', duration: 'Monthly', category: 'E-commerce' }
];

const testimonials = [
  { name: 'Aarav Sharma', role: 'Gym Owner', location: 'Delhi', rating: 5, quote: 'The website helped us present our gym professionally and generate more enquiries.', service: 'Website Design & Development' },
  { name: 'Priya Mehta', role: 'Boutique Owner', location: 'New Delhi', rating: 5, quote: 'Our Instagram presence improved a lot. The content looked professional and consistent.', service: 'Social Media Marketing' },
  { name: 'Rohan Verma', role: 'Restaurant Owner', location: 'Gurugram', rating: 5, quote: 'The ad campaigns brought more relevant customers and made our marketing easier to track.', service: 'Google Ads' },
  { name: 'Simran Kapoor', role: 'Beauty Business Owner', location: 'Noida', rating: 5, quote: 'The branding package gave my business a much more professional identity.', service: 'Branding' },
  { name: 'Kabir Singh', role: 'E-commerce Owner', location: 'Delhi', rating: 5, quote: 'The marketing strategy helped us improve our online visibility and product promotion.', service: 'E-commerce Marketing' },
  { name: 'Neha Gupta', role: 'Consultant', location: 'Faridabad', rating: 5, quote: 'The SEO work improved our website visibility and brought more organic enquiries.', service: 'SEO' },
  { name: 'Aditya Malhotra', role: 'Startup Founder', location: 'Delhi', rating: 5, quote: 'Fast communication, clean designs and a clear marketing strategy. Highly recommended.', service: 'Content Marketing' },
  { name: 'Ishita Jain', role: 'Small Business Owner', location: 'Ghaziabad', rating: 5, quote: 'The team understood our requirements and created attractive promotional creatives.', service: 'Graphic Design' }
];

const deliveryMarkup = (duration) => {
  const match = duration.match(/^(.+?)\s+(Days)$/i);
  return match ? `<span class="delivery"><b>${match[1]}</b><i>${match[2]}</i></span>` : `<span class="delivery"><b>${duration}</b><i>Plan</i></span>`;
};

document.querySelector('#services-grid').innerHTML = services.map((service, index) => `
  <article class="service-card reveal" style="--card-index:${index}">
    <header><span>${String(index + 1).padStart(2, '0')}</span><span>${service.category}</span></header>
    <h3>${service.name}</h3><p>${service.description}</p>
    <footer><strong>From ${service.price}</strong>${deliveryMarkup(service.duration)}</footer>
  </article>`).join('');

document.querySelector('#service-name').insertAdjacentHTML('beforeend', services.map((service) => `<option value="${service.name}">${service.name} — ${service.duration}</option>`).join(''));

const testimonialCards = testimonials.map((testimonial) => `
  <article class="testimonial-card">
    <div class="stars" aria-label="${testimonial.rating} out of 5 stars">★★★★★</div>
    <blockquote>“${testimonial.quote}”</blockquote>
    <footer><div class="avatar">${testimonial.name.split(' ').map(n => n[0]).join('')}</div><div><strong>${testimonial.name}</strong><span>${testimonial.role} · ${testimonial.location}</span></div><small>${testimonial.service}</small></footer>
  </article>`).join('');
document.querySelector('#testimonials-track').innerHTML = testimonialCards + testimonialCards;

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const form = document.querySelector('#contact-form');
const status = document.querySelector('#form-status');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }

  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const service = formData.get('service');
  const submitButton = form.querySelector('button[type="submit"]');
  const initialButtonLabel = submitButton.innerHTML;
  const enquiry = {
    name,
    email: formData.get('email').trim(),
    business_name: formData.get('business').trim(),
    service_name: service,
    message: formData.get('message').trim()
  };

  status.textContent = 'Sending your brief securely…';
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/contact_enquiries`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(enquiry)
    });

    if (!response.ok) throw new Error(`Supabase request failed with ${response.status}`);

    status.textContent = `Thanks, ${name}. Your ${service} brief is now with our team.`;
    form.reset();
  } catch (error) {
    console.error('Unable to save contact enquiry:', error);
    status.textContent = 'We could not send your brief just now. Please try again in a moment.';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = initialButtonLabel;
    form.removeAttribute('aria-busy');
  }
});

const canvas = document.querySelector('#space-canvas');
const context = canvas.getContext('2d');
let stars = [];
let shootingStars = [];
let width = 0;
let height = 0;
let pointer = { x: 0.5, y: 0.5 };
function resizeCanvas() {
  width = window.innerWidth; height = window.innerHeight;
  const fourKPixelBudget = 3840 * 2160;
  const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1), Math.sqrt(fourKPixelBudget / (width * height)));
  canvas.width = width * dpr; canvas.height = height * dpr;
  canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(440, Math.floor(width * height / 3600));
  stars = Array.from({ length: count }, () => ({ x: Math.random() * width, y: Math.random() * height, z: Math.random() * 1.8 + .2, size: Math.random() * 1.55 + .18, alpha: Math.random() * .72 + .08, twinkle: Math.random() * Math.PI * 2, hue: Math.random() > .82 ? 197 : 215 }));
  shootingStars = Array.from({ length: 4 }, (_, index) => ({ x: Math.random() * width, y: Math.random() * height * .65, speed: .15 + Math.random() * .18, length: 70 + Math.random() * 120, delay: index * 2100 + Math.random() * 1600 }));
}
function drawSpace(time) {
  context.clearRect(0, 0, width, height);
  const nebula = context.createRadialGradient(width * (.72 + (pointer.x - .5) * .06), height * (.16 + (pointer.y - .5) * .06), 0, width * .72, height * .18, Math.max(width, height) * .79);
  nebula.addColorStop(0, 'rgba(66, 157, 255, .105)'); nebula.addColorStop(.23, 'rgba(92, 81, 255, .045)'); nebula.addColorStop(.52, 'rgba(139, 255, 0, .022)'); nebula.addColorStop(1, 'rgba(0,0,0,0)');
  context.fillStyle = nebula; context.fillRect(0, 0, width, height);
  const dust = context.createLinearGradient(0, height, width, 0);
  dust.addColorStop(0, 'rgba(10, 35, 73, 0)'); dust.addColorStop(.45, 'rgba(21, 69, 102, .045)'); dust.addColorStop(1, 'rgba(3, 11, 25, 0)');
  context.fillStyle = dust; context.fillRect(0, 0, width, height);
  stars.forEach((star) => { const drift = (time * .0065 * star.z) % (height + 40); let y = star.y + drift; if (y > height) y -= height + 40; const alpha = star.alpha * (.72 + Math.sin(time * .0017 + star.twinkle) * .28); context.beginPath(); context.fillStyle = `hsla(${star.hue}, 70%, 88%, ${alpha})`; context.arc(star.x + (pointer.x - .5) * star.z * 22, y, star.size, 0, Math.PI * 2); context.fill(); });
  shootingStars.forEach((shoot) => { const cycle = (time + shoot.delay) % 9200; if (cycle > 1300) return; const progress = cycle / 1300; const x = (shoot.x + progress * width * shoot.speed * 5) % (width + shoot.length); const y = shoot.y + progress * height * .14; const tail = context.createLinearGradient(x - shoot.length, y - shoot.length * .25, x, y); tail.addColorStop(0, 'rgba(166, 218, 255, 0)'); tail.addColorStop(1, `rgba(225, 249, 255, ${.65 * (1 - progress)})`); context.strokeStyle = tail; context.lineWidth = 1.1; context.beginPath(); context.moveTo(x - shoot.length, y - shoot.length * .25); context.lineTo(x, y); context.stroke(); });
  requestAnimationFrame(drawSpace);
}
window.addEventListener('pointermove', e => { pointer = { x: e.clientX / width, y: e.clientY / height }; });
window.addEventListener('resize', resizeCanvas); resizeCanvas(); requestAnimationFrame(drawSpace);

const orbitVisual = document.querySelector('.hero-orbit');
window.addEventListener('scroll', () => {
  const depth = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
  orbitVisual.style.transform = `translate3d(0, ${depth * 42}px, 0) scale(${1 - depth * .055})`;
}, { passive: true });

