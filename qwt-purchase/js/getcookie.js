/**
 * Created by MY on 2019/5/29.
 */
function getCookie(cookieName){
    var cookieValue="";
    if (document.cookie && document.cookie !=='') {
        var cookies = document.cookie.split(';');
        // console.log(cookies);
        // console.log("xxxx");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];

//360 2  谷歌1
            if (cookie.trim().substr(0, cookieName.length + 1).trim()===cookieName.trim()+"=") {
                // console.log(cookie.substr(0, cookieName.length + 2));
                // console.log(cookie.substr(cookieName.length + 2, cookie.length));
                // console.log(cookie.substr(0, cookieName.length + 1));
                // console.log(cookie.substr(cookieName.length + 1, cookie.length));
                // console.log(cookieName.trim()+"=");
                cookieValue = cookie.trim().substr(cookieName.length + 1, cookie.length);
                // console.log(cookieValue)
                break;
            }
            // if (cookie.substr(0, cookieName.length + 2).trim()===cookieName.trim()+"=") {
            //     console.log(cookie.substr(0, cookieName.length + 2));
            //     console.log(cookie.substr(cookieName.length + 2, cookie.length));
            //     console.log(cookie.substr(0, cookieName.length + 1));
            //     console.log(cookie.substr(cookieName.length + 1, cookie.length));
            //     console.log(cookieName.trim()+"=");
            //     cookieValue = cookie.substr(cookieName.length + 2, cookie.length);
            //     // console.log(cookieValue)
            //     break;
            // }
        }
    }
    return cookieValue;
}
