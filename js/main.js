document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Load content dynamically from data/content.json
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('./data/content.json');
        const data = await response.json();
        
        // Populate Company info
        document.getElementById('header-phone-text').textContent = data.company.phone;
        document.getElementById('header-phone-link').href = `tel:${data.company.phoneClean}`;
        document.getElementById('mobile-phone-text').textContent = `Call/Text ${data.company.phone}`;
        document.getElementById('mobile-phone-link').href = `tel:${data.company.phoneClean}`;
        document.getElementById('sticky-phone-link').href = `tel:${data.company.phoneClean}`;
        document.getElementById('sticky-sms-link').href = `sms:${data.company.phoneClean}`;
        document.getElementById('hero-text-link').href = `sms:${data.company.phoneClean}`;

        // Populate Services Grid with Bullets
        const grid = document.getElementById('services-grid');
        grid.innerHTML = data.services.map(service => `
            <div class="bg-brand-card border border-brand-surface rounded-2xl p-6 hover:border-brand-gold/50 transition-all flex flex-col justify-between">
                <div>
                    <div class="w-14 h-14 rounded-xl bg-brand-surface border border-brand-gold/30 flex items-center justify-center text-brand-gold text-2xl mb-5">
                        <i class="fa-solid ${service.icon}"></i>
                    </div>
                    <h3 class="text-xl font-heading font-bold text-white mb-2">${service.title}</h3>
                    <p class="text-brand-muted text-sm leading-relaxed mb-4">${service.description}</p>
                </div>
                ${service.bullets ? `
                <ul class="text-xs space-y-2 text-brand-lightText border-t border-brand-surface pt-4">
                    ${service.bullets.map(b => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-brand-gold"></i> ${b}</li>`).join('')}
                </ul>
                ` : ''}
            </div>
        `).join('');

    } catch (err) {
        console.error("Could not load content.json:", err);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    document.getElementById('lead-form').classList.add('hidden');
    document.getElementById('form-success').classList.remove('hidden');
}

// Before / After Slider Logic
const slider = document.getElementById('ba-slider');
const afterLayer = document.getElementById('ba-after-layer');
const handle = document.getElementById('ba-handle');
const afterImg = document.getElementById('ba-after-img');
let isDragging = false;

function updateSlider(x) {
    const rect = slider.getBoundingClientRect();
    let pos = x - rect.left;
    if (pos < 0) pos = 0;
    if (pos > rect.width) pos = rect.width;
    const pct = (pos / rect.width) * 100;
    afterLayer.style.width = pct + '%';
    handle.style.left = pct + '%';
    afterImg.style.width = rect.width + 'px';
}

window.addEventListener('load', () => { afterImg.style.width = slider.getBoundingClientRect().width + 'px'; });
window.addEventListener('resize', () => { afterImg.style.width = slider.getBoundingClientRect().width + 'px'; });

slider.addEventListener('mousedown', (e) => { isDragging = true; updateSlider(e.clientX); });
window.addEventListener('mouseup', () => { isDragging = false; });
window.addEventListener('mousemove', (e) => { if (isDragging) updateSlider(e.clientX); });
slider.addEventListener('touchstart', (e) => { isDragging = true; updateSlider(e.touches[0].clientX); });
window.addEventListener('touchend', () => { isDragging = false; });
window.addEventListener('touchmove', (e) => { if (isDragging) updateSlider(e.touches[0].clientX); });
