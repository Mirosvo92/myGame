$(document).ready(function() {
	//height will be 100%
	function heightDetect(){
		$("body").css("min-height",$(window).height());
	}
	heightDetect();
    //variables
	var $timeStart = $(".time_start"),
	$levelForStart = $(".level_for_start"),
	$start = $(".start"),
	rezArr = [],
	$numeral = $(".numeral"),
	goNumeral,
	$answer = $(".answer"),
	$bottomCheck = $(".button_check"),
	sumNumeral = 0,
	$newGame = $(".new_game"),
	$inputAnswer = $(".answer > input").val(),
	$level = $(".level"),
	$ruleText = $(".rule_text"),
	$ruleGame = $(".rule_game"),
	levelNumber = 1;
	//event for starting a game
	function timer(time, range1, range2, numberOfCycles){
		$timeStart.text($timeStart.text() - 1);
		$(".answer > input").css("display","none");
		$levelForStart.css("display","flex");
		$levelForStart.text("level " + levelNumber);
		if($timeStart.text() == 0){
			$timeStart.text("go");
            $($timeStart).slideUp(1000);
			$levelForStart.slideUp(1000);
			goNumeral =  setInterval(randomInteger, time ,range1,range2,numberOfCycles);
			} else{
			setTimeout(timer,1000, time, range1, range2, numberOfCycles);
		}
	}

	$($start).click(function(){
		$($start).css("display","none");
		$timeStart.css("display", "flex");
		$bottomCheck.css("display","none");
		$newGame.css("display","none");
		$levelForStart.css("display","flex");
		$levelForStart.text("level " + levelNumber);
		//function for start and speed 
		setTimeout(timer, 1000, 3000, 1, 10, 5);
		$timeStart.text(3);
	});
	
	function stopRandom(){
		clearTimeout(goNumeral);
		$numeral.css("display", "none");
		$answer.css("display", "flex");
		$(".answer > input").css("display","block");
		$bottomCheck.css("display","block");
		countAnswer();
	}
	//function for a randomly numbers
	function randomInteger(min, max, amountOfCycles) {
		$bottomCheck.css("display","none");
		$(".answer > input").css("display","none");
		var rand = min - 0.5 + Math.random() * (max - min + 1)
		rand = Math.round(rand);
		if(rand == rezArr[0]){
			rand++;
			rezArr.unshift(rand);
			}else{
			rezArr.unshift(rand);
		};
		$numeral.css("display", "block").text("+ " + rand);
		if(rezArr.length === amountOfCycles){
			setTimeout(stopRandom, 500)
		}
	};
	//function for count
	function countAnswer(){
		rezArr.forEach(function(item, i) {
			sumNumeral += item;
		});
		return sumNumeral;
	}
	//event for check answer
	$bottomCheck.click(function(){
		$inputAnswer = $(".answer > input").val();
		if(+$inputAnswer === sumNumeral){
			$bottomCheck.css("display","none");
			alert("win");
			levelNumber++;
			delNumeral();
			$timeStart.text(3);
			if(levelNumber == 6){
				$($timeStart).css("display", "flex");
				$timeStart.text("the end of the game! You win");
				return;
			}
			$timeStart.css("display", "flex");
			$levelForStart.css("display","flex");
			$levelForStart.text("level " + levelNumber);
			//setTimeout(timer,1000, 2000);
			$level.text("level " + levelNumber);
			if($level.text() === "level 2"){
				setTimeout(timer, 1000, 3000, 1, 10, 10);
				}else if($level.text() === "level 3") {
				setTimeout(timer, 1000, 2500, 10, 15, 5);
				}else if($level.text() === "level 4") {
				setTimeout(timer, 1000, 1500, 15, 25, 7);
				}else if($level.text() === "level 5"){
				setTimeout(timer, 1000, 1000, 25, 100, 10);
				}else if($level.text() === "level 6"){
			}
			}else{
			alert("you lose( " + "correct answer: " + sumNumeral );
			delNumeral();
			$start.css("display","none");
			$bottomCheck.css("display","none");
			$(".answer > input").css("display","none");
			$level.text("game over");
			$newGame.css("display","flex");
		}
	});
	//function for delete numeral of Array
	function delNumeral(){
		$(".answer > input:text").val("");
		for (var i = rezArr.length; i > 0; i--) {
			rezArr.shift();
		}
		sumNumeral = 0;
	}
	//event for new game
	$newGame.click(function(){
		$($start).prop({
			disabled: false
		});
		levelNumber = 1;
		$level.text("Level 1");
		$levelForStart.text("Level 1");
		delNumeral();
		$start.css("display","block");
		$bottomCheck.css("display","none");
		$newGame.css("display","none");
		$answer.css("display","none");
	});
	//$rule
	$ruleGame.click(function(){
		if( $ruleText.is(":visible")){ 
			$ruleText.slideUp(500);
			}else{
			$ruleText.css("display","flex").hide().slideDown(500);
		}
	});
}); 

$(window).load(function() { 
	$(".loader_inner").fadeOut(); 
	$(".loader").delay(400).fadeOut("slow"); 
});