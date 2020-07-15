//Vaildate form fields
this.validateForm = (validateFields, jsonValues) =>{
    let flag = true;
    Object.keys(validateFields).map((field, index) => {
      var key = validateFields[index];
      var value = jsonValues[key];
      if(value===null || typeof value==='undfined' || value===''){
        flag = false;
      }
      if(value===false){
        flag = false;
      }
    });
    return flag;
}

this.setMessage = (isReq, type, label)=>{
  if(type && type==="onlyNumbers"){
    return label+" should be numbers only.";
  }else if(type && type==="onlyAlphabets"){
    return label+" should be alphabets only.";
  }else if(type && type==="onlyLetters"){
    return label+" should be letters only.";
  }else if(isReq){
    return label+" is required.";
  }
}

this.isValid = (value, isReq, type)=>{
  if(type && type==="onlyNumbers"){
    return this.isInteger(value);
  }else if(type && type==="onlyAlphabets"){
    return this.isAlphabets(value);
  }else if(type && type==="onlyLetters"){
    return this.isLetters(value);
  }else if(isReq){
    return this.isRequired(value);
  }
}

this.isRequired = (value)=>{
  if(!value || typeof value ==='undefined' || value ===''){
    return false;
  }else{
    return true;
  }
}

this.isInteger = (value)=>{
  let digits="1234567890";
    for (let i=0; i < value.length; i++) {
      if (digits.indexOf(value.charAt(i))===-1) 
      { 
        return false; 
      }
    }
    return true;
}

this.isAlphabets = (value)=>{
  for (let i=0; i < value.length; i++) {
    if (!isNaN(value.charAt(i))) 
    { 
      return false; 
    }
  }
  return true;
}

this.isLetters = (value)=>{
  return true;
}