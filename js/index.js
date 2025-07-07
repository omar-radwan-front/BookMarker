
//    elements in html 
var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");

var sitelist ;
if (localStorage.getItem("sites")==null) {
 sitelist =[];
  
} else {
 sitelist =JSON.parse(localStorage.getItem("sites"));
  display()
}  
// addsite 1 
function addsite(params) {
  var site ={
    username :siteNameInput.value,
    url : siteURLInput.value
  }
  if (siteNameInput.classList.contains("is-valid") && siteURLInput.classList.contains("is-valid") ) {
    sitelist.push(site)
  localStorage.setItem("sites",JSON.stringify(sitelist))
  display()
  clear()
  } else {
    alert("this not valid")
  }
 
}

 // displaysite  2
function display() {
  var cartona ='';
  for (let i = 0; i <sitelist.length; i++) {
 cartona+=`   <tr><th class="text tt">${i+1}</th>
            <th class="text tt">${sitelist[i].username}</th>
            
             
            <th> <a href="${sitelist[i].url}" target="_blank" class="px-3 py-2 btn btn-success ">Visit <i class="fa-solid fa-eye"></i></a></th> 

            <th class="text"><button onclick="deleteIndex(${i})" class="btn btn-danger px-3">Delete  <i class="fas fa-trash"></i></button></th>
          </tr>`
    
  }
  document.getElementById("tableContent").innerHTML=cartona;
}


  // deleteIndex 3
function deleteIndex( index) {
 sitelist.splice(index,1)
 localStorage.setItem("sites",JSON.stringify(sitelist));
 display()
}

  // validateInputs 4 
function validateInputs(element) {
  var regex ={
  siteName : /^[A-z][a-z]{3,}$/,
  siteURL : /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\S*)$/

  }
   var result = regex[element.id].test(element.value);
  if (result==true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  
  }
}

//5 clear inputs
function clear() {
siteNameInput.value = null;
siteNameInput.classList.remove("is-valid")  // to remove "is-valid" of inputs

siteURLInput.value = null;  
siteURLInput.classList.remove("is-valid") 
}