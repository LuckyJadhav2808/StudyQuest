// Application State
let state = {
    xp: 0,
    streak: 0,
    level: 1,
    tasks: [],
    classes: [],
    notes: [],
    events: [],
    subjects: [],
    resources: [],
    achievements: [
        { id: 1, name: "First Step", description: "Complete your first task", icon: "fa-flag", unlocked: false, progress: 0, target: 1 },
        { id: 2, name: "Marathon Runner", description: "Complete 5 Pomodoro sessions in one day", icon: "fa-running", unlocked: false, progress: 0, target: 5 },
        { id: 3, name: "Consistency is Key", description: "Maintain a 7-day study streak", icon: "fa-calendar-check", unlocked: false, progress: 0, target: 7 },
        { id: 4, name: "Subject Master", description: "Log 10 study sessions for a single subject", icon: "fa-graduation-cap", unlocked: false, progress: 0, target: 10 },
        { id: 5, name: "Task Crusher", description: "Complete 20 total tasks", icon: "fa-tasks", unlocked: false, progress: 0, target: 20 },
        { id: 6, name: "Early Bird", description: "Start a study session before 8 AM", icon: "fa-sun", unlocked: false, progress: 0, target: 1 },
        { id: 7, name: "Weekend Warrior", description: "Log a study session on a weekend", icon: "fa-calendar-week", unlocked: false, progress: 0, target: 1 },
        { id: 8, name: "Perfect Week", description: "Fulfill every planned timetable slot for a week", icon: "fa-trophy", unlocked: false, progress: 0, target: 1 }
    ],
    timerSessions: 0,
    lastStudyDate: null,
    studySessions: {},
    currentNoteId: null,
    currentEditingClass: null,
    currentEditingTask: null,
    currentEditingEvent: null,
    currentEditingSubject: null,
    currentEditingResource: null,
    username: "John Student",
    studySpaceName: "My Study Space",
    focusEmoji: "🐉",
    sessionNames: ["Crunch Time", "Deep Work", "Focus Burst"],
    theme: "dark",
    lastActivityDate: null,
    studyPredictions: {},
    surpriseRewards: [],
    notesViewMode: "edit",
    emojiPowerUps: {
        dragon: { active: false, endTime: null, xpMultiplier: 2 },
        owl: { active: false, endTime: null, reducedNotifications: true },
        rocket: { active: false, endTime: null, taskBonus: 1.5 },
        brain: { active: false, endTime: null, betterPredictions: true }
    },
    emojiLevel: 1,
    environment: "clear",
    mindMaps: [],
    currentMindMap: null,
    quickTemplates: {
        lecture: "<h2>Lecture Notes</h2><h3>Topic:</h3><p>Main points:</p><ul><li>Key concept 1</li><li>Key concept 2</li><li>Key concept 3</li></ul><h3>Summary:</h3><p>Overall understanding:</p>",
        book: "<h2>Book Summary</h2><h3>Title:</h3><p>Author:</p><h3>Key Takeaways:</h3><ul><li>Important point 1</li><li>Important point 2</li><li>Important point 3</li></ul><h3>Quotes:</h3><blockquote>Memorable quote</blockquote>",
        meeting: "<h2>Meeting Notes</h2><h3>Date:</h3><p>Attendees:</p><h3>Agenda:</h3><ol><li>Topic 1</li><li>Topic 2</li><li>Topic 3</li></ol><h3>Action Items:</h3><ul><li>Task 1 - Owner - Due Date</li><li>Task 2 - Owner - Due Date</li></ul>",
        code: "<h2>Code Documentation</h2><h3>Function:</h3><div class='code-block'><div class='code-header'>JavaScript <button class='copy-code-btn'>Copy</button></div><div class='code-content'><pre><code class='language-javascript'>// Your code here\nfunction example() {\n  return \"Hello, World!\";\n}</code></pre></div></div><h3>Explanation:</h3><p>What this code does:</p>"
    },
    currentMood: null,
    seasonalTheme: null,
    activeQuest: null,
    sessionHistory: [],
    whiteboardData: null,
    storyHistory: [],
    studyChallenges: [
        { id: 1, name: "Focus Marathon", description: "Complete 3 focus sessions today", icon: "fa-running", progress: 0, target: 3, completed: false, reward: 50 },
        { id: 2, name: "Note Taker", description: "Create 2 new notes", icon: "fa-sticky-note", progress: 0, target: 2, completed: false, reward: 30 },
        { id: 3, name: "Task Master", description: "Complete 5 tasks", icon: "fa-tasks", progress: 0, target: 5, completed: false, reward: 75 },
        { id: 4, name: "Early Riser", description: "Start studying before 9 AM", icon: "fa-sun", progress: 0, target: 1, completed: false, reward: 25 }
    ],
    studyBuddy: {
        mood: "happy",
        level: 1,
        messages: [
            "Ready to study? Let's go! 📚",
            "You're doing great! Keep it up! 💪",
            "Time for a break? You've earned it! ☕",
            "New achievement unlocked! 🏆",
            "Almost there! One more session! 🔥"
        ]
    },
    customBackground: null,
    whiteboardHistory: [],
    whiteboardHistoryIndex: -1,
    timerState: {
        minutes: 25,
        seconds: 0,
        running: false,
        mode: 'focus',
        extended: false
    }
};

// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const viewAllLinks = document.querySelectorAll('.view-all');
const classModal = document.getElementById('class-modal');
const taskModal = document.getElementById('task-modal');
const eventModal = document.getElementById('event-modal');
const subjectModal = document.getElementById('subject-modal');
const resourceModal = document.getElementById('resource-modal');
const classForm = document.getElementById('class-form');
const taskForm = document.getElementById('task-form');
const eventForm = document.getElementById('event-form');
const subjectForm = document.getElementById('subject-form');
const resourceForm = document.getElementById('resource-form');
const addClassBtn = document.getElementById('add-class-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const addEventBtn = document.getElementById('add-event-btn');
const addSubjectBtn = document.getElementById('add-subject-btn');
const addResourceBtn = document.getElementById('add-resource-btn');
const addNoteBtn = document.getElementById('add-note-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const taskList = document.getElementById('task-list');
const dashboardTasks = document.getElementById('dashboard-tasks');
const notesList = document.getElementById('notes-list');
const saveNoteBtn = document.getElementById('save-note-btn');
const newNoteBtn = document.getElementById('new-note-btn');
const exportNoteBtn = document.getElementById('export-note-btn');
const deleteNoteBtn = document.getElementById('delete-note-btn');
const noteTitle = document.getElementById('note-title');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const skipBreakBtn = document.getElementById('skip-break-btn');
const extendSessionBtn = document.getElementById('extend-session-btn');
const timerDisplay = document.getElementById('timer-display');
const modeButtons = document.querySelectorAll('.mode-btn');
const startTimerFromDashboard = document.getElementById('start-timer-from-dashboard');
const timerPreviewDisplay = document.getElementById('timer-preview-display');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');
const xpCount = document.getElementById('xp-count');
const streakCount = document.getElementById('streak-count');
const levelCount = document.getElementById('level-count');
const userLevel = document.getElementById('user-level');
const xpProgressText = document.getElementById('xp-progress-text');
const xpProgressBar = document.getElementById('xp-progress-bar');
const sessionsCount = document.getElementById('sessions-count');
const sessionsProgress = document.getElementById('sessions-progress');
const todaySchedule = document.getElementById('today-schedule');
const notificationList = document.getElementById('notification-list');
const smartReminders = document.getElementById('smart-reminders');
const timetableGrid = document.getElementById('timetable-grid');
const calendarGrid = document.getElementById('calendar-grid');
const subjectsGrid = document.getElementById('subjects-grid');
const resourcesContainer = document.getElementById('resources-container');
const achievementsGrid = document.getElementById('achievements-grid');
const studyPredictions = document.getElementById('study-predictions');
const taskSubjectSelect = document.getElementById('task-subject');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const backupDataBtn = document.getElementById('backup-data-btn');
const restoreDataBtn = document.getElementById('restore-data-btn');
const restoreFileInput = document.getElementById('restore-file');
const settingsUsername = document.getElementById('settings-username');
const studySpaceName = document.getElementById('study-space-name');
const saveProfileBtn = document.getElementById('save-profile-btn');
const themeOptions = document.querySelectorAll('.theme-option');
const focusEmojis = document.querySelectorAll('.personalization-option');
const sessionName1 = document.getElementById('custom-session-name-1');
const sessionName2 = document.getElementById('custom-session-name-2');
const sessionName3 = document.getElementById('custom-session-name-3');
const deleteEventBtn = document.getElementById('delete-event-btn');
const editModeBtn = document.getElementById('edit-mode-btn');
const viewModeBtn = document.getElementById('view-mode-btn');
const notesReadonly = document.getElementById('notes-readonly');
const copyDataBtn = document.getElementById('copy-data-btn');
const autoDeleteCompletedBtn = document.getElementById('auto-delete-completed-btn');

// Enhanced feature elements
const focusEmoji = document.getElementById('focus-emoji');
const emojiMessage = document.getElementById('emoji-message');
const emojiPowerUpIndicator = document.getElementById('emoji-power-up-indicator');
const emojiEvolution = document.getElementById('emoji-evolution');
const environmentEffects = document.getElementById('environment-effects');
const environmentSelector = document.getElementById('environment-selector');
const environmentOptions = document.querySelectorAll('.environment-option');
const mindMapModeBtn = document.getElementById('mind-map-mode-btn');
const mindMapContainer = document.getElementById('mind-map-container');
const copyNoteBtn = document.getElementById('copy-note-btn');
const summarizeNoteBtn = document.getElementById('summarize-note-btn');

// New feature elements
const templateButtons = document.querySelectorAll('.template-btn');
const sessionResume = document.getElementById('session-resume');
const resumeSessionBtn = document.getElementById('resume-session-btn');
const moodButtons = document.querySelectorAll('.mood-btn');
const seasonalThemeIndicator = document.getElementById('seasonal-theme');
const sessionTemplates = document.querySelectorAll('.session-template');
const sessionNameElements = document.querySelectorAll('.session-name');
const generateSessionNameBtn = document.getElementById('generate-session-name');
const storyTopicInput = document.getElementById('story-topic');
const storyStyleSelect = document.getElementById('story-style');
const storyCharacterInput = document.getElementById('story-character');
const storyLengthSelect = document.getElementById('story-length');
const generateStoryBtn = document.getElementById('generate-story-btn');
const storyOutput = document.getElementById('story-output');
const whiteboardCanvas = document.getElementById('whiteboard-canvas');
const whiteboardTools = document.querySelectorAll('.whiteboard-tool');
const clearWhiteboardBtn = document.getElementById('clear-whiteboard');
const saveWhiteboardBtn = document.getElementById('save-whiteboard');
const undoWhiteboardBtn = document.getElementById('undo-whiteboard');
const redoWhiteboardBtn = document.getElementById('redo-whiteboard');
const brushSizes = document.querySelectorAll('.brush-size');
const colorOptions = document.querySelectorAll('.color-option');
const questCards = document.querySelectorAll('.quest-card');
const selectQuestBtn = document.getElementById('select-quest-btn');
const studyBuddy = document.getElementById('study-buddy');
const buddyMessage = document.getElementById('buddy-message');
const studyChallengesContainer = document.getElementById('study-challenges');
const backgroundSelector = document.getElementById('background-selector');
const backgroundOptions = document.querySelectorAll('.background-option');
const customBackgroundInput = document.getElementById('custom-background');
const applyCustomBackgroundBtn = document.getElementById('apply-custom-background');

// Quill Editor
let quill;
if (document.getElementById('editor')) {
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ]
        },
        placeholder: 'Start typing your note here...'
    });
}

// Timer Variables
let timerInterval;
let timerMinutes = 25;
let timerSeconds = 0;
let timerRunning = false;
let timerMode = 'focus';
let extendedSession = false;

// Calendar Variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Whiteboard Variables
let whiteboardCtx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'pen';
let currentColor = '#e94560';
let currentLineWidth = 3;

