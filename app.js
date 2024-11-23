 
//Object creation
const DomElements 	 = new CreateElementService('container');
const WebStorage	 = new StorageService('');
 

///////////////////////////////////////////////////////////////////////// 
//add a label on webpage
var h2 = document.createElement('h2');
h2.style.textAlign ="center";
h2.innerHTML = "Form Creation";
DomElements.container.appendChild(h2); 
 
//add a label on webpage
var label_1 = DomElements.addLabelTag({
					label:"Select Element Type",
					cssclass:"firstDiv",		
					needdiv:true, 
				}); 
DomElements.container.appendChild(label_1);

//add a dropdown on webpage
var dropdown_1 = DomElements.addDropdown({
					  id: 'elementType',
					  options: [
						{ value: 'text', label: 'text' },
						{ value: 'password', label: 'password' },
						{ value: 'file', label: 'file' },
						{ value: 'button', label: 'button' },
						{ value: 'number', label: 'number' },
						//{ value: 'checkbox', label: 'checkbox' },
						//{ value: 'radio', label: 'radio' },
						{ value: 'select', label: 'select' } 
					  ],
					  defaultValue: 'text', 
					  cssclass:"secondDiv",
					  onChange:clearDiv,
					  needdiv:true
					});	
DomElements.container.appendChild(dropdown_1);
 
//add a button on webpage
var button_1 	=  DomElements.addButton({
					  id: 'submitBtn',
					  showtext: 'Add', 
					  needdiv:true,
					  cssclass:"thirdDiv",
					  onClick: addFormField
					});					
DomElements.container.appendChild(button_1);	
 
///////////////////////////////////////////////////////////////////////// 
var getoptions =[];
var getoptions2 =[];
 
var input_1, attrcontainer;

var getstoredForm = {};
var fileJSON = [];
const tbldiv = document.getElementById("containerfortable"); 
const containerforForm = document.getElementById('containerforForm');

var h2 = document.createElement('h2');
h2.style.textAlign ="center";
h2.innerHTML = "Form Management"; 
containerforForm.appendChild(h2);
//reset div element
function clearDiv(){
	const containerforForm = document.getElementById('attr-container');
	if(containerforForm){ 
		containerforForm.remove()  
	}
} 

//add fields for creation of form
function addFormField(){ 
		clearDiv();	
		attrcontainer  = 	DomElements.addDivTag({
									cssclass:"attr-container",
									id:"attr-container"	
								});	  
			
		label_1 = 	DomElements.addLabelTag({
							label:"Element Id",
							cssclass:"firstFormDiv",		
							needdiv:true, 
						});	 
		attrcontainer.appendChild(label_1);
			
		var type = "text";			 
		var input_1 = DomElements.addTextField({ 
								type:type,
								id:"elementid",	
								placeholder:"Element Id",
								value:"",
								cssclass:"secondFormDiv",		
								needdiv:true, 				
							});			
		attrcontainer.appendChild(input_1);
			
			 
		label_1 	= DomElements.addLabelTag({
							label:"Element Name",
							cssclass:"firstFormDiv",		
							needdiv:true, 
						});			
		attrcontainer.appendChild(label_1);
			
		input_1 = DomElements.addTextField({ 
							type:"text",
							id:"elementname",	
							placeholder:"Element Name",
							value:"",
							cssclass:"secondFormDiv",		
							needdiv:true, 				
						});			
		attrcontainer.appendChild(input_1);			
	  
			
		label_1 	= DomElements.addLabelTag({
							label:"Field Label",
							cssclass:"firstFormDiv",		
							needdiv:true, 
						});			
		attrcontainer.appendChild(label_1);
			
		input_1 = DomElements.addTextField({ 
							type:"text",
							id:"fieldname",	
							placeholder:"Field Label",
							value:"",
							cssclass:"secondFormDiv",		
							needdiv:true, 				
						});			
		attrcontainer.appendChild(input_1);	

		label_1 	= DomElements.addLabelTag({
							label:"Placeholder",
							cssclass:"firstFormDiv",		
							needdiv:true, 
						});			
		attrcontainer.appendChild(label_1);
			
		input_1 = DomElements.addTextField({ 
							type:"text",
							id:"placeholder",	
							placeholder:"Placeholder Text",
							value:"",
							cssclass:"secondFormDiv",		
							needdiv:true, 				
						});			
		attrcontainer.appendChild(input_1);	
			
			
		label_1 = 	DomElements.addLabelTag({
										label:"",
										cssclass:"firstFormDiv",		
										needdiv:true, 
									});			
		attrcontainer.appendChild(label_1);	
		
		
		if(document.getElementById('elementType').value=="select"){
		
			label_1 = 	DomElements.addLabelTag({
										label:"Add Options",
										cssclass:"firstFormDiv",		
										needdiv:true, 
									});			
			attrcontainer.appendChild(label_1);	
			
			input_1 = DomElements.addTextField({ 
							type:"text",
							id:"selectid",	
							placeholder:"Option Text",
							value:"",
							cssclass:"secondFormDiv",		
							needdiv:true, 				
						});			
			attrcontainer.appendChild(input_1);	
			
			button_1 	=  DomElements.addButton({
							  id: 'addtoformBtn',
							  showtext: 'Add Options', 
							  needdiv:true,
							  cssclass:"secondFormDiv",
							  onClick: addOptions
							});	 
								
			attrcontainer.appendChild(button_1);  

			label_1 = DomElements.addDivTag({
									cssclass:"selectidlist",
									id:"selectidlist"	
								});	 

			attrcontainer.appendChild(label_1);  						
		
		}
		
			
		button_1 	=  DomElements.addButton({
							  id: 'addtoformBtn',
							  showtext: 'Add To Form', 
							  needdiv:true,
							  cssclass:"secondDiv",
							  onClick: addFieldToFormDiv
							});	 
								
		attrcontainer.appendChild(button_1); 
	
	DomElements.container.appendChild(attrcontainer); 
}

