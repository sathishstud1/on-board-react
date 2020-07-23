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
  }else if(type && type==="emailValidation"){
    return label+" is Invalid.";
  }else if(type && type==="phoneValidation"){
    return label+" is Invalid.";
  }else if(type && type==="ssn"){
    return label+" is Invalid.";
  }else if(isReq){
    return label+" is required.";
  }
}

this.isValid = (value, isReq, type)=>{
  if(type && type==="onlyNumbers"){
    return this.isInteger(value);
  }else if(type && type==="onlyAlphabets"){
    return this.isAlphabets(value);
  }else if(type && type==="emailValidation"){
    return this.isEmailValid(value);
  }else if(type && type==="phoneValidation"){
    return this.isPhoneValid(value);
  }else if(type && type==="ssn"){
    return this.isSSN(value);
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

this.isEmailValid = (value)=>{
  var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(value) === false) 
        {
            return false;
        }
        return true;
}

this.isPhoneValid = (value)=>{  
  if(this.isInteger(value)){
    //if(value.length > 6 && value.length < 11) {
    if(value.length ===10) {
      return true;
    }
  }
  return false; 
}

this.isSSN = (value)=>{  
  value = value.replace(/-/g,"");
  if(this.isInteger(value)){
    if(value.length ===9) {
      return true;
    }
  }
  return false; 
}