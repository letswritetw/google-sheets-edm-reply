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

  // 提交到 Google 表單
  if(email) {
    const formUri = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSd6oVaoHcBe1smAYMfIeAFDA5ifOBPY2-bdGRjzMWLXCV96xw/formResponse';
    const key_result = 'entry.1290516544';
    const key_email = 'entry.265887320';

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
      const r = getSearch('result');
      const cleanUri = `${location.pathname}?result=${r}`;
      history.pushState('', '', cleanUri);
    }, 1000);
  }
})