//add options in selection/dropdown list
function addOptions(){
	var getval = document.getElementById("selectid").value;
	getoptions.push(getval);
	document.getElementById("selectidlist").innerHTML = getoptions.join(", ");	
	document.getElementById("selectid").value= "";
	
	getoptions2.push({value:getval,label:getval});
}

//Add all attribut to create one complete element
function addFieldToFormDiv(){
	const type 		= document.getElementById('elementType').value;	
	const getid 	= document.getElementById('elementid').value;	
	const getname 	= document.getElementById('elementname').value;	
    const fieldname	= document.getElementById('fieldname').value;
	const placeholder= document.getElementById('placeholder').value;	
	 
	var specialChars = /[^a-zA-Z0-9]/g;
	if ((getid == null || getid == "") && (getname == null || getname == "") && (fieldname == null || fieldname == "") ){
		alert ("Element ID , Element Name and Field Label can't be empty!");         
        return false;
	}else if (getid.match(specialChars)) {
        alert ("Only characters A-Z, a-z and 0-9 are allowed!");         
        return false;
    }else if (getname.match(specialChars)) { 
		alert ("Only characters A-Z, a-z and 0-9 are allowed!");         
        return false;
	}	
	
	var newindex = fileJSON.length;
	
	var getoptionsfordropdown=[];
	
	if(getoptions2.length>0){
		getoptionsfordropdown = JSON.parse(JSON.stringify(getoptions2));
	}	 
	
	label_1 		= DomElements.addLabelTag({
							label:fieldname,
							cssclass:"firstFormDiv",		
							needdiv:true, 
						});			
	containerforForm.appendChild(label_1);
	
	if(type=='button'){ 
		button_1 	=  DomElements.addButton({
				  id: getid,
				  showtext: fieldname, 
				  needdiv:true,
				  cssclass:"secondFormDiv",
				  onClick: saveFormField
				});					
		containerforForm.appendChild(button_1);  
	}else if(type=='select'){

		input_1 = DomElements.addDropdown({
					  id: getid,
					  showtext: fieldname, 
					  options: getoptions2,
					  defaultValue: getoptions2[0].text, 
					  cssclass:"secondFormDiv", 
					  needdiv:true
					});	
 		containerforForm.appendChild(input_1); 
			
		getoptions = [];
		getoptions2	= [];
		
	}else{			
		input_1 = DomElements.addTextField({ 
							type:type,
							id:getid,	
							name:getname,
							placeholder:placeholder, 
							value:"",
							cssclass:"secondFormDiv",		
							needdiv:true, 				
						});	 
		containerforForm.appendChild(input_1); 
	}
	
	button_1 	=  DomElements.addButton({
				 	id: "btn-"+getid,
				   showtext: "Delete", 
				   needdiv:true,
				   cssclass:"thirdFormDiv",
				   onClick: deleteFormField,
				   myParam : newindex
				});					
	containerforForm.appendChild(button_1);  
	 				  
	
	fileJSON.push({type:type,getid:getid,getname:getname,fieldname:fieldname,placeholder:placeholder,addedoptions:getoptionsfordropdown});
	WebStorage.removeItem("templist");
	WebStorage.setItem("templist",fileJSON);

	document.getElementById('elementid').value="";	
	document.getElementById('elementname').value="";	
    document.getElementById('fieldname').value="";
	document.getElementById('placeholder').value=""; 
	
	attrcontainer.innerHTML="";
	containerforForm.style.display="inline-block";	
}