// Initialize the application
function init() {
    loadState();
    setupEventListeners();
    renderAll();
    updateStats();
    setupCharts();
    applyTheme();
    updateSmartReminders();
    updateStudyPredictions();
    
    // Initialize enhanced features
    setupFocusEmoji();
    setupEnvironment();
    setupMindMap();
    
    // Initialize new features
    setupQuickTemplates();
    setupSessionResume();
    setupMoodCheckin();
    setupSeasonalThemes();
    setupSessionTemplates();
    setupSessionNaming();
    setupWhiteboard();
    setupStudyQuests();
    setupStudyBuddy();
    setupStudyChallenges();
    setupBackgroundSelector();
    
    // Check if user studied today for streak
    checkStreak();
    
    // Set up interval for smart reminders
    setInterval(updateSmartReminders, 60000);
    setInterval(checkSurpriseRewards, 30000);
    setInterval(checkPowerUps, 1000);
    setInterval(updateStudyBuddy, 60000);
}

// Load state from localStorage
function loadState() {
    const savedState = localStorage.getItem('studyQuestState');
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        state = { ...state, ...parsedState };
        
        // Update username in settings if it exists
        if (state.username) {
            settingsUsername.value = state.username;
            document.getElementById('user-name').textContent = state.username;
            document.getElementById('user-avatar').textContent = state.username.substring(0, 2).toUpperCase();
        }
        
        // Update study space name
        if (state.studySpaceName) {
            studySpaceName.value = state.studySpaceName;
        }
        
        // Update focus emoji
        if (state.focusEmoji) {
            focusEmojis.forEach(emoji => {
                if (emoji.getAttribute('data-emoji') === state.focusEmoji) {
                    emoji.classList.add('active');
                } else {
                    emoji.classList.remove('active');
                }
            });
            focusEmoji.textContent = state.focusEmoji;
        }
        
        // Update session names
        if (state.sessionNames && state.sessionNames.length >= 3) {
            sessionName1.value = state.sessionNames[0];
            sessionName2.value = state.sessionNames[1];
            sessionName3.value = state.sessionNames[2];
        }
        
        // Update notes view mode
        if (state.notesViewMode) {
            setNotesViewMode(state.notesViewMode);
        }
        
        // Update environment
        if (state.environment) {
            setEnvironment(state.environment);
        }
        
        // Update emoji level
        if (state.emojiLevel) {
            updateEmojiLevel(state.emojiLevel);
        }
        
        // Update seasonal theme
        if (state.seasonalTheme) {
            applySeasonalTheme(state.seasonalTheme);
        }
        
        // Update active quest
        if (state.activeQuest) {
            questCards.forEach(card => {
                if (card.getAttribute('data-quest') === state.activeQuest) {
                    card.classList.add('active');
                }
            });
        }
        
        // Update custom background
        if (state.customBackground) {
            applyCustomBackground(state.customBackground);
        }
        
        // Load timer state if exists
        if (state.timerState) {
            timerMinutes = state.timerState.minutes;
            timerSeconds = state.timerState.seconds;
            timerRunning = state.timerState.running;
            timerMode = state.timerState.mode;
            extendedSession = state.timerState.extended;
            
            updateTimerDisplay();
            
            if (timerRunning) {
                startTimer();
            }
        }
    }
}

// Save state to localStorage
function saveState() {
    // Save current timer state
    state.timerState = {
        minutes: timerMinutes,
        seconds: timerSeconds,
        running: timerRunning,
        mode: timerMode,
        extended: extendedSession
    };
    
    localStorage.setItem('studyQuestState', JSON.stringify(state));
}

// Setup event listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
            
            // Close mobile menu if open
            sidebar.classList.remove('active');
        });
    });

    // View All links
    viewAllLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            document.querySelector(`[data-section="${targetSection}"]`).classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
            
            // Close mobile menu if open
            sidebar.classList.remove('active');
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });

    // Modal buttons
    addClassBtn.addEventListener('click', () => {
        document.getElementById('class-modal-title').textContent = 'Add Class';
        document.getElementById('edit-class-id').value = '';
        document.getElementById('delete-class-btn').style.display = 'block';
        classModal.classList.add('active');
    });

    addTaskBtn.addEventListener('click', () => {
        document.getElementById('task-modal-title').textContent = 'Add Task';
        document.getElementById('edit-task-id').value = '';
        taskModal.classList.add('active');
    });

    addEventBtn.addEventListener('click', () => {
        document.getElementById('event-modal-title').textContent = 'Add Event';
        document.getElementById('edit-event-id').value = '';
        document.getElementById('delete-event-btn').style.display = 'block';
        eventModal.classList.add('active');
    });

    addSubjectBtn.addEventListener('click', () => {
        document.getElementById('subject-modal-title').textContent = 'Add Subject';
        document.getElementById('edit-subject-id').value = '';
        document.getElementById('delete-subject-btn').style.display = 'block';
        subjectModal.classList.add('active');
    });

    addResourceBtn.addEventListener('click', () => {
        document.getElementById('resource-modal-title').textContent = 'Add Resource';
        document.getElementById('edit-resource-id').value = '';
        document.getElementById('delete-resource-btn').style.display = 'block';
        resourceModal.classList.add('active');
    });

    addNoteBtn.addEventListener('click', () => {
        newNote();
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            classModal.classList.remove('active');
            taskModal.classList.remove('active');
            eventModal.classList.remove('active');
            subjectModal.classList.remove('active');
            resourceModal.classList.remove('active');
        });
    });

    // Form submissions
    classForm.addEventListener('submit', handleClassSubmit);
    taskForm.addEventListener('submit', handleTaskSubmit);
    eventForm.addEventListener('submit', handleEventSubmit);
    subjectForm.addEventListener('submit', handleSubjectSubmit);
    resourceForm.addEventListener('submit', handleResourceSubmit);

    // Timer controls
    startTimerBtn.addEventListener('click', startTimer);
    pauseTimerBtn.addEventListener('click', pauseTimer);
    resetTimerBtn.addEventListener('click', resetTimer);
    skipBreakBtn.addEventListener('click', skipBreak);
    extendSessionBtn.addEventListener('click', extendSession);
    startTimerFromDashboard.addEventListener('click', () => {
        // Navigate to timer and start it
        navLinks.forEach(nav => nav.classList.remove('active'));
        document.querySelector('[data-section="timer"]').classList.add('active');
        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === 'timer') {
                section.classList.add('active');
            }
        });
        startTimer();
    });

 // Timer mode buttons
modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // If timer is running, stop it first
        if (timerRunning) {
            clearInterval(timerInterval);
            timerRunning = false;
        }
        
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const minutes = parseInt(btn.getAttribute('data-minutes'));
        timerMinutes = minutes;
        timerSeconds = 0;
        updateTimerDisplay();
        
        // Set timer mode
        if (minutes === 25) timerMode = 'focus';
        else if (minutes === 5) timerMode = 'shortBreak';
        else if (minutes === 15) timerMode = 'longBreak';
        
        // Reset extended session when changing modes
        extendedSession = false;
        
        // Update button states
        startTimerBtn.disabled = false;
        pauseTimerBtn.disabled = true;
        
        saveState();
    });
});

    // Note controls
    saveNoteBtn.addEventListener('click', saveNote);
    newNoteBtn.addEventListener('click', newNote);
    exportNoteBtn.addEventListener('click', exportNoteAsPDF);
    deleteNoteBtn.addEventListener('click', deleteNote);

    // Notes view mode buttons
    editModeBtn.addEventListener('click', () => {
        setNotesViewMode('edit');
    });
    
    viewModeBtn.addEventListener('click', () => {
        setNotesViewMode('view');
    });
    
    // Mind map mode button
    mindMapModeBtn.addEventListener('click', () => {
        setNotesViewMode('mindmap');
    });

    // Calendar navigation
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    // Delete buttons in modals
    document.getElementById('delete-class-btn').addEventListener('click', deleteClass);
    document.getElementById('delete-subject-btn').addEventListener('click', deleteSubject);
    document.getElementById('delete-resource-btn').addEventListener('click', deleteResource);
    deleteEventBtn.addEventListener('click', deleteEvent);

    // Backup and Restore
    backupDataBtn.addEventListener('click', backupData);
    restoreDataBtn.addEventListener('click', restoreData);
    copyDataBtn.addEventListener('click', copyDataToClipboard);

    // Settings
    saveProfileBtn.addEventListener('click', saveProfile);
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    // Personalization
    focusEmojis.forEach(emoji => {
        emoji.addEventListener('click', () => {
            focusEmojis.forEach(e => e.classList.remove('active'));
            emoji.classList.add('active');
            state.focusEmoji = emoji.getAttribute('data-emoji');
            focusEmoji.textContent = state.focusEmoji;
            saveState();
            showToast(`Focus emoji updated to ${state.focusEmoji}`);
        });
    });

    // Session names
    [sessionName1, sessionName2, sessionName3].forEach((input, index) => {
        input.addEventListener('change', () => {
            state.sessionNames[index] = input.value;
            saveState();
        });
    });

    // Auto-delete completed tasks
    autoDeleteCompletedBtn.addEventListener('click', autoDeleteCompletedTasks);
    
    // Enhanced feature event listeners
    setupEnhancedFeatureListeners();
    
    // New feature event listeners
    setupNewFeatureListeners();
}

// Setup enhanced feature event listeners
function setupEnhancedFeatureListeners() {
    // Focus emoji interaction
    focusEmoji.addEventListener('click', handleEmojiClick);
    
    // Environment selector
    environmentOptions.forEach(option => {
        option.addEventListener('click', () => {
            const environment = option.getAttribute('data-environment');
            setEnvironment(environment);
        });
    });
    
    // Note sharing
    copyNoteBtn.addEventListener('click', copyNoteToClipboard);
    summarizeNoteBtn.addEventListener('click', summarizeNote);
    
    // Study buddy
    studyBuddy.addEventListener('click', handleStudyBuddyClick);
    
    // Background selector
    backgroundOptions.forEach(option => {
        option.addEventListener('click', () => {
            const background = option.getAttribute('data-background');
            setBackground(background);
        });
    });
    
    // Custom background
    applyCustomBackgroundBtn.addEventListener('click', () => {
        const backgroundUrl = customBackgroundInput.value.trim();
        if (backgroundUrl) {
            setBackground('custom', backgroundUrl);
        } else {
            showToast('Please enter a valid URL', 'error');
        }
    });
}

