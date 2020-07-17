
this.honorActions= (fieldName, id, value, dependent, refObjects, states, dom)=>{
      const ext = id.replace(fieldName, "");
      const childId =   dependent.dependentName + ext;
      const dependentVal = dependent.forValue;
      const refObj = refObjects[childId];
      if(dependent.action==="enable"){
        return this.enableElement(value, childId, dependentVal, refObj,dom);
      }else if(dependent.action==="disable"){
        return this.disbaleElement(value, childId, dependentVal, refObj,dom);
      }else if(dependent.action==="select"){
        if(dependent.forValue==="changeOptions"){
            if(dependent.dependentName==="state"){
                return this.changeStates(states, value, childId, refObj, dom);
            }
        }
      }
}

this.changeStates = (states, country, childId, refObj, dom)=>{
    let statesList = states[country];
    let options = [];
    for(let i=0;i<statesList.length;i++){
      let state = statesList[i];
      options.push("<option value="+state.value+">"+state.label+"</option>");
    }
    dom.findDOMNode(refObj.refs[childId]).innerHTML = options;
    return false;
}

this.enableElement = (value, childId, dependentVal, refObj,dom) =>{
    if(dependentVal.includes(value)){
        dom.findDOMNode(refObj.refs[childId+"div"]).style.display = "block";
    }else{
        dom.findDOMNode(refObj.refs[childId+"div"]).style.display = "none";
    }
    return true;
}

this.disbaleElement = (value, childId, dependentVal, refObj,dom) =>{
    if(dependentVal.includes(value)){
        dom.findDOMNode(refObj.refs[childId+"div"]).style.display = "none";
    }else{
        dom.findDOMNode(refObj.refs[childId+"div"]).style.display = "block";
    }
    return true;
}