//render saved form list
function rendertable(datajson){
	
	var h2 = document.createElement('h2');
	h2.style.textAlign ="center";
	h2.innerHTML = "Form List"; 
	tbldiv.appendChild(h2);
	
	tbldiv.style.backgroundColor="#d1d1d1";
	
	var table = document.createElement('table');
	var row = document.createElement('tr');
	row.appendChild(document.createElement('th'));
	row.cells[0].appendChild(document.createTextNode("Form Name"));
	row.appendChild(document.createElement('th'));
	row.cells[1].appendChild(document.createTextNode("")); 
	row.appendChild(document.createElement('th'));
	row.cells[2].appendChild(document.createTextNode("")); 
	row.appendChild(document.createElement('th'));
	row.cells[3].appendChild(document.createTextNode("")); 
	row.appendChild(document.createElement('th'));
	row.cells[4].appendChild(document.createTextNode("")); 
	table.appendChild(row);	 
	
	
	let getkeys = Object.keys(datajson); 
	
	getkeys.forEach((item,index) => {
		row = document.createElement('tr');
		row.appendChild(document.createElement('td'));
		row.cells[0].appendChild(document.createTextNode(item));
		row.appendChild(document.createElement('td'));  
		
		button_1 	=  DomElements.addButton({
					  id: item,
					  showtext: 'Form View', 
					  needdiv:true,
					  cssclass:"thirdDiv",
					  onClick: viewFormField,
					  myParam :item	
					});		
		row.cells[1].appendChild(button_1); 
		
		row.appendChild(document.createElement('td'));
		button_1 	=  DomElements.addButton({
					  id: item,
					  showtext: 'Delete Form', 
					  needdiv:true,
					  cssclass:"thirdDiv",
					  onClick: deleteFormList,
					  myParam :item	 	
					});	 
		
		row.cells[2].appendChild(button_1); 
		
		
		row.appendChild(document.createElement('td'));
		button_1 	=  DomElements.addButton({
					  id: item,
					  showtext: 'Add Record', 
					  needdiv:true,
					  cssclass:"thirdDiv",
					  onClick: addRecord,
					  myParam :item	 	
					});	 
		
		row.cells[3].appendChild(button_1); 
		
		row.appendChild(document.createElement('td'));
		button_1 	=  DomElements.addButton({
					  id: item,
					  showtext: 'Show Record', 
					  needdiv:true,
					  cssclass:"thirdDiv",
					  onClick: showRecord,
					  myParam :item	 	
					});	 
		
		row.cells[4].appendChild(button_1); 
		
		
		table.appendChild(row); 
	});	
	tbldiv.appendChild(table);   
}
 

function addRecord(){
	 const id1 = document.getElementById('id1');
	 const containerforForm = document.getElementById('id2');
	 containerforForm.innerHTML="";
	 id1.style.display="none";
	 containerforForm.style.display="block"; 
	 
	getstoredForm = WebStorage.getItem("finalformlist"); 
	var josnObj = getstoredForm[this.myParam];   
	 
	josnObj.forEach((item,index) => {
			
			 
				if(item.type=="text"){
					 
					label_1 = DomElements.addLabelTag({
							label:item.fieldname,
							cssclass:"firstFormDivDisplay",		
							needdiv:true, 
						});			
					containerforForm.appendChild(label_1); 
					
					input_1 = DomElements.addTextField({ 
											type:item.type,
											id:item.getid,	
											name:item.getname,
											placeholder:item.placeholder, 
											value:"",
											cssclass:"secondFormDivDisplay",		
											needdiv:true, 				
										});	 
					containerforForm.appendChild(input_1); 
					
				
				}else if(item.type=="select"){	
					
					label_1 = DomElements.addLabelTag({
							label:item.fieldname,
							cssclass:"firstFormDivDisplay",		
							needdiv:true, 
						});			
					containerforForm.appendChild(label_1); 
					
					input_1 = DomElements.addDropdown({
					  id: item.getid,
					  showtext: item.fieldname, 
					  options: item.addedoptions,
					  defaultValue: item.addedoptions[0].text, 
					  cssclass:"secondFormDivDisplay", 
					  needdiv:true
					});	
					containerforForm.appendChild(input_1); 
					
				}else if(item.type=="button"){
					
					label_1 = DomElements.addLabelTag({
							label:"",
							cssclass:"firstFormDivDisplay",		
							needdiv:true, 
						});			
					containerforForm.appendChild(label_1); 
					
					 
					
					button_1 	=  DomElements.addButton({
						  id: item.getid,
						  showtext: item.fieldname, 
						  needdiv:true,
						  cssclass:"secondFormDivDisplay",
						  onClick: saveRecord,
						  myParam :this.myParam	
					});		
					 
					containerforForm.appendChild(button_1);

				}
				 
			});
			
			button_1 	=  DomElements.addButton({
				  id: "btn-xyz",
				  showtext: "Close", 
				  needdiv:true,
				  cssclass:"secondFormDivDisplay",
				  onClick: closePopup,
				  myParam :"xyz"
				});					
				containerforForm.appendChild(button_1); 
			
	
}

