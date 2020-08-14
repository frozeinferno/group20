const storage = firebase.storage(); // Only needed here

$("#submit").on("click", async () => {
	// Inputs
	const eventName = $("#name").val();
	const eventDate = $("#date").val();
	const eventLoc = $("#location").val();
	const eventSubject = $("#subject").val();
	const eventFileButton = document.getElementById("img");

	// Check all fields were filled in
	try {
		if (eventName == "") throw ("No event name!");
		if (eventFileButton.files[0] == null) throw ("No event file image!");
		if (eventDate == "") throw ("No event date!");
		if (eventLoc == "") throw ("No event location!");
		if (eventSubject == "") throw ("No event subject!");
	} catch (error) {
		alert(error);
		return;
	}

	// Disallow multiple submits
	$("#submit").prop("disabled", true);
	$("#submit").css("cursor", "not-allowed");

	const user = auth.currentUser;
	if (user != null) { // Final user check
		try {
			const docRef = await db.collection("events").add({
				user: user.uid,
				name: eventName,
				date: eventDate,
				location: eventLoc,
				subject: eventSubject, // TODO: Accept newlines
				published: true
			});

			try {
				const file = eventFileButton.files[0];
				const storageRef = storage.ref(`events/${docRef.id}`);
				const snapshot = await storageRef.put(file); // Wait for file to be uploaded

				alert(`Event ${docRef.id} created!`);

				window.location.href = "/events";
			} catch (error) {
				await docRef.delete();
				alert("There was an error uploading your image!");
				console.log(error);
				$("#submit").prop("disabled", false);
				$("#submit").css("cursor", "pointer");
			}
		} catch (error) {
			alert("There was an error creating the event!");
			console.log(error);
			$("#submit").prop("disabled", false);
			$("#submit").css("cursor", "pointer");
		}
	}
});