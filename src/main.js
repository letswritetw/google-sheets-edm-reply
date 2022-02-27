// 取得網址參數
function getSearch(name) {
  const href = window.location.search.substring(1);
  const objectHrefs = href.split("&");
  for (let i = 0, len = objectHrefs.length; i < len; i++)	{
    let objectHref = objectHrefs[i].split("=");
    if(objectHref[0] == name) {
      return objectHref[1];
    }
  }
  return;
}

document.addEventListener('DOMContentLoaded', () => {

  const result = getSearch('result') === 'y' ? '是' : '否';
  const email = getSearch('email');

  // 不同結果，給不同結果文字
  let thanks;
  result === '是' ? thanks = '謝謝您的訂閱，祝您有個美好的一天~' : thanks = '蝦密，你竟然不訂！好啦，還是祝您有個美好的一天~';
  document.getElementById('thanks').textContent = thanks;

  if(email) {
    // A、B 版給不同的 Google Sheets 值
    let formUri = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd6oVaoHcBe1smAYMfIeAFDA5ifOBPY2-bdGRjzMWLXCV96xw/formResponse';
    let key_result = 'entry.1290516544';
    let key_email = 'entry.265887320';

    // 傳送資料到 Google Sheet
    const myHeaders = new Headers();
    const formdata = new FormData();
    formdata.append(key_email, email);
    formdata.append(key_result, decodeURIComponent(result));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(formUri, requestOptions)
      .then(response => response.text())
      .then(result => {})
      .catch(error => console.log('error', error));
    
    // 清掉網址
    setTimeout(() => {
      let r = result === '是' ? 'y' : 'n';
      let cleanUri = `${location.pathname}?result=${r}`;
      history.pushState('', '', cleanUri);
    }, 1000);
  }
})