// Setup new feature event listeners
function setupNewFeatureListeners() {
    // Quick templates
    templateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const template = btn.getAttribute('data-template');
            applyQuickTemplate(template);
        });
    });
    
    // Session resume
    resumeSessionBtn.addEventListener('click', resumeLastSession);
    
    // Mood check-in
    moodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mood = btn.getAttribute('data-mood');
            setMood(mood);
        });
    });
    
    // Session templates
    sessionTemplates.forEach(template => {
        template.addEventListener('click', () => {
            const templateType = template.getAttribute('data-template');
            applySessionTemplate(templateType);
        });
    });
    
    // Session naming
    generateSessionNameBtn.addEventListener('click', generateSessionName);
    sessionNameElements.forEach(name => {
        name.addEventListener('click', () => {
            sessionNameElements.forEach(n => n.style.background = 'rgba(255, 255, 255, 0.1)');
            name.style.background = 'rgba(233, 69, 96, 0.3)';
        });
    });
    
    // Story creator
    generateStoryBtn.addEventListener('click', generateStory);
    
    // Whiteboard tools
    whiteboardTools.forEach(tool => {
        tool.addEventListener('click', () => {
            whiteboardTools.forEach(t => t.classList.remove('active'));
            tool.classList.add('active');
            currentTool = tool.getAttribute('data-tool');
            
            // Update drawing settings based on tool
            switch(currentTool) {
                case 'pen':
                    whiteboardCtx.globalCompositeOperation = 'source-over';
                    whiteboardCtx.strokeStyle = currentColor;
                    whiteboardCtx.lineWidth = currentLineWidth;
                    whiteboardCtx.lineCap = 'round';
                    whiteboardCtx.lineJoin = 'round';
                    break;
                case 'eraser':
                    whiteboardCtx.globalCompositeOperation = 'destination-out';
                    whiteboardCtx.strokeStyle = 'rgba(0,0,0,1)';
                    whiteboardCtx.lineWidth = 20;
                    whiteboardCtx.lineCap = 'round';
                    whiteboardCtx.lineJoin = 'round';
                    break;
                case 'rectangle':
                case 'circle':
                case 'line':
                case 'text':
                    whiteboardCtx.globalCompositeOperation = 'source-over';
                    whiteboardCtx.strokeStyle = currentColor;
                    whiteboardCtx.lineWidth = currentLineWidth;
                    break;
            }
        });
    });
    
    // Brush sizes
    brushSizes.forEach(size => {
        size.addEventListener('click', () => {
            brushSizes.forEach(s => s.classList.remove('active'));
            size.classList.add('active');
            currentLineWidth = parseInt(size.getAttribute('data-size'));
            whiteboardCtx.lineWidth = currentLineWidth;
        });
    });
    
    // Color options
    colorOptions.forEach(color => {
        color.addEventListener('click', () => {
            colorOptions.forEach(c => c.classList.remove('active'));
            color.classList.add('active');
            currentColor = color.getAttribute('data-color');
            if (currentTool === 'pen' || currentTool === 'rectangle' || currentTool === 'circle' || currentTool === 'line' || currentTool === 'text') {
                whiteboardCtx.strokeStyle = currentColor;
                whiteboardCtx.fillStyle = currentColor;
            }
        });
    });
    
    // Whiteboard actions
    clearWhiteboardBtn.addEventListener('click', clearWhiteboard);
    saveWhiteboardBtn.addEventListener('click', saveWhiteboard);
    undoWhiteboardBtn.addEventListener('click', undoWhiteboard);
    redoWhiteboardBtn.addEventListener('click', redoWhiteboard);
    
    // Study quests
    questCards.forEach(card => {
        card.addEventListener('click', () => {
            questCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
    
    selectQuestBtn.addEventListener('click', selectQuest);
}

// Enhanced Whiteboard Functions
function setupWhiteboard() {
    const canvas = document.getElementById('whiteboard-canvas');
    const container = document.getElementById('whiteboard');
    
    // Set canvas size to match container
    canvas.width = container.offsetWidth;
    canvas.height = 400;
    
    whiteboardCtx = canvas.getContext('2d');
    
    // Set initial whiteboard style
    whiteboardCtx.strokeStyle = currentColor;
    whiteboardCtx.lineWidth = currentLineWidth;
    whiteboardCtx.lineCap = 'round';
    whiteboardCtx.lineJoin = 'round';
    whiteboardCtx.fillStyle = 'white';
    whiteboardCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Whiteboard event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Load saved whiteboard data if exists
    if (state.whiteboardData) {
        const img = new Image();
        img.onload = function() {
            whiteboardCtx.drawImage(img, 0, 0);
        };
        img.src = state.whiteboardData;
    }
}

function startDrawing(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function draw(e) {
    if (!isDrawing) return;
    
    whiteboardCtx.beginPath();
    whiteboardCtx.moveTo(lastX, lastY);
    whiteboardCtx.lineTo(e.offsetX, e.offsetY);
    whiteboardCtx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
}

function stopDrawing() {
    isDrawing = false;
}

function clearWhiteboard() {
    whiteboardCtx.fillStyle = 'white';
    whiteboardCtx.fillRect(0, 0, whiteboardCanvas.width, whiteboardCanvas.height);
}

function saveWhiteboard() {
    const dataURL = whiteboardCanvas.toDataURL('image/png');
    state.whiteboardData = dataURL;
    saveState();
    showToast('Whiteboard saved successfully!');
}

function undoWhiteboard() {
    // Implementation for undo functionality
    showToast('Undo feature coming soon!', 'info');
}

function redoWhiteboard() {
    // Implementation for redo functionality
    showToast('Redo feature coming soon!', 'info');
}

// Enhanced Story Generator Functions
function generateStory() {
    const topic = storyTopicInput.value.trim();
    const style = storyStyleSelect.value;
    const character = storyCharacterInput.value.trim() || 'You';
    const length = storyLengthSelect.value;
    
    if (!topic) {
        showToast('Please enter a topic for your story', 'error');
        return;
    }
    
    // Show loading state
    generateStoryBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Story...';
    generateStoryBtn.disabled = true;
    
    // Simulate processing time
    setTimeout(() => {
        const storyTemplates = {
            adventure: {
                title: `The Quest for ${topic}`,
                intro: `${character} embarks on an epic journey to master the secrets of ${topic}.`,
                challenge: `Along the way, ${character} faces challenges that test understanding of ${topic}.`,
                resolution: `Through perseverance, ${character} achieves complete mastery of ${topic}!`
            },
            mystery: {
                title: `The Mystery of ${topic}`,
                intro: `A puzzling enigma surrounds ${topic}, and only ${character} can solve it.`,
                challenge: `Clues about ${topic} are scattered everywhere, each more puzzling than the last.`,
                resolution: `${character} pieces together all the clues and solves the ${topic} mystery!`
            }
        };

        const template = storyTemplates[style] || storyTemplates.adventure;
        
        let story = '';
        if (length === 'short') {
            story = `${template.intro} ${template.resolution}`;
        } else if (length === 'medium') {
            story = `${template.intro} ${template.challenge} ${template.resolution}`;
        } else {
            story = `${template.intro} ${template.challenge} Through dedication and curiosity, ${character} discovers fascinating connections. ${template.resolution}`;
        }

        // Display the story
        storyOutput.innerHTML = `
            <div class="story-result">
                <h3 style="color: var(--accent); margin-bottom: 15px;">${template.title}</h3>
                <div class="story-content" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px; margin-bottom: 15px; line-height: 1.6;">
                    <p>${story}</p>
                </div>
                <div class="story-actions" style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-primary" id="save-story-btn">
                        <i class="fas fa-save"></i> Save as Note
                    </button>
                    <button class="btn btn-secondary" id="new-story-btn">
                        <i class="fas fa-plus"></i> Create Another
                    </button>
                </div>
            </div>
        `;
        
        storyOutput.style.display = 'block';
        
        // Add event listeners to the new buttons
        document.getElementById('save-story-btn').addEventListener('click', function() {
            saveStoryAsNote(topic, story, template.title);
        });
        
        document.getElementById('new-story-btn').addEventListener('click', function() {
            storyOutput.style.display = 'none';
            storyTopicInput.value = '';
            storyCharacterInput.value = 'You';
        });
        
        // Reset button state
        generateStoryBtn.innerHTML = '<i class="fas fa-magic"></i> Create Learning Story';
        generateStoryBtn.disabled = false;
        
    }, 1000);
}

function saveStoryAsNote(topic, story, title) {
    const note = {
        id: generateId(),
        title: `Story: ${title}`,
        content: `<h2>${title}</h2><p>${story}</p>`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    state.notes.push(note);
    saveState();
    renderNotes();
    showToast('Story saved as note!');
}

// Study Buddy Functions
function setupStudyBuddy() {
    studyBuddy.textContent = getBuddyEmoji();
    updateStudyBuddy();
}

function getBuddyEmoji() {
    switch(state.studyBuddy.mood) {
        case 'happy': return '😊';
        case 'sad': return '😔';
        case 'excited': return '🤩';
        case 'tired': return '😴';
        case 'focused': return '🧠';
        default: return '👨‍🎓';
    }
}

function handleStudyBuddyClick() {
    const messages = state.studyBuddy.messages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showBuddyMessage(randomMessage);
}

function showBuddyMessage(message) {
    buddyMessage.textContent = message;
    buddyMessage.classList.add('show');
    
    setTimeout(() => {
        buddyMessage.classList.remove('show');
    }, 3000);
}

function updateStudyBuddy() {
    // Update buddy based on study activity
    const now = new Date();
    const lastActivity = state.lastActivityDate ? new Date(state.lastActivityDate) : null;
    
    if (lastActivity && (now - lastActivity) < 30 * 60 * 1000) {
        // Recently active
        state.studyBuddy.mood = 'focused';
    } else if (state.timerSessions > 0) {
        // Has studied today
        state.studyBuddy.mood = 'happy';
    } else {
        // Not active
        state.studyBuddy.mood = 'sad';
    }
    
    studyBuddy.textContent = getBuddyEmoji();
    saveState();
}

// Replace the setupStudyChallenges and renderStudyChallenges functions with these corrected versions:

function setupStudyChallenges() {
    renderStudyChallenges();
}

function renderStudyChallenges() {
    studyChallengesContainer.innerHTML = '';
    
    if (state.studyChallenges.length === 0) {
        studyChallengesContainer.innerHTML = '<div class="empty-state">Complete tasks and study sessions to unlock challenges!</div>';
        return;
    }
    
    state.studyChallenges.forEach(challenge => {
        const challengeCard = document.createElement('div');
        challengeCard.className = `challenge-card ${challenge.completed ? 'active' : ''}`;
        
        const progressPercent = (challenge.progress / challenge.target) * 100;
        
        challengeCard.innerHTML = `
            <div class="challenge-icon">
                <i class="fas ${challenge.icon}"></i>
            </div>
            <h3>${challenge.name}</h3>
            <p>${challenge.description}</p>
            <div class="challenge-progress">
                <div class="challenge-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-top: 5px;">
                <span>Progress: ${challenge.progress}/${challenge.target}</span>
                <span>Reward: ${challenge.reward} XP</span>
            </div>
            ${challenge.completed ? 
                '<div style="color: var(--success); margin-top: 10px; font-weight: 600;"><i class="fas fa-check-circle"></i> Completed!</div>' : 
                '<button class="btn btn-primary start-challenge" data-challenge-id="${challenge.id}" style="margin-top: 10px; width: 100%;">Start Challenge</button>'
            }
        `;
        
        studyChallengesContainer.appendChild(challengeCard);
    });
    
    // Add event listeners to start challenge buttons AFTER they are created
    setTimeout(() => {
        document.querySelectorAll('.start-challenge').forEach(btn => {
            btn.addEventListener('click', function() {
                const challengeId = parseInt(this.getAttribute('data-challenge-id'));
                startChallenge(challengeId);
            });
        });
    }, 0);
}

// Also update the startChallenge function to be more robust:

function startChallenge(challengeId) {
    console.log('Starting challenge:', challengeId); // Debug log
    
    const challenge = state.studyChallenges.find(c => c.id === challengeId);
    if (challenge && !challenge.completed) {
        showToast(`Challenge started: ${challenge.name}!`, 'success');
        
        // Increment progress
        challenge.progress = Math.min(challenge.progress + 1, challenge.target);
        
        // Check if challenge is completed
        if (challenge.progress >= challenge.target) {
            challenge.completed = true;
            awardXP(challenge.reward);
            showToast(`Challenge completed: ${challenge.name}! You earned ${challenge.reward} XP!`, 'success');
            
            // Add notification for completion
            addNotification(`Challenge Completed: ${challenge.name}`);
        }
        
        saveState();
        renderStudyChallenges(); // Re-render to update progress
        
        // Update stats display
        updateStats();
    } else if (challenge && challenge.completed) {
        showToast('This challenge is already completed!', 'info');
    } else {
        showToast('Challenge not found!', 'error');
    }
}

// Background Selector Functions
function setupBackgroundSelector() {
    // Set active background based on state
    if (state.customBackground) {
        document.querySelector(`[data-background="custom"]`).classList.add('active');
    } else {
        document.querySelector(`[data-background="${state.customBackground || 'default'}"]`).classList.add('active');
    }
}

function setBackground(background, customUrl = null) {
    // Update background options
    backgroundOptions.forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-background="${background}"]`).classList.add('active');
    
    // Apply background
    if (background === 'custom' && customUrl) {
        applyCustomBackground(customUrl);
    } else {
        applyPresetBackground(background);
    }
    
    saveState();
}

function applyPresetBackground(background) {
    const backgrounds = {
        default: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
        space: 'linear-gradient(135deg, #0a0a1a, #1a1a2e)',
        forest: 'linear-gradient(135deg, #1a3a1a, #2d5a2d)',
        beach: 'linear-gradient(135deg, #1a5a7a, #2d7a9a)',
        library: 'linear-gradient(135deg, #3a2a1a, #5a4a2d)',
        gradient: 'linear-gradient(135deg, #6a0dad, #ff6b6b)'
    };
    
    document.body.style.background = backgrounds[background];
    state.customBackground = null;
}

function applyCustomBackground(url) {
    document.body.style.backgroundImage = `url('${url}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    state.customBackground = url;
}

// Study Quests
function setupStudyQuests() {
    // Already set up in event listeners
}

function selectQuest() {
    const activeQuestCard = document.querySelector('.quest-card.active');
    if (activeQuestCard) {
        const quest = activeQuestCard.getAttribute('data-quest');
        state.activeQuest = quest;
        
        let ability = '';
        switch(quest) {
            case 'researcher':
                ability = '+25% XP from notes';
                break;
            case 'analyst':
                ability = 'Unlock advanced insights';
                break;
            case 'creator':
                ability = 'Enhanced whiteboard tools';
                break;
        }
        
        showToast(`Quest selected: ${quest}! Ability: ${ability}`);
        saveState();
    } else {
        showToast('Please select a quest first', 'error');
    }
}

// Form submission handlers
function handleClassSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-class-id').value;
    const subject = document.getElementById('class-subject').value;
    const topic = document.getElementById('class-topic').value;
    const color = document.getElementById('class-color').value;
    const day = parseInt(document.getElementById('class-day').value);
    const time = parseInt(document.getElementById('class-time').value);
    
    if (id) {
        // Update existing class
        const classIndex = state.classes.findIndex(c => c.id === id);
        if (classIndex !== -1) {
            state.classes[classIndex] = { id, subject, topic, color, day, time };
        }
    } else {
        // Add new class
        const newClass = {
            id: generateId(),
            subject,
            topic,
            color,
            day,
            time
        };
        state.classes.push(newClass);
    }
    
    saveState();
    renderTimetable();
    renderTodaySchedule();
    classModal.classList.remove('active');
    classForm.reset();
    showToast('Class saved successfully!');
}

function handleTaskSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-task-id').value;
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const due = document.getElementById('task-due').value;
    const subject = document.getElementById('task-subject').value;
    
    if (id) {
        // Update existing task
        const taskIndex = state.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            state.tasks[taskIndex] = { 
                id, 
                title, 
                description, 
                due, 
                subject,
                completed: state.tasks[taskIndex].completed 
            };
        }
    } else {
        // Add new task
        const newTask = {
            id: generateId(),
            title,
            description,
            due,
            subject,
            completed: false
        };
        state.tasks.push(newTask);
    }
    
    saveState();
    renderTasks();
    taskModal.classList.remove('active');
    taskForm.reset();
    showToast('Task saved successfully!');
}

function handleEventSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-event-id').value;
    const title = document.getElementById('event-title').value;
    const description = document.getElementById('event-description').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    
    if (id) {
        // Update existing event
        const eventIndex = state.events.findIndex(e => e.id === id);
        if (eventIndex !== -1) {
            state.events[eventIndex] = { id, title, description, date, time };
        }
    } else {
        // Add new event
        const newEvent = {
            id: generateId(),
            title,
            description,
            date,
            time
        };
        state.events.push(newEvent);
    }
    
    saveState();
    renderCalendar();
    eventModal.classList.remove('active');
    eventForm.reset();
    showToast('Event saved successfully!');
}

function handleSubjectSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-subject-id').value;
    const name = document.getElementById('subject-name').value;
    const color = document.getElementById('subject-color').value;
    const resources = document.getElementById('subject-resources').value.split('\n').filter(r => r.trim() !== '');
    
    if (id) {
        // Update existing subject
        const subjectIndex = state.subjects.findIndex(s => s.id === id);
        if (subjectIndex !== -1) {
            state.subjects[subjectIndex] = { id, name, color, resources };
        }
    } else {
        // Add new subject
        const newSubject = {
            id: generateId(),
            name,
            color,
            resources
        };
        state.subjects.push(newSubject);
    }
    
    saveState();
    renderSubjects();
    updateTaskSubjectSelect();
    subjectModal.classList.remove('active');
    subjectForm.reset();
    showToast('Subject saved successfully!');
}

function handleResourceSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('edit-resource-id').value;
    const name = document.getElementById('resource-name').value;
    const url = document.getElementById('resource-url').value;
    const description = document.getElementById('resource-description').value;
    const category = document.getElementById('resource-category').value;
    
    if (id) {
        // Update existing resource
        const resourceIndex = state.resources.findIndex(r => r.id === id);
        if (resourceIndex !== -1) {
            state.resources[resourceIndex] = { id, name, url, description, category };
        }
    } else {
        // Add new resource
        const newResource = {
            id: generateId(),
            name,
            url,
            description,
            category
        };
        state.resources.push(newResource);
    }
    
    saveState();
    renderResources();
    resourceModal.classList.remove('active');
    resourceForm.reset();
    showToast('Resource saved successfully!');
}

// Delete functions
function deleteClass() {
    const id = document.getElementById('edit-class-id').value;
    if (id) {
        state.classes = state.classes.filter(c => c.id !== id);
        saveState();
        renderTimetable();
        renderTodaySchedule();
        classModal.classList.remove('active');
        showToast('Class deleted successfully!');
    }
}

function deleteSubject() {
    const id = document.getElementById('edit-subject-id').value;
    if (id) {
        state.subjects = state.subjects.filter(s => s.id !== id);
        saveState();
        renderSubjects();
        updateTaskSubjectSelect();
        subjectModal.classList.remove('active');
        showToast('Subject deleted successfully!');
    }
}

function deleteResource() {
    const id = document.getElementById('edit-resource-id').value;
    if (id) {
        state.resources = state.resources.filter(r => r.id !== id);
        saveState();
        renderResources();
        resourceModal.classList.remove('active');
        showToast('Resource deleted successfully!');
    }
}

function deleteEvent() {
    const id = document.getElementById('edit-event-id').value;
    if (id) {
        state.events = state.events.filter(e => e.id !== id);
        saveState();
        renderCalendar();
        eventModal.classList.remove('active');
        showToast('Event deleted successfully!');
    }
}

// Note functions
function saveNote() {
    const title = noteTitle.value.trim();
    const content = quill.root.innerHTML;
    
    if (!title) {
        showToast('Please enter a note title', 'error');
        return;
    }
    
    if (state.currentNoteId) {
        // Update existing note
        const noteIndex = state.notes.findIndex(n => n.id === state.currentNoteId);
        if (noteIndex !== -1) {
            state.notes[noteIndex] = {
                ...state.notes[noteIndex],
                title,
                content,
                updatedAt: new Date().toISOString()
            };
        }
    } else {
        // Create new note
        const newNote = {
            id: generateId(),
            title,
            content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        state.notes.push(newNote);
        state.currentNoteId = newNote.id;
    }
    
    saveState();
    renderNotes();
    showToast('Note saved successfully!');
    
    // Update read-only view if in view mode
    if (state.notesViewMode === 'view') {
        updateNotesReadonlyView();
    }
}

function newNote() {
    state.currentNoteId = null;
    noteTitle.value = '';
    quill.root.innerHTML = '';
    notesReadonly.innerHTML = '';
    
    // Update active note in list
    document.querySelectorAll('.note-item').forEach(item => {
        item.classList.remove('active');
    });
}

function exportNoteAsPDF() {
    if (!state.currentNoteId) {
        showToast('Please select or create a note first', 'error');
        return;
    }
    
    const note = state.notes.find(n => n.id === state.currentNoteId);
    if (note) {
        // Create a temporary element to render the note for PDF
        const pdfContainer = document.createElement('div');
        pdfContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 210mm;
            min-height: 297mm;
            padding: 20mm;
            background: white;
            color: black;
            font-family: 'Poppins', sans-serif;
            z-index: 10000;
            overflow: hidden;
            box-sizing: border-box;
        `;
        
        pdfContainer.innerHTML = `
            <h1 style="text-align: center; margin-bottom: 20px; color: #e94560;">${note.title}</h1>
            <div style="border-bottom: 2px solid #e94560; margin-bottom: 20px;"></div>
            <div id="pdf-content" style="min-height: 200mm;">${note.content}</div>
            <div style="margin-top: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 10px;">
                Exported from StudyQuest on ${new Date().toLocaleDateString()}
            </div>
        `;
        
        document.body.appendChild(pdfContainer);
        
        // Use html2canvas to capture the content
        html2canvas(pdfContainer, {
            scale: 2,
            useCORS: true,
            logging: false
        }).then(canvas => {
            // Create PDF
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            
            // Convert canvas to image data
            const imgData = canvas.toDataURL('image/png');
            
            // Calculate dimensions to fit the PDF
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0;
            
            // Add image to PDF
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            
            // Save the PDF
            pdf.save(`${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
            
            // Clean up
            document.body.removeChild(pdfContainer);
            
            showToast('PDF exported successfully!');
        }).catch(error => {
            console.error('Error generating PDF:', error);
            document.body.removeChild(pdfContainer);
            showToast('Error generating PDF. Please try again.', 'error');
        });
    }
}

function deleteNote() {
    if (!state.currentNoteId) {
        showToast('Please select a note to delete', 'error');
        return;
    }
    
    if (confirm('Are you sure you want to delete this note?')) {
        state.notes = state.notes.filter(n => n.id !== state.currentNoteId);
        saveState();
        renderNotes();
        newNote();
        showToast('Note deleted successfully!');
    }
}

// Notes view mode functions
function setNotesViewMode(mode) {
    state.notesViewMode = mode;
    saveState();
    
    // Reset all modes
    editModeBtn.classList.remove('active');
    viewModeBtn.classList.remove('active');
    mindMapModeBtn.classList.remove('active');
    document.getElementById('editor').style.display = 'none';
    notesReadonly.style.display = 'none';
    mindMapContainer.style.display = 'none';
    noteTitle.disabled = false;
    saveNoteBtn.disabled = false;
    
    if (mode === 'edit') {
        editModeBtn.classList.add('active');
        document.getElementById('editor').style.display = 'block';
    } else if (mode === 'view') {
        viewModeBtn.classList.add('active');
        notesReadonly.style.display = 'block';
        noteTitle.disabled = true;
        saveNoteBtn.disabled = true;
        
        // Update the read-only view
        updateNotesReadonlyView();
    } else if (mode === 'mindmap') {
        mindMapModeBtn.classList.add('active');
        mindMapContainer.style.display = 'block';
        noteTitle.disabled = true;
        saveNoteBtn.disabled = true;
        
        // Load or create mind map
        loadMindMap();
    }
}

function updateNotesReadonlyView() {
    if (state.currentNoteId) {
        const note = state.notes.find(n => n.id === state.currentNoteId);
        if (note) {
            notesReadonly.innerHTML = note.content;
        }
    } else {
        notesReadonly.innerHTML = '<p class="empty-state">No note selected. Create or select a note to view.</p>';
    }
}

// Timer functions
function startTimer() {
    if (timerRunning) return;
    
    timerRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
    startTimerBtn.disabled = true;
    pauseTimerBtn.disabled = false;
    
    // Update last activity
    state.lastActivityDate = new Date().toISOString();
    saveState();
}

function pauseTimer() {
    if (!timerRunning) return;
    
    timerRunning = false;
    clearInterval(timerInterval);
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    saveState();
}

// Replace the resetTimer function in the JavaScript file with this corrected version:

