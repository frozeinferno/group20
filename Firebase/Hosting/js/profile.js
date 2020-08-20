firebase.auth().onAuthStateChanged((currentUser) => {
	if (currentUser) {
		db.collection("users").doc(currentUser.uid).collection("user_writeable").doc("profile").get().then((doc) => {
			$("#name").val(currentUser.displayName)
			$("#dob").val(doc.data()["dob"]);
			$("#gender").val(doc.data()["gender"]);
			$("#interests").val(doc.data()["interests"]);
		});

		$("#submit").click(async () => {
			$("#submit").prop('disabled', true);
			$("#submit").val("Saving...");
			await currentUser.updateProfile({
				displayName: $("#name").val()
			});
			await db.collection("users").doc(currentUser.uid).collection("user_writeable").doc("profile").update({
				"dob": $("#dob").val(),
				"gender": $("#gender").val(),
				"interests": $("#interests").val(),
			});
			alert("Profile updated!");
			$("#submit").val("Save");
			$("#submit").prop('disabled', false);
		});
	} else {
		return;
	}
});
