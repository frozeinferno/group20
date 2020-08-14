const storage = firebase.storage();

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
	var input, filter, ul, li, a, i;
	input = document.getElementById("myInput");
	filter = input.value.toUpperCase();
	div = document.getElementById("myDropdown");
	a = div.getElementsByTagName("a");
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}

async function main() {
	// https://firebase.google.com/docs/firestore/query-data/query-cursors
	// Will only show first five events for now, TODO: implement pagination
	const first = db.collection("events").where("published", "==", true).orderBy("date", "desc").limit(5); // Require composite index
	const snapshot = await first.get();

	let promises = [];
	snapshot.forEach(async (doc) => {
		promises.push(buildCard(doc));
	});

	const results = await Promise.all(promises);

	$("#events_cards").html("");
	for (const html of results) {
		$("#events_cards").append(html);
	}
}

// Uses Handlebars.js to render card HTML
async function buildCard(doc) {
	const eventCardSrc = `<div class="card"><img class="card__image" src="{{{ image_url }}}" alt=""><div class="card__content">{{{ content }}}</div><div class="card__info"><div><a href="/events/{{{ event_id }}}" class="card__link">View Event</a></div></div></div>`;
	const eventCardTemplate = Handlebars.compile(eventCardSrc);
	const image_url = await storage.ref(`events/${doc.id}`).getDownloadURL();
	const data = { "event_id": doc.id, "content": doc.data()["subject"].replace(/\\n/g, "<br/>"), "image_url": image_url };
	const html = eventCardTemplate(data);
	return html;
}

main();