function resetTimer() {
    if (!timerRunning) return;
    
    timerRunning = false;
    clearInterval(timerInterval);
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    
    // Get the active mode button to determine what to reset to
    const activeModeBtn = document.querySelector('.mode-btn.active');
    if (activeModeBtn) {
        const minutes = parseInt(activeModeBtn.getAttribute('data-minutes'));
        timerMinutes = minutes;
        timerSeconds = 0;
        
        // Set timer mode based on minutes
        if (minutes === 25) timerMode = 'focus';
        else if (minutes === 5) timerMode = 'shortBreak';
        else if (minutes === 15) timerMode = 'longBreak';
    } else {
        // Default to focus mode if no active button found
        timerMinutes = 25;
        timerSeconds = 0;
        timerMode = 'focus';
    }
    
    extendedSession = false;
    updateTimerDisplay();
    saveState();
    
    console.log('Timer reset to:', timerMinutes, 'minutes, mode:', timerMode);
}

// Also update the handleTimerComplete function to ensure proper reset after completion:

function handleTimerComplete() {
    // Award XP based on timer mode
    let xpEarned = 0;
    if (timerMode === 'focus') {
        xpEarned = extendedSession ? 75 : 50;
        state.timerSessions++;
        updateSessionsProgress();
        checkAchievement(2); // Marathon Runner
        checkAchievement(6); // Early Bird
        checkAchievement(7); // Weekend Warrior
        checkSurpriseRewards();
        updateEmojiLevelBasedOnXP();
    } else if (timerMode === 'shortBreak') {
        xpEarned = 10;
    } else if (timerMode === 'longBreak') {
        xpEarned = 25;
    }
    
    awardXP(xpEarned);
    updateStreak();
    
    // Show completion message
    const sessionType = extendedSession ? 'Extended Focus' : (timerMode === 'focus' ? 'Focus' : timerMode === 'shortBreak' ? 'Short Break' : 'Long Break');
    showToast(`${sessionType} session complete! You earned ${xpEarned} XP.`, 'success');
    
    // Reset extended session flag
    extendedSession = false;
    
    // Auto-reset to the next appropriate mode
    if (timerMode === 'focus') {
        // After focus, go to short break
        const shortBreakBtn = document.querySelector('.mode-btn[data-minutes="5"]');
        if (shortBreakBtn) {
            shortBreakBtn.click();
        }
    } else {
        // After break, go back to focus
        const focusBtn = document.querySelector('.mode-btn[data-minutes="25"]');
        if (focusBtn) {
            focusBtn.click();
        }
    }
    
    // Ensure timer is properly stopped
    timerRunning = false;
    clearInterval(timerInterval);
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    saveState();
}

function skipBreak() {
    if (timerMode === 'shortBreak' || timerMode === 'longBreak') {
        resetTimer();
        // Set to focus mode
        modeButtons[0].click();
        showToast('Break skipped! Ready for another focus session?');
    } else {
        showToast('You can only skip breaks, not focus sessions', 'error');
    }
}

function extendSession() {
    if (timerMode === 'focus' && !extendedSession) {
        timerMinutes += 15;
        extendedSession = true;
        updateTimerDisplay();
        showToast('Session extended by 15 minutes! Keep up the great work!');
        saveState();
    } else if (extendedSession) {
        showToast('Session already extended', 'error');
    } else {
        showToast('You can only extend focus sessions', 'error');
    }
}

function updateTimer() {
    if (timerSeconds === 0) {
        if (timerMinutes === 0) {
            // Timer completed
            clearInterval(timerInterval);
            timerRunning = false;
            handleTimerComplete();
            return;
        }
        timerMinutes--;
        timerSeconds = 59;
    } else {
        timerSeconds--;
    }
    
    updateTimerDisplay();
    saveState(); // Save timer state every second for session resume
}

function updateTimerDisplay() {
    const displayMinutes = timerMinutes.toString().padStart(2, '0');
    const displaySeconds = timerSeconds.toString().padStart(2, '0');
    timerDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
    timerPreviewDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
    
    // Update circular progress
    const totalSeconds = timerMode === 'focus' ? (extendedSession ? 40 : 25) * 60 : 
                       timerMode === 'shortBreak' ? 5 * 60 : 15 * 60;
    const elapsedSeconds = (timerMode === 'focus' ? (extendedSession ? 40 : 25) - timerMinutes : 
                          timerMode === 'shortBreak' ? 5 - timerMinutes : 15 - timerMinutes) * 60 - (60 - timerSeconds);
    const progress = (elapsedSeconds / totalSeconds) * 226;
    document.querySelector('.circular-fill').style.strokeDashoffset = 226 - progress;
}

function handleTimerComplete() {
    // Award XP based on timer mode
    let xpEarned = 0;
    if (timerMode === 'focus') {
        xpEarned = extendedSession ? 75 : 50;
        state.timerSessions++;
        updateSessionsProgress();
        checkAchievement(2); // Marathon Runner
        checkAchievement(6); // Early Bird
        checkAchievement(7); // Weekend Warrior
        checkSurpriseRewards();
        updateEmojiLevelBasedOnXP();
    } else if (timerMode === 'shortBreak') {
        xpEarned = 10;
    } else if (timerMode === 'longBreak') {
        xpEarned = 25;
    }
    
    awardXP(xpEarned);
    updateStreak();
    
    // Show completion message
    const sessionType = extendedSession ? 'Extended Focus' : (timerMode === 'focus' ? 'Focus' : timerMode === 'shortBreak' ? 'Short Break' : 'Long Break');
    showToast(`${sessionType} session complete! You earned ${xpEarned} XP.`, 'success');
    
    // Reset extended session flag
    extendedSession = false;
    resetTimer();
}

// Backup and Restore functions
function backupData() {
    const dataStr = JSON.stringify(state, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `studyquest-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('Backup created successfully!');
}

function copyDataToClipboard() {
    const dataStr = JSON.stringify(state, null, 2);
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(dataStr)
            .then(() => {
                showToast('Data copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy data: ', err);
                fallbackCopyToClipboard(dataStr);
            });
    } else {
        fallbackCopyToClipboard(dataStr);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('Data copied to clipboard!');
        } else {
            showToast('Failed to copy data to clipboard', 'error');
        }
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        showToast('Failed to copy data to clipboard', 'error');
    }
    
    document.body.removeChild(textArea);
}

function restoreData() {
    const file = restoreFileInput.files[0];
    if (!file) {
        showToast('Please select a backup file first', 'error');
        return;
    }
    
    if (!confirm('Are you sure you want to restore from backup? This will overwrite all current data.')) {
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const backupData = JSON.parse(e.target.result);
            
            if (backupData && typeof backupData === 'object') {
                state = { ...state, ...backupData };
                saveState();
                location.reload();
            } else {
                showToast('Invalid backup file format', 'error');
            }
        } catch (error) {
            console.error('Error parsing backup file:', error);
            showToast('Error reading backup file', 'error');
        }
    };
    reader.readAsText(file);
}

// Settings functions
function saveProfile() {
    const username = settingsUsername.value.trim();
    const spaceName = studySpaceName.value.trim();
    
    if (!username) {
        showToast('Please enter a username', 'error');
        return;
    }
    
    state.username = username;
    state.studySpaceName = spaceName || "My Study Space";
    document.getElementById('user-name').textContent = username;
    document.getElementById('user-avatar').textContent = username.substring(0, 2).toUpperCase();
    
    saveState();
    showToast('Profile updated successfully!');
}

function setTheme(theme) {
    state.theme = theme;
    
    themeOptions.forEach(option => {
        if (option.getAttribute('data-theme') === theme) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    applyTheme();
    saveState();
}

function applyTheme() {
    if (state.theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Enhanced Feature Functions

// Focus Emoji Functions
function setupFocusEmoji() {
    focusEmoji.textContent = state.focusEmoji;
    updateEmojiLevel(state.emojiLevel);
    checkPowerUps();
}

function handleEmojiClick() {
    focusEmoji.classList.add('bounce');
    setTimeout(() => {
        focusEmoji.classList.remove('bounce');
    }, 500);
    
    const messages = [
        "Keep going! You're doing great!",
        "Stay focused! You've got this!",
        "Every minute counts!",
        "You're building great habits!",
        "Your future self will thank you!",
        "Knowledge is power!",
        "Small steps lead to big achievements!",
        "You're on fire! 🔥"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showEmojiMessage(randomMessage);
    
    if (Math.random() < 0.1) {
        activateRandomPowerUp();
    }
}

function showEmojiMessage(message) {
    emojiMessage.textContent = message;
    emojiMessage.classList.add('show');
    
    setTimeout(() => {
        emojiMessage.classList.remove('show');
    }, 3000);
}

function activateRandomPowerUp() {
    const powerUps = ['dragon', 'owl', 'rocket', 'brain'];
    const randomPowerUp = powerUps[Math.floor(Math.random() * powerUps.length)];
    
    state.emojiPowerUps[randomPowerUp].active = true;
    state.emojiPowerUps[randomPowerUp].endTime = new Date().getTime() + (30 * 60 * 1000);
    
    emojiPowerUpIndicator.style.display = 'flex';
    focusEmoji.classList.add('power-up');
    
    const powerUpNames = {
        dragon: 'Dragon Power-Up',
        owl: 'Owl Power-Up',
        rocket: 'Rocket Power-Up',
        brain: 'Brain Power-Up'
    };
    
    showToast(`🎉 ${powerUpNames[randomPowerUp]} activated! Bonus effects for 30 minutes!`, 'success');
    saveState();
}

function checkPowerUps() {
    const now = new Date().getTime();
    let anyActive = false;
    
    Object.keys(state.emojiPowerUps).forEach(powerUp => {
        if (state.emojiPowerUps[powerUp].active && state.emojiPowerUps[powerUp].endTime < now) {
            state.emojiPowerUps[powerUp].active = false;
        }
        
        if (state.emojiPowerUps[powerUp].active) {
            anyActive = true;
        }
    });
    
    if (anyActive) {
        emojiPowerUpIndicator.style.display = 'flex';
        focusEmoji.classList.add('power-up');
    } else {
        emojiPowerUpIndicator.style.display = 'none';
        focusEmoji.classList.remove('power-up');
    }
    
    saveState();
}

function updateEmojiLevel(level) {
    state.emojiLevel = level;
    emojiEvolution.textContent = `Lv. ${level}`;
    
    if (level > 1) {
        focusEmoji.classList.add('evolved');
    } else {
        focusEmoji.classList.remove('evolved');
    }
    
    saveState();
}

function updateEmojiLevelBasedOnXP() {
    const newLevel = Math.floor(state.xp / 1000) + 1;
    if (newLevel > state.emojiLevel) {
        updateEmojiLevel(newLevel);
        showEmojiMessage(`Level up! Your focus emoji is now level ${newLevel}!`);
    }
}

// Environment Functions
function setupEnvironment() {
    setEnvironment(state.environment);
}

function setEnvironment(environment) {
    state.environment = environment;
    
    environmentOptions.forEach(option => {
        if (option.getAttribute('data-environment') === environment) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
    
    environmentEffects.innerHTML = '';
    
    if (environment === 'clear') {
        document.body.style.background = 'linear-gradient(135deg, var(--primary-dark), var(--primary))';
    } else if (environment === 'night') {
        document.body.style.background = 'linear-gradient(135deg, #0a0a1a, #1a1a2e)';
    } else if (environment === 'rain') {
        document.body.style.background = 'linear-gradient(135deg, #2c3e50, #34495e)';
        createRainEffect();
    } else if (environment === 'snow') {
        document.body.style.background = 'linear-gradient(135deg, #2c3e50, #95a5a6)';
        createSnowEffect();
    }
    
    saveState();
}

function createRainEffect() {
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.animationDelay = `${Math.random() * 5}s`;
        drop.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
        environmentEffects.appendChild(drop);
    }
}

function createSnowEffect() {
    for (let i = 0; i < 30; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        flake.style.left = `${Math.random() * 100}%`;
        flake.style.width = `${3 + Math.random() * 5}px`;
        flake.style.height = flake.style.width;
        flake.style.animationDelay = `${Math.random() * 5}s`;
        flake.style.animationDuration = `${3 + Math.random() * 7}s`;
        environmentEffects.appendChild(flake);
    }
}

// Mind Map Functions
function setupMindMap() {
    // Initialize mind map functionality
}

function loadMindMap() {
    if (!state.currentNoteId) {
        mindMapContainer.innerHTML = '<p class="empty-state">No note selected. Create or select a note to create a mind map.</p>';
        return;
    }
    
    let mindMap = state.mindMaps.find(m => m.noteId === state.currentNoteId);
    
    if (!mindMap) {
        mindMap = {
            id: generateId(),
            noteId: state.currentNoteId,
            nodes: [
                {
                    id: generateId(),
                    content: noteTitle.value || 'Central Idea',
                    x: mindMapContainer.offsetWidth / 2 - 60,
                    y: mindMapContainer.offsetHeight / 2 - 30
                }
            ],
            connections: []
        };
        state.mindMaps.push(mindMap);
        saveState();
    }
    
    state.currentMindMap = mindMap;
    renderMindMap();
}

function renderMindMap() {
    if (!state.currentMindMap) return;
    
    mindMapContainer.innerHTML = '';
    
    state.currentMindMap.connections.forEach(connection => {
        const fromNode = state.currentMindMap.nodes.find(n => n.id === connection.from);
        const toNode = state.currentMindMap.nodes.find(n => n.id === connection.to);
        
        if (fromNode && toNode) {
            const connectionEl = document.createElement('div');
            connectionEl.className = 'mind-map-connection';
            
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            
            connectionEl.style.width = `${length}px`;
            connectionEl.style.transform = `rotate(${angle}deg)`;
            connectionEl.style.left = `${fromNode.x + 60}px`;
            connectionEl.style.top = `${fromNode.y + 30}px`;
            
            mindMapContainer.appendChild(connectionEl);
        }
    });
    
    state.currentMindMap.nodes.forEach(node => {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'mind-map-node';
        nodeEl.style.left = `${node.x}px`;
        nodeEl.style.top = `${node.y}px`;
        nodeEl.setAttribute('data-node-id', node.id);
        
        nodeEl.innerHTML = `
            <div class="node-content" contenteditable="true">${node.content}</div>
            <div class="node-actions">
                <button class="btn btn-secondary add-child-node" data-node-id="${node.id}">
                    <i class="fas fa-plus"></i>
                </button>
                <button class="btn btn-secondary delete-node" data-node-id="${node.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        makeNodeDraggable(nodeEl, node);
        
        nodeEl.querySelector('.node-content').addEventListener('blur', (e) => {
            node.content = e.target.textContent;
            saveState();
        });
        
        nodeEl.querySelector('.add-child-node').addEventListener('click', (e) => {
            e.stopPropagation();
            addChildNode(node.id);
        });
        
        nodeEl.querySelector('.delete-node').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteNode(node.id);
        });
        
        mindMapContainer.appendChild(nodeEl);
    });
}

