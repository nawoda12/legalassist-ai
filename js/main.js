

// Demo section interactive preview
const demoContent = document.querySelector('.window-content');
if (demoContent) {
    const demoSteps = [
        {
            title: 'Upload Template',
            content: `
                <div class="demo-step">
                    <div class="upload-area">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p>Drag and drop your legal document template here</p>
                        <button class="demo-button">Choose File</button>
                    </div>
                </div>
            `
        },
        {
            title: 'Process Document',
            content: `
                <div class="demo-step">
                    <div class="processing">
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                        <p>AI analyzing document structure...</p>
                    </div>
                </div>
            `
        },
        {
            title: 'Fill Information',
            content: `
                <div class="demo-step">
                    <div class="form-preview">
                        <div class="form-field">
                            <label>Client Name</label>
                            <input type="text" placeholder="Enter client name">
                        </div>
                        <div class="form-field">
                            <label>Agreement Date</label>
                            <input type="date">
                        </div>
                        <div class="form-field">
                            <label>Terms & Conditions</label>
                            <textarea placeholder="Enter terms..."></textarea>
                        </div>
                        <button class="demo-button">Generate Document</button>
                    </div>
                </div>
            `
        }
    ];

    let currentStep = 0;

    function updateDemo() {
        demoContent.innerHTML = demoSteps[currentStep].content;
        
        // Add animation classes
        const demoStep = demoContent.querySelector('.demo-step');
        setTimeout(() => {
            demoStep.classList.add('active');
        }, 100);

        // If it's the processing step, animate the progress bar
        if (currentStep === 1) {
            const processing = demoContent.querySelector('.processing');
            setTimeout(() => {
                processing.classList.add('active');
            }, 500);
            
            // Move to next step after processing
            setTimeout(() => {
                currentStep = (currentStep + 1) % demoSteps.length;
                updateDemo();
            }, 3000);
        }

        // Add event listeners for demo interactions
        if (currentStep === 0) {
            const uploadArea = demoContent.querySelector('.upload-area');
            const chooseButton = demoContent.querySelector('.demo-button');

            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--accent-color)';
                uploadArea.style.background = 'var(--gray-100)';
            });

            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = 'var(--gray-400)';
                uploadArea.style.background = 'white';
            });

            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                currentStep = (currentStep + 1) % demoSteps.length;
                updateDemo();
            });

            chooseButton.addEventListener('click', () => {
                currentStep = (currentStep + 1) % demoSteps.length;
                updateDemo();
            });
        }

        if (currentStep === 2) {
            const generateButton = demoContent.querySelector('.demo-button');
            generateButton.addEventListener('click', () => {
                currentStep = 0;
                updateDemo();
            });
        }
    }

    // Initialize demo
    updateDemo();
}



// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step, .faq-item').forEach(el => {
    el.classList.add('animate-ready');
    observer.observe(el);
});



// Modal functionality
const cloudBtn = document.getElementById('cloud-btn');
const cloudModal = document.getElementById('cloud-modal');
const cloudModalClose = document.getElementById('cloud-modal-close');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const loginModalClose = document.getElementById('login-modal-close');

if (cloudBtn && cloudModal && cloudModalClose) {
    cloudBtn.addEventListener('click', () => {
        cloudModal.style.display = 'flex';
        cloudModal.setAttribute('aria-hidden', 'false');
    });

    cloudModalClose.addEventListener('click', () => {
        cloudModal.style.display = 'none';
        cloudModal.setAttribute('aria-hidden', 'true');
    });

    // Close modal on outside click
    cloudModal.addEventListener('click', (e) => {
        if (e.target === cloudModal) {
            cloudModal.style.display = 'none';
            cloudModal.setAttribute('aria-hidden', 'true');
        }
    });

    // Cloud provider buttons
    cloudModal.querySelectorAll('.cloud-option').forEach(button => {
        button.addEventListener('click', () => {
            const provider = button.getAttribute('data-provider');
            alert(`Selected cloud provider: ${provider}. Integration to be implemented.`);
            cloudModal.style.display = 'none';
            cloudModal.setAttribute('aria-hidden', 'true');
        });
    });
}

if (loginBtn && loginModal && loginModalClose) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.style.display = 'flex';
        loginModal.setAttribute('aria-hidden', 'false');
    });

    loginModalClose.addEventListener('click', () => {
        loginModal.style.display = 'none';
        loginModal.setAttribute('aria-hidden', 'true');
    });

    // Close modal on outside click
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            loginModal.setAttribute('aria-hidden', 'true');
        }
    });

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality to be implemented.');
            loginModal.style.display = 'none';
            loginModal.setAttribute('aria-hidden', 'true');
        });
    }
}


