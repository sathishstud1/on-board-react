
//Vaildate form fields
this.validateForm = (validateFields, jsonValues) =>{
    let flag = true;
    Object.keys(validateFields).map((field, index) => {
      var key = validateFields[index];
      var value = jsonValues[key];
      if(value==null || typeof value=='undfined' || value==''){
        console.log(key +' is Required.');
        flag = false;
      }
    });
    return flag;
}