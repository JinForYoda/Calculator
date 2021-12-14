document.addEventListener("DOMContentLoaded", function () {
	let mainInput = document.querySelector(".calc__main__dislay__block");
	let topInput = document.querySelector(".calc__main__dislay__top");
	let input = document.querySelector(".calc__main__input");
	let history = document.querySelector(".calc__history");
	let trash = document.querySelector('.trashBlock');
	document.addEventListener("click", function (event) {

		if (event.target.closest('div').classList.contains("trashBlock")) { history.innerHTML = '' }
		if (event.target.tagName != 'TD') return;
		if (!event.target.classList.length) {
			if (event.target.textContent == "+/-") {

			}

			else {
				if (!/[\d\.]/.test(event.target.textContent)) {
					topInput.value += mainInput.value;
					mainInput.value = "";
					console.log(topInput.value);
					mainInput.placeholder = calc(topInput.value);
					topInput.value += ` ${event.target.textContent} `;
				}

				else { mainInput.value += event.target.textContent }
			}
		}
		else {
			if (event.target.textContent == "CE") {
				mainInput.value = "";
				mainInput.placeholder = "";
				topInput.value = "";
			}
			else if (event.target.textContent == "=") {
				topInput.value = mainInput.value + ' =';
				mainInput.value = calc(mainInput.value);
				let span = document.createElement("span");
				span.classList.add("answer")

				span.innerHTML = `${topInput.value} ${mainInput.value} <br>`;

				history.append(span);
			}
			else {
				mainInput.value = mainInput.value.substring(0, mainInput.value.length - 1);
			}
		}

	});
	document.addEventListener('keydown', function (event) {

		let key = document.getElementById(`${event.key}`)
		console.log(event.key);
		async function trySwitch(options) {
			if (/!(F)[\d+\.]/.test(options)) {
				mainInput.value += `${options}`;
				topInput.placeholder = "";
				key.classList.toggle('active');
				await new Promise(() => setTimeout(() => key.classList.toggle('active'), 100));
			}
			if (/[\+\-\/\*\)\)]/.test(options) && mainInput.value != "") {


				topInput.value += mainInput.value;
				mainInput.value = "";
				topInput.placeholder = "";
				mainInput.placeholder = calc(topInput.value);
				topInput.value += ` ${options} `;
			}
			switch (options) {

				case 'Backspace':
					mainInput.value = mainInput.value.substring(0, mainInput.value.length - 1);
					key.classList.toggle('active');
					await new Promise(() => setTimeout(() => key.classList.toggle('active'), 100));

				case 'Escape':
					mainInput.value = "";
					mainInput.placeholder = ""
					topInput.value = "";
					topInput.placeholder = "";
					key.classList.toggle('active');
					await new Promise(() => setTimeout(() => key.classList.toggle('active'), 100));


				case 'Enter':
					topInput.value += mainInput.value;
					mainInput.value = '';
					mainInput.placeholder = calc(topInput.value);
					topInput.placeholder = topInput.value + " =";
					topInput.value = ""
					let span = document.createElement("span");
					span.classList.add("answer")

					span.innerHTML = `${topInput.placeholder} ${mainInput.placeholder} <br>`;

					history.append(span);
					key.classList.toggle('active');
					await new Promise(() => setTimeout(() => key.classList.toggle('active'), 100));
			}
		}
		trySwitch(event.key)


	});
})