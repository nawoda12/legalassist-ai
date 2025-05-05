// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-item').forEach(item => {
    const title = item.querySelector('h3');
    
    title.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Toggle clicked FAQ
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

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

// Add CSS styles for animations
const style = document.createElement('style');
style.textContent = `
    .animate-ready {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .demo-step {
        transition: opacity 0.3s ease;
    }

    .progress {
        height: 4px;
        background: var(--accent-color);
        transition: width 2.5s ease;
    }

    .progress-bar {
        width: 100%;
        height: 4px;
        background: var(--gray-200);
        border-radius: 2px;
        overflow: hidden;
    }

    .upload-area {
        border: 2px dashed var(--gray-300);
        border-radius: 0.5rem;
        padding: 2rem;
        text-align: center;
    }

    .form-preview {
        max-width: 400px;
        margin: 0 auto;
    }

    .form-field {
        margin-bottom: 1rem;
    }

    .form-field label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
    }

    .form-field input,
    .form-field textarea {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--gray-300);
        border-radius: 0.25rem;
    }

    .demo-button {
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s ease;
    }

    .demo-button:hover {
        background-color: #2C5282;
    }
`;

document.head.appendChild(style);