function closePopup(){

	const id1 = document.getElementById('id1');
	const containerforForm = document.getElementById('id2');
	containerforForm.innerHTML="";
	id1.style.display="none";
	containerforForm.style.display="none"; 
	 
}

function saveRecord(){
	   
	var josnObj = getstoredForm[this.myParam];   
	
	var markers = [];	
	 
	josnObj.forEach((item,index) => {
		 
		if(item.type!='button'){ 
			 markers[index]  = document.getElementById(item.getid); 
			 
			 markers[index] = {
					field: item.fieldname,
					value: document.getElementById(item.getid).value
			  } 
		} 
	});
	
	var formrecord = {}; 
	var getstoredjson = WebStorage.getItem("formrecordlist");	
	if(getstoredjson){
		formrecord = getstoredjson; 
	}	
	formrecord[this.myParam] = markers;
	WebStorage.setItem("formrecordlist",formrecord);	
	alert("Record added");		
}


function showRecord(){
	 
	 const id1 = document.getElementById('id1');
	 const containerforForm = document.getElementById('id2');
	 containerforForm.innerHTML="";
	 id1.style.display="none";
	 containerforForm.style.display="block"; 
	 
	getstoredForm = WebStorage.getItem("formrecordlist"); 
	var josnObj = getstoredForm[this.myParam];  
	
	var table = document.createElement('table');
	 
	var getcolumn = [];
	josnObj.forEach((item,index) => { 
		getcolumn.push(item.field);
	});
	
	var row = document.createElement('tr');	
	getcolumn.forEach((item,index) => { 
		row.appendChild(document.createElement('th'));
		row.cells[index].appendChild(document.createTextNode(getcolumn[index])); 
	});
	table.appendChild(row);	 
	
	row = document.createElement('tr');
	josnObj.forEach((item,index) => {
		 
		 row.appendChild(document.createElement('td')); 
		 row.cells[index].appendChild(document.createTextNode(item.value));
	});
	 
	table.appendChild(row);	 
	 
	containerforForm.appendChild(table);	 

	button_1 	=  DomElements.addButton({
	  id: "btn-xyz",
	  showtext: "Close", 
	  needdiv:true,
	  cssclass:"secondFormDivDisplay",
	  onClick: closePopup,
	  myParam :"xyz"
	});					
	containerforForm.appendChild(button_1); 	
}


//delete field which is added on form div
function deleteFormField(){ 
  
	var getstoredjson = WebStorage.getItem("templist");	
	if(getstoredjson){ 
		if(getstoredjson.length>0){ 
			getstoredjson.splice(this.myParam,1); 
			WebStorage.setItem("templist",getstoredjson); 	

			fileJSON = getstoredjson;
			containerforForm.innerHTML="";
			 
			var h2 = document.createElement('h2');
			h2.style.textAlign ="center";
			h2.innerHTML = "Form Management"; 
			containerforForm.appendChild(h2);
			 
			renderForm(fileJSON);	
		}
	} 
}

//delete added form list
function deleteFormList(){ 	 
	getstoredForm = WebStorage.getItem("finalformlist"); 
	delete getstoredForm[this.myParam];	 
	WebStorage.setItem("finalformlist",getstoredForm);
	tbldiv.innerHTML="";
	rendertable(getstoredForm);  
}	

