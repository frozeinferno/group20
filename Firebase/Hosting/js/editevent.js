let gotDoc = false;

const eventId = window.location.href.split("#").pop();
firebase.auth().onAuthStateChanged((currentUser) => {
	if (currentUser) {
		db.collection("events").doc(eventId).get().then((snapshot) => {
			if (snapshot.data()["user"] == currentUser.uid) {
				$("#name").val(snapshot.data()["name"]);
				$("#date").val(snapshot.data()["date"]);
				$("#location").val(snapshot.data()["location"]);
				const pub = (snapshot.data()["published"] == true) ? "yes" : "no";
				$("#published").val(pub);
				$("#subject").val(snapshot.data()["subject"].replace(/\\n/g, "\n"));
			} else {
				window.location.replace("/events");
			}
		});
	} else {
		window.location.replace("/");
	}
});

$("#submit").on("click", async () => {
	// Inputs
	const eventName = $("#name").val();
	const eventDate = $("#date").val();
	const eventLoc = $("#location").val();
	const eventSubject = $("#subject").val();
	const eventPublished = $("#published").val();

	// Check all fields were filled in
	try {
		if (eventName == "") throw ("No event name!");
		if (eventDate == "") throw ("No event date!");
		if (eventLoc == "") throw ("No event location!");
		if (eventSubject == "") throw ("No event subject!");
		if (eventPublished == "") throw ("No event published status!");
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
			const docRef = await db.collection("events").doc(eventId).set({
				user: user.uid,
				name: eventName,
				date: eventDate,
				location: eventLoc,
				subject: eventSubject,
				published: ((eventPublished == "yes") ? true : false)
			});
			alert("Saved!")
		} catch (error) {
			alert("There was an error creating the event!");
			console.log(error);
			$("#submit").prop("disabled", false);
			$("#submit").css("cursor", "pointer");
		}
	}
});