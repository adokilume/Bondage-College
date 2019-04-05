var C999_Common_Achievements_CurrentStage = 0;

var C999_Common_Achievements_Enabled = true;
var C999_Common_Achievements_Image = "";
var C999_Common_Achievements_Unlocked = [];

// Proper variables are created at runtime, this allows for easier lookup if an achievement with a given name exists
var C999_Common_Achievements_List = [
    "C001_StealRope",
    "C001_AmandaSidneyKiss",
    "C001_SidneyFightWin",
    "C002_ChapterUnlock",
    "C002_MildredSubdue",
    "C002_AmandaSarahHug",
    "C003_ChapterUnlock",
    "C003_YukiDrug",
    "C004_Egg",
    "C004_BondageModel",
    "C004_SelfShibari",
    "C005_ChapterUnlock",
    "C006_ChapterUnlockMildred",
    "C006_ChapterUnlockYuki",
    "C006_SelfTrap",
    "C010_Speedrun"
];

// Chapter Common - Achievements Load
function C999_Common_Achievements_Load() {
	LeaveIcon = "";
    LeaveScreen = "";
    C999_Common_Achievements_PrepareAchievements();
    Common_Number = C999_Common_Achievements_Unlocked.length;
	LoadInteractions();
	StopTimer(7.6666667 * 60 * 60 * 1000);
}

// Chapter Common - Achievements Run
function C999_Common_Achievements_Run() {
    BuildInteraction(C999_Common_Achievements_CurrentStage);
    if ((C999_Common_Achievements_Image !== undefined) && (C999_Common_Achievements_Image.trim() != "")) {
        DrawImage(C999_Common_Achievements_Image, 600, 0);
    }
}

// Chapter Common - Achievements Click
function C999_Common_Achievements_Click() {
    C999_Common_Achievements_ResetImage();
	ClickInteraction(C999_Common_Achievements_CurrentStage);
	StopTimer(7.6666667 * 60 * 60 * 1000);
}

// Chapter Common - Achievements, load achievements that are already unlocked and initialize variables
function C999_Common_Achievements_PrepareAchievements() {
    // Remove achievements that were unlocked before the feature was released
    localStorage.removeItem("Achievements");

    C999_Common_Achievements_Unlocked = [];
    if (localStorage.getItem("GlobalAchievements"))
        C999_Common_Achievements_Unlocked = JSON.parse(localStorage.getItem("GlobalAchievements"));
    for (var A = 0; A < C999_Common_Achievements_List.length; A++) {
        var AchievementName = C999_Common_Achievements_List[A];
        window["C999_Common_Achievements_" + AchievementName] = (C999_Common_Achievements_Unlocked.indexOf(AchievementName) > -1);
    }
}

// Chapter Common - Achievements, overrides the image display with any image from any chapter (related to the selected achievement)
function C999_Common_Achievements_ShowImage(ImagePath) {
    C999_Common_Achievements_Image = ImagePath;
}

// Chapter Common - Achievements, stops the image being overridden
function C999_Common_Achievements_ResetImage() {
    C999_Common_Achievements_Image = "";
}

// Chapter Common - Achievements, go back to the main menu
function C999_Common_Achievements_MainMenu() {
    C999_Common_Achievements_ResetImage();
	SetScene("C000_Intro", "ChapterSelect");
}

// Chapter Common - Achievements, unlocks all achievements (for development only)
function C999_Common_Achievements_UnlockAll() {
    for (var A = 0; A < C999_Common_Achievements_List.length; A++) {
        AchievementUnlock(C999_Common_Achievements_List[A]);
    }
    Common_Number = C999_Common_Achievements_Unlocked.length;
}

// Chapter Common - Achievements, resets all unlocked achievements (for development)
function C999_Common_Achievements_ResetAll() {
    C999_Common_Achievements_Unlocked = [];
    for (var A = 0; A < C999_Common_Achievements_List.length; A++) {
        var AchievementName = C999_Common_Achievements_List[A];
        window["C999_Common_Achievements_" + AchievementName] = false;
    }
    localStorage.setItem("GlobalAchievements", JSON.stringify(C999_Common_Achievements_Unlocked));
    Common_Number = C999_Common_Achievements_Unlocked.length;
}

// Unlocks the Achievement of the given name, to be called globally
function AchievementUnlock(AchievementName) {
    if (!C999_Common_Achievements_Enabled) return;
    if (C999_Common_Achievements_List.indexOf(AchievementName) < 0) return;
    // If the list of unlocked achievements is empty, it might just not be loaded yet (it's only loaded when the achievement menu is visited before playing), which would lead to the player's progress being overwritten
    if (!C999_Common_Achievements_Unlocked.length) C999_Common_Achievements_PrepareAchievements();
    if (C999_Common_Achievements_Unlocked.indexOf(AchievementName) < 0) {
        window["C999_Common_Achievements_" + AchievementName] = true;
        C999_Common_Achievements_Unlocked.push(AchievementName);
        localStorage.setItem("GlobalAchievements", JSON.stringify(C999_Common_Achievements_Unlocked));
    }
}
