
//Vaildate form fields
this.validateForm = (validateFields, jsonValues) =>{
    let flag = true;
    Object.keys(validateFields).map((field, index) => {
      var key = validateFields[index];
      var value = jsonValues[key];
      if(value==null || typeof value=='undfined' || value==''){
        flag = false;
      }
    });
    return flag;
}