var viewstatus = true;
var getformid="";
//render form when needed
function renderForm(getactualjson){
		 
		getactualjson.forEach((item,index) => {
			
			 
				if(item.type=="text"){
					 
					label_1 = DomElements.addLabelTag({
							label:item.fieldname,
							cssclass:"firstFormDiv",		
							needdiv:true, 
						});			
					containerforForm.appendChild(label_1); 
					
					input_1 = DomElements.addTextField({ 
											type:item.type,
											id:item.getid,	
											name:item.getname,
											placeholder:item.placeholder, 
											value:"",
											cssclass:"secondFormDiv",		
											needdiv:true, 				
										});	 
					containerforForm.appendChild(input_1); 
					
				
				}else if(item.type=="select"){	
					
					label_1 = DomElements.addLabelTag({
							label:item.fieldname,
							cssclass:"firstFormDiv",		
							needdiv:true, 
						});			
					containerforForm.appendChild(label_1); 
					
					input_1 = DomElements.addDropdown({
					  id: item.getid,
					  showtext: item.fieldname, 
					  options: item.addedoptions,
					  defaultValue: item.addedoptions[0].text, 
					  cssclass:"secondFormDiv", 
					  needdiv:true
					});	
					containerforForm.appendChild(input_1); 
					
				}else if(item.type=="button"){
					
					label_1 = DomElements.addLabelTag({
							label:"",
							cssclass:"firstFormDiv",		
							needdiv:true, 
						});			
					containerforForm.appendChild(label_1); 
					
					if(viewstatus==false){
						
						button_1 	=  DomElements.addButton({
							  id: item.getid,
							  showtext: item.fieldname, 
							  needdiv:true,
							  cssclass:"secondFormDiv",
							  onClick: saveFormField
						});					
					}else{
					
						button_1 	=  DomElements.addButton({
							  id: item.getid,
							  showtext: item.fieldname, 
							  needdiv:true,
							  cssclass:"secondFormDiv",
							  onClick: saveFormField
						});		
					}
					
					containerforForm.appendChild(button_1);

				}
				
				 
					
				button_1 	=  DomElements.addButton({
				  id: "btn-"+item.getid,
				  showtext: "Delete", 
				  needdiv:true,
				  cssclass:"thirdFormDiv",
				  onClick: deleteFormField,
				  myParam :index
				});					
				containerforForm.appendChild(button_1);
				 
			});
	
}

//save compile form elements.
function saveFormField(){
	if(viewstatus==false){
		
		getstoredForm = WebStorage.getItem("finalformlist"); 
		 
		getstoredForm[getformid] = {};
		getstoredForm[getformid] = fileJSON;		 
		WebStorage.setItem("finalformlist",getstoredForm);
		WebStorage.removeItem("templist");			
		containerforForm.innerHTML="";
		fileJSON=[];
		tbldiv.innerHTML="";
		rendertable(getstoredForm); 				
		
	}else{	
		let doc = prompt("Please enter a form name");
		if (doc != null) { 
			let getkeys = Object.keys(getstoredForm); 
			if(getkeys.indexOf(doc)>=0) {
				alert("Name already exist!");
				return false;
			}else{
				getstoredForm[doc] = {};
				getstoredForm[doc] = fileJSON;		 
				WebStorage.setItem("finalformlist",getstoredForm);
				WebStorage.removeItem("templist");			
				containerforForm.innerHTML="";
				fileJSON=[];
				tbldiv.innerHTML="";
				rendertable(getstoredForm); 
			}		 
		}
	}
}
 
//view added elements on form 
function viewFormField(){
	getstoredForm = WebStorage.getItem("finalformlist"); 
	var josnObj = getstoredForm[this.myParam]; 
 
	WebStorage.setItem("templist",josnObj); 
	
	containerforForm.innerHTML="";
	containerforForm.style.display="inline-block";
	fileJSON = getstoredForm[this.myParam];
	//WebStorage.removeItem("templist");
	viewstatus=false;
	getformid=this.myParam;
	renderForm(josnObj);
}
 
 //loading all the elements when page reload
document.addEventListener("DOMContentLoaded", (event)=>{
	 
	var getstoredjson = WebStorage.getItem("templist");	
	if(WebStorage.getItem("finalformlist")!=null){
		getstoredForm = WebStorage.getItem("finalformlist");
		rendertable(getstoredForm); 
	}
	
	if(getstoredjson){
		var getactualjson = getstoredjson;
		if(getactualjson.length>0){ 
			fileJSON = getstoredjson;
			renderForm(getactualjson); 
		}  
	}else{
		
		containerforForm.style.display="none";	
	}

}); 
 
