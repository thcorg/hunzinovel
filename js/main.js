var char = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "咕"];
var zalgoUp = ["\u030d", "\u030e", "\u0304", "\u0305", "\u033f", "\u0311", "\u0306", "\u0310", "\u0352", "\u0357", "\u0351", "\u0307", "\u0308", "\u030a", "\u0342", "\u0343", "\u0344", "\u034a", "\u034b", "\u034c", "\u0303", "\u0302", "\u030c", "\u0350", "\u0300", "\u0301", "\u030b", "\u030f", "\u0312", "\u0313", "\u0314", "\u033d", "\u0309", "\u0363", "\u0364", "\u0365", "\u0366", "\u0367", "\u0368", "\u0369", "\u036a", "\u036b", "\u036c", "\u036d", "\u036e", "\u036f", "\u033e", "\u035b", "\u0346", "\u031a"];
var zalgoDown = ["\u0316", "\u0317", "\u0318", "\u0319", "\u031c", "\u031d", "\u031e", "\u031f", "\u0320", "\u0324", "\u0325", "\u0326", "\u0329", "\u032a", "\u032b", "\u032c", "\u032d", "\u032e", "\u032f", "\u0330", "\u0331", "\u0332", "\u0333", "\u0339", "\u033a", "\u033b", "\u033c", "\u0345", "\u0347", "\u0348", "\u0349", "\u034d", "\u034e", "\u0353", "\u0354", "\u0355", "\u0356", "\u0359", "\u035a", "\u0323"];
var zalgoMid = ["\u0315", "\u031b", "\u0340", "\u0341", "\u0358", "\u0321", "\u0322", "\u0327", "\u0328", "\u0334", "\u0335", "\u0336", "\u034f", "\u035c", "\u035d", "\u035e", "\u035f", "\u0360", "\u0362", "\u0338", "\u0337", "\u0361", "\u0489"];

function rand(max) {
	return Math.floor(Math.random() * max);
}

function randZalgo(array) {
	var ind = Math.floor(Math.random() * array.length);
	return array[ind];
}

function isZalgoChar(c) {
	var i;
	for (i = 0; i < zalgoUp.length; i++) {
		if (c == zalgoUp[i]) {
			return true;
		}
	}
	for (i = 0; i < zalgoDown.length; i++) {
		if (c == zalgoDown[i]) {
			return true;
		}
	}
	for (i = 0; i < zalgoMid.length; i++) {
		if (c == zalgoMid[i]) {
			return true;
		}
	}
	return false;
}

function zalgo(txt) {
	var newtxt = "";
	for (var i = 0; i < txt.length; i++) {
		if (isZalgoChar(txt.substr(i, 1))) {
			continue;
		}
		var numUp = rand(4);
		var numMid = rand(8);
		var numDown = rand(4);
		newtxt += txt.substr(i, 1);
		for (var j = 0; j < numUp; j++) {
			newtxt += randZalgo(zalgoUp);
		}
		for (var j = 0; j < numMid; j++) {
			newtxt += randZalgo(zalgoMid);
		}
		for (var j = 0; j < numDown; j++) {
			newtxt += randZalgo(zalgoDown);
		}
	}
	return newtxt;
};

function decrypt(message, key) {
	result = CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
	return result == "" ? false : result;
}

function decryptPage() {
	key = $("#input-password").val();
	$.cookie("key", key, {
		expires: 30,
		path: "/"
	});
	for (i in $(".crypted")) {
		$(".crypted:eq(" + i + ")").html(decrypt($(".crypted:eq(" + i + ")").attr("src"), key)).animate({
			opacity: 0
		}, ".3s").animate({
			opacity: 1
		}, ".3s");
		$("tooltip").tooltip();
	}
}
(function ($) {
	$.getUrlParam = function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}
})(jQuery);

function mJSON(array, key, mode) {
	for (i in array) {
		switch (mode) {
			case "encrypt":
				array[i].chapterTitle = CryptoJS.AES.encrypt(array[i].chapterTitle, key).toString();
				for (j in array[i].content) {
					array[i].content[j] = CryptoJS.AES.encrypt(array[i].content[j], key).toString();
				}
				break;
			case "decrypt":
				array[i].chapterTitle = CryptoJS.AES.decrypt(array[i].chapterTitle, key).toString(CryptoJS.enc.Utf8);
				for (j in array[i].content) {
					array[i].content[j] = CryptoJS.AES.decrypt(array[i].content[j], key).toString(CryptoJS.enc.Utf8);
				}
		}
	}
	return JSON.stringify(array);
}

function generateZalgo() {
	for (i in $(".crypted")) {
		var result = "";
		for (var j = 0; j < Number($(".crypted:eq(" + i + ")").attr("length")); j++) {
			result += randZalgo(char);
		}
		$(".crypted:eq(" + i + ")").html(zalgo(result));
	}
}

function decryptButtonClicked() {
	if (CryptoJS.MD5(CryptoJS.SHA256(CryptoJS.MD5($("#input-password").val()).toString()).toString()).toString() != "b22aa51358028cb1280c3ccc1b8d9239") {
		$("#button-password").attr("class", "btn btn-danger");
		$("#group-password").attr("class", "input-group has-error");
	} else {
		$("#button-password").attr("class", "btn btn-success");
		$("#group-password").attr("class", "input-group has-success");
		decryptPage();
	}
}
$("#button-password").click(function () {
	decryptButtonClicked();
});
$("#input-password").keyup(function () {
	if (event.which == 13) {
		decryptButtonClicked();
	}
});
$("#input-password").val($.cookie("key"));
generateZalgo();

$("tooltip").tooltip();
$('[data-toggle="popover"]').popover();


$(".navbar-brand").mouseover(function () {
	$(".navbar-brand :eq(0)").hide();
	$(".navbar-brand :eq(1)").show();
});
$(".navbar-brand").mouseout(function () {
	$(".navbar-brand :eq(0)").show();
	$(".navbar-brand :eq(1)").hide();
});

function toggleStyle() {
	switch ($("#dark").attr("disabled")) {
		case "disabled":
			$("#dark").attr("disabled", false);
			$.cookie("pagestyle", "1", {
				expires: 30,
				path: "/"
			});
			break;
		case undefined:
			$("#dark").attr("disabled", "disabled");
			$.cookie("pagestyle", "0", {
				expires: 30,
				path: "/"
			});
	}
}
$("#dark").attr("disabled", !$.cookie("pagestyle", Number) ? "disabled" : false);