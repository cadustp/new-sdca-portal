const exporterService = ({fileName,exportObject,clearCallBack}) => {
  if(exportObject.size > 0) {
    const url = window.URL.createObjectURL(new Blob([exportObject]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.xlsx`); //or any other extension
    document.body.appendChild(link);
    link.click();
    clearCallBack()
  }
}

export default exporterService;