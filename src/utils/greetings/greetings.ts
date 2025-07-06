export enum TimeOfDay {
    MORNING = 'MORNING',
    MIDDAY = 'MIDDAY',
    AFTERNOON = 'AFTERNOON',
    EVENING = 'EVENING',
    NIGHT = 'NIGHT'
}

const greetings = {
    [TimeOfDay.MORNING]: [
        "Good morning!",
        "Morning! How can Cyclone help?",
        "Ready to tackle the day?",
    ],
    [TimeOfDay.MIDDAY]: [
        "Hello there!",
        "How's your day going?",
        "What can Cyclone help you with?",
    ],
    [TimeOfDay.AFTERNOON]: [
        "Good afternoon!",
        "Hope your day's treating you well!",
        "What's on your mind?",
    ],
    [TimeOfDay.EVENING]: [
        "Good evening!",
        "How did your day go?",
        "Evening! What brings you here?",
    ],
    [TimeOfDay.NIGHT]: [
        "Working late tonight?",
        "Evening! Still going strong?",
        "Up late? How can Cyclone help?",
    ]
};

export const getTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return TimeOfDay.MORNING;
    if (hour >= 12 && hour < 14) return TimeOfDay.MIDDAY;
    if (hour >= 14 && hour < 18) return TimeOfDay.AFTERNOON;
    if (hour >= 18 && hour < 22) return TimeOfDay.EVENING;
    return TimeOfDay.NIGHT;
};

export const getRandomGreeting = (): string => {
    const timeOfDay = getTimeOfDay();
    const timeGreetings = greetings[timeOfDay];
    const randomIndex = Math.floor(Math.random() * timeGreetings.length);
    return timeGreetings[randomIndex];
};