// Compliments for girls - 100 items
const compliments = [
    "Твоя улыбка освещает весь мир",
    "Ты невероятно красивая",
    "У тебя потрясающие глаза",
    "Ты вдохновляешь окружающих",
    "Твоя доброта не знает границ",
    "Ты — само совершенство",
    "Рядом с тобой время останавливается",
    "Ты делаешь мир лучше",
    "Твоя энергия заряжает позитивом",
    "Ты невероятно умная и талантливая",
    "Твой смех — лучшая музыка",
    "Ты излучаешь свет и тепло",
    "Твоя уверенность вдохновляет",
    "Ты всегда знаешь, что сказать",
    "Твой стиль безупречен",
    "Ты создана для великих дел",
    "Твоя искренность подкупает",
    "Ты умеешь видеть красоту во всём",
    "Твоя душа прекрасна",
    "Ты делаешь жизнь ярче",
    "Твоя грация восхищает",
    "У тебя золотое сердце",
    "Ты — настоящая муза",
    "Твоя нежность трогает до глубины души",
    "Ты прекрасна без всяких фильтров",
    "Твоя сила впечатляет",
    "Ты умеешь вдохновлять других",
    "Твоя красота естественна и притягательна",
    "Ты — воплощение элегантности",
    "Твоя харизма магнетическая",
    "Ты всегда выглядишь потрясающе",
    "Твоя креативность безгранична",
    "Ты умеешь поддержать в трудную минуту",
    "Твоя внутренняя красота сияет",
    "Ты — источник вдохновения",
    "Твоя улыбка может растопить любое сердце",
    "Ты невероятно обаятельная",
    "Твоё присутствие делает день особенным",
    "Ты — настоящая драгоценность",
    "Твоя мудрость поражает",
    "Ты умеешь радоваться мелочам",
    "Твоя позитивность заразительна",
    "Ты всегда находишь выход из сложных ситуаций",
    "Твоя искренность бесценна",
    "Ты — само очарование",
    "Твоя страсть к жизни восхитительна",
    "Ты умеешь мечтать по-настоящему",
    "Твоя чувственность завораживает",
    "Ты — настоящая звезда",
    "Твоя открытость располагает к себе",
    "Ты делаешь мир добрее",
    "Твоя смелость вдохновляет",
    "Ты — воплощение нежности",
    "Твоя женственность прекрасна",
    "Ты умеешь быть собой",
    "Твоя индивидуальность уникальна",
    "Ты — настоящее чудо",
    "Твоя лёгкость покоряет",
    "Ты всегда знаешь, как поднять настроение",
    "Твоя аура притягивает",
    "Ты — воплощение красоты и ума",
    "Твоя эмпатия бесценна",
    "Ты умеешь вдохновлять на подвиги",
    "Твоя чуткость трогает",
    "Ты — настоящая леди",
    "Твоя спонтанность восхищает",
    "Ты делаешь жизнь интереснее",
    "Твоя загадочность притягивает",
    "Ты — само изящество",
    "Твоя внимательность ценна",
    "Ты умеешь дарить радость",
    "Твоя страсть зажигает",
    "Ты — воплощение мечты",
    "Твоя чувственность волнует",
    "Ты делаешь каждый день особенным",
    "Твоя искренность подкупает",
    "Ты — настоящая королева",
    "Твоя душевность располагает",
    "Ты умеешь любить по-настоящему",
    "Твоя романтичность очаровательна",
    "Ты — воплощение гармонии",
    "Твоя целеустремлённость впечатляет",
    "Ты делаешь мир волшебным",
    "Твоя естественность подкупает",
    "Ты — настоящая богиня",
    "Твоя лучезарность ослепляет",
    "Ты умеешь находить красоту в простом",
    "Твоя утончённость восхищает",
    "Ты — воплощение весны",
    "Твоя непосредственность очаровывает",
    "Ты делаешь жизнь прекраснее",
    "Твоя магия действует безотказно",
    "Ты — настоящее произведение искусства",
    "Твоя проницательность удивляет",
    "Ты умеешь быть загадочной",
    "Твоя женственность завораживает",
    "Ты — воплощение любви",
    "Твоя нежность бесценна",
    "Ты делаешь мир ярче одним своим присутствием"
];

// Get random compliment
function getRandomCompliment() {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    return compliments[randomIndex];
}

// Create butterfly element
function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.className = 'butterfly';

    // Random starting position (bottom of screen)
    const startX = Math.random() * window.innerWidth;
    butterfly.style.left = startX + 'px';
    butterfly.style.bottom = '-50px';

    // Random animation duration and delay
    const duration = 3 + Math.random() * 2; // 3-5 seconds
    const horizontalMovement = (Math.random() - 0.5) * 300; // -150 to 150px

    butterfly.style.setProperty('--horizontal-movement', horizontalMovement + 'px');
    butterfly.style.animationDuration = duration + 's';

    // Butterfly SVG
    butterfly.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="butterfly-wings">
                <!-- Left wing -->
                <path d="M50,50 Q30,30 20,40 Q10,50 20,60 Q30,70 50,50" 
                      fill="currentColor" opacity="0.8" class="wing-left"/>
                <!-- Right wing -->
                <path d="M50,50 Q70,30 80,40 Q90,50 80,60 Q70,70 50,50" 
                      fill="currentColor" opacity="0.8" class="wing-right"/>
                <!-- Body -->
                <ellipse cx="50" cy="50" rx="3" ry="8" fill="currentColor"/>
                <!-- Antennae -->
                <path d="M50,45 Q48,38 46,35" stroke="currentColor" fill="none" stroke-width="1"/>
                <path d="M50,45 Q52,38 54,35" stroke="currentColor" fill="none" stroke-width="1"/>
            </g>
        </svg>
    `;

    return butterfly;
}

// Spawn butterflies
function spawnButterflies(count = 5) {
    const container = document.body;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const butterfly = createButterfly();
            container.appendChild(butterfly);

            // Remove butterfly after animation completes
            setTimeout(() => {
                butterfly.remove();
            }, 5000);
        }, i * 100); // Stagger the butterflies
    }
}

// Show compliment modal
function showCompliment() {
    const compliment = getRandomCompliment();

    // Create modal if it doesn't exist
    let modal = document.getElementById('compliment-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'compliment-modal';
        modal.className = 'compliment-modal';
        modal.innerHTML = `
            <div class="compliment-content glass">
                <p class="compliment-text"></p>
                <button class="compliment-close">✕</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Close button handler
        modal.querySelector('.compliment-close').addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Update text and show
    const textElement = modal.querySelector('.compliment-text');
    textElement.textContent = compliment;
    modal.classList.add('active');

    // Spawn butterflies
    spawnButterflies(6);

    // Play sound if enabled
    if (window.globalSettings && window.globalSettings.sound) {
        // Reuse existing click sound if available
        const clickSound = document.getElementById('clickSound');
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(() => { });
        }
    }
}

// Initialize compliment button
function initComplimentsButton() {
    const button = document.getElementById('compliments-btn');
    if (button) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showCompliment();
        });
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComplimentsButton);
} else {
    initComplimentsButton();
}
