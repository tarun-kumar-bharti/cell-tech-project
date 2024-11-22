class CreateElementService { 
	 
	constructor(containerId) {	
	this.container = document.getElementById(containerId);
		if (!this.container) {
		  throw new Error("Container not found.");
		}
	}
	
	addDivTag(prop){
		const div = document.createElement('div'); 
		div.className   = prop.cssclass;
		div.id   		= prop.cssclass;
		return div;
	}
   
	addLabelTag(prop){ 
	  const label = document.createElement('label'); 
      label.textContent = prop.label;    
	  if(prop.needdiv){
		 var div =  this.addDivTag(prop);
		 div.appendChild(label);
		 return div;
	  }
	}	
  
	addDropdown(prop) {		 
		const select = document.createElement('select'); 
		select.setAttribute("id", prop.id);
		
		prop.options.forEach((option) => {
		  const optionElement = document.createElement('option');
		  optionElement.value = option.value;
		  optionElement.textContent = option.label;
		  if (option.value === prop.defaultValue) {
			optionElement.selected = true;
		  }
		  select.appendChild(optionElement);
		});
		
		select.addEventListener("change", prop.onChange);	
		
		if(prop.needdiv){
			var div =  this.addDivTag(prop);
			div.appendChild(select);
			return div;	
	    }
	}
	
	addButton(prop) { 
		const button = document.createElement('button'); 
		button.setAttribute("id", prop.id); 
		button.textContent=prop.showtext;
		button.addEventListener("click", prop.onClick);
		button.myParam  = prop.myParam;
		if(prop.needdiv){
			var div =  this.addDivTag(prop);
			div.appendChild(button);
			return div;	
	    } 
	}
   
	addTextField(prop){ 
		const input = document.createElement('input'); 
		input.setAttribute("id", prop.id);
		input.setAttribute("type", prop.type);
		input.setAttribute("placeholder", prop.placeholder);
		input.setAttribute("value", prop.value);
		input.setAttribute("name", prop.name);
		 
		if(prop.needdiv){
			var div =  this.addDivTag(prop);
			div.appendChild(input);
			return div; 
	    } 
	}
	 
 
}
