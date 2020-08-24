const storage = firebase.storage();
const functions = firebase.functions();
const registerInterest = firebase.app().functions("europe-west1").httpsCallable("registerInterest");

let events = {};
const searchClient = algoliasearch("QNQTMV2ZTW", "0f6d2908c4578df3184587ba435457c3");
const index = searchClient.initIndex("dev_EVENTS");

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

async function search() {
	const input = document.getElementById("myInput").value;

	if (input == "") {
		$("#myDropdown").find("a").remove();
		return;
	}

	const result = await index.search(input);
	$("#myDropdown").find("a").remove();
	for (const hit of result.hits) {
		$("#myDropdown").append(`<a class="searchLink" href="/events#${hit.objectID}">${hit.name}</a>`);
	}

	$(".searchLink").click(async (event) => {
		const event_id = event.target.href.split("#").pop();
		openModal(event_id);
	});
}

// Uses Handlebars.js to render card HTML
async function buildCard(doc) {
	const eventCardSrc = `<div class="card"><img class="card__image" src="{{{ image_url }}}" alt=""><div class="card__content"><h3>{{{ event_name }}}</h3>{{{ content }}}</div><div class="card__info"><div><a href="/events#{{{ event_id }}}" class="card__link" id="{{{ event_id }}}">View Event</a></div></div></div>`;
	const eventCardTemplate = Handlebars.compile(eventCardSrc);
	const image_url = await storage.ref(`events/${doc.id}`).getDownloadURL();
	events[doc.id]["image_url"] = image_url;
	const data = { "event_id": doc.id, "event_name": doc.data()["name"], "content": doc.data()["subject"].replace(/\\n/g, "<br/>"), "image_url": image_url };
	const html = eventCardTemplate(data);
	return html;
}

// Popup modal
async function buildModal(event_id) {
	let buttonText = "I'm going!";
	let already_going = "";

	if (events[event_id].user == auth.currentUser.uid) {
		buttonText = "Edit";
	}

	if (events[event_id]["attendees"]?.includes(auth.currentUser.uid)) {
		already_going = "disabled";
	}

	const eventModalSrc = `<div class="modal-content"><p class="close">&times;</p><img class="modal__image" src="{{{ event_image }}}" alt=""/><h3>{{{ event_name }}}</h3><p>{{{ event_description }}}</p><br/><p>Date: {{{ event_date }}}</p><p>Location: {{{ event_location }}}</p><p>Going: {{{ event_going }}}</p><br/><button {{ already_going }} id="event_button">{{ button_text }}</button></div>`;
	const eventModalTemplate = Handlebars.compile(eventModalSrc);
	const data = { "button_text": buttonText, "event_id": event_id, "event_image": events[event_id]["image_url"], "event_name": events[event_id]["name"], "event_description": events[event_id]["subject"].replace(/\\n/g, "<br/>"), "event_date": events[event_id]["date"], "event_location": events[event_id]["location"], "event_going": events[event_id]["attendees"]?.length || 0, "already_going": already_going };
	const html = eventModalTemplate(data);
	return html;
}

async function openModal(event_id) {
	const html = await buildModal(event_id);
	$("#eventModal").html(html);

	modal.style.display = "block";

	const closeBtn = document.getElementsByClassName("close")[0];
	closeBtn.onclick = function () {
		modal.style.display = "none";
	}

	$("#event_button").click(async () => {
		if (events[event_id].user == auth.currentUser.uid) {
			window.location.href = `/editevent#${event_id}`;
		} else {
			await registerInterest({ "event": event_id });
			alert("Thank you for registering your interest! You have been added.");
			window.location.href = "/events";
		}
	});

	console.log(event_id);
}

const modal = document.getElementById("eventModal");

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}

async function main() {
	const first = db.collection("events").where("published", "==", true).orderBy("date", "desc"); // Require composite index
	const snapshot = await first.get();

	let promises = [];
	snapshot.forEach(async (doc) => {
		events[doc.id] = doc.data();
		promises.push(buildCard(doc));
	});

	const results = await Promise.all(promises);

	$("#events_cards").html("");
	for (const html of results) {
		$("#events_cards").append(html);
	}

	// Register listener
	$(".card__link").click(async (event) => {
		const event_id = event.target.href.split("#").pop();
		openModal(event_id);
	});
}

main();