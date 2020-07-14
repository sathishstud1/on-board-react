this.changePage = (
  pageId,
  PageLength,
  showPage,
  prvBtn,
  nxtBtn,
  currObj,
  dom
) => {
  for (let i = 0; i < PageLength; i++) {
    dom.findDOMNode(currObj.refs[showPage + i]).style.display = "none";
  }
  dom.findDOMNode(currObj.refs[showPage + pageId]).style.display = "block";
  dom.findDOMNode(currObj.refs[prvBtn]).style.display = "block";
  dom.findDOMNode(currObj.refs[nxtBtn]).style.display = "block";
  if (pageId === PageLength - 1) {
    dom.findDOMNode(currObj.refs[nxtBtn]).style.display = "none";
  }
  if (pageId === 0) {
    dom.findDOMNode(currObj.refs[prvBtn]).style.display = "none";
  }
};

this.nextPage = (
  CurrentPageId,
  PageLength,
  showPage,
  prvBtn,
  nxtBtn,
  currObj,
  dom
) => {
  if (CurrentPageId === PageLength - 1) {
    return;
  }
  dom.findDOMNode(currObj.refs[prvBtn]).style.display = "block";
  CurrentPageId = CurrentPageId + 1;
  if (CurrentPageId === PageLength - 1) {
    dom.findDOMNode(currObj.refs[nxtBtn]).style.display = "none";
  }

  for (let i = 0; i < PageLength; i++) {
    dom.findDOMNode(currObj.refs[showPage + i]).style.display = "none";
  }
  dom.findDOMNode(currObj.refs[showPage + CurrentPageId]).style.display =
    "block";
  return CurrentPageId;
};

this.previousPage = (
  CurrentPageId,
  PageLength,
  showPage,
  prvBtn,
  nxtBtn,
  currObj,
  dom
) => {
  if (CurrentPageId === 0) {
    return;
  }
  dom.findDOMNode(currObj.refs["nextBtn"]).style.display = "block";

  CurrentPageId = CurrentPageId - 1;
  if (CurrentPageId === 0) {
    dom.findDOMNode(currObj.refs["previousBtn"]).style.display = "none";
  }
  for (let i = 0; i < PageLength; i++) {
    dom.findDOMNode(currObj.refs["ShowPage" + i]).style.display = "none";
  }
  dom.findDOMNode(currObj.refs["ShowPage" + CurrentPageId]).style.display =
    "block";
  return CurrentPageId;
};