function makeNodeDraggable(nodeEl, node) {
    let isDragging = false;
    let startX, startY, initialX, initialY;
    
    nodeEl.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('node-content') || 
            e.target.classList.contains('add-child-node') || 
            e.target.classList.contains('delete-node')) {
            return;
        }
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = node.x;
        initialY = node.y;
        
        nodeEl.classList.add('active');
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    
    function onMouseMove(e) {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        node.x = initialX + dx;
        node.y = initialY + dy;
        
        nodeEl.style.left = `${node.x}px`;
        nodeEl.style.top = `${node.y}px`;
        
        renderMindMap();
    }
    
    function onMouseUp() {
        isDragging = false;
        nodeEl.classList.remove('active');
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        
        saveState();
    }
}

function addChildNode(parentId) {
    const parentNode = state.currentMindMap.nodes.find(n => n.id === parentId);
    if (!parentNode) return;
    
    const newNode = {
        id: generateId(),
        content: 'New Idea',
        x: parentNode.x + 200,
        y: parentNode.y
    };
    
    state.currentMindMap.nodes.push(newNode);
    state.currentMindMap.connections.push({
        from: parentId,
        to: newNode.id
    });
    
    saveState();
    renderMindMap();
}

function deleteNode(nodeId) {
    if (state.currentMindMap.nodes.length <= 1) {
        showToast('Cannot delete the last node', 'error');
        return;
    }
    
    state.currentMindMap.nodes = state.currentMindMap.nodes.filter(n => n.id !== nodeId);
    state.currentMindMap.connections = state.currentMindMap.connections.filter(c => 
        c.from !== nodeId && c.to !== nodeId
    );
    
    saveState();
    renderMindMap();
}

