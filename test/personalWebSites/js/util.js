var list = document.getElementById("myLinks");
EventUtil.addHandler(list,"click",function(event){
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	switch(target.id){
		case "goSomewhere":
			document.title = "I changed the document's title";
			break;
		case "doSomething":
			location.href = "http://www.wrox.com";
			break;
		case "sayHi":
			alert("sayHi");
			break;
	}
});
