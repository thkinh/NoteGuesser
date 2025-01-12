// JavaScript to handle note selection and validation
const confirmButton = document.getElementById("confirm-button");
const winStreakMessage = document.getElementById("winStreak-message");
const resultMessage = document.getElementById("result-message");
const sharpCheck = document.getElementById('sharp-checkbox');
const flatCheck = document.getElementById('flat-checkbox');
const generateButton = document.getElementById('generate-button');
const imgElement = document.getElementById('note-image');
const quizElement = document.getElementById('note-arithmetic');
let isSharp = false;
let isFlat = false;
const noteArray = ['Do', 'Re', 'Mi', 'Fa', 'Son', 'La', 'Si'];
const possibleOffSet = [-2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2];

let Answer = noteArray[0];
let winStreak = 0;

function handleGenerate(){
	let seedNote = Math.floor(Math.random() * 7);
	let baseNote = noteArray[seedNote];
	let offSet = possibleOffSet[Math.floor(Math.random() * 7)]; 

	Answer = noteArray[(((seedNote + offSet*2)+7) % 7)];
	console.log((seedNote + offSet*2) % 7)	
	let quiz = `${baseNote}${offSet > 0 ? ` + ${offSet}` : ` - ${0 - offSet}`}`;
	console.log(quiz);
	quizElement.textContent = quiz;
	resultMessage.textContent = "";	
}

function loadImage(){
	try{
		imgElement.src = `Image/${Answer}.png`;	
	}
	catch(err) {
		console.log(`${err}`);
		console.log(`Image ${Answer}.png does not exist`);
	}
}


// Function to handle checkbox changes
function handleSharpCheck() {
	// Check if 'sharp' is selected
	if (sharpCheck.checked) {
		isSharp = true;
		isFlat = false; // Unselect 'flat' if 'sharp' is selected
		flatCheck.checked = false;
	}
	else {
		isSharp = false;
		isFlat = false;
	}
	// Log the current state (optional, for debugging)
	console.log(`Sharp: ${isSharp}, Flat: ${isFlat}`);
}

function handleFlatCheck(){
	// Check if 'flat' is selected
	if (flatCheck.checked) {
		isFlat = true;
		isSharp = false; // Unselect 'sharp' if 'flat' is selected
		sharpCheck.checked = false;
	}
	// If neither are selected, reset both
	else {
		isSharp = false;
		isFlat = false;
	}
	console.log(`Sharp: ${isSharp}, Flat: ${isFlat}`);
}


// Add event listeners to both checkboxes
sharpCheck.addEventListener('change', handleSharpCheck);
flatCheck.addEventListener('change', handleFlatCheck);

generateButton.addEventListener("click", ()=> {
	handleGenerate();
	loadImage();
});
document.addEventListener("keydown", (event) => {
	if(event.code == "Space"){
		event.preventDefault();
		handleGenerate();
		loadImage();
	}
});


confirmButton.addEventListener("click", () => {
	// Get all radio buttons with the name "month"
	const radioButtons = document.getElementsByName("note");

	// Find the selected radio button
	let selectedNote = null;
	radioButtons.forEach((radio) => {
		if (radio.checked) {
			selectedNote = radio.nextElementSibling.textContent.trim(); // Get the label text
		}
	});

	// Check if a note was selected
	if (selectedNote) {
		let note = `Selected note: ${selectedNote}${isSharp ? "#" : isFlat ? "b" : ""}`;
		console.log(note);
		winStreak =  selectedNote == Answer ? winStreak + 1 : 0;
		resultMessage.textContent = selectedNote == Answer ? `CORRECT` : `WRONG`;
		winStreakMessage.textContent = selectedNote == Answer? `Winstreak: ${winStreak}` : "";
		resultMessage.style.color = selectedNote == Answer ? "lightgreen" : "red";
	} else {
		console.log("No note selected");
		resultMessage.textContent = "Please select a note.";
		resultMessage.style.color = "red";
	}
});