// Note Sharing Functions
function copyNoteToClipboard() {
    if (!state.currentNoteId) {
        showToast('Please select or create a note first', 'error');
        return;
    }
    
    const note = state.notes.find(n => n.id === state.currentNoteId);
    if (note) {
        const noteText = `${note.title}\n\n${stripHtml(note.content)}`;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(noteText)
                .then(() => {
                    showToast('Note copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy note: ', err);
                    fallbackCopyToClipboard(noteText);
                });
        } else {
            fallbackCopyToClipboard(noteText);
        }
    }
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function summarizeNote() {
    if (!state.currentNoteId) {
        showToast('Please select or create a note first', 'error');
        return;
    }
    
    const note = state.notes.find(n => n.id === state.currentNoteId);
    if (note) {
        const content = stripHtml(note.content);
        const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
        
        const summary = sentences.slice(0, 3).join('. ') + '.';
        
        const summaryNote = {
            id: generateId(),
            title: `Summary: ${note.title}`,
            content: `<p>${summary}</p>`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        state.notes.push(summaryNote);
        saveState();
        renderNotes();
        
        showToast('Note summarized successfully! A new summary note has been created.');
    }
}


// New Feature Functions

function setupQuickTemplates() {
    // Already set up in event listeners
}

function applyQuickTemplate(template) {
    if (state.quickTemplates[template]) {
        quill.root.innerHTML = state.quickTemplates[template];
        showToast(`Applied ${template} template`);
    }
}

function setupSessionResume() {
    // Check if there's a session to resume
    if (state.timerState && state.timerState.running) {
        sessionResume.style.display = 'block';
        document.getElementById('resume-session-info').textContent = 
            `You have ${state.timerState.minutes}:${state.timerState.seconds.toString().padStart(2, '0')} remaining in your ${state.timerState.mode} session.`;
    }
}

function resumeLastSession() {
    if (state.timerState) {
        timerMinutes = state.timerState.minutes;
        timerSeconds = state.timerState.seconds;
        timerMode = state.timerState.mode;
        extendedSession = state.timerState.extended;
        
        updateTimerDisplay();
        startTimer();
        sessionResume.style.display = 'none';
        showToast('Session resumed!');
    }
}

function setupMoodCheckin() {
    // Already set up in event listeners
}

function setMood(mood) {
    state.currentMood = mood;
    moodButtons.forEach(btn => {
        if (btn.getAttribute('data-mood') === mood) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    showToast(`Mood set to ${mood}`);
    saveState();
}

function setupSeasonalThemes() {
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();
    
    if (month === 9 && date >= 20) { // October 20-31
        applySeasonalTheme('halloween');
    } else if (month === 11 && date <= 26) { // December 1-26
        applySeasonalTheme('christmas');
    }
}

function applySeasonalTheme(theme) {
    state.seasonalTheme = theme;
    
    if (theme === 'halloween') {
        seasonalThemeIndicator.style.display = 'flex';
        document.getElementById('seasonal-icon').textContent = '🎃';
        document.getElementById('seasonal-message').textContent = 'Halloween Theme Active! Spooky studying!';
    } else if (theme === 'christmas') {
        seasonalThemeIndicator.style.display = 'flex';
        document.getElementById('seasonal-icon').textContent = '🎄';
        document.getElementById('seasonal-message').textContent = 'Christmas Theme Active! Festive studying!';
    }
    
    saveState();
}

function setupSessionTemplates() {
    // Already set up in event listeners
}

function applySessionTemplate(templateType) {
    let minutes, mode;
    
    switch(templateType) {
        case 'last':
            // Resume last session settings
            if (state.timerState) {
                minutes = state.timerState.minutes;
                mode = state.timerState.mode;
            } else {
                minutes = 25;
                mode = 'focus';
            }
            break;
        case 'energy':
            minutes = 15;
            mode = 'focus';
            break;
        case 'deep':
            minutes = 50;
            mode = 'focus';
            break;
        default:
            minutes = 25;
            mode = 'focus';
    }
    
    timerMinutes = minutes;
    timerSeconds = 0;
    timerMode = mode;
    updateTimerDisplay();
    
    // Update active mode button
    modeButtons.forEach(btn => {
        if (parseInt(btn.getAttribute('data-minutes')) === minutes) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    showToast(`Applied ${templateType} session template`);
}

function setupSessionNaming() {
    // Already set up in event listeners
}

function generateSessionName() {
    const prefixes = ['Quantum', 'Code', 'History', 'Math', 'Science', 'Creative', 'Deep', 'Focus'];
    const suffixes = ['Quest', 'Crusade', 'Hunt', 'Mission', 'Journey', 'Adventure', 'Challenge'];
    
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    const newName = `${randomPrefix} ${randomSuffix}`;
    
    // Update one of the session name elements
    const randomIndex = Math.floor(Math.random() * sessionNameElements.length);
    sessionNameElements[randomIndex].textContent = newName;
    
    showToast(`New session name: ${newName}`);
}

// Smart Reminders and Predictions
function updateSmartReminders() {
    const remindersContainer = document.getElementById('smart-reminders');
    remindersContainer.innerHTML = '';
    
    const now = new Date();
    const today = now.toDateString();
    const lastActivity = state.lastActivityDate ? new Date(state.lastActivityDate) : null;
    
    // Check if user hasn't studied today
    if (lastActivity && lastActivity.toDateString() !== today && state.streak > 0) {
        const reminder = document.createElement('div');
        reminder.className = 'reminder-item warning';
        reminder.innerHTML = `
            <div class="reminder-header">
                <div class="reminder-title">
                    <i class="fas fa-fire"></i>
                    Streak at Risk!
                </div>
            </div>
            <div class="reminder-desc">
                Haven't seen you today! Your ${state.streak}-day streak is at risk 🔥
            </div>
            <div class="reminder-actions">
                <button class="reminder-action-btn start-study-reminder">
                    <i class="fas fa-play"></i> Start Studying
                </button>
            </div>
        `;
        remindersContainer.appendChild(reminder);
        
        reminder.querySelector('.start-study-reminder').addEventListener('click', () => {
            startTimerFromDashboard.click();
        });
    }
    
    // Check for scheduled study times
    const currentHour = now.getHours();
    const currentDay = now.getDay() === 0 ? 7 : now.getDay();
    
    const upcomingClasses = state.classes.filter(c => c.day === currentDay && c.time > currentHour)
                                       .sort((a, b) => a.time - b.time);
    
    if (upcomingClasses.length > 0) {
        const nextClass = upcomingClasses[0];
        const reminder = document.createElement('div');
        reminder.className = 'reminder-item';
        reminder.innerHTML = `
            <div class="reminder-header">
                <div class="reminder-title">
                    <i class="fas fa-clock"></i>
                    Upcoming Class
                </div>
            </div>
            <div class="reminder-desc">
                You have ${nextClass.subject} at ${nextClass.time}:00 - want to start a timer?
            </div>
            <div class="reminder-actions">
                <button class="reminder-action-btn start-timer-reminder">
                    <i class="fas fa-play"></i> Start Timer
                </button>
            </div>
        `;
        remindersContainer.appendChild(reminder);
        
        reminder.querySelector('.start-timer-reminder').addEventListener('click', () => {
            startTimerFromDashboard.click();
        });
    }
    
    // Check for upcoming tasks
    const upcomingTasks = state.tasks.filter(t => !t.completed && new Date(t.due) >= new Date())
                                   .sort((a, b) => new Date(a.due) - new Date(b.due));
    
    if (upcomingTasks.length > 0) {
        const nextTask = upcomingTasks[0];
        const dueDate = new Date(nextTask.due);
        const daysUntilDue = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntilDue <= 3) {
            const reminder = document.createElement('div');
            reminder.className = 'reminder-item warning';
            reminder.innerHTML = `
                <div class="reminder-header">
                    <div class="reminder-title">
                        <i class="fas fa-exclamation-triangle"></i>
                        Task Deadline Approaching
                    </div>
                </div>
                <div class="reminder-desc">
                    ${daysUntilDue} day${daysUntilDue !== 1 ? 's' : ''} until "${nextTask.title}" is due
                </div>
            `;
            remindersContainer.appendChild(reminder);
        }
    }
    
    if (remindersContainer.children.length === 0) {
        remindersContainer.innerHTML = '<div class="empty-state">Complete tasks and study sessions to get personalized reminders!</div>';
    }
}

function updateStudyPredictions() {
    const predictionsContainer = document.getElementById('study-predictions');
    predictionsContainer.innerHTML = '';
    
    const studySessions = state.timerSessions;
    const daysActive = state.streak > 0 ? state.streak : 1;
    const avgSessionsPerDay = studySessions / daysActive;
    
    if (studySessions > 0) {
        const remainingSessions = 20;
        const daysToComplete = Math.ceil(remainingSessions / avgSessionsPerDay);
        
        const prediction1 = document.createElement('div');
        prediction1.className = 'reminder-item success';
        prediction1.innerHTML = `
            <div class="reminder-header">
                <div class="reminder-title">
                    <i class="fas fa-chart-line"></i>
                    Study Prediction
                </div>
            </div>
            <div class="reminder-desc">
                At this pace, you'll complete the syllabus in ${daysToComplete} day${daysToComplete !== 1 ? 's' : ''}
            </div>
        `;
        predictionsContainer.appendChild(prediction1);
        
        const dailyGoal = 4;
        const sessionsToday = state.timerSessions;
        const sessionsNeeded = dailyGoal - sessionsToday;
        
        if (sessionsNeeded > 0) {
            const prediction2 = document.createElement('div');
            prediction2.className = 'reminder-item';
            prediction2.innerHTML = `
                <div class="reminder-header">
                    <div class="reminder-title">
                        <i class="fas fa-bullseye"></i>
                        Daily Goal
                    </div>
                </div>
                <div class="reminder-desc">
                    You need ${sessionsNeeded} more session${sessionsNeeded !== 1 ? 's' : ''} to reach your daily goal
                </div>
            `;
            predictionsContainer.appendChild(prediction2);
        }
    } else {
        predictionsContainer.innerHTML = '<div class="empty-state">Complete more study sessions to get personalized predictions!</div>';
    }
}

function checkSurpriseRewards() {
    if (timerRunning && timerMode === 'focus') {
        if (Math.random() < 0.05) {
            const rewards = [
                { type: 'xp', amount: 25, message: 'Bonus XP! Keep up the great work!' },
                { type: 'resource', message: 'Lucky find! Check your resources for something new.' },
                { type: 'productivity', message: 'Productivity Spike! You\'re in the zone!' }
            ];
            
            const reward = rewards[Math.floor(Math.random() * rewards.length)];
            
            if (reward.type === 'xp') {
                awardXP(reward.amount);
            } else if (reward.type === 'resource') {
                const sampleResources = [
                    { name: "Khan Academy - Math", url: "https://www.khanacademy.org/math", category: "website" },
                    { name: "Crash Course - History", url: "https://www.youtube.com/user/crashcourse", category: "video" },
                    { name: "Study Tips PDF", url: "#", category: "pdf" }
                ];
                
                const newResource = sampleResources[Math.floor(Math.random() * sampleResources.length)];
                if (!state.resources.some(r => r.name === newResource.name)) {
                    state.resources.push({
                        id: generateId(),
                        ...newResource,
                        description: "Discovered while studying!"
                    });
                    saveState();
                    renderResources();
                }
            }
            
            showToast(`🎉 ${reward.message}`, 'success');
            addNotification(`Surprise Reward: ${reward.message}`);
            
            state.surpriseRewards.push({
                type: reward.type,
                message: reward.message,
                timestamp: new Date().toISOString()
            });
            saveState();
        }
    }
}

// Rendering functions
function renderAll() {
    renderTasks();
    renderNotes();
    renderTimetable();
    renderTodaySchedule();
    renderCalendar();
    renderSubjects();
    renderResources();
    renderAchievements();
    updateTaskSubjectSelect();
}

function renderTasks() {
    taskList.innerHTML = '';
    dashboardTasks.innerHTML = '';
    
    if (state.tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No tasks yet. Add your first task to get started!</li>';
        dashboardTasks.innerHTML = '<li class="empty-state">No upcoming tasks. Add a task to get started!</li>';
        return;
    }
    
    const sortedTasks = [...state.tasks].sort((a, b) => {
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        return new Date(a.due) - new Date(b.due);
    });
    
    sortedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (task.completed) taskItem.style.opacity = '0.7';
        
        const dueDate = new Date(task.due);
        const formattedDate = dueDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        
        taskItem.innerHTML = `
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-task-id="${task.id}">
                ${task.completed ? '<i class="fas fa-check"></i>' : ''}
            </div>
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-due">Due: ${formattedDate}</div>
                ${task.description ? `<div class="task-desc">${task.description}</div>` : ''}
            </div>
            <div class="task-actions">
                <button class="task-btn edit-task" data-task-id="${task.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="task-btn delete-task" data-task-id="${task.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        taskList.appendChild(taskItem);
    });
    
    const upcomingTasks = sortedTasks
        .filter(task => !task.completed)
        .slice(0, 3);
        
    if (upcomingTasks.length === 0) {
        dashboardTasks.innerHTML = '<li class="empty-state">No upcoming tasks. Add a task to get started!</li>';
        return;
    }
        
    upcomingTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        const dueDate = new Date(task.due);
        const formattedDate = dueDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        
        taskItem.innerHTML = `
            <div class="task-checkbox" data-task-id="${task.id}">
            </div>
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-due">Due: ${formattedDate}</div>
            </div>
        `;
        
        dashboardTasks.appendChild(taskItem);
    });
    
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', (e) => {
            const taskId = checkbox.getAttribute('data-task-id');
            toggleTaskCompletion(taskId);
        });
    });
    
    document.querySelectorAll('.edit-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const taskId = btn.getAttribute('data-task-id');
            editTask(taskId);
        });
    });
    
    document.querySelectorAll('.delete-task').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const taskId = btn.getAttribute('data-task-id');
            if (confirm('Are you sure you want to delete this task?')) {
                state.tasks = state.tasks.filter(t => t.id !== taskId);
                saveState();
                renderTasks();
                showToast('Task deleted successfully!');
            }
        });
    });
}

function renderNotes() {
    notesList.innerHTML = '';
    
    if (state.notes.length === 0) {
        notesList.innerHTML = '<div class="empty-state">No notes yet. Create your first note!</div>';
        return;
    }
    
    const sortedNotes = [...state.notes].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    
    sortedNotes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.className = `note-item ${state.currentNoteId === note.id ? 'active' : ''}`;
        noteItem.setAttribute('data-note-id', note.id);
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = note.content;
        const textContent = tempDiv.textContent || tempDiv.innerText || '';
        const preview = textContent.length > 100 ? textContent.substring(0, 100) + '...' : textContent;
        
        const updatedDate = new Date(note.updatedAt);
        const formattedDate = updatedDate.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        noteItem.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-preview">${preview}</div>
            <div class="note-date">Updated: ${formattedDate}</div>
        `;
        
        noteItem.addEventListener('click', () => {
            loadNoteForEditing(note.id);
        });
        
        notesList.appendChild(noteItem);
    });
}

function renderTimetable() {
    timetableGrid.innerHTML = '';
    
    timetableGrid.innerHTML = `
        <div class="time-slot"></div>
        <div class="day-header">Mon</div>
        <div class="day-header">Tue</div>
        <div class="day-header">Wed</div>
        <div class="day-header">Thu</div>
        <div class="day-header">Fri</div>
        <div class="day-header">Sat</div>
        <div class="day-header">Sun</div>
    `;
    
    for (let hour = 8; hour <= 17; hour++) {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = `${hour}:00`;
        timetableGrid.appendChild(timeSlot);
        
        for (let day = 1; day <= 7; day++) {
            const cell = document.createElement('div');
            cell.className = 'timetable-cell';
            cell.setAttribute('data-day', day);
            cell.setAttribute('data-time', hour);
            
            const classAtThisTime = state.classes.find(c => c.day === day && c.time === hour);
            if (classAtThisTime) {
                cell.classList.add('has-class');
                cell.style.borderLeftColor = classAtThisTime.color;
                cell.innerHTML = `
                    <div class="class-subject">${classAtThisTime.subject}</div>
                    <div class="class-topic">${classAtThisTime.topic}</div>
                `;
            }
            
            cell.addEventListener('click', () => {
                editClassAtTime(day, hour);
            });
            
            timetableGrid.appendChild(cell);
        }
    }
}

function renderTodaySchedule() {
    todaySchedule.innerHTML = '';
    
    const today = new Date().getDay();
    const todayAdjusted = today === 0 ? 7 : today;
    
    const todayClasses = state.classes.filter(c => c.day === todayAdjusted)
                                      .sort((a, b) => a.time - b.time);
    
    if (todayClasses.length === 0) {
        todaySchedule.innerHTML = '<p class="empty-state">No classes scheduled for today. Add some in the Timetable!</p>';
        return;
    }
    
    todayClasses.forEach(classItem => {
        const classElement = document.createElement('div');
        classElement.className = 'class-item';
        classElement.innerHTML = `
            <div class="class-time">${classItem.time}:00 - ${classItem.time + 1}:00</div>
            <div class="class-info">
                <div class="class-subject">${classItem.subject}</div>
                <div class="class-topic">${classItem.topic}</div>
            </div>
        `;
        classElement.style.borderLeft = `4px solid ${classItem.color}`;
        todaySchedule.appendChild(classElement);
    });
}

function renderCalendar() {
    calendarGrid.innerHTML = '';
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.innerHTML = `<div class="day-number">${day}</div>`;
        
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const dayEvents = state.events.filter(e => e.date === dateStr);
        
        dayEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'calendar-event';
            eventElement.textContent = event.title;
            eventElement.title = event.description;
            eventElement.setAttribute('data-event-id', event.id);
            dayCell.appendChild(eventElement);
            
            eventElement.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm(`Delete event "${event.title}"?`)) {
                    state.events = state.events.filter(ev => ev.id !== event.id);
                    saveState();
                    renderCalendar();
                    showToast('Event deleted successfully!');
                }
            });
        });
        
        dayCell.addEventListener('click', () => {
            addEventOnDate(dateStr);
        });
        
        calendarGrid.appendChild(dayCell);
    }
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calendar-month-year').textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

function renderSubjects() {
    subjectsGrid.innerHTML = '';
    
    if (state.subjects.length === 0) {
        subjectsGrid.innerHTML = '<div class="empty-state">No subjects added yet. Add your first subject!</div>';
        return;
    }
    
    state.subjects.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.className = 'widget';
        subjectCard.innerHTML = `
            <div class="widget-header">
                <h2 class="widget-title">
                    <i class="fas fa-book" style="color: ${subject.color}"></i>
                    ${subject.name}
                </h2>
                <button class="btn btn-secondary edit-subject" data-subject-id="${subject.id}">
                    <i class="fas fa-edit"></i>
                </button>
            </div>
            <div class="widget-content">
                <h3 style="margin-bottom: 10px;">Resources</h3>
                ${subject.resources.length > 0 ? 
                    `<ul class="resource-list">
                        ${subject.resources.map(resource => 
                            `<li><a href="${resource}" target="_blank">${resource}</a></li>`
                        ).join('')}
                    </ul>` : 
                    '<p class="empty-state">No resources added yet.</p>'
                }
            </div>
        `;
        
        subjectsGrid.appendChild(subjectCard);
    });
    
    document.querySelectorAll('.edit-subject').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const subjectId = btn.getAttribute('data-subject-id');
            editSubject(subjectId);
        });
    });
}

