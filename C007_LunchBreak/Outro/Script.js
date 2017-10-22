// Chapter 7 - Lunch Break Load
function C007_LunchBreak_Outro_Load() {
	
	// Time is always 12:45:00 in the outro, unlock if needed
	StopTimer(12.75 * 60 * 60 * 1000, CurrentChapter, "Outro");
	PlayerUnlockAllInventory();
	PlayerClothes("Clothed");
	ActorSpecificClearInventory("Amanda", !C007_LunchBreak_ActorSelect_EvilEnding);
	ActorSpecificClearInventory("Sarah", !C007_LunchBreak_ActorSelect_EvilEnding);
	ActorSpecificClearInventory("Sidney", !C007_LunchBreak_ActorSelect_EvilEnding);
	ActorSpecificClearInventory("Jennifer", !C007_LunchBreak_ActorSelect_EvilEnding);
	ActorSpecificClearInventory("Natalie", !C007_LunchBreak_ActorSelect_EvilEnding);

	// Removes the blindfold and open gag for now, maybe we will use them in a later version
	PlayerRemoveInventory("Blindfold", 1);
	PlayerRemoveInventory("DoubleOpenGag", 1);

}

// Chapter 7 - Lunch Break  Run
function C007_LunchBreak_Outro_Run() {

	// Paints the background	
	var ctx = document.getElementById("MainCanvas").getContext("2d");
	DrawRect(ctx, 0, 0, 800, 600, "black");	
	if (C007_LunchBreak_ActorSelect_Actor == "") DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/EatAlone.jpg", 800, 0);
	else DrawImage(ctx, CurrentChapter + "/" + CurrentScreen + "/Bell.jpg", 800, 0);

	// Special Natalie/Kinbaku dialog for the outro
	if (C007_LunchBreak_ActorSelect_Kinbaku) {
		if (TextPhase >= 0) DrawText(ctx, GetText("Kinbaku1"), 400, 150, "White");
		if (TextPhase >= 1) DrawText(ctx, GetText("Kinbaku2"), 400, 300, "White");
		if (TextPhase >= 2) DrawText(ctx, GetText("Kinbaku3"), 400, 450, "White");		
	} else {

		// Text for eating alone
		if (C007_LunchBreak_ActorSelect_Actor == "") {
			if (TextPhase >= 0) DrawText(ctx, GetText("EatAlone1"), 400, 150, "White");
			if (TextPhase >= 1) DrawText(ctx, GetText("EatAlone2"), 400, 300, "White");
			if (TextPhase >= 2) DrawText(ctx, GetText("EatAlone3"), 400, 450, "White");
		}

		// Text for no food leave
		if ((C007_LunchBreak_ActorSelect_Actor != "") && C007_LunchBreak_ActorSelect_NoFood) {
			if (TextPhase >= 0) DrawText(ctx, GetText("NoFood1"), 400, 150, "White");
			if (TextPhase >= 1) DrawText(ctx, GetText("NoFood2"), 400, 300, "White");
			if (TextPhase >= 2) DrawText(ctx, GetText("NoFood3"), 400, 450, "White");
		}

		// Text for early/evil leave
		if ((C007_LunchBreak_ActorSelect_Actor != "") && (C007_LunchBreak_ActorSelect_EarlyLeave || C007_LunchBreak_ActorSelect_EvilEnding) && !C007_LunchBreak_ActorSelect_NoFood) {
			if ((TextPhase >= 0) && !C007_LunchBreak_ActorSelect_EvilEnding) DrawText(ctx, GetText("Early1"), 400, 150, "White");
			if ((TextPhase >= 0) && C007_LunchBreak_ActorSelect_EvilEnding) DrawText(ctx, GetText("Evil1"), 400, 150, "White");
			if (TextPhase >= 1) DrawText(ctx, GetText("EvilEarly2"), 400, 300, "White");
			if (TextPhase >= 2) DrawText(ctx, GetText("EvilEarly3"), 400, 450, "White");
		}

		// Text for eating with someone
		if ((C007_LunchBreak_ActorSelect_Actor != "") && !C007_LunchBreak_ActorSelect_EarlyLeave && !C007_LunchBreak_ActorSelect_EvilEnding && !C007_LunchBreak_ActorSelect_NoFood) {
			if (TextPhase >= 0) DrawText(ctx, GetText("RegularBonus1"), 400, 150, "White");
			if ((TextPhase >= 1) && C007_LunchBreak_ActorSelect_BonusDone) DrawText(ctx, GetText("Bonus2"), 400, 300, "White");
			if ((TextPhase >= 1) && !C007_LunchBreak_ActorSelect_BonusDone) DrawText(ctx, GetText("Regular2"), 400, 300, "White");
			if (TextPhase >= 2) DrawText(ctx, GetText("RegularBonus3"), 400, 450, "White");
		}

	}

}

// Chapter 7 - Lunch Break  Click
function C007_LunchBreak_Outro_Click() {

	// Jump to the next animation
	TextPhase++;
			
	// Jump to lunch on phase 3
	if (TextPhase >= 3) {
		SaveMenu("C008_DramaClass", "Intro");
	}

}