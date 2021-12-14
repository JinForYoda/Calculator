function doMath(arrExpr) {
	let operators = ["+", "-", "*", "/"];
	let firstRank = ["("];
	let secondRank = ["*", "/"];
	let thirdRank = ["+"];



	while (arrExpr.find(el => firstRank.includes(el))) {



		let i = arrExpr.reverse().findIndex(el => el == "(");
		let j = i;


		while (arrExpr[i] != ")") { i-- };

		let newArr = arrExpr.splice(i, j - i + 1)


		newArr.reverse().pop();
		newArr.shift();


		arrExpr.splice(i, 0, calc(newArr.join(" ")))
		arrExpr.reverse()





	}


	while (arrExpr.find(el => operators.includes(el))) {

		if (arrExpr.find(el => el == "-")) {
			for (let i = 0; i < arrExpr.length - 1; i++) {

				if (arrExpr[i] == "-" && arrExpr[i + 1] == "-") {
					arrExpr.splice(i, 2, "+")
				}
				else if (arrExpr[i] == "-") {

					arrExpr.splice(i, 1);


					arrExpr[i] = [arrExpr[i]]

					let j = i + 1;

					while (j <= arrExpr.length - 1) {

						if (operators.includes(arrExpr[j])) { break }
						arrExpr[i].push(arrExpr.splice(j, 1).join(""))



					}

					arrExpr[i] = +arrExpr[i].join("") * (-1)

				}
			}

		}


		if (!arrExpr.find(el => operators.includes(el))) {

			let a = +arrExpr.filter(el => typeof (el) == "string").join("");
			let b = arrExpr.find(el => typeof (el) == "number");
			return a + b

		}




		while (arrExpr.find(el => secondRank.includes(el))) {
			let i = arrExpr.findIndex(el => secondRank.includes(el));
			let numArr1 = []
			let j = i;
			while (j > 0) {
				j--
				if (operators.includes(arrExpr[j])) { j++; break }
				numArr1.unshift(arrExpr[j]);
				if (numArr1.length > 1 && numArr1.find(el => +el < 0)) { numArr1.shift(); j++; break }
			}
			let numArr2 = []

			while (i < arrExpr.length - 1) {
				i++
				if (operators.includes(arrExpr[i])) { i--; break }
				numArr2.push(arrExpr[i]);
				if (numArr2.length > 1 && numArr2.find(el => +el < 0)) { numArr2.pop(); i--; break }
			}


			arrExpr.find(el => secondRank.includes(el)) == "*" ? arrExpr.splice(j, i - j + 1, (numArr1.join("") * 1) * (numArr2.join("") * 1)) : arrExpr.splice(j, i - j + 1, (numArr1.join("") * 1) / (numArr2.join("") * 1))

		}

		if (!arrExpr.find(el => operators.includes(el)) && !arrExpr.find(el => typeof (el) == "string") && arrExpr.length == 2) {


			return arrExpr[0] + arrExpr[1]

		}

		if (arrExpr.filter(el => el == "-")) {
			for (let i = 0; i < arrExpr.length - 1; i++) {
				if (arrExpr[i] == "-" && arrExpr[i + 1] == "-") {
					arrExpr.splice(i, 2, "+")
				}
				else if (arrExpr[i] == "-") {
					arrExpr[i] = "+";
					arrExpr[i + 1] = arrExpr[i + 1] * (-1);

				}
			}
		}

		while (arrExpr.find(el => thirdRank.includes(el))) {

			let i = arrExpr.findIndex(el => thirdRank.includes(el));
			let numArr1 = []
			let j = i;
			while (j > 0) {
				j--
				if (operators.includes(arrExpr[j])) { j++; break }
				numArr1.unshift(arrExpr[j])
				if (numArr1.length > 1 && numArr1.find(el => +el < 0)) { numArr1.shift(); j++; break }
			}
			let numArr2 = []
			while (i < arrExpr.length - 1) {
				i++
				if (operators.includes(arrExpr[i])) { i--; break }
				numArr2.push(arrExpr[i])
				if (numArr2.length > 1 && numArr2.find(el => +el < 0)) { numArr2.pop(); i--; break }
			}

			arrExpr.find(el => thirdRank.includes(el)) == "+" ? arrExpr.splice(j, i - j + 1, (numArr1.join("") * 1) + (numArr2.join("") * 1)) : ""
		}


	}

	if (!arrExpr.find(el => operators.includes(el)) && !arrExpr.find(el => typeof (el) == "string") && arrExpr.length == 2) {


		return arrExpr[0] + arrExpr[1]

	}
	return +arrExpr.join("")
}

function calc(expression) {
	let operators = ["+", "-", "*", "/", "("];

	let arrExpr = expression.split("").filter(el => el != " ")


	if (arrExpr.filter(el => operators.includes(el)).length == 1 && arrExpr[0] == "-") {
		arrExpr.shift();
		return +arrExpr.join("") * (-1)
	}

	return arrExpr.find(el => operators.includes(el)) ? doMath(arrExpr) : +arrExpr.join("")
}

console.log(calc('89 + 3 * 9'));