function renderResources() {
    resourcesContainer.innerHTML = '';
    
    if (state.resources.length === 0) {
        resourcesContainer.innerHTML = '<div class="empty-state">No resources added yet. Add your first resource!</div>';
        return;
    }
    
    const resourcesByCategory = {};
    state.resources.forEach(resource => {
        if (!resourcesByCategory[resource.category]) {
            resourcesByCategory[resource.category] = [];
        }
        resourcesByCategory[resource.category].push(resource);
    });
    
    Object.keys(resourcesByCategory).forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'resource-category';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1) + ' Resources';
        categoryDiv.appendChild(categoryTitle);
        
        resourcesByCategory[category].forEach(resource => {
            const resourceItem = document.createElement('div');
            resourceItem.className = 'resource-item';
            
            let icon = 'fa-link';
            if (category === 'pdf') icon = 'fa-file-pdf';
            else if (category === 'video') icon = 'fa-video';
            else if (category === 'book') icon = 'fa-book';
            else if (category === 'article') icon = 'fa-newspaper';
            
            resourceItem.innerHTML = `
                <div class="resource-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="resource-info">
                    <div class="resource-name">${resource.name}</div>
                    <div class="resource-desc">${resource.description || resource.url}</div>
                </div>
                <div class="resource-actions">
                    <button class="btn btn-secondary open-resource" data-resource-url="${resource.url}">
                        <i class="fas fa-external-link-alt"></i>
                    </button>
                    <button class="btn btn-secondary edit-resource" data-resource-id="${resource.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary delete-resource" data-resource-id="${resource.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            
            categoryDiv.appendChild(resourceItem);
        });
        
        resourcesContainer.appendChild(categoryDiv);
    });
    
    document.querySelectorAll('.open-resource').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = btn.getAttribute('data-resource-url');
            window.open(url, '_blank');
        });
    });
    
    document.querySelectorAll('.edit-resource').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const resourceId = btn.getAttribute('data-resource-id');
            editResource(resourceId);
        });
    });
    
    document.querySelectorAll('.delete-resource').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const resourceId = btn.getAttribute('data-resource-id');
            if (confirm('Are you sure you want to delete this resource?')) {
                state.resources = state.resources.filter(r => r.id !== resourceId);
                saveState();
                renderResources();
                showToast('Resource deleted successfully!');
            }
        });
    });
}

function renderAchievements() {
    achievementsGrid.innerHTML = '';
    
    state.achievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        
        achievementCard.innerHTML = `
            <div class="achievement-icon">
                <i class="fas ${achievement.icon}"></i>
            </div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
            ${!achievement.unlocked ? 
                `<div class="achievement-progress">${achievement.progress}/${achievement.target}</div>` : 
                ''
            }
        `;
        
        achievementsGrid.appendChild(achievementCard);
    });
}

// Helper functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function updateStats() {
    xpCount.textContent = state.xp.toLocaleString();
    streakCount.textContent = state.streak;
    levelCount.textContent = state.level;
    userLevel.textContent = state.level;
    
    const xpForNextLevel = state.level * 500;
    const xpInCurrentLevel = state.xp - ((state.level - 1) * 500);
    const xpProgress = (xpInCurrentLevel / xpForNextLevel) * 100;
    
    xpProgressText.textContent = `${xpInCurrentLevel}/${xpForNextLevel}`;
    xpProgressBar.style.width = `${xpProgress}%`;
}

function updateSessionsProgress() {
    sessionsCount.textContent = state.timerSessions;
    const sessionsProgressValue = (state.timerSessions / 5) * 100;
    sessionsProgress.style.width = `${Math.min(sessionsProgressValue, 100)}%`;
}

function updateTaskSubjectSelect() {
    taskSubjectSelect.innerHTML = '<option value="">No Subject</option>';
    state.subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.id;
        option.textContent = subject.name;
        taskSubjectSelect.appendChild(option);
    });
}

function awardXP(amount) {
    state.xp += amount;
    
    const newLevel = Math.floor(state.xp / 500) + 1;
    if (newLevel > state.level) {
        state.level = newLevel;
        showToast(`🎉 Level Up! You've reached Level ${state.level}!`, 'success');
    }
    
    updateStats();
    saveState();
}

function updateStreak() {
    const today = new Date().toDateString();
    
    if (state.lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();
        
        if (state.lastStudyDate === yesterdayStr) {
            state.streak++;
        } else {
            state.streak = 1;
        }
        
        state.lastStudyDate = today;
        updateStats();
        saveState();
        
        checkAchievement(3);
    }
}

function checkStreak() {
    const today = new Date().toDateString();
    
    if (state.lastStudyDate === today) {
        return;
    }
    
    if (state.lastStudyDate) {
        const lastStudy = new Date(state.lastStudyDate);
        const todayObj = new Date();
        const diffTime = Math.abs(todayObj - lastStudy);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
            state.streak = 0;
            updateStats();
            saveState();
        }
    }
}

function checkAchievement(achievementId) {
    const achievement = state.achievements.find(a => a.id === achievementId);
    if (!achievement || achievement.unlocked) return;
    
    let shouldUnlock = false;
    
    switch (achievementId) {
        case 1:
            achievement.progress = state.tasks.filter(t => t.completed).length;
            shouldUnlock = achievement.progress >= achievement.target;
            break;
        case 2:
            achievement.progress = state.timerSessions;
            shouldUnlock = achievement.progress >= achievement.target;
            break;
        case 3:
            achievement.progress = state.streak;
            shouldUnlock = achievement.progress >= achievement.target;
            break;
        case 4:
            achievement.progress = Math.min(achievement.progress + 1, achievement.target);
            shouldUnlock = achievement.progress >= achievement.target;
            break;
        case 5:
            achievement.progress = state.tasks.filter(t => t.completed).length;
            shouldUnlock = achievement.progress >= achievement.target;
            break;
        case 6:
            const now = new Date();
            if (now.getHours() < 8) {
                achievement.progress = 1;
                shouldUnlock = true;
            }
            break;
        case 7:
            const today = new Date();
            if (today.getDay() === 0 || today.getDay() === 6) {
                achievement.progress = 1;
                shouldUnlock = true;
            }
            break;
        case 8:
            if (Math.random() > 0.7) {
                achievement.progress = 1;
                shouldUnlock = true;
            }
            break;
    }
    
    if (shouldUnlock && !achievement.unlocked) {
        achievement.unlocked = true;
        awardXP(100);
        showToast(`🏆 Achievement Unlocked: ${achievement.name}!`, 'success');
        renderAchievements();
        addNotification(`Achievement Unlocked: ${achievement.name}`);
        saveState();
    }
}

function addNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-item';
    notification.innerHTML = `
        <div class="notification-icon" style="color: var(--accent);">
            <i class="fas fa-trophy"></i>
        </div>
        <div class="notification-content">
            <div class="notification-title">Achievement Unlocked!</div>
            <div class="notification-desc">${message}</div>
        </div>
    `;
    
    notificationList.insertBefore(notification, notificationList.firstChild);
    
    if (notificationList.children.length > 5) {
        notificationList.removeChild(notificationList.lastChild);
    }
}

function toggleTaskCompletion(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        
        if (task.completed) {
            awardXP(25);
            checkAchievement(1);
            checkAchievement(5);
            addNotification(`Task completed: ${task.title}`);
        }
        
        saveState();
        renderTasks();
    }
}

function editTask(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
        document.getElementById('task-modal-title').textContent = 'Edit Task';
        document.getElementById('edit-task-id').value = task.id;
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-due').value = task.due;
        document.getElementById('task-subject').value = task.subject || '';
        taskModal.classList.add('active');
    }
}

function loadNoteForEditing(noteId) {
    const note = state.notes.find(n => n.id === noteId);
    if (note) {
        noteTitle.value = note.title;
        quill.root.innerHTML = note.content;
        state.currentNoteId = noteId;
        
        document.querySelectorAll('.note-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-note-id="${noteId}"]`).classList.add('active');
        
        if (state.notesViewMode === 'view') {
            updateNotesReadonlyView();
        }
        
        if (state.notesViewMode === 'mindmap') {
            loadMindMap();
        }
    }
}

function editClassAtTime(day, time) {
    const existingClass = state.classes.find(c => c.day === day && c.time === time);
    
    if (existingClass) {
        document.getElementById('class-modal-title').textContent = 'Edit Class';
        document.getElementById('edit-class-id').value = existingClass.id;
        document.getElementById('class-subject').value = existingClass.subject;
        document.getElementById('class-topic').value = existingClass.topic;
        document.getElementById('class-color').value = existingClass.color;
        document.getElementById('class-day').value = existingClass.day;
        document.getElementById('class-time').value = existingClass.time;
        document.getElementById('delete-class-btn').style.display = 'block';
    } else {
        document.getElementById('class-modal-title').textContent = 'Add Class';
        document.getElementById('edit-class-id').value = '';
        document.getElementById('class-subject').value = '';
        document.getElementById('class-topic').value = '';
        document.getElementById('class-color').value = '#e94560';
        document.getElementById('class-day').value = day;
        document.getElementById('class-time').value = time;
        document.getElementById('delete-class-btn').style.display = 'none';
    }
    
    classModal.classList.add('active');
}

function addEventOnDate(dateStr) {
    document.getElementById('event-modal-title').textContent = 'Add Event';
    document.getElementById('edit-event-id').value = '';
    document.getElementById('event-title').value = '';
    document.getElementById('event-description').value = '';
    document.getElementById('event-date').value = dateStr;
    document.getElementById('event-time').value = '';
    document.getElementById('delete-event-btn').style.display = 'none';
    eventModal.classList.add('active');
}

function editSubject(subjectId) {
    const subject = state.subjects.find(s => s.id === subjectId);
    if (subject) {
        document.getElementById('subject-modal-title').textContent = 'Edit Subject';
        document.getElementById('edit-subject-id').value = subject.id;
        document.getElementById('subject-name').value = subject.name;
        document.getElementById('subject-color').value = subject.color;
        document.getElementById('subject-resources').value = subject.resources.join('\n');
        document.getElementById('delete-subject-btn').style.display = 'block';
        subjectModal.classList.add('active');
    }
}

function editResource(resourceId) {
    const resource = state.resources.find(r => r.id === resourceId);
    if (resource) {
        document.getElementById('resource-modal-title').textContent = 'Edit Resource';
        document.getElementById('edit-resource-id').value = resource.id;
        document.getElementById('resource-name').value = resource.name;
        document.getElementById('resource-url').value = resource.url;
        document.getElementById('resource-description').value = resource.description || '';
        document.getElementById('resource-category').value = resource.category;
        document.getElementById('delete-resource-btn').style.display = 'block';
        resourceModal.classList.add('active');
    }
}

function autoDeleteCompletedTasks() {
    const completedTasks = state.tasks.filter(t => t.completed);
    
    if (completedTasks.length === 0) {
        showToast('No completed tasks to delete', 'info');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${completedTasks.length} completed task(s)?`)) {
        state.tasks = state.tasks.filter(t => !t.completed);
        saveState();
        renderTasks();
        showToast(`Deleted ${completedTasks.length} completed task(s)`);
    }
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e94560' : type === 'success' ? '#4cd97b' : '#0f3460'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

function setupCharts() {
    // Weekly XP Chart
    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    new Chart(weeklyCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'XP Earned',
                data: [120, 190, 300, 250, 200, 180, 210],
                backgroundColor: 'rgba(233, 69, 96, 0.7)',
                borderColor: 'rgba(233, 69, 96, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });

    // Subject Study Time Chart
    const subjectCtx = document.getElementById('subjectChart').getContext('2d');
    new Chart(subjectCtx, {
        type: 'doughnut',
        data: {
            labels: state.subjects.map(s => s.name),
            datasets: [{
                data: state.subjects.map(() => Math.floor(Math.random() * 10) + 1),
                backgroundColor: state.subjects.map(s => s.color),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });

    // Weekly Study Trend Chart
    const trendCtx = document.getElementById('weeklyTrendChart').getContext('2d');
    new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Study Hours',
                data: [12, 19, 15, 17],
                borderColor: 'rgba(233, 69, 96, 1)',
                backgroundColor: 'rgba(233, 69, 96, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }
            }
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);